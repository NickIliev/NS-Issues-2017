"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var all_mips_1 = require("../all-mips");
var nativescript_accelerometer_1 = require("nativescript-accelerometer");
var AccelerometerComponent = (function () {
    function AccelerometerComponent() {
        this.turnSpeed = 0;
        this.speed = 0;
        this.gear = 1.5;
        this.accelerometerActive = false;
        this.loop = null;
    }
    AccelerometerComponent.prototype.startAccelerometer = function () {
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
    AccelerometerComponent.prototype.stopAccelerometer = function () {
        if (this.accelerometerActive) {
            nativescript_accelerometer_1.stopAccelerometerUpdates();
            this.accelerometerActive = false;
            this.stopContinousMove();
        }
    };
    AccelerometerComponent.prototype.startContinousMove = function () {
        var _this = this;
        if (this.loop)
            return;
        this.loop = setInterval(function () {
            all_mips_1.AllMips.drive(_this.speed, _this.turnSpeed);
        }, 50);
    };
    AccelerometerComponent.prototype.stopContinousMove = function () {
        clearInterval(this.loop);
        this.loop = null;
    };
    AccelerometerComponent.prototype.switchGear = function () {
        this.gear = 1 / this.gear;
    };
    AccelerometerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mip-accelerometer',
            templateUrl: './accelerometer.component.html'
        })
    ], AccelerometerComponent);
    return AccelerometerComponent;
}());
exports.AccelerometerComponent = AccelerometerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZWxlcm9tZXRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY2NlbGVyb21ldGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyx3Q0FBc0M7QUFDdEMseUVBQWdHO0FBT2hHO0lBTEE7UUFNWSxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUVYLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyxTQUFJLEdBQVcsSUFBSSxDQUFDO0lBMENoQyxDQUFDO0lBeENVLG1EQUFrQixHQUF6QjtRQUFBLGlCQVlDO1FBWEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLE1BQU0sQ0FBQztRQUVYLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFaEMsc0RBQXlCLENBQUMsVUFBQSxJQUFJO1lBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsa0NBQWtDO1lBQ3ZFLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMseUNBQXlDO1FBQzlFLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLGtEQUFpQixHQUF4QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IscURBQXdCLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBRWpDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRU0sbURBQWtCLEdBQXpCO1FBQUEsaUJBT0M7UUFORyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1YsTUFBTSxDQUFDO1FBRVgsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7WUFDcEIsa0JBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLGtEQUFpQixHQUF4QjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLDJDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBaERRLHNCQUFzQjtRQUxsQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGdDQUFnQztTQUNoRCxDQUFDO09BQ1csc0JBQXNCLENBaURsQztJQUFELDZCQUFDO0NBQUEsQUFqREQsSUFpREM7QUFqRFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uL2FsbC1taXBzXCI7XG5pbXBvcnQgeyBzdGFydEFjY2VsZXJvbWV0ZXJVcGRhdGVzLCBzdG9wQWNjZWxlcm9tZXRlclVwZGF0ZXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFjY2VsZXJvbWV0ZXJcIlxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbWlwLWFjY2VsZXJvbWV0ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY2NlbGVyb21ldGVyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBBY2NlbGVyb21ldGVyQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIHR1cm5TcGVlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZ2VhciA9IDEuNTtcblxuICAgIHByaXZhdGUgYWNjZWxlcm9tZXRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBsb29wOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXJ0QWNjZWxlcm9tZXRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYWNjZWxlcm9tZXRlckFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHN0YXJ0QWNjZWxlcm9tZXRlclVwZGF0ZXMoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cm5TcGVlZCA9IGRhdGEueCAqIHRoaXMuZ2VhcjsgLy8gbGVmdCAoMCB0byAtMSkgLyByaWdodCAoMCB0byAxKVxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGRhdGEueSAqIHRoaXMuZ2VhcjsgLy8gbGVhbiBmb3J3YXJkICgwIHRvIC0xKSAvIGJhY2sgKDAgdG8gMSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnN0YXJ0Q29udGlub3VzTW92ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wQWNjZWxlcm9tZXRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYWNjZWxlcm9tZXRlckFjdGl2ZSkge1xuICAgICAgICAgICAgc3RvcEFjY2VsZXJvbWV0ZXJVcGRhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJvbWV0ZXJBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5zdG9wQ29udGlub3VzTW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0Q29udGlub3VzTW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmxvb3AgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBBbGxNaXBzLmRyaXZlKHRoaXMuc3BlZWQsIHRoaXMudHVyblNwZWVkKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wQ29udGlub3VzTW92ZSgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxvb3ApO1xuICAgICAgICB0aGlzLmxvb3AgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzd2l0Y2hHZWFyKCkge1xuICAgICAgICB0aGlzLmdlYXIgPSAxIC8gdGhpcy5nZWFyO1xuICAgIH1cbn0iXX0=