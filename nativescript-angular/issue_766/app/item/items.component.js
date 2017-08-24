"use strict";
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.textOne = "Hello";
        this.textTwo = "how are you? how are you? how are you?";
        this.textThree = "Button";
        this.textFour = "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test";
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFVbEQsSUFBYSxjQUFjO0lBQTNCO0lBWUEsQ0FBQztJQU5HLGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsaUZBQWlGLENBQUM7SUFDdEcsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO0dBQ1csY0FBYyxDQVkxQjtBQVpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHRleHRPbmU6IHN0cmluZztcbiAgICB0ZXh0VHdvOiBzdHJpbmc7XG4gICAgdGV4dFRocmVlOiBzdHJpbmc7XG4gICAgdGV4dEZvdXI6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRleHRPbmUgPSBcIkhlbGxvXCI7XG4gICAgICAgIHRoaXMudGV4dFR3byA9IFwiaG93IGFyZSB5b3U/IGhvdyBhcmUgeW91PyBob3cgYXJlIHlvdT9cIjtcbiAgICAgICAgdGhpcy50ZXh0VGhyZWUgPSBcIkJ1dHRvblwiO1xuICAgICAgICB0aGlzLnRleHRGb3VyID0gXCJUZXN0IFRlc3QgVGVzdCBUZXN0IFRlc3QgVGVzdCBUZXN0IFRlc3QgVGVzdCBUZXN0IFRlc3QgVGVzdCBUZXN0IFRlc3QgVGVzdCBUZXN0XCI7XG4gICAgfVxufVxuIl19