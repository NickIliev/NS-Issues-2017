
import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ItemDetailComponent } from './item-detail.component';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { TokenModel } from 'nativescript-pro-ui/autocomplete';
// import { RadAutoCompleteTextViewComponent } from 'nativescript-pro-ui/autocomplete/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    public items: ObservableArray<TokenModel>;
    
    private countries: string[] = ['Australia', 'Albania', 'Austria', 'Argentina',
    'Maldives', 'Bulgaria', 'Belgium', 'Cyprus', 'Italy', 'Japan',
    'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
    'Latvia', 'Luxembourg', 'Macedonia', 'Moldova', 'Monaco', 'Netherlands', 'Norway',
    'Poland', 'Romania', 'Russia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey', 'Ukraine',
    'Vatican City', 'Chad', 'China', 'Chile'];


    constructor(private vcRef: ViewContainerRef, private modalService: ModalDialogService) {
        this.initDataItems();
    }

    public launchModal(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: '',
            fullscreen: true
        };

        this.modalService.showModal(ItemDetailComponent, options)
            .then(console.log)
            .catch(console.log);
    }


    public onSuggestionViewVisible(): void {
        console.log('supposed to be visible');
    }

    private initDataItems() {
        this.items = new ObservableArray<TokenModel>();

        for (const item of this.countries) {
            this.items.push(new TokenModel(item, ''));
        }

        console.log(this.items);
    }
}