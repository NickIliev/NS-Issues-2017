import { Component } from "@angular/core";

@Component({
	selector:'child',
	moduleId: module.id,
	template: `
	<StackLayout class="child-class">
		<Label text="Label 1" class="label-one"></Label>
		<Label text="Label 2" class="label-two"></Label>
	</StackLayout>
	`,
	styles: [`
	.label-one {
		color: red;
	}
	.label-two {
		color: blue;
	}
	`]
})
export class ChildComponent {}