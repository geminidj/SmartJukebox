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

  private data = [{id:1,artist:'Gloryhammer',name:'The Hollywood Hootsman'},
    {id:2,artist:'Alestorm',name:'Drink'},
    {id:3,artist:'Pendulum',name:'Granite'}]

  getQueue():Observable<Song[]>{

    return this.httpClient.get<Song[]>('http://localhost:8080/getqueue');
  }


}


