"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var all_mips_1 = require("../../all-mips");
var JoyStickViewModel = (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95c3RpY2stdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpveXN0aWNrLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsMkNBQXlDO0FBRXpDO0lBQXVDLHFDQUFVO0lBQWpEO1FBQUEscUVBMkNDO1FBMUNXLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixVQUFJLEdBQVcsSUFBSSxDQUFDOztJQXVDaEMsQ0FBQztJQXJDVSx5Q0FBYSxHQUFwQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDVixNQUFNLENBQUM7UUFFWCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sd0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sOENBQWtCLEdBQXpCO1FBQUEsaUJBaUJDO1FBaEJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDVixNQUFNLENBQUM7UUFFWCxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVwQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFeEIsa0JBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLDZDQUFpQixHQUF4QjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVMLHdCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUF1Qyx1QkFBVSxHQTJDaEQ7QUEzQ1ksOENBQWlCO0FBNkNuQixRQUFBLFFBQVEsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XG5cbmV4cG9ydCBjbGFzcyBKb3lTdGlja1ZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgdHVyblNwZWVkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGxvb3A6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhcnRKb3lzdGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLnN0YXJ0Q29udGlub3VzTW92ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wSm95c3RpY2soKSB7XG4gICAgICAgIHRoaXMuc2V0KFwidHVyblNwZWVkXCIsIDApO1xuICAgICAgICB0aGlzLnNldChcInNwZWVkXCIsIDApO1xuICAgICAgICB0aGlzLnN0b3BDb250aW5vdXNNb3ZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0Q29udGlub3VzTW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmxvb3AgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZCA+IDEpXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNwZWVkIDwgLTEpXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IC0xO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50dXJuU3BlZWQgPiAxKVxuICAgICAgICAgICAgICAgIHRoaXMudHVyblNwZWVkID0gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHVyblNwZWVkIDwgLTEpXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuU3BlZWQgPSAtMTtcblxuICAgICAgICAgICAgQWxsTWlwcy5kcml2ZSh0aGlzLnNwZWVkLCB0aGlzLnR1cm5TcGVlZCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcENvbnRpbm91c01vdmUoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5sb29wKTtcbiAgICAgICAgdGhpcy5sb29wID0gbnVsbDtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHZhciBKb3lTdGljayA9IG5ldyBKb3lTdGlja1ZpZXdNb2RlbCgpOyJdfQ==