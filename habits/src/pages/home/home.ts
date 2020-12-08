import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  title = "My Habit Stacker"
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public habitService: HabitServiceProvider, public streakService: StreakDataServiceProvider) {

  }

  loadHabits(){
    return this.habitService.getHabits();
  }

  didToday(habit){
    console.log("home.ts", habit);
    this.streakService.addDaily(habit);
  }

}
