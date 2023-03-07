import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from "rxjs";
import { webServerUrl } from "../environment";

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
        webServerUrl + '/adduser',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((v) => {console.log(JSON.stringify(v))});
  }

}
