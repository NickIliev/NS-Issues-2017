import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as frameModule from 'ui/frame';

export function navigatingTo(args: EventData) {

}

export function onTap(args: EventData) {
    frameModule.topmost().navigate("sub-page");
}