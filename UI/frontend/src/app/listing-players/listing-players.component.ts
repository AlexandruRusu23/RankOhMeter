import {Component, OnInit} from '@angular/core';
import {LolService} from '../services/lol.service';
import {LolModel} from '../models/lol.model';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-listing-players',
  templateUrl: './listing-players.component.html',
  styleUrls: ['./listing-players.component.css']
})
export class ListingPlayersComponent implements OnInit {

  // displayedColumns = ['name', 'division', 'mostUsedChamps'];

  displayedColumns = ['name', 'wins', 'losses', 'division', 'points', 'mostUsedChamps', 'kills', 'deaths', 'assists'];
  displayedColumnsMap = [
    {id: 'wins', name: 'Wins'},
    {id: 'losses', name: 'Losses'},
    {id: 'points', name: 'Points'},
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
  nameFilter = new FormControl('');
  divisionFilter = new FormControl('');
  mostUsedChampsFilter = new FormControl('');
  filter = {
    nameEquals: '',
    divisionEquals: '',
    mostUsedChampsEquals: ''
  };
  constructor(public lolService: LolService,
              public router: Router,
              public route: ActivatedRoute){}

  ngOnInit() {
    this.playersSubscription = this.lolService.playersChanged.subscribe(
      (players) => {
        this.playersDataSource.data = players.items;
        this.totalCount = players.totalCount;
      });
    this.lolService.loadPlayers(this.pageIndex, this.pageSize, this.filter);

    this.route.queryParams.subscribe((params) => this.setParamsFromUrl(params));
    this.subscribeFilters();
  }

  private setParamsFromUrl(params) {
    const localPageIndex = +params['page'];
    const localPageSize = +params['size'];
    if (!isNaN(localPageIndex) && !isNaN(localPageSize) && this.pageSizeOptions.includes(localPageSize) && localPageIndex >= 0) {
      this.pageIndex = localPageIndex;
      this.pageSize = localPageSize;
    }
  }

  private subscribeFilters() {
    this.nameFilter.valueChanges.subscribe((name) => (this.filter.nameEquals = name));
    this.divisionFilter.valueChanges.subscribe((division) => (this.filter.divisionEquals = division));
    this.mostUsedChampsFilter.valueChanges.subscribe((mostUsedChamps) => (this.filter.mostUsedChampsEquals = mostUsedChamps));

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
        this.lolService.loadPlayers(this.pageIndex, this.pageSize, this.filter);
      });
  }

  refresh() {
    this.putParamsInUrl(0, this.pageSize);
  }

}
