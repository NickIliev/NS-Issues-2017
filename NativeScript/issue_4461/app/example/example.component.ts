import { Component } from '@angular/core';

@Component({
    selector: "ns-example",
    moduleId: module.id,
    templateUrl: "./example.component.html",
})
export class ExampleComponent {

    public count: number = 0;

    public returnPressHandler(): void {
        this.count++;
    }

    public resetCount() {
        this.count = 0;
    }

}