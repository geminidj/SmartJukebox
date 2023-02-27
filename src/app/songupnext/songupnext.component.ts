import { Component, Input } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-songupnext',
  templateUrl: './songupnext.component.html',
  styleUrls: ['./songupnext.component.scss'],
})
export class SongupnextComponent {
  @Input() email: string = '';
  @Input() position: number = 0;
  @Input() songID: number = 0;
  @Input() artist: string = '';
  @Input() title: string = '';

  constructor() {}
}
