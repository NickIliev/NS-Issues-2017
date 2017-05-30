import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost } from 'ui/frame';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}

export function onTap(args: EventData) {

    topmost().navigate({
        moduleName: "sub-page",
        animated: true,
        transition: {
            name: "slideRIght",
            duration: 1000
        }
    })

}