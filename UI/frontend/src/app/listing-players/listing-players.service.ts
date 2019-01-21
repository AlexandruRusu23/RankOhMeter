import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LolModel} from './listing-players.model';
import {Observable, Subject} from 'rxjs';
import {DialogDataComponent} from "../sim-match/sim-match.component";
import {MatDialog} from "@angular/material";

@Injectable()
export class LolService {

  selectedPlayers : LolModel[] = [];
  playersForSelect: LolModel[] = [];
  dataSource: LolModel[];
  playersChanged: Subject<LolModel[]> = new Subject<LolModel[]>();
  playersModalChanged: Subject<LolModel[]> = new Subject<LolModel[]>();


  private lolUrl = environment.apiUrl + '/listing-players';

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.playersForSelect = this.dataSource;
  }


  loadPlayers() {
    this.httpClient.get<LolModel[]>(this.lolUrl)
      .subscribe((players) => {
        this.dataSource = players;
        this.playersChanged.next(this.dataSource);
      });
  }

  loadPlayersModal() {
    this.httpClient.get<LolModel[]>(this.lolUrl)
      .subscribe((players) => {
        this.playersForSelect = players;
        this.playersModalChanged.next(this.playersForSelect);
      });
  }

  getAllPlayers() {
    return this.dataSource;
  }


}
