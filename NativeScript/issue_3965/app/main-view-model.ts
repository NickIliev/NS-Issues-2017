import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {
    private _message: string;

    constructor() {
        super();

        this.message = "initial";
    }

    get message(): string {
        return this._message;
    }
    
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }
}