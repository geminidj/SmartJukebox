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
  pageNumbers: number[] = [];
  queueList: Song[] = [];

  fullSongList: Song[] = [];

  nowPlaying: Song[] = [];

  displayedSongList: Song[] = [];

  songsPerPage: number = 30;

  numSongs: number = 0;

  pageIndex: number = 1;

  numPages: number = 1;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.getSongQueue();
    this.getNowPlaying();
    this.getFullSongList();
  }

  getFullSongList() {
    this.musicService.getFullSongList().subscribe((retrievedData: Song[]) => {
      this.fullSongList = retrievedData;
      this.getNumSongs();
    });
  }

  getSongQueue() {
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
    this.musicService.getNumSongs().subscribe((retrievedData: any) => {
      this.numSongs = retrievedData[0].count;
      this.numPages = Math.ceil(this.numSongs / this.songsPerPage);
      this.setVisibleSongs();
    });
  }

  addToQueue(songID: number) {
    this.musicService.addToQueue(songID);
  }

  setVisibleSongs(pageIndex: number = 1) {
    this.pageIndex = pageIndex;
    this.pageNumbers = this.setPageNumbers(this.pageIndex);

    let minIndex = (this.pageIndex - 1) * this.songsPerPage + 1;
    let maxIndex = minIndex + this.songsPerPage - 1;

    this.displayedSongList = this.fullSongList
      .filter((song) => song.ID >= minIndex)
      .filter((song) => song.ID <= maxIndex);
  }

  setPageNumbers(currentIndex: number) {
    const defaultLowArray: number[] = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      this.numPages,
    ];
    const defaultHighArray: number[] = [
      1,
      this.numPages - 9,
      this.numPages - 8,
      this.numPages - 7,
      this.numPages - 6,
      this.numPages - 5,
      this.numPages - 4,
      this.numPages - 3,
      this.numPages - 2,
      this.numPages - 1,
      this.numPages,
    ];

    let newPages: number[] = [
      1,
      currentIndex - 4,
      currentIndex - 3,
      currentIndex - 2,
      currentIndex - 1,
      currentIndex,
      currentIndex + 1,
      currentIndex + 2,
      currentIndex + 3,
      currentIndex + 4,
      this.numPages,
    ];

    if (newPages[0] === newPages[1]) {
      for (let i in newPages) {
        newPages[i]++;
      }
      newPages[0]--;
      newPages[10]--;
      return newPages;
    }

    if (newPages[9] === newPages[10]) {
      for (let i in newPages) {
        newPages[i]--;
      }
      newPages[0]++;
      newPages[10]++;
    }

    if (this.doesArrayContainNegatives(newPages)) {
      return defaultLowArray;
    }

    if (this.doesArrayContainExcessive(newPages)) {
      return defaultHighArray;
    }

    return newPages;
  }

  doesArrayContainNegatives(array: number[]) {
    for (let i in array) {
      if (array[i] <= 0) {
        return true;
      }
    }
    return false;
  }

  doesArrayContainExcessive(array: number[]) {
    for (let i in array) {
      if (array[i] > this.numPages) {
        return true;
      }
    }
    return false;
  }
}
