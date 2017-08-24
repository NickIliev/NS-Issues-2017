import { TestModel } from './component/test-component';
import { Page } from 'ui/page';
import { Observable } from 'data/observable';
import { Frame } from 'ui/frame';
import { StackLayout } from 'ui/layouts/stack-layout';
import { ListView } from 'ui/list-view';
import { TabView, TabViewItem } from 'ui/tab-view';

export class HelloWorldModel extends Observable {

    private router: Frame;
    private builder = require('ui/builder');
    private tab: TabView;

    constructor(page: Page, router: Frame) {
        super();

        this.router = router;
        this.tab = <TabView>page.getViewById("tabView");
        this.initializeTabView();
    }


    private initializeTabView(): void {

        let items = [];

        var tabEntry0 = new TabViewItem();
        tabEntry0.title = "Tab 0";
        tabEntry0.view = this.builder.load({
            path: "component",
            name: "test-component",
            attributes: {
                bindingContext: new TestModel()
            }
        });

        items.push(tabEntry0);
        this.tab.items = items;
    }
}