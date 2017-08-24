"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var ItemsComponent = (function () {
    function ItemsComponent(page) {
        this._page = page;
    }
    ItemsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var label = _this._page.getViewById("label1");
            // label.android will be undefined on android
            console.log("ngAfterViewInit Android: " + label.android + " iOS: " + label.ios);
        }, 1);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "lifecycle",
        moduleId: module.id,
        template: "\n        <GridLayout columns=\"auto\" rows=\"auto\">\n            <Label id=\"label1\" col=\"0\" row=\"0\"></Label>\n        </GridLayout>\n    "
    }),
    __metadata("design:paramtypes", [page_1.Page])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlEO0FBQ3pELGlEQUFnRDtBQVloRCxJQUFhLGNBQWM7SUFJdkIsd0JBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU0sd0NBQWUsR0FBdEI7UUFBQSxpQkFRQztRQU5HLFVBQVUsQ0FBQztZQUNQLElBQUksS0FBSyxHQUFVLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFRLFFBQVEsQ0FBQyxDQUFDO1lBQzNELDZDQUE2QztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFVixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGNBQWM7SUFUMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsbUpBSVQ7S0FDSixDQUFDO3FDQUtvQixXQUFJO0dBSmIsY0FBYyxDQWlCMUI7QUFqQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibGlmZWN5Y2xlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0b1wiIHJvd3M9XCJhdXRvXCI+XG4gICAgICAgICAgICA8TGFiZWwgaWQ9XCJsYWJlbDFcIiBjb2w9XCIwXCIgcm93PVwiMFwiPjwvTGFiZWw+XG4gICAgICAgIDwvR3JpZExheW91dD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBwcml2YXRlIF9wYWdlOiBQYWdlO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLl9wYWdlID0gcGFnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWw6IExhYmVsID0gdGhpcy5fcGFnZS5nZXRWaWV3QnlJZDxMYWJlbD4oXCJsYWJlbDFcIik7XG4gICAgICAgICAgICAvLyBsYWJlbC5hbmRyb2lkIHdpbGwgYmUgdW5kZWZpbmVkIG9uIGFuZHJvaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmdBZnRlclZpZXdJbml0IEFuZHJvaWQ6IFwiICsgbGFiZWwuYW5kcm9pZCArIFwiIGlPUzogXCIgKyBsYWJlbC5pb3MpO1xuICAgICAgICB9LCAxKTtcblxuICAgIH1cbn0iXX0=