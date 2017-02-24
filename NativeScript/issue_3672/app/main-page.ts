import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as builder from "ui/builder";
import * as frame from "ui/frame";

export function navigatingTo(args: EventData) {

    let myPage = <Page>args.object;

    var _page = frame.topmost().currentPage;
    var myComponentInstance = builder.load({
        path: "~/shared/",
        name: "drawer-contents",
        page: _page
    });

    myPage.content = myComponentInstance;
}