import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule, MatInputModule,
  MatLabel,
  MatSnackBar,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule, MatSnackBarModule,
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class CustomAngularMaterialModule {
}
