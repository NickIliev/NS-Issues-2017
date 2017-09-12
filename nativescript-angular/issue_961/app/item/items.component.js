"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.isOn = false;
    }
    ItemsComponent.prototype.onTap = function () {
        this.isOn = !this.isOn;
        console.log(this.isOn);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "animation-states",
            template: "\n        <StackLayout>\n            <Button text=\"Touch me!\" [@state]=\"isOn ? 'active' : 'inactive'\" (tap)=\"onTap()\"></Button>\n        </StackLayout>",
            animations: [
                animations_1.trigger("state", [
                    animations_1.state("active", animations_1.style({
                        backgroundColor: "green"
                    })),
                    animations_1.transition("* => active", [animations_1.animate("600ms ease-out")])
                ])
            ]
        })
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLGtEQUFpRjtBQWlCakY7SUFmQTtRQWdCSSxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBTWpCLENBQUM7SUFKRyw4QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQU5RLGNBQWM7UUFmMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLCtKQUdTO1lBQ25CLFVBQVUsRUFBRTtnQkFDUixvQkFBTyxDQUFDLE9BQU8sRUFBRTtvQkFDYixrQkFBSyxDQUFDLFFBQVEsRUFBRSxrQkFBSyxDQUFDO3dCQUNsQixlQUFlLEVBQUUsT0FBTztxQkFDM0IsQ0FBQyxDQUFDO29CQUNILHVCQUFVLENBQUMsYUFBYSxFQUFFLENBQUUsb0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFFLENBQUM7aUJBQzNELENBQUM7YUFDTDtTQUNKLENBQUM7T0FDVyxjQUFjLENBTzFCO0lBQUQscUJBQUM7Q0FBQSxBQVBELElBT0M7QUFQWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgc3RhdGUsIHRyYW5zaXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJhbmltYXRpb24tc3RhdGVzXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiVG91Y2ggbWUhXCIgW0BzdGF0ZV09XCJpc09uID8gJ2FjdGl2ZScgOiAnaW5hY3RpdmUnXCIgKHRhcCk9XCJvblRhcCgpXCI+PC9CdXR0b24+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+YCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoXCJzdGF0ZVwiLCBbXG4gICAgICAgICAgICBzdGF0ZShcImFjdGl2ZVwiLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcImdyZWVuXCJcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXCIqID0+IGFjdGl2ZVwiLCBbIGFuaW1hdGUoXCI2MDBtcyBlYXNlLW91dFwiKSBdKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQge1xuICAgIGlzT24gPSBmYWxzZTtcblxuICAgIG9uVGFwKCkge1xuICAgICAgICB0aGlzLmlzT24gPSAhdGhpcy5pc09uO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzT24pO1xuICAgIH1cbn0iXX0=