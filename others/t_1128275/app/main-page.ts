import { EventData } from 'data/observable';
import { Page } from "ui/page";
import { Switch } from "ui/switch";

import * as application from "application";

export function onSwitchLoaded(args: EventData) {
    console.log("switch loaded");
    let sw = <Switch>args.object;

    sw.isUserInteractionEnabled = false;
}

export function navigatingTo(args: EventData) {
    console.log("navigatingTo");
}

export function loaded(args: EventData) { 
    console.log("loaded");
}