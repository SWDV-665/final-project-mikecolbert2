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
  habits = [];
  errorMessage: string;
  
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public habitService: HabitServiceProvider, 
              public inputDialogService: InputDialogServiceProvider, 
              private socialSharing: SocialSharing ) {
                
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

  // helper function to create message contents for all social sharing
  createShareMessages(){
    const habit = this.loadHabits();
    let message = "This month, I want to " + habit[0].name;
    let subject = "Shared via MyHabitStacker app";
    let url = "https://myhabitstacker.com";
    console.log(message);
    return { message, subject, url };
  }

  // for text messaging
  share(){ 
    console.log("inside of share()");
    let text = this.createShareMessages();
    this.socialSharing.share(text.message, text.subject).then(() => {
      // Sharing via text message is possible
    }).catch(() => {
      // Sharing via text message is not possible
    });
  }

  shareViaEmail(){
    console.log("inside of shareViaEmail()");
    let email = this.createShareMessages();
    this.socialSharing.share(email.message, email.subject).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  shareViaFacebook(){
    console.log("inside of shareViaFacebook()");
    let post = this.createShareMessages();
    this.socialSharing.share(post.message).then(() => {
      // Sharing via Facebook is possible
    }).catch(() => {
      // Sharing via Facebook is not possible
    });
  }

  shareViaInstagram(){
    console.log("inside of shareViaInstagram()");
    let post = this.createShareMessages();
    this.socialSharing.share(post.message).then(() => {
      // Sharing via Instagram is possible
    }).catch(() => {
      // Sharing via Instagram is not possible
    });
  }

  removeHabit(habit, id){
    this.habitService.removeHabit(id);
  }

  addHabit(){
    // call the alert prompt dialog service
    this.inputDialogService.showPrompt();
  }

  editHabit(habit, id) {
    // pass the habit and index to our edit prompt
    this.inputDialogService.showPrompt(habit, habit._id);
  }

}
