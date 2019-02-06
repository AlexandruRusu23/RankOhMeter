import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule, MatInputModule,
  MatLabel,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
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
  ],
})
export class CustomAngularMaterialModule {
}
