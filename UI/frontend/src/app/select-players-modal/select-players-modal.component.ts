import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {LolModel} from '../models/lol.model';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-select-players-modal',
  templateUrl: './select-players-modal.component.html',
  styleUrls: ['./select-players-modal.component.css']
})
export class SelectPlayersModalComponent implements OnInit {
  playersListDataSource: LolModel[];
  dataSource: MatTableDataSource<LolModel>;
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

  constructor(
    private dialogRef: MatDialogRef<SelectPlayersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.boxPlayerId = data.playerNo;
    this.playersListDataSource = data.inputPlayersForTable;
    this.dataSource = new MatTableDataSource(this.playersListDataSource);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  addPlayer(player: LolModel) {
    this.dialogRef.close([player, this.boxPlayerId]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
