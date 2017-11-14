"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var all_mips_1 = require("../all-mips");
var ArrowsComponent = (function () {
    function ArrowsComponent() {
        this._speed = 24;
        this._turnSpeed = 16;
    }
    Object.defineProperty(ArrowsComponent.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (val) {
            this._speed = Math.round(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrowsComponent.prototype, "turnSpeed", {
        get: function () {
            return this._turnSpeed;
        },
        set: function (val) {
            this._turnSpeed = Math.round(val);
        },
        enumerable: true,
        configurable: true
    });
    ArrowsComponent.prototype.moveForward = function () {
        all_mips_1.AllMips.moveForward(this.speed);
    };
    ArrowsComponent.prototype.moveBack = function () {
        all_mips_1.AllMips.moveBack(this.speed);
    };
    ArrowsComponent.prototype.turnLeft = function () {
        all_mips_1.AllMips.turnLeft(this.speed, this.turnSpeed);
    };
    ArrowsComponent.prototype.turnRight = function () {
        all_mips_1.AllMips.turnRight(this.speed, this.turnSpeed);
    };
    ArrowsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mip-arrows',
            templateUrl: './arrows.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ArrowsComponent);
    return ArrowsComponent;
}());
exports.ArrowsComponent = ArrowsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFycm93cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsd0NBQXNDO0FBT3RDO0lBZ0NFO1FBL0JRLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFRcEIsZUFBVSxHQUFXLEVBQUUsQ0FBQztJQXlCaEMsQ0FBQztJQWhDRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUNELFVBQVUsR0FBVztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7O09BSEE7SUFNRCxzQkFBSSxzQ0FBUzthQUFiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQUNELFVBQWMsR0FBVztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BSEE7SUFLTSxxQ0FBVyxHQUFsQjtRQUNFLGtCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sa0NBQVEsR0FBZjtRQUNFLGtCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sa0NBQVEsR0FBZjtRQUNFLGtCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxtQ0FBUyxHQUFoQjtRQUNFLGtCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUEvQlUsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSx5QkFBeUI7U0FDdkMsQ0FBQzs7T0FDVyxlQUFlLENBbUMzQjtJQUFELHNCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsbE1pcHMgfSBmcm9tIFwiLi4vYWxsLW1pcHNcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbWlwLWFycm93cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcnJvd3MuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEFycm93c0NvbXBvbmVudCB7XG4gIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAyNDtcbiAgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgfVxuICBzZXQgc3BlZWQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zcGVlZCA9IE1hdGgucm91bmQodmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgX3R1cm5TcGVlZDogbnVtYmVyID0gMTY7XG4gIGdldCB0dXJuU3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3R1cm5TcGVlZDtcbiAgfVxuICBzZXQgdHVyblNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdHVyblNwZWVkID0gTWF0aC5yb3VuZCh2YWwpO1xuICB9XG5cbiAgcHVibGljIG1vdmVGb3J3YXJkKCkge1xuICAgIEFsbE1pcHMubW92ZUZvcndhcmQodGhpcy5zcGVlZCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZUJhY2soKSB7XG4gICAgQWxsTWlwcy5tb3ZlQmFjayh0aGlzLnNwZWVkKTtcbiAgfVxuXG4gIHB1YmxpYyB0dXJuTGVmdCgpIHtcbiAgICBBbGxNaXBzLnR1cm5MZWZ0KHRoaXMuc3BlZWQsIHRoaXMudHVyblNwZWVkKTtcbiAgfVxuXG4gIHB1YmxpYyB0dXJuUmlnaHQoKSB7XG4gICAgQWxsTWlwcy50dXJuUmlnaHQodGhpcy5zcGVlZCwgdGhpcy50dXJuU3BlZWQpO1xuICB9XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cbn0iXX0=