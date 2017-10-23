
import { EventData } from 'data/observable';
import { Switch } from 'ui/switch';
import { Page } from 'ui/page';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onSwitchLoaded(args) {
    let sw = <Switch>args.object;
    sw.on("checkedChange", (args) => {
        console.log("checkedChange");
        console.log(sw.checked);
    })
}