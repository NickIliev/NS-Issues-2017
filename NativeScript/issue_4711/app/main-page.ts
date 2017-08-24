import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { PinchGestureEventData } from "ui/gestures";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onPinch(args: PinchGestureEventData) {

    console.log(args.android)
    console.log(args.ios)

    console.log(args.eventName)
    console.log(args.object)
    console.log(args.scale)
    console.log(args.state)
    console.log(args.type)
    console.log(args.view)

    console.log(args.getFocusX())
    console.log(args.getFocusY())
}