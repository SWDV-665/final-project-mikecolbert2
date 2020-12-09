import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HabitServiceProvider } from '../../providers/habit-service/habit-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-habitt',
  templateUrl: 'habit.html'
})
export class HabitPage {

  title = "My Habit Stacker";
  
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public habitService: HabitServiceProvider, 
              public inputDialogService: InputDialogServiceProvider, 
              private socialSharing: SocialSharing ) {

  }

  loadHabits(){
    return this.habitService.getHabits();
  }

  createShareMessages(){
    const habit = this.loadHabits();
    let message = "This month, I want to " + habit[0].name;  //MWC debug this
    let subject = "Shared via MyHabitStacker app";
    let url = "https://myhabitstacker.com";
    console.log(message);
    return { message, subject, url };
  }


  share(){
    console.log("inside of share() to send text message")
    let text = this.createShareMessages();
    this.socialSharing.share(text.message, text.subject).then(() => {
      // Sharing via text message is possible
      console.log("shared successfully via text")
    }).catch(() => {
      // Sharing via text message is not possible
    });
    
  }

  shareViaEmail(){
    console.log("inside of shareViaEmail()")
    let email = this.createShareMessages();
    this.socialSharing.share(email.message, email.subject).then(() => {
      // Sharing via text message is possible
      console.log("shared successfully via email")
    }).catch(() => {
      // Sharing via text message is not possible
    });
    
  }

  shareViaFacebook(){
    console.log("inside of shareViaFacebook()")
    let post = this.createShareMessages();
    this.socialSharing.share(post.message).then(() => {
      // Sharing via text message is possible
      console.log("shared successfully via Facebook")
    }).catch(() => {
      // Sharing via text message is not possible
    });
    
  }

  shareViaInstagram(){
    console.log("inside of shareViaInstagram()")
    let post = this.createShareMessages();
    this.socialSharing.share(post.message).then(() => {
      // Sharing via text message is possible
      console.log("shared successfully via Instagram")
    }).catch(() => {
      // Sharing via text message is not possible
    });
    
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
