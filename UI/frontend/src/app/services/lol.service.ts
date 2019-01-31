import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LolModel} from '../models/lol.model';
import {Subject} from 'rxjs';
import {MatDialog} from "@angular/material";
import {GenericListModel} from "../models/generic-list.model";

@Injectable()
export class LolService {

  private lolUrl = environment.apiUrl + '/listing-players';
  private genericPlayers: GenericListModel<LolModel>;
  playersChanged: Subject<GenericListModel<LolModel>> = new Subject<GenericListModel<LolModel>>();

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}


  getPlayers() {
    return { ...this.genericPlayers };
  }

  loadPlayers(pageIndex: number, pageSize: number) {
    this.httpClient.get<GenericListModel<LolModel>>(this.lolUrl,
    {params: this.getFilterParams(pageIndex, pageSize)})
    .subscribe((players) => {
        this.genericPlayers = players;
        this.playersChanged.next(this.getPlayers());
      });
  }

  // loadPlayersModal() {
  //   this.httpClient.get<LolModel[]>(this.lolUrl)
  //     .subscribe((players) => {
  //       this.playersForSelect = players;
  //       this.playersModalChanged.next(this.playersForSelect);
  //     });
  // }

  getFilterParams(pageIndex: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', String(pageIndex));
    params = params.append('size', String(pageSize));

    return params;
  }

}
