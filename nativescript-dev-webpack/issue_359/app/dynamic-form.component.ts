import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'dynamic-form',
    template: `
        <StackLayout [formGroup]="form">

            <StackLayout *ngFor="let prop of objectProps">
                <label [text]="prop.label"></label>
                <TextField [formControlName]="prop.key" [id]="prop.key" [class]="prop.cssClass"></TextField>
            </StackLayout>
            <Label [text]="form.value | json"></Label>
        </StackLayout>
    `
})
export class DynamicFormComponent implements OnInit {

    @Input() dataObject;

    form: FormGroup;
    objectProps;

    constructor() {
        this.form = new FormGroup({});
    }

    ngOnInit() {
        // remap the API to be suitable for iterating over it
        this.objectProps =
            Object.keys(this.dataObject)
                .map(prop => {
                    return Object.assign({}, { key: prop }, this.dataObject[prop]);
                });

        // setup the form
        const formGroup = {};
        for (let prop of Object.keys(this.dataObject)) {
            formGroup[prop] = new FormControl(this.dataObject[prop].value || '');
        }

        this.form = new FormGroup(formGroup);
    }

    onTap(text) {
        console.log('TAP ' + text);
    }

}