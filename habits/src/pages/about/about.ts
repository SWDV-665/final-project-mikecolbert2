import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public habitService: HabitServiceProvider, public inputDialogService: InputDialogServiceProvider ) {

  }

  loadHabits(){
    return this.habitService.getHabits();
  }

  removeHabit(habit, index){
    console.log("Deleting ... ", habit);
    this.habitService.removeHabit(index)
  }

  addHabit(){
    console.log("Adding ... ");
    this.inputDialogService.showPrompt();
  }

  editHabit(habit, index) {
    console.log("Editing ... ", habit, index); 

    // pass the item and index to our edit prompt
    this.inputDialogService.showPrompt(habit, index)
  }

}
