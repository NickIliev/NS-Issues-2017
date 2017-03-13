import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}


export function onParentTap(args: EventData) {
  console.log("onParentTap");
}

export function onChildTap(args) {
  console.log("onChildTap");
  var view = args.object;
  view.parent.off("tap"); // same valid for touch
}
