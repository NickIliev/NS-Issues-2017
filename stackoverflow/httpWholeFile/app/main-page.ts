import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "http";
import * as fs from "file-system";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    http.getString("http://m.slashdot.org")
        .then(html => {
            console.log(html);
            
        }).catch(err => {
            console.log(err);
        })
}