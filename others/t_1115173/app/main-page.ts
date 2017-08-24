/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { Slider } from 'ui/slider';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatingTo(args: EventData) {
    let model = null;

    let page = <Page>args.object;
    model = new Observable();

    model.set('amount', 1000);
    model.set('maxAmount', 1500);
    model.set('minAmount', 300);

    page.bindingContext = model;
}

export function onSliderLoaded(args) {
    let slider = <Slider>args.object;

    slider.value = 1000;
    slider.maxValue = 1500;
    slider.minValue = 300;
}