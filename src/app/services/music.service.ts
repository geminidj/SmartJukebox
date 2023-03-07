import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Song } from '../song';
import { SocketioService } from './socketio.service';
import { webServerUrl } from "../environment";

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  enablePassword: string = '4HgghP03Qau4lcbcxZ5p60zWjRjc';
  username: string = 'default';
  userIP: string = '192.168.1.2';
  message: string = 'default-blank';

  reenableUserTime: Date = new Date();

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getCooldown(email: string | undefined): Observable<any> {
    if (!email) {
      email = 'greg@greghanson.co.uk';
    }

    const payload = new HttpParams().set('email', email);
    return this.httpClient.post(
      webServerUrl + '/getcooldown',
      payload.toString(),
      this.httpPostOptions
    );
  }

  getQueue(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>(webServerUrl + '/getqueue');
  }

  getFullSongList(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>(webServerUrl + '/getallsongs');
  }

  getUpNext(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(webServerUrl + '/getupnext');
  }

  getNowPlaying(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>(webServerUrl +'/getnowplaying');
  }

  getNumSongs(): Observable<number> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<number>(
      webServerUrl + '/getnumberofsongs'
    );
  }

  addVotes(votes: number, songID: number, email: string): Subscription {
    const payload = new HttpParams()
      .set('votes', votes)
      .set('songid', songID)
      .set('email', email);

    return this.httpClient
      .post(
        webServerUrl + '/addvotes',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((v) => {
        console.log(v);
      });
  }

  addToQueue(songID: number, requester: string): Subscription {
    const payload = new HttpParams()
      .set('username', requester)
      .set('userIP', this.userIP)
      .set('message', this.message)
      .set('songID', songID);

    return this.httpClient
      .post(
        webServerUrl + '/addsong',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((v) => {
        console.log(v);
      });
  }
}
