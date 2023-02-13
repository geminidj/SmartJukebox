import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { MainComponent } from '../main/main.component';

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000',
};
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  public socket: any;

  private mailWaiting: boolean = false;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('broadcast queue update', () => {
      this.mailWaiting = true;
    });

    this.socket.on('broadcast nowplaying update', () => {
      //trigger the main.component.ts to update the now playing song
    });

    this.socket.on('lower the flag', () => {
      this.mailWaiting = false;
    });
  }

  checkMailbox() {
    return this.mailWaiting;
  }

  resetMailFlag() {
    this.socket.emit('lower the flag', 'lower the flag');
  }

  triggerGlobalQueueUpdate() {
    this.socket.emit('trigger queue update', 'Update the queue');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
