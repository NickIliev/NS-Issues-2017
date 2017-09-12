import { Component, OnInit, AfterViewInit } from "@angular/core";
// import { RouterExtensions } from "nativescript-angular/router";
// import * as segmentedBarModule from "tns-core-modules/ui/segmented-bar";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { RouterExtensions } from "nativescript-angular/router";
import { AccountService } from "../accounts.service";
import { AccountModel } from "../accounts.model";
import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import { Page } from "ui/page";
declare var android;

@Component({
    moduleId: module.id,
    templateUrl: "accountsHome.component.html",
    styleUrls: ["../accounts.css"]
})

export class AccountsHomeComponent implements OnInit, AfterViewInit {

    public title = "My Financials";

    public isCurrentYearSelected = true;
    public isPriorYearSelected = false;
    public tabItems: Array<SegmentedBarItem>;

    public actionItemCount: number;
    public currentAccountList: AccountModel[] = [];
    public priorAccountList: AccountModel[] = [];

    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

    constructor(private _router: RouterExtensions,
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

        this.actionItemCount = accountsData.actionItems;
        // Current Year
        this.currentAccountList = accountsData.account.currentYear.accounts;

        // Prior Year
        this.priorAccountList = accountsData.account.priorYear.accounts;
    }

    ngAfterViewInit() {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }

    public goToMyAccounts() {
        this._router.navigate(["/accounts/myAccounts"], {
             animated: false
        });
    }

    public callPhone(phoneNo) {
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.CALL_PHONE],
                "App Needs The Following permissions")
                .then(() => {
                    // Permission Granted
                    phone.dial(phoneNo.toString(), true);
                })
                .catch(() => {
                    // Permission Denied
                });
        }
        else {
            // ios
            phone.dial(phoneNo.toString(), true);
        }
    }

    public onTabChange(args) {
        let segmentedBar = <SegmentedBar>args.object;
        switch (segmentedBar.selectedIndex) {
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
        this._router.back();
    }


}
