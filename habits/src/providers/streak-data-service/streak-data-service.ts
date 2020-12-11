import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the StreakDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreakDataServiceProvider {

  // Habit streak array
  daily_entries: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello StreakDataServiceProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getDailyEntries(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/logs').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getLatestEntry(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/logs/latest-entry').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
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

  addDaily(log_habit) {
    console.log('inside the addDaily provider')
    this.http.post(this.baseURL + "/api/logs", log_habit).subscribe(res => {
      this.daily_entries = res;
      this.dataChangeSubject.next(true);
    });
  }

}



