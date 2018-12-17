import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LolModel} from './listing-players.model';
import {Observable} from 'rxjs';

@Injectable()
export class LolService {

  private lolUrl = environment.apiUrl + '/listing-players';

  constructor(private httpClient: HttpClient) {
  }

  getAllPlayers(): Observable<LolModel[]> {
    return this.httpClient.get<LolModel[]>(this.lolUrl);
  }
}
