import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as utils from "utils/utils";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    getAppInfo("PreferenceSpecifiers").then((data: any) => {
        try {
            console.log("HERE: " + data.objectAtIndex(0).objectForKey("DefaultValue").objectForKey("Value").toString());
        } catch(e) {
            console.log(e);
        }
    });
}

function getAppInfo(key) {
    return new Promise(function (resolve, reject) {
        try {
            var mainBundle = utils.ios.getter(NSBundle, NSBundle.mainBundle);
            resolve(mainBundle.infoDictionary.objectForKey(key));
        } catch (ex) {
            console.log("Error in reading key: " + key + " : " + ex);
            reject(ex);
        }
    });
};

