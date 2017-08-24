import {ObservableArray} from "data/observable-array";
import observableModule = require("ui/core/dependency-observable");
import autocompleteModule = require("nativescript-telerik-ui-pro/autocomplete");

export class ViewModel extends observableModule.DependencyObservable {

    private _items: ObservableArray<autocompleteModule.TokenModel>;
    private autocmp;
    private countries = ["Australia", "Albania","Austria", "Argentina", "Maldives","Bulgaria","Belgium","Cyprus",
                                        "Italy","Isernia","Istria","Iran","Iraq","Iglesias","Ingrato","India","Iceland",
                                        "Japan","Denmark","Finland","France","Germany","Greece","Hungary","Ireland",
                                        "Latvia","Luxembourg","Macedonia","Moldova","Monaco","Netherlands","Norway",
                                        "Poland","Romania","Russia","Sweden","Slovenia","Slovakia","Turkey","Ukraine",
                                        "Vatican City", "Chad", "China", "Chile"];

    constructor(args) {
        super();
        var page = args.object;
        this.autocmp = page.getViewById("autocmp");
        this.initDataItems();
    }

    get dataItems() {
        return this._items;
    }

    private initDataItems() {
        this._items = new ObservableArray<autocompleteModule.TokenModel>();

        for (var i = 0; i < this.countries.length; i++) {
            this._items.push(new autocompleteModule.TokenModel(this.countries[i],undefined));
        }
    }

    public onTokenAdded(args) {
        // this.set("eventName", "Suggerimento cliccato");
    }

    public onSuggestionViewVisible(args) {
        // this.set("eventName", "Suggestion View Visisble!");
        // console.log('ciao');
    }
}
