import { Component, OnInit, AfterViewInit } from "@angular/core";
// import { RouterExtensions } from 'nativescript-angular/router';
// import * as segmentedBarModule from "tns-core-modules/ui/segmented-bar";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { RouterExtensions } from "nativescript-angular/router";
import { AccountService } from "../accounts.service";
import { AccountModel } from "../accounts.model";
import { Page } from "ui/page";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "myAccounts.component.html",
    styleUrls: ["../accounts.css"]
})

export class MyAccountsComponent implements OnInit, AfterViewInit {

    public tabItems: Array<SegmentedBarItem>;
    public tabProperty: string = "Item 1";
    public title = "My Financials";
    public isCurrentYearSelected = true;
    public isPriorYearSelected = false;
    public currentAccountList: AccountModel[] = [];
    public priorAccountList: AccountModel[] = [];

    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

     constructor(private _routerExtensions: RouterExtensions,public _globals: Globals,
        private _accountService: AccountService,
        private page: Page) {
        this.pageStartTime = new Date().getTime();

        this.tabItems = [];
        let tmpSegmentedBar1: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
        tmpSegmentedBar1.title = "2017";
        this.tabItems.push(tmpSegmentedBar1);

        let tmpSegmentedBar2: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
        tmpSegmentedBar2.title = "Prior Year";
        this.tabItems.push(tmpSegmentedBar2);
          if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }

    ngOnInit() {
        let accountsData = this._accountService.getAllAccounts();

        // Current Year
        this.currentAccountList = accountsData.account.currentYear.accounts;

        // Prior Year
        this.priorAccountList = accountsData.account.priorYear.accounts;
    }

    ngAfterViewInit() {
         setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        switch (segmetedBar.selectedIndex) {
            case 0:
                this.isCurrentYearSelected = true;
                this.isPriorYearSelected = false;
                break;
            case 1:
                this.isCurrentYearSelected = false;
                this.isPriorYearSelected = true;
            default:
                break;
        }
    }

    public goBack() {
        this._routerExtensions.back();
    }

}
