import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _LearnerName: string;
    private _ObserverName: string;

    constructor() {
        super();

        // Initialize default values.
        this.ObserverName = "John Smith";
        this._LearnerName = "Jane Doe";
    }

    get ObserverName(): string {
        return this._ObserverName;
    }
    
    set ObserverName(value: string) {
        if (this._ObserverName !== value) {
            this._ObserverName = value;
            this.notifyPropertyChange('ObserverName', value)
        }
    }

    get LearnerName(): string {
        return this._LearnerName;
    }
    
    set LearnerName(value: string) {
        if (this._LearnerName !== value) {
            this._LearnerName = value;
            this.notifyPropertyChange('LearnerName', value)
        }
    }

}

