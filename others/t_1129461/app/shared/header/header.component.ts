import { Component, Input } from "@angular/core";

@Component({
    selector: "mb-header",
    template: `
    <GridLayout columns="*, auto" rows="*" class="actionBarWithoutBack">
        <StackLayout orientation="horizontal" col="0" row="0" [horizontalAlignment]="inputAlignment" *ngIf="!logo">
            <GridLayout rows="*" columns="*">
            <Label col="0" row="0" [text]="title" class="titleText"></Label>
            </GridLayout>
        </StackLayout>
        <StackLayout orientation="horizontal" class="headerLogo" verticalAlignment="middle" horizontalAlignment="left" col="0" row="0" *ngIf="logo">
            <Image src="~/images/redesign/logo.png"></Image>
        </StackLayout>
        <StackLayout orientation="horizontal" horizontalAlignment="right" col="2" row="0">
            <mb-menu></mb-menu>
        </StackLayout>
    </GridLayout>
  `,
})
export class HeaderComponent {
    @Input() title: string;
    @Input() inputAlignment: string = "center";
    @Input() logo: boolean = false;
    constructor() { 
 
    }

}
