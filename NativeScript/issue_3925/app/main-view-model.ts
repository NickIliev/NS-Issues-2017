import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _source: Array<number>;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.source = [1,2,3,4,5,6]
        this.updateMessage();
    }

    get source(): Array<number> {
        return this._source;
    }
    
    set source(value: Array<number>) {
        if (this._source !== value) {
            this._source = value;
            this.notifyPropertyChange('source', value)
        }
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

    public onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}