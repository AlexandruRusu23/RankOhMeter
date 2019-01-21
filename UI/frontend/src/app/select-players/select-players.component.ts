import { Component, OnInit } from '@angular/core';
import {LolModel} from './select-players.model';
import {LolService} from "../listing-players/listing-players.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.css']
})
export class SelectPlayersComponent implements OnInit {

  dataSource: LolModel[];
  // displayedColumns = ['select', 'name', 'wins', 'losses', 'division', 'points', 'mostUsedChamps', 'kills', 'deaths', 'assists'];
  displayedColumns = ['select', 'name', 'wins', 'losses', 'points'];
  displayedColumnsMap = [
    // {id: 'id', name: 'Id'},
    {id: 'name', name: 'Name'},
    {id: 'wins', name: 'Wins'},
    {id: 'losses', name: 'Losses'},
    // {id: 'division', name: 'Division'},
    {id: 'points', name: 'Points'},
    // {id: 'mostUsedChamps', name: 'Most used champs'},
    // {id: 'kills', name: 'Kills'},
    // {id: 'deaths', name: 'Deaths'},
    // {id: 'assists', name: 'Assists'}
    ];

  playersSubscription: Subscription;

  constructor(private lolService: LolService,
              private router: Router) { }

  ngOnInit() {
    this.playersSubscription = this.lolService.playersChanged.subscribe(
      (players) => {
        this.lolService.playersForSelect = players;
        this.dataSource = this.lolService.playersForSelect;
      });
    // this.lolService.loadPlayersModal();
    this.lolService.loadPlayers();
  }

  addPlayer(player: LolModel) {
    // this.lolService.loadPlayersModal();
    this.lolService.loadPlayers();
    this.lolService.selectedPlayers.push(this.lolService.playersForSelect.filter(currentPlayer => currentPlayer.id === player.id)[0]);

    const index = this.lolService.playersForSelect.indexOf(player, 0);
    if (index > -1) {
      this.lolService.playersForSelect.splice(index, 1);
    }

    this.lolService.dialog.closeAll();
    console.log(this.lolService.selectedPlayers);
  }
}
