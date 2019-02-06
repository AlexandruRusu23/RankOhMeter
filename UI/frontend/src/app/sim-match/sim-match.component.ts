import {Component, OnInit} from '@angular/core';
import {LolService} from '../services/lol.service';
import {LolModel} from '../models/lol.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SelectPlayersModalComponent} from '../select-players-modal/select-players-modal.component';

@Component({
  selector: 'app-sim-match',
  templateUrl: './sim-match.component.html',
  styleUrls: ['./sim-match.component.css']
})
export class SimMatchComponent implements OnInit {
  totalPlayers: number;
  players: LolModel[];
  playersBox = {
    'player1': null,
    'player2': null,
    'player3': null,
    'player4': null,
    'player5': null,
    'player6': null,
    'player7': null,
    'player8': null,
    'player9': null,
    'player10': null,
  };

  constructor(public lolService: LolService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPlayersForSelect();
  }

  openDialog(boxPlayer: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose=true;

    dialogConfig.data = {
      playerNo: boxPlayer,
      inputPlayersForTable: this.players
    };

    const dialogRef = this.dialog.open(SelectPlayersModalComponent, dialogConfig);



    dialogRef.afterClosed().subscribe(
      (res) => {
        if(this.playersBox[res[1]] != null) {
          this.players.push(this.playersBox[res[1]]);
        }
        this.players.splice(this.players.indexOf(res[0]),1);
        this.playersBox[res[1]] = res[0];
      }
    );
  }

  // TODO
  simMatch() {
    console.log('Sim match');
  }

  private getPlayersForSelect() {
    this.lolService.getPlayersForSelectingModal().subscribe(
      (genericPlayers: LolModel[]) => {
        this.players = genericPlayers;
      }
    );
  }

  isSelectedPlayer(player: string): boolean {
    return this.playersBox[player] !== null;
  }

  getPlayerName(player: string) {
    if (this.playersBox[player] != null) {
      return this.playersBox[player].name;
    }
  }
}
