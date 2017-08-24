import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Switch } from "ui/switch";

export function navigatingTo(args: EventData) {

    let viewModel = new HelloWorldModel();

    let page = <Page>args.object;
    let sw = <Switch>page.getViewById("sw");

    sw.on("checkedChange", (args: EventData) => {
        console.log(sw.checked);

        if (sw.checked) {
            viewModel.set("message", "YES");
        } else {
            viewModel.set("message", "NOPE");
        }
    })

    page.bindingContext = viewModel;
}

