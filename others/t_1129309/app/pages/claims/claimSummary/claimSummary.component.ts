import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ClaimModalComponent } from "../claimModal/claimModal.component";
import { ClaimService } from "../claims.service";
import { ClaimModel } from "../claims.model";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./claimSummary.component.html",
    styleUrls: ["claimSummary.css"]
})
export class ClaimSummaryComponent implements OnInit, AfterViewInit {

    public isBusy = false;

    public claimList: ClaimModel[] = [];
    public title: string;
    public selectedMember;
    @ViewChild('filterWindow') filterWindow;
    

    public isSearchExpanded:boolean = false; //Search-Filter

    pageStartTime: number = 0;
    pageEndTime: number = 0;
    pageTimeDifference: number = 0;

    public memberList = [
        {
            "id": 4231,
            "firstName": "Steve",
            "lastName": "Appleseed",
            "type": "Subscriber",
            "isSelected": true
        },
        {
            "id": 1234,
            "firstName": "Mark",
            "lastName": "Appleseed",
            "type": "Dependent",
            "isSelected": false
        },
        {
            "id": 6789,
            "firstName": "Steve",
            "lastName": "Appleseed",
            "type": "Dependent",
            "isSelected": false
        }
    ];

    public constructor(private _claimService: ClaimService,
        private claimModal: ModalDialogService,
        private vcRef: ViewContainerRef,public globals: Globals,
        private _routerExtensions: RouterExtensions,
        private page: Page) {
        this.pageStartTime = new Date().getTime();
        this.title = "My Claims";
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        this.selectedMember = this.memberList[0];

        // GET ALL CLAIMS
        let claimsData = this._claimService.getAllClaims();
        this.claimList = claimsData.ROWS;
    }

    ngAfterViewInit() {
         setTimeout(() => {
              this.globals.loader.hide();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }


    public selectMember(member) {
        this.memberList.map((item) => item.isSelected = false);
        member.isSelected = true;
        this.selectedMember = member;

        this.claimList = [];

        // GET ALL CLAIMS
        let claimsData = this._claimService.getAllClaims();
        this.claimList = claimsData.ROWS;
        this.hideWindow(this.filterWindow, 400);
        this.showDefaultSearchView();
    }

    public toggleFilter() {
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showWindow(this.filterWindow, 0);
        }
        this.showDefaultSearchView();

    }

    public showWindow(customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    }

    public hideWindow(customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    }

    public hideAllOverlayWindow() { 
        this.hideWindow(this.filterWindow, 0);
    }

    public loadMoreClaims() {

    }

    public loadClaimDetail(args, type) {
            //LOADING CLAIM DETAIL
            let selectedClaim = this.claimList[args.index];
            this._claimService.setSelectedClaim(selectedClaim);
            this.hideAllOverlayWindow();
            this.globals.loader.show();
            this._routerExtensions.navigate(["/claimSummary/ClaimDetail"], {
                animated: false
            });
    }

    public showExpandedSearchView() { // Search-Filter
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    }
    public showDefaultSearchView() { // Search-Filter
        this.isSearchExpanded = false;
    }

    public goBack() {
        this._routerExtensions.back();
    }

}