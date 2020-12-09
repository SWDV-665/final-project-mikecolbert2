import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StreakPage } from '../pages/streak/streak';
import { HabitPage } from '../pages/habit/habit';
import { DailyPage } from '../pages/daily/daily';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HabitServiceProvider } from '../providers/habit-service/habit-service';
import { InputDialogServiceProvider } from '../providers/input-dialog-service/input-dialog-service';
import { StreakDataServiceProvider } from '../providers/streak-data-service/streak-data-service';

import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    StreakPage,
    HabitPage,
    DailyPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HabitPage,
    StreakPage,
    DailyPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HabitServiceProvider,
    InputDialogServiceProvider,
    StreakDataServiceProvider,
    SocialSharing
  ]
})
export class AppModule {}
