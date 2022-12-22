import { Component } from '@angular/core';
import { GoogleApiService, UserInfo } from '../services/google-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  logout() {
    this.googleApi.signout();
    window.location.reload();
  }
}
