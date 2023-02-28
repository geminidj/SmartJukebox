import { Component, Inject } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { SocketioService } from '../../services/socketio.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-voteconfirm',
  templateUrl: './modal-voteconfirm.component.html',
  styleUrls: ['./modal-voteconfirm.component.scss'],
})
export class ModalVoteconfirmComponent {
  songID: number = 0;
  email: string = 'there should be an email address here';
  artist: string = 'Unknown';
  title: string = 'Unknown';
  votes: number = 0;

  constructor(
    private musicService: MusicService,
    private socketIO: SocketioService,

    private dialogRef: MatDialogRef<ModalVoteconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.songID = data.songID;
    this.email = data.email;
    this.artist = data.artist;
    this.title = data.title;
    this.votes = data.votes;
  }

  confirmSelection(songID: number, email: string, votes: number) {
    this.musicService.addVotes(votes, songID, email);
    this.socketIO.emitMessage('update votelist', 'update votelist');
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
