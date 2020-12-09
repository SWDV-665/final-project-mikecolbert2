import { Injectable } from '@angular/core';

/*
  Generated class for the HabitServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HabitServiceProvider {

    // Habits array
    habits = [];

  constructor() {
    console.log('Hello HabitServiceProvider Provider');
  }

  getHabits(){
    return this.habits;
  }

  removeHabit(index){
    console.log("dataService - remove habit ..." + index )
    this.habits.splice(index, 1);
    console.log("done removing")
  }

  addHabit(habit){
    this.habits.push(habit);
  }

  editHabit(habit, index){
    this.habits[index] = habit;
  }

}
