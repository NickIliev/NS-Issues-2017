import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { StackLayout } from "ui/layouts/stack-layout";

import { RadAutoCompleteTextView, SuggestionView, TokenModel } from "nativescript-pro-ui/autocomplete";

import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    @ViewChild("testHolder") testHolder: ElementRef;

    public searchFla(s: string): Observable<Array<any>> {
        return this.flavorService.searchFlavors(s);
    }

    public injectAutocmp() {

        var suggestionView = new SuggestionView();
        suggestionView.suggestionViewHeight = 300;
        suggestionView.suggestionItemTemplate = "<StackLayout backgroundColor=\"red\" orientation=\"vertical\" padding=\"10\"><Label text=\"{{ text }}\"></Label></StackLayout>";
        var autoCompleteTextView = new RadAutoCompleteTextView();
        autoCompleteTextView.suggestMode = "SuggestAppend";
        autoCompleteTextView.displayMode = "Plain";
        autoCompleteTextView.items = new ObservableArray<TokenModel>();
        autoCompleteTextView.suggestionView = suggestionView;
        autoCompleteTextView.on("suggestionViewBecameVisible", e => this.onSuggestionViewBecameVisible(e));

        var self = this;
        autoCompleteTextView.loadSuggestionsAsync = function (text) {
            var promise = new Promise(function (resolve, reject) {
                self.searchFla(text).subscribe(r => {
                    var items: Array<TokenModel> = new Array();
                    for (var i = 0; i < r.length; i++) {
                        items.push(new TokenModel(r[i].name, null));
                    }
                    resolve(items);
                });
            });
            return promise;
        }

        var layout: StackLayout = <StackLayout>this.testHolder.nativeElement;
        layout.addChild(autoCompleteTextView);

    }

    public onSuggestionViewBecameVisible(args) {
        var autocmpView = args.object;
        var suggestionView = args.object.suggestionView;
        console.log(suggestionView.suggestionItemTemplate);
    }
}