import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
//import { empty } from 'rxjs/Observer';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html'
})
export class DailyPage {

  title = "My Habit Stacker";
  habits = [];
  latest = [];
  errorMessage: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public habitService: HabitServiceProvider,
    public streakService: StreakDataServiceProvider) {

    habitService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadHabits();
    });
  }

  ionViewDidLoad() {
    this.loadHabits();
    this.loadLatestHabitCompleted();
    this.streakService.getDailyEntries();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe(
      habits => this.habits = habits,
      error => this.errorMessage = <any>error);
  }

  didToday(habit) {
    console.log('inside didToday')
    /*
    // if there are no entries in the streaks table
    if (this.latest.length === undefined ) {
      console.log('inside if stmt for empty table')
      let log_habit = {
        'habit_name': habit.habit_name,
        'last_completed_date': new Date()
      }
      console.log('no entries in streaks table')
      this.streakService.addDaily(log_habit);
    }
    */

    
    // have you already logged the habit today
    // get the last_completed_date from the most recent daily log entry
    // set the time to all zeroes
      //let last_entry_date = new Date(this.latest.last_completed_date);
    let last_entry_date = new Date(this.latest.last_completed_date);
    last_entry_date.setHours(0, 0, 0, 0)

    // get today's date an set the time to all zeroes
    let today = new Date();
    today.setHours(0, 0, 0, 0)

    // compare the two dates
    if (last_entry_date.valueOf() === today.valueOf()) {
      // the dates are the same
      console.log('already logged this today')

    }

    //calculate the difference between the the last entry and today
    let date1 = new Date(this.latest.last_completed_date);  // date of the last record
    let date2 = new Date();  // date today
    console.log(date1);
    console.log(date2);

    //if difference between days is > 0, there is a missing date
    const difference = this.dateDiffInDays(date1, date2);
    console.log(difference);



    // the difference between the dates = 1 day
    // log the habit today
    if (difference == 1) {
      let log_habit = {
        'habit_name': habit.habit_name,
        'last_completed_date': new Date()
      }
      console.log('logged with difference of 1 day.')
      console.log(log_habit)
      this.streakService.addDaily(log_habit);

    }


    // the difference between teh dates is > 1 day
    // fill in the missing days
    // MWC - figure out how to stop one day short to add todays as the last entry

    if (difference > 1) {
      for (let i = 0; i < difference - 1; i++) {

        const missing_date = date1.setDate(date1.getDate() + 1); //create missing date using date1 + 1 day

        let missing_log = {
          'habit_name': '',
          'last_completed_date': missing_date
        }
        console.log(missing_log);
        console.log('difference is > 1 - catch up')

        //add the missing_date element to the database
        this.streakService.addDaily(missing_log)
        this.loadLatestHabitCompleted()
      }

      let log_habit = {
        'habit_name': habit.habit_name,
        'last_completed_date': new Date()
      }
      console.log('logged todays habit in this catch up scenario.')
      console.log(log_habit)
      this.streakService.addDaily(log_habit);
      this.loadLatestHabitCompleted()

    }
  }

  // helper function to calculate the time difference between two days
  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  // a and b are javascript Date objects
  dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  loadLatestHabitCompleted() {
    this.streakService.getLatestEntry().subscribe(
      latest => this.latest = latest,
      error => this.errorMessage = <any>error);
    //console.log(this.latest)
  }

}
