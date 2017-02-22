/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';


import ImageSourceSVGModule = require("nativescript-svg");
// var svgFile = new ImageSourceSVGModule.ImageSourceSVG();
 
// var url = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Vector-based_example.svg';
// var loaded = svgFile.loadFromUrl(url);
 
// if(loaded){
//     console.log("object loaded");
// } else {
//     console.log("error");
// }


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}