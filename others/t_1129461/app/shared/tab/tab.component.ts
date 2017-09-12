import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Globals } from "../../shared/global";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { RestrictedAccessComponent } from "../../shared/restrictedAccess/restrictedAccess.component";
import { Router, NavigationEnd } from "@angular/router";
import { GridLayout } from "ui/layouts/grid-layout";
import { Page } from "ui/page";
import { Subscription } from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: "mb-tab",
    templateUrl: "./tab.component.html",
    styleUrls: ["tab.css"]
})
export class TabComponent implements OnInit {
    tabMenudisable: string = "enableText";
    currentPage: string = "";   
    // sub: Subscription;

    constructor(private _routerExtensions: RouterExtensions,
        private promoModal: ModalDialogService,
        private vcRef: ViewContainerRef,
        public _globals: Globals,
        public _router: Router,
        public _page: Page) {


    }

    ngOnInit(): void {
        if (this._globals.isTurnOff) {
            let layout: GridLayout = <GridLayout>this._page.getViewById("accountLayout");
            this._globals.setIsUserInteractionEnabledRecursive(layout, false);
            this.tabMenudisable = "disableText";
        }
        if (this._router.url.toString() == "/login") {
            this.currentPage = this._globals.currentPage;
        }
        else if (this._router.url.toString().indexOf("reg_home") !== -1) {
            this.currentPage = "/home/"
        } else {
            this.currentPage = this._router.url.toString();
        }
    }
 showIndicator(currentUrl,landingUrl){
     if(currentUrl!==landingUrl){
         this._globals.showLoader();
    }  
 }
    loginCheckNavigate(page: string) {
       
          if (this._globals.isLoggedIn) {
            // if(!(this.currentUrl==this._router.url.toString())){
            //     this._globals.loader.show();
            // }             
              
            this.showIndicator(this._router.url.toString(),"/" + page);
            // this.currentPage = page; // REMOVE THIS LINE so that each unique instance of TabComponent will always load the default highlighted button
            this._routerExtensions.navigate(["/" + page], {
                animated: false
            });
            this._globals.currentPage = "";
        }
        else if (this._globals.isUnauthenticated) {
            this.currentPage = page;
            this._globals.currentPage = page;
            this.showRestrictedAccessPopup();
        }
        else {
            this.currentPage = page;
            this._globals.currentPage = page;
            this._routerExtensions.navigate(["/login"], {
                animated: false
            });
        }
    }

    showRestrictedAccessPopup() {
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.promoModal.showModal(RestrictedAccessComponent, options).then((res) => {
        });
    }

    home() {
        if (this._globals.isLoggedIn) {
              this.showIndicator(this._router.url.toString(),"/home/signedHome");
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
        } else if (this._globals.isUnauthenticated) {
            this.showIndicator(this._router.url.toString(),"/personal_info/reg_home");
            this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this._globals.user_identity], {
                animated: false
            });
        } else {
             this.showIndicator(this._router.url.toString(),"/home/anonymousHome");
            this._routerExtensions.navigate(["/home/anonymousHome"], {
                animated: false
            });
        }
    }

}