import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import builder = require("ui/builder");
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";

import { UIBuilder } from "nativescript-tsx";
// using nativescript-tsx and UIBuilder

export function navigatingTo(args: EventData) {

    let page = args.object as Page;
    
    var list = new ListView();
    list.itemTemplate = <StackLayout>
        <Label text="{{ $value }}" />
    </StackLayout>;

    // list.itemTemplate = () => {
    //     var stack = new StackLayout();
    //     var lbl = new Label();
    //     lbl.bind({ sourceProperty: "$value", targetProperty: "text" });
    //     stack.addChild(lbl);
    //     return stack;
    // }

    list.items = [5, 4, 3];
    page.content = list;
}
