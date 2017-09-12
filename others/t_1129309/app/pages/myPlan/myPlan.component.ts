import { Component, ElementRef,OnInit, AfterViewInit, Renderer, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { MyPlanHelpInfoComponent } from "./myplanhelp/myplanhelpinfo.component";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Globals } from "../../shared/global";

@Component({
    moduleId: module.id,
    templateUrl: "./myPlan.component.html",
    styleUrls: ["myPlan.css"]
})
export class MyPlanComponent implements OnInit, AfterViewInit {

    public title: String;
    public accordionList: any = new Object;
    public togglePanel: number = -1;
    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

    public constructor(private _routerExtensions: RouterExtensions,
        elementRef: ElementRef, renderer: Renderer,   public _globals: Globals,
        private helpInfoModalDialogService: ModalDialogService, private vcRef: ViewContainerRef) {
        this.title = "My Plan";
        this.pageStartTime = new Date().getTime();
        this.accordionList = {
            subscriberId: "983575014",
            subscriberIdSuffix: "00",
            groupNumber: "004026124",
            benefitStartDate: "01/01/2017",
            provisionList: [
                { title: "Who's Covered", provisionHeader: [{ text: "Gretchen Sorensen", type: "subscriber" }, { text: "Ivan Sorensen", type: "spouse" }, { text: "Greta Sorensen", type: "dependent" }]},
                { title: "Co-Pays", provisionHeader: [{ text: "Office Visit", amount: "25/35" }, { text: "Behavioral Health", amount: "25" }, { text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$0 for Enhanced Benefits Tier", "$250 per member", "$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only. (counts toward Basic Benefits Tier deductible)" },
                { title: "Deductible", provisionHeader: [{ text: "Office Visit", amount: "25/35" }, { text: "Behavioral Health", amount: "25" }, { text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "" },
                { title: "Out-of-Pocket Maximum", provisionHeader: [{ text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only." },
                { title: "Overall Benefit Maximum", provisionHeader: [{ text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only." }
            ]
        };
    }

    public tabClick(index) {
        this.togglePanel = this.togglePanel === index ? -1 : index;
    }

    cards() {
         this._globals.loader.show();
        this._routerExtensions.navigate(["/cards"], {
            animated: false
        });
        setTimeout(() => {
            this.togglePanel = -1;
        }, 500)
    }

    public goBack() {
        this._routerExtensions.back();
    }

 ngOnInit() {

    //  this.pageStartTime = new Date().getTime();
 }

   ngAfterViewInit() {
        setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
      }


    public showHelpInfoModal() {
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.helpInfoModalDialogService.showModal(MyPlanHelpInfoComponent, options).then((res) => {
        });
    }

}