import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost } from "ui/frame";

declare var UIColor: any;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;

    topmost().ios.navBarVisibility = "always";

    var controller = topmost().ios.controller;

    controller.navigationBar.tintColor = UIColor.redColor;
    controller.navigationBarHIdden = false;
}

export function onTap(args: EventData) {
    topmost().navigate("sub-page");
}