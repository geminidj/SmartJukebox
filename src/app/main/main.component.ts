import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Observable } from 'rxjs';
import { Song } from '../song';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  queueList: Song[] = [];

  fullSongList: Song[] = [];

  nowPlaying: Song[] = [];

  numSongs: number = 0;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.getDynamicSongQueue();
    this.getNowPlaying();
    this.getFullSongList();
    this.getNumSongs();
  }

  getFullSongList() {
    this.musicService
      .getFullSongList()
      .subscribe(
        (retrievedData: Song[]) => (this.fullSongList = retrievedData)
      );
  }

  getDynamicSongQueue() {
    this.musicService
      .getQueue()
      .subscribe((retrievedData: Song[]) => (this.queueList = retrievedData));
  }

  getNowPlaying() {
    this.musicService
      .getNowPlaying()
      .subscribe((retrievedData: Song[]) => (this.nowPlaying = retrievedData));
  }

  getNumSongs() {
    this.musicService
      .getNumSongs()
      .subscribe(
        (retrievedData: any) => (this.numSongs = retrievedData[0].count)
      );
  }

  addToQueue(songID: number) {
    this.musicService.addToQueue(songID);
  }
}
