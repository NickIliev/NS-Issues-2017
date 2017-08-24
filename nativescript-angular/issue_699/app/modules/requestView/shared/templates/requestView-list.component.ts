import {
	Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild
} from "@angular/core";

import * as common from "../";
import * as shared from "../../../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-requestView-list",
	templateUrl: "requestView-list.component.html",
	styleUrls: ["requestView-list.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestViewListComponent {
	@Input() service: any;
	@Input() items: any;

	@Input() embedded: boolean;

	@Output() select = new EventEmitter();
	@Output() navigate = new EventEmitter();
	@Output() loadMore = new EventEmitter();
	@Output() filterChanged = new EventEmitter();

	/// Add fields instance

	onSelect(item: shared.Item) {
		this.select.emit({
			item: item
		});
	}

	onAdd() {
		this.navigate.emit();
	}

	/// partial additional methods
	onLoadMoreItemsRequested(event) {
		this.loadMore.emit(event);
	}

	onIndexChanged(event) {
		this.filterChanged.emit(event);
	}

	isComplete(status: shared.RequestStatuses): boolean {
		return status == shared.RequestStatuses.Completed;
	}

	statusBadgeClass(status: shared.RequestStatuses): string {

		let result: string = "";

		// let current: shared.Item = this.item.getValue();
		result = shared.RequestStatuses[status].toLowerCase();

		return "badge " + result;

	}


}