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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlEb2N0b3JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15RG9jdG9ycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEU7QUFDNUUsc0RBQStEO0FBRS9ELHlEQUF1RDtBQUN2RCxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBRXhELCtEQUE0RDtBQUM1RCwyRUFBNEQ7QUFFNUQsZ0NBQStCO0FBQy9CLDhDQUE4QztBQUM5Qyw0RkFBMEY7QUFDMUYsc0NBQWlEO0FBQ2pELG1FQUE2RTtBQUM3RSxrREFBaUQ7QUFHakQsc0NBQWtELENBQUUsb0NBQW9DO0FBRXhGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRXJELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQU94QixJQUFhLGtCQUFrQjtJQTJCM0IsNEJBRVksY0FBNkIsRUFDN0IsT0FBeUIsRUFDekIsY0FBZ0MsRUFDaEMsTUFBd0IsRUFDekIsUUFBaUIsRUFDaEIsa0JBQXNDLEVBQ3RDLElBQVUsRUFDVixHQUFzQjtRQVB0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhDMUIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFLL0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENBQUMsZUFBZTtRQUdqRCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRWxDLGNBQVMsR0FBVyxDQUFD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QUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLG1DQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFTTCx5QkFBQztBQUFELENBQUMsQUFqV0QsSUFpV0M7QUF6VjhCO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzt3REFBYztBQVIvQixrQkFBa0I7SUFMOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBOEI4QiwyQ0FBYTtRQUNwQix5QkFBZ0I7UUFDVCxvQ0FBZ0I7UUFDeEIsdUJBQWdCO1FBQ2YsZ0JBQU87UUFDSSw0QkFBa0I7UUFDaEMsV0FBSTtRQUNMLHdCQUFpQjtHQXBDekIsa0JBQWtCLENBaVc5QjtBQWpXWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBEb2N0b3JNb2RlbCwgUmV2aWV3TW9kZWwsIE1lbWJlck1vZGVsIH0gZnJvbSBcIi4vbXlEb2N0b3JzLm1vZGVsXCI7XG5pbXBvcnQgeyBNeURvY3RvcnNTZXJ2aWNlIH0gZnJvbSBcIi4vbXlEb2N0b3JzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0ICogYXMgcGhvbmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1waG9uZVwiO1xuaW1wb3J0IHsgQ29udGFjdCwgS25vd25MYWJlbCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY29udGFjdHNcIjtcbmltcG9ydCB7IExvY2F0ZUFkZHJlc3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2F0ZS1hZGRyZXNzXCI7XG5pbXBvcnQgeyBTY3JvbGxFdmVudERhdGEgfSBmcm9tIFwidWkvc2Nyb2xsLXZpZXdcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBWaWV3VmlzaXRIaXN0b3J5Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld1Zpc2l0SGlzdG9yeS92aWV3VmlzaXRIaXN0b3J5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QgfSBmcm9tICdyeGpzL0FzeW5jU3ViamVjdCc7XG5cbmltcG9ydCAqIGFzIFRpbWVEYXRlUGlja2VyIGZyb20gJ25hdGl2ZXNjcmlwdC10aW1lZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7ICAvL1dvcmthcm91bmQgdG8gcmVmbGVjdCBkYXRlIGNoYW5nZXNcblxudmFyIGNvbnRhY3RzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jb250YWN0cy1saXRlXCIpO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcbnZhciBjb250YWN0Rm91bmQgPSBudWxsO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXlEb2N0b3JzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL215RG9jdG9ycy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlEb2N0b3JzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIHByaXZhdGUgYWRkcmVzczogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgZG9jdG9yc0xpc3Q6IERvY3Rvck1vZGVsW10gPSBbXTtcbiAgICBwdWJsaWMgbWVtYmVyTGlzdDogTWVtYmVyTW9kZWxbXSA9IFtdO1xuICAgIHB1YmxpYyBzZWxlY3RlZE1lbWJlcjogTWVtYmVyTW9kZWw7XG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyV2luZG93JykgZmlsdGVyV2luZG93O1xuXG4gICAgcHVibGljIGZpbHRlckRhdGU7XG4gICAgcHVibGljIGlzU2VhcmNoRXhwYW5kZWQ6Ym9vbGVhbiA9IGZhbHNlOyAvL1NlYXJjaC1GaWx0ZXJcblxuXG4gICAgcHVibGljIGlzRHJwU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY2FyZEluZGV4OiBudW1iZXIgPSAtMTtcbiAgICBDYXJkT3BlbkluZGV4OiBudW1iZXIgPSAtMTtcbiAgICBpc0JvZHlUYXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY29udGFjdElkcyA9IFtdO1xuICAgIHB1YmxpYyBpc0J1c3kgPSBmYWxzZTtcblxuICAgIHBhZ2VTdGFydFRpbWU6IG51bWJlciA9IDA7XG4gICAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XG4gICAgcGFnZVRpbWVEaWZmZXJlbmNlOiBudW1iZXIgPSAwO1xuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3JcbiAgICAgICAgKFxuICAgICAgICBwcml2YXRlIF9sb2NhdGVBZGRyZXNzOiBMb2NhdGVBZGRyZXNzLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2RvY3RvclNlcnZpY2U6IE15RG9jdG9yc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3ZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXG4gICAgICAgIHByaXZhdGUgX3Zpc2l0SGlzdG9yeU1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBcIk15IERvY3RvcnNcIjtcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHRVQgTUVNQkVSIExJU1RcbiAgICAgICAgbGV0IG1lbWJlcnNEYXRhID0gdGhpcy5fZG9jdG9yU2VydmljZS5nZXRBbGxNZW1iZXJzKCk7XG4gICAgICAgIHRoaXMubWVtYmVyTGlzdCA9IG1lbWJlcnNEYXRhO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0TWVtYmVyKHRoaXMubWVtYmVyTGlzdFswXSk7XG5cbiAgICAgICAgLyogXG4gICAgICAgIE1NQVItMTM5OSAtIFNwaWtlIHN0b3J5IGNvZGUgXG4gICAgICAgIFRpbWVEYXRlUGlja2VyLmluaXQoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IHJlc3VsdC5zcGxpdChcIiBcIilbMV0gKyBcIi9cIiArIHJlc3VsdC5zcGxpdChcIiBcIilbMF0gKyBcIi9cIiArIHJlc3VsdC5zcGxpdChcIiBcIilbMl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGUgPSBmb3JtYXR0ZWREYXRlO1xuICAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgLy9Xb3JrYXJvdW5kIHRvIHJlZmxlY3QgZGF0ZSBjaGFuZ2VzXG4gICAgICAgIH0sIFwiU2VsZWN0IERhdGVcIiwgbnVsbCk7XG4gICAgICAgICovXG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xuICAgIH1cblxuXG4gICAgLyogTWVtYmVyIFNlbGVjdGlvbiAqL1xuXG4gICAgcHVibGljIHNlbGVjdE1lbWJlcihtZW1iZXIpIHtcbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkID0gZmFsc2UpO1xuICAgICAgICBtZW1iZXIuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSBtZW1iZXI7XG5cbiAgICAgICAgdGhpcy5kb2N0b3JzTGlzdCA9IFtdO1xuXG4gICAgICAgIC8vIEdFVCBBTEwgRE9DVE9SU1xuICAgICAgICBsZXQgZG9jdG9yc0RhdGEgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLmdldEFsbERvY3RvcnMoKTtcbiAgICAgICAgdGhpcy5kb2N0b3JzTGlzdCA9IGRvY3RvcnNEYXRhLmRvY3RvcnM7XG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgNDAwKTtcbiAgICAgICAgdGhpcy5zaG93RGVmYXVsdFNlYXJjaFZpZXcoKTsgICAgICAgXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlRmlsdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJXaW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93RGVmYXVsdFNlYXJjaFZpZXcoKTtcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3dXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZVdpbmRvdyhjdXN0b21XaW5kb3csIGR1cmF0aW9uKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG5cblxuXG5cblxuXG4gICAgcHVibGljIGdldFNlbGVjdGVkTWVtYmVyKGxvb2t1cExpc3QpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXMgPSBsb29rdXBMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uaXNTZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zWzBdO1xuICAgIH1cblxuXG5cbiAgICAvKiBUaHJlZSBkb3RzIG1lbnUgKi9cblxuICAgIHB1YmxpYyBzaG93T3B0aW9ucyhpbmRleCkge1xuICAgICAgICB0aGlzLmNhcmRJbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5pc0JvZHlUYXBwZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkNhcmRPcGVuSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZVRocmVlRG90c01lbnUoKSB7XG4gICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJzY3JvbGxpbmdcIjtcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IFwibm90IHNjcm9sbGluZ1wiO1xuICAgICAgICB9LCAzMDApOyAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VQb3BNZW51KCkge1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNCb2R5VGFwcGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FyZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBrZWVwT3BlbigpIHtcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSB0aGlzLkNhcmRPcGVuSW5kZXg7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLmlzQm9keVRhcHBlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogTUFQUyAqL1xuXG5cbiAgICBwdWJsaWMgbG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpIHtcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmxvY2F0ZUFkZHJlc3MoYWRkcmVzczEsIGNpdHksIHN0YXRlLCB6aXBjb2RlKTtcbiAgICB9XG5cblxuICAgIC8qIENBTEwgQU5EIEFERCBUTyBDT05UQUNUUyAqL1xuXG4gICAgcHVibGljIGNhbGxQaG9uZShwaG9uZU5vKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5jYWxsUGhvbmUocGhvbmVObyk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2F2ZUNvbnRhY3QoZG9jdG9yKSB7XG4gICAgICAgIHRoaXMuaGlkZVRocmVlRG90c01lbnUoKTtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICAgICAgICAvL2FuZHJvaWQgY29uZGl0aW9uXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX0NPTlRBQ1RTLCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5HRVRfQUNDT1VOVFNdLFxuICAgICAgICAgICAgICAgIFwiQXBwIE5lZWRzIFRoZSBGb2xsb3dpbmcgcGVybWlzc2lvbnNcIilcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShkb2N0b3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9QZXJtaXNzaW9uIERlbmllZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9pb3NcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShkb2N0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUFsbENvbnRhY3RJZHMoZG9jdG9yKSB7XG4gICAgICAgIHZhciBjb250YWN0RmllbGRzID0gWydwaG9uZU51bWJlcnMnXTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb250YWN0cy5nZXRDb250YWN0cyhjb250YWN0RmllbGRzKS50aGVuKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICBzZWxmLmNvbnRhY3RJZHMgPSBhcmdzO1xuICAgICAgICAgICAgc2VsZi5jaGVja0NvbnRhY3QoZG9jdG9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tDb250YWN0RXhpc3RzQW5kU2F2ZShkb2N0b3IpIHtcbiAgICAgICAgY29udGFjdEZvdW5kID0gbmV3IEFzeW5jU3ViamVjdDxEb2N0b3JNb2RlbD4oKTtcbiAgICAgICAgY29udGFjdEZvdW5kLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiQ29udGFjdCBBbHJlYWR5IEV4aXN0cyFcIiwgXCJsb25nZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbU1vZGVsOiBEb2N0b3JNb2RlbCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQ29udGFjdFRvQ29udGFjdExpc3QobU1vZGVsLm5hbWUsIG1Nb2RlbC5tb2JpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSxcbiAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdDb21wbGV0ZWQnKSk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUFsbENvbnRhY3RJZHMoZG9jdG9yKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjaGVja0NvbnRhY3QoZG9jdG9yKSB7XG4gICAgICAgIGxldCBkZXNpcmVkRmllbGRzID0gWydwaG9uZSddO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFjdElkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWN0IG9mIHRoaXMuY29udGFjdElkcykge1xuXG4gICAgICAgICAgICAgICAgY29udGFjdHMuZ2V0Q29udGFjdEJ5SWQoY29udGFjdC5jb250YWN0X2lkLCBkZXNpcmVkRmllbGRzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5waG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBob25lTnVtYmVyIG9mIHJlc3VsdC5waG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGhvbmVOdW1iZXIubnVtYmVyLnJlcGxhY2UoLyAvZywgXCJcIikgPT0gZG9jdG9yLm1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEZvdW5kLm5leHQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFnICYmIGluZGV4ID09IHRoaXMuY29udGFjdElkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RGb3VuZC5uZXh0KGRvY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Rm91bmQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7IGNvbnNvbGUuZGlyKGUpOyB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWN0Rm91bmQubmV4dChkb2N0b3IpO1xuICAgICAgICAgICAgY29udGFjdEZvdW5kLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZUNvbnRhY3RUb0NvbnRhY3RMaXN0KG5hbWUsIG1vYmlsZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG5ld0NvbnRhY3QgPSBuZXcgQ29udGFjdCgpO1xuICAgICAgICAgICAgbmV3Q29udGFjdC5uYW1lLmdpdmVuID0gbmFtZTtcbiAgICAgICAgICAgIC8vbmV3Q29udGFjdC5uYW1lLmZhbWlseSA9IFwiRG9lXCI7XG4gICAgICAgICAgICBuZXdDb250YWN0LnBob25lTnVtYmVycy5wdXNoKHsgbGFiZWw6IEtub3duTGFiZWwuSE9NRSwgdmFsdWU6IG1vYmlsZS50b1N0cmluZygpIH0pOyAvLyBTZWUgYmVsb3cgZm9yIGtub3duIGxhYmVsc1xuICAgICAgICAgICAgbmV3Q29udGFjdC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJDb250YWN0IEFkZGVkIFN1Y2Nlc3NmdWxseSFcIiwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJQbGVhc2UgZW5zdXJlIHRoYXQgeW91IGhhdmUgY29uZmlndXJlZCBhdGxlYXN0IG9uZSBhY2NvdW50IGluIHlvdXIgZGV2aWNlIGJlZm9yZSBhZGRpbmcgY29udGFjdHMuXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogRHJvcGRvd24gRnVuY3Rpb25zICovXG5cbiAgICBwdWJsaWMga2VlcERycE9wZW4oKSB7XG4gICAgICAgIHRoaXMuaXNEcnBTaG93ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJwQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmlzRHJwU2hvdyA9ICF0aGlzLmlzRHJwU2hvdztcbiAgICB9XG5cblxuICAgIHB1YmxpYyBtb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLl92Y1JlZlxuICAgIH07XG5cbiAgICBwdWJsaWMgc2hvd1Zpc2l0SGlzdG9yeShkb2N0b3IpIHtcbiAgICAgICAgdGhpcy5jYXJkSW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5fZG9jdG9yU2VydmljZS5zZWxlY3RlZE1lbWJlciA9IHRoaXMuZ2V0U2VsZWN0ZWRNZW1iZXIodGhpcy5tZW1iZXJMaXN0KTtcbiAgICAgICAgdGhpcy5fZG9jdG9yU2VydmljZS5zZWxlY3RlZERvY3RvciA9IGRvY3RvcjtcbiAgICAgICAgdGhpcy5fdmlzaXRIaXN0b3J5TW9kYWwuc2hvd01vZGFsKFZpZXdWaXNpdEhpc3RvcnlDb21wb25lbnQsIHRoaXMubW9kYWxPcHRpb25zKS50aGVuKHJlcyA9PiB7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIEFjdGl2aXR5IEluZGljYXRvciAqL1xuICAgIHB1YmxpYyBvbkJ1c3lDaGFuZ2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZWRcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dFeHBhbmRlZFNlYXJjaFZpZXcoKSB7IC8vIFNlYXJjaC1GaWx0ZXJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaEV4cGFuZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIHNob3dEZWZhdWx0U2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUFsbE92ZXJsYXlXaW5kb3coKXtcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5oaWRlVGhyZWVEb3RzTWVudSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5iYWNrKCk7ICBcbiAgICB9XG5cbiAgICAvKiBEQVRFIFNQSUtFICovXG4gICAgLypcbiAgICBNTUFSLTEzOTkgLSBTcGlrZSBzdG9yeSBjb2RlIFxuICAgIHB1YmxpYyBzaG93RGF0ZXBpY2tlcigpIHtcbiAgICAgICAgVGltZURhdGVQaWNrZXIuc2hvd0RhdGVQaWNrZXJEaWFsb2coKTtcbiAgICB9XG4gICAgKi9cbn0iXX0=