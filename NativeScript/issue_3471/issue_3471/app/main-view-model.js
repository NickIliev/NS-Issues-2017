"use strict";
var observable_1 = require("data/observable");
var frame = require("ui/frame");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        return _super.call(this) || this;
    }
    HelloWorldModel.prototype.goToSecond = function () {
        frame.topmost().navigate("sub-page");
    };
    HelloWorldModel.prototype.goBack = function () {
        console.log("goBack");
        frame.goBack();
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFDM0MsZ0NBQWtDO0FBRWxDO0lBQXFDLG1DQUFVO0lBRTNDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBR00sb0NBQVUsR0FBakI7UUFDSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxnQ0FBTSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUFxQyx1QkFBVSxHQWdCOUM7QUFoQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tIFwidWkvZnJhbWVcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZ29Ub1NlY29uZCgpIHtcbiAgICAgICAgZnJhbWUudG9wbW9zdCgpLm5hdmlnYXRlKFwic3ViLXBhZ2VcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJnb0JhY2tcIik7XG4gICAgICAgIGZyYW1lLmdvQmFjaygpO1xuICAgIH1cblxufSJdfQ==