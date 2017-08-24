import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _items: Array<any>;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();

        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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