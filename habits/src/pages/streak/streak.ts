import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

@Component({
  selector: 'page-streak',
  templateUrl: 'streak.html'
})
export class StreakPage {

  title = "My Habit Stacker";

  constructor(public navCtrl: NavController, public streakService: StreakDataServiceProvider) {

  }

  loadDailyEntries(){
    console.log('inside streak.ts')
    return this.streakService.getDailyEntries();
  }




}
