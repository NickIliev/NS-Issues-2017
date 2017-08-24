
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Label } from 'ui/label';
import { HelloWorldModel } from './main-view-model';

import { RadListView, ListViewLinearLayout, ListViewScrollDirection } from "nativescript-telerik-ui-pro/listview"

export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;


    let container = <StackLayout>page.getViewById("container");

    let radList = new RadListView();
    radList.items = [1, 2, 3, 4, 5, 6.6];
    radList.selectionBehavior = "Press";
    radList.itemTemplate = "<label text='{{ $value }}' />";

    let linearLayout = new ListViewLinearLayout();
    linearLayout.scrollDirection = "Horizontal";
    radList.listViewLayout = linearLayout;

    container.addChild(radList);

    page.bindingContext = new HelloWorldModel();
}