import { Component, OnInit,AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { WebView, LoadEventData } from "ui/web-view";
import { Globals } from "../../../shared/global";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    selector: "mb-home-article",
    templateUrl: "./articleDetail.component.html",
    styleUrls: ["../home.css"]

})
export class ArticleDetailComponent implements OnInit, AfterViewInit  {
    title: string = "Healthy Living";
    public htmlString = `<!DOCTYPE html><html><head><title>MyTitle</title><meta charset="utf-8" />
     <style>
     body{
color: #4c4c4c;
font-family: "Roboto-Light";
    font-size: 14px;
   padding:0;
   margin: 0;
       }
     </style>
     </head><body>
     <p>People who seem to have a deep tan
year-round -- whether from the sun or indoor
tanning -- may be "addicted" to tanning. And
new research suggests there's also a link
between such tanning and other addictions.</p>
<p>"People who were tanning-dependent were
six times as likely to have a history of
alcohol dependence, and were almost three
times as likely to have seasonal affective
disorder (SAD)," said study leader Brenda </p>
 <p>People who seem to have a deep tan
year-round -- whether from the sun or indoor
tanning -- may be "addicted" to tanning. And
new research suggests there's also a link
between such tsanning and other addictions.</p>
<p>"People who were tanning-dsependent were
six times as likely to have a history of
alcohol dependence, and were almost three
times as likely to have seasonal afffective
disorder (SAD)," saisd study leader Brenda </p>
     </body></html>`;
 public firstWebViewSRC = `
     <p>People who seem to have a deep tan
year-round -- whether from the sun or indoor
tanning -- may be "addicted" to tanning. And
new research suggests there's also a link
between such tanning and other addictions.</p>
<p>"People who were tanning-dependent were
six times as likely to have a history of
alcohol dependence, and were almost three
times as likely to have seasonal affective
disorder (SAD)," said study leader Brenda </p>
 <p>People who seem to have a deep tan
year-round -- whether from the sun or indoor
tanning -- may be "addicted" to tanning. And
new research suggests there's also a link
between such tsanning and other addictions.</p>
<p>"People who were tanning-dsependent were
six times as likely to have a history of
alcohol dependence, and were almost three
times as likely to have seasonal afffective
disorder (SAD)," saisd study leader Brenda </p>
    `;

    constructor(public globals: Globals,
        private _routerExtensions: RouterExtensions,
        public page: Page) {

    }
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    ngAfterViewInit() {
   
      setTimeout(() => {
              this.globals.loader.hide();
        }, 1000);  
    }
    goBack() {
        this._routerExtensions.back();
    }
}
