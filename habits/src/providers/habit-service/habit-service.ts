import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
/*
  Generated class for the HabitServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HabitServiceProvider {

  habits: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080"

  constructor(public http: HttpClient) {
    console.log('Hello HabitServiceProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getHabits(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/habits').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeHabit(id){
    console.log("service provider - remove habit ..." + id )
    this.http.delete(this.baseURL + "/api/habits/" + id).subscribe(res => {
      this.habits = res;
      this.dataChangeSubject.next(true);
    });  
  }

  addHabit(habit){
    console.log("service provider - add new habit ...")
    this.http.post(this.baseURL + "/api/habits", habit).subscribe(res => {
      this.habits = res;
      this.dataChangeSubject.next(true); 
    });
  }

  editHabit(habit, id){
    console.log("service provider - edit habit ..." + id )
    this.http.put(this.baseURL + "/api/habits/" + id, habit).subscribe(res => {
      this.habits = res;
      this.dataChangeSubject.next(true); 
    }); 
  }

}
