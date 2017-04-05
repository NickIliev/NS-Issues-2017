// import { Component, OnInit } from "@angular/core";
"use strict";
// import { Item } from "./item";
// import { ItemService } from "./item.service";
// @Component({
//     selector: "ns-items",
//     moduleId: module.id,
//     templateUrl: "./items.component.html",
// })
// export class ItemsComponent implements OnInit {
//     items: Item[];
//     constructor(private itemService: ItemService) { }
//     ngOnInit(): void {
//         this.items = this.itemService.getItems();
//     }
// }
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.isOn = false;
    }
    ItemsComponent.prototype.onTap = function () {
        this.isOn = !this.isOn;
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "animation-states",
        template: "\n        <stack-layout>\n            <Button class=\"btn\" text=\"Touch me!\" [@state]=\" isOn ? 'active' : 'inactive' \" (tap)=\"onTap()\"></Button>\n            <button text=\"Debug button to interact\" (tap)=\"onTap()\"></button>\n        </stack-layout>",
        animations: [
            animations_1.trigger("state", [
                animations_1.state("inactive", animations_1.style({ backgroundColor: "blue", transform: "scaleX(0.5) scaleY(0.5) translateX(-10px) translateY(-10px)" })),
                animations_1.state("active", animations_1.style({ backgroundColor: "red", transform: "scaleX(2) scaleY(2) translateX(100px) translateY(100px)" })),
                animations_1.transition(':enter', []),
                animations_1.transition('inactive => active', animations_1.animate('600ms ease-in-out')),
                animations_1.transition('active => inactive', animations_1.animate('600ms ease-in-out'))
            ])
        ],
        styles: [
            ".btn {\n            width: 100px;\n            height: 100px;\n        }\n        "
        ]
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDs7QUFFckQsaUNBQWlDO0FBQ2pDLGdEQUFnRDtBQUVoRCxlQUFlO0FBQ2YsNEJBQTRCO0FBQzVCLDJCQUEyQjtBQUMzQiw2Q0FBNkM7QUFDN0MsS0FBSztBQUNMLGtEQUFrRDtBQUNsRCxxQkFBcUI7QUFFckIsd0RBQXdEO0FBRXhELHlCQUF5QjtBQUN6QixvREFBb0Q7QUFDcEQsUUFBUTtBQUNSLElBQUk7QUFFSixrREFBZ0Y7QUFDaEYsc0NBQXdDO0FBMEJ4QyxJQUFhLGNBQWM7SUF4QjNCO1FBMEJJLFNBQUksR0FBRyxLQUFLLENBQUM7SUFJakIsQ0FBQztJQUhHLDhCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGNBQWM7SUF4QjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxvUUFJVTtRQUNwQixVQUFVLEVBQUU7WUFDUixvQkFBTyxDQUFDLE9BQU8sRUFBRTtnQkFDYixrQkFBSyxDQUFDLFVBQVUsRUFBRSxrQkFBSyxDQUFDLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsNkRBQTZELEVBQUMsQ0FBQyxDQUFDO2dCQUM5SCxrQkFBSyxDQUFDLFFBQVEsRUFBRSxrQkFBSyxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUseURBQXlELEVBQUMsQ0FBQyxDQUFDO2dCQUN2SCx1QkFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7Z0JBQ3hCLHVCQUFVLENBQUMsb0JBQW9CLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM5RCx1QkFBVSxDQUFDLG9CQUFvQixFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNqRSxDQUFDO1NBQ0w7UUFDRCxNQUFNLEVBQUU7WUFDSixvRkFJQztTQUNKO0tBQ0osQ0FBQztHQUNXLGNBQWMsQ0FNMUI7QUFOWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLy8gaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbi8vIGltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbi8vIEBDb21wb25lbnQoe1xuLy8gICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4vLyAgICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbi8vICAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbi8vICAgICBpdGVtczogSXRlbVtdO1xuXG4vLyAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxuXG4vLyAgICAgbmdPbkluaXQoKTogdm9pZCB7XG4vLyAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4vLyAgICAgfVxuLy8gfVxuXG5pbXBvcnQge3RyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCBzdGF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiYW5pbWF0aW9uLXN0YXRlc1wiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzdGFjay1sYXlvdXQ+XG4gICAgICAgICAgICA8QnV0dG9uIGNsYXNzPVwiYnRuXCIgdGV4dD1cIlRvdWNoIG1lIVwiIFtAc3RhdGVdPVwiIGlzT24gPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZScgXCIgKHRhcCk9XCJvblRhcCgpXCI+PC9CdXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHRleHQ9XCJEZWJ1ZyBidXR0b24gdG8gaW50ZXJhY3RcIiAodGFwKT1cIm9uVGFwKClcIj48L2J1dHRvbj5cbiAgICAgICAgPC9zdGFjay1sYXlvdXQ+YCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoXCJzdGF0ZVwiLCBbXG4gICAgICAgICAgICBzdGF0ZShcImluYWN0aXZlXCIsIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsdWVcIiwgdHJhbnNmb3JtOiBcInNjYWxlWCgwLjUpIHNjYWxlWSgwLjUpIHRyYW5zbGF0ZVgoLTEwcHgpIHRyYW5zbGF0ZVkoLTEwcHgpXCJ9KSksXG4gICAgICAgICAgICBzdGF0ZShcImFjdGl2ZVwiLCBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJyZWRcIiwgdHJhbnNmb3JtOiBcInNjYWxlWCgyKSBzY2FsZVkoMikgdHJhbnNsYXRlWCgxMDBweCkgdHJhbnNsYXRlWSgxMDBweClcIn0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2luYWN0aXZlID0+IGFjdGl2ZScsIGFuaW1hdGUoJzYwMG1zIGVhc2UtaW4tb3V0JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignYWN0aXZlID0+IGluYWN0aXZlJywgYW5pbWF0ZSgnNjAwbXMgZWFzZS1pbi1vdXQnKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgLmJ0biB7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcblxuICAgIGlzT24gPSBmYWxzZTtcbiAgICBvblRhcCgpIHtcbiAgICAgICAgdGhpcy5pc09uID0gIXRoaXMuaXNPbjtcbiAgICB9XG59XG4iXX0=