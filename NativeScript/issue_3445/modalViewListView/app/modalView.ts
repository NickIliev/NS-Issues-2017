import {ObservableArray} from "data/observable-array";
import {Page, ShownModallyData} from 'ui/page';
import {Observable, EventData} from "data/observable";
import frame = require("ui/frame");
import {ListView, ItemEventData} from 'ui/list-view';

var closeCallback: Function;
var array;
export function onPageLoaded(args) {
  var page:Page = <Page>args.object;
  array = new ObservableArray();
  array.push({title: "Title1", style: 'notselected'});
  array.push({title: "Title2", style: 'notselected'});
  
  
  
  
  page.bindingContext = {myItems: array};
  
  
  
  
}


export function onShowingModally(args: EventData) {
    console.log(">>> login-page.onShowingModally");

}

export function onShownModally(args: ShownModallyData) {
    console.log(">>> login-page.onShownModally, context: " + args.context);
    
    var selected = <number>args.context;
    // console.log(selected);
    
    
    if(selected > -1){
      console.log("here");
      console.log(selected);
      array.getItem(selected).style="selected";
   }
    closeCallback = args.closeCallback;
    
    var modalPage = <Page>args.object;

    if (frame.topmost().currentPage.modal !== args.object) {
        throw new Error(`Error`);
    }
    
}

export function listViewItemTap(args:ItemEventData){
    console.log("list view item select");
    console.log(args.index);
    closeCallback(args.index);
}