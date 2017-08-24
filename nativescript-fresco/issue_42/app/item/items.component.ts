import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: `
    <ActionBar title="My App"></ActionBar>


    <StackLayout>

        <Label text="Stacklayout"></Label>
        <FrescoDrawee #drawee imageUri="~/images/apple.png"></FrescoDrawee>

        <Label text="GridLayout"></Label>
        <GridLayout rows="100">
            <FrescoDrawee row="0" #drawee imageUri="~/images/apple.png"></FrescoDrawee>
        </GridLayout>

        <Label text="width:'50"></Label>
        <FrescoDrawee #drawee width="50" imageUri="~/images/apple.png"></FrescoDrawee>

        <Label text="height: 50"></Label>
        <FrescoDrawee #drawee height="50" imageUri="~/images/apple.png"></FrescoDrawee>

        <Label text="width: 50 height: 25"></Label>
        <FrescoDrawee #drawee width="50" height="25" imageUri="~/images/apple.png"></FrescoDrawee>

    <Label text="GridLayout with actualImageScaleType"></Label>
    <GridLayout rows="100">
        <FrescoDrawee row="0" actualImageScaleType="center"  #drawee imageUri="~/images/apple.png"></FrescoDrawee>
    </GridLayout>

        
    </StackLayout>

  `
})
export class ItemsComponent  {
}


