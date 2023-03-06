import { Component } from '@angular/core';
import { GoogleApiService } from '../../services/google-api.service';
import { AuthService } from "../../services/auth.service";
import {UserInfo} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService,
              private readonly authService: AuthService) {

    authService.userProfileSubject.subscribe((info) =>{
      this.userInfo = info
    })
  }

  logout() {

    window.location.reload();
  }
}
