import {
	Component, OnInit
	/// component core modules

}
	from "@angular/core";

import {
	BehaviorSubject
}
	from "rxjs/BehaviorSubject";

// START_CUSTOM_CODE_requestViewModelComponentImports
import {
	ListViewEventData, RadListView, ListViewLoadOnDemandMode
} from "nativescript-telerik-ui/listview";
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { ObservableArray } from "data/observable-array";

// END_CUSTOM_CODE_requestViewModelComponentImports
/// component additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-requestView",
	templateUrl: "requestView.component.html"
	/// component definitions
})

export class RequestViewComponent

	implements OnInit
/// component inheritance

{
	get title() {
		let result: string = "Requests";

		if (this._mode === shared.Modes.ADD) {

			result = "New Request";

		} else if (this._mode === shared.Modes.EDIT) {

			let current: shared.Item = this._currentItem$.getValue();

			result = current.data.Description + "\0";

		} else if (this._mode === shared.Modes.DETAIL) {

			let current: shared.Item = this._currentItem$.getValue();
			if (current.data.oBuilding) {
				result = current.data.oBuilding.Name + "\0";
			}
		}
		/// component custom title

		return result;
	}

	private _items$: ObservableArray<shared.Item>;
	private _currentItem$: BehaviorSubject<shared.Item>;
	private _mode: shared.Modes;

	modes = shared.Modes;

	get service() {
		return this._service;
	}

	get mode() {
		return this._mode;
	}

	get items$(): ObservableArray<shared.Item> {
		return this._items$;
	}

	get currentItem$() {
		return this._currentItem$.asObservable();
	}

	// START_CUSTOM_CODE_requestViewModelComponentProperties
	private _numberOfAddedItems: number;
	private _requestedByFilter: shared.RequestedByFilter;
	// END_CUSTOM_CODE_requestViewModelComponentProperties

	/// component additional properties

	constructor(

		// START_CUSTOM_CODE_requestViewModelComponentConstructorDependencies

		// END_CUSTOM_CODE_requestViewModelComponentConstructorDependencies

		/// component constructor dependencies

		private _service: common.RequestViewService
	) {

		this._mode = shared.Modes.LIST;

		this._items$ = new ObservableArray<shared.Item>();
		this._currentItem$ = new BehaviorSubject({
			id: "",
			data: {}
		});
		// START_CUSTOM_CODE_requestViewModelComponentConstructorMethod
		this._numberOfAddedItems = 0;
		this._requestedByFilter = shared.RequestedByFilter.All;
		// END_CUSTOM_CODE_requestViewModelComponentConstructorMethod

		/// component constructor method

	}

	ngOnInit() {
		this.onLoad();
		// START_CUSTOM_CODE_requestViewModelComponentOnInit

		// END_CUSTOM_CODE_requestViewModelComponentOnInit
	}

	onLoad() {

		this._items$ = new ObservableArray<shared.Item>();

		this._service.get(this._requestedByFilter)
			.subscribe(
			(data) => {
				data.forEach((item) => {

					let newItem: shared.Item = {
						"id": item.Id,
						"data": item
					};

					this.items$.push(newItem);
					
				});

				// START_CUSTOM_CODE_requestViewModelComponentCustomLoad
				this._numberOfAddedItems = this.items$.length;

				// END_CUSTOM_CODE_requestViewModelComponentCustomLoad
			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);

	}

	onSelect(args) {

		this._currentItem$.next(args.item);
		
		this.onNavigate(shared.Modes.DETAIL);
	}

	onAdd(args) {

		this._service.post(args.item.data)

			.subscribe(
			(data) => {
				let arr: ObservableArray<shared.Item> = this._items$;

				if (!data.Id) {
					return;
				}

				args.item.id = data.Id;

				arr.push(args.item);

				this._currentItem$.next({
					id: "",
					data: {}
				});

				this.onNavigate(shared.Modes.LIST);

			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);
	}

	onUpdate(args) {

		this._service.put(args.item.data)

			.subscribe(
			(data) => {
				let arr: ObservableArray<shared.Item> = this._items$;

				arr.forEach((itm, idx) => {
					if (itm.id === args.item.id) {
						arr[idx] = args.item;
					}
				});

				this._currentItem$.next(args.item);

				this.onNavigate(shared.Modes.DETAIL);
			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);
	}

	onDelete(args) {

		this._service.delete(args.item.data)

			.subscribe(
			(data) => {
				let arr: ObservableArray<shared.Item> = this._items$;

				arr.forEach((itm, idx) => {
					if (itm.id === args.item.id) {
						arr.splice(idx, 1);
					}
				});

				this._currentItem$.next({
					id: "",
					data: {}
				});

				this.onNavigate(shared.Modes.LIST);

			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);
	}

	onNavigateBack() {
		this.onNavigate(this._mode === shared.Modes.EDIT && false ? shared.Modes.DETAIL : shared.Modes.LIST);

	}

	onNavigate(mode: shared.Modes) {

		if (mode === shared.Modes.ADD) {
			this._currentItem$.next({
				id: "",
				data: {}
			});
		}

		this._mode = mode;
	}
	// START_CUSTOM_CODE_requestViewModelComponentAdditionalMethods
	onLoadMoreItemsRequested(args: ListViewEventData) {
		let that = new WeakRef(this);

			let numberOfAddedItems: number = that.get()._numberOfAddedItems;

		that.get()._service.getNextX(numberOfAddedItems)
			.subscribe(
				(data) => {
					data.forEach((item) => {

						let newItem: shared.Item = {
							"id": item.Id,
							"data": item
						};

						that.get().items$.push(newItem);
						that.get()._numberOfAddedItems++;
					});

					var listView: RadListView = args.object;
					listView.notifyLoadOnDemandFinished();
					
				}, (error) => {

					console.log(JSON.stringify(error));

				}
			);

	}

	onListFilterChanged (args: SelectedIndexChangedEventData) {
		let that = new WeakRef(this);

        let tabView = <TabView>args.object;
        var newIndex = tabView.selectedIndex;
		if (that.get()._requestedByFilter != newIndex) {

			//alert("Switching filters");
			that.get()._requestedByFilter = newIndex;
			that.get().onLoad();

		}

	}
	// END_CUSTOM_CODE_requestViewModelComponentAdditionalMethods
	/// component additional methods

}