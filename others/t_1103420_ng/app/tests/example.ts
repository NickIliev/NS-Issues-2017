import * as reflect from "reflect-metadata";
import {AppComponent} from "../app.component";

// A sample Jasmine test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("should define a click count", function() {
    let appComponent = new AppComponent();

    expect(appComponent.counter).toBe(16);
  });

  it("should report clicks accurately", function() {
    let appComponent = new AppComponent();

    appComponent.onTap();
    expect(appComponent.counter).toBe(15);
    expect(appComponent.message).toBe("15 taps left");
  });
});

