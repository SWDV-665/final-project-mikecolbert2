import { Component } from '@angular/core';

import { HabitPage } from '../habit/habit';
import { StreakPage } from '../streak/streak';
import { DailyPage } from '../daily/daily';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DailyPage;
  tab2Root = StreakPage;
  tab3Root = HabitPage;

  constructor() {

  }
}
