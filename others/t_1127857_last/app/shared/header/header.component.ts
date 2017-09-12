import { Component, Input } from "@angular/core";

@Component({
    selector: "mb-header",
    template: `
        <GridLayout columns="*, auto" rows="*" class="headerGrid">
            <StackLayout orientation="horizontal" col="0" row="0" [horizontalAlignment]="inputAlignment" *ngIf="!logo">
                <Label [text]="title" class="titleText"></Label>
            </StackLayout>
            <StackLayout orientation="horizontal" class="headerLogo" verticalAlignment="middle" horizontalAlignment="left" col="0" row="0" *ngIf="logo">
                 <Image src="~/images/redesign/logo.png"></Image>
            </StackLayout>
            <StackLayout orientation="horizontal"  horizontalAlignment="right" col="1" row="0">
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
