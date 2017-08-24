import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  selector: 'app-main-page',
  templateUrl: 'pages/main-page/main-page.html',
  styleUrls: ['pages/main-page/main-page-common.css'],
})

export class MainPageComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}