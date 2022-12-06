import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SongitemComponent } from './songitem/songitem.component';
import { MainComponent } from './main/main.component';
import { GenericpanelComponent } from './genericpanel/genericpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SongitemComponent,
    MainComponent,
    GenericpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
