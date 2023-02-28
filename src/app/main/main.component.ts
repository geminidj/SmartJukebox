import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Song } from '../song';
import { GoogleApiService, UserInfo } from '../services/google-api.service';
import { SocketioService } from '../services/socketio.service';
import { map, Subscription, timer } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalNosongsfoundComponent } from '../components/modal-nosongsfound/modal-nosongsfound.component';
import { ModalSelectionconfirmComponent } from '../components/modal-selectionconfirm/modal-selectionconfirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  oneSecondTimer: Subscription | undefined;

  userInCooldown: boolean = true;
  noSongsFound: boolean = false;

  pageNumbers: number[] = [];
  showPagination: boolean = true;
  queueList: Song[] = [];
  upNextList: Song[] = [];

  fullSongList: Song[] = [];

  nowPlaying: Song[] = [];

  displayedSongList: Song[] = [];
  cooldownUntil: Date = new Date();

  songsPerPage: number = 30;

  oldQueueLength: number = 0;

  numSongs: number = 0;

  pageIndex: number = 1;

  numPages: number = 1;
  searchTerm: string = '';

  userInfo?: UserInfo;
  songsBeenReset: boolean = false;

  fastCooldown: boolean = false;

  playbackPaused: boolean = false;

  cooldownDelay: number = 60000;

  constructor(
    private musicService: MusicService,
    private readonly googleApi: GoogleApiService,
    private socketIO: SocketioService,
    public matDialog: MatDialog
  ) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
      this.getAllData();
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  ngOnInit(): void {
    this.oneSecondTimer = timer(0, 1000)
      .pipe(
        map(() => {
          let processList = this.socketIO.getProcessList();

          let cooldownIndex = this.socketIO
            .getCooldownEmails()
            .indexOf(<string>this.userInfo?.info.email);

          if (cooldownIndex > -1) {
            //users email is in cooldown
            this.getCooldownTimer();
            this.socketIO.resetCooldownEmails();
          }

          if (!this.fastCooldown) {
            if (new Date() < this.cooldownUntil) {
              //user is in cooldown
              this.userInCooldown = true;
              this.disableButtons();
              this.songsBeenReset = false;
            } else {
              this.userInCooldown = false;
              if (!this.songsBeenReset) {
                this.resetSongList();
              }
            }
          }

          this.oldQueueLength = this.queueList.length;

          if (this.socketIO.getUpdateNowPlayingFlag()) {
            console.log('updateNowPlayingFlag');
            this.getNowPlaying();
          }

          if (this.socketIO.getUpdateQueueFlag()) {
            console.log('updateQueueFlag');
            this.getSongQueue();
          }

          if (this.socketIO.getUpdateUpNextFlag()) {
            console.log('upNextFlag');
            this.getUpNext();
          }

          if (this.socketIO.getCancelRequestFlag()) {
            console.log('cancelRequestFlag');
            this.resetFastCooldown();
          }

          // if (processList.length > 0) {
          //   console.log('processlist > 0');
          //   console.log(JSON.stringify(processList));
          //   //Check if there are any songs being processed (requested, but not in queue yet)
          //   this.getSongQueue();
          //   for (let Song of this.queueList) {
          //     for (let i = 0; i < processList.length; i++) {
          //       if (Song.songID === processList[i]) {
          //         //Song in queue matches a song on the process list
          //         //Remove it from the process list
          //         this.socketIO.removeFromList(Song.songID);
          //       }
          //     }
          //   }
          // }

          //Disable songs in the queue
          for (let Song of this.fullSongList) {
            for (let Song2 of this.queueList) {
              if (Song.artist === Song2.artist && Song.title === Song2.title) {
                //Duplicate song found in queue
                Song.soft_enabled = false;
              }
            }
          }
          for (let Song of this.fullSongList) {
            for (let Song2 of this.upNextList) {
              if (Song.artist === Song2.artist && Song.title === Song2.title) {
                //Duplicate song found in queue
                Song.soft_enabled = false;
              }
            }
          }
        })
      )
      .subscribe();
  }

  disableButtons() {
    for (let song of this.fullSongList) {
      song.soft_enabled = false;
    }
  }

  ngOnDestroy(): void {
    this.oneSecondTimer!.unsubscribe();
  }

  getAllData() {
    this.getUpNext();
    this.getSongQueue();
    this.getNowPlaying();
    this.getFullSongList();
    this.getCooldownTimer();
  }

  getCooldownTimer() {
    this.musicService
      .getCooldown(this.userInfo?.info.email)
      .subscribe((retrievedData) => {
        this.cooldownUntil = new Date(retrievedData[0].reenableUser);
      });
  }

  getFullSongList() {
    this.musicService.getFullSongList().subscribe((retrievedData: Song[]) => {
      this.fullSongList = retrievedData;
      this.getNumSongs();
    });
  }

  getSongQueue() {
    this.musicService.getQueue().subscribe((retrievedData: Song[]) => {
      this.queueList = retrievedData;
    });
  }

  getUpNext() {
    this.musicService.getUpNext().subscribe((retrievedData: Song[]) => {
      this.upNextList = retrievedData;
    });
  }

  getNowPlaying() {
    this.musicService.getNowPlaying().subscribe((retrievedData: Song[]) => {
      this.nowPlaying = retrievedData;
    });
  }

  getNumSongs() {
    this.musicService.getNumSongs().subscribe((retrievedData: any) => {
      this.numSongs = retrievedData[0].count;
      this.numPages = Math.ceil(this.numSongs / this.songsPerPage);
      this.showSongList();
    });
  }

  resetFastCooldown() {
    this.userInCooldown = false;
    this.getFullSongList();
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
      this.showNoSongsFoundModal();
    } else {
      //songs found - do something
      this.displayedSongList = newSongList;
      this.showPagination = false;
    }
  }

  showNoSongsFoundModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    const modalDialog = this.matDialog.open(
      ModalNosongsfoundComponent,
      dialogConfig
    );
  }

  showConfirmSelectionModal(
    songID: number,
    email: string | undefined,
    artist: string,
    title: string
  ) {
    if (!email) {
      email = 'noemailfound';
    }

    //this.fastCooldown = true;
    setTimeout(() => {
      this.resetFastCooldown();
    }, this.cooldownDelay);
    this.disableButtons();
    this.userInCooldown = true;

    let data = { songID: songID, email: email, artist: artist, title: title };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = data;
    this.matDialog.open(ModalSelectionconfirmComponent, dialogConfig);
  }

  resetNoSongsFound() {
    this.noSongsFound = false;
  }
  resetSongList() {
    this.getFullSongList();
    this.songsBeenReset = true;
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
