"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("ui/dialogs");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var shared_1 = require("../shared");
var common_1 = require("@angular/common");
var connectivity_1 = require("connectivity");
var observable_array_1 = require("data/observable-array");
var platform_1 = require("platform");
var platform_2 = require("platform");
var segmented_bar_1 = require("ui/segmented-bar");
var application_settings_1 = require("application-settings");
var core_2 = require("@ngx-translate/core");
var DataItem = (function () {
    function DataItem(name) {
        this.name = name;
    }
    return DataItem;
}());
var MainScreen = (function () {
    // Component constructor
    function MainScreen(router, loginService, routerExtensions, hieberService, translate, location, tokenService) {
        this.router = router;
        this.loginService = loginService;
        this.routerExtensions = routerExtensions;
        this.hieberService = hieberService;
        this.translate = translate;
        this.location = location;
        this.tokenService = tokenService;
        // TabView items 
        this.isAdmin = true;
        //Segmented bar items
        this.chatSegmentedBarItems = [];
        this.docSegmentedBarItems = [];
        this.homeSegmentedbarItems = [];
        this.selectedIndex = 0;
        // Chat View SegmentedBarItem selection 
        this.allChat = true;
        this.allContactPrivateChat = false;
        this.allGroupContactChat = false;
        this.allContactsList = false;
        this.isVisible = true;
        // Document view SegmentedBarItem selection
        this.allDocument = true;
        this.allRecent = false;
        this.groupDocument = false;
        //Activity indicatior
        this.isAuthenticating = false;
        this.selectedIndex = 0;
        this.searchPhrase = "";
        this.arrayItems = [];
        this.myItems = new observable_array_1.ObservableArray();
    }
    // on View created this method called
    MainScreen.prototype.ngOnInit = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            this.isAuthenticating = false;
            shared_1.alert(this.internet_connection_dialog);
            return;
        }
        // home TAB segmented bar set
        var homeSegmentedbar = new segmented_bar_1.SegmentedBarItem();
        this.translate.get('HOME.notifications', { value: '' }).subscribe(function (res) {
            _this.notificationsTranslate = res;
            homeSegmentedbar.title = _this.notificationsTranslate;
            _this.homeSegmentedbarItems.push(homeSegmentedbar);
        });
        // Document TAB segmented bar translate and set
        for (var i = 1; i < 5; i++) {
            var documentSegmentedBar = new segmented_bar_1.SegmentedBarItem();
            if (i == 1) {
                this.translate.get('HOME.all_document', { value: '' }).subscribe(function (res) {
                    _this.allDocumentTranslate = res;
                });
            }
            else if (i == 2) {
                this.translate.get('HOME.favourite', { value: '' }).subscribe(function (res) {
                    _this.favouritedocumentTranslate = res;
                });
            }
            else if (i == 3) {
                this.translate.get('HOME.group', { value: '' }).subscribe(function (res) {
                    _this.groupdocumentTranslate = res;
                });
            }
            this.docSegmentedBarItems.push(documentSegmentedBar);
        }
        var _loop_1 = function (j) {
            var tmpSegmentedBar = new segmented_bar_1.SegmentedBarItem();
            if (j == 1) {
                this_1.translate.get('HOME.all', { value: '' }).subscribe(function (res) {
                    _this.allchatTranslate = res;
                    tmpSegmentedBar.title = _this.allchatTranslate;
                });
            }
            else if (j == 2) {
                this_1.translate.get('HOME.private', { value: '' }).subscribe(function (res) {
                    _this.privatechatTranslate = res;
                    tmpSegmentedBar.title = _this.privatechatTranslate;
                });
            }
            else if (j == 3) {
                this_1.translate.get('HOME.group', { value: '' }).subscribe(function (res) {
                    _this.groupchatTranslate = res;
                    tmpSegmentedBar.title = _this.groupchatTranslate;
                });
            }
            else if (j == 4) {
                this_1.translate.get('HOME.contacts', { value: '' }).subscribe(function (res) {
                    _this.contactschatTranslate = res;
                    tmpSegmentedBar.title = _this.contactschatTranslate;
                });
            }
            this_1.chatSegmentedBarItems.push(tmpSegmentedBar);
        };
        var this_1 = this;
        // chat TAB segmentedbar translate and set
        for (var j = 1; j < 5; j++) {
            _loop_1(j);
        }
        this.translate.get('HOME.internet_connection', { value: '' }).subscribe(function (res) {
            _this.internet_connection_dialog = res;
        });
        this.translate.get('HOME.dialog_text', { value: '' }).subscribe(function (res) {
            _this.what_would_you_like_to_do = res;
        });
        this.translate.get('HOME.cancel', { value: '' }).subscribe(function (res) {
            _this.cancel = res;
        });
        this.translate.get('HOME.my_profile', { value: '' }).subscribe(function (res) {
            _this.myprofile = res;
        });
        this.translate.get('HOME.logout', { value: '' }).subscribe(function (res) {
            _this.logout = res;
        });
        this.activeTab = "Home";
        this.registerDevice();
        // this.refreshToken();
        console.log(application_settings_1.getString("deviceID", this.deviceID) + "");
        this.timerForRefreshToken = setInterval(function () {
            if (_this.tokenService.isTokenExpired(_this.loginService.getToken())) {
                _this.loginService.refreshTokenTimer()
                    .subscribe(function (res) {
                    console.log("successfully refreshed.");
                }, function (error) {
                    console.log("refresh error");
                });
            }
        }, 5000);
        this.tokenService.initialize(this.loginService.getToken());
    };
    MainScreen.prototype.registerDevice = function () {
        // Method Called
        var deviceType;
        // Depending on the device type Regiter Device ID
        if (platform_1.isAndroid) {
            deviceType = 0;
        }
        else if (platform_2.isIOS) {
            deviceType = 1;
        }
        // console.log("Device Type is updated: "+deviceType);
        this.hieberService.registerDevice(application_settings_1.getString("deviceID", this.deviceID), this.loginService.getToken(), deviceType).subscribe(function (res) {
            console.log("Resgistering Device Token to server:  " + res);
        }, function (error) {
            // Error json
            console.log("Error Registering Device : " + JSON.stringify(error.json()));
        }, function () {
            console.log("Resgistered Device Token");
        });
    };
    // TabView index change Listener
    MainScreen.prototype.tabIndexChanged = function (e) {
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
    };
    /**
     *
     * Document item segmentbar index and view handle.
     */
    MainScreen.prototype.onDocmentIndexChange = function (value) {
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
    };
    /**
     *
     * Chat item segementebar index and view handle
     */
    MainScreen.prototype.onChatSegmentBarIndexChange = function (value) {
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
    };
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
    MainScreen.prototype.onSubmit = function (value) {
        var searchValue = value.toLowerCase();
        if (value !== "") {
            for (var i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                }
            }
        }
    };
    // SearchBar entered text clear
    MainScreen.prototype.onClear = function () {
        var _this = this;
        this.searchPhrase = "";
        this.myItems = new observable_array_1.ObservableArray();
        this.arrayItems.forEach(function (item) {
            _this.myItems.push(item);
        });
    };
    /**
         onSearchBarLoaded(){
             if(this.isAndroid=true) {
                 this.search.nativeElement.android.clearFocus();
             }
         }
    */
    // Redirect to another component to retrieve all the contacts
    MainScreen.prototype.showContactAll = function (args) {
        this.router.navigate(["/contact_list"]);
    };
    // Contact list contact selected
    MainScreen.prototype.onContactListItemSelected = function (args) {
        var navigationExtras = {
            queryParams: {
                "OtherName": "test",
                "message": ""
            }
        };
        this.router.navigate(["/tc-chat"], navigationExtras);
    };
    // Redirect to Broadcast message
    MainScreen.prototype.broadcastMsg = function (args) {
        /*this.routerExtensions.navigate(["broadcast-msg"]);*/
        this.routerExtensions.navigate(["broadcast-msg"], {
            clearHistory: false,
            transition: {
                name: "slideRight",
                duration: 200,
                curve: "linear"
            }
        });
    };
    // Redirect to another component to search contact and send message
    MainScreen.prototype.createGroup = function () {
        this.routerExtensions.navigate(["filter-main"]);
    };
    // Show pop up menu for Logout from the application
    MainScreen.prototype.showMenu = function () {
        var _this = this;
        dialogs_1.action({
            message: this.what_would_you_like_to_do,
            actions: [this.myprofile, this.logout],
            cancelButtonText: this.cancel
        }).then(function (result) {
            if (result === _this.logout) {
                _this.logoff();
            }
            else if (result === _this.myprofile) {
                _this.routerExtensions.navigate(["user-profile"]);
            }
        });
    };
    // Back Button navigation Listener
    MainScreen.prototype.goBack = function () {
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
    };
    // this method is called when user wants to logout from the application
    MainScreen.prototype.logoff = function () {
        this.loginService.logoff();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    MainScreen.prototype.ngOnDestroy = function () {
        clearInterval(this.timerForRefreshToken);
    };
    return MainScreen;
}());
MainScreen.CLASS_NAME = "MainScreen  ";
__decorate([
    core_1.ViewChild("activityIndicatior"),
    __metadata("design:type", core_1.ElementRef)
], MainScreen.prototype, "activityIndicatior", void 0);
MainScreen = __decorate([
    core_1.Component({
        selector: 'main-menu',
        templateUrl: 'main/mainScreen.component.html',
        styleUrls: ['main/main-common.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.LoginService,
        router_2.RouterExtensions, shared_1.HieberService, core_2.TranslateService,
        common_1.Location,
        shared_1.TokenService])
], MainScreen);
exports.MainScreen = MainScreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluU2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzSDtBQUV0SCxzQ0FBb0M7QUFDcEMsMENBQTJEO0FBQzNELHNEQUErRDtBQUMvRCxvQ0FBaUc7QUFDakcsMENBQTJDO0FBQzNDLDZDQUFpRTtBQUVqRSwwREFBd0Q7QUFJeEQscUNBQXFDO0FBQ3JDLHFDQUFpQztBQUNqQyxrREFBb0Q7QUFDcEQsNkRBQWlEO0FBQ2pELDRDQUF1RDtBQUV2RDtJQUNJLGtCQUFtQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFJLENBQUM7SUFDeEMsZUFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBUUQsSUFBYSxVQUFVO0lBaUVuQix3QkFBd0I7SUFDeEIsb0JBQW9CLE1BQWMsRUFDdEIsWUFBMEIsRUFDMUIsZ0JBQWtDLEVBQVUsYUFBNEIsRUFBVSxTQUEyQixFQUM3RyxRQUFrQixFQUNsQixZQUEwQjtRQUpsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzdHLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFsRXRDLGlCQUFpQjtRQUNqQixZQUFPLEdBQVksSUFBSSxDQUFDO1FBSXhCLHFCQUFxQjtRQUNkLDBCQUFxQixHQUE0QixFQUFFLENBQUM7UUFDcEQseUJBQW9CLEdBQTRCLEVBQUUsQ0FBQztRQUNuRCwwQkFBcUIsR0FBNEIsRUFBRSxDQUFDO1FBQ3BELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBS3pCLHdDQUF3QztRQUNqQyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2Ys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Q0wsaUJBQUM7QUFBRCxDQUFDLEFBN2FELElBNmFDO0FBM2FrQixxQkFBVSxHQUFHLGNBQWMsQ0FBQztBQTZEVjtJQUFoQyxnQkFBUyxDQUFDLG9CQUFvQixDQUFDOzhCQUFxQixpQkFBVTtzREFBQztBQS9EdkQsVUFBVTtJQU50QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUV0QyxDQUFDO3FDQW1FOEIsZUFBTTtRQUNSLHFCQUFZO1FBQ1IseUJBQWdCLEVBQXlCLHNCQUFhLEVBQXFCLHVCQUFnQjtRQUNuRyxpQkFBUTtRQUNKLHFCQUFZO0dBdEU3QixVQUFVLENBNmF0QjtBQTdhWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjaywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvZ2luU2VydmljZSwgYWxlcnQsIHNldEhpbnRDb2xvciwgSGllYmVyU2VydmljZSwgVG9rZW5TZXJ2aWNlLCBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xuaW1wb3J0IHsgVGFiVmlldywgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidWkvdGFiLXZpZXdcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IG1vY2tlZERhdGFBcnJheSB9IGZyb20gXCIuL21vY2stZGF0YUl0ZW1zXCI7XG5pbXBvcnQgeyBtb2tlZERvY3VtZW50QXJyYXkgfSBmcm9tIFwiLi9tb2NrX2RhdGFfZG9jdW1lbnRcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IGlzSU9TIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5jbGFzcyBEYXRhSXRlbSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWFpbi1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJ21haW4vbWFpblNjcmVlbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21haW4vbWFpbi1jb21tb24uY3NzJ10sXG5cbn0pXG5leHBvcnQgY2xhc3MgTWFpblNjcmVlbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgc3RhdGljIENMQVNTX05BTUUgPSBcIk1haW5TY3JlZW4gIFwiO1xuXG4gICAgLy8gVGFiVmlldyBpdGVtcyBcbiAgICBpc0FkbWluOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgYXJyYXlJdGVtczogQXJyYXk8RGF0YUl0ZW0+O1xuICAgIHB1YmxpYyBteUl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+O1xuICAgIC8vU2VnbWVudGVkIGJhciBpdGVtc1xuICAgIHB1YmxpYyBjaGF0U2VnbWVudGVkQmFySXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+ID0gW107XG4gICAgcHVibGljIGRvY1NlZ21lbnRlZEJhckl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIHB1YmxpYyBob21lU2VnbWVudGVkYmFySXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+ID0gW107XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmVUYWI6IHN0cmluZztcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgXG4gICAgLy8gQ2hhdCBWaWV3IFNlZ21lbnRlZEJhckl0ZW0gc2VsZWN0aW9uIFxuICAgIHB1YmxpYyBhbGxDaGF0ID0gdHJ1ZTtcbiAgICBwdWJsaWMgYWxsQ29udGFjdFByaXZhdGVDaGF0ID0gZmFsc2U7XG4gICAgcHVibGljIGFsbEdyb3VwQ29udGFjdENoYXQgPSBmYWxzZTtcbiAgICBwdWJsaWMgYWxsQ29udGFjdHNMaXN0ID0gZmFsc2U7XG5cblxuICAgIHB1YmxpYyBpc1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLy8gRG9jdW1lbnQgdmlldyBTZWdtZW50ZWRCYXJJdGVtIHNlbGVjdGlvblxuICAgIHB1YmxpYyBhbGxEb2N1bWVudCA9IHRydWU7XG4gICAgcHVibGljIGFsbFJlY2VudCA9IGZhbHNlO1xuICAgIHB1YmxpYyBncm91cERvY3VtZW50ID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHRpbWVyRm9yUmVmcmVzaFRva2VuOiBhbnk7XG5cbiAgICAvL0FjdGl2aXR5IGluZGljYXRpb3JcbiAgICBpc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgZGV2aWNlSUQ6IHN0cmluZztcblxuXG4gICAgLy8gVHJhbnNsYXRlIEFwcGxpY2F0aW9uIHN0cmluZ1xuICAgIC8vIDEgSE9NRSBUQUJcbiAgICBub3RpZmljYXRpb25zdHJpbmc6IHN0cmluZztcbiAgICBub3RpZmljYXRpb25zVHJhbnNsYXRlOiBzdHJpbmc7XG4gICAgLy8zICBET0NVTUVOVCBUQUJcbiAgICBhbGxEb2N1bWVudFRyYW5zbGF0ZTogc3RyaW5nO1xuICAgIGZhdm91cml0ZWRvY3VtZW50VHJhbnNsYXRlOiBzdHJpbmc7XG4gICAgZ3JvdXBkb2N1bWVudFRyYW5zbGF0ZTogc3RyaW5nO1xuICAgIC8vNCBDSEFUIFRBQlxuICAgIGFsbGNoYXRUcmFuc2xhdGU6IHN0cmluZztcbiAgICBwcml2YXRlY2hhdFRyYW5zbGF0ZTogc3RyaW5nO1xuICAgIGdyb3VwY2hhdFRyYW5zbGF0ZTogc3RyaW5nO1xuICAgIGNvbnRhY3RzY2hhdFRyYW5zbGF0ZTogc3RyaW5nO1xuXG4gICAgaW50ZXJuZXRfY29ubmVjdGlvbl9kaWFsb2c6IHN0cmluZztcbiAgICB3aGF0X3dvdWxkX3lvdV9saWtlX3RvX2RvOiBzdHJpbmc7XG4gICAgbXlwcm9maWxlOiBzdHJpbmc7XG4gICAgbG9nb3V0OiBzdHJpbmc7XG4gICAgY2FuY2VsOiBzdHJpbmc7XG5cblxuXG4gICAgLy8gICAgQFZpZXdDaGlsZChcInRhYnZpZXdcIikgdGFiOiBFbGVtZW50UmVmO1xuICAgIC8vICAgIEBWaWV3Q2hpbGQoXCJzZWFyY2hcIikgc2VhcmNoOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJhY3Rpdml0eUluZGljYXRpb3JcIikgYWN0aXZpdHlJbmRpY2F0aW9yOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gQ29tcG9uZW50IGNvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGhpZWJlclNlcnZpY2U6IEhpZWJlclNlcnZpY2UsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNlYXJjaFBocmFzZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXJyYXlJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPigpO1xuICAgIH1cblxuICAgIC8vIG9uIFZpZXcgY3JlYXRlZCB0aGlzIG1ldGhvZCBjYWxsZWRcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYWxlcnQodGhpcy5pbnRlcm5ldF9jb25uZWN0aW9uX2RpYWxvZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaG9tZSBUQUIgc2VnbWVudGVkIGJhciBzZXRcbiAgICAgICAgbGV0IGhvbWVTZWdtZW50ZWRiYXI6IFNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUubm90aWZpY2F0aW9ucycsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1RyYW5zbGF0ZSA9IHJlcztcbiAgICAgICAgICAgIGhvbWVTZWdtZW50ZWRiYXIudGl0bGUgPSB0aGlzLm5vdGlmaWNhdGlvbnNUcmFuc2xhdGU7XG4gICAgICAgICAgICB0aGlzLmhvbWVTZWdtZW50ZWRiYXJJdGVtcy5wdXNoKGhvbWVTZWdtZW50ZWRiYXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb2N1bWVudCBUQUIgc2VnbWVudGVkIGJhciB0cmFuc2xhdGUgYW5kIHNldFxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50U2VnbWVudGVkQmFyOiBTZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuYWxsX2RvY3VtZW50JywgeyB2YWx1ZTogJycgfSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50VHJhbnNsYXRlID0gcmVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuZmF2b3VyaXRlJywgeyB2YWx1ZTogJycgfSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm91cml0ZWRvY3VtZW50VHJhbnNsYXRlID0gcmVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuZ3JvdXAnLCB7IHZhbHVlOiAnJyB9KS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBkb2N1bWVudFRyYW5zbGF0ZSA9IHJlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9jU2VnbWVudGVkQmFySXRlbXMucHVzaChkb2N1bWVudFNlZ21lbnRlZEJhcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGF0IFRBQiBzZWdtZW50ZWRiYXIgdHJhbnNsYXRlIGFuZCBzZXRcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCA1OyBqKyspIHtcbiAgICAgICAgICAgIGxldCB0bXBTZWdtZW50ZWRCYXI6IFNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgaWYgKGogPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlLmdldCgnSE9NRS5hbGwnLCB7IHZhbHVlOiAnJyB9KS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsY2hhdFRyYW5zbGF0ZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdG1wU2VnbWVudGVkQmFyLnRpdGxlID0gdGhpcy5hbGxjaGF0VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUucHJpdmF0ZScsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcml2YXRlY2hhdFRyYW5zbGF0ZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdG1wU2VnbWVudGVkQmFyLnRpdGxlID0gdGhpcy5wcml2YXRlY2hhdFRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGogPT0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlLmdldCgnSE9NRS5ncm91cCcsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGNoYXRUcmFuc2xhdGUgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHRtcFNlZ21lbnRlZEJhci50aXRsZSA9IHRoaXMuZ3JvdXBjaGF0VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaiA9PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KCdIT01FLmNvbnRhY3RzJywgeyB2YWx1ZTogJycgfSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzY2hhdFRyYW5zbGF0ZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdG1wU2VnbWVudGVkQmFyLnRpdGxlID0gdGhpcy5jb250YWN0c2NoYXRUcmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYXRTZWdtZW50ZWRCYXJJdGVtcy5wdXNoKHRtcFNlZ21lbnRlZEJhcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuaW50ZXJuZXRfY29ubmVjdGlvbicsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuZXRfY29ubmVjdGlvbl9kaWFsb2cgPSByZXM7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuZGlhbG9nX3RleHQnLCB7IHZhbHVlOiAnJyB9KS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndoYXRfd291bGRfeW91X2xpa2VfdG9fZG8gPSByZXM7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuY2FuY2VsJywgeyB2YWx1ZTogJycgfSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwgPSByZXM7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUubXlfcHJvZmlsZScsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMubXlwcm9maWxlID0gcmVzO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KCdIT01FLmxvZ291dCcsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nb3V0ID0gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFwiSG9tZVwiO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGV2aWNlKCk7XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaFRva2VuKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGdldFN0cmluZyhcImRldmljZUlEXCIsIHRoaXMuZGV2aWNlSUQpICsgXCJcIik7XG5cbiAgICAgIFxuICAgICAgICB0aGlzLnRpbWVyRm9yUmVmcmVzaFRva2VuID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudG9rZW5TZXJ2aWNlLmlzVG9rZW5FeHBpcmVkKHRoaXMubG9naW5TZXJ2aWNlLmdldFRva2VuKCkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpblNlcnZpY2UucmVmcmVzaFRva2VuVGltZXIoKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NmdWxseSByZWZyZXNoZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaCBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcblxuICAgICAgICB0aGlzLnRva2VuU2VydmljZS5pbml0aWFsaXplKHRoaXMubG9naW5TZXJ2aWNlLmdldFRva2VuKCkpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGV2aWNlKCkge1xuICAgICAgICAvLyBNZXRob2QgQ2FsbGVkXG4gICAgICAgIHZhciBkZXZpY2VUeXBlO1xuICAgICAgICAvLyBEZXBlbmRpbmcgb24gdGhlIGRldmljZSB0eXBlIFJlZ2l0ZXIgRGV2aWNlIElEXG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIGRldmljZVR5cGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICAgICAgICBkZXZpY2VUeXBlID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRldmljZSBUeXBlIGlzIHVwZGF0ZWQ6IFwiK2RldmljZVR5cGUpO1xuICAgICAgICB0aGlzLmhpZWJlclNlcnZpY2UucmVnaXN0ZXJEZXZpY2UoZ2V0U3RyaW5nKFwiZGV2aWNlSURcIiwgdGhpcy5kZXZpY2VJRCksIHRoaXMubG9naW5TZXJ2aWNlLmdldFRva2VuKCksIGRldmljZVR5cGUpLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNnaXN0ZXJpbmcgRGV2aWNlIFRva2VuIHRvIHNlcnZlcjogIFwiICsgcmVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBFcnJvciBqc29uXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBSZWdpc3RlcmluZyBEZXZpY2UgOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNnaXN0ZXJlZCBEZXZpY2UgVG9rZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvLyBUYWJWaWV3IGluZGV4IGNoYW5nZSBMaXN0ZW5lclxuICAgIHB1YmxpYyB0YWJJbmRleENoYW5nZWQoZTogYW55KSB7XG4gICAgICAgIHN3aXRjaCAoZS5uZXdJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiU2VsZWN0ZWQgSW5kZXg6IFwiKyBlLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFwiSG9tZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiU2VsZWN0ZWQgSW5kZXg6IFwiKyBlLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFwiQ2hhdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiU2VsZWN0ZWQgSW5kZXg6IFwiKyBlLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFwiRG9jc1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiU2VsZWN0ZWQgSW5kZXg6IFwiKyBlLm5ld0luZGV4KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiID0gXCJOZXdzXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiU2VsZWN0ZWQgSW5kZXg6IFwiKyBlLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFwiQ2hhdFwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIERvY3VtZW50IGl0ZW0gc2VnbWVudGJhciBpbmRleCBhbmQgdmlldyBoYW5kbGUuXG4gICAgICovXG4gICAgcHVibGljIG9uRG9jbWVudEluZGV4Q2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHZhbHVlO1xuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxEb2N1bWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxSZWNlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwRG9jdW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNYWluU2NyZWVuLkNMQVNTX05BTUUgKyBcImFsbCBkb2N1bWVudCBTZWdtZW50ZWRCYXJJdGVtIHNlbGVjdGVkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxSZWNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBEb2N1bWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiYWxsIFJlY2VudCBEb2N1bWVudCBTZWdtZW50ZWRCYXJJdGVtIHNlbGVjdGVkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmFsbERvY3VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxSZWNlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwRG9jdW1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiZ3JvdXAgRG9jdW1lbnQgU2VnbWVudGVkQmFySXRlbSBzZWxlY3RlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqIENoYXQgaXRlbSBzZWdlbWVudGViYXIgaW5kZXggYW5kIHZpZXcgaGFuZGxlXG4gICAgICovXG4gICAgcHVibGljIG9uQ2hhdFNlZ21lbnRCYXJJbmRleENoYW5nZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ2hhdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDb250YWN0UHJpdmF0ZUNoYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEdyb3VwQ29udGFjdENoYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENvbnRhY3RzTGlzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1haW5TY3JlZW4uQ0xBU1NfTkFNRSArIFwiQWxsIENoYXQgc2VnZW1lbnRlYmFyIHNlbGVjdGVkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENoYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENvbnRhY3RQcml2YXRlQ2hhdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxHcm91cENvbnRhY3RDaGF0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDb250YWN0c0xpc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNYWluU2NyZWVuLkNMQVNTX05BTUUgKyBcImFsbCBDb250YWN0IFByaXZhdGVDaGF0IHNlZ2VtZW50ZWJhciBzZWxlY3RlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDaGF0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDb250YWN0UHJpdmF0ZUNoYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEdyb3VwQ29udGFjdENoYXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ29udGFjdHNMaXN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coTWFpblNjcmVlbi5DTEFTU19OQU1FICsgXCJhbGwgR3JvdXAgQ29udGFjdENoYXQgc2VnZW1lbnRlYmFyIHNlbGVjdGVkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENoYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENvbnRhY3RQcml2YXRlQ2hhdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsR3JvdXBDb250YWN0Q2hhdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ29udGFjdHNMaXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNYWluU2NyZWVuLkNMQVNTX05BTUUgKyBcImFsbCBDb250YWN0bGlzdCBzZWdlbWVudGViYXIgc2VsZWN0ZWQuXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBGb3IgYW5kcm9pZCBEZXZpY2VzIHRyYW5zaXRpb25cbiAgICAgKiBcbiAgICAgKiBcbiAgICAgICAgcHVibGljIG9wZW5Nc2coYXJncyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmluZGV4K1widGVzdFwiKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2hhdFwiXSx7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgKi9cblxuICAgIC8vIFNlYXJjaCBiYXIgb24gc2VhcmNoIGNsaWNrIGxpc3RlcmVyXG4gICAgcHVibGljIG9uU3VibWl0KHZhbHVlKSB7XG5cbiAgICAgICAgdmFyIHNlYXJjaFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXJyYXlJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFycmF5SXRlbXNbaV0ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaCh0aGlzLmFycmF5SXRlbXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNlYXJjaEJhciBlbnRlcmVkIHRleHQgY2xlYXJcbiAgICBwdWJsaWMgb25DbGVhcigpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPigpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiAgXG4gICAgICAgICBvblNlYXJjaEJhckxvYWRlZCgpe1xuICAgICAgICAgICAgIGlmKHRoaXMuaXNBbmRyb2lkPXRydWUpIHtcbiAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2gubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9IFxuICAgICovXG5cbiAgICAvLyBSZWRpcmVjdCB0byBhbm90aGVyIGNvbXBvbmVudCB0byByZXRyaWV2ZSBhbGwgdGhlIGNvbnRhY3RzXG4gICAgcHVibGljIHNob3dDb250YWN0QWxsKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NvbnRhY3RfbGlzdFwiXSk7XG4gICAgfVxuICAgIC8vIENvbnRhY3QgbGlzdCBjb250YWN0IHNlbGVjdGVkXG4gICAgcHVibGljIG9uQ29udGFjdExpc3RJdGVtU2VsZWN0ZWQoYXJncykge1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgXCJPdGhlck5hbWVcIjogXCJ0ZXN0XCIsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGMtY2hhdFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG4gICAgLy8gUmVkaXJlY3QgdG8gQnJvYWRjYXN0IG1lc3NhZ2VcbiAgICBwdWJsaWMgYnJvYWRjYXN0TXNnKGFyZ3MpIHtcbiAgICAgICAgLyp0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiYnJvYWRjYXN0LW1zZ1wiXSk7Ki9cbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImJyb2FkY2FzdC1tc2dcIl0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJsaW5lYXJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJlZGlyZWN0IHRvIGFub3RoZXIgY29tcG9uZW50IHRvIHNlYXJjaCBjb250YWN0IGFuZCBzZW5kIG1lc3NhZ2VcbiAgICBwdWJsaWMgY3JlYXRlR3JvdXAoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJmaWx0ZXItbWFpblwiXSk7XG4gICAgfVxuXG4gICAgLy8gU2hvdyBwb3AgdXAgbWVudSBmb3IgTG9nb3V0IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gICAgc2hvd01lbnUoKSB7XG4gICAgICAgIGFjdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLndoYXRfd291bGRfeW91X2xpa2VfdG9fZG8sXG4gICAgICAgICAgICBhY3Rpb25zOiBbdGhpcy5teXByb2ZpbGUsIHRoaXMubG9nb3V0XSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY2FuY2VsXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdGhpcy5sb2dvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ29mZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0ID09PSB0aGlzLm15cHJvZmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJ1c2VyLXByb2ZpbGVcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBCYWNrIEJ1dHRvbiBuYXZpZ2F0aW9uIExpc3RlbmVyXG4gICAgcHVibGljIGdvQmFjaygpIHtcblxuICAgICAgICBpZiAodGhpcy5sb2dpblNlcnZpY2UuaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiB1c2VyIHdhbnRzIHRvIGxvZ291dCBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgIHByaXZhdGUgbG9nb2ZmKCkge1xuICAgICAgICB0aGlzLmxvZ2luU2VydmljZS5sb2dvZmYoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckZvclJlZnJlc2hUb2tlbik7XG4gICAgfVxufSAiXX0=