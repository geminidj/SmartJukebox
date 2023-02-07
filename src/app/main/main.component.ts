import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Song } from '../song';
import { GoogleApiService, UserInfo } from '../services/google-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  pageNumbers: number[] = [];
  showPagination: boolean = true;
  queueList: Song[] = [];

  fullSongList: Song[] = [];

  nowPlaying: Song[] = [];

  displayedSongList: Song[] = [];

  songsPerPage: number = 30;

  numSongs: number = 0;

  pageIndex: number = 1;

  numPages: number = 1;
  searchTerm: string = '';

  userInfo?: UserInfo;

  constructor(
    private musicService: MusicService,
    private readonly googleApi: GoogleApiService
  ) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

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
      this.showSongList();
    });
  }

  addToQueue(songID: number, requester: string = 'Undefined Email') {
    this.musicService.addToQueue(songID, requester);
  }

  searchSongList() {
    let newSongList: Song[] = [];

    let searchTerm = this.searchTerm.toLowerCase();
    let artist: string = '';
    let title: string = '';

    this.fullSongList.forEach((song) => {
      artist = song.artist.toLowerCase();
      title = song.title.toLowerCase();

      if (artist.includes(searchTerm)) {
        newSongList.push(song);
      }

      if (title.includes(searchTerm)) {
        newSongList.push(song);
      }
    });

    if (newSongList.length == 0) {
    } else {
      //songs found - do something
      this.displayedSongList = newSongList;
      this.showPagination = false;
    }
  }

  resetSongList() {
    this.displayedSongList = this.fullSongList;
    this.showSongList();
  }

  showRandomSongs() {
    let foundSong: Song | undefined;
    let newSongList: Song[] = [];
    let randomSongIDs: number[] = this.chooseRandomNumbers();

    randomSongIDs.forEach((id: number) => {
      foundSong = this.fullSongList.find((i) => i.ID === id);

      if (foundSong) {
        newSongList.push(foundSong);
      }
    });

    this.displayedSongList = newSongList;
    this.showPagination = false;
  }

  chooseRandomNumbers() {
    let number: number = 0;
    let numberList: number[] = [];

    while (numberList.length < this.songsPerPage) {
      number = this.getRandomNumber();
      if (numberList.includes(number)) {
        //number already in list, re-roll
      } else {
        numberList.push(number);
      }
    }
    return numberList;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * this.numSongs);
  }

  showSongList(pageIndex: number = 1) {
    this.pageIndex = pageIndex;
    this.pageNumbers = this.setPageNumbers(this.pageIndex);
    this.showPagination = true;

    //using database indexes for this, might work for full song list
    //for smaller song list, this is going to be broken as fuck
    //use this.displayedSongList.length to work out the number of songs

    //rewriting this is going to be a huge pain in the dick

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
