import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StreakDataServiceProvider } from '../../providers/streak-data-service/streak-data-service';

@Component({
  selector: 'page-streak',
  templateUrl: 'streak.html'
})
export class StreakPage {

  title = "My Habit Stacker";
  daily_entries = [];
  errorMessage: string;
  current_habit: any;

  constructor(public navCtrl: NavController,
              public streakService: StreakDataServiceProvider) {
                streakService.dataChanged$.subscribe((dataChanged: boolean) => {
                  this.loadDailyEntries();
                });
  }

  ionViewDidLoad() {
    this.loadDailyEntries();
  }

  loadDailyEntries(){
    this.streakService.getDailyEntries().subscribe(
      daily_entries => this.daily_entries = daily_entries,
      error => this.errorMessage = <any>error);
  }

}
