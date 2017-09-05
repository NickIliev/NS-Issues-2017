import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _isReg: boolean;

    constructor() {
        super();

        this.isReg = false;
    }

    get isReg(): boolean {
        return this._isReg;
    }

    set isReg(value: boolean) {
        if (this._isReg !== value) {
            this._isReg = value;
            this.notifyPropertyChange('isReg', value)
        }
    }
}