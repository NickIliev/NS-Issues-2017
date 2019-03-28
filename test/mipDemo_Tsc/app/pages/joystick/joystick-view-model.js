"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var all_mips_1 = require("../../all-mips");
var JoyStickViewModel = /** @class */ (function (_super) {
    __extends(JoyStickViewModel, _super);
    function JoyStickViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turnSpeed = 0;
        _this.speed = 0;
        _this.loop = null;
        return _this;
    }
    JoyStickViewModel.prototype.startJoystick = function () {
        if (this.loop)
            return;
        this.startContinousMove();
    };
    JoyStickViewModel.prototype.stopJoystick = function () {
        this.set("turnSpeed", 0);
        this.set("speed", 0);
        this.stopContinousMove();
    };
    JoyStickViewModel.prototype.startContinousMove = function () {
        var _this = this;
        if (this.loop)
            return;
        this.loop = setInterval(function () {
            if (_this.speed > 1)
                _this.speed = 1;
            else if (_this.speed < -1)
                _this.speed = -1;
            if (_this.turnSpeed > 1)
                _this.turnSpeed = 1;
            else if (_this.turnSpeed < -1)
                _this.turnSpeed = -1;
            all_mips_1.AllMips.drive(_this.speed, _this.turnSpeed);
        }, 50);
    };
    JoyStickViewModel.prototype.stopContinousMove = function () {
        clearInterval(this.loop);
        this.loop = null;
    };
    return JoyStickViewModel;
}(observable_1.Observable));
exports.JoyStickViewModel = JoyStickViewModel;
exports.JoyStick = new JoyStickViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95c3RpY2stdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpveXN0aWNrLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBOEQ7QUFFOUQsMkNBQXlDO0FBRXpDO0lBQXVDLHFDQUFVO0lBQWpEO1FBQUEscUVBMkNDO1FBMUNXLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixVQUFJLEdBQVcsSUFBSSxDQUFDOztJQXVDaEMsQ0FBQztJQXJDVSx5Q0FBYSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLElBQUk7WUFDVCxPQUFPO1FBRVgsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLHdDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLDhDQUFrQixHQUF6QjtRQUFBLGlCQWlCQztRQWhCRyxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQ1QsT0FBTztRQUVYLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ3BCLElBQUksS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNkLElBQUksS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFcEIsSUFBSSxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQixJQUFJLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXhCLGtCQUFPLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSw2Q0FBaUIsR0FBeEI7UUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTCx3QkFBQztBQUFELENBQUMsQUEzQ0QsQ0FBdUMsdUJBQVUsR0EyQ2hEO0FBM0NZLDhDQUFpQjtBQTZDbkIsUUFBQSxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHsgQWxsTWlwcyB9IGZyb20gXCIuLi8uLi9hbGwtbWlwc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpveVN0aWNrVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBwcml2YXRlIHR1cm5TcGVlZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBsb29wOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGFydEpveXN0aWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvb3ApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydENvbnRpbm91c01vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcEpveXN0aWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0KFwidHVyblNwZWVkXCIsIDApO1xyXG4gICAgICAgIHRoaXMuc2V0KFwic3BlZWRcIiwgMCk7XHJcbiAgICAgICAgdGhpcy5zdG9wQ29udGlub3VzTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydENvbnRpbm91c01vdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9vcClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmxvb3AgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkID4gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNwZWVkIDwgLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gLTE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50dXJuU3BlZWQgPiAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuU3BlZWQgPSAxO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR1cm5TcGVlZCA8IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuU3BlZWQgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIEFsbE1pcHMuZHJpdmUodGhpcy5zcGVlZCwgdGhpcy50dXJuU3BlZWQpO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcENvbnRpbm91c01vdmUoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxvb3ApO1xyXG4gICAgICAgIHRoaXMubG9vcCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgdmFyIEpveVN0aWNrID0gbmV3IEpveVN0aWNrVmlld01vZGVsKCk7Il19