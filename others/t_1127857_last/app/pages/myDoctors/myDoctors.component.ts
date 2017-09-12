import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DoctorModel, ReviewModel, MemberModel } from "./myDoctors.model";
import { MyDoctorsService } from "./myDoctors.service";
import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import { Contact, KnownLabel } from "nativescript-contacts";
import { LocateAddress } from "nativescript-locate-address";
import { ScrollEventData } from "ui/scroll-view";
import { Page } from "ui/page";
import { Globals } from "../../shared/global";
import { ViewVisitHistoryComponent } from "./viewVisitHistory/viewVisitHistory.component";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { AsyncSubject } from 'rxjs/AsyncSubject';

import * as TimeDatePicker from 'nativescript-timedatepicker';
import { ChangeDetectorRef } from "@angular/core";  //Workaround to reflect date changes

var contacts = require("nativescript-contacts-lite");
declare var android;
var contactFound = null;

@Component({
    moduleId: module.id,
    templateUrl: "./myDoctors.component.html",
    styleUrls: ["./myDoctors.css"]
})
export class MyDoctorsComponent implements OnInit, AfterViewInit {

    public title: string;
    public searchQuery: string;
    private address: string = "";
    public doctorsList: DoctorModel[] = [];
    public memberList: MemberModel[] = [];
    public selectedMember: MemberModel;
    @ViewChild('filterWindow') filterWindow;
    @ViewChild('mainListView') mainListView;

    public filterDate;
    public isSearchExpanded:boolean = false; //Search-Filter


    public isDrpShow: boolean = false;

    bodyTapInteraction: boolean = true;
    cardIndex: number = -1;
    CardOpenIndex: number = -1;
    isBodyTapped: boolean = false;
    public contactIds = [];
    public isBusy = false;

    pageStartTime: number = 0;
    pageEndTime: number = 0;
    pageTimeDifference: number = 0;


    public constructor
        (
        private _locateAddress: LocateAddress,
        private _router: RouterExtensions,
        private _doctorService: MyDoctorsService,
        private _vcRef: ViewContainerRef,
        public _globals: Globals,
        private _visitHistoryModal: ModalDialogService,
        private page: Page,
        private cdr: ChangeDetectorRef) {
        this.title = "My Doctors";
        this.pageStartTime = new Date().getTime();
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        // GET MEMBER LIST
        let membersData = this._doctorService.getAllMembers();
        this.memberList = membersData;

        this.selectMember(this.memberList[0]);

        /* 
        MMAR-1399 - Spike story code 
        TimeDatePicker.init((result) => {
            var formattedDate = "";
            if(result){
                var formattedDate = result.split(" ")[1] + "/" + result.split(" ")[0] + "/" + result.split(" ")[2]
            }
             this.filterDate = formattedDate;
             this.cdr.detectChanges(); //Workaround to reflect date changes
        }, "Select Date", null);
        */

    }

    ngAfterViewInit() {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }


    /* Member Selection */

    public selectMember(member) {
        this.memberList.map((item) => item.isSelected = false);
        member.isSelected = true;
        this.selectedMember = member;

        this.doctorsList = [];

        // GET ALL DOCTORS
        let doctorsData = this._doctorService.getAllDoctors();
        this.doctorsList = doctorsData.doctors;
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
        this.mainListView.nativeElement.isUserInteractionEnabled = false;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    }

    public hideWindow(customWindow, duration) {
        this.mainListView.nativeElement.isUserInteractionEnabled = true;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    }







    public getSelectedMember(lookupList) {
        let filteredItems = lookupList.filter(item => item.isSelected === true);
        return filteredItems[0];
    }



    /* Three dots menu */

    public showOptions(index) {
        this.cardIndex = index;
        if (app.ios) {
            this.isBodyTapped = false;
        }
        this.CardOpenIndex = index;
    }

    public hideThreeDotsMenu() {
        // this.status = "scrolling";
        this.cardIndex = -1;
        this.isDrpShow = false;
        setTimeout(() => {
            // this.status = "not scrolling";
        }, 300);

    }

    public closePopMenu() {
        if (app.ios) {
            if (this.isBodyTapped) {
                this.cardIndex = -1;
                this.isDrpShow = false;
            }
            else {
                this.isBodyTapped = true;
            }
        }
        else if (app.android) {
            this.cardIndex = -1;
            this.isDrpShow = false;
        }
    }

    public keepOpen() {
        this.cardIndex = this.CardOpenIndex;
        if (app.ios) {
            this.isBodyTapped = false;
        }
    }

    /* MAPS */


    public locateAddress(address1, city, state, zipcode) {
        this._globals.locateAddress(address1, city, state, zipcode);
    }


    /* CALL AND ADD TO CONTACTS */

    public callPhone(phoneNo) {
        this.hideThreeDotsMenu();
        this._globals.callPhone(phoneNo);
    }


    public saveContact(doctor) {
        this.hideThreeDotsMenu();
        if (app.android) {
            //android condition
            permissions.requestPermissions([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, android.Manifest.permission.GET_ACCOUNTS],
                "App Needs The Following permissions")
                .then(() => {
                    this.checkContactExistsAndSave(doctor);
                })
                .catch(() => {
                    //Permission Denied
                });
        }
        else {
            //ios
            this.checkContactExistsAndSave(doctor);
        }
    }

    public updateAllContactIds(doctor) {
        var contactFields = ['phoneNumbers'];
        let self = this;
        contacts.getContacts(contactFields).then(function (args) {
            self.contactIds = args;
            self.checkContact(doctor);
        }, function (err) {
            console.log("Error: " + err);
        });
    }

    public checkContactExistsAndSave(doctor) {
        contactFound = new AsyncSubject<DoctorModel>();
        contactFound.subscribe(
            (result) => {
                if (result == null) {
                    this._globals.showToastMessage("Contact Already Exists!", "longer");
                    this.isBusy = false;
                }
                else {
                    var mModel: DoctorModel = result;
                    this.saveContactToContactList(mModel.name, mModel.mobile);
                }
            },
            err => console.log(err),
            () => console.log('Completed'));

        this.isBusy = true;
        this.updateAllContactIds(doctor);
    }


    public checkContact(doctor) {
        let desiredFields = ['phone'];
        let self = this;
        let flag: boolean = false;

        if (this.contactIds.length) {
            let index = 0;
            for (let contact of this.contactIds) {

                contacts.getContactById(contact.contact_id, desiredFields).then((result) => {
                    index++;
                    if (result) {
                        if (result.phone) {
                            for (let phoneNumber of result.phone) {
                                if (phoneNumber.number.replace(/ /g, "") == doctor.mobile) {
                                    contactFound.next(null);
                                    contactFound.complete();
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!flag && index == this.contactIds.length) {
                        contactFound.next(doctor);
                        contactFound.complete();
                    }
                }, (e) => { console.dir(e); });

            }

        }
        else {
            contactFound.next(doctor);
            contactFound.complete();
        }
    }

    public saveContactToContactList(name, mobile) {
        try {
            var newContact = new Contact();
            newContact.name.given = name;
            //newContact.name.family = "Doe";
            newContact.phoneNumbers.push({ label: KnownLabel.HOME, value: mobile.toString() }); // See below for known labels
            newContact.save();
            this._globals.showToastMessage("Contact Added Successfully!", "");
            this.isBusy = false;
        }
        catch (e) {
            this._globals.showToastMessage("Please ensure that you have configured atleast one account in your device before adding contacts.", "longer");
        }
    }

    /* Dropdown Functions */

    public keepDrpOpen() {
        this.isDrpShow = true;
    }

    public drpChange() {
        this.isDrpShow = !this.isDrpShow;
    }


    public modalOptions = {
        context: {},
        fullscreen: true,
        viewContainerRef: this._vcRef
    };

    public showVisitHistory(doctor) {
        this.cardIndex = -1;
        this._doctorService.selectedMember = this.getSelectedMember(this.memberList);
        this._doctorService.selectedDoctor = doctor;
        this._visitHistoryModal.showModal(ViewVisitHistoryComponent, this.modalOptions).then(res => {

        });
    }



    /* Activity Indicator */
    public onBusyChanged() {
        console.log("changed");
    }

    public showExpandedSearchView() { // Search-Filter
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    }
    public showDefaultSearchView() { // Search-Filter
        this.isSearchExpanded = false;
    }

    public goBack() {
        this._router.back();
    }

    /* DATE SPIKE */
    /*
    MMAR-1399 - Spike story code 
    public showDatepicker() {
        TimeDatePicker.showDatePickerDialog();
    }
    */
}