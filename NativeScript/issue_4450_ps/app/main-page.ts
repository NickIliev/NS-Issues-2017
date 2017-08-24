/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { DropDown, SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";

let dd; 
let viewModel = new HelloWorldModel();
viewModel.set("cssClass", "default");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    const page = <Page>args.object;
    const items = new ValueList<string>();
    
    dd = page.getViewById<DropDown>("dd");

    viewModel.set("items", items);
    viewModel.set("hint", "My Hint");
    viewModel.set("selectedIndex", null);    
    viewModel.set("isEnabled", true);    
    viewModel.set("cssClass", "default");

    page.bindingContext = viewModel;

    for (let loop = 0; loop < 200; loop++) {
        items.push({ value: `I${loop}`, display: `Item ${loop}`});
    }
}

export function changeStyles() {
    viewModel.set("cssClass", "changed-styles");
}