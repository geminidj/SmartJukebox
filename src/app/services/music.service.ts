import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Song } from '../song';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  enablePassword: string = '4HgghP03Qau4lcbcxZ5p60zWjRjc';
  username: string = 'default';
  userIP: string = '192.168.1.2';
  message: string = 'default-blank';

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private socketIO: SocketioService
  ) {}

  getQueue(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>('http://localhost:8080/getqueue');
  }

  getFullSongList(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>('http://localhost:8080/getallsongs');
  }

  getNowPlaying(): Observable<Song[]> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>('http://localhost:8080/getnowplaying');
  }

  getNumSongs(): Observable<number> {
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<number>(
      'http://localhost:8080/getnumberofsongs'
    );
  }

  enableSong(songID: number): Subscription {
    const payload = new HttpParams()
      .set('songid', songID)
      .set('password', this.enablePassword);
    return this.httpClient
      .post(
        'http://localhost:8080/enablesong',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe();
  }

  addToQueue(songID: number, requester: string): Subscription {
    const payload = new HttpParams()
      .set('username', requester)
      .set('userIP', this.userIP)
      .set('message', this.message)
      .set('songID', songID);

    return this.httpClient
      .post(
        'http://localhost:8080/addsong',
        payload.toString(),
        this.httpPostOptions
      )
      .subscribe((v) => {
        console.log(v);
      });
  }
}
