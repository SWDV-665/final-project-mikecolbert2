import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  title = "My Habit Stacker"




  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public habitService: HabitServiceProvider) {

  }

  loadHabits(){
    return this.habitService.getHabits();
  }

  didToday(habit){
    const done = Date();   
    console.log("I did this today...", done, habit);
  }

}
