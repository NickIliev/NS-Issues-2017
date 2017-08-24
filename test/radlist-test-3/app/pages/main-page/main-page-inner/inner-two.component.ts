import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  templateUrl: './inner-two.html'
})

export class InnerTwoComponent implements OnInit {
  constructor(private page: Page) { }

  ngOnInit() {
  }
}