"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var nativescript_accelerometer_1 = require("nativescript-accelerometer");
var all_mips_1 = require("../../all-mips");
var AccelerometerViewModel = (function (_super) {
    __extends(AccelerometerViewModel, _super);
    function AccelerometerViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turnSpeed = 0;
        _this.speed = 0;
        _this.gear = 1.5;
        _this.accelerometerActive = false;
        _this.loop = null;
        return _this;
    }
    AccelerometerViewModel.prototype.startAccelerometer = function () {
        var _this = this;
        if (this.accelerometerActive)
            return;
        this.accelerometerActive = true;
        nativescript_accelerometer_1.startAccelerometerUpdates(function (data) {
            _this.turnSpeed = data.x * _this.gear; // left (0 to -1) / right (0 to 1)
            _this.speed = data.y * _this.gear; // lean forward (0 to -1) / back (0 to 1)
        });
        this.startContinousMove();
    };
    AccelerometerViewModel.prototype.stopAccelerometer = function () {
        if (this.accelerometerActive) {
            nativescript_accelerometer_1.stopAccelerometerUpdates();
            this.accelerometerActive = false;
            this.stopContinousMove();
        }
    };
    AccelerometerViewModel.prototype.startContinousMove = function () {
        var _this = this;
        if (this.loop)
            return;
        this.loop = setInterval(function () {
            all_mips_1.AllMips.drive(_this.speed, _this.turnSpeed);
        }, 50);
    };
    AccelerometerViewModel.prototype.stopContinousMove = function () {
        clearInterval(this.loop);
        this.loop = null;
    };
    return AccelerometerViewModel;
}(observable_1.Observable));
exports.AccelerometerViewModel = AccelerometerViewModel;
exports.Accelerometer = new AccelerometerViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZWxlcm9tZXRlci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjZWxlcm9tZXRlci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHlFQUFnRztBQUVoRywyQ0FBeUM7QUFFekM7SUFBNEMsMENBQVU7SUFBdEQ7UUFBQSxxRUE2Q0M7UUE1Q1csZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUksR0FBRyxHQUFHLENBQUM7UUFFWCx5QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFckMsVUFBSSxHQUFXLElBQUksQ0FBQzs7SUFzQ2hDLENBQUM7SUFwQ1UsbURBQWtCLEdBQXpCO1FBQUEsaUJBWUM7UUFYRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDekIsTUFBTSxDQUFDO1FBRVgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUVoQyxzREFBeUIsQ0FBQyxVQUFBLElBQUk7WUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxrQ0FBa0M7WUFDdkUsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyx5Q0FBeUM7UUFDOUUsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sa0RBQWlCLEdBQXhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixxREFBd0IsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFFakMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFFTSxtREFBa0IsR0FBekI7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDVixNQUFNLENBQUM7UUFFWCxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNwQixrQkFBTyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sa0RBQWlCLEdBQXhCO1FBQ0ksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBN0NELENBQTRDLHVCQUFVLEdBNkNyRDtBQTdDWSx3REFBc0I7QUErQ3hCLFFBQUEsYUFBYSxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBzdGFydEFjY2VsZXJvbWV0ZXJVcGRhdGVzLCBzdG9wQWNjZWxlcm9tZXRlclVwZGF0ZXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFjY2VsZXJvbWV0ZXJcIlxuXG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XG5cbmV4cG9ydCBjbGFzcyBBY2NlbGVyb21ldGVyVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSB0dXJuU3BlZWQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGdlYXIgPSAxLjU7XG5cbiAgICBwcml2YXRlIGFjY2VsZXJvbWV0ZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgbG9vcDogbnVtYmVyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGFydEFjY2VsZXJvbWV0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5hY2NlbGVyb21ldGVyQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBzdGFydEFjY2VsZXJvbWV0ZXJVcGRhdGVzKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy50dXJuU3BlZWQgPSBkYXRhLnggKiB0aGlzLmdlYXI7IC8vIGxlZnQgKDAgdG8gLTEpIC8gcmlnaHQgKDAgdG8gMSlcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhLnkgKiB0aGlzLmdlYXI7IC8vIGxlYW4gZm9yd2FyZCAoMCB0byAtMSkgLyBiYWNrICgwIHRvIDEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5zdGFydENvbnRpbm91c01vdmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcEFjY2VsZXJvbWV0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUpIHtcbiAgICAgICAgICAgIHN0b3BBY2NlbGVyb21ldGVyVXBkYXRlcygpO1xuICAgICAgICAgICAgdGhpcy5hY2NlbGVyb21ldGVyQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcENvbnRpbm91c01vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydENvbnRpbm91c01vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvb3ApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5sb29wID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgQWxsTWlwcy5kcml2ZSh0aGlzLnNwZWVkLCB0aGlzLnR1cm5TcGVlZCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcENvbnRpbm91c01vdmUoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5sb29wKTtcbiAgICAgICAgdGhpcy5sb29wID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQWNjZWxlcm9tZXRlciA9IG5ldyBBY2NlbGVyb21ldGVyVmlld01vZGVsKCk7Il19