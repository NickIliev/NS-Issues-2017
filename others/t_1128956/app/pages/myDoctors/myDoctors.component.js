"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var myDoctors_service_1 = require("./myDoctors.service");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var nativescript_contacts_1 = require("nativescript-contacts");
var nativescript_locate_address_1 = require("nativescript-locate-address");
var page_1 = require("ui/page");
var global_1 = require("../../shared/global");
var viewVisitHistory_component_1 = require("./viewVisitHistory/viewVisitHistory.component");
var core_2 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var AsyncSubject_1 = require("rxjs/AsyncSubject");
var core_3 = require("@angular/core"); //Workaround to reflect date changes
var contacts = require("nativescript-contacts-lite");
var contactFound = null;
var MyDoctorsComponent = (function () {
    function MyDoctorsComponent(_locateAddress, _router, _doctorService, _vcRef, _globals, _visitHistoryModal, page, cdr) {
        this._locateAddress = _locateAddress;
        this._router = _router;
        this._doctorService = _doctorService;
        this._vcRef = _vcRef;
        this._globals = _globals;
        this._visitHistoryModal = _visitHistoryModal;
        this.page = page;
        this.cdr = cdr;
        this.address = "";
        this.doctorsList = [];
        this.memberList = [];
        this.isSearchExpanded = false; //Search-Filter
        this.isDrpShow = false;
        this.cardIndex = -1;
        this.CardOpenIndex = -1;
        this.isBodyTapped = false;
        this.contactIds = [];
        this.isBusy = false;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.modalOptions = {
            context: {},
            fullscreen: true,
            viewContainerRef: this._vcRef
        };
        this.title = "My Doctors";
        this.pageStartTime = new Date().getTime();
    }
    MyDoctorsComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        // GET MEMBER LIST
        var membersData = this._doctorService.getAllMembers();
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
    };
    MyDoctorsComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    /* Member Selection */
    MyDoctorsComponent.prototype.selectMember = function (member) {
        this.memberList.map(function (item) { return item.isSelected = false; });
        member.isSelected = true;
        this.selectedMember = member;
        this.doctorsList = [];
        // GET ALL DOCTORS
        var doctorsData = this._doctorService.getAllDoctors();
        this.doctorsList = doctorsData.doctors;
        this.hideWindow(this.filterWindow, 400);
        this.showDefaultSearchView();
    };
    MyDoctorsComponent.prototype.toggleFilter = function () {
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showWindow(this.filterWindow, 0);
        }
        this.showDefaultSearchView();
        this.hideThreeDotsMenu();
    };
    MyDoctorsComponent.prototype.showWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    };
    MyDoctorsComponent.prototype.hideWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    };
    MyDoctorsComponent.prototype.getSelectedMember = function (lookupList) {
        var filteredItems = lookupList.filter(function (item) { return item.isSelected === true; });
        return filteredItems[0];
    };
    /* Three dots menu */
    MyDoctorsComponent.prototype.showOptions = function (index) {
        this.cardIndex = index;
        if (app.ios) {
            this.isBodyTapped = false;
        }
        this.CardOpenIndex = index;
        this.hideWindow(this.filterWindow, 0);
    };
    MyDoctorsComponent.prototype.hideThreeDotsMenu = function () {
        // this.status = "scrolling";
        this.cardIndex = -1;
        this.isDrpShow = false;
        setTimeout(function () {
            // this.status = "not scrolling";
        }, 300);
    };
    MyDoctorsComponent.prototype.closePopMenu = function () {
        if (app.ios) {
            if (this.isBodyTapped) {
                this.cardIndex = -1;
                this.isDrpShow = false;
                this.hideWindow(this.filterWindow, 0);
            }
            else {
                this.isBodyTapped = true;
            }
        }
        else if (app.android) {
            this.cardIndex = -1;
            this.isDrpShow = false;
            this.hideWindow(this.filterWindow, 0);
        }
    };
    MyDoctorsComponent.prototype.keepOpen = function () {
        this.cardIndex = this.CardOpenIndex;
        if (app.ios) {
            this.isBodyTapped = false;
        }
    };
    /* MAPS */
    MyDoctorsComponent.prototype.locateAddress = function (address1, city, state, zipcode) {
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        this._globals.locateAddress(address1, city, state, zipcode);
    };
    /* CALL AND ADD TO CONTACTS */
    MyDoctorsComponent.prototype.callPhone = function (phoneNo) {
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        this._globals.callPhone(phoneNo);
    };
    MyDoctorsComponent.prototype.saveContact = function (doctor) {
        var _this = this;
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        if (app.android) {
            //android condition
            permissions.requestPermissions([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, android.Manifest.permission.GET_ACCOUNTS], "App Needs The Following permissions")
                .then(function () {
                _this.checkContactExistsAndSave(doctor);
            })
                .catch(function () {
                //Permission Denied
            });
        }
        else {
            //ios
            this.checkContactExistsAndSave(doctor);
        }
    };
    MyDoctorsComponent.prototype.updateAllContactIds = function (doctor) {
        var contactFields = ['phoneNumbers'];
        var self = this;
        contacts.getContacts(contactFields).then(function (args) {
            self.contactIds = args;
            self.checkContact(doctor);
        }, function (err) {
            console.log("Error: " + err);
        });
    };
    MyDoctorsComponent.prototype.checkContactExistsAndSave = function (doctor) {
        var _this = this;
        contactFound = new AsyncSubject_1.AsyncSubject();
        contactFound.subscribe(function (result) {
            if (result == null) {
                _this._globals.showToastMessage("Contact Already Exists!", "longer");
                _this.isBusy = false;
            }
            else {
                var mModel = result;
                _this.saveContactToContactList(mModel.name, mModel.mobile);
            }
        }, function (err) { return console.log(err); }, function () { return console.log('Completed'); });
        this.isBusy = true;
        this.updateAllContactIds(doctor);
    };
    MyDoctorsComponent.prototype.checkContact = function (doctor) {
        var _this = this;
        var desiredFields = ['phone'];
        var self = this;
        var flag = false;
        if (this.contactIds.length) {
            var index_1 = 0;
            for (var _i = 0, _a = this.contactIds; _i < _a.length; _i++) {
                var contact = _a[_i];
                contacts.getContactById(contact.contact_id, desiredFields).then(function (result) {
                    index_1++;
                    if (result) {
                        if (result.phone) {
                            for (var _i = 0, _a = result.phone; _i < _a.length; _i++) {
                                var phoneNumber = _a[_i];
                                if (phoneNumber.number.replace(/ /g, "") == doctor.mobile) {
                                    contactFound.next(null);
                                    contactFound.complete();
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!flag && index_1 == _this.contactIds.length) {
                        contactFound.next(doctor);
                        contactFound.complete();
                    }
                }, function (e) { console.dir(e); });
            }
        }
        else {
            contactFound.next(doctor);
            contactFound.complete();
        }
    };
    MyDoctorsComponent.prototype.saveContactToContactList = function (name, mobile) {
        try {
            var newContact = new nativescript_contacts_1.Contact();
            newContact.name.given = name;
            //newContact.name.family = "Doe";
            newContact.phoneNumbers.push({ label: nativescript_contacts_1.KnownLabel.HOME, value: mobile.toString() }); // See below for known labels
            newContact.save();
            this._globals.showToastMessage("Contact Added Successfully!", "");
            this.isBusy = false;
        }
        catch (e) {
            this._globals.showToastMessage("Please ensure that you have configured atleast one account in your device before adding contacts.", "longer");
        }
    };
    /* Dropdown Functions */
    MyDoctorsComponent.prototype.keepDrpOpen = function () {
        this.isDrpShow = true;
    };
    MyDoctorsComponent.prototype.drpChange = function () {
        this.isDrpShow = !this.isDrpShow;
    };
    MyDoctorsComponent.prototype.showVisitHistory = function (doctor) {
        this.cardIndex = -1;
        this._doctorService.selectedMember = this.getSelectedMember(this.memberList);
        this._doctorService.selectedDoctor = doctor;
        this._visitHistoryModal.showModal(viewVisitHistory_component_1.ViewVisitHistoryComponent, this.modalOptions).then(function (res) {
        });
    };
    /* Activity Indicator */
    MyDoctorsComponent.prototype.onBusyChanged = function () {
        console.log("changed");
    };
    MyDoctorsComponent.prototype.showExpandedSearchView = function () {
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    };
    MyDoctorsComponent.prototype.showDefaultSearchView = function () {
        this.isSearchExpanded = false;
    };
    MyDoctorsComponent.prototype.hideAllOverlayWindow = function () {
        this.hideWindow(this.filterWindow, 0);
        this.hideThreeDotsMenu();
    };
    MyDoctorsComponent.prototype.goBack = function () {
        this._router.back();
    };
    return MyDoctorsComponent;
}());
__decorate([
    core_1.ViewChild('filterWindow'),
    __metadata("design:type", Object)
], MyDoctorsComponent.prototype, "filterWindow", void 0);
MyDoctorsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./myDoctors.component.html",
        styleUrls: ["./myDoctors.css"]
    }),
    __metadata("design:paramtypes", [nativescript_locate_address_1.LocateAddress,
        router_1.RouterExtensions,
        myDoctors_service_1.MyDoctorsService,
        core_2.ViewContainerRef,
        global_1.Globals,
        dialogs_1.ModalDialogService,
        page_1.Page,
        core_3.ChangeDetectorRef])
], MyDoctorsComponent);
exports.MyDoctorsComponent = MyDoctorsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlEb2N0b3JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15RG9jdG9ycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEU7QUFDNUUsc0RBQStEO0FBRS9ELHlEQUF1RDtBQUN2RCxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBRXhELCtEQUE0RDtBQUM1RCwyRUFBNEQ7QUFFNUQsZ0NBQStCO0FBQy9CLDhDQUE4QztBQUM5Qyw0RkFBMEY7QUFDMUYsc0NBQWlEO0FBQ2pELG1FQUE2RTtBQUM3RSxrREFBaUQ7QUFHakQsc0NBQWtELENBQUUsb0NBQW9DO0FBRXhGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRXJELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQU94QixJQUFhLGtCQUFrQjtJQTJCM0IsNEJBRVksY0FBNkIsRUFDN0IsT0FBeUIsRUFDekIsY0FBZ0MsRUFDaEMsTUFBd0IsRUFDekIsUUFBaUIsRUFDaEIsa0JBQXNDLEVBQ3RDLElBQVUsRUFDVixHQUFzQjtRQVB0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhDMUIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFLL0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENBQUMsZUFBZTtRQUdqRCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRWxDLGNBQVMsR0FBVyxDQUFD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QUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLG1DQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFTTCx5QkFBQztBQUFELENBQUMsQUFqV0QsSUFpV0M7QUF6VjhCO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzt3REFBYztBQVIvQixrQkFBa0I7SUFMOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBOEI4QiwyQ0FBYTtRQUNwQix5QkFBZ0I7UUFDVCxvQ0FBZ0I7UUFDeEIsdUJBQWdCO1FBQ2YsZ0JBQU87UUFDSSw0QkFBa0I7UUFDaEMsV0FBSTtRQUNMLHdCQUFpQjtHQXBDekIsa0JBQWtCLENBaVc5QjtBQWpXWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRG9jdG9yTW9kZWwsIFJldmlld01vZGVsLCBNZW1iZXJNb2RlbCB9IGZyb20gXCIuL215RG9jdG9ycy5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNeURvY3RvcnNTZXJ2aWNlIH0gZnJvbSBcIi4vbXlEb2N0b3JzLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIHBlcm1pc3Npb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIjtcclxuaW1wb3J0ICogYXMgcGhvbmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1waG9uZVwiO1xyXG5pbXBvcnQgeyBDb250YWN0LCBLbm93bkxhYmVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb250YWN0c1wiO1xyXG5pbXBvcnQgeyBMb2NhdGVBZGRyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhdGUtYWRkcmVzc1wiO1xyXG5pbXBvcnQgeyBTY3JvbGxFdmVudERhdGEgfSBmcm9tIFwidWkvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBWaWV3VmlzaXRIaXN0b3J5Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld1Zpc2l0SGlzdG9yeS92aWV3VmlzaXRIaXN0b3J5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBBc3luY1N1YmplY3QgfSBmcm9tICdyeGpzL0FzeW5jU3ViamVjdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBUaW1lRGF0ZVBpY2tlciBmcm9tICduYXRpdmVzY3JpcHQtdGltZWRhdGVwaWNrZXInO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7ICAvL1dvcmthcm91bmQgdG8gcmVmbGVjdCBkYXRlIGNoYW5nZXNcclxuXHJcbnZhciBjb250YWN0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY29udGFjdHMtbGl0ZVwiKTtcclxuZGVjbGFyZSB2YXIgYW5kcm9pZDtcclxudmFyIGNvbnRhY3RGb3VuZCA9IG51bGw7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215RG9jdG9ycy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL215RG9jdG9ycy5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE15RG9jdG9yc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VhcmNoUXVlcnk6IHN0cmluZztcclxuICAgIHByaXZhdGUgYWRkcmVzczogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBkb2N0b3JzTGlzdDogRG9jdG9yTW9kZWxbXSA9IFtdO1xyXG4gICAgcHVibGljIG1lbWJlckxpc3Q6IE1lbWJlck1vZGVsW10gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE1lbWJlcjogTWVtYmVyTW9kZWw7XHJcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJXaW5kb3cnKSBmaWx0ZXJXaW5kb3c7XHJcblxyXG4gICAgcHVibGljIGZpbHRlckRhdGU7XHJcbiAgICBwdWJsaWMgaXNTZWFyY2hFeHBhbmRlZDpib29sZWFuID0gZmFsc2U7IC8vU2VhcmNoLUZpbHRlclxyXG5cclxuXHJcbiAgICBwdWJsaWMgaXNEcnBTaG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY2FyZEluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIENhcmRPcGVuSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgaXNCb2R5VGFwcGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgY29udGFjdElkcyA9IFtdO1xyXG4gICAgcHVibGljIGlzQnVzeSA9IGZhbHNlO1xyXG5cclxuICAgIHBhZ2VTdGFydFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlRW5kVGltZTogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgKFxyXG4gICAgICAgIHByaXZhdGUgX2xvY2F0ZUFkZHJlc3M6IExvY2F0ZUFkZHJlc3MsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgX2RvY3RvclNlcnZpY2U6IE15RG9jdG9yc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHByaXZhdGUgX3Zpc2l0SGlzdG9yeU1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIk15IERvY3RvcnNcIjtcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHRVQgTUVNQkVSIExJU1RcclxuICAgICAgICBsZXQgbWVtYmVyc0RhdGEgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLmdldEFsbE1lbWJlcnMoKTtcclxuICAgICAgICB0aGlzLm1lbWJlckxpc3QgPSBtZW1iZXJzRGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RNZW1iZXIodGhpcy5tZW1iZXJMaXN0WzBdKTtcclxuXHJcbiAgICAgICAgLyogXHJcbiAgICAgICAgTU1BUi0xMzk5IC0gU3Bpa2Ugc3RvcnkgY29kZSBcclxuICAgICAgICBUaW1lRGF0ZVBpY2tlci5pbml0KChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSByZXN1bHQuc3BsaXQoXCIgXCIpWzFdICsgXCIvXCIgKyByZXN1bHQuc3BsaXQoXCIgXCIpWzBdICsgXCIvXCIgKyByZXN1bHQuc3BsaXQoXCIgXCIpWzJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0ZSA9IGZvcm1hdHRlZERhdGU7XHJcbiAgICAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7IC8vV29ya2Fyb3VuZCB0byByZWZsZWN0IGRhdGUgY2hhbmdlc1xyXG4gICAgICAgIH0sIFwiU2VsZWN0IERhdGVcIiwgbnVsbCk7XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIE1lbWJlciBTZWxlY3Rpb24gKi9cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0TWVtYmVyKG1lbWJlcikge1xyXG4gICAgICAgIHRoaXMubWVtYmVyTGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uaXNTZWxlY3RlZCA9IGZhbHNlKTtcclxuICAgICAgICBtZW1iZXIuaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IG1lbWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5kb2N0b3JzTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICAvLyBHRVQgQUxMIERPQ1RPUlNcclxuICAgICAgICBsZXQgZG9jdG9yc0RhdGEgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLmdldEFsbERvY3RvcnMoKTtcclxuICAgICAgICB0aGlzLmRvY3RvcnNMaXN0ID0gZG9jdG9yc0RhdGEuZG9jdG9ycztcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDQwMCk7XHJcbiAgICAgICAgdGhpcy5zaG93RGVmYXVsdFNlYXJjaFZpZXcoKTsgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1dpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0RlZmF1bHRTZWFyY2hWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1dpbmRvdyhjdXN0b21XaW5kb3csIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlV2luZG93KGN1c3RvbVdpbmRvdywgZHVyYXRpb24pIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRNZW1iZXIobG9va3VwTGlzdCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gbG9va3VwTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzU2VsZWN0ZWQgPT09IHRydWUpO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zWzBdO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyogVGhyZWUgZG90cyBtZW51ICovXHJcblxyXG4gICAgcHVibGljIHNob3dPcHRpb25zKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhcmRPcGVuSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlVGhyZWVEb3RzTWVudSgpIHtcclxuICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IFwic2Nyb2xsaW5nXCI7XHJcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IFwibm90IHNjcm9sbGluZ1wiO1xyXG4gICAgICAgIH0sIDMwMCk7ICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUG9wTWVudSgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0JvZHlUYXBwZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2VlcE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSB0aGlzLkNhcmRPcGVuSW5kZXg7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0JvZHlUYXBwZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogTUFQUyAqL1xyXG5cclxuXHJcbiAgICBwdWJsaWMgbG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpIHtcclxuICAgICAgICB0aGlzLmhpZGVUaHJlZURvdHNNZW51KCk7XHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmxvY2F0ZUFkZHJlc3MoYWRkcmVzczEsIGNpdHksIHN0YXRlLCB6aXBjb2RlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQ0FMTCBBTkQgQUREIFRPIENPTlRBQ1RTICovXHJcblxyXG4gICAgcHVibGljIGNhbGxQaG9uZShwaG9uZU5vKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5jYWxsUGhvbmUocGhvbmVObyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzYXZlQ29udGFjdChkb2N0b3IpIHtcclxuICAgICAgICB0aGlzLmhpZGVUaHJlZURvdHNNZW51KCk7XHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgLy9hbmRyb2lkIGNvbmRpdGlvblxyXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX0NPTlRBQ1RTLCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5HRVRfQUNDT1VOVFNdLFxyXG4gICAgICAgICAgICAgICAgXCJBcHAgTmVlZHMgVGhlIEZvbGxvd2luZyBwZXJtaXNzaW9uc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShkb2N0b3IpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9QZXJtaXNzaW9uIERlbmllZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL2lvc1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29udGFjdEV4aXN0c0FuZFNhdmUoZG9jdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUFsbENvbnRhY3RJZHMoZG9jdG9yKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhY3RGaWVsZHMgPSBbJ3Bob25lTnVtYmVycyddO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb250YWN0cy5nZXRDb250YWN0cyhjb250YWN0RmllbGRzKS50aGVuKGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY29udGFjdElkcyA9IGFyZ3M7XHJcbiAgICAgICAgICAgIHNlbGYuY2hlY2tDb250YWN0KGRvY3Rvcik7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQ29udGFjdEV4aXN0c0FuZFNhdmUoZG9jdG9yKSB7XHJcbiAgICAgICAgY29udGFjdEZvdW5kID0gbmV3IEFzeW5jU3ViamVjdDxEb2N0b3JNb2RlbD4oKTtcclxuICAgICAgICBjb250YWN0Rm91bmQuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJDb250YWN0IEFscmVhZHkgRXhpc3RzIVwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1Nb2RlbDogRG9jdG9yTW9kZWwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQ29udGFjdFRvQ29udGFjdExpc3QobU1vZGVsLm5hbWUsIG1Nb2RlbC5tb2JpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ0NvbXBsZXRlZCcpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQWxsQ29udGFjdElkcyhkb2N0b3IpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tDb250YWN0KGRvY3Rvcikge1xyXG4gICAgICAgIGxldCBkZXNpcmVkRmllbGRzID0gWydwaG9uZSddO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZmxhZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb250YWN0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWN0IG9mIHRoaXMuY29udGFjdElkcykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhY3RzLmdldENvbnRhY3RCeUlkKGNvbnRhY3QuY29udGFjdF9pZCwgZGVzaXJlZEZpZWxkcykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucGhvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBob25lTnVtYmVyIG9mIHJlc3VsdC5waG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwaG9uZU51bWJlci5udW1iZXIucmVwbGFjZSgvIC9nLCBcIlwiKSA9PSBkb2N0b3IubW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcgJiYgaW5kZXggPT0gdGhpcy5jb250YWN0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQubmV4dChkb2N0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4geyBjb25zb2xlLmRpcihlKTsgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFjdEZvdW5kLm5leHQoZG9jdG9yKTtcclxuICAgICAgICAgICAgY29udGFjdEZvdW5kLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlQ29udGFjdFRvQ29udGFjdExpc3QobmFtZSwgbW9iaWxlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIG5ld0NvbnRhY3QgPSBuZXcgQ29udGFjdCgpO1xyXG4gICAgICAgICAgICBuZXdDb250YWN0Lm5hbWUuZ2l2ZW4gPSBuYW1lO1xyXG4gICAgICAgICAgICAvL25ld0NvbnRhY3QubmFtZS5mYW1pbHkgPSBcIkRvZVwiO1xyXG4gICAgICAgICAgICBuZXdDb250YWN0LnBob25lTnVtYmVycy5wdXNoKHsgbGFiZWw6IEtub3duTGFiZWwuSE9NRSwgdmFsdWU6IG1vYmlsZS50b1N0cmluZygpIH0pOyAvLyBTZWUgYmVsb3cgZm9yIGtub3duIGxhYmVsc1xyXG4gICAgICAgICAgICBuZXdDb250YWN0LnNhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiQ29udGFjdCBBZGRlZCBTdWNjZXNzZnVsbHkhXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJQbGVhc2UgZW5zdXJlIHRoYXQgeW91IGhhdmUgY29uZmlndXJlZCBhdGxlYXN0IG9uZSBhY2NvdW50IGluIHlvdXIgZGV2aWNlIGJlZm9yZSBhZGRpbmcgY29udGFjdHMuXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBEcm9wZG93biBGdW5jdGlvbnMgKi9cclxuXHJcbiAgICBwdWJsaWMga2VlcERycE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5pc0RycFNob3cgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcnBDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0RycFNob3cgPSAhdGhpcy5pc0RycFNob3c7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBtb2RhbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLl92Y1JlZlxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2hvd1Zpc2l0SGlzdG9yeShkb2N0b3IpIHtcclxuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX2RvY3RvclNlcnZpY2Uuc2VsZWN0ZWRNZW1iZXIgPSB0aGlzLmdldFNlbGVjdGVkTWVtYmVyKHRoaXMubWVtYmVyTGlzdCk7XHJcbiAgICAgICAgdGhpcy5fZG9jdG9yU2VydmljZS5zZWxlY3RlZERvY3RvciA9IGRvY3RvcjtcclxuICAgICAgICB0aGlzLl92aXNpdEhpc3RvcnlNb2RhbC5zaG93TW9kYWwoVmlld1Zpc2l0SGlzdG9yeUNvbXBvbmVudCwgdGhpcy5tb2RhbE9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKiBBY3Rpdml0eSBJbmRpY2F0b3IgKi9cclxuICAgIHB1YmxpYyBvbkJ1c3lDaGFuZ2VkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0V4cGFuZGVkU2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaEV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93RGVmYXVsdFNlYXJjaFZpZXcoKSB7IC8vIFNlYXJjaC1GaWx0ZXJcclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUFsbE92ZXJsYXlXaW5kb3coKXtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5iYWNrKCk7ICBcclxuICAgIH1cclxuXHJcbiAgICAvKiBEQVRFIFNQSUtFICovXHJcbiAgICAvKlxyXG4gICAgTU1BUi0xMzk5IC0gU3Bpa2Ugc3RvcnkgY29kZSBcclxuICAgIHB1YmxpYyBzaG93RGF0ZXBpY2tlcigpIHtcclxuICAgICAgICBUaW1lRGF0ZVBpY2tlci5zaG93RGF0ZVBpY2tlckRpYWxvZygpO1xyXG4gICAgfVxyXG4gICAgKi9cclxufSJdfQ==