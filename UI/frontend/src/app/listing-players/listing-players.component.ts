import { Component, OnInit } from '@angular/core';
import {LolService} from './listing-players.service';
import {LolModel} from './listing-players.model';

@Component({
  selector: 'app-listing-players',
  templateUrl: './listing-players.component.html',
  styleUrls: ['./listing-players.component.css']
})
export class ListingPlayersComponent implements OnInit {

  dataSource: LolModel[];
  displayedColumns = ['id', 'name', 'wins', 'losses', 'division', 'points', 'mostUsedChamps', 'kills', 'deaths', 'assists'];
  displayedColumnsMap = [
    {id: 'id', name: 'Id'},
    {id: 'name', name: 'name'},
    {id: 'wins', name: 'Wins'},
    {id: 'losses', name: 'Losses'},
    {id: 'division', name: 'Division'},
    {id: 'points', name: 'Points'},
    {id: 'mostUsedChamps', name: 'Most used champs'},
    {id: 'kills', name: 'Kills'},
    {id: 'deaths', name: 'Deaths'},
    {id: 'assists', name: 'Assists'}
    ];

  constructor(private lolService: LolService) { }

  ngOnInit() {
    this.lolService.getAllPlayers().subscribe(lolList => this.dataSource = lolList);
  }
}
