import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { StreakPage } from '../streak/streak';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StreakPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
