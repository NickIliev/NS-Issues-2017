import { HelloWorldModel } from './main-view-model'
import { SearchBar } from "ui/search-bar";
let vm

export function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = vm = new HelloWorldModel()
}

export function onSubmit(args) {
    console.log("onSubmit fired");
    const searchBar =  <SearchBar>args.object;
    console.log("onSubmit text:" + searchBar.text);

    vm.filter(searchBar.text);
    // global.removeSearchFocus( searchBar )
}

export function clearSearch( args ) {
    console.log("clearSearch fired");

    const searchBar =  <SearchBar>args.object;
    vm.filter();
    // global.removeSearchFocus( searchBar )
}