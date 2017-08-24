import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    isItemVisible: boolean;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();

        this.isItemVisible = true;
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

    public toggleVisibility() {
        console.log(this.isItemVisible)
        this.isItemVisible = !this.isItemVisible;
        this.notifyPropertyChange('isItemVisible', !this.isItemVisible, this.isItemVisible);
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }

}