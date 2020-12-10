import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html'
})
export class DailyPage {

  title = "My Habit Stacker";
  habits = [];
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
  }

  loadHabits(){
    this.habitService.getHabits().subscribe(
      habits => this.habits = habits,
      error => this.errorMessage = <any>error);
  }

  didToday(habit){
    console.log("home.ts", habit);
    this.streakService.addDaily(habit);
  }

  //MWC placed for testing
  makeData(){
    console.log("Adding ... ");
    this.streakService.makeData();
  }

}
