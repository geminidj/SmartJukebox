import { Component } from '@angular/core';
import {MusicService} from "../services/music.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  queueList: Song[] = [];

  fullSongList: Song[] = [];
  constructor(private musicService: MusicService) {
  }
  ngOnInit():void{
    this.getDynamicSongQueue();
  }

  getFullSongList(){
    this.musicService.getFullSongList().subscribe((retrievedData: Song[]) => this.fullSongList = retrievedData);
  }

  getDynamicSongQueue(){
    this.musicService.getQueue().subscribe((retrievedData: Song[]) => this.queueList = retrievedData);
  }
}

export type Song = {id:number, songID:number, artist:string, title:string};
