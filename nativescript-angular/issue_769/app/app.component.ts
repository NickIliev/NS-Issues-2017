import { Component } from "@angular/core";

@Component({
    selector: "parent",
    moduleId: module.id,
    template: `
    <StackLayout class="parent-class">
        <child></child>
    </StackLayout>
    `,
    styles: [`
    .parent-class .label-one {
        color:green;
    }
    StackLayout child .label-one {
        color: green;
    }
    .parent-class .child-class .label-one {
        color: green;
    }
    `]
})
export class ParentComponent {}