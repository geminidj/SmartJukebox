import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

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
    sub: string;
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

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signout() {
    this.oAuthService.logOut();
  }
}