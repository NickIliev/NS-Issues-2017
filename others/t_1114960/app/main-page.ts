import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { RadListView, SwipeActionsEventData } from "nativescript-telerik-ui-pro/listview";

let lv: RadListView;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    let vm = new Observable();
    let dataItems = [
        { "id": 1, "name": "John" }, { "id": 2, "name": "Elizabeth" }, { "id": 3, "name": "Marry" },
        { "id": 4, "name": "Chris" }, { "id": 5, "name": "Elizabeth" }, { "id": 6, "name": "Marry" },
        { "id": 4, "name": "Chris" }, { "id": 8, "name": "Elizabeth" }, { "id": 9, "name": "Marry" },
        { "id": 10, "name": "Chris" }, { "id": 11, "name": "Elizabeth" }, { "id": 12, "name": "Marry" },
        { "id": 13, "name": "Chris" }, { "id": 14, "name": "Elizabeth" }, { "id": 15, "name": "Marry" },
        { "id": 16, "name": "Chris" }, { "id": 17, "name": "Elizabeth" }, { "id": 18, "name": "Marry" },
        { "id": 19, "name": "Chris" }, { "id": 20, "name": "Elizabeth" }, { "id": 21, "name": "Marry" },
        { "id": 22, "name": "Elizabeth" }, { "id": 23, "name": "Marry" }, { "id": 24, "name": "Chris" },
        { "id": 25, "name": "Elizabeth" }, { "id": 26, "name": "Marry" }, { "id": 27, "name": "Chris" },
        { "id": 28, "name": "Elizabeth" }, { "id": 29, "name": "Marry" }, { "id": 30, "name": "Chris" }];
    vm.set("dataItems", dataItems);

    page.bindingContext = vm;

    lv = <RadListView>page.getViewById("lv");
    lv.on("scrollChange", (args) => {
        console.dir(args)
    })
}

export function scrollToIndex() {
    lv.scrollToIndex(5);
}

export function smoothScroll() {
    lv._android.smoothScrollToPosition(11);
}