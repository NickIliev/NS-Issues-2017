import { Component } from "@angular/core";

@Component({
  selector: "ns-app",
  template: `
    <StackLayout>
      <Label text="I’m a label!" [class.visible]="showLabel"></Label>
      <Button text="Show Label" (tap)="show()"></Button>
    </StackLayout>
  `
})
export class ItemsComponent {
  showLabel = false;

  show() {
    this.showLabel = true;
  }
}
