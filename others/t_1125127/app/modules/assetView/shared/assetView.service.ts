import {
	Injectable
} from "@angular/core";

import {
	Observable
} from "rxjs/Observable";
import * as common from "./";

// START_CUSTOM_CODE_assetViewModelServiceImports

// END_CUSTOM_CODE_assetViewModelServiceImports

/// service imports

import * as shared from "../../../shared";

@Injectable()
export class AssetViewService {

	private _data: any;

	get provider() {
		return this._provider;
	}

	// START_CUSTOM_CODE_assetViewModelServiceAdditionalProperties
	private _expandExpression = {
		Building: {
			TargetTypeName: "Building",
			ReturnAs: "oBuilding"
		},
		Space: {
			TargetTypeName: "Space",
			ReturnAs: "oSpace"
		}
	}

	// END_CUSTOM_CODE_assetViewModelServiceAdditionalProperties

	constructor(
		// START_CUSTOM_CODE_assetViewModelServiceConstructorDependencies

		// END_CUSTOM_CODE_assetViewModelServiceConstructorDependencies
		private _provider: shared.backendServicesService
	) {
		this._data = _provider.instance.data("Asset");
		// START_CUSTOM_CODE_assetViewModelServiceConstructorMethods

		// END_CUSTOM_CODE_assetViewModelServiceConstructorMethods
	}

	get(): Observable<any> {
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {

				let filter = this._provider.newQuery;
				filter.order("Code");
				this._data
					.expand(this._expandExpression)
					.get(filter)
					.then(data => resolve(data.result || []))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	getDbCollection(dbName: String): Observable<any> {
		let db = this._provider.instance.data(dbName);

		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				db
					.get()
					.then(data => resolve(data.result || []))
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

	// START_CUSTOM_CODE_assetViewModelServiceAdditionalMethods
	buildFilterEquals(field: string, value: string) {
		let filter = this._provider.newQuery;
		filter.where().eq(field, value);
		return filter;
	}

	getNextX(start: number): Observable<any> {
		//alert("getNextX(" + start + ")");
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				//alert(start);

				let query = this._provider.newQuery;
				query.order("Code");
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

	getById(Id: string): Observable<any> {
		//alert("getNextX(" + start + ")");
		let promise: Promise<any> = new Promise(
			(resolve, reject) => {
				this._data
					.expand(this._expandExpression)
					.getById(Id)
					.then(data => resolve(data.result || []))
					.catch(error => reject(error));
			}
		);

		return Observable.fromPromise(promise);
	}

	// END_CUSTOM_CODE_assetViewModelServiceAdditionalMethods
	/// service class

}