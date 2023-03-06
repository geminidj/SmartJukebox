import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { UsersService } from './users.service';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '1066698662800-9t2hp9co3frnbn36557mksdtsa0atndi.apps.googleusercontent.com',
  scope: 'openid profile email',
};

export interface UserInfo {
  info: {
    email: string;
    given_name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>();

  // constructor(
  //   private readonly oAuthService: OAuthService,
  //   private usersService: UsersService
  // ) {
  //   oAuthService.configure(oAuthConfig);
  //   oAuthService.loadDiscoveryDocument().then(() => {
  //     oAuthService.tryLoginImplicitFlow().then(() => {
  //       if (!oAuthService.hasValidAccessToken()) {
  //         oAuthService.initLoginFlow();
  //       } else {
  //         oAuthService.loadUserProfile().then((userProfile) => {
  //           this.userProfileSubject.next(userProfile as UserInfo);
  //           this.sendToLocalAPI(userProfile as UserInfo);
  //         });
  //       }
  //     });
  //   });
  // }
  //
  // sendToLocalAPI(userInfo: UserInfo) {
  //   this.usersService.addUser(
  //     userInfo.info.email,
  //     userInfo.info.given_name,
  //     userInfo.info.picture
  //   );
  // }
  //
  // isLoggedIn(): boolean {
  //   return this.oAuthService.hasValidAccessToken();
  // }

  signout() {
    console.log("signout clicked");
    //this.oAuthService.logOut();
  }
}
