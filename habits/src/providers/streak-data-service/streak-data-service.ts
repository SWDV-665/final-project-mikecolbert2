import { Injectable } from '@angular/core';

/*
  Generated class for the StreakDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreakDataServiceProvider {

  // Habit streak array
  daily_entries = [];

  constructor() {
    console.log('Hello StreakDataServiceProvider Provider');
  }

  getDailyEntries() {
    console.log('inside getDailyEntries')
    return this.daily_entries;
  }

  addDaily(habit) {
    console.log('inside addDaily', habit)

    var today = new Date();

    var date1 = new Date();
    date1.setHours(0, 0, 0, 0)
    console.log(date1);
    //var arr = this.getDailyEntries();
    console.log(this.daily_entries);
    if (this.daily_entries.length === 0) {
      var daily = {
        'habit': habit.name,
        'date': today
      }
      console.log('daily variable ...', daily);
      this.daily_entries.push(daily);
      console.log('finished pushing to daily_entries');
      console.log(this.daily_entries);
    } else {

      var i;
      for (i = 0; i < this.daily_entries.length; i++) {
        var date2 = this.daily_entries[i].date;
        console.log(date2);
        date2.setHours(0, 0, 0, 0);

        if (date1.valueOf() != date2.valueOf()) {
          var daily = {
            'habit': habit.name,
            'date': today
          }
          console.log('daily variable ...', daily);
          this.daily_entries.push(daily);
          console.log('finished pushing to daily_entries');
          console.log(this.daily_entries);
        } else {
          console.log('date already found')
        }
      }
      console.log('done');
    }
  }
}
