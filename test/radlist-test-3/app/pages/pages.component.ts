import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

export class Link {
    constructor(public title: string, public link: string) { }
}

let mainMenuLinks = [
    new Link("AAAAA Main", "/main")
];

@Component({
  selector: 'app-test',
  templateUrl: 'pages/pages.html',
})

export class PagesComponent implements OnInit {
  public links: Array<Link>;

  constructor(private page: Page) {
    this.links = [];

    mainMenuLinks.sort(function (a, b) {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    });

    for (let i = 0; i < mainMenuLinks.length; i++) {
        this.links.push(mainMenuLinks[i]);
    }
  }

  ngOnInit() {
  }
}