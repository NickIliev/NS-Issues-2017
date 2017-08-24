import {
    Injectable
}
from "@angular/core";

import {
    Observable
}
from "rxjs/Observable";

import * as Storage from "application-settings";

import * as common from "./";
import * as shared from "../../../shared";

@
Injectable()
export class AuthenticationViewService {
    private _users: any;

    constructor(
        private _provider: shared.backendServicesService
    ) {
        this._users = this._provider.instance.users;
    }

    signIn(user: shared.User): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._users
                    .login(user.username, user.password)
                    .then(data => resolve(data.result))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    signUp(user: shared.User): Observable < any > {
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
                    .then(data => resolve(data.result))
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
                    .then(data => resolve(data.result))
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