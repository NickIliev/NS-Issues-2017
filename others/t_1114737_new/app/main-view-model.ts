import { Observable, fromObject } from 'data/observable';


class Item extends Observable {

    constructor(public text: string, public isItemVisible: boolean) { 
        super();
    }

    public toggleVisibility(args) {
        console.dir(this);

        console.log(args.object);

        console.log("toggleVisibility value: " + this.isItemVisible);

        this.set("isItemVisible", !this.isItemVisible);
    }
}

export class HelloWorldModel extends Observable {

    private _isItemVisible: boolean;
    private _isSpecificCellVisible

    public items: Array<any>

    constructor() {
        super();

        this.items = [
            new Item("1", true),
            new Item("2", true),
            new Item("3", true),
            new Item("4", true),
        ]
    }

    get isItemVisible(): boolean {
        return this._isItemVisible;
    }

    set isItemVisible(value: boolean) {
        if (this._isItemVisible !== value) {
            this._isItemVisible = value;
            this.notifyPropertyChange('isItemVisible', value)
        }
    }

}