import {Component} from '@angular/core';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav-responsive',
  templateUrl: 'sidenav-responsive.component.html',
  styleUrls: ['sidenav-responsive.component.css'],
})
export class SidenavResponsiveComponent {

  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(50).fill(0).map(() =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
}
