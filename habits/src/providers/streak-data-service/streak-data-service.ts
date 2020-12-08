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

  makeData() {
    var d = new Date();
    var i;
    for (i = 0; i < 5; i++) {
      const daily = {
        'habit': 'date-testing',
        'date': d.setDate(d.getDate() + i)
      }
      this.daily_entries.push(daily);
    }
  }


  // a and b are javascript Date objects
  dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }


  // MWC detect skipped days & return an X icon for those days
  getDailyEntries() {

    
    for (var i = 0; i < this.daily_entries.length; i++) {

      if (i === this.daily_entries.length - 1) { //added to keep date2 from overflowing the length and returning undefined
        break;
      }

      const date1 = new Date(this.daily_entries[i].date);
      const date2 = new Date(this.daily_entries[i + 1].date); // (keep in mind, index i + 1 cant be > than array.length)
      console.log('date1: ', date1);
      console.log('date2: ', date2);

      //calculate diffDays between the 2 dates, if diff is > 1, you have a missing date
      const difference = this.dateDiffInDays(date1, date2);
      console.log('difference: ', difference);
      if (difference > 1) {
        //var missingDate = create your missing date (use your date1 variable + 1Day)
        const missingDate = date1.setDate(date1.getDate() + 1);

        const missing_date = {
          'habit': '',
          'date': missingDate
        }
        //add misingDate to missingDates[] array
        this.daily_entries.splice(i+1, 0, missing_date);
        console.log(this.daily_entries);
      }
    }

    return this.daily_entries;
  }


  // MWC need to also check habit name as well as date
  // MWC refactor this to make the code more modular
  addDaily(habit) {
    console.log('inside addDaily', habit)

    var today = new Date();

    var date1 = new Date();
    date1.setHours(0, 0, 0, 0)
    console.log(date1);
    //var arr = this.getDailyEntries();
    console.log(this.daily_entries);
    if (this.daily_entries.length === 0) {
      const daily = {
        'habit': habit.name,
        'date': today
      }
      console.log('daily variable ...', habit);
      this.daily_entries.push(daily);
      console.log('finished pushing to daily_entries');
      console.log(this.daily_entries);
    } else {

      var i;
      for (i = 0; i < this.daily_entries.length; i++) {
        var date2 = new Date(this.daily_entries[i].date);
        console.log(date2);
        date2.setHours(0, 0, 0, 0);

        if (date1.valueOf() != date2.valueOf()) {
          const daily = {
            'habit': habit.name,
            'date': today
          }
          console.log('daily variable ...', habit);
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



