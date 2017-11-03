"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var MyListSelectorModalViewComponent = /** @class */ (function () {
    function MyListSelectorModalViewComponent(_params) {
        this._params = _params;
        this._title = _params.context.title;
        this._selectedIndex = _params.context.selectedIndex;
        this._items = [];
        for (var i = 0; i < _params.context.items.length; i++) {
            this._items.push({
                value: _params.context.items[i],
                isSelected: i === this._selectedIndex ? true : false
            });
        }
    }
    MyListSelectorModalViewComponent.prototype.onItemSelected = function (args) {
        var oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;
        var newSelectedItem = this._items[args.index];
        newSelectedItem.isSelected = true;
        this._selectedIndex = args.index;
        this._params.closeCallback(newSelectedItem.value);
    };
    MyListSelectorModalViewComponent.prototype.onCancelButtonTap = function () {
        this._params.closeCallback(null);
    };
    Object.defineProperty(MyListSelectorModalViewComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyListSelectorModalViewComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    MyListSelectorModalViewComponent = __decorate([
        core_1.Component({
            selector: "MyListSelectorModalView",
            moduleId: module.id,
            templateUrl: "./my-list-selector-modal-view.component.html",
            styleUrls: ["./my-list-selector-modal-view.component.css"]
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], MyListSelectorModalViewComponent);
    return MyListSelectorModalViewComponent;
}());
exports.MyListSelectorModalViewComponent = MyListSelectorModalViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktbGlzdC1zZWxlY3Rvci1tb2RhbC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWxpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsa0VBQXNFO0FBUXRFO0lBS0ksMENBQW9CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUVwRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNiLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLFVBQVUsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsS0FBSzthQUN2RCxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVELHlEQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekQsZUFBZSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbkMsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsZUFBZSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsNERBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHNCQUFJLG1EQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1EQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQXZDUSxnQ0FBZ0M7UUFONUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsU0FBUyxFQUFFLENBQUMsNkNBQTZDLENBQUM7U0FDN0QsQ0FBQzt5Q0FNK0IsZ0NBQWlCO09BTHJDLGdDQUFnQyxDQXdDNUM7SUFBRCx1Q0FBQztDQUFBLEFBeENELElBd0NDO0FBeENZLDRFQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTXlMaXN0U2VsZWN0b3JNb2RhbFZpZXdcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXktbGlzdC1zZWxlY3Rvci1tb2RhbC12aWV3LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL215LWxpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE15TGlzdFNlbGVjdG9yTW9kYWxWaWV3Q29tcG9uZW50IHtcbiAgICBwcml2YXRlIF9pdGVtczogQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fdGl0bGUgPSBfcGFyYW1zLmNvbnRleHQudGl0bGU7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBfcGFyYW1zLmNvbnRleHQuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9wYXJhbXMuY29udGV4dC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IF9wYXJhbXMuY29udGV4dC5pdGVtc1tpXSxcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBpID09PSB0aGlzLl9zZWxlY3RlZEluZGV4ID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVNlbGVjdGVkKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb2xkU2VsZWN0ZWRJdGVtID0gdGhpcy5faXRlbXNbdGhpcy5fc2VsZWN0ZWRJbmRleF07XG4gICAgICAgIG9sZFNlbGVjdGVkSXRlbS5pc1NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRJdGVtID0gdGhpcy5faXRlbXNbYXJncy5pbmRleF07XG4gICAgICAgIG5ld1NlbGVjdGVkSXRlbS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGFyZ3MuaW5kZXg7XG5cbiAgICAgICAgdGhpcy5fcGFyYW1zLmNsb3NlQ2FsbGJhY2sobmV3U2VsZWN0ZWRJdGVtLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbEJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFyYW1zLmNsb3NlQ2FsbGJhY2sobnVsbCk7XG4gICAgfVxuXG4gICAgZ2V0IGl0ZW1zKCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICB9XG59XG4iXX0=