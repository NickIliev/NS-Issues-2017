import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;

    private _progress: number;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 20;
        this.progress = 20;
        this.updateMessage();
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

    get progress(): number {
        return this._progress;
    }
    
    set progress(value: number) {
        if (this._progress !== value) {
            this._progress = value;
            this.notifyPropertyChange('progress', value)
        }
    }


    public onTap() {
        this._counter--;
        this.progress = this.progress + 4;
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