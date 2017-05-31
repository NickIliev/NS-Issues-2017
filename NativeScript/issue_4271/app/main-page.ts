import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { ImageSource, fromFileOrResource } from "image-source";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    let img = fromFileOrResource("~/images/cosmos.jpg");
    let baseString = img.toBase64String("jpeg");

    console.log(baseString);

    page.bindingContext = new HelloWorldModel();
}