import {
	Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, OnInit
} from "@angular/core";
import {
	Observable
} from "rxjs/Observable";

import * as common from "../";
import * as shared from "../../../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-requestView-add",
	templateUrl: "requestView-add.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class RequestViewAddComponent implements OnInit {
@Input() service: any;
@Input() set current(value: shared.Item) {
	this.item = (<any>Object).assign({}, value);
}

	@Output() add = new EventEmitter();

	/// Add fields instance
	@ViewChild("emailNotification") emailNotificationInst;
	@ViewChild("dropdownlistJobType") dropdownlistJobTypeInst;
	@ViewChild("dropdownlistPriority") dropdownlistPriorityInst;
	@ViewChild("accessArrangements") accessArrangementsInst;
	@ViewChild("actionRequired") actionRequiredInst;
	@ViewChild("description") descriptionInst;
	@ViewChild("dropdownlistSpace") dropdownlistSpaceInst;
	@ViewChild("dropdownlistBuilding") dropdownlistBuildingInst;

	item: shared.Item;

	/// placeholder for field
	dropdownlistJobTypeDropDown: any = new Object();
	dropdownlistPriorityDropDown: any = new Object();
	dropdownlistSpaceDropDown: any = new Object();
	dropdownlistBuildingDropDown: any = new Object();

	onSelectedPickerChanged(picker, dropdown, dataBind) {
		this.item.data[dataBind] = this[dropdown].itemsIndicators[picker.selectedIndex];
	}

	constructor() {
		/// placeholder for component constructor

		this.dropdownlistJobTypeDropDown.items$ = new Observable(Object);
		this.dropdownlistJobTypeDropDown.itemsIndicators = new Array<Object>();


		this.dropdownlistPriorityDropDown.items$ = new Observable(Object);
		this.dropdownlistPriorityDropDown.itemsIndicators = new Array<Object>();


		this.dropdownlistSpaceDropDown.items$ = new Observable(Object);
		this.dropdownlistSpaceDropDown.itemsIndicators = new Array<Object>();


		this.dropdownlistBuildingDropDown.items$ = new Observable(Object);
		this.dropdownlistBuildingDropDown.itemsIndicators = new Array<Object>();

	}

	ngOnInit() {
		/// placeholder for component init

		this.dropdownlistJobTypeDropDown.items$ = this.service.getDbCollection('JobType').map(data => data.map((item, index) => {
			if (this.item.data.JobType === item.Id) {
				this.dropdownlistJobTypeDropDown.index = index;
			}

			this.dropdownlistJobTypeDropDown.itemsIndicators.push(item.Id);
			return item.Name;
		}));

		this.dropdownlistPriorityDropDown.items$ = this.service.getDbCollection('Priority').map(data => data.map((item, index) => {
			if (this.item.data.Priority === item.Id) {
				this.dropdownlistPriorityDropDown.index = index;
			}

			this.dropdownlistPriorityDropDown.itemsIndicators.push(item.Id);
			return item.Name;
		}));

		this.dropdownlistSpaceDropDown.items$ = this.service.getDbCollection('Space').map(data => data.map((item, index) => {
			if (this.item.data.Space === item.Id) {
				this.dropdownlistSpaceDropDown.index = index;
			}

			this.dropdownlistSpaceDropDown.itemsIndicators.push(item.Id);
			return item.CodeName;
		}));

		this.dropdownlistBuildingDropDown.items$ = this.service.getDbCollection('Building').map(data => data.map((item, index) => {
			if (this.item.data.Building === item.Id) {
				this.dropdownlistBuildingDropDown.index = index;
			}

			this.dropdownlistBuildingDropDown.itemsIndicators.push(item.Id);
			return item.Name;
		}));
	}

	onAdd() {
		this.add.emit({
			item: this.item
		});
	}

	/// partial additional methods
}