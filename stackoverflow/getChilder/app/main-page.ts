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

    console.log("page.content: " + page.content); // page.content: StackLayout<st>@file:///app/main-page.xml:19:5;

    console.log("stack.getChildrenCount(): " + stack.getChildrenCount()) // 3
    console.log("stack.getChildAt(1): " + stack.getChildAt(1)); // stack.getChildAt(1): Button(5)@file:///app/main-page.xml:21:9;
    console.log("stack.getChildIndex(label): " + stack.getChildIndex(label)); // 0

    console.log("stack.parent: " + stack.parent); // stack.parent: Page(1)@file:///app/main-page.xml:7:1;

    var newlabel = new Label();
    newlabel.text = "new Label";
    stack.addChild(newlabel);



    page.bindingContext = new HelloWorldModel();
}