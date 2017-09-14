import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _items: Array<any>;


    constructor() {
        super();
        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    get items(): Array<any> {
        return this._items;
    }

    set items(value: Array<any>) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChange('items', value)
        }
    }
}