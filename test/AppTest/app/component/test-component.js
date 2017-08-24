"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var TestModel = (function (_super) {
    __extends(TestModel, _super);
    function TestModel() {
        var _this = _super.call(this) || this;
        _this.myItems = [];
        _this.router = require('ui/frame').topmost();
        for (var i = 0; i < 100; i++) {
            _this.myItems.push("TEST" + i);
        }
        return _this;
    }
    TestModel.prototype.openPage = function () {
        // Navigate in the page Main.
        this.router.navigate({
            moduleName: "page/test/test-page",
        });
    };
    return TestModel;
}(observable_1.Observable));
exports.TestModel = TestModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUc3QztJQUErQiw2QkFBVTtJQUtyQztRQUFBLFlBQ0ksaUJBQU8sU0FLVjtRQVRPLGFBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBSzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7O0lBQ0wsQ0FBQztJQUVNLDRCQUFRLEdBQWY7UUFFSSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsVUFBVSxFQUFFLHFCQUFxQjtTQUNwQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQStCLHVCQUFVLEdBb0J4QztBQXBCWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwcml2YXRlIG15SXRlbXMgPSBbXTtcclxuICAgIHByaXZhdGUgcm91dGVyID0gcmVxdWlyZSgndWkvZnJhbWUnKS50b3Btb3N0KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChcIlRFU1RcIiArIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlblBhZ2UoKSB7XHJcblxyXG4gICAgICAgIC8vIE5hdmlnYXRlIGluIHRoZSBwYWdlIE1haW4uXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoe1xyXG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcInBhZ2UvdGVzdC90ZXN0LXBhZ2VcIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==