import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { topmost } from "ui/frame"
let page ;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onActionLoaded(args) {
    if (page.ios) {
        var navigationBar = topmost().ios.controller.navigationBar;        
        navigationBar.translucent = false;
        navigationBar.barStyle = 0; 
        page.backgroundSpanUnderStatusBar = true;
        page.actionBarHidden = false; 

        // added this lines of code
        navigationBar.shadowImage = UIImage.alloc().init();
        navigationBar.setBackgroundImageForBarMetrics(UIImage.alloc().init(), UIBarMetrics.Default)
    } 
}