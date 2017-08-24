import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { SearchBar } from "ui/search-bar";
import { AndroidApplication } from "application";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    searchPhrase: string;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public searchBarLoaded(args) {
        let searchbar = <SearchBar>args.object;
        
        console.log("searchBarLoaded");
    }

    public onSubmit(args) {
        let searchbar = <SearchBar>args.object;

        console.log("onSubmit");
        searchbar.dismissSoftInput();
    }

    public searchBarTextChanged(args) {
        let searchbar = <SearchBar>args.object;

        console.log("searchBarTextChanged: " + searchbar.text);

        if (searchbar.text != "") {
            this.searchPhrase = searchbar.text;
            this.beginSearch();
        } else {
            setTimeout(function() {
                searchbar.dismissSoftInput();
            }, 300);
        }
    }

    public beginSearch() {
        // filter items list here
    }

    public onClear(args) {
        let searchbar = <SearchBar>args.object;

        console.log("onClear");
        searchbar.dismissSoftInput();
    }
}
