import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    let stack = <StackLayout>page.getViewById("st");
    let label = <Label>page.getViewById("lbl-title");

    console.log("page.content: " + page.content);

    console.log("stack.getChildrenCount(): " + stack.getChildrenCount())
    console.log("stack.getChildAt(1): " + stack.getChildAt(1));
    console.log("stack.getChildIndex(label): " + stack.getChildIndex(label));

    console.log("stack.parent: " + stack.parent);

    var newlabel = new Label();
    newlabel.text = "new Label";
    stack.addChild(newlabel);

    stack.insertChild(newlabel, 2);

    page.bindingContext = new HelloWorldModel();
}