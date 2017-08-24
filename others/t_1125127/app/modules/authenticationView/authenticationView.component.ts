import {
    Component, OnInit
    /// component core modules

}
from "@angular/core";

/// component additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@Component({
    moduleId: module.id,
    selector: "ns-authenticationView",
    templateUrl: "authenticationView.component.html"
        /// component definitions
})

export class AuthenticationViewComponent

implements OnInit
/// component inheritance

{
    get title() {
        let result: string = "Authentication";

        /// component custom title

        return result;
    }

    user: shared.User;
    showSignUp: boolean;

    isSignedInOption: boolean;
    isSingedInAutoOption: boolean;
    /// component additional properties

    constructor(

        private _notificationService: shared.NotificationService,
        private _navigationService: shared.NavigationService,
        /// component constructor dependencies

        private _service: shared.AuthenticationService
    ) {

        this.showSignUp = false;

        this.isSignedInOption = false;
        // auto sign in
        this.isSingedInAutoOption = true;

        this.user = {
            username: "",
            password: ""
        };
        /// component constructor method

    }

    ngOnInit() {
        this._service.currentUser().subscribe(
            (data) => {
                if (!data) {
					//alert(JSON.stringify(data));

                    // auto sign in
                    if (this._service.hasCredentials()) {
                        let user: shared.User = {
                            username: this._service.getCredentials().username,
                            password: this._service.getCredentials().password
                        };

                        this.onSignIn({
                            user: user,
                            autoSignIn: false
                        });
                    }

                    return;
                };

                this.isSignedInOption = true;
            }
        );
    }

    onNavigate() {
        this.showSignUp = !this.showSignUp;
    }

    onSignIn(args) {
        this._service.signIn(args.user)
            .subscribe(
                (data) => {
                    // auto sign in
                    if (args.autoSignedIn) {
                        this._service.setCredentials(args.user);
                    } else {
                        this._service.clearCredentials();
                    }

                    this._service.currentUser().subscribe(
                        (data) => {
                            this.isSignedInOption = true;
                        }
                    );
                }, (error) => {
                    this._notificationService.error("We could not find your account.");
                }
            );
    }

    onSignUp(args) {
        this._service.signUp(args.user)
            .subscribe(
                (data) => {
                    this.onNavigate();
                }, (error) => {
                    this._notificationService.error("We were unable to create your account.");
                }
            );
    }

    onSignOut() {
        this._service.signOut()
            .subscribe(
                (data) => {
                    // auto sign in
                    this._service.clearCredentials();

                    this.user = {
                        username: "",
                        password: ""
                    };
                    this.isSignedInOption = false;
                }, (error) => {
                    this._notificationService.error("We were unable to signed out.");
                }
            );
    }

    /// component additional methods

}