import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
}
from "@angular/core";

import * as common from "../";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-authenticationView-sign-in",
    templateUrl: "authenticationView-sign-in.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationViewSignInComponent {@
    Input() set user(value: shared.User) {
        this.selectedUser = ( < any > Object).assign({}, value);
    }@
    Input() signedInOption: boolean;@
    Input() signedInAutoOption: boolean;

    @
    Output() signin = new EventEmitter();@
    Output() signout = new EventEmitter();@
    Output() navigate = new EventEmitter();

    selectedUser: shared.User;
    autoSignedIn: boolean;

    constructor(
        private _notificationService: shared.NotificationService
    ) {}

    onSignIn() {
        if (!this.selectedUser.username || !this.selectedUser.password) {
            this._notificationService.error("Missing credentials.");

            return;
        }

        this.signin.emit({
            user: this.selectedUser,
            autoSignedIn: this.autoSignedIn
        });
    }

    onSignOut() {
        this.signout.emit();
    }

    onNavigate() {
        this.navigate.emit();
    }
}