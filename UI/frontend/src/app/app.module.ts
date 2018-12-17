import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MainNavComponent} from './main-nav/main-nav.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import {CustomAngularMaterialModule} from "./custom-angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FirstComponent,
    SecondComponent,
  ],
  imports: [
    BrowserModule,
    CustomAngularMaterialModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
