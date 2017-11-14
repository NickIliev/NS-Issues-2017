"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var AllMipsModel = (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1pcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGwtbWlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQU03QztJQUFrQyxnQ0FBVTtJQUd4QztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUpPLFVBQUksR0FBcUIsRUFBRSxDQUFDOztJQUlwQyxDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLEdBQWM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxHQUFjO1FBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sNEJBQUssR0FBWixVQUFhLEtBQWEsRUFBRSxTQUFpQjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGtDQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sK0JBQVEsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsS0FBYSxFQUFFLFNBQWlCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsU0FBaUI7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLEdBQVc7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLFVBQWtCLEVBQUUsVUFBa0IsRUFBRSxXQUFtQjtRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnSUFBZ0k7SUFDekgsaUNBQVUsR0FBakIsVUFBa0IsTUFBc0IsRUFBRSxNQUFzQixFQUFFLE1BQXNCLEVBQUUsTUFBc0I7UUFDNUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNNLGtDQUFXLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUF2RUQsQ0FBa0MsdUJBQVUsR0F1RTNDO0FBdkVZLG9DQUFZO0FBeUVkLFFBQUEsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgTWlwRGV2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC1kZXZpY2VcIjtcbmltcG9ydCB7IE1pcENvbnRyb2xsZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1pcC1ibGUvbWlwLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEhlYWRMaWdodFN0YXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC10eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQWxsTWlwc01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBtaXBzOiBBcnJheTxNaXBEZXZpY2U+ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBhZGRNaXBEZXZpY2UobWlwOiBNaXBEZXZpY2UpIHtcbiAgICAgICAgdGhpcy5taXBzLnB1c2gobWlwKTtcbiAgICB9XG5cbiAgICByZW1vdmVNaXAobWlwOiBNaXBEZXZpY2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5taXBzLmluZGV4T2YobWlwKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgICAgICAgIHRoaXMubWlwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcml2ZShzcGVlZDogbnVtYmVyLCB0dXJuU3BlZWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1pcHMuZm9yRWFjaCgobWlwKSA9PiB7XG4gICAgICAgICAgICBtaXAuZHJpdmUoc3BlZWQsIHR1cm5TcGVlZCwgZmFsc2UpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRm9yd2FyZChzcGVlZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcbiAgICAgICAgICAgIG1pcC5tb3ZlRm9yd2FyZChzcGVlZCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVCYWNrKHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xuICAgICAgICAgICAgbWlwLm1vdmVCYWNrKHNwZWVkKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdHVybkxlZnQoc3BlZWQ6IG51bWJlciwgdHVyblNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xuICAgICAgICAgICAgbWlwLnR1cm5MZWZ0KHNwZWVkLCB0dXJuU3BlZWQpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyB0dXJuUmlnaHQoc3BlZWQ6IG51bWJlciwgdHVyblNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xuICAgICAgICAgICAgbWlwLnR1cm5SaWdodChzcGVlZCwgdHVyblNwZWVkKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Vm9sdW1lKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubWlwcy5mb3JFYWNoKChtaXApID0+IHtcbiAgICAgICAgICAgIG1pcC5taXBDb250cm9sbGVyLnNldFZvbHVtZSh2YWwpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5T25lU291bmQoc291bmRJbmRleDogbnVtYmVyLCBzb3VuZERlbGF5OiBudW1iZXIsIHNvdW5kUmVwZWF0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xuICAgICAgICAgICAgbWlwLm1pcENvbnRyb2xsZXIucGxheU9uZVNvdW5kKHNvdW5kSW5kZXgsIHNvdW5kRGVsYXksIHNvdW5kUmVwZWF0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBjYWxsIGxpa2UgdGhpcyBBbGxNaXBzLnNldEhlYWRMRUQoSGVhZExpZ2h0U3RhdGUuT24sIEhlYWRMaWdodFN0YXRlLk9mZiwgSGVhZExpZ2h0U3RhdGUuRmFzdEJsaW5rLCBIZWFkTGlnaHRTdGF0ZS5TbG93QmxpbmspO1xuICAgIHB1YmxpYyBzZXRIZWFkTEVEKGxpZ2h0MTogSGVhZExpZ2h0U3RhdGUsIGxpZ2h0MjogSGVhZExpZ2h0U3RhdGUsIGxpZ2h0MzogSGVhZExpZ2h0U3RhdGUsIGxpZ2h0NDogSGVhZExpZ2h0U3RhdGUpIHtcbiAgICAgICAgdGhpcy5taXBzLmZvckVhY2goKG1pcCkgPT4ge1xuICAgICAgICAgICAgbWlwLm1pcENvbnRyb2xsZXIuc2V0SGVhZExFRChsaWdodDEsIGxpZ2h0MiwgbGlnaHQzLCBsaWdodDQpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBwdWJsaWMgc2V0Q2hlc3RMRUQocmVkOiBudW1iZXIsIGdyZWVuOiBudW1iZXIsIGJsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1pcHMuZm9yRWFjaCgobWlwKSA9PiB7XG4gICAgICAgICAgICBtaXAubWlwQ29udHJvbGxlci5zZXRDaGVzdExFRChyZWQsIGdyZWVuLCBibHVlKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQWxsTWlwcyA9IG5ldyBBbGxNaXBzTW9kZWwoKTsiXX0=