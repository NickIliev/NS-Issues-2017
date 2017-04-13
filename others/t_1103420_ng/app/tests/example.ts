
import "nativescript-angular/platform";

import { AppComponent } from "../app.component";

describe("Tests for app/app.component.ts", function() {
    it("Verify default message", function() {
        var appComponent = new AppComponent();
        expect(appComponent.message).toBe("16 taps left");
    });
});

// A sample Jasmine test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
