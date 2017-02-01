"use strict";
var Observable = require("data/observable").Observable;

const Test = class Test extends Observable {
    constructor() {
        super();
        this.foo = "bar";
        this.bar = true;
    }
};

var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {

    var page = args.object;

    var testInstance = new Test();
    console.log(testInstance.typeName);

    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

