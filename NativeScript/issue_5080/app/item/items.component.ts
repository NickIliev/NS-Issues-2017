import { Component, OnInit } from "@angular/core";

@Component({
    template: `
    <StackLayout horizontalAlignment="center" backgroundColor="gray">
      <WrapLayout>
        <Label class="wrap text" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
        <Label class="wrap text" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
      </WrapLayout>
      <WrapLayout>
        <Label class="wrap text padding" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
        <Label class="wrap text padding" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
      </WrapLayout>
      <GridLayout columns="*, 4*, 4*, *">
        <Label col="1" class="wrap text padding" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
        <Label col="2" class="wrap text padding" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, dolor et vulputate condimentum, sapien sapien semper ligula, eget imperdiet turpis est efficitur ipsum."></Label>
      </GridLayout>
    </StackLayout>
  `,
    styles: [`
    .text { 
      margin-top: 20; 
      font-size: 14;
      text-align: left;
      vertical-align: top;
    }
    .wrap { 
        background-color: lightblue; 
        width: 40%;
    }
    .padding { 
        padding: 0 20; 
    }
  `]
})
export class ItemsComponent implements OnInit {
    constructor() { }

    public ngOnInit() { }
}