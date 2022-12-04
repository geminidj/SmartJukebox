import { Component } from '@angular/core';
import {Input} from "@angular/core";

@Component({
  selector: 'app-songitem',
  templateUrl: './songitem.component.html',
  styleUrls: ['./songitem.component.scss']
})
export class SongitemComponent {

  @Input() position: number = 0;
  @Input() songID: number = 0;
  @Input() artist: string = "";
  @Input() title: string = "";

}
