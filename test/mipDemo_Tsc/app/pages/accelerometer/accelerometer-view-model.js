"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var nativescript_accelerometer_1 = require("nativescript-accelerometer");
var all_mips_1 = require("../../all-mips");
var AccelerometerViewModel = /** @class */ (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZWxlcm9tZXRlci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjZWxlcm9tZXRlci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELHlFQUFnRztBQUVoRywyQ0FBeUM7QUFFekM7SUFBNEMsMENBQVU7SUFBdEQ7UUFBQSxxRUE2Q0M7UUE1Q1csZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUksR0FBRyxHQUFHLENBQUM7UUFFWCx5QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFckMsVUFBSSxHQUFXLElBQUksQ0FBQzs7SUFzQ2hDLENBQUM7SUFwQ1UsbURBQWtCLEdBQXpCO1FBQUEsaUJBWUM7UUFYRyxJQUFJLElBQUksQ0FBQyxtQkFBbUI7WUFDeEIsT0FBTztRQUVYLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFaEMsc0RBQXlCLENBQUMsVUFBQSxJQUFJO1lBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsa0NBQWtDO1lBQ3ZFLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMseUNBQXlDO1FBQzlFLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLGtEQUFpQixHQUF4QjtRQUNJLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLHFEQUF3QixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUVqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFTSxtREFBa0IsR0FBekI7UUFBQSxpQkFPQztRQU5HLElBQUksSUFBSSxDQUFDLElBQUk7WUFDVCxPQUFPO1FBRVgsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7WUFDcEIsa0JBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLGtEQUFpQixHQUF4QjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQTdDRCxDQUE0Qyx1QkFBVSxHQTZDckQ7QUE3Q1ksd0RBQXNCO0FBK0N4QixRQUFBLGFBQWEsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IHN0YXJ0QWNjZWxlcm9tZXRlclVwZGF0ZXMsIHN0b3BBY2NlbGVyb21ldGVyVXBkYXRlcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYWNjZWxlcm9tZXRlclwiXHJcblxyXG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjZWxlcm9tZXRlclZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgcHJpdmF0ZSB0dXJuU3BlZWQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBnZWFyID0gMS41O1xyXG5cclxuICAgIHByaXZhdGUgYWNjZWxlcm9tZXRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgbG9vcDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhcnRBY2NlbGVyb21ldGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NlbGVyb21ldGVyQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgc3RhcnRBY2NlbGVyb21ldGVyVXBkYXRlcyhkYXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy50dXJuU3BlZWQgPSBkYXRhLnggKiB0aGlzLmdlYXI7IC8vIGxlZnQgKDAgdG8gLTEpIC8gcmlnaHQgKDAgdG8gMSlcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGRhdGEueSAqIHRoaXMuZ2VhcjsgLy8gbGVhbiBmb3J3YXJkICgwIHRvIC0xKSAvIGJhY2sgKDAgdG8gMSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0Q29udGlub3VzTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wQWNjZWxlcm9tZXRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5hY2NlbGVyb21ldGVyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHN0b3BBY2NlbGVyb21ldGVyVXBkYXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcENvbnRpbm91c01vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0Q29udGlub3VzTW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5sb29wKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMubG9vcCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgQWxsTWlwcy5kcml2ZSh0aGlzLnNwZWVkLCB0aGlzLnR1cm5TcGVlZCk7XHJcbiAgICAgICAgfSwgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wQ29udGlub3VzTW92ZSgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMubG9vcCk7XHJcbiAgICAgICAgdGhpcy5sb29wID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBY2NlbGVyb21ldGVyID0gbmV3IEFjY2VsZXJvbWV0ZXJWaWV3TW9kZWwoKTsiXX0=