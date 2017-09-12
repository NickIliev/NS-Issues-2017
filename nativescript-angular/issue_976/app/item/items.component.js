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
        console.log("removing the border-radius (in app.css) will allow the content to show up in iOS");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBVTFDO0lBTEE7UUFPSSxVQUFLLEdBQVksS0FBSyxDQUFDO0lBTzNCLENBQUM7SUFMRyx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQywyRUFBMkU7UUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFSUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO09BQ1csY0FBYyxDQVMxQjtJQUFELHFCQUFDO0NBQUEsQUFURCxJQVNDO0FBVFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQge1xuXG4gICAgaXNSZWc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uQ2hlY2tlZENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5pc1JlZyA9ICF0aGlzLmlzUmVnOyAvL3JlbW92aW5nIHRoZSBib3JkZXItcmFkaXVzIChpbiBhcHAuY3NzKSB3aWxsIGFsbG93IHRoZSBjb250ZW50IHRvIHNob3cgdXBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc1JlZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZpbmcgdGhlIGJvcmRlci1yYWRpdXMgKGluIGFwcC5jc3MpIHdpbGwgYWxsb3cgdGhlIGNvbnRlbnQgdG8gc2hvdyB1cCBpbiBpT1NcIik7XG4gICAgfVxufSJdfQ==