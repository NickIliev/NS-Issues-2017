
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Label } from 'ui/label';
import { HelloWorldModel } from './main-view-model';

import { RadListView, ListViewLinearLayout, ListViewScrollDirection } from "nativescript-telerik-ui-pro/listview"

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    let container = <StackLayout>page.getViewById("container");

    let radList = new RadListView();
    radList.items = [1, 2, 3, 4, 5, 6.6, 888];
    radList.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";

    let linearLayout = new ListViewLinearLayout();
    linearLayout.scrollDirection = "Vertical";
    radList.listViewLayout = linearLayout;

    container.addChild(radList);

    // page.bindingContext = new HelloWorldModel();
}