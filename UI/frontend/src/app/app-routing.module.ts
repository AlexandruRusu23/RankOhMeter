import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListingPlayersComponent} from './listing-players/listing-players.component';
import {SimMatchComponent} from './sim-match/sim-match.component';

const routes: Routes = [
  { path: '', component: ListingPlayersComponent, data: { title: 'Listing Players Component' } },
  { path: 'listing-players', component: ListingPlayersComponent, data: { title: 'Listing Players Component' } },
  { path: 'sim-match', component: SimMatchComponent, data: { title: 'Sim Match Component' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
