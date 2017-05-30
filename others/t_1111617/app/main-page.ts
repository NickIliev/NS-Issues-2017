import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import { Color } from "color";

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


export function onItemLoading(args) {
    console.log("onItemLoading");

    var iosColor = new Color(20, 255, 0, 0).ios;
    args.ios.backgroundView.backgroundColor = iosColor;
}


