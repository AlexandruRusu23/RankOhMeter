import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LolModel} from '../models/lol.model';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {GenericListModel} from '../models/generic-list.model';
import {TeamsModel} from "../models/teams.model";

@Injectable()
export class LolService {

  private lolUrl = environment.apiUrl + '/listing-players';
  private genericPlayers: GenericListModel<LolModel>;
  playersChanged: Subject<GenericListModel<LolModel>> = new Subject<GenericListModel<LolModel>>();

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
  }


  getPlayers() {
    return {...this.genericPlayers};
  }

  loadPlayers(pageIndex: number, pageSize: number, filter) {
    this.httpClient.get<GenericListModel<LolModel>>(this.lolUrl,
      {params: this.getFilterParams(pageIndex, pageSize, filter)})
      .subscribe((players) => {
        this.genericPlayers = players;
        this.playersChanged.next(this.getPlayers());
      });
  }

  getFilterParams(pageIndex: number, pageSize: number, filter) {
    let params = new HttpParams();
    params = params.append('page', String(pageIndex));
    params = params.append('size', String(pageSize));

    const filterFields = ['nameEquals', 'divisionEquals', 'mostUsedChamps'];

    const filters = filterFields.reduce((previousParams: HttpParams, currentField: string) => {
      if (!!filter[currentField]) {
        previousParams = previousParams.append(currentField, filter[currentField]);
      }
      return previousParams;
    }, params);
    return filters;

  }

  getPlayersForSelectingModal(): Observable<LolModel[]> {
    return this.httpClient.get<LolModel[]>(this.lolUrl + '/no-pag');
  }

  getRankingsForSelectedPlayers(team1, team2) {
    let teams: TeamsModel;
    teams = { team1: team1, team2: team2 };
    return this.httpClient.post<TeamsModel>(this.lolUrl + '/rankings', teams);
  }
}
