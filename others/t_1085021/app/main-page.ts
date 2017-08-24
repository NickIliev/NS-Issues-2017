import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

let vm = new Observable();
vm.set("isLoading", false);

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = vm;
}

export function onTap() {
    vm.set("isLoading", !vm.get("isLoading"));
}