import { Component, Input, OnInit } from "@angular/core";
import { MusicService } from '../../services/music.service';
import { UsersService } from '../../services/users.service';
import { map, Subscription, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleApiService } from '../../services/google-api.service';
import { SocketioService } from '../../services/socketio.service';
import { AuthService, UserInfo } from "../../services/auth.service";
import { webServerUrl } from "../../environment";

@Component({
  selector: 'app-user-request-information',
  templateUrl: './user-request-information.component.html',
  styleUrls: ['./user-request-information.component.scss'],
})
export class UserRequestInformationComponent implements OnInit{
  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  @Input() userEmail: string | undefined;

  oneSecondTimer: Subscription | undefined;

  userInfo?: UserInfo;

  totalDailyVotes: number = 0;
  usedVotes: number = 0;
  totalDailySongs: number = 0;
  usedRequests: number = 0;

  constructor(
    private musicService: MusicService,
    private userService: UsersService,
    private httpClient: HttpClient,
    private socketIO: SocketioService,
    private readonly authService: AuthService,
  ) {
    this.authService.userProfileSubject.subscribe((info) =>{
      this.userInfo = info;
    });
  }

  ngOnInit() {
    this.startSection();
  }

  startSection(){
    this.getTotalDailyLimit();

    this.oneSecondTimer = timer(0, 1000)
      .pipe(
        map(() => {
          if (this.socketIO.getPlaycountFlagStatus()) {
            this.getTodayPlayCount(this.userInfo!.info.email);
          }

          if (this.socketIO.getVotesUpdateFlag()) {
            this.getTodayPlayCount(this.userInfo!.info.email);
          }
        })
      )
      .subscribe();
  }

  getTodayPlayCount(email: string) {
    const payload = new HttpParams().set('email', email);

    return this.httpClient
      .post(
        webServerUrl + '/getuserdailyrequests',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((result) => {
        let myObj: { [index: string]: any };
        myObj = result;
        this.usedRequests = myObj[0].requeststoday;
        this.usedVotes = myObj[0].votesused;
      });
  }

  getTotalDailyLimit() {
    this.httpClient
      .get<any>(webServerUrl + '/getmaxdailyrequests')
      .subscribe((result) => {
        this.totalDailySongs = result.playcount;
        this.totalDailyVotes = result.votecount;
      });
  }
}
