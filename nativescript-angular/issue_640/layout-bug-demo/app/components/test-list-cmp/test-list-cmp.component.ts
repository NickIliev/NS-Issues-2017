import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'test-list-cmp',
	templateUrl: 'test-list-cmp.component.html'
})

export class TestListCmpComponent {

	public items: Array<any> = [
		{
			title: 'test 1'
		},
		{
			title: 'test 2'
		}
	];
}