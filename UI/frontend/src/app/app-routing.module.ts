import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {SidenavResponsiveComponent} from './sidenav-responsive/sidenav-responsive.component';

const routes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } },
  { path: 'nav', component: SidenavResponsiveComponent, data: { title: 'Nav Component' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
