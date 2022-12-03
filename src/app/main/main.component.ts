import { Component } from '@angular/core';
import {MusicService} from "../services/music.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  songList: Song[] = [];

  constructor(private musicService: MusicService) {
  }
  ngOnInit():void{
    this.getDynamicSongQueue();
  }


  getDynamicSongQueue(){
    this.musicService.getQueue().subscribe((retrievedData: Song[]) => this.songList = retrievedData);
  }
}

export type Song = {id:number, songID:number, artist:string, title:string};
