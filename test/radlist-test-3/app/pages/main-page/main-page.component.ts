import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  templateUrl: './main-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
  }
}