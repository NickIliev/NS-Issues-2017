import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../shared/global";
import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import { Contact, KnownLabel } from "nativescript-contacts";
import { ScrollEventData } from "ui/scroll-view";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ViewPrescriptionModalComponent } from "./ViewPrescriptionModal/ViewPrescriptionModal.component";
import { MedicationService } from "./medication.service";
import { MedicationModel, MemberModel } from "./medication.model";
import { DependentModel } from "../../shared/models/dependent.model";
import { LocateAddress } from "nativescript-locate-address";
import { Page } from "ui/page";
declare var android;
import { AsyncSubject } from 'rxjs/AsyncSubject';

var contacts = require("nativescript-contacts-lite");
declare var android;
var contactFound = null;

@Component({
    moduleId: module.id,
    templateUrl: "./medication.component.html",
    styleUrls: ["medication.css"]

})
export class MedicationComponent implements OnInit, AfterViewInit {

    public title: string;
    public searchQuery: string;
    public show: boolean = false;

    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;
    
    medicationList: MedicationModel[];
    @ViewChild('filterWindow') filterWindow;
    @ViewChild('mainListView') mainListView;

    public memberList: MemberModel[] = [];

    public isSearchExpanded:boolean = false; //Search-Filter

    bodyTapInteraction: boolean = true;
    cardIndex: number = -1;
    CardOpenIndex: number = -1;
    isBodyTapped: boolean = false;
    isDrpShow: boolean = false;
    MemebersDisplayName: DependentModel[];
    public isBusy = false;
    public contactIds = [];

    public selectedMember: MemberModel;

    public modalOptions = {
        context: {},
        fullscreen: true,
        viewContainerRef: this._vcRef
    };

    constructor(private _router: Router,
        private _routerExtensions: RouterExtensions,
        public _globals: Globals,
        private _vcRef: ViewContainerRef,
        private _viewPrescriptionModal: ModalDialogService,
        public _medicationService: MedicationService,
        private _locateAddress: LocateAddress,
        private page: Page) {
        this.pageStartTime = new Date().getTime();
        this.title = "My Medications";
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        // GET MEMBER LIST
        let membersData = this._medicationService.getAllMembers();
        this.memberList = membersData;
        this.selectMember(this.memberList[0]);
    }

    ngAfterViewInit() {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }

    public getSubscriber() {
        let subscriber;
        this.memberList.map((item) => {
            if (item.type === "Subscriber") {
                subscriber = item;
            }
        });
        return subscriber;
    }

    public selectMember(member) {
        this.memberList.map((item) => item.isSelected = false);
        member.isSelected = true;
        this.selectedMember = member;

        this.medicationList = [];

        // GET ALL DOCTORS
        let medicationData = this._medicationService.getAllMedications();
        this.medicationList = medicationData;
        this.hideWindow(this.filterWindow, 400);
        this.showDefaultSearchView();
    }

    public hideThreeDotsMenu() {
        // this.status = "scrolling";
        this.cardIndex = -1;
        this.isDrpShow = false;
        setTimeout(() => {
            // this.status = "not scrolling";
        }, 300);

    }

    public goBack() {
        this._routerExtensions.back();
    }
    public showOptions(index) {
        this.isDrpShow = false;
        this.cardIndex = index;
        if (app.ios) {
            this.isBodyTapped = false;
        }
        this.CardOpenIndex = index;
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

    public keepDrpOpen() {
        this.isDrpShow = true;
    }

    public drpChange() {
        this.isDrpShow = !this.isDrpShow;
        this.cardIndex = -1;
    }



    public prescriptionHistory(medicaiton: MedicationModel) {
        this.cardIndex = -1;
        this._medicationService.historySelectedMember = medicaiton;
        this._medicationService.selectedUser = this.selectedMember;
        this._viewPrescriptionModal.showModal(ViewPrescriptionModalComponent, this.modalOptions).then(res => {

        });
    }

    public viewClaim() {
        this.hideThreeDotsMenu();
        this._routerExtensions.navigate(["/claimSummary"], {
            animated: false
        });
    }

    public callPhone(phoneNo) {
        this.hideThreeDotsMenu();
        this._globals.callPhone(phoneNo);
    }


    public saveContact(medicaiton: MedicationModel) {
        this.hideThreeDotsMenu();
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, android.Manifest.permission.GET_ACCOUNTS],
                "App Needs The Following permissions")
                .then(() => {
                    this.checkContactExistsAndSave(medicaiton);
                })
                .catch(() => {
                    // Permission Denied
                });
        }
        else {
            // ios
            this.checkContactExistsAndSave(medicaiton);
        }
    }

    public updateAllContactIds(medication: MedicationModel) {
        var contactFields = ['phoneNumbers'];
        let self = this;
        contacts.getContacts(contactFields).then(function (args) {
            self.contactIds = args;
            self.checkContact(medication);
        }, function (err) {
            console.log("Error: " + err);
        });
    }

    public checkContactExistsAndSave(medication: MedicationModel) {
        contactFound = new AsyncSubject<MedicationModel>();
        contactFound.subscribe(
            (result) => {
                if (result == null) {
                    this._globals.showToastMessage("Contact Already Exists!", "longer");
                    this.isBusy = false;
                }
                else {
                    var mModel: MedicationModel = result;
                    this.saveContactToContactList(mModel.doctorname, mModel.doctorMobile);
                }
            },
            err => console.log(err),
            () => console.log('Completed'));

        this.isBusy = true;
        this.updateAllContactIds(medication);
    }


    public checkContact(medication: MedicationModel) {
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
                                if (phoneNumber.number.replace(/ /g, "") == medication.doctorMobile) {
                                    contactFound.next(null);
                                    contactFound.complete();
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!flag && index == this.contactIds.length) {
                        contactFound.next(medication);
                        contactFound.complete();
                    }
                }, (e) => { console.dir(e); });

            }

        }
        else {
            contactFound.next(medication);
            contactFound.complete();
        }
    }

    public saveContactToContactList(name, mobile) {
        try {
            let newContact = new contacts.Contact();
            newContact.name.given = name;
            // newContact.name.family = "Doe";
            newContact.phoneNumbers.push({ label: KnownLabel.HOME, value: mobile.toString() }); // See below for known labels
            newContact.save();
            this._globals.showToastMessage("Contact Added Successfully!", "");
            this.isBusy = false;
        }
        catch (e) {
            this._globals.showToastMessage("Please ensure that you have configured atleast one account in your device before adding contacts.", "longer");
        }
    }


    public locateAddress(address1, city, state, zipcode) {
        this._globals.locateAddress(address1, city, state, zipcode);
    }



    

    public showExpandedSearchView() { // Search-Filter
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    }
    public showDefaultSearchView() { // Search-Filter
        this.isSearchExpanded = false;
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

}
