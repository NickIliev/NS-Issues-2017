"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var observable_1 = require("data/observable");
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(page) {
        var _this = _super.call(this) || this;
        _this.page = page;
        return _this;
    }
    ViewModel.prototype.testFormTap = function () {
        frame_1.topmost().navigate({ moduleName: "testform/testform" });
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var viewModel;
function pageLoaded(args) {
    var page = args.object;
    viewModel = new ViewModel(page);
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBbUM7QUFFbkMsOENBQTZDO0FBRTdDO0lBQStCLDZCQUFVO0lBR3ZDLG1CQUFZLElBQUk7UUFBaEIsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ25CLENBQUM7SUFFTSwrQkFBVyxHQUFsQjtRQUNFLGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVILGdCQUFDO0FBQUQsQ0FBQyxBQVpELENBQStCLHVCQUFVLEdBWXhDO0FBWlksOEJBQVM7QUFjdEIsSUFBSSxTQUFvQixDQUFDO0FBQ3pCLG9CQUEyQixJQUFJO0lBQzdCLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLENBQUM7QUFKRCxnQ0FJQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSAndWkvZnJhbWUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gIHBhZ2U6IFBhZ2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhZ2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlc3RGb3JtVGFwKCkge1xyXG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKHsgbW9kdWxlTmFtZTogXCJ0ZXN0Zm9ybS90ZXN0Zm9ybVwiIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbnZhciB2aWV3TW9kZWw6IFZpZXdNb2RlbDtcclxuZXhwb3J0IGZ1bmN0aW9uIHBhZ2VMb2FkZWQoYXJncykge1xyXG4gIHZhciBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgdmlld01vZGVsID0gbmV3IFZpZXdNb2RlbChwYWdlKTtcclxuICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld01vZGVsO1xyXG59O1xyXG5cclxuIl19