import {
	Injectable
} from "@angular/core";

import {
	Observable
} from "rxjs/Observable";

import {
	BehaviorSubject
} from "rxjs/BehaviorSubject";

import * as common from "./";

// START_CUSTOM_CODE_requestViewModelServiceImports

// END_CUSTOM_CODE_requestViewModelServiceImports

/// service imports

import * as shared from "../../../shared";

@Injectable()
export class RequestViewService {

	private _data: any;

	get provider() {
		return this._provider;
	}

	// START_CUSTOM_CODE_requestViewModelServiceAdditionalProperties
	private _expandExpression = {
		Building: {
			TargetTypeName: "Building",
			ReturnAs: "oBuilding"
		},
		"JobType": {
			TargetTypeName: 'JobType',
			ReturnAs: "oJobType"
		},
		"Priority": {
			TargetTypeName: 'Priority',
			ReturnAs: "oPriority"
		},
		"RequestOriginator": {
			TargetTypeName: "Users",
			ReturnAs: "oRequestOriginator"
		},
		"ReferredTo": {
			TargetTypeName: "Users",
			ReturnAs: "oReferredTo"
		},
		"ReferredToTeam": {
			TargetTypeName: "Team",
			ReturnAs: "oReferredToTeam"
		},
		"Space": {
			TargetTypeName: 'Space',
			ReturnAs: "oSpace"
		} //,
		// "Photo": {
		// 	TargetTypeName: 'Files',
		// 	ReturnAs: 'oPhoto'
		// }
	}
	private _currentUser: any;
	private _requestedByFilter: shared.RequestedByFilter;
	private _spaceIDFilter: string;
	// END_CUSTOM_CODE_requestViewModelServiceAdditionalProperties

	constructor(
		// START_CUSTOM_CODE_requestViewModelServiceConstructorDependencies
		private _authenticationService: shared.AuthenticationService,

		// END_CUSTOM_CODE_requestViewModelServiceConstructorDependencies
		private _provider: shared.backendServicesService
	) {
		this._data = _provider.instance.data("JobRequest");
		// START_CUSTOM_CODE_requestViewModelServiceConstructorMethods
		this._authenticationService.currentUser().subscribe(
			data => {
				//alert(JSON.stringify(data));
				this._currentUser = data;
			}
		);
		this._requestedByFilter = shared.RequestedByFilter.All;
		
		// END_CUSTOM_CODE_requestViewModelServiceConstructorMethods
	}

	getFilter (requestedByFilter: shared.RequestedByFilter) {

		let filter = this._provider.newQuery;

		if (requestedByFilter == shared.RequestedByFilter.Mine) {
			//alert(JSON.stringify(this._currentUser.Id));
			filter.where().eq("RequestOriginator", this._currentUser.Id);
			// filter.where().eq("RequestOriginator", "c7a8e170-b1cb-11e6-abe9-65cda88894e6"); //app.currentUser.Id);
		} else if (requestedByFilter == shared.RequestedByFilter.MyBuilding) {
			filter.where().eq("Building", this._currentUser.DefaultBuilding);
			// filter.where().eq("Building", "89"); //app.currentUser.DefaultBuilding);
		}
		if (this._spaceIDFilter) {
			filter.where().eq("Space", this._spaceIDFilter);
		}

		return filter;

	}

	buildFilterEquals (field: string, value: string ) {

		let filter = this._provider.newQuery;
		filter.where().eq(field, value);
		return filter;
	}

	get(): Observable<any> {
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {

				let filter = this.getFilter(this._requestedByFilter);
				filter.orderDesc("LoggedAt");

				this._data
					.expand(this._expandExpression)
					.get(filter)
					.then(data => resolve(data.result || []))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	getDbCollection(dbName: String, filter = this._provider.newQuery): Observable<any> {
		let db = this._provider.instance.data(dbName);

		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				db
					.get(filter)
					.then(data => resolve(data.result || []))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	post(item: any): Observable<any> {
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				this._data
					.create(item)
					.then(data => resolve(data.result))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	put(item: any): Observable<any> {
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				this._data
					.updateSingle(item)
					.then(data => resolve(data))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	delete(item: any): Observable<any> {
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				this._data
					.destroySingle(item)
					.then(data => resolve(data))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	// START_CUSTOM_CODE_requestViewModelServiceAdditionalMethods
	getNextX(start: number): Observable<any> {
		//alert("getNextX(" + start + ")");
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				//alert(start);

				let query = this.getFilter(this._requestedByFilter);
				query.orderDesc("LoggedAt");
				query.skip(start).take(30); //Must be less than 50
				this._data
					.expand(this._expandExpression)
					.get(query)
					.then(data => resolve(data.result || []))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	get currentUser () {
		return this._currentUser;
	}

	set requestedByFilter (value: shared.RequestedByFilter) {
		this._requestedByFilter = value;
	}

	set spaceIDFilter (value: string) {
		this._spaceIDFilter = value;
	}
	
	// END_CUSTOM_CODE_requestViewModelServiceAdditionalMethods
	/// service class

}