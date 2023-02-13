import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000',
};
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: any;
  private nowPlayingUpdateFlag: boolean = false;

  private beingProcessed: number[] = [];

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('broadcast nowplaying update', () => {
      //trigger the main.component.ts to update the now playing song
    });

    this.socket.on('song lookout', (message: number) => {
      this.beingProcessed.push(message);
    });

    this.socket.on('update nowplaying', () => {
      this.nowPlayingUpdateFlag = true;
    });
  }

  getProcessList() {
    return this.beingProcessed;
  }

  removeFromList(songID: number) {
    let index = this.beingProcessed.lastIndexOf(songID);
    this.beingProcessed.splice(index, 1);
  }

  newSong(songID: number) {
    this.socket.emit('new song', songID);
  }

  getNowPlayingFlagStatus() {
    return this.nowPlayingUpdateFlag;
  }

  resetNowPlayingFlag() {
    this.nowPlayingUpdateFlag = false;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
