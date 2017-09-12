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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRztBQUMzRywwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELDhDQUE4QztBQUM5QyxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBRXhELCtEQUE0RDtBQUU1RCxzQ0FBaUQ7QUFDakQsbUVBQTZFO0FBQzdFLDJHQUF5RztBQUN6RywyREFBeUQ7QUFHekQsMkVBQTREO0FBQzVELGdDQUErQjtBQUUvQixrREFBaUQ7QUFFakQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFckQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBUXhCLElBQWEsbUJBQW1CO0lBaUM1Qiw2QkFBb0IsT0FBZSxFQUN2QixpQkFBbUMsRUFDcEMsUUFBaUIsRUFDaEIsTUFBd0IsRUFDeEIsc0JBQTBDLEVBQzNDLGtCQUFxQyxFQUNwQyxjQUE2QixFQUM3QixJQUFVO1FBUEYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFvQjtRQUMzQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQU07UUFwQ2YsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUU3QixrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLekIsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFFL0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENB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QUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSx3Q0FBVSxHQUFqQixVQUFrQixZQUFZLEVBQUUsUUFBUTtRQUNwQyxVQUFVLENBQUM7WUFDUCxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUwsMEJBQUM7QUFBRCxDQUFDLEFBaFVELElBZ1VDO0FBclQ4QjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7eURBQWM7QUFYL0IsbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztLQUVoQyxDQUFDO3FDQWtDK0IsZUFBTTtRQUNKLHlCQUFnQjtRQUMxQixnQkFBTztRQUNSLHVCQUFnQjtRQUNBLDRCQUFrQjtRQUN2QixzQ0FBaUI7UUFDcEIsMkNBQWE7UUFDdkIsV0FBSTtHQXhDYixtQkFBbUIsQ0FnVS9CO0FBaFVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FbmQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBwaG9uZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBob25lXCI7XHJcbmltcG9ydCB7IENvbnRhY3QsIEtub3duTGFiZWwgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvbnRhY3RzXCI7XHJcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBWaWV3UHJlc2NyaXB0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9WaWV3UHJlc2NyaXB0aW9uTW9kYWwvVmlld1ByZXNjcmlwdGlvbk1vZGFsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNZWRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL21lZGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNZWRpY2F0aW9uTW9kZWwsIE1lbWJlck1vZGVsIH0gZnJvbSBcIi4vbWVkaWNhdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbnRNb2RlbCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvbW9kZWxzL2RlcGVuZGVudC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMb2NhdGVBZGRyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhdGUtYWRkcmVzc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuZGVjbGFyZSB2YXIgYW5kcm9pZDtcclxuaW1wb3J0IHsgQXN5bmNTdWJqZWN0IH0gZnJvbSAncnhqcy9Bc3luY1N1YmplY3QnO1xyXG5cclxudmFyIGNvbnRhY3RzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jb250YWN0cy1saXRlXCIpO1xyXG5kZWNsYXJlIHZhciBhbmRyb2lkO1xyXG52YXIgY29udGFjdEZvdW5kID0gbnVsbDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWVkaWNhdGlvbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJtZWRpY2F0aW9uLmNzc1wiXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lZGljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZVRpbWVEaWZmZXJlbmNlIDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgbWVkaWNhdGlvbkxpc3Q6IE1lZGljYXRpb25Nb2RlbFtdO1xyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyV2luZG93JykgZmlsdGVyV2luZG93O1xyXG5cclxuICAgIHB1YmxpYyBtZW1iZXJMaXN0OiBNZW1iZXJNb2RlbFtdID0gW107XHJcblxyXG4gICAgcHVibGljIGlzU2VhcmNoRXhwYW5kZWQ6Ym9vbGVhbiA9IGZhbHNlOyAvL1NlYXJjaC1GaWx0ZXJcclxuXHJcbiAgICBjYXJkSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgQ2FyZE9wZW5JbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBpc0JvZHlUYXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzRHJwU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgTWVtZWJlcnNEaXNwbGF5TmFtZTogRGVwZW5kZW50TW9kZWxbXTtcclxuICAgIHB1YmxpYyBpc0J1c3kgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb250YWN0SWRzID0gW107XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkTWVtYmVyOiBNZW1iZXJNb2RlbDtcclxuXHJcbiAgICBwdWJsaWMgbW9kYWxPcHRpb25zID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmNSZWZcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXHJcbiAgICAgICAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfdmlld1ByZXNjcmlwdGlvbk1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9tZWRpY2F0aW9uU2VydmljZTogTWVkaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRlQWRkcmVzczogTG9jYXRlQWRkcmVzcyxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNeSBNZWRpY2F0aW9uc1wiO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdFVCBNRU1CRVIgTElTVFxyXG4gICAgICAgIGxldCBtZW1iZXJzRGF0YSA9IHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLmdldEFsbE1lbWJlcnMoKTtcclxuICAgICAgICB0aGlzLm1lbWJlckxpc3QgPSBtZW1iZXJzRGF0YTtcclxuICAgICAgICB0aGlzLnNlbGVjdE1lbWJlcih0aGlzLm1lbWJlckxpc3RbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTdWJzY3JpYmVyKCkge1xyXG4gICAgICAgIGxldCBzdWJzY3JpYmVyO1xyXG4gICAgICAgIHRoaXMubWVtYmVyTGlzdC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJTdWJzY3JpYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIgPSBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdE1lbWJlcihtZW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgbWVtYmVyLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSBtZW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWNhdGlvbkxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR0VUIEFMTCBET0NUT1JTXHJcbiAgICAgICAgbGV0IG1lZGljYXRpb25EYXRhID0gdGhpcy5fbWVkaWNhdGlvblNlcnZpY2UuZ2V0QWxsTWVkaWNhdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm1lZGljYXRpb25MaXN0ID0gbWVkaWNhdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCA0MDApO1xyXG4gICAgICAgIHRoaXMuc2hvd0RlZmF1bHRTZWFyY2hWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVUaHJlZURvdHNNZW51KCkge1xyXG4gICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJzY3JvbGxpbmdcIjtcclxuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJub3Qgc2Nyb2xsaW5nXCI7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93T3B0aW9ucyhpbmRleCkge1xyXG4gICAgICAgIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhcmRPcGVuSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVBvcE1lbnUoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNCb2R5VGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtlZXBPcGVuKCkge1xyXG4gICAgICAgIHRoaXMuY2FyZEluZGV4ID0gdGhpcy5DYXJkT3BlbkluZGV4O1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBrZWVwRHJwT3BlbigpIHtcclxuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRycENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9ICF0aGlzLmlzRHJwU2hvdztcclxuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IC0xO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHByZXNjcmlwdGlvbkhpc3RvcnkobWVkaWNhaXRvbjogTWVkaWNhdGlvbk1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9tZWRpY2F0aW9uU2VydmljZS5oaXN0b3J5U2VsZWN0ZWRNZW1iZXIgPSBtZWRpY2FpdG9uO1xyXG4gICAgICAgIHRoaXMuX21lZGljYXRpb25TZXJ2aWNlLnNlbGVjdGVkVXNlciA9IHRoaXMuc2VsZWN0ZWRNZW1iZXI7XHJcbiAgICAgICAgdGhpcy5fdmlld1ByZXNjcmlwdGlvbk1vZGFsLnNob3dNb2RhbChWaWV3UHJlc2NyaXB0aW9uTW9kYWxDb21wb25lbnQsIHRoaXMubW9kYWxPcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWV3Q2xhaW0oKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NsYWltU3VtbWFyeVwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbFBob25lKHBob25lTm8pIHtcclxuICAgICAgICB0aGlzLmhpZGVUaHJlZURvdHNNZW51KCk7XHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNhbGxQaG9uZShwaG9uZU5vKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNhdmVDb250YWN0KG1lZGljYWl0b246IE1lZGljYXRpb25Nb2RlbCkge1xyXG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICAvLyBhbmRyb2lkIGNvbmRpdGlvblxyXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX0NPTlRBQ1RTLCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5HRVRfQUNDT1VOVFNdLFxyXG4gICAgICAgICAgICAgICAgXCJBcHAgTmVlZHMgVGhlIEZvbGxvd2luZyBwZXJtaXNzaW9uc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShtZWRpY2FpdG9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gRGVuaWVkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlvc1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29udGFjdEV4aXN0c0FuZFNhdmUobWVkaWNhaXRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVBbGxDb250YWN0SWRzKG1lZGljYXRpb246IE1lZGljYXRpb25Nb2RlbCkge1xyXG4gICAgICAgIHZhciBjb250YWN0RmllbGRzID0gWydwaG9uZU51bWJlcnMnXTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29udGFjdHMuZ2V0Q29udGFjdHMoY29udGFjdEZpZWxkcykudGhlbihmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgICAgICBzZWxmLmNvbnRhY3RJZHMgPSBhcmdzO1xyXG4gICAgICAgICAgICBzZWxmLmNoZWNrQ29udGFjdChtZWRpY2F0aW9uKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShtZWRpY2F0aW9uOiBNZWRpY2F0aW9uTW9kZWwpIHtcclxuICAgICAgICBjb250YWN0Rm91bmQgPSBuZXcgQXN5bmNTdWJqZWN0PE1lZGljYXRpb25Nb2RlbD4oKTtcclxuICAgICAgICBjb250YWN0Rm91bmQuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJDb250YWN0IEFscmVhZHkgRXhpc3RzIVwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1Nb2RlbDogTWVkaWNhdGlvbk1vZGVsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUNvbnRhY3RUb0NvbnRhY3RMaXN0KG1Nb2RlbC5kb2N0b3JuYW1lLCBtTW9kZWwuZG9jdG9yTW9iaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IGNvbnNvbGUubG9nKGVyciksXHJcbiAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdDb21wbGV0ZWQnKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFsbENvbnRhY3RJZHMobWVkaWNhdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjaGVja0NvbnRhY3QobWVkaWNhdGlvbjogTWVkaWNhdGlvbk1vZGVsKSB7XHJcbiAgICAgICAgbGV0IGRlc2lyZWRGaWVsZHMgPSBbJ3Bob25lJ107XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhY3RJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRhY3Qgb2YgdGhpcy5jb250YWN0SWRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFjdHMuZ2V0Q29udGFjdEJ5SWQoY29udGFjdC5jb250YWN0X2lkLCBkZXNpcmVkRmllbGRzKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5waG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGhvbmVOdW1iZXIgb2YgcmVzdWx0LnBob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBob25lTnVtYmVyLm51bWJlci5yZXBsYWNlKC8gL2csIFwiXCIpID09IG1lZGljYXRpb24uZG9jdG9yTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcgJiYgaW5kZXggPT0gdGhpcy5jb250YWN0SWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQubmV4dChtZWRpY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvdW5kLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHsgY29uc29sZS5kaXIoZSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KG1lZGljYXRpb24pO1xyXG4gICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVDb250YWN0VG9Db250YWN0TGlzdChuYW1lLCBtb2JpbGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgbmV3Q29udGFjdCA9IG5ldyBjb250YWN0cy5Db250YWN0KCk7XHJcbiAgICAgICAgICAgIG5ld0NvbnRhY3QubmFtZS5naXZlbiA9IG5hbWU7XHJcbiAgICAgICAgICAgIC8vIG5ld0NvbnRhY3QubmFtZS5mYW1pbHkgPSBcIkRvZVwiO1xyXG4gICAgICAgICAgICBuZXdDb250YWN0LnBob25lTnVtYmVycy5wdXNoKHsgbGFiZWw6IEtub3duTGFiZWwuSE9NRSwgdmFsdWU6IG1vYmlsZS50b1N0cmluZygpIH0pOyAvLyBTZWUgYmVsb3cgZm9yIGtub3duIGxhYmVsc1xyXG4gICAgICAgICAgICBuZXdDb250YWN0LnNhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiQ29udGFjdCBBZGRlZCBTdWNjZXNzZnVsbHkhXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJQbGVhc2UgZW5zdXJlIHRoYXQgeW91IGhhdmUgY29uZmlndXJlZCBhdGxlYXN0IG9uZSBhY2NvdW50IGluIHlvdXIgZGV2aWNlIGJlZm9yZSBhZGRpbmcgY29udGFjdHMuXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGxvY2F0ZUFkZHJlc3MoYWRkcmVzczEsIGNpdHksIHN0YXRlLCB6aXBjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5sb2NhdGVBZGRyZXNzKGFkZHJlc3MxLCBjaXR5LCBzdGF0ZSwgemlwY29kZSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgc2hvd0V4cGFuZGVkU2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaEV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93RGVmYXVsdFNlYXJjaFZpZXcoKSB7IC8vIFNlYXJjaC1GaWx0ZXJcclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUFsbE92ZXJsYXlXaW5kb3coKXtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlRmlsdGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xyXG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzaG93V2luZG93KGN1c3RvbVdpbmRvdywgZHVyYXRpb24pIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXN0b21XaW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=