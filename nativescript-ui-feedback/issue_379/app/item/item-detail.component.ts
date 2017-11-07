
import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { TokenModel } from 'nativescript-pro-ui/autocomplete';
// import { RadAutoCompleteTextViewComponent } from 'nativescript-pro-ui/autocomplete/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';


@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent {

    public items: ObservableArray<TokenModel>;

    private countries: string[] = ['Australia', 'Albania', 'Austria', 'Argentina',
        'Maldives', 'Bulgaria', 'Belgium', 'Cyprus', 'Italy', 'Japan',
        'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
        'Latvia', 'Luxembourg', 'Macedonia', 'Moldova', 'Monaco', 'Netherlands', 'Norway',
        'Poland', 'Romania', 'Russia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey', 'Ukraine',
        'Vatican City', 'Chad', 'China', 'Chile'];

    constructor(private params: ModalDialogParams) {
        this.initDataItems();
    }

    public onCancelTap(): void {
        this.params.closeCallback();
    }

    public onItemSelected(item: any): void {
        this.params.closeCallback(item);
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
