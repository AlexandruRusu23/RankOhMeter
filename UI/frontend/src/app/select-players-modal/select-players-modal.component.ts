import {Component, Inject, OnInit} from '@angular/core';
import {LolModel} from '../models/lol.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-select-players-modal',
  templateUrl: './select-players-modal.component.html',
  styleUrls: ['./select-players-modal.component.css']
})
export class SelectPlayersModalComponent implements OnInit {
  playersListDataSource: LolModel[];
  boxPlayerId: string;
  displayedColumns: string[] = [
    'selectPlayer',
    'name',
    'division',
    'wins',
    'loses',
    'points',
    'mostUsedChamps',
  ];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private dialogRef: MatDialogRef<SelectPlayersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.boxPlayerId = data.playerNo;
    this.playersListDataSource = data.inputPlayersForTable;
  }

  ngOnInit() {
  }

  addPlayer(player: LolModel) {
    this.dialogRef.close([player, this.boxPlayerId]);
  }

}
