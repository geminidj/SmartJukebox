import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from './services/google-api.service';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SmartJukebox';

  constructor(private socketService: SocketioService) {}



  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
