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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDs7QUFFckQsaUNBQWlDO0FBQ2pDLGdEQUFnRDtBQUVoRCxlQUFlO0FBQ2YsNEJBQTRCO0FBQzVCLDJCQUEyQjtBQUMzQiw2Q0FBNkM7QUFDN0MsS0FBSztBQUNMLGtEQUFrRDtBQUNsRCxxQkFBcUI7QUFFckIsd0RBQXdEO0FBRXhELHlCQUF5QjtBQUN6QixvREFBb0Q7QUFDcEQsUUFBUTtBQUNSLElBQUk7QUFFSixrREFBZ0Y7QUFDaEYsc0NBQXdDO0FBMEJ4QyxJQUFhLGNBQWM7SUF4QjNCO1FBMEJJLFNBQUksR0FBRyxLQUFLLENBQUM7SUFJakIsQ0FBQztJQUhHLDhCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGNBQWM7SUF4QjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxvUUFJVTtRQUNwQixVQUFVLEVBQUU7WUFDUixvQkFBTyxDQUFDLE9BQU8sRUFBRTtnQkFDYixrQkFBSyxDQUFDLFVBQVUsRUFBRSxrQkFBSyxDQUFDLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsNkRBQTZELEVBQUMsQ0FBQyxDQUFDO2dCQUM5SCxrQkFBSyxDQUFDLFFBQVEsRUFBRSxrQkFBSyxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUseURBQXlELEVBQUMsQ0FBQyxDQUFDO2dCQUN2SCx1QkFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7Z0JBQ3hCLHVCQUFVLENBQUMsb0JBQW9CLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM5RCx1QkFBVSxDQUFDLG9CQUFvQixFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNqRSxDQUFDO1NBQ0w7UUFDRCxNQUFNLEVBQUU7WUFDSixvRkFJQztTQUNKO0tBQ0osQ0FBQztHQUNXLGNBQWMsQ0FNMUI7QUFOWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vIGltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XHJcbi8vIGltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XHJcblxyXG4vLyBAQ29tcG9uZW50KHtcclxuLy8gICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbi8vICAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4vLyAgICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxyXG4vLyB9KVxyXG4vLyBleHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4vLyAgICAgaXRlbXM6IEl0ZW1bXTtcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XHJcblxyXG4vLyAgICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbi8vICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuaW1wb3J0IHt0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgc3RhdGUsIHRyYW5zaXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xyXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiYW5pbWF0aW9uLXN0YXRlc1wiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8c3RhY2stbGF5b3V0PlxyXG4gICAgICAgICAgICA8QnV0dG9uIGNsYXNzPVwiYnRuXCIgdGV4dD1cIlRvdWNoIG1lIVwiIFtAc3RhdGVdPVwiIGlzT24gPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZScgXCIgKHRhcCk9XCJvblRhcCgpXCI+PC9CdXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gdGV4dD1cIkRlYnVnIGJ1dHRvbiB0byBpbnRlcmFjdFwiICh0YXApPVwib25UYXAoKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgIDwvc3RhY2stbGF5b3V0PmAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcihcInN0YXRlXCIsIFtcclxuICAgICAgICAgICAgc3RhdGUoXCJpbmFjdGl2ZVwiLCBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJibHVlXCIsIHRyYW5zZm9ybTogXCJzY2FsZVgoMC41KSBzY2FsZVkoMC41KSB0cmFuc2xhdGVYKC0xMHB4KSB0cmFuc2xhdGVZKC0xMHB4KVwifSkpLFxyXG4gICAgICAgICAgICBzdGF0ZShcImFjdGl2ZVwiLCBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJyZWRcIiwgdHJhbnNmb3JtOiBcInNjYWxlWCgyKSBzY2FsZVkoMikgdHJhbnNsYXRlWCgxMDBweCkgdHJhbnNsYXRlWSgxMDBweClcIn0pKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW10pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLCBhbmltYXRlKCc2MDBtcyBlYXNlLWluLW91dCcpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignYWN0aXZlID0+IGluYWN0aXZlJywgYW5pbWF0ZSgnNjAwbXMgZWFzZS1pbi1vdXQnKSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIHN0eWxlczogW1xyXG4gICAgICAgIGAuYnRuIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBgXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCB7XHJcblxyXG4gICAgaXNPbiA9IGZhbHNlO1xyXG4gICAgb25UYXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc09uID0gIXRoaXMuaXNPbjtcclxuICAgIH1cclxufVxyXG4iXX0=