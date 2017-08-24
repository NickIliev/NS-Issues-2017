// A sample Jasmine test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

var mainViewModel = require("../main-view-model"); //Require the main view model to expose the functionality inside it.
var vm = new mainViewModel.HelloWorldModel();

describe("Hello World Sample Test:", function() {
  it("Check counter.", function() {
    expect(vm.counter).toEqual(42); //Check if the counter equals 42.
  });
  it("Check message.", function () {
    expect(vm.message).toBe("42 taps left"); //Check if the message is "42 taps left".
  });
});