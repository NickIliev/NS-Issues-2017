import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import { Color } from "color";

import { ListView } from "ui/list-view";
import { RadListView } from "nativescript-telerik-ui-pro/listview";

import * as utilsModule from "utils/utils";

var listView;
var lblSelection;
let isRad: boolean;
let page: Page;

export function onPageLoaded(args) {
    page = args.object;

    page.bindingContext = new ViewModel();
}


export function onTap() {
    page.showModal("modal-page", "context", function () {

    }, true);
}

