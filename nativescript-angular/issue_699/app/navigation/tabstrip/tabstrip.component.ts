import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import * as common from "../shared";
import * as shared from "../../shared";

@Component({
  moduleId: module.id,
  selector: "ns-tab-menu",
  templateUrl: "tabstrip.component.html"
})
export class TabMenuComponent implements OnInit {
  navigationItems: Array<shared.NavigationItem>;

  constructor(
    private _navigationService: shared.NavigationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.navigationItems = this._navigationService.routes;
  }
}
