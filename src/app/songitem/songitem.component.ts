import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MusicService } from '../services/music.service';
import { GoogleApiService } from '../services/google-api.service';
import { SocketioService } from '../services/socketio.service';

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

  totalVotes: number = 0;
  inputVotes: number = 0;

  constructor(private musicService: MusicService) {}

  onClick(songID: number) {
    console.log('button clicked');
    console.log(this.inputVotes);
    console.log(songID);
    console.log(this.email);

    this.musicService.addVotes(this.inputVotes, songID, this.email);
  }
}
