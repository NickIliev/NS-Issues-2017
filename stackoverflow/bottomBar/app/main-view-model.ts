import { Observable } from 'data/observable';
import { BottomBarItem } from "nativescript-bottombar";

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _items: Array<BottomBarItem>;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get items(): Array<BottomBarItem> {
        return new Array<BottomBarItem>(
            new BottomBarItem(0, "Archive", "logo", "#D8D8D8"),
            new BottomBarItem(1, "My List", "icon", "#D8D8D8"),
            new BottomBarItem(2, "Account", "background", "#D8D8D8")
        )
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