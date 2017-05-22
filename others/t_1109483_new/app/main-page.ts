import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { topmost } from "ui/frame";
import { RadGauge, GaugeScale, BarIndicator, RadialNeedle } from "nativescript-telerik-ui-pro/gauges";

let gaugeView;

export function onPageLoaded(args: EventData) {
    let page = <Page>args.object;

    gaugeView = <RadGauge>page.getViewById("gaugeView");
}

export function changeTo10() {
    console.log("here")
    console.log(gaugeView)
    var scale = <GaugeScale>gaugeView.scales.getItem(0);

    var inactiveIndiicator = <any>scale.indicators.getItem(0);
    var activeIndicator = <any>scale.indicators.getItem(1);

    activeIndicator.maximum = 10;
}

export function changeTo33() {
    console.log("here")
    console.log(gaugeView)
    var scale = <GaugeScale>gaugeView.scales.getItem(0);

    var inactiveIndiicator = <any>scale.indicators.getItem(0);
    var activeIndicator = <any>scale.indicators.getItem(1);

    activeIndicator.maximum = 33;
}

export function changeTo66() {
    console.log("here")
    console.log(gaugeView)
    var scale = <GaugeScale>gaugeView.scales.getItem(0);

    var inactiveIndiicator = <any>scale.indicators.getItem(0);
    var activeIndicator = <any>scale.indicators.getItem(1);

    activeIndicator.maximum = 66;
}

export function changeTo100() {
    console.log("here")
    console.log(gaugeView)
    var scale = <GaugeScale>gaugeView.scales.getItem(0);

    var inactiveIndiicator = <any>scale.indicators.getItem(0);
    var activeIndicator = <any>scale.indicators.getItem(1);

    activeIndicator.maximum = 100;
}