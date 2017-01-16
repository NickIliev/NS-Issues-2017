import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _items: Array<number>;

    constructor() {
        super();

        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    get items(): Array<number> {
        return this._items;
    }

    set items(value: Array<number>) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChange('items', value)
        }
    }

}