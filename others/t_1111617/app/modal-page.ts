import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import { Color } from "color";

import { ListView } from "ui/list-view";
import { RadListView } from "nativescript-telerik-ui-pro/listview";

import { isIOS } from "platform";

import * as utilsModule from "utils/utils";

var listView;
var lblSelection;
let isRad: boolean;
let page: Page;

export function pageStoriesPagesLoaded(args) {
    page = args.object;
    page.bindingContext = new ViewModel();
}

export function onRadListLoaded(args) {
    let radList = <RadListView>args.object;
    if (args.object instanceof RadListView) {
        //console.log("RadListView");
        isRad = true;
    }
}

export function onItemLoading(args) {
    if (args.ios) {
        console.log("setIosListItemTransparentBackground triggered");
        setIosListItemTransparentBackground(args);
    }
};

function setIosListItemTransparentBackground(args) {
    console.log("instance of RadListView: " + (args.view.parent instanceof RadListView));

    if (isIOS) {
        if (args.view.parent instanceof RadListView) {
            //transparent, so that list item has same color as page-background
            var iosColor = new Color(0, 0, 0, 0).ios;
            args.ios.backgroundView.backgroundColor = iosColor;
        }
    }
}

/*  Here are the steps to apply the transparent mode for your modal page.
- run npm install
- go to node_modules/tns-core-modules/ui/page/page.ios.js
- find the method called _showNativeModalView
- change this code:

// if (fullscreen) {
//     this._ios.modalPresentationStyle = 0;
// }

to this one

// if (fullscreen) {
//     this._ios.providesPresentationContextTransitionStyle = true;
//     this._ios.definesPresentationContext = true;
//     this._ios.modalPresentationStyle = UIModalPresentationOverFullScreen;
//     this._ios.view.backgroundColor = UIColor.clearColor;
// }

*/
