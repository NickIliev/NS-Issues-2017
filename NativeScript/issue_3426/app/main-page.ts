import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

let vm = new Observable();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    vm.set("myItems", [{ color: "red", id: 1 }, { color: "blue", id: 2 }, { color: "green", id: 3 }]);

    page.bindingContext = vm;
}

export function onTap(args) {
    var item = args.view.bindingContext;

    console.log('item.id', item.id);
};