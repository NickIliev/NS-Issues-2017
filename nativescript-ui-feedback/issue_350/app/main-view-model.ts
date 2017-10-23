import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _dataItems: Array<any>;

    constructor() {
        super();

        this.dataItems = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    }

    get dataItems(): Array<any> {
        return this._dataItems;
    }

    set dataItems(value: Array<any>) {
        if (this._dataItems !== value) {
            this._dataItems = value;
            this.notifyPropertyChange('dataItems', value)
        }
    }

}