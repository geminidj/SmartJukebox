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
  private playcountUpdateFlag: boolean = true;

  private queueUpdateFlag: boolean = false;

  private cooldownEmails: string[] = [];

  private beingProcessed: number[] = [];

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('broadcast nowplaying update', () => {
      //trigger the main.component.ts to update the now playing song
    });

    this.socket.on('song lookout', (songID: number) => {
      this.beingProcessed.push(songID);
    });

    this.socket.on('update cooldown', (email: string) => {
      this.cooldownEmails.push(email);
    });

    this.socket.on('update nowplaying', () => {
      this.nowPlayingUpdateFlag = true;
    });

    this.socket.on('update queue', () => {
      this.queueUpdateFlag = true;
    });

    this.socket.on('update playcount', () => {
      this.playcountUpdateFlag = true;
    });
  }

  getCooldownEmails() {
    return this.cooldownEmails;
  }

  resetCooldownEmails() {
    this.cooldownEmails = [];
  }

  getUpdateQueueFlag() {
    let result = this.queueUpdateFlag;
    this.queueUpdateFlag = false;
    return result;
  }

  getUpdateNowPlayingFlag() {
    let result = this.nowPlayingUpdateFlag;
    this.nowPlayingUpdateFlag = false;
    return result;
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

  addRequestCount(email: string) {
    this.socket.emit('update playcount', email);
  }

  getPlaycountFlagStatus() {
    return this.playcountUpdateFlag;
  }

  resetPlaycountFlag() {
    this.playcountUpdateFlag = false;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
