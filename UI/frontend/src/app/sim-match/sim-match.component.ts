import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  // animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-sim-match',
  templateUrl: './sim-match.component.html',
  styleUrls: ['./sim-match.component.css']
})
export class SimMatchComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(DialogDataComponent, {
      data: {
        // animal: 'panda'
      }
    });
  }

  simMatch() {
    console.log('Sim match');
  }

}


@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: 'dialog-select-player.html',
})
export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
