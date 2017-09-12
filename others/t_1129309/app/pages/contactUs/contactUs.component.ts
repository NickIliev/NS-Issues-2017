import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../shared/global";
import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import { Page } from "ui/page";
declare var android;

@Component({
    moduleId: module.id,
    templateUrl: "./contactUs.component.html",
    styleUrls: ["contactUs.css"]
})
export class ContactUsComponent implements OnInit, AfterViewInit {

    public title: String;
    public contactUsData: any = null;
    public togglePanel: number = -1;
    public timePeriod: boolean = true;
    public isLoggedIn: boolean = false;

    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

    public constructor(private _router: RouterExtensions,
        public _globals: Globals,
        public page: Page) {
        this.pageStartTime = new Date().getTime();
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        this.isLoggedIn = this._globals.isLoggedIn;
        this.title = "Contact Us";
        // this.contactUsData = {
        //     "memberServiceOperationHour": "Monday - Friday 8am - 6pm EST",
        //     "memberServiceNumber": "1-888-247-2583",
        //     "memberServiceNumberUnauthenticated": "1-888-247-BLUE (2583)",
        //     "fromTime": "8am",
        //     "toTime": "6pm",
        //     "additionalCallService": [{
        //         "title": "Financial Accounts",
        //         "operationTime": "Monday - Fri 8am - 6pm EST",
        //         "phoneNumberList": [{
        //             "displayPhoneNumber": "1-888-123-4567",
        //             "phoneNumber": "1-888-123-4567",
        //             "title": "Financial Account Support:",
        //             "availableTime": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         }]
        //     }, {
        //         "title": "Clinical Support",
        //         "operationTime": "Monday - Fri 8am - 6pm EST",
        //         "phoneNumberList": [{
        //             "displayPhoneNumber": "1-800-444-2426",
        //             "phoneNumber": "1-800-444-2426",
        //             "title": "Behavioral Health & \nSubstance Abuse",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         },
        //         {
        //             "displayPhoneNumber": "1-800-247-BLUE (2583)",
        //             "phoneNumber": "1-800-247-4567",
        //             "title": "Nurse Care Line / \nBlue Care Line",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         },
        //         {
        //             "displayPhoneNumber": "1-800-892-5119",
        //             "phoneNumber": "1-800-892-5119",
        //             "title": "Mail Service Pharmarcy",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         }]
        //     }]
        // };
        let getTime = new Date();
        this.timePeriod = (getTime.getHours() >= 8 && getTime.getHours() < 18);
    }

    ngOnInit() {
        //this.pageStartTime = new Date().getTime();
   }

    ngAfterViewInit() {
         setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }

    /* CALL AND ADD TO CONTACTS */

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

    tabClick(index) {
        this.togglePanel = this.togglePanel === index ? -1 : index;
    }

    public goBack() {
        this._router.back();
    }

}