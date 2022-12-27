import { Component, Input } from '@angular/core';
import { MusicService } from '../services/music.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-request-information',
  templateUrl: './user-request-information.component.html',
  styleUrls: ['./user-request-information.component.scss'],
})
export class UserRequestInformationComponent {
  @Input() totalDailySongs: number = 50;
  @Input() userEmail: string | undefined;

  usedRequests: number = this.userService.usedDailyRequests;

  constructor(
    private musicService: MusicService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    //Commented out - runs too early before email has been retrieved
    //this.getTodayPlayCount();
  }

  getTodayPlayCount() {
    this.userService.getTodaysPlayCount(this.userEmail);
  }
}
