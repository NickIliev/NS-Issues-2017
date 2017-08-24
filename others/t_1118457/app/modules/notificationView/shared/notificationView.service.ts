import {
    Injectable
}
from "@angular/core";

import {
    Observable
}
from "rxjs/Observable";
import * as common from "./";

// START_CUSTOM_CODE_notificationViewModelServiceImports

// END_CUSTOM_CODE_notificationViewModelServiceImports

/// service imports

import * as shared from "../../../shared";

@
Injectable()
export class NotificationViewService {

    private _data: any;

    get provider() {
        return this._provider;
    }

    // START_CUSTOM_CODE_notificationViewModelServiceAdditionalProperties

    // END_CUSTOM_CODE_notificationViewModelServiceAdditionalProperties

    constructor(
        // START_CUSTOM_CODE_notificationViewModelServiceConstructorDependencies

        // END_CUSTOM_CODE_notificationViewModelServiceConstructorDependencies
        private _provider: shared.backendServicesService
    ) {
        this._data = _provider.instance.data("Notification");
        // START_CUSTOM_CODE_notificationViewModelServiceConstructorMethods

        // END_CUSTOM_CODE_notificationViewModelServiceConstructorMethods
    }

    get(): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._data
                    .get()
                    .then(data => resolve(data.result || []))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    getDbCollection(dbName: String): Observable < any > {
        let db = this._provider.instance.data(dbName);

        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                db
                    .get()
                    .then(data => resolve(data.result || []))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    // START_CUSTOM_CODE_notificationViewModelServiceAdditionalMethods

    // END_CUSTOM_CODE_notificationViewModelServiceAdditionalMethods
    /// service class

}