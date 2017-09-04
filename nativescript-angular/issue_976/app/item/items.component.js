"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.isReg = false;
    }
    ItemsComponent.prototype.onCheckedChange = function () {
        this.isReg = !this.isReg; //removing the border-radius (in app.css) will allow the content to show up
        console.log(this.isReg);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        })
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBVTFDO0lBTEE7UUFPSSxVQUFLLEdBQVksS0FBSyxDQUFDO0lBTTNCLENBQUM7SUFKRyx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQywyRUFBMkU7UUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQVBRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7T0FDVyxjQUFjLENBUTFCO0lBQUQscUJBQUM7Q0FBQSxBQVJELElBUUM7QUFSWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCB7XG5cbiAgICBpc1JlZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25DaGVja2VkQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmlzUmVnID0gIXRoaXMuaXNSZWc7IC8vcmVtb3ZpbmcgdGhlIGJvcmRlci1yYWRpdXMgKGluIGFwcC5jc3MpIHdpbGwgYWxsb3cgdGhlIGNvbnRlbnQgdG8gc2hvdyB1cFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzUmVnKTtcbiAgICB9XG59Il19