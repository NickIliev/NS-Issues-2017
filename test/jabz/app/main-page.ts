import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { isEmpty, mapTo, fromArray } from "@funkia/jabz";

export function navigatingTo(args: EventData) {

    console.log(isEmpty([]));
    console.log(isEmpty([12]));

    var arr = [1, 2, 3, 4];
    mapTo((n) => n * n, fromArray(arr))

}