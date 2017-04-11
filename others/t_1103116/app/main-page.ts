/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as fs from "file-system";
import { alert } from "ui/dialogs";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    var documents = fs.knownFolders.documents();
    var currentApp = fs.knownFolders.currentApp();
    var temp = fs.knownFolders.temp();

    console.log("documents: " + documents.path);
    // this path will remain the same when the app is installed
    // each new re-deploy of the app will change the path
    // simply chaning the JS or XML files will livesync the app without re-deploy aso the path will remain the same

}