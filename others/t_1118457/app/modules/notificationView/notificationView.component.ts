import {
    Component

    , OnInit
    /// component core modules

}
from "@angular/core";

import {
    BehaviorSubject
}
from "rxjs/BehaviorSubject";

// START_CUSTOM_CODE_notificationViewModelComponentImports

// END_CUSTOM_CODE_notificationViewModelComponentImports
/// component additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-notificationView",
    templateUrl: "notificationView.component.html"
        /// component definitions
})

export class NotificationViewComponent

implements OnInit
/// component inheritance

{
    get title() {
        let result: string = "Notifications";

        if (this._mode === shared.Modes.ADD) {

            result = "Create";

        } else if (this._mode === shared.Modes.EDIT) {

            result = "Edit";

        } else if (this._mode === shared.Modes.DETAIL) {

            result = "Detail";

        }
        /// component custom title

        return result;
    }

    private _items$: BehaviorSubject < shared.Item[] > ;
    private _currentItem$: BehaviorSubject < shared.Item > ;
    private _mode: shared.Modes;

    modes = shared.Modes;

    get service() {
        return this._service;
    }

    get mode() {
        return this._mode;
    }

    get items$() {
        return this._items$.asObservable();
    }

    get currentItem$() {
        return this._currentItem$.asObservable();
    }

    // START_CUSTOM_CODE_notificationViewModelComponentProperties

    // END_CUSTOM_CODE_notificationViewModelComponentProperties

    /// component additional properties

    constructor(

        // START_CUSTOM_CODE_notificationViewModelComponentConstructorDependencies

        // END_CUSTOM_CODE_notificationViewModelComponentConstructorDependencies

        /// component constructor dependencies

        private _service: common.NotificationViewService
    ) {

        this._mode = shared.Modes.LIST;

        this._items$ = new BehaviorSubject([]);
        this._currentItem$ = new BehaviorSubject({
            id: "",
            data: {}
        });
        // START_CUSTOM_CODE_notificationViewModelComponentConstructorMethod

        // END_CUSTOM_CODE_notificationViewModelComponentConstructorMethod

        /// component constructor method

    }

    ngOnInit() {
        this.onLoad();
        // START_CUSTOM_CODE_notificationViewModelComponentOnInit

        // END_CUSTOM_CODE_notificationViewModelComponentOnInit
    }

    onLoad() {

        this._service.get()
            .subscribe(
                (data) => {
                    let arr: shared.Item[] = [];

                    data.forEach((item) => {

                        let newItem: shared.Item = {
                            "id": item.Id,
                            "data": item
                        };

                        arr.push(newItem);
                    });

                    this._items$.next([...arr]);
                    // START_CUSTOM_CODE_notificationViewModelComponentCustomLoad

                    // END_CUSTOM_CODE_notificationViewModelComponentCustomLoad
                }, (error) => {

                    console.log(JSON.stringify(error));

                }
            );

    }

    onSelect(args) {
        this._currentItem$.next(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    }

    onNavigateBack() {

        this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);

    }

    onNavigate(mode: shared.Modes) {

        this._mode = mode;
    }
    // START_CUSTOM_CODE_notificationViewModelComponentAdditionalMethods

    // END_CUSTOM_CODE_notificationViewModelComponentAdditionalMethods
    /// component additional methods

}