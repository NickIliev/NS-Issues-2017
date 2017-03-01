import { BasePage } from "../../shared/BasePage";
import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { AboutModel } from './about-view-model';


class AboutPage extends BasePage {
    contentLoaded = (args) => {
        let page = <Page>args.object;
        page.bindingContext = new AboutModel();
    }

    onNavigatedTo(args: EventData) {
        console.log('navigated to about');
    }
}

export = new AboutPage();
