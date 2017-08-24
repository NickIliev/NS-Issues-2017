import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter, NgZone, ViewChild
}
from "@angular/core";

import * as common from "../";
import * as shared from "../../../../shared";

@Component({
    moduleId: module.id,
    selector: "ns-requestView-detail",
    templateUrl: "requestView-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestViewDetailComponent {
	@Input() service: any;
	@Input() set current(value: shared.Item) {
        this.item = ( < any > Object).assign({}, value);
    }

    @Output() navigate = new EventEmitter();

    // START_CUSTOM_CODE_requestViewModelDetailComponentProperties

    // END_CUSTOM_CODE_requestViewModelDetailComponentProperties

    /// Add fields instance

    item: shared.Item;

    onEdit() {
        this.navigate.emit();
    }

    /// partial additional methods

    // START_CUSTOM_CODE_requestViewModelDetailComponentAdditionalMethods
	get statusName(): string {

		let result: string = "";

		// let current: shared.Item = this.item.getValue();
		result = shared.RequestStatuses[this.item.data.Status] + "\0";

		return result;

	}

    // END_CUSTOM_CODE_requestViewModelDetailComponentAdditionalMethods
}