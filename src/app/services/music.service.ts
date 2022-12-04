import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Song} from "../main/main.component";

@Injectable({
  providedIn: 'root'
})

export class MusicService{

  constructor(private httpClient: HttpClient) {
  }

  getQueue():Observable<Song[]>{
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>('http://localhost:8080/getqueue');
  }

  getFullSongList():Observable<Song[]>{
    //TODO add a try-catch to this so it gives some helpful error handling (non 200 HTTP codes)
    return this.httpClient.get<Song[]>('http://localhost:8080/getallsongs');
  }


}


