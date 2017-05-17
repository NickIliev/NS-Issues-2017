import { Observable } from 'data/observable';
import { ObservableArray } from "data/observable-array";
import { TokenModel } from "nativescript-telerik-ui-pro/autocomplete";
import { AutoCompleteEventData } from "nativescript-telerik-ui-pro/autocomplete";

export class HelloWorldModel extends Observable {

    private _isChecked: boolean = true;
    private _tfText: string;
    private _items: ObservableArray<TokenModel>;
    private countries = ["Australia", "Albania", "Austria", "Argentina", "Maldives", "Bulgaria", "Belgium", "Cyprus", "Italy", "Japan",
        "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
        "Latvia", "Luxembourg", "Macedonia", "Moldova", "Monaco", "Netherlands", "Norway",
        "Poland", "Romania", "Russia", "Sweden", "Slovenia", "Slovakia", "Turkey", "Ukraine",
        "Vatican City", "Chad", "China", "Chile"];

    constructor() {
        super();

        // Initialize default values.
        this.tfText = "Default text";
        this.initDataItems();
    }

    get isChecked(): boolean {
        return this._isChecked;
    }

    set isChecked(value: boolean) {
        if (this._isChecked !== value) {
            this._isChecked = value;
            this.notifyPropertyChange('isChecked', value)
        }
    }
    get tfText(): string {
        return this._tfText;
    }

    set tfText(value: string) {
        if (this._tfText !== value) {
            this._tfText = value;
            this.notifyPropertyChange('tfText', value)
        }
    }

    get dataItems() {
        return this._items;
    }

    private initDataItems() {
        this._items = new ObservableArray<TokenModel>();

        for (var i = 0; i < this.countries.length; i++) {
            this._items.push(new TokenModel(this.countries[i], undefined));
        }
    }

    public onTokenAdded(args: AutoCompleteEventData) {
        console.log(args.eventName);
        console.log(args.object);

        this.set("eventName", "Token Added!");
    }

    public onTokenRemoved(args) {
        this.set("eventName", "Token Removed!");
    }

    public onTokenSelected(args) {
        this.set("eventName", "Token Selected!");
    }

}