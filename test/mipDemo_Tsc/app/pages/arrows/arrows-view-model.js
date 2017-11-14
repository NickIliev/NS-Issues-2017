"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var all_mips_1 = require("../../all-mips");
var ArrowsViewModel = (function (_super) {
    __extends(ArrowsViewModel, _super);
    function ArrowsViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._speed = 24;
        _this._turnSpeed = 16;
        return _this;
    }
    Object.defineProperty(ArrowsViewModel.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (val) {
            this._speed = Math.round(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrowsViewModel.prototype, "turnSpeed", {
        get: function () {
            return this._turnSpeed;
        },
        set: function (val) {
            this._turnSpeed = Math.round(val);
        },
        enumerable: true,
        configurable: true
    });
    ArrowsViewModel.prototype.moveForward = function () {
        all_mips_1.AllMips.moveForward(this.speed);
    };
    ArrowsViewModel.prototype.moveBack = function () {
        all_mips_1.AllMips.moveBack(this.speed);
    };
    ArrowsViewModel.prototype.turnLeft = function () {
        all_mips_1.AllMips.turnLeft(this.speed, this.turnSpeed);
    };
    ArrowsViewModel.prototype.turnRight = function () {
        all_mips_1.AllMips.turnRight(this.speed, this.turnSpeed);
    };
    return ArrowsViewModel;
}(observable_1.Observable));
exports.ArrowsViewModel = ArrowsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcnJvd3Mtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywyQ0FBeUM7QUFFekM7SUFBcUMsbUNBQVU7SUFBL0M7UUFBQSxxRUFnQ0M7UUEvQlcsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQVFwQixnQkFBVSxHQUFXLEVBQUUsQ0FBQzs7SUF1QnBDLENBQUM7SUE5Qkcsc0JBQUksa0NBQUs7YUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFDRCxVQUFVLEdBQVc7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUhBO0lBTUQsc0JBQUksc0NBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFDRCxVQUFjLEdBQVc7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUhBO0lBS00scUNBQVcsR0FBbEI7UUFDSSxrQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDSSxrQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDSSxrQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sbUNBQVMsR0FBaEI7UUFDSSxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBaENELENBQXFDLHVCQUFVLEdBZ0M5QztBQWhDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcnJvd3NWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMjQ7XG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuICAgIHNldCBzcGVlZCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IE1hdGgucm91bmQodmFsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90dXJuU3BlZWQ6IG51bWJlciA9IDE2O1xuICAgIGdldCB0dXJuU3BlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90dXJuU3BlZWQ7XG4gICAgfVxuICAgIHNldCB0dXJuU3BlZWQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdHVyblNwZWVkID0gTWF0aC5yb3VuZCh2YWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRm9yd2FyZCgpIHtcbiAgICAgICAgQWxsTWlwcy5tb3ZlRm9yd2FyZCh0aGlzLnNwZWVkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZUJhY2soKSB7XG4gICAgICAgIEFsbE1pcHMubW92ZUJhY2sodGhpcy5zcGVlZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHR1cm5MZWZ0KCkge1xuICAgICAgICBBbGxNaXBzLnR1cm5MZWZ0KHRoaXMuc3BlZWQsIHRoaXMudHVyblNwZWVkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHVyblJpZ2h0KCkge1xuICAgICAgICBBbGxNaXBzLnR1cm5SaWdodCh0aGlzLnNwZWVkLCB0aGlzLnR1cm5TcGVlZCk7XG4gICAgfVxufSJdfQ==