import { Observable } from 'data/observable';
import { screen, ScreenMetrics } from "platform";

export class HelloWorldModel extends Observable {

    private _userSelectionHeight: number;
    private _items: Array<any>;

    constructor() {
        super();

        var mainScreen = screen.mainScreen;
        console.log(mainScreen.heightDIPs);
        console.log(mainScreen.heightPixels);
        console.log(mainScreen.scale);
        console.log(mainScreen.widthDIPs);
        console.log(mainScreen.widthPixels);

        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.userSelectionHeight = (this.items.length * 35 ) + (this.items.length * 0.9);
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

    get userSelectionHeight(): number {
        return this._userSelectionHeight;
    }

    set userSelectionHeight(value: number) {
        if (this._userSelectionHeight !== value) {
            this._userSelectionHeight = value;
            this.notifyPropertyChange('userSelectionHeight', value)
        }
    }
}