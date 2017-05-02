import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RadDataForm } from "nativescript-telerik-ui-pro/dataform";
import { RadDataFormComponent } from "nativescript-telerik-ui-pro/dataform/angular"; 

@Component({
    template: `
    <GridLayout rows="*, auto">
      <RadDataForm row="0" [source]="credentials" (loaded)="onFormLoaded($event)">
            <TKEntityProperty tkDataFormProperty name="username" displayName="E-Mail" index="0">
                <TKPropertyEditor tkEntityPropertyEditor type="Email"></TKPropertyEditor>
            </TKEntityProperty>
            <TKEntityProperty tkDataFormProperty name="password" displayName="Password" index="1">
                <TKPropertyEditor tkEntityPropertyEditor type="Password"></TKPropertyEditor>
            </TKEntityProperty>
            <TKEntityProperty tkDataFormProperty name="environment" [valuesProvider]="environments" displayName="Environment" index="2">
                <TKPropertyEditor tkEntityPropertyEditor type="Picker"></TKPropertyEditor>
            </TKEntityProperty>
      </RadDataForm>
      <Button row="1" text="Sign in" (tap)="doLogin()" class="btn"></Button>
    </GridLayout>
  `,
    styles: [`
    #container { background-color:#efefef; }
  `]
})
export class ItemsComponent implements OnInit {
    public credentials: any;                      // credentials to pass to backend
    public environments: Array<string> = [];      // environments configured in ConfigProvider
    public selectedEnv: number = 0;               // environment from last successful login

    public radDataForm: RadDataForm;

    @ViewChild("form") form: RadDataFormComponent;

    constructor() {
    }
 
    public ngOnInit() {
        this.credentials = {
            "username": "",
            "password": "",
            "environment": "",
            "someProp": "" // new property introduced for which we do not want editor to be created
        };

    }
 
    public onFormLoaded(args) {
        var radDataForm = <RadDataForm>args.object;

        console.log(radDataForm) // RadDataForm 
 
        console.log(radDataForm.properties[3].name); // someProp
        radDataForm.properties.pop(); // remove the last prop but we also have splice, slice, etc.
 
        console.log(radDataForm.properties) // now the properties are 3 but we still need to edit the source object before reloading the whole form
 
        // normilizing the source object
        radDataForm.source = {
            "username": "",
            "password": "",
            "environment": ""
        };
 
        radDataForm.reload();
    }
}
