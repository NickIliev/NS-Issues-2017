"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var all_mips_1 = require("../../all-mips");
var SoundViewModel = /** @class */ (function (_super) {
    __extends(SoundViewModel, _super);
    function SoundViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._volume = 0;
        return _this;
    }
    Object.defineProperty(SoundViewModel.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (val) {
            this._volume = val;
            all_mips_1.AllMips.setVolume(val);
        },
        enumerable: true,
        configurable: true
    });
    SoundViewModel.prototype.playSound = function () {
        all_mips_1.AllMips.playOneSound(this.soundIndex, this.soundDelay, this.soundRepeat);
    };
    return SoundViewModel;
}(observable_1.Observable));
exports.SoundViewModel = SoundViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmQtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvdW5kLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBOEQ7QUFDOUQsMkNBQXlDO0FBRXpDO0lBQW9DLGtDQUFVO0lBQTlDO1FBQUEscUVBa0JDO1FBakJXLGFBQU8sR0FBRyxDQUFDLENBQUM7O0lBaUJ4QixDQUFDO0lBaEJHLHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFDRCxVQUFrQixHQUFXO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBRW5CLGtCQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBV0Qsa0NBQVMsR0FBVDtRQUNJLGtCQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxCRCxDQUFvQyx1QkFBVSxHQWtCN0M7QUFsQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEFsbE1pcHMgfSBmcm9tIFwiLi4vLi4vYWxsLW1pcHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTb3VuZFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgcHJpdmF0ZSBfdm9sdW1lID0gMDtcclxuICAgIHB1YmxpYyBnZXQgdm9sdW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdm9sdW1lKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdm9sdW1lID0gdmFsO1xyXG5cclxuICAgICAgICBBbGxNaXBzLnNldFZvbHVtZSh2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb3VuZEluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc291bmREZWxheTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvdW5kUmVwZWF0OiBudW1iZXI7XHJcblxyXG4gICAgcGxheVNvdW5kKCkge1xyXG4gICAgICAgIEFsbE1pcHMucGxheU9uZVNvdW5kKHRoaXMuc291bmRJbmRleCwgdGhpcy5zb3VuZERlbGF5LCB0aGlzLnNvdW5kUmVwZWF0KTtcclxuICAgIH1cclxufSJdfQ==