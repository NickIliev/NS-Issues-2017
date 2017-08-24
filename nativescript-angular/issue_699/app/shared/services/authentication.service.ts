import {
    Injectable
} from "@angular/core";

import {
    Observable
} from "rxjs/Observable";

import {
	BehaviorSubject
} from 'rxjs/BehaviorSubject';

import * as Storage from "application-settings";

import * as models from "../models"
import * as providers from "../providers"

@Injectable()
export class AuthenticationService {
    private _users: any;

	displayName: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
        private _provider: providers.backendServicesService
    ) {
        this._users = this._provider.instance.users;
    }

    signIn(user: models.User): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._users
                    .login(user.username.toLowerCase(), user.password)
                    .then(data => {
						this.displayName.next(data.result.DisplayName);
						resolve(data.result)
					})
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    signUp(user: models.User): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._users
                    .register(user.username, user.password, null)
                    .then(data => resolve(data.result))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    signOut() {
        let promise = new Promise < any > (
            (resolve, reject) => {
                this._users
                    .logout()
                    .then(data => {
						this.displayName.next("");
						resolve(data.result)
					})
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    currentUser(): Observable < any > {
        let promise = new Promise < any > (
            (resolve, reject) => {
                this._users
                    .currentUser()
                    .then(data => {
						this.displayName.next(data.result.DisplayName);
						resolve(data.result)
					})
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    hasCredentials() {
        let username = Storage.getString("username");
        let password = Storage.getString("password");

        if (username && password) {
            return true;
        }

        return false;
    }

    getCredentials() {
        let username = Storage.getString("username");
        let password = Storage.getString("password");

        return {
            username: username,
            password: password
        };
    }

    setCredentials(data) {
        Storage.setString("username", data.username);
        Storage.setString("password", data.password);
    }

    clearCredentials() {
        Storage.clear();
    }
}