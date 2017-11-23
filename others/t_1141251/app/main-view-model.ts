import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _items: Array<any>;

    constructor() {
        super();

        this.items = [1, 1, 3, 4, 5, 8, 13, 21, 34, 55, 89];
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