import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Song } from '../song';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  email: string = 'default@gmail.com';
  name: string = 'default';
  picture: string = 'C:\\default';

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  addUser(email: string, name: string, picture: string) {
    const payload = new HttpParams()
      .set('email', email)
      .set('name', name)
      .set('picture', picture);

    return this.httpClient
      .post(
        'http://localhost:8080/adduser',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((v) => {});
  }

  // getTodaysPlayCount(email: string | undefined): Subscription {
  //   //This seems a very hacky solution and vulnerbale to async errors - keep an eye on this
  //   let email_string = 'default@default.com';
  //   if (typeof email !== undefined) {
  //     email_string = String(email);
  //   }
  //
  //   const payload = new HttpParams().set('email', email_string);
  //
  //   return this.httpClient
  //     .post(
  //       'http://localhost:8080/gettodaysplaycount',
  //       payload.toString(),
  //       this.httpPostOptions
  //     )
  //     .subscribe((v) => {
  //       console.log('v: ' + v.toString());
  //       this.usedDailyRequests = parseInt(v.toString());
  //       console.log('usedDailyRequests: ' + this.usedDailyRequests);
  //     });
  // }

  getTodaysPlayCount(email: string) {
    console.log('Todays play count for ' + email);
  }
}
