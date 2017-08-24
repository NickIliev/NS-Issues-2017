import {
	Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, OnInit
} from "@angular/core";
import {
	Observable
} from "rxjs/Observable";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

import {
	ElementRef
} from "@angular/core";
import {
	AnimationCurve
} from "ui/enums";

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
	@ViewChild("accessArrangements") accessArrangementsInst;
	@ViewChild("actionRequired") actionRequiredInst;
	@ViewChild("description") descriptionInst;

	item: shared.Item;

	/// placeholder for field

	// START: fields for longListPicker
	public showingLongListPicker: any = false;
	public unfilteredItemsToShow = [];
	public itemsToShow = [];

	public selectedSite = '';
	public selectedBuilding = '';
	public selectedSpace = '';
	public selectedPriority = '';
	public selectedJobType = '';
	public siteMap = {};
	public buildingMap = {};
	public spaceMap = {};
	public priorityMap = {};
	public jobTypeMap = {};
	public listSites = [];
	public listBuildings = [];
	public listSpaces = [];
	public listPriority = [];
	public listJobType = [];

	public filterItem: string;

	@ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
	@ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;
	// END: fields for longListPicker

	constructor() {

		/// placeholder for component constructor

	}

	ngOnInit() {
		/// placeholder for component init

		this.item.data["Site"] = this.service.currentUser.DefaultSite;
		this.item.data["Building"] = this.service.currentUser.DefaultBuilding;

		this.populateSitesList();
		this.populateBuildingsList();
		this.populateSpacesList();


		this.service.getDbCollection('Priority').subscribe(items => {
			items.sort(this.sortDisplayOrder);
			items.forEach(item => {
				this.priorityMap[item.Name] = item.Id;
				this.listPriority.push(item.Name);
				if(item.Id == this.item.data.Priority){
					this.selectedPriority = item.Name;
					setTimeout(()=>{}, 0);
				}
			})
		});
	

		this.service.getDbCollection('JobType').subscribe(items => {
			items.forEach(item => {
				this.jobTypeMap[item.Name] = item.Id;
				this.listJobType.push(item.Name);
				if(item.Id == this.item.data.JobType){
					this.selectedJobType = item.Name;
					setTimeout(()=>{}, 0);
				}
			})
			this.listJobType.sort();
		});
	

		this.item.data["Establishment"] = this.service.currentUser.Establishment;
		this.item.data["RequestOriginator"] = this.service.currentUser.Id;
		this.item.data["EmailNotificationEnabled"] = true;
		this.item.data["LoggedAt"] = new Date();
		this.item.data["Status"] = shared.RequestStatuses.Entered;

	}

	populateSitesList() {
		this.listSites = [];
		this.service.getDbCollection('Site').subscribe(items => {
			items.forEach(item => {
				this.siteMap[item.Name] = item.Id;
				this.listSites.push(item.Name);
				if(item.Id == this.item.data.Site){
					this.selectedSite = item.Name;
					setTimeout(()=>{}, 0);
				}
			})
			this.listSites.sort();
		});
	}

	populateBuildingsList() {
		this.listBuildings = [];
		let buildingFilter = this.service.buildFilterEquals("Site", this.item.data.Site);
		this.service.getDbCollection('Building', buildingFilter).subscribe(items => {
			items.forEach(item => {
				this.buildingMap[item.Name] = item.Id;
				this.listBuildings.push(item.Name);
				if(item.Id == this.item.data.Building){
					this.selectedBuilding = item.Name;
					setTimeout(()=>{}, 0);
				}
			})
			this.listBuildings.sort();
		});
	}

	populateSpacesList() {
		this.listSpaces = [];
		let spaceFilter = this.service.buildFilterEquals("Building", this.item.data.Building);
		this.service.getDbCollection('Space', spaceFilter).subscribe(items => {
			items.forEach(item => {
				this.spaceMap[item.CodeName] = item.Id;
				this.listSpaces.push(item.CodeName);
				if(item.Id == this.item.data.Space){
					this.selectedSpace = item.CodeName;
					setTimeout(()=>{}, 0);
				}
			})
			this.listSpaces.sort();
		});
	}

	onAdd() {
		this.add.emit({
			item: this.item
		});
	}

	/// partial additional methods

	sortName(a, b) {
		var x = a.Name.toLowerCase();
		var y = b.Name.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	}

	sortCodeName(a, b) {
		var x = a.CodeName.toLowerCase();
		var y = b.CodeName.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	}

	sortDisplayOrder(a, b) {
		return a.DisplayOrder - b.DisplayOrder;
	}

	// START: LongListPicker
	showSites() {
		this.animateLongListPicker('sites');
		this.itemsToShow = this.listSites;
		this.unfilteredItemsToShow = this.listSites;
	}

	showBuildings() {
		this.animateLongListPicker('buildings');
		this.itemsToShow = this.listBuildings;
		this.unfilteredItemsToShow = this.listBuildings;
	}

	showSpaces() {
		this.animateLongListPicker('spaces');
		this.itemsToShow = this.listSpaces;
		this.unfilteredItemsToShow = this.listSpaces;
	}

	showPriority() {
		this.animateLongListPicker('priority');
		this.itemsToShow = this.listPriority;
		this.unfilteredItemsToShow = this.listPriority;
	}

	showJobType() {
		this.animateLongListPicker('jobType');
		this.itemsToShow = this.listJobType;
		this.unfilteredItemsToShow = this.listJobType;
	}

	filterLongList() {
		this.itemsToShow = this.unfilteredItemsToShow.filter(item => {
			return item.toLowerCase().indexOf(this.filterItem.toLowerCase()) !== -1;
		});
	}

	animateLongListPicker(type) {
		this.showingLongListPicker = type;
		this.longListPickerDimmer.nativeElement.opacity = 0;
		this.longListPickerDimmer.nativeElement.animate({
			opacity: 1,
			duration: 200
		})
		this.longListPickerContainer.nativeElement.opacity = 1;
		this.longListPickerContainer.nativeElement.scaleX = .7;
		this.longListPickerContainer.nativeElement.scaleY = .7;
		this.longListPickerContainer.nativeElement.animate({
			opacity: 1,
			scale: {x: 1, y: 1},
			duration: 400,
			curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
		})
	}

	chooseLongList(event) {
		this.filterItem = '';
		if (this.showingLongListPicker == 'sites') {
			this.selectedSite = this.itemsToShow[event.index];
			this.item.data.Site = this.siteMap[this.selectedSite];

			this.selectedBuilding = '';
			this.item.data.Building = 0;
			this.selectedSpace = '';
			this.item.data.Space = 0;
			this.populateBuildingsList();

		} else if (this.showingLongListPicker == 'buildings'){
			this.selectedBuilding = this.itemsToShow[event.index];
			this.item.data.Building = this.buildingMap[this.selectedBuilding];

			this.selectedSpace = '';
			this.populateSpacesList();

		} else if (this.showingLongListPicker == 'spaces'){
			this.selectedSpace = this.itemsToShow[event.index];
			this.item.data.Space = this.spaceMap[this.selectedSpace];
		} else if (this.showingLongListPicker == 'priority'){
			this.selectedPriority = this.itemsToShow[event.index];
			this.item.data.Priority = this.priorityMap[this.selectedPriority];
		} else if (this.showingLongListPicker == 'jobType'){
			this.selectedJobType = this.itemsToShow[event.index];
			this.item.data.JobType = this.jobTypeMap[this.selectedJobType];
		}
		this.closeLongListPicker();
	}

	closeLongListPicker() {
		this.longListPickerDimmer.nativeElement.animate({
			opacity: 0,
			duration: 200
		})
		this.longListPickerContainer.nativeElement.animate({
			opacity: 0,
			scale: {x: .7, y: .7},
			duration: 300,
			curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
		}).then(() => {
			this.showingLongListPicker = false;
		})
	}
	// END: LongListPicker


}
