import { Component } from "@angular/core";
import { person } from './models/person';

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App" class="action-bar"></ActionBar>
    <StackLayout>
        <Label text="test label" class="red"></Label>
        <dynamic-form [dataObject]="person"></dynamic-form>
    </StackLayout>
  `
})
export class AppComponent {
  
    person;
  
    constructor() {
        this.person = person;
    }
}
