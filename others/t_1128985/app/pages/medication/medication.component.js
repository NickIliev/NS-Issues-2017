"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var global_1 = require("../../shared/global");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var nativescript_contacts_1 = require("nativescript-contacts");
var core_2 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ViewPrescriptionModal_component_1 = require("./ViewPrescriptionModal/ViewPrescriptionModal.component");
var medication_service_1 = require("./medication.service");
var nativescript_locate_address_1 = require("nativescript-locate-address");
var page_1 = require("ui/page");
var AsyncSubject_1 = require("rxjs/AsyncSubject");
var contacts = require("nativescript-contacts-lite");
var contactFound = null;
var MedicationComponent = (function () {
    function MedicationComponent(_router, _routerExtensions, _globals, _vcRef, _viewPrescriptionModal, _medicationService, _locateAddress, page) {
        this._router = _router;
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this._vcRef = _vcRef;
        this._viewPrescriptionModal = _viewPrescriptionModal;
        this._medicationService = _medicationService;
        this._locateAddress = _locateAddress;
        this.page = page;
        this.show = false;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.memberList = [];
        this.isSearchExpanded = false; //Search-Filter
        this.cardIndex = -1;
        this.CardOpenIndex = -1;
        this.isBodyTapped = false;
        this.isDrpShow = false;
        this.isBusy = false;
        this.contactIds = [];
        this.modalOptions = {
            context: {},
            fullscreen: true,
            viewContainerRef: this._vcRef
        };
        this.pageStartTime = new Date().getTime();
        this.title = "My Medications";
    }
    MedicationComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        // GET MEMBER LIST
        var membersData = this._medicationService.getAllMembers();
        this.memberList = membersData;
        this.selectMember(this.memberList[0]);
    };
    MedicationComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    MedicationComponent.prototype.getSubscriber = function () {
        var subscriber;
        this.memberList.map(function (item) {
            if (item.type === "Subscriber") {
                subscriber = item;
            }
        });
        return subscriber;
    };
    MedicationComponent.prototype.selectMember = function (member) {
        this.memberList.map(function (item) { return item.isSelected = false; });
        member.isSelected = true;
        this.selectedMember = member;
        this.medicationList = [];
        // GET ALL DOCTORS
        var medicationData = this._medicationService.getAllMedications();
        this.medicationList = medicationData;
        this.hideWindow(this.filterWindow, 400);
        this.showDefaultSearchView();
    };
    MedicationComponent.prototype.hideThreeDotsMenu = function () {
        // this.status = "scrolling";
        this.cardIndex = -1;
        this.isDrpShow = false;
        setTimeout(function () {
            // this.status = "not scrolling";
        }, 300);
    };
    MedicationComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    MedicationComponent.prototype.showOptions = function (index) {
        this.isDrpShow = false;
        this.cardIndex = index;
        if (app.ios) {
            this.isBodyTapped = false;
        }
        this.CardOpenIndex = index;
        this.hideWindow(this.filterWindow, 0);
    };
    MedicationComponent.prototype.closePopMenu = function () {
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
    MedicationComponent.prototype.keepOpen = function () {
        this.cardIndex = this.CardOpenIndex;
        if (app.ios) {
            this.isBodyTapped = false;
        }
    };
    MedicationComponent.prototype.keepDrpOpen = function () {
        this.isDrpShow = true;
    };
    MedicationComponent.prototype.drpChange = function () {
        this.isDrpShow = !this.isDrpShow;
        this.cardIndex = -1;
    };
    MedicationComponent.prototype.prescriptionHistory = function (medicaiton) {
        this.cardIndex = -1;
        this._medicationService.historySelectedMember = medicaiton;
        this._medicationService.selectedUser = this.selectedMember;
        this._viewPrescriptionModal.showModal(ViewPrescriptionModal_component_1.ViewPrescriptionModalComponent, this.modalOptions).then(function (res) {
        });
    };
    MedicationComponent.prototype.viewClaim = function () {
        this.hideThreeDotsMenu();
        this._routerExtensions.navigate(["/claimSummary"], {
            animated: false
        });
    };
    MedicationComponent.prototype.callPhone = function (phoneNo) {
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        this._globals.callPhone(phoneNo);
    };
    MedicationComponent.prototype.saveContact = function (medicaiton) {
        var _this = this;
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, android.Manifest.permission.GET_ACCOUNTS], "App Needs The Following permissions")
                .then(function () {
                _this.checkContactExistsAndSave(medicaiton);
            })
                .catch(function () {
                // Permission Denied
            });
        }
        else {
            // ios
            this.checkContactExistsAndSave(medicaiton);
        }
    };
    MedicationComponent.prototype.updateAllContactIds = function (medication) {
        var contactFields = ['phoneNumbers'];
        var self = this;
        contacts.getContacts(contactFields).then(function (args) {
            self.contactIds = args;
            self.checkContact(medication);
        }, function (err) {
            console.log("Error: " + err);
        });
    };
    MedicationComponent.prototype.checkContactExistsAndSave = function (medication) {
        var _this = this;
        contactFound = new AsyncSubject_1.AsyncSubject();
        contactFound.subscribe(function (result) {
            if (result == null) {
                _this._globals.showToastMessage("Contact Already Exists!", "longer");
                _this.isBusy = false;
            }
            else {
                var mModel = result;
                _this.saveContactToContactList(mModel.doctorname, mModel.doctorMobile);
            }
        }, function (err) { return console.log(err); }, function () { return console.log('Completed'); });
        this.isBusy = true;
        this.updateAllContactIds(medication);
    };
    MedicationComponent.prototype.checkContact = function (medication) {
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
                                if (phoneNumber.number.replace(/ /g, "") == medication.doctorMobile) {
                                    contactFound.next(null);
                                    contactFound.complete();
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!flag && index_1 == _this.contactIds.length) {
                        contactFound.next(medication);
                        contactFound.complete();
                    }
                }, function (e) { console.dir(e); });
            }
        }
        else {
            contactFound.next(medication);
            contactFound.complete();
        }
    };
    MedicationComponent.prototype.saveContactToContactList = function (name, mobile) {
        try {
            var newContact = new contacts.Contact();
            newContact.name.given = name;
            // newContact.name.family = "Doe";
            newContact.phoneNumbers.push({ label: nativescript_contacts_1.KnownLabel.HOME, value: mobile.toString() }); // See below for known labels
            newContact.save();
            this._globals.showToastMessage("Contact Added Successfully!", "");
            this.isBusy = false;
        }
        catch (e) {
            this._globals.showToastMessage("Please ensure that you have configured atleast one account in your device before adding contacts.", "longer");
        }
    };
    MedicationComponent.prototype.locateAddress = function (address1, city, state, zipcode) {
        this.hideThreeDotsMenu();
        this.hideWindow(this.filterWindow, 0);
        this._globals.locateAddress(address1, city, state, zipcode);
    };
    MedicationComponent.prototype.showExpandedSearchView = function () {
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    };
    MedicationComponent.prototype.showDefaultSearchView = function () {
        this.isSearchExpanded = false;
    };
    MedicationComponent.prototype.hideAllOverlayWindow = function () {
        this.hideWindow(this.filterWindow, 0);
        this.hideThreeDotsMenu();
    };
    MedicationComponent.prototype.toggleFilter = function () {
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showWindow(this.filterWindow, 0);
        }
        this.showDefaultSearchView();
        this.hideThreeDotsMenu();
    };
    MedicationComponent.prototype.showWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    };
    MedicationComponent.prototype.hideWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    };
    return MedicationComponent;
}());
__decorate([
    core_1.ViewChild('filterWindow'),
    __metadata("design:type", Object)
], MedicationComponent.prototype, "filterWindow", void 0);
MedicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./medication.component.html",
        styleUrls: ["medication.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.RouterExtensions,
        global_1.Globals,
        core_2.ViewContainerRef,
        dialogs_1.ModalDialogService,
        medication_service_1.MedicationService,
        nativescript_locate_address_1.LocateAddress,
        page_1.Page])
], MedicationComponent);
exports.MedicationComponent = MedicationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRztBQUMzRywwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELDhDQUE4QztBQUM5QyxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBRXhELCtEQUE0RDtBQUU1RCxzQ0FBaUQ7QUFDakQsbUVBQTZFO0FBQzdFLDJHQUF5RztBQUN6RywyREFBeUQ7QUFHekQsMkVBQTREO0FBQzVELGdDQUErQjtBQUUvQixrREFBaUQ7QUFFakQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFckQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBUXhCLElBQWEsbUJBQW1CO0lBaUM1Qiw2QkFBb0IsT0FBZSxFQUN2QixpQkFBbUMsRUFDcEMsUUFBaUIsRUFDaEIsTUFBd0IsRUFDeEIsc0JBQTBDLEVBQzNDLGtCQUFxQyxFQUNwQyxjQUE2QixFQUM3QixJQUFVO1FBUEYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFvQjtRQUMzQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQU07UUFwQ2YsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUU3QixrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLekIsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFFL0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENB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QUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSx3Q0FBVSxHQUFqQixVQUFrQixZQUFZLEVBQUUsUUFBUTtRQUNwQyxVQUFVLENBQUM7WUFDUCxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUwsMEJBQUM7QUFBRCxDQUFDLEFBaFVELElBZ1VDO0FBclQ4QjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7eURBQWM7QUFYL0IsbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztLQUVoQyxDQUFDO3FDQWtDK0IsZUFBTTtRQUNKLHlCQUFnQjtRQUMxQixnQkFBTztRQUNSLHVCQUFnQjtRQUNBLDRCQUFrQjtRQUN2QixzQ0FBaUI7UUFDcEIsMkNBQWE7UUFDdkIsV0FBSTtHQXhDYixtQkFBbUIsQ0FnVS9CO0FBaFVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XG5pbXBvcnQgKiBhcyBwaG9uZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBob25lXCI7XG5pbXBvcnQgeyBDb250YWN0LCBLbm93bkxhYmVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb250YWN0c1wiO1xuaW1wb3J0IHsgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFZpZXdQcmVzY3JpcHRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL1ZpZXdQcmVzY3JpcHRpb25Nb2RhbC9WaWV3UHJlc2NyaXB0aW9uTW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNZWRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL21lZGljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTWVkaWNhdGlvbk1vZGVsLCBNZW1iZXJNb2RlbCB9IGZyb20gXCIuL21lZGljYXRpb24ubW9kZWxcIjtcbmltcG9ydCB7IERlcGVuZGVudE1vZGVsIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9tb2RlbHMvZGVwZW5kZW50Lm1vZGVsXCI7XG5pbXBvcnQgeyBMb2NhdGVBZGRyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhdGUtYWRkcmVzc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0IH0gZnJvbSAncnhqcy9Bc3luY1N1YmplY3QnO1xuXG52YXIgY29udGFjdHMgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNvbnRhY3RzLWxpdGVcIik7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xudmFyIGNvbnRhY3RGb3VuZCA9IG51bGw7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tZWRpY2F0aW9uLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJtZWRpY2F0aW9uLmNzc1wiXVxuXG59KVxuZXhwb3J0IGNsYXNzIE1lZGljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gICAgcHVibGljIHNob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VFbmRUaW1lIDogbnVtYmVyID0gMDtcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIG1lZGljYXRpb25MaXN0OiBNZWRpY2F0aW9uTW9kZWxbXTtcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJXaW5kb3cnKSBmaWx0ZXJXaW5kb3c7XG5cbiAgICBwdWJsaWMgbWVtYmVyTGlzdDogTWVtYmVyTW9kZWxbXSA9IFtdO1xuXG4gICAgcHVibGljIGlzU2VhcmNoRXhwYW5kZWQ6Ym9vbGVhbiA9IGZhbHNlOyAvL1NlYXJjaC1GaWx0ZXJcblxuICAgIGNhcmRJbmRleDogbnVtYmVyID0gLTE7XG4gICAgQ2FyZE9wZW5JbmRleDogbnVtYmVyID0gLTE7XG4gICAgaXNCb2R5VGFwcGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNEcnBTaG93OiBib29sZWFuID0gZmFsc2U7XG4gICAgTWVtZWJlcnNEaXNwbGF5TmFtZTogRGVwZW5kZW50TW9kZWxbXTtcbiAgICBwdWJsaWMgaXNCdXN5ID0gZmFsc2U7XG4gICAgcHVibGljIGNvbnRhY3RJZHMgPSBbXTtcblxuICAgIHB1YmxpYyBzZWxlY3RlZE1lbWJlcjogTWVtYmVyTW9kZWw7XG5cbiAgICBwdWJsaWMgbW9kYWxPcHRpb25zID0ge1xuICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmNSZWZcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdQcmVzY3JpcHRpb25Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgX21lZGljYXRpb25TZXJ2aWNlOiBNZWRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRlQWRkcmVzczogTG9jYXRlQWRkcmVzcyxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJNeSBNZWRpY2F0aW9uc1wiO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR0VUIE1FTUJFUiBMSVNUXG4gICAgICAgIGxldCBtZW1iZXJzRGF0YSA9IHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLmdldEFsbE1lbWJlcnMoKTtcbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gbWVtYmVyc0RhdGE7XG4gICAgICAgIHRoaXMuc2VsZWN0TWVtYmVyKHRoaXMubWVtYmVyTGlzdFswXSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3Vic2NyaWJlcigpIHtcbiAgICAgICAgbGV0IHN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMubWVtYmVyTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IFwiU3Vic2NyaWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlciA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0TWVtYmVyKG1lbWJlcikge1xuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgICAgIG1lbWJlci5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IG1lbWJlcjtcblxuICAgICAgICB0aGlzLm1lZGljYXRpb25MaXN0ID0gW107XG5cbiAgICAgICAgLy8gR0VUIEFMTCBET0NUT1JTXG4gICAgICAgIGxldCBtZWRpY2F0aW9uRGF0YSA9IHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLmdldEFsbE1lZGljYXRpb25zKCk7XG4gICAgICAgIHRoaXMubWVkaWNhdGlvbkxpc3QgPSBtZWRpY2F0aW9uRGF0YTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCA0MDApO1xuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlVGhyZWVEb3RzTWVudSgpIHtcbiAgICAgICAgLy8gdGhpcy5zdGF0dXMgPSBcInNjcm9sbGluZ1wiO1xuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJub3Qgc2Nyb2xsaW5nXCI7XG4gICAgICAgIH0sIDMwMCk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG4gICAgcHVibGljIHNob3dPcHRpb25zKGluZGV4KSB7XG4gICAgICAgIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FyZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuQ2FyZE9wZW5JbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZVBvcE1lbnUoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0JvZHlUYXBwZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcHAuYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcbiAgICAgICAgICAgIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGtlZXBPcGVuKCkge1xuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IHRoaXMuQ2FyZE9wZW5JbmRleDtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMga2VlcERycE9wZW4oKSB7XG4gICAgICAgIHRoaXMuaXNEcnBTaG93ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJwQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9ICF0aGlzLmlzRHJwU2hvdztcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcbiAgICB9XG5cblxuXG4gICAgcHVibGljIHByZXNjcmlwdGlvbkhpc3RvcnkobWVkaWNhaXRvbjogTWVkaWNhdGlvbk1vZGVsKSB7XG4gICAgICAgIHRoaXMuY2FyZEluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLmhpc3RvcnlTZWxlY3RlZE1lbWJlciA9IG1lZGljYWl0b247XG4gICAgICAgIHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLnNlbGVjdGVkVXNlciA9IHRoaXMuc2VsZWN0ZWRNZW1iZXI7XG4gICAgICAgIHRoaXMuX3ZpZXdQcmVzY3JpcHRpb25Nb2RhbC5zaG93TW9kYWwoVmlld1ByZXNjcmlwdGlvbk1vZGFsQ29tcG9uZW50LCB0aGlzLm1vZGFsT3B0aW9ucykudGhlbihyZXMgPT4ge1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB2aWV3Q2xhaW0oKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2xhaW1TdW1tYXJ5XCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGxQaG9uZShwaG9uZU5vKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5jYWxsUGhvbmUocGhvbmVObyk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2F2ZUNvbnRhY3QobWVkaWNhaXRvbjogTWVkaWNhdGlvbk1vZGVsKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICAgICAgICAvLyBhbmRyb2lkIGNvbmRpdGlvblxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVBRF9DT05UQUNUUywgYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLldSSVRFX0NPTlRBQ1RTLCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uR0VUX0FDQ09VTlRTXSxcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29udGFjdEV4aXN0c0FuZFNhdmUobWVkaWNhaXRvbik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBQZXJtaXNzaW9uIERlbmllZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW9zXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29udGFjdEV4aXN0c0FuZFNhdmUobWVkaWNhaXRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQWxsQ29udGFjdElkcyhtZWRpY2F0aW9uOiBNZWRpY2F0aW9uTW9kZWwpIHtcbiAgICAgICAgdmFyIGNvbnRhY3RGaWVsZHMgPSBbJ3Bob25lTnVtYmVycyddO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnRhY3RzLmdldENvbnRhY3RzKGNvbnRhY3RGaWVsZHMpLnRoZW4oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHNlbGYuY29udGFjdElkcyA9IGFyZ3M7XG4gICAgICAgICAgICBzZWxmLmNoZWNrQ29udGFjdChtZWRpY2F0aW9uKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShtZWRpY2F0aW9uOiBNZWRpY2F0aW9uTW9kZWwpIHtcbiAgICAgICAgY29udGFjdEZvdW5kID0gbmV3IEFzeW5jU3ViamVjdDxNZWRpY2F0aW9uTW9kZWw+KCk7XG4gICAgICAgIGNvbnRhY3RGb3VuZC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIkNvbnRhY3QgQWxyZWFkeSBFeGlzdHMhXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1Nb2RlbDogTWVkaWNhdGlvbk1vZGVsID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVDb250YWN0VG9Db250YWN0TGlzdChtTW9kZWwuZG9jdG9ybmFtZSwgbU1vZGVsLmRvY3Rvck1vYmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpLFxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ0NvbXBsZXRlZCcpKTtcblxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlQWxsQ29udGFjdElkcyhtZWRpY2F0aW9uKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjaGVja0NvbnRhY3QobWVkaWNhdGlvbjogTWVkaWNhdGlvbk1vZGVsKSB7XG4gICAgICAgIGxldCBkZXNpcmVkRmllbGRzID0gWydwaG9uZSddO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFjdElkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWN0IG9mIHRoaXMuY29udGFjdElkcykge1xuXG4gICAgICAgICAgICAgICAgY29udGFjdHMuZ2V0Q29udGFjdEJ5SWQoY29udGFjdC5jb250YWN0X2lkLCBkZXNpcmVkRmllbGRzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5waG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBob25lTnVtYmVyIG9mIHJlc3VsdC5waG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGhvbmVOdW1iZXIubnVtYmVyLnJlcGxhY2UoLyAvZywgXCJcIikgPT0gbWVkaWNhdGlvbi5kb2N0b3JNb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvdW5kLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmxhZyAmJiBpbmRleCA9PSB0aGlzLmNvbnRhY3RJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQubmV4dChtZWRpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHsgY29uc29sZS5kaXIoZSk7IH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KG1lZGljYXRpb24pO1xuICAgICAgICAgICAgY29udGFjdEZvdW5kLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZUNvbnRhY3RUb0NvbnRhY3RMaXN0KG5hbWUsIG1vYmlsZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IG5ld0NvbnRhY3QgPSBuZXcgY29udGFjdHMuQ29udGFjdCgpO1xuICAgICAgICAgICAgbmV3Q29udGFjdC5uYW1lLmdpdmVuID0gbmFtZTtcbiAgICAgICAgICAgIC8vIG5ld0NvbnRhY3QubmFtZS5mYW1pbHkgPSBcIkRvZVwiO1xuICAgICAgICAgICAgbmV3Q29udGFjdC5waG9uZU51bWJlcnMucHVzaCh7IGxhYmVsOiBLbm93bkxhYmVsLkhPTUUsIHZhbHVlOiBtb2JpbGUudG9TdHJpbmcoKSB9KTsgLy8gU2VlIGJlbG93IGZvciBrbm93biBsYWJlbHNcbiAgICAgICAgICAgIG5ld0NvbnRhY3Quc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiQ29udGFjdCBBZGRlZCBTdWNjZXNzZnVsbHkhXCIsIFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiUGxlYXNlIGVuc3VyZSB0aGF0IHlvdSBoYXZlIGNvbmZpZ3VyZWQgYXRsZWFzdCBvbmUgYWNjb3VudCBpbiB5b3VyIGRldmljZSBiZWZvcmUgYWRkaW5nIGNvbnRhY3RzLlwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIGxvY2F0ZUFkZHJlc3MoYWRkcmVzczEsIGNpdHksIHN0YXRlLCB6aXBjb2RlKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5sb2NhdGVBZGRyZXNzKGFkZHJlc3MxLCBjaXR5LCBzdGF0ZSwgemlwY29kZSk7XG4gICAgfVxuXG5cblxuICAgIFxuXG4gICAgcHVibGljIHNob3dFeHBhbmRlZFNlYXJjaFZpZXcoKSB7IC8vIFNlYXJjaC1GaWx0ZXJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaEV4cGFuZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIHNob3dEZWZhdWx0U2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUFsbE92ZXJsYXlXaW5kb3coKXtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93V2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xuICAgICAgICB0aGlzLmhpZGVUaHJlZURvdHNNZW51KCk7XG4gICAgfVxuXG4gICAgXG4gICAgcHVibGljIHNob3dXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZVdpbmRvdyhjdXN0b21XaW5kb3csIGR1cmF0aW9uKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG59XG4iXX0=