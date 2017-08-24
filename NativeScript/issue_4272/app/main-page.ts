
import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { SearchBar } from "ui/search-bar";
import { android as androidApp } from "application";

import { ad } from "utils/utils";

declare var android: any;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}
