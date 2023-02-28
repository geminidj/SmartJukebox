//modal-selectionconfirm.component.ts

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MusicService } from '../../services/music.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-modal-selectionconfirm',
  templateUrl: '/modal-selectionconfirm.component.html',
  styleUrls: ['./modal-selectionconfirm.component.scss'],
})
export class ModalSelectionconfirmComponent {
  songID: number = 0;
  email: string = 'there should be an email address here';
  artist: string = 'Unknown';
  title: string = 'Unknown';

  constructor(
    private musicService: MusicService,
    private socketIO: SocketioService,

    private dialogRef: MatDialogRef<ModalSelectionconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.songID = data.songID;
    this.email = data.email;
    this.artist = data.artist;
    this.title = data.title;
  }

  confirmSelection(songID: number, email: string) {
    this.socketIO.newSong(songID);
    this.socketIO.addRequestCount(email);
    this.musicService.addToQueue(songID, email);
    this.dialogRef.close();
  }

  cancelConfirm() {
    this.socketIO.raiseCancelRequestFlag();
    this.dialogRef.close();
  }
}
