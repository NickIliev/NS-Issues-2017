"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var formValidation_service_1 = require("../../shared/services/formValidation.service");
var cards_service_1 = require("./cards.service");
var nativescript_printer_1 = require("nativescript-printer");
var platform_1 = require("platform");
var page_1 = require("ui/page");
var global_1 = require("../../shared/global");
var cardDetail_component_1 = require("./cardDetail/cardDetail.component");
var drawer_service_1 = require("../../shared/services/drawer.service");
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var email = require("nativescript-email");
var app = require("tns-core-modules/application");
var plugin = require("nativescript-screenshot");
var CardsComponent = CardsComponent_1 = (function () {
    function CardsComponent(router, _cardService, _globals, _routerExtensions, _eref, page, vcRef, drawerService, modalParams, _formValidationService) {
        this.router = router;
        this._cardService = _cardService;
        this._globals = _globals;
        this._routerExtensions = _routerExtensions;
        this._eref = _eref;
        this.page = page;
        this.vcRef = vcRef;
        this.drawerService = drawerService;
        this.modalParams = modalParams;
        this._formValidationService = _formValidationService;
        this.title = "My Cards";
        this.isBodyTapped = false;
        this.showMoreOptions = false; // prashuk
        this.isEmailClicked = false; // prashuk
        this.invalidEmailLbl = false; // prashuk
        this.isEmailSent = false;
        this.isFileDownloaded = false;
        this.memberList = [];
        this.imgSrc = null;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.pageStartTime = new Date().getTime();
        this.printer = new nativescript_printer_1.Printer();
    }
    CardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        // let memberData = this._cardService.getAllMembers();
        // for (let member of memberData) {
        //   this.memberList.push(new MemberListModel(member.firstName,member.lastName,member.memberId,member.frontCardSrc,member.backCardSrc,member.type,member.isSelected));
        // }
        this.memberList = this._cardService.getAllMembers();
        this.setMemebersDisplayName();
        this.memberList.map(function (item) {
            if (item.isSelected) {
                // this.selectedMemberName = item.name;
                _this.selectedMemberId = item.memberId;
                _this.selectedMember = item;
            }
        });
    };
    CardsComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    // back button
    CardsComponent.prototype.goBack = function () {
        this.showMoreOptions = false;
        this._routerExtensions.back();
    };
    CardsComponent.prototype.sendClientEmail = function () {
        var _this = this;
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
                    mimeType: "image/png"
                }
            ],
        };
        email.available().then(function (available) {
            if (available) {
                email.compose(_this.composeOptions).then(function (result) {
                    if (result) {
                        _this.showMoreOptions = false;
                        // this._globals.showToastMessage("email was sent", "longer");
                    }
                    else {
                        _this.showMoreOptions = false;
                        // this._globals.showToastMessage("configure your email", "longer");
                    }
                }).catch(function (error) {
                    _this.showMoreOptions = false;
                    _this._globals.showToastMessage("configure your email", "longer");
                });
            }
            else {
                _this.showMoreOptions = false;
                _this._globals.showToastMessage("configure your email", "longer");
            }
        }).catch(function (error) {
            _this.showMoreOptions = false;
            _this._globals.showToastMessage("configure your email", "longer");
        });
    };
    CardsComponent.prototype.showOptions = function (memid) {
        this.showMoreOptions = true;
        this.isBodyTapped = false;
    };
    CardsComponent.prototype.toggleFilter = function () {
        if (this.filterWindow.nativeElement.style.visibility == "visible") {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showMoreOptions = false;
            this.showWindow(this.filterWindow, 0);
        }
    };
    CardsComponent.prototype.showWindow = function (customWindow, duration) {
        this.cardsView.nativeElement.isUserInteractionEnabled = false;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = "visible";
        }, duration);
    };
    CardsComponent.prototype.hideWindow = function (customWindow, duration) {
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = "hidden";
        }, duration);
    };
    CardsComponent.prototype.hideAllOverlayMenu = function () {
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        this.hideWindow(this.filterWindow, 0);
    };
    CardsComponent.prototype.bodyTap = function () {
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
    };
    CardsComponent.prototype.keepOpen = function () {
        this.showMoreOptions = true;
    };
    CardsComponent.prototype.planNavigate = function () {
        this._routerExtensions.navigate(["/myPlan"], {
            animated: false
        });
        this.showMoreOptions = false;
        this.isEmailClicked = false;
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
    };
    CardsComponent.prototype.getSubscriber = function () {
        var subscriber;
        this.memberList.map(function (item) {
            if (item.type === "Subscriber") {
                subscriber = item.firstName;
            }
        });
        return subscriber;
    };
    CardsComponent.prototype.setMemebersDisplayName = function () {
        var _this = this;
        this.MemebersDisplayName = this.memberList;
        this.MemebersDisplayName.map(function (item) {
            item.type === "Subscriber" ? item.isSelected = true : item.isSelected = false;
            if (_this.getSubscriber() === item.firstName) {
                item.displayName = item.firstName + " " + item.lastName + " (" + item.type + ")";
            }
            else {
                item.displayName = item.firstName + " " + item.lastName;
            }
        });
    };
    CardsComponent.prototype.printImage = function () {
        var _this = this;
        this.showMoreOptions = false;
        this.printer.isSupported().then(function (supported) {
            // console.log("supported? " + supported);
            // this.showToastMessage("Printing inprogress ...", "longer");
            // let appPath = fs.knownFolders.currentApp().path;
            // let currentImage= this.currentFrontCardSrc;
            // let currentImage = "~/dummyData/medicalcards.PNG";
            // currentImage = currentImage.substr(1);
            // let imgPath = appPath + currentImage;
            // let imgSrc = new ImageSource();
            // imgSrc.loadFromFile(imgPath);
            _this.imgSrc = plugin.getImage(_this.idCardView.nativeElement);
            _this.printer.printImage({
                imageSrc: _this.imgSrc
            }).then(function (success) {
                CardsComponent_1.feedback(success);
            }, function (error) {
                console.log("Error: " + error);
            });
        }, function (error) {
            console.log("Error: " + error);
            _this._globals.showToastMessage("Printer Not supported !!", "longer");
        });
    };
    CardsComponent.feedback = function (success) {
        // on Android there's no way to know whether or not printing succeeded
        if (!platform_1.isAndroid) {
            alert(success ? "Printed!" : "Not printed");
        }
    };
    CardsComponent.prototype.sendEmail = function (emailid) {
        this.isEmailClicked = true;
        this.showMoreOptions = false;
    };
    CardsComponent.prototype.successMsg = function (emailid) {
        this.isEmailValid = this._formValidationService.emailMatchValidator(emailid);
        if (emailid !== undefined && emailid !== "" && this.isEmailValid) {
            this.isEmailClicked = false;
            this.isEmailSent = true;
            this.emailid = "";
        }
        else {
            this.isEmailClicked = true;
            this.invalidEmailLbl = true;
        }
    };
    CardsComponent.prototype.cancelBtn = function () {
        this.isEmailClicked = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
    };
    CardsComponent.prototype.okBtn = function () {
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
    };
    // prashuk
    CardsComponent.prototype.drpChange = function () {
        // this.isDrpShow = !this.isDrpShow;
        this.isEmailClicked = false;
        this.isEmailSent = false;
        this.invalidEmailLbl = false;
        this.emailid = "";
        this.showMoreOptions = false;
    };
    // public keepDrpOpen() {
    //     this.isDrpShow = true;
    // }
    CardsComponent.prototype.selectMember = function (member) {
        this.memberList.map(function (item) { return item.isSelected = false; });
        // this.selectedMemberName = member.name;
        this.showMoreOptions = false;
        member.isSelected = true;
        this.selectedMember = member;
        this.selectedMemberId = member.memberId;
        // this.isDrpShow = false;
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        // this.filterWindow.nativeElement.style.visibility = 'hidden';
        this.hideWindow(this.filterWindow, 400);
    };
    CardsComponent.prototype.getSelectedMember = function (lookupList) {
        var filteredItems = lookupList.filter(function (item) { return item.isSelected === true; });
        return filteredItems[0];
    };
    CardsComponent.prototype.onScroll = function (args) {
        // this.status = "scrolling";
        this.showMoreOptions = false;
        // this.isDrpShow = false;
        // this.filterWindow.nativeElement.style.visibility = 'hidden';
        this.hideWindow(this.filterWindow, 400);
        setTimeout(function () {
            // this.status = "not scrolling";
        }, 300);
    };
    CardsComponent.prototype.containerTap = function () {
        this.showMoreOptions = false;
        this.showCardDetails();
        this._globals.iscardSecondSlider = false;
        this.hideWindow(this.filterWindow, 0);
    };
    CardsComponent.prototype.containerBackTap = function () {
        this.showMoreOptions = false;
        this.showCardDetails();
        this._globals.iscardSecondSlider = true;
        this.hideWindow(this.filterWindow, 0);
    };
    CardsComponent.prototype.saveImage = function () {
        var _this = this;
        this.drpChange();
        var appPath = fs.knownFolders.currentApp().path;
        var imageName = this.selectedMember.firstName + this.selectedMember.lastName + ".png";
        this.imgSrc = plugin.getImage(this.idCardView.nativeElement);
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.WRITE_EXTERNAL_STORAGE], "App Needs The Following permissions")
                .then(function () {
                _this._globals.showToastMessage("Download inprogess..", "longer");
                var androidDownloadsPath = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath(), imageName);
                _this.imgSrc.saveToFile(androidDownloadsPath, "png");
                _this._globals.showToastMessage("Download Completed !!", "longer");
            })
                .catch(function () {
                // permission Denied
                _this._globals.showToastMessage("Download Failed !!", "longer");
            });
        }
        else {
            var res = false;
            if (!this.imgSrc) {
                return res;
            }
            var result_1 = true;
            this._globals.showToastMessage("Download inprogess..", "longer");
            var CompletionTarget = NSObject.extend({
                "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": function (image, error, context) {
                    if (error) {
                        result_1 = false;
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
            var completionTarget = CompletionTarget.new();
            UIImageWriteToSavedPhotosAlbum(this.imgSrc.ios, completionTarget, "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:", null);
            if (result_1)
                this._globals.showToastMessage("Download Completed !!", "longer");
            else
                this._globals.showToastMessage("Download Failed !!", "longer");
        }
    };
    CardsComponent.prototype.showCardDetails = function () {
        this._globals.iscardslider = true;
        this.drawerService.enableGesture(false);
        this._cardService.selectedMember = this.selectedMember;
        if (this._cardService.isCardsPopUp) {
            this._cardService.isCardsPopUp = false;
            var modalOptions = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            this.modalParams.showModal(cardDetail_component_1.CardDetailComponent, modalOptions).then(function (res) {
            });
        }
    };
    return CardsComponent;
}());
__decorate([
    core_1.ViewChild("idCardView"),
    __metadata("design:type", core_1.ElementRef)
], CardsComponent.prototype, "idCardView", void 0);
__decorate([
    core_1.ViewChild("idCardViewPrint"),
    __metadata("design:type", core_1.ElementRef)
], CardsComponent.prototype, "idCardViewPrint", void 0);
__decorate([
    core_1.ViewChild('filterWindow'),
    __metadata("design:type", Object)
], CardsComponent.prototype, "filterWindow", void 0);
__decorate([
    core_1.ViewChild('cardsView'),
    __metadata("design:type", Object)
], CardsComponent.prototype, "cardsView", void 0);
CardsComponent = CardsComponent_1 = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./cards.component.html",
        styleUrls: ["./cards.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        cards_service_1.CardsService,
        global_1.Globals,
        router_2.RouterExtensions,
        core_1.ElementRef,
        page_1.Page,
        core_1.ViewContainerRef,
        drawer_service_1.DrawerService,
        dialogs_1.ModalDialogService,
        formValidation_service_1.FormValidationService])
], CardsComponent);
exports.CardsComponent = CardsComponent;
var CardsComponent_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9IO0FBRXBILDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLHVGQUFxRjtBQUVyRixpREFBK0M7QUFFL0MsNkRBQStDO0FBRS9DLHFDQUFxQztBQUNyQyxnQ0FBK0I7QUFLL0IsOENBQThDO0FBQzlDLDBFQUF3RTtBQUN4RSx1RUFBcUU7QUFFckUsZ0NBQWtDO0FBR2xDLHNEQUF3RDtBQUN4RCwwQ0FBNEM7QUFFNUMsa0RBQW9EO0FBRXBELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBWWhELElBQWEsY0FBYztJQXlCdkIsd0JBQTJCLE1BQWMsRUFDN0IsWUFBMEIsRUFDM0IsUUFBaUIsRUFDaEIsaUJBQW1DLEVBQ25DLEtBQWlCLEVBQ2pCLElBQVUsRUFDVixLQUF1QixFQUN2QixhQUE0QixFQUM1QixXQUErQixFQUMvQixzQkFBNkM7UUFUOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFoQ3pELFVBQUssR0FBVyxVQUFVLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDdkIsb0JBQWUsR0FBWSxLQUFLLENBQUMsQ0FBQyxVQUFVO1FBQzVDLG1CQUFjLEdBQVksS0FB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QUNsQjtJQUE3QixnQkFBUyxDQUFDLGlCQUFpQixDQUFDOzhCQUFrQixpQkFBVTt1REFBQztBQUMvQjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7b0RBQWM7QUFDaEI7SUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7O2lEQUFXO0FBM0N6QixjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDN0IsQ0FBQztxQ0EwQnFDLGVBQU07UUFDZiw0QkFBWTtRQUNqQixnQkFBTztRQUNHLHlCQUFnQjtRQUM1QixpQkFBVTtRQUNYLFdBQUk7UUFDSCx1QkFBZ0I7UUFDUiw4QkFBYTtRQUNmLDRCQUFrQjtRQUNQLDhDQUFxQjtHQWxDaEQsY0FBYyxDQW9aMUI7QUFwWlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBOZ01vZHVsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xuaW1wb3J0IHsgQ2FyZHNTZXJ2aWNlIH0gZnJvbSBcIi4vY2FyZHMuc2VydmljZVwiO1xuaW1wb3J0IHsgTWVtYmVyTGlzdE1vZGVsIH0gZnJvbSBcIi4vbWVtYmVyTGlzdC5tb2RlbFwiO1xuaW1wb3J0IHsgUHJpbnRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJpbnRlclwiO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRmlsZSwga25vd25Gb2xkZXJzIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgeyBnZXRJbWFnZSB9IGZyb20gXCJodHRwXCI7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBDYXJkRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyZERldGFpbC9jYXJkRGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgdXRpbE1vZHVsZSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0ICogYXMgZW1haWwgZnJvbSBcIm5hdGl2ZXNjcmlwdC1lbWFpbFwiO1xuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxubGV0IHBsdWdpbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc2NyZWVuc2hvdFwiKTtcblxuXG5cbmRlY2xhcmUgbGV0IGFuZHJvaWQ7XG5kZWNsYXJlIGxldCBOU09iamVjdDtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NhcmRzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2NhcmRzLmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIHB1YmxpYyBidXN5OiBib29sZWFuO1xuICAgIHRpdGxlOiBzdHJpbmcgPSBcIk15IENhcmRzXCI7XG4gICAgaXNCb2R5VGFwcGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHNob3dNb3JlT3B0aW9uczogYm9vbGVhbiA9IGZhbHNlOyAvLyBwcmFzaHVrXG4gICAgcHVibGljIGlzRW1haWxDbGlja2VkOiBib29sZWFuID0gZmFsc2U7IC8vIHByYXNodWtcbiAgICBwdWJsaWMgZW1haWxpZDogc3RyaW5nOyAvLyBwcmFzaHVrXG4gICAgcHVibGljIGlzRW1haWxWYWxpZDogYm9vbGVhbjsgLy8gcHJhc2h1a1xuICAgIHB1YmxpYyBpbnZhbGlkRW1haWxMYmw6IGJvb2xlYW4gPSBmYWxzZTsgLy8gcHJhc2h1a1xuICAgIHB1YmxpYyBpc0VtYWlsU2VudDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc0ZpbGVEb3dubG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29tcG9zZU9wdGlvbnM6IGVtYWlsLkNvbXBvc2VPcHRpb25zO1xuICAgIC8vIGlzRHJwU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBwcmludGVyOiBQcmludGVyO1xuICAgIC8vIHNlbGVjdGVkTWVtYmVyTmFtZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkTWVtYmVySWQ6IHN0cmluZztcbiAgICBtZW1iZXJMaXN0OiBNZW1iZXJMaXN0TW9kZWxbXSA9IFtdO1xuICAgIHNlbGVjdGVkTWVtYmVyOiBNZW1iZXJMaXN0TW9kZWw7XG4gICAgTWVtZWJlcnNEaXNwbGF5TmFtZTogYW55W107XG4gICAgaW1nU3JjOiBJbWFnZVNvdXJjZSA9IG51bGw7XG4gICAgZW1haWxQYXRoOiBhbnk7XG4gICAgcGFnZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgICBwYWdlRW5kVGltZTogbnVtYmVyID0gMDtcbiAgICBwYWdlVGltZURpZmZlcmVuY2U6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfY2FyZFNlcnZpY2U6IENhcmRzU2VydmljZSxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF9lcmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyU2VydmljZTogRHJhd2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSkge1xuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5wcmludGVyID0gbmV3IFByaW50ZXIoKTtcblxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJpZENhcmRWaWV3XCIpIGlkQ2FyZFZpZXc6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImlkQ2FyZFZpZXdQcmludFwiKSBpZENhcmRWaWV3UHJpbnQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyV2luZG93JykgZmlsdGVyV2luZG93O1xuICAgIEBWaWV3Q2hpbGQoJ2NhcmRzVmlldycpIGNhcmRzVmlldztcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxldCBtZW1iZXJEYXRhID0gdGhpcy5fY2FyZFNlcnZpY2UuZ2V0QWxsTWVtYmVycygpO1xuICAgICAgICAvLyBmb3IgKGxldCBtZW1iZXIgb2YgbWVtYmVyRGF0YSkge1xuICAgICAgICAvLyAgIHRoaXMubWVtYmVyTGlzdC5wdXNoKG5ldyBNZW1iZXJMaXN0TW9kZWwobWVtYmVyLmZpcnN0TmFtZSxtZW1iZXIubGFzdE5hbWUsbWVtYmVyLm1lbWJlcklkLG1lbWJlci5mcm9udENhcmRTcmMsbWVtYmVyLmJhY2tDYXJkU3JjLG1lbWJlci50eXBlLG1lbWJlci5pc1NlbGVjdGVkKSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gdGhpcy5fY2FyZFNlcnZpY2UuZ2V0QWxsTWVtYmVycygpO1xuICAgICAgICB0aGlzLnNldE1lbWViZXJzRGlzcGxheU5hbWUoKTtcbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRNZW1iZXJOYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXJJZCA9IGl0ZW0ubWVtYmVySWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xuICAgIH1cblxuXG4gICAgLy8gYmFjayBidXR0b25cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbiAgICBzZW5kQ2xpZW50RW1haWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nU3JjID0gcGx1Z2luLmdldEltYWdlKHRoaXMuaWRDYXJkVmlldy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5lbWFpbFBhdGggPSAnYmFzZTY0Oi8vJyArIHRoaXMuaW1nU3JjLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIpO1xuICAgICAgICB0aGlzLmNvbXBvc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgLy90bzogWydqYWlzaGFua2FyLmJAY29nbml6YW50LmNvbSddLFxuICAgICAgICAgICAgLyogc3ViamVjdDogXCJZb1wiLFxuICAgICAgICAgICAgYm9keTogXCJIZWxsbyA8c3Ryb25nPmR1ZGU8L3N0cm9uZz4gOilcIixcbiAgICAgICAgICAgIHRvOiBbJ2VkZHl2ZXJicnVnZ2VuQGdtYWlsLmNvbScsICd0b0BwZXJzb24yLmNvbSddLFxuICAgICAgICAgICAgY2M6IFsnY2NwZXJzb25Ac29tZXdoZXJlLmNvbSddLFxuICAgICAgICAgICAgYmNjOiBbJ2VkZHlAY29tYmlkZXNrLmNvbScsICdlZGR5QHgtc2VydmljZXMubmwnXSwgKi9cbiAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ0JsdWUucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogdGhpcy5lbWFpbFBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG1pbWVUeXBlOiBcImltYWdlL3BuZ1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgfVxuICAgICAgICBlbWFpbC5hdmFpbGFibGUoKS50aGVuKGF2YWlsYWJsZSA9PiB7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZW1haWwuY29tcG9zZSh0aGlzLmNvbXBvc2VPcHRpb25zKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJlbWFpbCB3YXMgc2VudFwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJjb25maWd1cmUgeW91ciBlbWFpbFwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiY29uZmlndXJlIHlvdXIgZW1haWxcIiwgXCJsb25nZXJcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcImNvbmZpZ3VyZSB5b3VyIGVtYWlsXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiY29uZmlndXJlIHlvdXIgZW1haWxcIiwgXCJsb25nZXJcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93T3B0aW9ucyhtZW1pZCkge1xuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUZpbHRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9PSBcInZpc2libGVcIikge1xuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1dpbmRvdyhjdXN0b21XaW5kb3csIGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuY2FyZHNWaWV3Lm5hdGl2ZUVsZW1lbnQuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xuICAgICAgICB0aGlzLmNhcmRzVmlldy5uYXRpdmVFbGVtZW50LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gICAgcHVibGljIGhpZGVBbGxPdmVybGF5TWVudSgpIHtcbiAgICAgICAgdGhpcy5jYXJkc1ZpZXcubmF0aXZlRWxlbWVudC5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgIH1cbiAgICBwdWJsaWMgYm9keVRhcCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQm9keVRhcHBlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0JvZHlUYXBwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBrZWVwT3BlbigpIHtcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGFuTmF2aWdhdGUoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL215UGxhblwiXSwge1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRW1haWxDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNFbWFpbFNlbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWFpbGlkID0gXCJcIjtcbiAgICB9XG4gICAgcHVibGljIGdldFN1YnNjcmliZXIoKSB7XG4gICAgICAgIGxldCBzdWJzY3JpYmVyOiBzdHJpbmc7XG4gICAgICAgIHRoaXMubWVtYmVyTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IFwiU3Vic2NyaWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlciA9IGl0ZW0uZmlyc3ROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRNZW1lYmVyc0Rpc3BsYXlOYW1lKCkge1xuICAgICAgICB0aGlzLk1lbWViZXJzRGlzcGxheU5hbWUgPSB0aGlzLm1lbWJlckxpc3Q7XG4gICAgICAgIHRoaXMuTWVtZWJlcnNEaXNwbGF5TmFtZS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0udHlwZSA9PT0gXCJTdWJzY3JpYmVyXCIgPyBpdGVtLmlzU2VsZWN0ZWQgPSB0cnVlIDogaXRlbS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRTdWJzY3JpYmVyKCkgPT09IGl0ZW0uZmlyc3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kaXNwbGF5TmFtZSA9IGl0ZW0uZmlyc3ROYW1lICsgXCIgXCIgKyBpdGVtLmxhc3ROYW1lICsgXCIgKFwiICsgaXRlbS50eXBlICsgXCIpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmRpc3BsYXlOYW1lID0gaXRlbS5maXJzdE5hbWUgKyBcIiBcIiArIGl0ZW0ubGFzdE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnRJbWFnZSgpIHtcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmludGVyLmlzU3VwcG9ydGVkKCkudGhlbigoc3VwcG9ydGVkKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN1cHBvcnRlZD8gXCIgKyBzdXBwb3J0ZWQpO1xuICAgICAgICAgICAgLy8gdGhpcy5zaG93VG9hc3RNZXNzYWdlKFwiUHJpbnRpbmcgaW5wcm9ncmVzcyAuLi5cIiwgXCJsb25nZXJcIik7XG4gICAgICAgICAgICAvLyBsZXQgYXBwUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcbiAgICAgICAgICAgIC8vIGxldCBjdXJyZW50SW1hZ2U9IHRoaXMuY3VycmVudEZyb250Q2FyZFNyYztcbiAgICAgICAgICAgIC8vIGxldCBjdXJyZW50SW1hZ2UgPSBcIn4vZHVtbXlEYXRhL21lZGljYWxjYXJkcy5QTkdcIjtcbiAgICAgICAgICAgIC8vIGN1cnJlbnRJbWFnZSA9IGN1cnJlbnRJbWFnZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAvLyBsZXQgaW1nUGF0aCA9IGFwcFBhdGggKyBjdXJyZW50SW1hZ2U7XG4gICAgICAgICAgICAvLyBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XG4gICAgICAgICAgICAvLyBpbWdTcmMubG9hZEZyb21GaWxlKGltZ1BhdGgpO1xuICAgICAgICAgICAgdGhpcy5pbWdTcmMgPSBwbHVnaW4uZ2V0SW1hZ2UodGhpcy5pZENhcmRWaWV3Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5wcmludGVyLnByaW50SW1hZ2Uoe1xuICAgICAgICAgICAgICAgIGltYWdlU3JjOiB0aGlzLmltZ1NyY1xuICAgICAgICAgICAgfSkudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgIENhcmRzQ29tcG9uZW50LmZlZWRiYWNrKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIlByaW50ZXIgTm90IHN1cHBvcnRlZCAhIVwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZmVlZGJhY2soc3VjY2VzczogYm9vbGVhbikge1xuICAgICAgICAvLyBvbiBBbmRyb2lkIHRoZXJlJ3Mgbm8gd2F5IHRvIGtub3cgd2hldGhlciBvciBub3QgcHJpbnRpbmcgc3VjY2VlZGVkXG4gICAgICAgIGlmICghaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBhbGVydChzdWNjZXNzID8gXCJQcmludGVkIVwiIDogXCJOb3QgcHJpbnRlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kRW1haWwoZW1haWxpZCkge1xuICAgICAgICB0aGlzLmlzRW1haWxDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VjY2Vzc01zZyhlbWFpbGlkKSB7XG4gICAgICAgIHRoaXMuaXNFbWFpbFZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoZW1haWxpZCk7XG4gICAgICAgIGlmIChlbWFpbGlkICE9PSB1bmRlZmluZWQgJiYgZW1haWxpZCAhPT0gXCJcIiAmJiB0aGlzLmlzRW1haWxWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0VtYWlsU2VudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVtYWlsaWQgPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRFbWFpbExibCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuY2VsQnRuKCkge1xuICAgICAgICB0aGlzLmlzRW1haWxDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW52YWxpZEVtYWlsTGJsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1haWxpZCA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIG9rQnRuKCkge1xuICAgICAgICB0aGlzLmlzRW1haWxTZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW52YWxpZEVtYWlsTGJsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gcHJhc2h1a1xuXG5cbiAgICBwdWJsaWMgZHJwQ2hhbmdlKCkge1xuICAgICAgICAvLyB0aGlzLmlzRHJwU2hvdyA9ICF0aGlzLmlzRHJwU2hvdztcbiAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRW1haWxTZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW52YWxpZEVtYWlsTGJsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1haWxpZCA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIHB1YmxpYyBrZWVwRHJwT3BlbigpIHtcbiAgICAvLyAgICAgdGhpcy5pc0RycFNob3cgPSB0cnVlO1xuICAgIC8vIH1cbiAgICBwdWJsaWMgc2VsZWN0TWVtYmVyKG1lbWJlcikge1xuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRNZW1iZXJOYW1lID0gbWVtYmVyLm5hbWU7XG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgIG1lbWJlci5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IG1lbWJlcjtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlcklkID0gbWVtYmVyLm1lbWJlcklkO1xuICAgICAgICAvLyB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhcmRzVmlldy5uYXRpdmVFbGVtZW50LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDQwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlbGVjdGVkTWVtYmVyKGxvb2t1cExpc3QpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXMgPSBsb29rdXBMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uaXNTZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zWzBdO1xuICAgIH1cbiAgICBwdWJsaWMgb25TY3JvbGwoYXJnczogU2Nyb2xsRXZlbnREYXRhKSB7XG4gICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJzY3JvbGxpbmdcIjtcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5maWx0ZXJXaW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgNDAwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IFwibm90IHNjcm9sbGluZ1wiO1xuICAgICAgICB9LCAzMDApO1xuXG4gICAgfVxuICAgIHB1YmxpYyBjb250YWluZXJUYXAoKSB7XG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0NhcmREZXRhaWxzKCk7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNjYXJkU2Vjb25kU2xpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgY29udGFpbmVyQmFja1RhcCgpIHtcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93Q2FyZERldGFpbHMoKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc2NhcmRTZWNvbmRTbGlkZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlSW1hZ2UoKSB7XG4gICAgICAgIHRoaXMuZHJwQ2hhbmdlKCk7XG4gICAgICAgIGxldCBhcHBQYXRoID0gZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5wYXRoO1xuICAgICAgICBsZXQgaW1hZ2VOYW1lID0gdGhpcy5zZWxlY3RlZE1lbWJlci5maXJzdE5hbWUgKyB0aGlzLnNlbGVjdGVkTWVtYmVyLmxhc3ROYW1lICsgXCIucG5nXCI7XG4gICAgICAgIHRoaXMuaW1nU3JjID0gcGx1Z2luLmdldEltYWdlKHRoaXMuaWRDYXJkVmlldy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICAgICAgICAvLyBhbmRyb2lkIGNvbmRpdGlvblxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfRVhURVJOQUxfU1RPUkFHRV0sXG4gICAgICAgICAgICAgICAgXCJBcHAgTmVlZHMgVGhlIEZvbGxvd2luZyBwZXJtaXNzaW9uc1wiKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiRG93bmxvYWQgaW5wcm9nZXNzLi5cIiwgXCJsb25nZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmRyb2lkRG93bmxvYWRzUGF0aCA9IGZzLnBhdGguam9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlUHVibGljRGlyZWN0b3J5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUykuZ2V0QWJzb2x1dGVQYXRoKCksIGltYWdlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWdTcmMuc2F2ZVRvRmlsZShhbmRyb2lkRG93bmxvYWRzUGF0aCwgXCJwbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIkRvd25sb2FkIENvbXBsZXRlZCAhIVwiLCBcImxvbmdlclwiKTtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVybWlzc2lvbiBEZW5pZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiRG93bmxvYWQgRmFpbGVkICEhXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmltZ1NyYykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIkRvd25sb2FkIGlucHJvZ2Vzcy4uXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICAgICAgbGV0IENvbXBsZXRpb25UYXJnZXQgPSBOU09iamVjdC5leHRlbmQoe1xuICAgICAgICAgICAgICAgIFwidGhpc0ltYWdlOmhhc0JlZW5TYXZlZEluUGhvdG9BbGJ1bVdpdGhFcnJvcjp1c2luZ0NvbnRleHRJbmZvOlwiOiBmdW5jdGlvbiAoXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLCBlcnJvciwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBleHBvc2VkTWV0aG9kczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlzSW1hZ2U6aGFzQmVlblNhdmVkSW5QaG90b0FsYnVtV2l0aEVycm9yOnVzaW5nQ29udGV4dEluZm86XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zOiBpbnRlcm9wLnR5cGVzLnZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBbVUlJbWFnZSwgTlNFcnJvciwgaW50ZXJvcC5Qb2ludGVyXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgY29tcGxldGlvblRhcmdldCA9IENvbXBsZXRpb25UYXJnZXQubmV3KCk7XG4gICAgICAgICAgICBVSUltYWdlV3JpdGVUb1NhdmVkUGhvdG9zQWxidW0odGhpcy5pbWdTcmMuaW9zLCBjb21wbGV0aW9uVGFyZ2V0LFxuICAgICAgICAgICAgICAgIFwidGhpc0ltYWdlOmhhc0JlZW5TYXZlZEluUGhvdG9BbGJ1bVdpdGhFcnJvcjp1c2luZ0NvbnRleHRJbmZvOlwiLFxuICAgICAgICAgICAgICAgIG51bGwpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJEb3dubG9hZCBDb21wbGV0ZWQgISFcIiwgXCJsb25nZXJcIik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiRG93bmxvYWQgRmFpbGVkICEhXCIsIFwibG9uZ2VyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0NhcmREZXRhaWxzKCkge1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzY2FyZHNsaWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhd2VyU2VydmljZS5lbmFibGVHZXN0dXJlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fY2FyZFNlcnZpY2Uuc2VsZWN0ZWRNZW1iZXIgPSB0aGlzLnNlbGVjdGVkTWVtYmVyO1xuICAgICAgICBpZiAodGhpcy5fY2FyZFNlcnZpY2UuaXNDYXJkc1BvcFVwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYXJkU2VydmljZS5pc0NhcmRzUG9wVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBtb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb2RhbFBhcmFtcy5zaG93TW9kYWwoQ2FyZERldGFpbENvbXBvbmVudCwgbW9kYWxPcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=