import { Component } from "@angular/core";

@Component({
	selector:'child',
	moduleId: module.id,
	template: `
	<StackLayout>
		<Label text="Label 1" class="label-one"></Label>
		<Label text="Label 2" class="label-two"></Label>
	</StackLayout>
	`,
	styles: [`
    StackLayout {
        border-width : 2;
        border-color: red;
        height: 400;
    }
	.label-one {
		color: red;
	}
	.label-two {
		color: blue;
	}
	`]
})
export class ChildComponent {}