import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public habitService: HabitServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(habit?, index?) {
    const prompt = this.alertCtrl.create({
      title: habit ? 'Edit Habit' : 'Add Habit',
      message: habit ? "Please edit this habit ... " : "Please enter a new habit ...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: habit ? habit.name : null // if there is a habit, show the habit name, else null
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
            if (index !== undefined) {
              this.habitService.editHabit(habit, index);
            }
            else {
              this.habitService.addHabit(habit);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
