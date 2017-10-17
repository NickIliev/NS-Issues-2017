import { Observable } from 'data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-pro-ui/listview";

export class HelloWorldModel extends Observable {

    constructor() {
        super();

        this.initDataItems();
    }

    get dataItems(): ObservableArray<DataItem> {
        return this.get("_dataItems");
    }

    set dataItems(value: ObservableArray<DataItem>) {
        this.set("_dataItems", value);
    }

    private initDataItems() {
        this.dataItems = new ObservableArray<DataItem>();

        for (var i = 0; i < 55; i++) {
            this.dataItems.push(new DataItem("Item " + i));
        }
    }

    public itemTapped(args: ListViewEventData) {
        var item = this.dataItems.getItem(args.index);
        item.selected = !item.selected;
    }

    // You can also use itemSelected event and itemDeselected to provide this logic
    public itemSelected(args: ListViewEventData) {
        console.log("itemSelected");

        var item = this.dataItems.getItem(args.index);
        item.selected = true;
    }

    // You can also use itemSelected event and itemDeselected to provide this logic
    public itemDeselected(args: ListViewEventData) {
        var item = this.dataItems.getItem(args.index);
        item.selected = false;
    }
}

export class DataItem extends Observable {

    public get selected() {
        return this.get('_selected');
    }

    public set selected(value: boolean) {
        this.set('_selected', value);
    }

    public get name() {
        return this.get('_itemName');
    }

    public set name(value: string) {
        this.set('_itemName', value);
    }

    constructor(name: string) {
        super();

        this.name = name;
        this.selected = false;
    }
}
