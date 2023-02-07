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
  socket: any;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('broadcast queue update', () => {
      console.log('Someone added something to the queue - Update the queue');
      //trigger the main.component.ts to update the queue
    });

    this.socket.on('broadcast nowplaying update', () => {
      //trigger the main.component.ts to update the now playing song
    });
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
