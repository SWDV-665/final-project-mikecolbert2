import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public habitService: HabitServiceProvider) {

  }

  loadHabits(){
    return this.habitService.getHabits();
  }

  removeHabit(habit, index){
    console.log("Deleting ...", habit);
    this.habitService.removeHabit(index)
  }

  addHabit(){
    console.log("Adding ...");
    this.showAddHabitPrompt();
  }

  showAddHabitPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add A New Habit',
      message: "Please enter new habit ... ",
      inputs: [
        {
          name: 'name',
          placeholder: 'What daily habit are you working on?'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: habit => {
            console.log('Saved clicked', habit);
            this.habitService.addHabit(habit); //push this item from the login into our items array
          }
        }
      ]
    });
    prompt.present();
  }


}
