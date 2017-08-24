import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _myItems: Array<any>;
    private _myNewItems: Array<any>;

    constructor() {
        super();

        this.myItems = [1, 2, 3, 4, 5, 6, 7, 8];
        this.myNewItems = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    get myItems(): Array<any> {
        return this._myItems;
    }

    set myItems(value: Array<any>) {
        if (this._myItems !== value) {
            this._myItems = value;
            this.notifyPropertyChange('myItems', value)
        }
    }

    get myNewItems(): Array<any> {
        return this._myNewItems;
    }

    set myNewItems(value: Array<any>) {
        if (this._myNewItems !== value) {
            this._myNewItems = value;
            this.notifyPropertyChange('myNewItems', value)
        }
    }

}