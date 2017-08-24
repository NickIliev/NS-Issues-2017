import {
	Component, ChangeDetectionStrategy, Input, Output, EventEmitter, NgZone, ViewChild
} from "@angular/core";

import * as common from "../";
import * as shared from "../../../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-spaceView-detail",
	templateUrl: "spaceView-detail.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceViewDetailComponent {

	@Input() service: any;
	@Input() set current(value: shared.Item) {
		this.item = (<any>Object).assign({}, value);
	}

	@Output() navigate = new EventEmitter();

	// START_CUSTOM_CODE_spaceViewModelDetailComponentProperties

	// END_CUSTOM_CODE_spaceViewModelDetailComponentProperties

	/// Add fields instance

	item: shared.Item;

	onEdit() {
		this.navigate.emit();
	}

	/// partial additional methods

	// START_CUSTOM_CODE_spaceViewModelDetailComponentAdditionalMethods
	onIndexChanged(event) {
		//this.filterChanged.emit(event);
	}

	onNewRequest(event) {
		
	}
	// END_CUSTOM_CODE_spaceViewModelDetailComponentAdditionalMethods
}