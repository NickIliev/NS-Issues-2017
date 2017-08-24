Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.showLabel = false;
    }
    ItemsComponent.prototype.show = function () {
        this.showLabel = true;
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        template: "\n    <StackLayout>\n      <Label text=\"I\u2019m a label!\" [class.visible]=\"showLabel\"></Label>\n      <Button text=\"Show Label\" (tap)=\"show()\"></Button>\n    </StackLayout>\n  "
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFXMUMsSUFBYSxjQUFjO0lBVDNCO1FBVUUsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUtwQixDQUFDO0lBSEMsNkJBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksY0FBYztJQVQxQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLDJMQUtUO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FNMUI7QUFOWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgdGVtcGxhdGU6IGBcbiAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICA8TGFiZWwgdGV4dD1cIknigJltIGEgbGFiZWwhXCIgW2NsYXNzLnZpc2libGVdPVwic2hvd0xhYmVsXCI+PC9MYWJlbD5cbiAgICAgIDxCdXR0b24gdGV4dD1cIlNob3cgTGFiZWxcIiAodGFwKT1cInNob3coKVwiPjwvQnV0dG9uPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQge1xuICBzaG93TGFiZWwgPSBmYWxzZTtcblxuICBzaG93KCkge1xuICAgIHRoaXMuc2hvd0xhYmVsID0gdHJ1ZTtcbiAgfVxufVxuIl19