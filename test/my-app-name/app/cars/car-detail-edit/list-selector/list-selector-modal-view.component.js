"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var ListSelectorModalViewComponent = (function () {
    function ListSelectorModalViewComponent(_params) {
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
    ListSelectorModalViewComponent.prototype.onItemSelected = function (args) {
        var oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;
        var newSelectedItem = this._items[args.index];
        newSelectedItem.isSelected = true;
        this._selectedIndex = args.index;
        this._params.closeCallback(newSelectedItem.value);
    };
    ListSelectorModalViewComponent.prototype.onCancelButtonTap = function () {
        this._params.closeCallback(null);
    };
    Object.defineProperty(ListSelectorModalViewComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListSelectorModalViewComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    return ListSelectorModalViewComponent;
}());
ListSelectorModalViewComponent = __decorate([
    core_1.Component({
        selector: "ListSelectorModalView",
        moduleId: module.id,
        templateUrl: "./list-selector-modal-view.component.html",
        styleUrls: ["./list-selector-modal-view.component.css"]
    }),
    __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
], ListSelectorModalViewComponent);
exports.ListSelectorModalViewComponent = ListSelectorModalViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rvci1tb2RhbC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsa0VBQXNFO0FBUXRFLElBQWEsOEJBQThCO0lBS3ZDLHdDQUFvQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixVQUFVLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEtBQUs7YUFDdkQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFRCx1REFBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELGVBQWUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELGVBQWUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVqQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDBEQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxzQkFBSSxpREFBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFDTCxxQ0FBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksOEJBQThCO0lBTjFDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO0tBQzFELENBQUM7cUNBTStCLGdDQUFpQjtHQUxyQyw4QkFBOEIsQ0F3QzFDO0FBeENZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJMaXN0U2VsZWN0b3JNb2RhbFZpZXdcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2xpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBfaXRlbXM6IEFycmF5PGFueT47XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF90aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IF9wYXJhbXMuY29udGV4dC50aXRsZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gX3BhcmFtcy5jb250ZXh0LnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfcGFyYW1zLmNvbnRleHQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3BhcmFtcy5jb250ZXh0Lml0ZW1zW2ldLFxyXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogaSA9PT0gdGhpcy5fc2VsZWN0ZWRJbmRleCA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtU2VsZWN0ZWQoYXJncyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkSXRlbSA9IHRoaXMuX2l0ZW1zW3RoaXMuX3NlbGVjdGVkSW5kZXhdO1xyXG4gICAgICAgIG9sZFNlbGVjdGVkSXRlbS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1NlbGVjdGVkSXRlbSA9IHRoaXMuX2l0ZW1zW2FyZ3MuaW5kZXhdO1xyXG4gICAgICAgIG5ld1NlbGVjdGVkSXRlbS5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gYXJncy5pbmRleDtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFyYW1zLmNsb3NlQ2FsbGJhY2sobmV3U2VsZWN0ZWRJdGVtLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbmNlbEJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXJhbXMuY2xvc2VDYWxsYmFjayhudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXRlbXMoKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcclxuICAgIH1cclxufVxyXG4iXX0=