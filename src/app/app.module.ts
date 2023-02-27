import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SongitemComponent } from './songitem/songitem.component';
import { MainComponent } from './main/main.component';
import { GenericpanelComponent } from './genericpanel/genericpanel.component';
import { FormsModule } from '@angular/forms';
import { UserRequestInformationComponent } from './user-request-information/user-request-information.component';
import { SocketioService } from './services/socketio.service';
import { PlaybackwarningComponent } from './playbackwarning/playbackwarning.component';
import { CooldowntimerComponent } from './cooldowntimer/cooldowntimer.component';
import { SongupnextComponent } from './songupnext/songupnext.component';
import { NosongswarningComponent } from './nosongswarning/nosongswarning.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalNosongsfoundComponent } from './modal-nosongsfound/modal-nosongsfound.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
    NosongswarningComponent,
    ModalNosongsfoundComponent,
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
