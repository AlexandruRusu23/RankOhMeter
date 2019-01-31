import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MainNavComponent} from './main-nav/main-nav.component';
import {ListingPlayersComponent} from './listing-players/listing-players.component';
import {CustomAngularMaterialModule} from './custom-angular-material.module';
import {LolService} from './services/lol.service';
import {HttpClientModule} from '@angular/common/http';
import {DialogDataComponent, SimMatchComponent} from './sim-match/sim-match.component';
import {SelectPlayersComponent} from "./select-players/select-players.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ListingPlayersComponent,
    SelectPlayersComponent,
    SimMatchComponent,
    DialogDataComponent,
  ],
  imports: [
    BrowserModule,
    CustomAngularMaterialModule,
    AppRoutingModule,
    LayoutModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  entryComponents: [
    // SimMatchComponent,
    DialogDataComponent,
  ],
  providers: [LolService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
