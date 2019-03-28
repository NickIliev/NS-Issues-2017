"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var all_mips_1 = require("../../all-mips");
var ArrowsViewModel = /** @class */ (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcnJvd3Mtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUM5RCwyQ0FBeUM7QUFFekM7SUFBcUMsbUNBQVU7SUFBL0M7UUFBQSxxRUFnQ0M7UUEvQlcsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQVFwQixnQkFBVSxHQUFXLEVBQUUsQ0FBQzs7SUF1QnBDLENBQUM7SUE5Qkcsc0JBQUksa0NBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBVSxHQUFXO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FIQTtJQU1ELHNCQUFJLHNDQUFTO2FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzthQUNELFVBQWMsR0FBVztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BSEE7SUFLTSxxQ0FBVyxHQUFsQjtRQUNJLGtCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sa0NBQVEsR0FBZjtRQUNJLGtCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sa0NBQVEsR0FBZjtRQUNJLGtCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxtQ0FBUyxHQUFoQjtRQUNJLGtCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoQ0QsQ0FBcUMsdUJBQVUsR0FnQzlDO0FBaENZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXJyb3dzVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMjQ7XHJcbiAgICBnZXQgc3BlZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xyXG4gICAgfVxyXG4gICAgc2V0IHNwZWVkKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBNYXRoLnJvdW5kKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdHVyblNwZWVkOiBudW1iZXIgPSAxNjtcclxuICAgIGdldCB0dXJuU3BlZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R1cm5TcGVlZDtcclxuICAgIH1cclxuICAgIHNldCB0dXJuU3BlZWQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90dXJuU3BlZWQgPSBNYXRoLnJvdW5kKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVGb3J3YXJkKCkge1xyXG4gICAgICAgIEFsbE1pcHMubW92ZUZvcndhcmQodGhpcy5zcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCYWNrKCkge1xyXG4gICAgICAgIEFsbE1pcHMubW92ZUJhY2sodGhpcy5zcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR1cm5MZWZ0KCkge1xyXG4gICAgICAgIEFsbE1pcHMudHVybkxlZnQodGhpcy5zcGVlZCwgdGhpcy50dXJuU3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0dXJuUmlnaHQoKSB7XHJcbiAgICAgICAgQWxsTWlwcy50dXJuUmlnaHQodGhpcy5zcGVlZCwgdGhpcy50dXJuU3BlZWQpO1xyXG4gICAgfVxyXG59Il19