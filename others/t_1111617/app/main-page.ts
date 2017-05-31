import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import { Color } from "color";

import { ListView } from "ui/list-view";
import { RadListView } from "nativescript-telerik-ui-pro/listview";

import * as utilsModule from "utils/utils";

declare var UIColor: any;

var listView;
var lblSelection;

export function onPageLoaded(args) {
    var page = args.object;
    listView = page.getViewById("listView");
    lblSelection = page.getViewById("txtSelection");
    lblSelection.text = " ";
    page.bindingContext = new ViewModel();
}

export function onItemSelected(args) {

    var selectedItems = listView.getSelectedItems();
    var selectedTitles = "Selected items: ";
    for (var i = 0; i < selectedItems.length; i++) {
        selectedTitles += selectedItems[i].itemName;

        if (i < selectedItems.length - 1) {
            selectedTitles += ", ";
        }
    }

    lblSelection.text = selectedTitles;
}

export function onItemDeselected(args) {

    var selectedItems = listView.getSelectedItems();
    var selectedTitles = "Selected items: ";
    for (var i = 0; i < selectedItems.length; i++) {
        selectedTitles += selectedItems[i].itemName;

        if (i < selectedItems.length - 1) {
            selectedTitles += ", ";
        }
    }

    lblSelection.text = selectedTitles;
}

let isRad : boolean;

export function onRadListLoaded(args) {
    let radList = <RadListView>args.object;

    if (args.object instanceof RadListView) {
        console.log("RadListView");
        isRad = true;
    }
}

export function onItemLoading(args) {
    console.log("onItemLoading");

    if (args.ios) {
        setIosListItemTransparentBackground(args);
    }
};

function setIosListItemTransparentBackground(args) {
    if (isRad) { //RadListView?
        console.log("isRad RadListView");
        //not executed - in RadListViews itemLoading event: args.object is undefined
        var iosColor = new Color(20, 255, 0, 0).ios;
        args.ios.backgroundView.backgroundColor = iosColor;
    }
}


