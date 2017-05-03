import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

let viewModel = new Observable();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = viewModel;
}

export function onTapWithoutTimeout() {

    viewModel.set('busy', true);

    for (var i = 0; i < 10000; i++) {
        console.log("step " + i);
    }
    viewModel.set('busy', false);

}

export function onTapWithTimeout() {

    viewModel.set('busy', !viewModel.get("busy"));

    for (var i = 0; i < 10000; i++) {
        console.log("step " + i);
    }
}