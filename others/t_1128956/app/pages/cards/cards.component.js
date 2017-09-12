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
                    mimeType: 'image/png'
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
                        //this._globals.showToastMessage("configure your email", "longer");
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
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
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
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    };
    CardsComponent.prototype.hideWindow = function (customWindow, duration) {
        this.cardsView.nativeElement.isUserInteractionEnabled = true;
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9IO0FBRXBILDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLHVGQUFxRjtBQUVyRixpREFBK0M7QUFFL0MsNkRBQStDO0FBRS9DLHFDQUFxQztBQUNyQyxnQ0FBK0I7QUFLL0IsOENBQThDO0FBQzlDLDBFQUF3RTtBQUN4RSx1RUFBcUU7QUFFckUsZ0NBQWtDO0FBR2xDLHNEQUF3RDtBQUN4RCwwQ0FBNEM7QUFFNUMsa0RBQW9EO0FBRXBELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBWWhELElBQWEsY0FBYztJQXlCdkIsd0JBQTJCLE1BQWMsRUFDN0IsWUFBMEIsRUFDM0IsUUFBaUIsRUFDaEIsaUJBQW1DLEVBQ25DLEtBQWlCLEVBQ2pCLElBQVUsRUFDVixLQUF1QixFQUN2QixhQUE0QixFQUM1QixXQUErQixFQUMvQixzQkFBNkM7UUFUOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFoQ3pELFVBQUssR0FBVyxVQUFVLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDdkIsb0JBQWUsR0FBWSxLQUFLLENBQUMsQ0FBQyxVQUFVO1FBQzVDLG1CQUFjLEdBQVksS0FB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QUNsQjtJQUE3QixnQkFBUyxDQUFDLGlCQUFpQixDQUFDOzhCQUFrQixpQkFBVTt1REFBQztBQUMvQjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7b0RBQWM7QUFDaEI7SUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7O2lEQUFXO0FBM0N6QixjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDN0IsQ0FBQztxQ0EwQnFDLGVBQU07UUFDZiw0QkFBWTtRQUNqQixnQkFBTztRQUNHLHlCQUFnQjtRQUM1QixpQkFBVTtRQUNYLFdBQUk7UUFDSCx1QkFBZ0I7UUFDUiw4QkFBYTtRQUNmLDRCQUFrQjtRQUNQLDhDQUFxQjtHQWxDaEQsY0FBYyxDQW9aMUI7QUFwWlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBOZ01vZHVsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IENhcmRzU2VydmljZSB9IGZyb20gXCIuL2NhcmRzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWVtYmVyTGlzdE1vZGVsIH0gZnJvbSBcIi4vbWVtYmVyTGlzdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBQcmludGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcmludGVyXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgRmlsZSwga25vd25Gb2xkZXJzIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IGdldEltYWdlIH0gZnJvbSBcImh0dHBcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IENhcmREZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9jYXJkRGV0YWlsL2NhcmREZXRhaWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIHV0aWxNb2R1bGUgZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCJ1aS9lbnVtc1wiO1xyXG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XHJcbmltcG9ydCAqIGFzIGVtYWlsIGZyb20gXCJuYXRpdmVzY3JpcHQtZW1haWxcIjtcclxuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxubGV0IHBsdWdpbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc2NyZWVuc2hvdFwiKTtcclxuXHJcblxyXG5cclxuZGVjbGFyZSBsZXQgYW5kcm9pZDtcclxuZGVjbGFyZSBsZXQgTlNPYmplY3Q7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NhcmRzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vY2FyZHMuY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgcHVibGljIGJ1c3k6IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nID0gXCJNeSBDYXJkc1wiO1xyXG4gICAgaXNCb2R5VGFwcGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2hvd01vcmVPcHRpb25zOiBib29sZWFuID0gZmFsc2U7IC8vIHByYXNodWtcclxuICAgIHB1YmxpYyBpc0VtYWlsQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlOyAvLyBwcmFzaHVrXHJcbiAgICBwdWJsaWMgZW1haWxpZDogc3RyaW5nOyAvLyBwcmFzaHVrXHJcbiAgICBwdWJsaWMgaXNFbWFpbFZhbGlkOiBib29sZWFuOyAvLyBwcmFzaHVrXHJcbiAgICBwdWJsaWMgaW52YWxpZEVtYWlsTGJsOiBib29sZWFuID0gZmFsc2U7IC8vIHByYXNodWtcclxuICAgIHB1YmxpYyBpc0VtYWlsU2VudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzRmlsZURvd25sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvbXBvc2VPcHRpb25zOiBlbWFpbC5Db21wb3NlT3B0aW9ucztcclxuICAgIC8vIGlzRHJwU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHByaW50ZXI6IFByaW50ZXI7XHJcbiAgICAvLyBzZWxlY3RlZE1lbWJlck5hbWU6IHN0cmluZztcclxuICAgIHNlbGVjdGVkTWVtYmVySWQ6IHN0cmluZztcclxuICAgIG1lbWJlckxpc3Q6IE1lbWJlckxpc3RNb2RlbFtdID0gW107XHJcbiAgICBzZWxlY3RlZE1lbWJlcjogTWVtYmVyTGlzdE1vZGVsO1xyXG4gICAgTWVtZWJlcnNEaXNwbGF5TmFtZTogYW55W107XHJcbiAgICBpbWdTcmM6IEltYWdlU291cmNlID0gbnVsbDtcclxuICAgIGVtYWlsUGF0aDogYW55O1xyXG4gICAgcGFnZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VFbmRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZVRpbWVEaWZmZXJlbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgX2NhcmRTZXJ2aWNlOiBDYXJkc1NlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZXJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIGRyYXdlclNlcnZpY2U6IERyYXdlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2Zvcm1WYWxpZGF0aW9uU2VydmljZTogRm9ybVZhbGlkYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5wcmludGVyID0gbmV3IFByaW50ZXIoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImlkQ2FyZFZpZXdcIikgaWRDYXJkVmlldzogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJpZENhcmRWaWV3UHJpbnRcIikgaWRDYXJkVmlld1ByaW50OiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyV2luZG93JykgZmlsdGVyV2luZG93O1xyXG4gICAgQFZpZXdDaGlsZCgnY2FyZHNWaWV3JykgY2FyZHNWaWV3O1xyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IG1lbWJlckRhdGEgPSB0aGlzLl9jYXJkU2VydmljZS5nZXRBbGxNZW1iZXJzKCk7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgbWVtYmVyIG9mIG1lbWJlckRhdGEpIHtcclxuICAgICAgICAvLyAgIHRoaXMubWVtYmVyTGlzdC5wdXNoKG5ldyBNZW1iZXJMaXN0TW9kZWwobWVtYmVyLmZpcnN0TmFtZSxtZW1iZXIubGFzdE5hbWUsbWVtYmVyLm1lbWJlcklkLG1lbWJlci5mcm9udENhcmRTcmMsbWVtYmVyLmJhY2tDYXJkU3JjLG1lbWJlci50eXBlLG1lbWJlci5pc1NlbGVjdGVkKSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubWVtYmVyTGlzdCA9IHRoaXMuX2NhcmRTZXJ2aWNlLmdldEFsbE1lbWJlcnMoKTtcclxuICAgICAgICB0aGlzLnNldE1lbWViZXJzRGlzcGxheU5hbWUoKTtcclxuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRNZW1iZXJOYW1lID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlcklkID0gaXRlbS5tZW1iZXJJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gYmFjayBidXR0b25cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kQ2xpZW50RW1haWwoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltZ1NyYyA9IHBsdWdpbi5nZXRJbWFnZSh0aGlzLmlkQ2FyZFZpZXcubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5lbWFpbFBhdGggPSAnYmFzZTY0Oi8vJyArIHRoaXMuaW1nU3JjLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9zZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIC8vdG86IFsnamFpc2hhbmthci5iQGNvZ25pemFudC5jb20nXSxcclxuICAgICAgICAgICAgLyogc3ViamVjdDogXCJZb1wiLFxyXG4gICAgICAgICAgICBib2R5OiBcIkhlbGxvIDxzdHJvbmc+ZHVkZTwvc3Ryb25nPiA6KVwiLFxyXG4gICAgICAgICAgICB0bzogWydlZGR5dmVyYnJ1Z2dlbkBnbWFpbC5jb20nLCAndG9AcGVyc29uMi5jb20nXSxcclxuICAgICAgICAgICAgY2M6IFsnY2NwZXJzb25Ac29tZXdoZXJlLmNvbSddLFxyXG4gICAgICAgICAgICBiY2M6IFsnZWRkeUBjb21iaWRlc2suY29tJywgJ2VkZHlAeC1zZXJ2aWNlcy5ubCddLCAqL1xyXG4gICAgICAgICAgICBhdHRhY2htZW50czogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiAnQmx1ZS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMuZW1haWxQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbWVUeXBlOiAnaW1hZ2UvcG5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbWFpbC5hdmFpbGFibGUoKS50aGVuKGF2YWlsYWJsZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIGVtYWlsLmNvbXBvc2UodGhpcy5jb21wb3NlT3B0aW9ucykudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiZW1haWwgd2FzIHNlbnRcIiwgXCJsb25nZXJcIik7ICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJjb25maWd1cmUgeW91ciBlbWFpbFwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJjb25maWd1cmUgeW91ciBlbWFpbFwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcImNvbmZpZ3VyZSB5b3VyIGVtYWlsXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJjb25maWd1cmUgeW91ciBlbWFpbFwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd09wdGlvbnMobWVtaWQpIHtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc0JvZHlUYXBwZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlRmlsdGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2FyZHNWaWV3Lm5hdGl2ZUVsZW1lbnQuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlV2luZG93KGN1c3RvbVdpbmRvdywgZHVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLmNhcmRzVmlldy5uYXRpdmVFbGVtZW50LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGlkZUFsbE92ZXJsYXlNZW51KCkge1xyXG4gICAgICAgIHRoaXMuY2FyZHNWaWV3Lm5hdGl2ZUVsZW1lbnQuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGJvZHlUYXAoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNCb2R5VGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pc0RycFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCb2R5VGFwcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmlzRHJwU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtlZXBPcGVuKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxhbk5hdmlnYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL215UGxhblwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNFbWFpbENsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzRW1haWxTZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVtYWlsaWQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFN1YnNjcmliZXIoKSB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmliZXI6IHN0cmluZztcclxuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IFwiU3Vic2NyaWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyID0gaXRlbS5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRNZW1lYmVyc0Rpc3BsYXlOYW1lKCkge1xyXG4gICAgICAgIHRoaXMuTWVtZWJlcnNEaXNwbGF5TmFtZSA9IHRoaXMubWVtYmVyTGlzdDtcclxuICAgICAgICB0aGlzLk1lbWViZXJzRGlzcGxheU5hbWUubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0udHlwZSA9PT0gXCJTdWJzY3JpYmVyXCIgPyBpdGVtLmlzU2VsZWN0ZWQgPSB0cnVlIDogaXRlbS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFN1YnNjcmliZXIoKSA9PT0gaXRlbS5maXJzdE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGlzcGxheU5hbWUgPSBpdGVtLmZpcnN0TmFtZSArIFwiIFwiICsgaXRlbS5sYXN0TmFtZSArIFwiIChcIiArIGl0ZW0udHlwZSArIFwiKVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kaXNwbGF5TmFtZSA9IGl0ZW0uZmlyc3ROYW1lICsgXCIgXCIgKyBpdGVtLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJpbnRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJpbnRlci5pc1N1cHBvcnRlZCgpLnRoZW4oKHN1cHBvcnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN1cHBvcnRlZD8gXCIgKyBzdXBwb3J0ZWQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dUb2FzdE1lc3NhZ2UoXCJQcmludGluZyBpbnByb2dyZXNzIC4uLlwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XHJcbiAgICAgICAgICAgIC8vIGxldCBjdXJyZW50SW1hZ2U9IHRoaXMuY3VycmVudEZyb250Q2FyZFNyYztcclxuICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRJbWFnZSA9IFwifi9kdW1teURhdGEvbWVkaWNhbGNhcmRzLlBOR1wiO1xyXG4gICAgICAgICAgICAvLyBjdXJyZW50SW1hZ2UgPSBjdXJyZW50SW1hZ2Uuc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICAvLyBsZXQgaW1nUGF0aCA9IGFwcFBhdGggKyBjdXJyZW50SW1hZ2U7XHJcbiAgICAgICAgICAgIC8vIGxldCBpbWdTcmMgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICAgICAgLy8gaW1nU3JjLmxvYWRGcm9tRmlsZShpbWdQYXRoKTtcclxuICAgICAgICAgICAgdGhpcy5pbWdTcmMgPSBwbHVnaW4uZ2V0SW1hZ2UodGhpcy5pZENhcmRWaWV3Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnByaW50ZXIucHJpbnRJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVNyYzogdGhpcy5pbWdTcmNcclxuICAgICAgICAgICAgfSkudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FyZHNDb21wb25lbnQuZmVlZGJhY2soc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiUHJpbnRlciBOb3Qgc3VwcG9ydGVkICEhXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGZlZWRiYWNrKHN1Y2Nlc3M6IGJvb2xlYW4pIHtcclxuICAgICAgICAvLyBvbiBBbmRyb2lkIHRoZXJlJ3Mgbm8gd2F5IHRvIGtub3cgd2hldGhlciBvciBub3QgcHJpbnRpbmcgc3VjY2VlZGVkXHJcbiAgICAgICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgYWxlcnQoc3VjY2VzcyA/IFwiUHJpbnRlZCFcIiA6IFwiTm90IHByaW50ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kRW1haWwoZW1haWxpZCkge1xyXG4gICAgICAgIHRoaXMuaXNFbWFpbENsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1Y2Nlc3NNc2coZW1haWxpZCkge1xyXG4gICAgICAgIHRoaXMuaXNFbWFpbFZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoZW1haWxpZCk7XHJcbiAgICAgICAgaWYgKGVtYWlsaWQgIT09IHVuZGVmaW5lZCAmJiBlbWFpbGlkICE9PSBcIlwiICYmIHRoaXMuaXNFbWFpbFZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNFbWFpbENsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc0VtYWlsU2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWxpZCA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEVtYWlsTGJsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbEJ0bigpIHtcclxuICAgICAgICB0aGlzLmlzRW1haWxDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVtYWlsaWQgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBva0J0bigpIHtcclxuICAgICAgICB0aGlzLmlzRW1haWxTZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmFzaHVrXHJcblxyXG5cclxuICAgIHB1YmxpYyBkcnBDaGFuZ2UoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pc0RycFNob3cgPSAhdGhpcy5pc0RycFNob3c7XHJcbiAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNFbWFpbFNlbnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmludmFsaWRFbWFpbExibCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZW1haWxpZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zaG93TW9yZU9wdGlvbnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIHB1YmxpYyBrZWVwRHJwT3BlbigpIHtcclxuICAgIC8vICAgICB0aGlzLmlzRHJwU2hvdyA9IHRydWU7XHJcbiAgICAvLyB9XHJcbiAgICBwdWJsaWMgc2VsZWN0TWVtYmVyKG1lbWJlcikge1xyXG4gICAgICAgIHRoaXMubWVtYmVyTGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uaXNTZWxlY3RlZCA9IGZhbHNlKTtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkTWVtYmVyTmFtZSA9IG1lbWJlci5uYW1lO1xyXG4gICAgICAgIHRoaXMuc2hvd01vcmVPcHRpb25zID0gZmFsc2U7XHJcbiAgICAgICAgbWVtYmVyLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSBtZW1iZXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlcklkID0gbWVtYmVyLm1lbWJlcklkO1xyXG4gICAgICAgIC8vIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkc1ZpZXcubmF0aXZlRWxlbWVudC5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgNDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRNZW1iZXIobG9va3VwTGlzdCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gbG9va3VwTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzU2VsZWN0ZWQgPT09IHRydWUpO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zWzBdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uU2Nyb2xsKGFyZ3M6IFNjcm9sbEV2ZW50RGF0YSkge1xyXG4gICAgICAgIC8vIHRoaXMuc3RhdHVzID0gXCJzY3JvbGxpbmdcIjtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuaXNEcnBTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5maWx0ZXJXaW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCA0MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IFwibm90IHNjcm9sbGluZ1wiO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbnRhaW5lclRhcCgpIHtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0NhcmREZXRhaWxzKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc2NhcmRTZWNvbmRTbGlkZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29udGFpbmVyQmFja1RhcCgpIHtcclxuICAgICAgICB0aGlzLnNob3dNb3JlT3B0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0NhcmREZXRhaWxzKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc2NhcmRTZWNvbmRTbGlkZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmRycENoYW5nZSgpO1xyXG4gICAgICAgIGxldCBhcHBQYXRoID0gZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5wYXRoO1xyXG4gICAgICAgIGxldCBpbWFnZU5hbWUgPSB0aGlzLnNlbGVjdGVkTWVtYmVyLmZpcnN0TmFtZSArIHRoaXMuc2VsZWN0ZWRNZW1iZXIubGFzdE5hbWUgKyBcIi5wbmdcIlxyXG4gICAgICAgIHRoaXMuaW1nU3JjID0gcGx1Z2luLmdldEltYWdlKHRoaXMuaWRDYXJkVmlldy5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgLy8gYW5kcm9pZCBjb25kaXRpb25cclxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfRVhURVJOQUxfU1RPUkFHRV0sXHJcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiRG93bmxvYWQgaW5wcm9nZXNzLi5cIiwgXCJsb25nZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZHJvaWREb3dubG9hZHNQYXRoID0gZnMucGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUykuZ2V0QWJzb2x1dGVQYXRoKCksIGltYWdlTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1nU3JjLnNhdmVUb0ZpbGUoYW5kcm9pZERvd25sb2Fkc1BhdGgsIFwicG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIkRvd25sb2FkIENvbXBsZXRlZCAhIVwiLCBcImxvbmdlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJtaXNzaW9uIERlbmllZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIkRvd25sb2FkIEZhaWxlZCAhIVwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW1nU3JjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJEb3dubG9hZCBpbnByb2dlc3MuLlwiLCBcImxvbmdlclwiKTtcclxuICAgICAgICAgICAgbGV0IENvbXBsZXRpb25UYXJnZXQgPSBOU09iamVjdC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0aGlzSW1hZ2U6aGFzQmVlblNhdmVkSW5QaG90b0FsYnVtV2l0aEVycm9yOnVzaW5nQ29udGV4dEluZm86XCI6IGZ1bmN0aW9uIChcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZSwgZXJyb3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3NlZE1ldGhvZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlzSW1hZ2U6aGFzQmVlblNhdmVkSW5QaG90b0FsYnVtV2l0aEVycm9yOnVzaW5nQ29udGV4dEluZm86XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnM6IGludGVyb3AudHlwZXMudm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogW1VJSW1hZ2UsIE5TRXJyb3IsIGludGVyb3AuUG9pbnRlcl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgY29tcGxldGlvblRhcmdldCA9IENvbXBsZXRpb25UYXJnZXQubmV3KCk7XHJcbiAgICAgICAgICAgIFVJSW1hZ2VXcml0ZVRvU2F2ZWRQaG90b3NBbGJ1bSh0aGlzLmltZ1NyYy5pb3MsIGNvbXBsZXRpb25UYXJnZXQsXHJcbiAgICAgICAgICAgICAgICBcInRoaXNJbWFnZTpoYXNCZWVuU2F2ZWRJblBob3RvQWxidW1XaXRoRXJyb3I6dXNpbmdDb250ZXh0SW5mbzpcIixcclxuICAgICAgICAgICAgICAgIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiRG93bmxvYWQgQ29tcGxldGVkICEhXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJEb3dubG9hZCBGYWlsZWQgISFcIiwgXCJsb25nZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dDYXJkRGV0YWlscygpIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzY2FyZHNsaWRlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmVuYWJsZUdlc3R1cmUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX2NhcmRTZXJ2aWNlLnNlbGVjdGVkTWVtYmVyID0gdGhpcy5zZWxlY3RlZE1lbWJlcjtcclxuICAgICAgICBpZiAodGhpcy5fY2FyZFNlcnZpY2UuaXNDYXJkc1BvcFVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhcmRTZXJ2aWNlLmlzQ2FyZHNQb3BVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbW9kYWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLnNob3dNb2RhbChDYXJkRGV0YWlsQ29tcG9uZW50LCBtb2RhbE9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19