import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private bcrypt = require('bcrypt');
  private myUser = [];

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };


  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    console.log('LOGIN CALLED');
    console.log(JSON.stringify(data));

    this.bcrypt.genSalt(10, (err: any, salt: any) => {
      this.bcrypt.hash(data.password, salt, (err: any, hash: any) => {
        console.log('HASHED PASSWORD IS');
        console.log(hash);
      });
    });

    const payload = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(
      `http://localhost:8080/login`,
      payload.toString(),
      this.httpPostOptions
    );
  }
}
