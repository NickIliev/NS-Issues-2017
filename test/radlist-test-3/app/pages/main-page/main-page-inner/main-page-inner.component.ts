import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  templateUrl: './main-page-inner.html'
})

export class MainPageInnerComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
  }
}