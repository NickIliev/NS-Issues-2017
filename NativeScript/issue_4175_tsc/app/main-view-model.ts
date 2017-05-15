import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _checked: boolean;

    constructor() {
        super();

        this.checked = false;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        if (this._checked !== value) {
            this._checked = value;
            this.notifyPropertyChange('checked', value)
        }
    }
}