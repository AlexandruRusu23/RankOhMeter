import {Component, OnInit} from '@angular/core';
import {LolService} from '../services/lol.service';
import {LolModel} from '../models/lol.model';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listing-players',
  templateUrl: './listing-players.component.html',
  styleUrls: ['./listing-players.component.css']
})
export class ListingPlayersComponent implements OnInit {

  displayedColumns = ['name', 'wins', 'losses', 'division', 'points', 'mostUsedChamps', 'kills', 'deaths', 'assists'];
  displayedColumnsMap = [
    {id: 'name', name: 'Name'},
    {id: 'wins', name: 'Wins'},
    {id: 'losses', name: 'Losses'},
    {id: 'division', name: 'Division'},
    {id: 'points', name: 'Points'},
    {id: 'mostUsedChamps', name: 'Most used champs'},
    {id: 'kills', name: 'Kills'},
    {id: 'deaths', name: 'Deaths'},
    {id: 'assists', name: 'Assists'}
    ];

  playersDataSource = new MatTableDataSource<LolModel>();
  playersSubscription: Subscription;

  pageSizeOptions = [5, 10, 20];
  totalCount = 10;
  pageIndex = 0;
  pageSize = 5;

  constructor(public lolService: LolService,
              public router: Router,
              public route: ActivatedRoute){}

  ngOnInit() {
    this.playersSubscription = this.lolService.playersChanged.subscribe(
      (players) => {
        this.playersDataSource.data = players.items;
        this.totalCount = players.totalCount;
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
      .navigate(['/listing-players'], {
        queryParams: {page: pageIndex, size: pageSize},
      })
      .then(() => {
        this.lolService.loadPlayers(this.pageIndex, this.pageSize);
      });
  }

}
