import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Color } from "color";
import { AutoCompleteEventData, RadAutoCompleteTextView } from "nativescript-telerik-ui-pro/autocomplete";
import { BasePage } from "../../shared/BasePage";
import { HomeModel } from './home-view-model';

import app = require("application");
import autocompleteModel = require("./autocomplete-model");


class HomePage extends BasePage {

    searchField : RadAutoCompleteTextView;

    contentLoaded = (args) => {
        let page = <Page>args.object;
        page.bindingContext = new HomeModel();
    }

    onNavigatedTo = (args: EventData) => {
        console.log('navigated to home');
    }

    onRadAutoLoaded = (args: AutoCompleteEventData) => {
        this.searchField = <RadAutoCompleteTextView>args.object;
        this.searchField.bindingContext = new autocompleteModel.ViewModel(args);
        this.searchField.on('tap', () => {
            // this.searchTransition();
            console.log('tap in search');
        })

        if (app.ios) {
            // console.log(autocomplete.ios); // TKAutoCompleteTextView from http://docs.telerik.com/devtools/ios/api/Classes/TKAutoCompleteTextView.html
            var radIOS = this.searchField.ios;
            var wantedColor = new Color("#07354c");
            radIOS.suggestionView.backgroundColor = wantedColor.ios; // NOTE that we are using the iOS color
        }
    }
}

export = new HomePage();
