import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public habitService: HabitServiceProvider, public streakService: StreakDataServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt( habit?, index?) {
    const prompt = this.alertCtrl.create({
      title: habit ? 'Edit Habit' : 'Add Habit',
      //message: habit ? "Please edit this habit ... " : "Please enter a new habit ...", //commented for alert text if empty
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: habit ? habit.habit_name : null // if there is a habit, show the habit name, else null
        },
        {
          name: 'date',
          value: habit ? habit.start_date : new Date(),
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

            if (!habit.name) { // if the there is no text in the alert box, display an error
              prompt.setMessage(' ** You must enter a habit. ');
              return false;
            }

            if (index !== undefined) {
              this.habitService.editHabit(habit, index);
            }
            else {
              console.log(habit)
              this.habitService.addHabit(habit);
            }

          }
        }
      ]
    });
    prompt.present();
  }
}
