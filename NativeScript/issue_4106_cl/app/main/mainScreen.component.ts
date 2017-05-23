import { Component, ViewChild, ElementRef, OnInit, OnDestroy, DoCheck, ChangeDetectionStrategy } from '@angular/core';

import { action } from "ui/dialogs";
import { Router, NavigationExtras } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService, alert, setHintColor, HieberService, TokenService, User } from "../shared";
import { Location } from '@angular/common';
import { connectionType, getConnectionType } from "connectivity";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";
import { ObservableArray } from "data/observable-array";
import { mockedDataArray } from "./mock-dataItems";
import { mokedDocumentArray } from "./mock_data_document";
import { SearchBar } from "ui/search-bar";
import { isAndroid } from "platform";
import { isIOS } from "platform";
import { SegmentedBarItem } from "ui/segmented-bar";
import { getString } from "application-settings";
import { TranslateService } from '@ngx-translate/core';

class DataItem {
    constructor(public name: string) { }
}

@Component({
    selector: 'main-menu',
    templateUrl: 'main/mainScreen.component.html',
    styleUrls: ['main/main-common.css'],

})
export class MainScreen implements OnInit, OnDestroy {

    private static CLASS_NAME = "MainScreen  ";

    // TabView items 
    isAdmin: boolean = true;

    private arrayItems: Array<DataItem>;
    public myItems: ObservableArray<DataItem>;
    //Segmented bar items
    public chatSegmentedBarItems: Array<SegmentedBarItem> = [];
    public docSegmentedBarItems: Array<SegmentedBarItem> = [];
    public homeSegmentedbarItems: Array<SegmentedBarItem> = [];
    public selectedIndex = 0;

    private activeTab: string;
    public searchPhrase: string;
    
    // Chat View SegmentedBarItem selection 
    public allChat = true;
    public allContactPrivateChat = false;
    public allGroupContactChat = false;
    public allContactsList = false;


    public isVisible: boolean = true;

    // Document view SegmentedBarItem selection
    public allDocument = true;
    public allRecent = false;
    public groupDocument = false;

    private timerForRefreshToken: any;

    //Activity indicatior
    isAuthenticating = false;
    deviceID: string;


    // Translate Application string
    // 1 HOME TAB
    notificationstring: string;
    notificationsTranslate: string;
    //3  DOCUMENT TAB
    allDocumentTranslate: string;
    favouritedocumentTranslate: string;
    groupdocumentTranslate: string;
    //4 CHAT TAB
    allchatTranslate: string;
    privatechatTranslate: string;
    groupchatTranslate: string;
    contactschatTranslate: string;

    internet_connection_dialog: string;
    what_would_you_like_to_do: string;
    myprofile: string;
    logout: string;
    cancel: string;



    //    @ViewChild("tabview") tab: ElementRef;
    //    @ViewChild("search") search: ElementRef;
    @ViewChild("activityIndicatior") activityIndicatior: ElementRef;

    // Component constructor
    constructor(private router: Router,
        private loginService: LoginService,
        private routerExtensions: RouterExtensions, private hieberService: HieberService, private translate: TranslateService,
        private location: Location,
        private tokenService: TokenService) {
        this.selectedIndex = 0;
        this.searchPhrase = "";
        this.arrayItems = [];
        this.myItems = new ObservableArray<DataItem>();
    }

    // on View created this method called
    ngOnInit() {
        if (getConnectionType() === connectionType.none) {
            this.isAuthenticating = false;
            alert(this.internet_connection_dialog);
            return;
        }
        // home TAB segmented bar set
        let homeSegmentedbar: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
        this.translate.get('HOME.notifications', { value: '' }).subscribe((res: string) => {
            this.notificationsTranslate = res;
            homeSegmentedbar.title = this.notificationsTranslate;
            this.homeSegmentedbarItems.push(homeSegmentedbar);
        });

        // Document TAB segmented bar translate and set
        for (let i = 1; i < 5; i++) {
            let documentSegmentedBar: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            if (i == 1) {
                this.translate.get('HOME.all_document', { value: '' }).subscribe((res: string) => {
                    this.allDocumentTranslate = res;
                });
            } else if (i == 2) {
                this.translate.get('HOME.favourite', { value: '' }).subscribe((res: string) => {
                    this.favouritedocumentTranslate = res;
                });
            } else if (i == 3) {
                this.translate.get('HOME.group', { value: '' }).subscribe((res: string) => {
                    this.groupdocumentTranslate = res;
                });
            }
            this.docSegmentedBarItems.push(documentSegmentedBar);
        }

        // chat TAB segmentedbar translate and set
        for (let j = 1; j < 5; j++) {
            let tmpSegmentedBar: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            if (j == 1) {
                this.translate.get('HOME.all', { value: '' }).subscribe((res: string) => {
                    this.allchatTranslate = res;
                    tmpSegmentedBar.title = this.allchatTranslate;
                });
            } else if (j == 2) {
                this.translate.get('HOME.private', { value: '' }).subscribe((res: string) => {
                    this.privatechatTranslate = res;
                    tmpSegmentedBar.title = this.privatechatTranslate;
                });
            }
            else if (j == 3) {
                this.translate.get('HOME.group', { value: '' }).subscribe((res: string) => {
                    this.groupchatTranslate = res;
                    tmpSegmentedBar.title = this.groupchatTranslate;
                });
            }
            else if (j == 4) {
                this.translate.get('HOME.contacts', { value: '' }).subscribe((res: string) => {
                    this.contactschatTranslate = res;
                    tmpSegmentedBar.title = this.contactschatTranslate;
                });
            }
            this.chatSegmentedBarItems.push(tmpSegmentedBar);
        }

        this.translate.get('HOME.internet_connection', { value: '' }).subscribe((res: string) => {
            this.internet_connection_dialog = res;
        });
        this.translate.get('HOME.dialog_text', { value: '' }).subscribe((res: string) => {
            this.what_would_you_like_to_do = res;
        });
        this.translate.get('HOME.cancel', { value: '' }).subscribe((res: string) => {
            this.cancel = res;
        });
        this.translate.get('HOME.my_profile', { value: '' }).subscribe((res: string) => {
            this.myprofile = res;
        });
        this.translate.get('HOME.logout', { value: '' }).subscribe((res: string) => {
            this.logout = res;
        });

        this.activeTab = "Home";
        this.registerDevice();
        // this.refreshToken();
        console.log(getString("deviceID", this.deviceID) + "");

      
        this.timerForRefreshToken = setInterval(() => {
            if (this.tokenService.isTokenExpired(this.loginService.getToken())) {
                this.loginService.refreshTokenTimer()
                    .subscribe(
                    (res) => {
                        console.log("successfully refreshed.");
                    },
                    (error) => {
                        console.log("refresh error");
                    }
                    );
            }
        }, 5000);

        this.tokenService.initialize(this.loginService.getToken());
    }

    registerDevice() {
        // Method Called
        var deviceType;
        // Depending on the device type Regiter Device ID
        if (isAndroid) {
            deviceType = 0;
        }
        else if (isIOS) {
            deviceType = 1;
        }
        // console.log("Device Type is updated: "+deviceType);
        this.hieberService.registerDevice(getString("deviceID", this.deviceID), this.loginService.getToken(), deviceType).subscribe(
            res => {
                console.log("Resgistering Device Token to server:  " + res);
            },
            (error) => {
                // Error json
                console.log("Error Registering Device : " + JSON.stringify(error.json()));

            }, () => {
                console.log("Resgistered Device Token");
            }
        );

    }

    // TabView index change Listener
    public tabIndexChanged(e: any) {
        switch (e.newIndex) {
            case 0:
                // console.log(MainScreen.CLASS_NAME + "Selected Index: "+ e.newIndex);
                this.activeTab = "Home";
                break;
            case 1:
                // console.log(MainScreen.CLASS_NAME + "Selected Index: "+ e.newIndex);
                this.activeTab = "Chat";
                break;
            case 2:
                // console.log(MainScreen.CLASS_NAME + "Selected Index: "+ e.newIndex);
                this.activeTab = "Docs";
                break;
            case 3:
                // console.log(MainScreen.CLASS_NAME + "Selected Index: "+ e.newIndex);

                this.activeTab = "News";
                break;
            case 4:
                //  console.log(MainScreen.CLASS_NAME + "Selected Index: "+ e.newIndex);
                this.activeTab = "Chat";
            default:
                break;
        }

    }
    /**
     * 
     * Document item segmentbar index and view handle.
     */
    public onDocmentIndexChange(value) {
        this.selectedIndex = value;
        switch (value) {
            case 0:
                this.allDocument = true;
                this.allRecent = false;
                this.groupDocument = false;
                // console.log(MainScreen.CLASS_NAME + "all document SegmentedBarItem selected.");
                break;
            case 1:
                this.allDocument = false;
                this.allRecent = true;
                this.groupDocument = false;
                // console.log(MainScreen.CLASS_NAME + "all Recent Document SegmentedBarItem selected.");
                break;
            case 2:
                this.allDocument = false;
                this.allRecent = false;
                this.groupDocument = true;
                // console.log(MainScreen.CLASS_NAME + "group Document SegmentedBarItem selected.");
                break;
            default:
                break;
        }
    }

    /** 
     * 
     * Chat item segementebar index and view handle
     */
    public onChatSegmentBarIndexChange(value) {
        this.selectedIndex = value;
        switch (value) {
            case 0:
                this.allChat = true;
                this.allContactPrivateChat = false;
                this.allGroupContactChat = false;
                this.allContactsList = false;
                // console.log(MainScreen.CLASS_NAME + "All Chat segementebar selected.");
                break;
            case 1:
                this.allChat = false;
                this.allContactPrivateChat = true;
                this.allGroupContactChat = false;
                this.allContactsList = false;
                // console.log(MainScreen.CLASS_NAME + "all Contact PrivateChat segementebar selected.");
                break;
            case 2:
                this.allChat = false;
                this.allContactPrivateChat = false;
                this.allGroupContactChat = true;
                this.allContactsList = false;
                // console.log(MainScreen.CLASS_NAME + "all Group ContactChat segementebar selected.");
                break;
            case 3:
                this.allChat = false;
                this.allContactPrivateChat = false;
                this.allGroupContactChat = false;
                this.allContactsList = true;
                // console.log(MainScreen.CLASS_NAME + "all Contactlist segementebar selected.");
                break;
            default:
                break;
        }
    }

    /** 
     * 
     * For android Devices transition
     * 
     * 
        public openMsg(args){
            console.log(args.index+"test");
            this.routerExtensions.navigate(["/chat"],{
                transition:
                {
                    name: "slide",
                    duration: 200,
                    curve: 'linear'
                }
            });
        }
        
    */

    // Search bar on search click listerer
    public onSubmit(value) {

        var searchValue = value.toLowerCase();
        if (value !== "") {
            for (var i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                }
            }
        }
    }

    // SearchBar entered text clear
    public onClear() {
        this.searchPhrase = "";
        this.myItems = new ObservableArray<DataItem>();

        this.arrayItems.forEach(item => {
            this.myItems.push(item);
        });
    }

    /**  
         onSearchBarLoaded(){
             if(this.isAndroid=true) {
                 this.search.nativeElement.android.clearFocus();
             }
         } 
    */

    // Redirect to another component to retrieve all the contacts
    public showContactAll(args) {
        this.router.navigate(["/contact_list"]);
    }
    // Contact list contact selected
    public onContactListItemSelected(args) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "OtherName": "test",
                "message": ""
            }
        }
        this.router.navigate(["/tc-chat"], navigationExtras);
    }

    // Redirect to Broadcast message
    public broadcastMsg(args) {
        /*this.routerExtensions.navigate(["broadcast-msg"]);*/
        this.routerExtensions.navigate(["broadcast-msg"],
            {
                clearHistory: false,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "linear"
                }
            });
    }

    // Redirect to another component to search contact and send message
    public createGroup() {
        this.routerExtensions.navigate(["filter-main"]);
    }

    // Show pop up menu for Logout from the application
    showMenu() {
        action({
            message: this.what_would_you_like_to_do,
            actions: [this.myprofile, this.logout],
            cancelButtonText: this.cancel
        }).then((result) => {
            if (result === this.logout) {
                this.logoff();
            }
            else if (result === this.myprofile) {
                this.routerExtensions.navigate(["user-profile"]);
            }
        });
    }

    // Back Button navigation Listener
    public goBack() {

        if (this.loginService.isLoggedIn) {
            this.location.back();
        }
        else {
            this.routerExtensions.navigate(["/login"], {
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "linear"
                }
            });
        }
    }

    // this method is called when user wants to logout from the application
    private logoff() {
        this.loginService.logoff();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    ngOnDestroy() {
        clearInterval(this.timerForRefreshToken);
    }
} 