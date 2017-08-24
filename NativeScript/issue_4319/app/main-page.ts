import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { SearchBar } from 'ui/search-bar';
import { Color } from "color";

let page, sb;

declare var UISearchBarStyle: any;

export function navigatingTo(args: EventData) { 
    page = <Page>args.object;
}

export function onSearchLoaded(args) {
    sb = <SearchBar>args.object;
    sb.ios.searchBarStyle = UISearchBarStyle.UISearchBarStyleMinimal;
}