import { Component, Input } from '@angular/core';
import { MusicService } from '../services/music.service';
import { UsersService } from '../services/users.service';
import { Song } from '../song';
import { map, Observable, Subscription, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleApiService, UserInfo } from '../services/google-api.service';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-user-request-information',
  templateUrl: './user-request-information.component.html',
  styleUrls: ['./user-request-information.component.scss'],
})
export class UserRequestInformationComponent {
  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  @Input() userEmail: string | undefined;

  oneSecondTimer: Subscription | undefined;

  userInfo?: UserInfo;

  totalDailySongs: number = 0;
  usedRequests: number = 0;

  constructor(
    private musicService: MusicService,
    private userService: UsersService,
    private httpClient: HttpClient,
    private readonly googleApi: GoogleApiService,
    private socketIO: SocketioService
  ) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info;

      this.oneSecondTimer = timer(0, 1000)
        .pipe(
          map(() => {
            if (this.socketIO.getPlaycountFlagStatus()) {
              this.getTodayPlayCount(this.userInfo!.info.email);
              this.socketIO.resetPlaycountFlag();
            }
          })
        )
        .subscribe();
    });
  }

  ngOnInit() {
    this.getTotalDailyLimit();
  }

  getTodayPlayCount(email: string) {
    const payload = new HttpParams().set('email', email);

    return this.httpClient
      .post(
        'http://localhost:8080/getuserdailyrequests',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((result) => {
        let myObj: { [index: string]: any };
        myObj = result;
        this.usedRequests = myObj[0].requeststoday;
      });
  }

  getTotalDailyLimit() {
    this.httpClient
      .get<any>('http://localhost:8080/getmaxdailyrequests')
      .subscribe((result) => {
        this.totalDailySongs = result.playcount;
      });
  }
}
