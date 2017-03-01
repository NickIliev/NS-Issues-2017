import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { LoadingIndicator } from "nativescript-loading-indicator";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    var loader = new LoadingIndicator();
    createLoader(loader);

    page.bindingContext = new HelloWorldModel();
}

function createLoader(loader: LoadingIndicator) {
    
    // optional options 
    // android and ios have some platform specific options 
    var options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            square: false,
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6"
        }
    };

    loader.show(options); // options is optional 
}

function hideLoader(loader) {
    // Do whatever it is you want to do while the loader is showing, then 
   loader.hide();
}