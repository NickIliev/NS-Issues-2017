import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _hint: string;

    constructor() {
        super();

        this.hint = "my Hint";
    }

    get hint(): string {
        return this._hint;
    }
    
    set hint(value: string) {
        if (this._hint !== value) {
            this._hint = value;
            this.notifyPropertyChange('hint', value)
        }
    }
}