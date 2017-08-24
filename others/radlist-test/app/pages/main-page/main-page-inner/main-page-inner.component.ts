import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  selector: 'app-main-page-inner',
  templateUrl: 'pages/main-page/main-page-inner/main-page-inner.html',
  styleUrls: ['pages/main-page/main-page-inner/main-page-inner-common.css'],
})

export class MainPageInnerComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}