import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListingPlayersComponent} from './listing-players/listing-players.component';
import {SecondComponent} from './second/second.component';

const routes: Routes = [
  { path: '', component: ListingPlayersComponent, data: { title: 'Listing Players Component' } },
  { path: 'listing-players', component: ListingPlayersComponent, data: { title: 'Listing Players Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
