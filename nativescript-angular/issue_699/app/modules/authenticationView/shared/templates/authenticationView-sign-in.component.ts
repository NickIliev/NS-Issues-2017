import {
	Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit
} from "@angular/core";

import {
	BehaviorSubject
} from 'rxjs/BehaviorSubject';

import * as common from "../";
import * as shared from "../../../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-authenticationView-sign-in",
	templateUrl: "authenticationView-sign-in.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationViewSignInComponent implements OnInit {
	@Input() set user(value: shared.User) {
		this.selectedUser = (<any>Object).assign({}, value);
	}
	@Input() signedInOption: boolean;
	@Input() signedInAutoOption: boolean;

	@Output() signin = new EventEmitter();
	@Output() signout = new EventEmitter();
	@Output() navigate = new EventEmitter();

	selectedUser: shared.User;
	autoSignedIn: boolean;

	// displayName: string = "";
	displayName: BehaviorSubject<string> = new BehaviorSubject<string>("");

	constructor(
		private _notificationService: shared.NotificationService,
		private _service: shared.AuthenticationService
	) { }

	ngOnInit() {
		this._service.currentUser().subscribe(
			data => {
				// this.displayName = data.DisplayName
				this.displayName.next(data.DisplayName);
			}
		);
		
		this.autoSignedIn = this.signedInAutoOption;

	}

	onSignIn() {
		if (!this.selectedUser.username || !this.selectedUser.password) {
			this._notificationService.error("Missing credentials.");

			return;
		}

		this.signin.emit({
			user: this.selectedUser,
			autoSignedIn: this.autoSignedIn
		});

		this._service.currentUser().subscribe(
			data => {
				//this.displayName = data.DisplayName
				this.displayName.next(data.DisplayName);
			}
		);

	}

	onSignOut() {
		this.signout.emit();
	}

	onNavigate() {
		this.navigate.emit();
	}

	get service(){

		return this._service;

	}

}