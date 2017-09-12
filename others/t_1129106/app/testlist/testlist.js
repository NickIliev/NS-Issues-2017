"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var frame_1 = require("ui/frame");
var viewModel = /** @class */ (function (_super) {
    __extends(viewModel, _super);
    function viewModel(page) {
        var _this = _super.call(this) || this;
        _this.page = null;
        _this.dataItems = new observable_array_1.ObservableArray([{ description: "Item1" }]);
        _this.page = page;
        return _this;
    }
    viewModel.prototype.onBack = function () {
        frame_1.topmost().goBack();
    };
    ;
    return viewModel;
}(observable_1.Observable));
exports.viewModel = viewModel;
var thisViewModel;
function onLoaded(args) {
    var page = args.object;
    thisViewModel = new viewModel(page);
    page.bindingContext = thisViewModel;
}
exports.onLoaded = onLoaded;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0bGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywwREFBd0Q7QUFDeEQsa0NBQW1DO0FBR25DO0lBQStCLDZCQUFVO0lBSXZDLG1CQUFZLElBQVU7UUFBdEIsWUFDRSxpQkFBTyxTQUVSO1FBTk8sVUFBSSxHQUFTLElBQUksQ0FBQztRQUNsQixlQUFTLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBSWxFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztJQUNuQixDQUFDO0lBRU0sMEJBQU0sR0FBYjtRQUNFLGVBQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFBQSxDQUFDO0lBRUosZ0JBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBK0IsdUJBQVUsR0FheEM7QUFiWSw4QkFBUztBQWV0QixJQUFJLGFBQXdCLENBQUM7QUFDN0Isa0JBQXlCLElBQUk7SUFDM0IsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixhQUFhLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7QUFDdEMsQ0FBQztBQUpELDRCQUlDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gJ3VpL2ZyYW1lJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIHZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gIHByaXZhdGUgcGFnZTogUGFnZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBkYXRhSXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KFt7IGRlc2NyaXB0aW9uOiBcIkl0ZW0xXCIgfV0pO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYWdlOiBQYWdlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkJhY2soKSB7XHJcbiAgICB0b3Btb3N0KCkuZ29CYWNrKCk7XHJcbiAgfTtcclxuXHJcbn1cclxuXHJcbnZhciB0aGlzVmlld01vZGVsOiB2aWV3TW9kZWw7XHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzKSB7XHJcbiAgdmFyIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICB0aGlzVmlld01vZGVsID0gbmV3IHZpZXdNb2RlbChwYWdlKTtcclxuICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdGhpc1ZpZXdNb2RlbDtcclxufTtcclxuIl19