import { Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
export class HelloWorldModel extends Observable {

    private _items: ObservableArray<any>;

    constructor() {
        super();

        this.items = new ObservableArray([0, 1, 1, 2, 3, 5]);
    }

    get items(): ObservableArray<any> {
        return this._items;
    }

    set items(value: ObservableArray<any>) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChange('items', value)
        }
    }

    addFibo() {
        this.items.push(this.items.getItem(this.items.length - 2) + this.items.getItem(this.items.length - 1));
    }
}