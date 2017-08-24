import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  selector: 'app-test',
  templateUrl: 'pages/test/test.html',
  styleUrls: ['pages/test/test-common.css'],
})

export class TestComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}