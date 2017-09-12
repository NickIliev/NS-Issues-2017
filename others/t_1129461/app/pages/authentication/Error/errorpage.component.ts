import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "./errorpage.component.html",
    styleUrls: ["../authentication.css"]
})
export class ErrorPageComponent {
    title: string = "Authentication";
     public constructor(private router: Router,  private routerExtensions: RouterExtensions, ) {}
    public goBack() {
    this.routerExtensions.back();
  }
}