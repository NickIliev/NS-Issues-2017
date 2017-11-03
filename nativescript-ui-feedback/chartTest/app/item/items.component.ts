import { ItemDetailComponent } from './item-detail.component';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Item } from "./item";
import { Country, ItemService } from './item.service';



@Component({
    selector: "ns-items",
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    private _pieSource: ObservableArray<Country>;

    constructor(private _dataService: ItemService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef) { }

    ngOnInit(): void {
        this._pieSource = new ObservableArray(this._dataService.getCategoricalSource());
    }

    get pieSource(): ObservableArray<Country> {
        return this._pieSource;
    }

    openModal() {
        const options: ModalDialogOptions = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ItemDetailComponent, options);
    }
}