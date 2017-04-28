import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

Object.defineProperty(Object.prototype, "IsObject", {
    value: function ()
    {
        let obj: Object = this;
        return obj !== null && typeof obj === 'object';
    }
});

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    

}