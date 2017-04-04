/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatingTo" event attached in main-page.xml

export function viewLoaded(args) {
    var view = args.object;

    var dashScrollView = view.getViewById("dashScrollView");

    if (dashScrollView && dashScrollView.android) {
        dashScrollView.android.setVerticalScrollBarEnabled(false);
    }

}