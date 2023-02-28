import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { SocketioService } from '../../services/socketio.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalVoteconfirmComponent } from '../modal-voteconfirm/modal-voteconfirm.component';

@Component({
  selector: 'app-songitem',
  templateUrl: './songitem.component.html',
  styleUrls: ['./songitem.component.scss'],
})
export class SongitemComponent {
  @Input() email: string = '';
  @Input() position: number = 0;
  @Input() songID: number = 0;
  @Input() artist: string = '';
  @Input() title: string = '';
  @Input() votes: number = 0;
  inputVotes: number = 0;

  constructor(
    private musicService: MusicService,
    private socketIO: SocketioService,
    private matDialog: MatDialog
  ) {}

  showConfirmVoteModal(
    songID: number,
    email: string | undefined,
    artist: string,
    title: string,
    inputVotes: number
  ) {
    if (!email) {
      email = 'noemailfound';
    }

    let data = {
      songID: songID,
      email: email,
      artist: artist,
      title: title,
      votes: inputVotes,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = data;
    const modalDialog = this.matDialog.open(
      ModalVoteconfirmComponent,
      dialogConfig
    );
  }
}
