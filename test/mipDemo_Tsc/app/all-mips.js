"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var AllMipsModel = /** @class */ (function (_super) {
    __extends(AllMipsModel, _super);
    function AllMipsModel() {
        var _this = _super.call(this) || this;
        _this.mips = [];
        return _this;
    }
    AllMipsModel.prototype.addMipDevice = function (mip) {
        this.mips.push(mip);
    };
    AllMipsModel.prototype.removeMip = function (mip) {
        var index = this.mips.indexOf(mip);
        if (index > -1)
            this.mips.splice(index, 1);
    };
    AllMipsModel.prototype.drive = function (speed, turnSpeed) {
        this.mips.forEach(function (mip) {
            mip.drive(speed, turnSpeed, false);
        });
    };
    AllMipsModel.prototype.moveForward = function (speed) {
        this.mips.forEach(function (mip) {
            mip.moveForward(speed);
        });
    };
    AllMipsModel.prototype.moveBack = function (speed) {
        this.mips.forEach(function (mip) {
            mip.moveBack(speed);
        });
    };
    AllMipsModel.prototype.turnLeft = function (speed, turnSpeed) {
        this.mips.forEach(function (mip) {
            mip.turnLeft(speed, turnSpeed);
        });
    };
    AllMipsModel.prototype.turnRight = function (speed, turnSpeed) {
        this.mips.forEach(function (mip) {
            mip.turnRight(speed, turnSpeed);
        });
    };
    AllMipsModel.prototype.setVolume = function (val) {
        this.mips.forEach(function (mip) {
            mip.mipController.setVolume(val);
        });
    };
    AllMipsModel.prototype.playOneSound = function (soundIndex, soundDelay, soundRepeat) {
        this.mips.forEach(function (mip) {
            mip.mipController.playOneSound(soundIndex, soundDelay, soundRepeat);
        });
    };
    // call like this AllMips.setHeadLED(HeadLightState.On, HeadLightState.Off, HeadLightState.FastBlink, HeadLightState.SlowBlink);
    AllMipsModel.prototype.setHeadLED = function (light1, light2, light3, light4) {
        this.mips.forEach(function (mip) {
            mip.mipController.setHeadLED(light1, light2, light3, light4);
        });
    };
    AllMipsModel.prototype.setChestLED = function (red, green, blue) {
        this.mips.forEach(function (mip) {
            mip.mipController.setChestLED(red, green, blue);
        });
    };
    return AllMipsModel;
}(observable_1.Observable));
exports.AllMipsModel = AllMipsModel;
exports.AllMips = new AllMipsModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1pcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGwtbWlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQU05RDtJQUFrQyxnQ0FBVTtJQUd4QztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUpPLFVBQUksR0FBcUIsRUFBRSxDQUFDOztJQUlwQyxDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLEdBQWM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxHQUFjO1FBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sNEJBQUssR0FBWixVQUFhLEtBQWEsRUFBRSxTQUFpQjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGtDQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sK0JBQVEsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsS0FBYSxFQUFFLFNBQWlCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsU0FBaUI7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLEdBQVc7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLFVBQWtCLEVBQUUsVUFBa0IsRUFBRSxXQUFtQjtRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnSUFBZ0k7SUFDekgsaUNBQVUsR0FBakIsVUFBa0IsTUFBc0IsRUFBRSxNQUFzQixFQUFFLE1BQXNCLEVBQUUsTUFBc0I7UUFDNUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNNLGtDQUFXLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUF2RUQsQ0FBa0MsdUJBQVUsR0F1RTNDO0FBdkVZLG9DQUFZO0FBeUVkLFFBQUEsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgTWlwRGV2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC1kZXZpY2VcIjtcclxuaW1wb3J0IHsgTWlwQ29udHJvbGxlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWlwLWJsZS9taXAtY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBIZWFkTGlnaHRTdGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWlwLWJsZS9taXAtdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbGxNaXBzTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIHByaXZhdGUgbWlwczogQXJyYXk8TWlwRGV2aWNlPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTWlwRGV2aWNlKG1pcDogTWlwRGV2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5taXBzLnB1c2gobWlwKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVNaXAobWlwOiBNaXBEZXZpY2UpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm1pcHMuaW5kZXhPZihtaXApO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSlcclxuICAgICAgICAgICAgdGhpcy5taXBzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyaXZlKHNwZWVkOiBudW1iZXIsIHR1cm5TcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xyXG4gICAgICAgICAgICBtaXAuZHJpdmUoc3BlZWQsIHR1cm5TcGVlZCwgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVGb3J3YXJkKHNwZWVkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1pcHMuZm9yRWFjaCgobWlwKSA9PiB7XHJcbiAgICAgICAgICAgIG1pcC5tb3ZlRm9yd2FyZChzcGVlZCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJhY2soc3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcclxuICAgICAgICAgICAgbWlwLm1vdmVCYWNrKHNwZWVkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0dXJuTGVmdChzcGVlZDogbnVtYmVyLCB0dXJuU3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcclxuICAgICAgICAgICAgbWlwLnR1cm5MZWZ0KHNwZWVkLCB0dXJuU3BlZWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR1cm5SaWdodChzcGVlZDogbnVtYmVyLCB0dXJuU3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcclxuICAgICAgICAgICAgbWlwLnR1cm5SaWdodChzcGVlZCwgdHVyblNwZWVkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRWb2x1bWUodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1pcHMuZm9yRWFjaCgobWlwKSA9PiB7XHJcbiAgICAgICAgICAgIG1pcC5taXBDb250cm9sbGVyLnNldFZvbHVtZSh2YWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlPbmVTb3VuZChzb3VuZEluZGV4OiBudW1iZXIsIHNvdW5kRGVsYXk6IG51bWJlciwgc291bmRSZXBlYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcclxuICAgICAgICAgICAgbWlwLm1pcENvbnRyb2xsZXIucGxheU9uZVNvdW5kKHNvdW5kSW5kZXgsIHNvdW5kRGVsYXksIHNvdW5kUmVwZWF0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbGwgbGlrZSB0aGlzIEFsbE1pcHMuc2V0SGVhZExFRChIZWFkTGlnaHRTdGF0ZS5PbiwgSGVhZExpZ2h0U3RhdGUuT2ZmLCBIZWFkTGlnaHRTdGF0ZS5GYXN0QmxpbmssIEhlYWRMaWdodFN0YXRlLlNsb3dCbGluayk7XHJcbiAgICBwdWJsaWMgc2V0SGVhZExFRChsaWdodDE6IEhlYWRMaWdodFN0YXRlLCBsaWdodDI6IEhlYWRMaWdodFN0YXRlLCBsaWdodDM6IEhlYWRMaWdodFN0YXRlLCBsaWdodDQ6IEhlYWRMaWdodFN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xyXG4gICAgICAgICAgICBtaXAubWlwQ29udHJvbGxlci5zZXRIZWFkTEVEKGxpZ2h0MSwgbGlnaHQyLCBsaWdodDMsIGxpZ2h0NCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDaGVzdExFRChyZWQ6IG51bWJlciwgZ3JlZW46IG51bWJlciwgYmx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xyXG4gICAgICAgICAgICBtaXAubWlwQ29udHJvbGxlci5zZXRDaGVzdExFRChyZWQsIGdyZWVuLCBibHVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIEFsbE1pcHMgPSBuZXcgQWxsTWlwc01vZGVsKCk7Il19