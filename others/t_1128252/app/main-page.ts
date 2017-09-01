import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    var array: Array<any> = [
        { code: "A", desc: "abc" },
        { code: "B", desc: "abc" }
    ];

    var obj = array.find(reason => reason.code === "A"); // JS: {"code":"A","desc":"abc"}

    console.log(JSON.stringify(obj));

    page.bindingContext = new HelloWorldModel();
}