import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SongitemComponent } from './components/songitem/songitem.component';
import { MainComponent } from './main/main.component';
import { GenericpanelComponent } from './components/genericpanel/genericpanel.component';
import { FormsModule } from '@angular/forms';
import { UserRequestInformationComponent } from './components/user-request-information/user-request-information.component';
import { SocketioService } from './services/socketio.service';
import { PlaybackwarningComponent } from './components/playbackwarning/playbackwarning.component';
import { CooldowntimerComponent } from './components/cooldowntimer/cooldowntimer.component';
import { SongupnextComponent } from './components/songupnext/songupnext.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalNosongsfoundComponent } from './components/modal-nosongsfound/modal-nosongsfound.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalSelectionconfirmComponent } from './components/modal-selectionconfirm/modal-selectionconfirm.component';
import { ModalVoteconfirmComponent } from './components/modal-voteconfirm/modal-voteconfirm.component';
import { LoginComponent } from './components/login/login.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SongitemComponent,
    MainComponent,
    GenericpanelComponent,
    UserRequestInformationComponent,
    PlaybackwarningComponent,
    CooldowntimerComponent,
    SongupnextComponent,
    ModalNosongsfoundComponent,
    ModalSelectionconfirmComponent,
    ModalVoteconfirmComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
