import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from "rxjs";

export interface UserInfo {
  info: {
    email: string;
    name: string;
    picture: string;
    isLoggedIn: boolean;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfileSubject = new Subject<UserInfo>();

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };


  constructor(private http: HttpClient) {}

  login(data: any) {
    const payload = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    this.http.post(
      `http://localhost:8080/login`,
      payload.toString(),
      this.httpPostOptions
    ).subscribe(v=>{
      this.userProfileSubject.next(v as UserInfo)
    });
  }
}
