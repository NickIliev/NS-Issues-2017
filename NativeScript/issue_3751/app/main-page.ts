import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { AbsoluteLayout } from "ui/layouts/absolute-layout";

var ab: AbsoluteLayout;
var abMeuseredHeight: number;

var vm = new HelloWorldModel();

export function onLoaded(args: EventData) {
    let page = <Page>args.object;

    var ab = <AbsoluteLayout>page.getViewById("ab");

    setTimeout(function() {
      console.log(ab.getMeasuredHeight());

      abMeuseredHeight = (ab.getMeasuredHeight()/5) * 4; // 80%
      vm.set("abMeuseredHeight", abMeuseredHeight);

      page.bindingContext = vm;
    }, 300);

}


export function onMapTap(args: EventData) {
  console.log("onMapTap");
}

export function onDockTap(args) {
  console.log("onDockTap");
}
