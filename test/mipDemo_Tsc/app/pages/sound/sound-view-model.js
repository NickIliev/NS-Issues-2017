"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var all_mips_1 = require("../../all-mips");
var SoundViewModel = (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmQtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvdW5kLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0MsMkNBQXlDO0FBRXpDO0lBQW9DLGtDQUFVO0lBQTlDO1FBQUEscUVBa0JDO1FBakJXLGFBQU8sR0FBRyxDQUFDLENBQUM7O0lBaUJ4QixDQUFDO0lBaEJHLHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUNELFVBQWtCLEdBQVc7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFFbkIsa0JBQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFXRCxrQ0FBUyxHQUFUO1FBQ0ksa0JBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbEJELENBQW9DLHVCQUFVLEdBa0I3QztBQWxCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBBbGxNaXBzIH0gZnJvbSBcIi4uLy4uL2FsbC1taXBzXCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VuZFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX3ZvbHVtZSA9IDA7XG4gICAgcHVibGljIGdldCB2b2x1bWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgICB9XG4gICAgcHVibGljIHNldCB2b2x1bWUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdm9sdW1lID0gdmFsO1xuXG4gICAgICAgIEFsbE1pcHMuc2V0Vm9sdW1lKHZhbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNvdW5kSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgc291bmREZWxheTogbnVtYmVyO1xuICAgIHB1YmxpYyBzb3VuZFJlcGVhdDogbnVtYmVyO1xuXG4gICAgcGxheVNvdW5kKCkge1xuICAgICAgICBBbGxNaXBzLnBsYXlPbmVTb3VuZCh0aGlzLnNvdW5kSW5kZXgsIHRoaXMuc291bmREZWxheSwgdGhpcy5zb3VuZFJlcGVhdCk7XG4gICAgfVxufSJdfQ==