/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let myCarousel;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    myCarousel = page.getViewById("myCarousel");

    page.bindingContext = new HelloWorldModel();
}

export function onTap(args) {
    if (!myCarousel) {
        return;
    } else {
        console.log("selectPageEvent myCarousel is existing")
        console.log("Currently selected page:" + myCarousel.selectedPage);

        if (myCarousel.selectedPage == 0) {
            myCarousel.selectedPage = 1;
        } else if (myCarousel.selectedPage == 1) {
            myCarousel.selectedPage = 2;
        } else if (myCarousel.selectedPage == 2) {
            myCarousel.selectedPage = 0;
        }
    }
}