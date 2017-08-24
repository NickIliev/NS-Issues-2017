import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { SearchBar } from "ui/search-bar";
import { topmost } from "ui/frame";

let sb;
let vm = new HelloWorldModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    sb = <SearchBar>page.getViewById("searchBar");

    page.bindingContext = vm;
}

export function onSubmit(args) {
    console.log("onSubmit");

    console.log("sb.text: " + sb.text);
}

export function onClear(args) {
    console.log("onClear");
}

export function updateQuery() {
    vm.set("message", "New Query");

    // sb.text = "Some new query" // this also works
}

export function goToSubPage() {
    topmost().navigate("sub-page");
}