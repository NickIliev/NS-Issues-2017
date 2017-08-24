function onNavigatingTo(args) {
    var testInstance = new Test();
    console.log(testInstance.typeName);
    console.log(testInstance.constructor.name);
}

exports.onNavigatingTo = onNavigatingTo;

var Observable = require("data/observable").Observable;

class Test extends Observable {
  constructor() {
    super();
    this.foo = "bar";
    this.bar = true;
  }
};
