import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

var PdfReader = require("pdfreader").PdfReader;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    new PdfReader().parseFileItems("https://ia601708.us.archive.org/6/items/sreyas-ebooks/sree-vishnusahasranamasthothram.pdf", function (err, item) {
        if (item && item.text) {
            console.log(item.text);
        }
    });

    page.bindingContext = new HelloWorldModel();
}