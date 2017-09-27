import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { Kinvey } from 'kinvey-nativescript-sdk';
const dataStore = Kinvey.DataStore.collection('collection-name');

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}