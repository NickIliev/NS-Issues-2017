import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost } from "ui/frame";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function navWithClearHistory() {
    var navigationEntry = {
        moduleName: "sub-page",
        context: {"taskType": "type", "taskId": "taskId", "curPage": "curPage"},
        animated: false,
        clearHistory: true //if set false，the problem is solved，but we need set true
    };

    topmost().navigate(navigationEntry);
}
