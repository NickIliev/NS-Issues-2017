import { Observable, EventData } from 'data/observable';
import { Label } from "ui/label";

export class HelloWorldModel extends Observable {

    public name: string;
    public items: Array<number>

    constructor() {
        super();

        // Initialize default values.
        this.name = "Cell name";
        this.items = [11, 22, 33, 44, 55, 66, 77];
    }


    public onTap(args) {
        console.log(args.object); // e.g. Label

        console.log(args.object.page)
        console.log(args.object.page.bindingContext.name)

        var tappedLabel = <Label>args.object;
        //console.log(tappedLabel.text)

        //console.log(args.eventName); // e.g. tap

        //console.log(this) // binded data for the cell template
    }

    public onOtherTap(args: EventData) {
        console.log(this); // HelloWorldModel
        console.log(this.name) // "Cell name"
    }
}