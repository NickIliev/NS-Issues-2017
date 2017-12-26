import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as _ from "lodash";

@Component({
    selector: "ns-items",
    moduleId: __filename,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    chartResult: any[] = [];

    ngOnInit() {
        let data = [{ "start": "2017-12-19T12:59:31.007Z", "end": "2017-12-19T13:05:58.304Z", "value": "346 count" }, { "start": "2017-12-19T12:50:57.321Z", "end": "2017-12-19T12:59:31.007Z", "value": "260 count" }, { "start": "2017-12-19T12:40:12.130Z", "end": "2017-12-19T12:41:07.690Z", "value": "55 count" }, { "start": "2017-12-19T12:30:12.283Z", "end": "2017-12-19T12:40:12.130Z", "value": "60 count" }, { "start": "2017-12-19T12:12:38.579Z", "end": "2017-12-19T12:15:47.882Z", "value": "27 count" }, { "start": "2017-12-19T12:03:16.669Z", "end": "2017-12-19T12:12:38.579Z", "value": "152 count" }, { "start": "2017-12-19T09:02:17.723Z", "end": "2017-12-19T09:04:11.171Z", "value": "42 count" }, { "start": "2017-12-19T08:53:00.599Z", "end": "2017-12-19T09:02:17.723Z", "value": "432 count" }, { "start": "2017-12-19T08:44:06.142Z", "end": "2017-12-19T08:53:00.599Z", "value": "211 count" }, { "start": "2017-12-19T08:31:34.791Z", "end": "2017-12-19T08:37:27.763Z", "value": "183 count" }, { "start": "2017-12-19T08:24:56.284Z", "end": "2017-12-19T08:31:34.791Z", "value": "23 count" }, { "start": "2017-12-19T08:16:45.160Z", "end": "2017-12-19T08:24:56.284Z", "value": "239 count" }, { "start": "2017-12-19T07:56:05.983Z", "end": "2017-12-19T08:02:30.153Z", "value": "743 count" }, { "start": "2017-12-19T07:46:08.378Z", "end": "2017-12-19T07:56:05.983Z", "value": "455 count" }];

        const getHour = date => new Date(date).getUTCHours();
        const onlyNumbers = el => el.replace(/[a-zA-Z+]/g, '');

        const flatten = (acc, el) => {
            const hour = getHour(el.start);
            const value = Number(onlyNumbers(el.value));
            const find = acc.find(f => f.hour === hour);

            find
                ? (find.value += value)
                : acc.push({
                    hour: hour,
                    value: value,
                });

            return acc
        };

        this.chartResult = _.orderBy(data.reduce(flatten, []), ['hour'], ['asc']); // try bundling wit lodash library
        // this.chartResult = data.reduce(flatten, []), ['hour'], ['asc'];

        console.log('Chart : ' + JSON.stringify(this.chartResult));
    }
}