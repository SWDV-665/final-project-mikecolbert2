import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  title = "My Habit Stacker"

  //items array
  habits = [
    {
      'name' : 'testing'
    }
  ];


  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  didToday(habit){
    const done = Date();   
    console.log("I did this today...", done, habit);
  }

  removeHabit(habit){
    console.log("I deleted this...", habit);
  }

  addHabit(){
    console.log("adding item");
    this.showAddHabitPrompt();
    //console.log(this.habits)
  }

  showAddHabitPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter item ... ",
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
            this.habits.push(habit); //push this item from the login into our items array
          }
        }
      ]
    });
    prompt.present();
  }

}
