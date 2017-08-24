import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as utils from "utils/utils";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onTap(args: EventData) {
    utils.openUrl('waze://?ll=37.44469,-122.15971&z=10');
}