import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { FormValidationService } from "../../shared/services/formValidation.service";
import { ScrollEventData } from "ui/scroll-view";
import { CardsService } from "./cards.service";
import { MemberListModel } from "./memberList.model";
import { Printer } from "nativescript-printer";
import { ImageSource } from "image-source";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import { File, knownFolders } from "file-system";
import { getImage } from "http";
import { Image } from "ui/image";
import { Globals } from "../../shared/global";
import { CardDetailComponent } from "./cardDetail/cardDetail.component";
import { DrawerService } from "../../shared/services/drawer.service";
import * as http from "http";
import * as fs from "file-system";
import * as utilModule from "utils/utils";
import * as enums from "ui/enums";
import * as permissions from "nativescript-permissions";
import * as email from "nativescript-email";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as app from "tns-core-modules/application";

let plugin = require("nativescript-screenshot");



declare let android;
declare let NSObject;

@Component({
    moduleId: module.id,
    templateUrl: "./cards.component.html",
    styleUrls: ["./cards.css"],
})
export class CardsComponent implements OnInit, AfterViewInit {
    public busy: boolean;
    title: string = "My Cards";
    isBodyTapped: boolean = false;
    public showMoreOptions: boolean = false; // prashuk
    public isEmailClicked: boolean = false; // prashuk
    public emailid: string; // prashuk
    public isEmailValid: boolean; // prashuk
    public invalidEmailLbl: boolean = false; // prashuk
    public isEmailSent: boolean = false;
    public isFileDownloaded: boolean = false;
    composeOptions: email.ComposeOptions;
    // isDrpShow: boolean = false;
    public printer: Printer;
    // selectedMemberName: string;
    selectedMemberId: string;
    memberList: MemberListModel[] = [];
    selectedMember: MemberListModel;
    MemebersDisplayName: any[];
    imgSrc: ImageSource = null;
    emailPath: any;
    pageStartTime: number = 0;
    pageEndTime: number = 0;
    pageTimeDifference: number = 0;

    public constructor(private router: Router,
        private _cardService: CardsService,
        public _globals: Globals,
        private _routerExtensions: RouterExtensions,
        private _eref: ElementRef,
        private page: Page,
        private vcRef: ViewContainerRef,
        private drawerService: DrawerService,
        private modalParams: ModalDialogService,
        private _formValidationService: FormValidationService) {
        this.pageStartTime = new Date().getTime();
        this.printer = new Printer();

    }

    @ViewChild("idCardView") idCardView: ElementRef;
    @ViewChild("idCardViewPrint") idCardViewPrint: ElementRef;
    @ViewChild('filterWindow') filterWindow;
    @ViewChild('cardsView') cardsView;
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        // let memberData = this._cardService.getAllMembers();
        // for (let member of memberData) {
        //   this.memberList.push(new MemberListModel(member.firstName,member.lastName,member.memberId,member.frontCardSrc,member.backCardSrc,member.type,member.isSelected));
        // }
        this.memberList = this._cardService.getAllMembers();
        this.setMemebersDisplayName();
        this.memberList.map((item) => {
            if (item.isSelected) {
                // this.selectedMemberName = item.name;
                this.selectedMemberId = item.memberId;
                this.selectedMember = item;
            }
        });


    }

    ngAfterViewInit() {
        setTimeout(() => {
              this._globals.hideLoader();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }


    // back button
    public goBack() {
        this.showMoreOptions = false;
        this._routerExtensions.back();
    }

    sendClientEmail() {
        this.showMoreOptions = false;
        this.imgSrc = plugin.getImage(this.idCardView.nativeElement);
        this.emailPath = 'base64://' + this.imgSrc.toBase64String("png");
        this.composeOptions = {
            //to: ['jaishankar.b@cognizant.com'],
            /* subject: "Yo",
            body: "Hello <strong>dude</strong> :)",
            to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
            cc: ['ccperson@somewhere.com'],
            bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'], */
            attachments: [
                {
                    fileName: 'Blue.png',
                    path: this.emailPath,
                    mimeType: 'image/png'
                }
            ],
        }
        email.available().then(available => {
            if (available) {
                email.compose(this.composeOptions).then(result => {
                    if (result) {
                        this.showMoreOptions = false;
                        // this._globals.showToastMessage("email was sent", "longer");                      
                    }
                    else {
                        this.showMoreOptions = false;
                        //this._globals.showToastMessage("configure your email", "longer");
                    }
                }).catch(error => {
                    this.showMoreOptions = false;
                    this._globals.showToastMessage("configure your email", "longer");
                });
            }
            else {
                this.showMoreOptions = false;
                this._globals.showToastMessage("configure your email", "longer");
            }
        }).catch(error => {
            this.showMoreOptions = false;
            this._globals.showToastMessage("configure your email", "longer");
        });
    }

    public showOptions(memid) {
        this.showMoreOptions = true;
        this.isBodyTapped = false;
    }

    public toggleFilter() {
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showMoreOptions = false;
            this.showWindow(this.filterWindow, 0);
        }

    }

    public showWindow(customWindow, duration) {
        this.cardsView.nativeElement.isUserInteractionEnabled = false;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    }

    public hideWindow(customWindow, duration) {
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    }
    public hideAllOverlayMenu() {
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        this.hideWindow(this.filterWindow, 0);
    }
    public bodyTap() {
        if (app.ios) {
            if (this.isBodyTapped) {
                this.showMoreOptions = false;
                // this.isDrpShow = false;
                // this.filterWindow.nativeElement.style.visibility = 'hidden';
                this.hideWindow(this.filterWindow, 0);
            }
            else {
                this.isBodyTapped = true;
            }
        }
        else if (app.android) {
            this.showMoreOptions = false;
            // this.isDrpShow = false;
            // this.filterWindow.nativeElement.style.visibility = 'hidden';
            this.hideWindow(this.filterWindow, 0);
        }
    }

    public keepOpen() {
        this.showMoreOptions = true;
    }

    public planNavigate() {
        this._globals.showLoader();
        this._routerExtensions.navigate(["/myPlan"], {
            animated: false
        });
        this.showMoreOptions = false;
        this.isEmailClicked = false;
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
    }
    public getSubscriber() {
        let subscriber: string;
        this.memberList.map((item) => {
            if (item.type === "Subscriber") {
                subscriber = item.firstName;
            }
        });
        return subscriber;
    }
    public setMemebersDisplayName() {
        this.MemebersDisplayName = this.memberList;
        this.MemebersDisplayName.map((item) => {
            item.type === "Subscriber" ? item.isSelected = true : item.isSelected = false;
            if (this.getSubscriber() === item.firstName) {
                item.displayName = item.firstName + " " + item.lastName + " (" + item.type + ")";
            }
            else {
                item.displayName = item.firstName + " " + item.lastName;
            }
        });


    }

    public printImage() {
        this.showMoreOptions = false;
        this.printer.isSupported().then((supported) => {
            // this.showToastMessage("Printing inprogress ...", "longer");
            // let appPath = fs.knownFolders.currentApp().path;
            // let currentImage= this.currentFrontCardSrc;
            // let currentImage = "~/dummyData/medicalcards.PNG";
            // currentImage = currentImage.substr(1);
            // let imgPath = appPath + currentImage;
            // let imgSrc = new ImageSource();
            // imgSrc.loadFromFile(imgPath);
            this.imgSrc = plugin.getImage(this.idCardView.nativeElement);
            this.printer.printImage({
                imageSrc: this.imgSrc
            }).then((success) => {
                CardsComponent.feedback(success);
            }, (error) => {
                console.log("Error: " + error);
            });
        }, (error) => {
            console.log("Error: " + error);
            this._globals.showToastMessage("Printer Not supported !!", "longer");
        });
    }

    private static feedback(success: boolean) {
        // on Android there's no way to know whether or not printing succeeded
        if (!isAndroid) {
            alert(success ? "Printed!" : "Not printed");
        }
    }

    public sendEmail(emailid) {
        this.isEmailClicked = true;
        this.showMoreOptions = false;
    }

    public successMsg(emailid) {
        this.isEmailValid = this._formValidationService.emailMatchValidator(emailid);
        if (emailid !== undefined && emailid !== "" && this.isEmailValid) {
            this.isEmailClicked = false;
            this.isEmailSent = true;
            this.emailid = "";
        } else {
            this.isEmailClicked = true;
            this.invalidEmailLbl = true;
        }
    }

    public cancelBtn() {
        this.isEmailClicked = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
    }

    public okBtn() {
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
    }

    // prashuk


    public drpChange() {
        // this.isDrpShow = !this.isDrpShow;
        this.isEmailClicked = false;
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
        this.showMoreOptions = false;
    }
    // public keepDrpOpen() {
    //     this.isDrpShow = true;
    // }
    public selectMember(member) {
        this.memberList.map((item) => item.isSelected = false);
        // this.selectedMemberName = member.name;
        this.showMoreOptions = false;
        member.isSelected = true;
        this.selectedMember = member;
        this.selectedMemberId = member.memberId;
        // this.isDrpShow = false;
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        // this.filterWindow.nativeElement.style.visibility = 'hidden';
        this.hideWindow(this.filterWindow, 400);
    }

    public getSelectedMember(lookupList) {
        let filteredItems = lookupList.filter(item => item.isSelected === true);
        return filteredItems[0];
    }
    public onScroll(args: ScrollEventData) {
        // this.status = "scrolling";
        this.showMoreOptions = false;
        // this.isDrpShow = false;
        // this.filterWindow.nativeElement.style.visibility = 'hidden';
        this.hideWindow(this.filterWindow, 400);
        setTimeout(() => {
            // this.status = "not scrolling";
        }, 300);

    }
    public containerTap() {
        this.showMoreOptions = false;
        this.showCardDetails();
        this._globals.iscardSecondSlider = false;
        this.hideWindow(this.filterWindow, 0);

    }

    public containerBackTap() {
        this.showMoreOptions = false;
        this.showCardDetails();
        this._globals.iscardSecondSlider = true;
        this.hideWindow(this.filterWindow, 0);
    }

    public saveImage() {
        this.drpChange();
        let appPath = fs.knownFolders.currentApp().path;
        let imageName = this.selectedMember.firstName + this.selectedMember.lastName + ".png"
        this.imgSrc = plugin.getImage(this.idCardView.nativeElement);
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.WRITE_EXTERNAL_STORAGE],
                "App Needs The Following permissions")
                .then(() => {
                    this._globals.showToastMessage("Download inprogess..", "longer");
                    let androidDownloadsPath = fs.path.join(
                        android.os.Environment.getExternalStoragePublicDirectory
                            (android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath(), imageName);

                    this.imgSrc.saveToFile(androidDownloadsPath, "png");
                    this._globals.showToastMessage("Download Completed !!", "longer");

                })
                .catch(() => {
                    // permission Denied
                    this._globals.showToastMessage("Download Failed !!", "longer");
                });
        }
        else {
            let res = false;
            if (!this.imgSrc) {
                return res;
            }
            let result = true;
            this._globals.showToastMessage("Download inprogess..", "longer");
            let CompletionTarget = NSObject.extend({
                "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": function (
                    image, error, context) {
                    if (error) {
                        result = false;
                    }
                }
            }, {
                    exposedMethods: {
                        "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": {
                            returns: interop.types.void,
                            params: [UIImage, NSError, interop.Pointer]
                        }
                    }
                });
            let completionTarget = CompletionTarget.new();
            UIImageWriteToSavedPhotosAlbum(this.imgSrc.ios, completionTarget,
                "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:",
                null);
            if (result)
                this._globals.showToastMessage("Download Completed !!", "longer");
            else
                this._globals.showToastMessage("Download Failed !!", "longer");
        }
    }

    showCardDetails() {
        this._globals.iscardslider = true;
        this.drawerService.enableGesture(false);
        this._cardService.selectedMember = this.selectedMember;
        if (this._cardService.isCardsPopUp) {
            this._cardService.isCardsPopUp = false;
            let modalOptions = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            this.modalParams.showModal(CardDetailComponent, modalOptions).then(res => {
            });
        }
    }
}