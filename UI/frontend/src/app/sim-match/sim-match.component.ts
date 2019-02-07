import {Component, Inject, OnInit} from '@angular/core';
import {LolService} from '../services/lol.service';
import {LolModel} from '../models/lol.model';
import {
  MAT_DIALOG_DATA,
  MAT_SNACK_BAR_DATA,
  MatDialog,
  MatDialogConfig,
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import {SelectPlayersModalComponent} from '../select-players-modal/select-players-modal.component';
import {Router} from "@angular/router";

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
  private simMatchButton = false;
  private hideBoxes = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(public lolService: LolService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPlayersForSelect();
  }

  openDialog(boxPlayer: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      playerNo: boxPlayer,
      inputPlayersForTable: this.players
    };

    const dialogRef = this.dialog.open(SelectPlayersModalComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      (res) => {
        if (this.playersBox[res[1]] != null) {
          this.players.push(this.playersBox[res[1]]);
        }
        this.players.splice(this.players.indexOf(res[0]), 1);
        this.playersBox[res[1]] = res[0];
      }
    );
  }

  checkBoxes() {
    if (this.playersBox.player1 != null &&
      this.playersBox.player2 != null &&
      this.playersBox.player3 != null &&
      this.playersBox.player4 != null &&
      this.playersBox.player5 != null &&
      this.playersBox.player6 != null &&
      this.playersBox.player7 != null &&
      this.playersBox.player8 != null &&
      this.playersBox.player9 != null &&
      this.playersBox.player10 != null) {

      this.simMatchButton = !this.simMatchButton;
      return true;

    } else {
      return false

    }
  }

  simMatch() {
    let team1 = [
      this.playersBox.player1,
      this.playersBox.player2,
      this.playersBox.player3,
      this.playersBox.player4,
      this.playersBox.player5
    ];

    let team2 = [
      this.playersBox.player6,
      this.playersBox.player7,
      this.playersBox.player8,
      this.playersBox.player9,
      this.playersBox.player10
    ];

    this.lolService.getRankingsForSelectedPlayers(team1, team2).subscribe(
      (winners) => {
        this.hideBoxes = !this.hideBoxes;

        let rankingTeam1 = winners.team1.map(value => value['ranking']).reduce((sum, value) => sum + value, 0);
        let rankingTeam2 = winners.team2.map(value => value['ranking']).reduce((sum, value) => sum + value, 0);

        let winner = rankingTeam1 > rankingTeam2 ? this.getPlayerNames(winners.team1) : this.getPlayerNames(winners.team2);

        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          data: winner
        });
      }
    );

  }

  getPlayerNames(team): string {
    return team.map(value => value['playerName']).reduce((sum, value) => sum + value + ", ", " ");
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


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <div> A castigat echipa formata din jucatorii:</div>
    <div>{{team}}</div>`,
  styles: [],
})
export class SnackBarComponent {
  team: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.team = data;
  }
}
