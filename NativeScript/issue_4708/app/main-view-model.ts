import {Observable} from 'data/observable';

import * as observableArrayModule from "data/observable-array";
import { MyTemplateSelector } from "./views/template-selector";
export class HelloWorldModel extends Observable {

    public templateSelector: MyTemplateSelector;
    public itemsSource: observableArrayModule.ObservableArray<Person>;

    constructor() {
        super();

        // Initialize default values.

        this.templateSelector = new MyTemplateSelector();

        var person = new Person();
        person.first = "Alexander";
        person.last = "Reyes";

        var items = [ person, person, person, person, person ];
        this.itemsSource = new observableArrayModule.ObservableArray<Person>(items);
    }
}

class Person {
    public first: any;
    public last: any;
}