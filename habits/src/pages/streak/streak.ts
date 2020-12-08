import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-streak',
  templateUrl: 'streak.html'
})
export class StreakPage {

  title = "My Habit Stacker"

  //items array
  items = [
    {
      date: "day 1",
      habit: "test1"
    },
    {
      date: "day 2",
      habit: "test2"
    },
    {
      date: "day 3",
      habit: "test3"
    },
    {
      date: "day 4",
      habit: "test4"
    },
  ];

  constructor(public navCtrl: NavController) {

  }

}
