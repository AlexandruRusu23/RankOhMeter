import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LolModel} from './select-players.model';
import {LolService} from "../services/lol.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.css']
})
export class SelectPlayersComponent implements OnInit {

  displayedColumns = ['select', 'name', 'wins', 'losses', 'division', 'mostUsedChamps'];
  displayedColumnsMap = [
    {id: 'name', name: 'Name'},
    {id: 'wins', name: 'Wins'},
    {id: 'losses', name: 'Losses'},
    {id: 'division', name: 'Division'},
    {id: 'mostUsedChamps', name: 'Most used champs'},
  ];

  simMatchPlayersDataSource = new MatTableDataSource<LolModel>();
  playersSubscription: Subscription;

  pageSizeOptions = [5, 10, 20];
  totalCount = 10;
  pageIndex = 0;
  pageSize = 5;

  @Output() getPlayer = new EventEmitter();

  constructor(public lolService: LolService,
              public router: Router,
              public route: ActivatedRoute){}

  ngOnInit() {
    this.playersSubscription = this.lolService.playersChanged.subscribe(
      (simMatchPlayers) => {
        this.simMatchPlayersDataSource.data = simMatchPlayers.items;
        this.totalCount = simMatchPlayers.totalCount;
      });
    this.lolService.loadPlayers(this.pageIndex, this.pageSize);
  }

  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.putParamsInUrl(this.pageIndex, this.pageSize);
  }

  putParamsInUrl(pageIndex: number, pageSize: number) {
    this.router
      .navigate(['/sim-match'], {
        queryParams: {page: pageIndex, size: pageSize},
      })
      .then(() => {
        this.lolService.loadPlayers(this.pageIndex, this.pageSize);
      });
  }

  //TODO
  addPlayer(player: LolModel) {
      console.log('ai adaugat un jucator');
      this.getPlayer.emit(player);
      this.lolService.dialog.closeAll();
    }

  // ngOnInit() {
  //   this.playersSubscription = this.lolService.playersChanged.subscribe(
  //     (players) => {
  //       this.lolService.playersForSelect = players;
  //       this.dataSource = this.lolService.playersForSelect;
  //     });
  //   // this.lolService.loadPlayersModal();
  //   this.lolService.loadPlayers();
  // }
  //
  // addPlayer(player: LolModel) {
  //   // this.lolService.loadPlayersModal();
  //   this.lolService.loadPlayers();
  //   this.lolService.selectedPlayers.push(this.lolService.playersForSelect.filter(currentPlayer => currentPlayer.id === player.id)[0]);
  //
  //   const index = this.lolService.playersForSelect.indexOf(player, 0);
  //   if (index > -1) {
  //     this.lolService.playersForSelect.splice(index, 1);
  //   }
  //
  //   this.lolService.dialog.closeAll();
  //   console.log(this.lolService.selectedPlayers);
  // }
}
