/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as  builder from "ui/builder";

import { StackLayout } from "ui/layouts/stack-layout";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    
    var myComponentInstance = builder.load({
            path: "~/widgets/app-header",
            name: "header"
    });

    var st = <StackLayout>page.getViewById("st");
    st.addChild(myComponentInstance);

    page.bindingContext = new HelloWorldModel();
}