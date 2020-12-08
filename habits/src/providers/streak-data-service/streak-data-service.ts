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

  addDaily(habit, d) {
    console.log('inside addDaily', habit, d)
    var daily = {
      'habit': habit.name,
      'date': d
    }
    console.log('daily variable ...', daily)
    this.daily_entries.push(daily);
    console.log('finished pushing to daily_entries')
    console.log(this.daily_entries)
  }

}
