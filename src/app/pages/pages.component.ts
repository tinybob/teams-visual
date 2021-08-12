import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.css'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class PagesComponent implements OnInit {

  // menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
