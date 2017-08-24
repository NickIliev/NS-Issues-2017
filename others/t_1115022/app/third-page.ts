import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { topmost, stack } from "ui/frame";
let subViewModel = new Observable();

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    subViewModel.set("newProp", "NativeScript");

    page.bindingContext = subViewModel;
}
export function getContext() {

    console.log("currentPage: " + topmost().currentPage); 
    console.log("stack: " + stack()); 

    let currentStack = stack();
    console.log("currentStack.length: " + currentStack.length)

    let firstFrame = currentStack[0];
    console.log(firstFrame.currentPage)
    console.log(firstFrame.currentPage.bindingContext.get("message"));
}

export function navigate() {
    topmost().navigate("main-page");
}