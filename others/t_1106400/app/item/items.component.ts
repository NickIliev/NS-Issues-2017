import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RadDataForm } from "nativescript-telerik-ui-pro/dataform";
import { Button } from "ui/button";
import { Page } from "ui/page";
import { ProxyViewContainer } from "ui/proxy-view-container";

@Component({
    template: `
    <GridLayout rows="*, auto">
      <RadDataForm id="form" row="0" [source]="credentials" (loaded)="onFormLoaded($event)">
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
      <Button row="1" text="Sign in" (tap)="doLogin()" (loaded)="onButtonLoaded($event)" class="btn"></Button>
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

    @ViewChild("form") form: ElementRef;
    
    constructor(private page:Page) { }

    public ngOnInit() {
        this.credentials = {
            "username": "",
            "password": "",
            "environment": "",
            "someProp": ""
        };

        this.radDataForm = <RadDataForm>this.page.getViewById("form");
        console.log("onNgInit this.radDataForm: " + this.radDataForm);
    }

    public onButtonLoaded(args) {
        var btn = <Button>args.object;
        console.log("onButtonLoaded args.object: " + btn);
    }

    public onFormLoaded(args) {
        console.log("onFormLoaded args.object: " + this.radDataForm);
        // console.log("source BEFORE: " + radDataForm.source);

        // console.log(radDataForm.properties)
        // console.log(radDataForm.properties[3].name); // someProp
        // radDataForm.properties.pop(); // remove the last prop but we also have splice, slice, etc.

        // radDataForm.source = {
        //     "username": "",
        //     "password": "",
        //     "environment": ""
        // };

        // console.log("source AFTER: " + radDataForm.source)

        // radDataForm.reload();

    }
}
