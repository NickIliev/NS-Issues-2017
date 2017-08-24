import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  selector: 'app-test-inner',
  templateUrl: 'pages/test/test-inner/test-inner.html',
  styleUrls: ['pages/test/test-inner/test-inner-common.css'],
})

export class TestInnerComponent implements OnInit {
  dataItems: any[] = [];

  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;

    setTimeout(() => this.dataItems = [
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
      { name: 'asdnasdansdsda', description: 'asdksandsakndasdm' },
    ], 1000);
  }
}