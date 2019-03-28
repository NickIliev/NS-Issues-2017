"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var all_mips_1 = require("../../all-mips");
var nativescript_color_picker_1 = require("nativescript-color-picker");
var color_1 = require("tns-core-modules/color");
var mip_types_1 = require("nativescript-mip-ble/mip-types");
var LightsViewModel = /** @class */ (function (_super) {
    __extends(LightsViewModel, _super);
    function LightsViewModel() {
        var _this = _super.call(this) || this;
        _this.picker = new nativescript_color_picker_1.ColorPicker();
        _this.selectedColor = new color_1.Color("Gray");
        _this._left = mip_types_1.HeadLightState.On;
        _this._right = mip_types_1.HeadLightState.On;
        _this.ledOptions = [
            { id: mip_types_1.HeadLightState.Off, toString: function () { return mip_types_1.HeadLightState[mip_types_1.HeadLightState.Off]; } },
            { id: mip_types_1.HeadLightState.On, toString: function () { return mip_types_1.HeadLightState[mip_types_1.HeadLightState.On]; } },
            { id: mip_types_1.HeadLightState.SlowBlink, toString: function () { return mip_types_1.HeadLightState[mip_types_1.HeadLightState.SlowBlink]; } },
            { id: mip_types_1.HeadLightState.FastBlink, toString: function () { return mip_types_1.HeadLightState[mip_types_1.HeadLightState.FastBlink]; } }
        ];
        return _this;
    }
    Object.defineProperty(LightsViewModel.prototype, "leftLED", {
        get: function () {
            return this._left;
        },
        set: function (val) {
            this._left = val;
            this.updateEyes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightsViewModel.prototype, "rightLED", {
        get: function () {
            return this._right;
        },
        set: function (val) {
            this._right = val;
            this.updateEyes();
        },
        enumerable: true,
        configurable: true
    });
    LightsViewModel.prototype.changeColor = function () {
        this.picker.show('#ff0000', 'ARGB')
            .then(function (result) {
            var color = new color_1.Color(result);
            all_mips_1.AllMips.setChestLED(color.r, color.g, color.b);
        });
    };
    LightsViewModel.prototype.updateEyes = function () {
        all_mips_1.AllMips.setHeadLED(this.rightLED, this.rightLED, this.leftLED, this.leftLED);
    };
    return LightsViewModel;
}(observable_1.Observable));
exports.LightsViewModel = LightsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRzLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodHMtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE0RDtBQUU1RCwyQ0FBdUM7QUFFdkMsdUVBQXdEO0FBQ3hELGdEQUErQztBQUUvQyw0REFBOEQ7QUFFOUQ7SUFBcUMsbUNBQVU7SUErQjNDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBL0JPLFlBQU0sR0FBRyxJQUFJLHVDQUFXLEVBQUUsQ0FBQztRQUMzQixtQkFBYSxHQUFVLElBQUksYUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpELFdBQUssR0FBbUIsMEJBQWMsQ0FBQyxFQUFFLENBQUM7UUFDMUMsWUFBTSxHQUFtQiwwQkFBYyxDQUFDLEVBQUUsQ0FBQztRQWtCM0MsZ0JBQVUsR0FBZTtZQUNyQixFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBUSxPQUFPLDBCQUFjLENBQUMsMEJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxRixFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsY0FBUSxPQUFPLDBCQUFjLENBQUMsMEJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4RixFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBUSxPQUFPLDBCQUFjLENBQUMsMEJBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0RyxFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBUSxPQUFPLDBCQUFjLENBQUMsMEJBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUN6RyxDQUFDOztJQUlGLENBQUM7SUF6QkQsc0JBQUksb0NBQU87YUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBQ0QsVUFBWSxHQUFtQjtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxxQ0FBUTthQUFaO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFDRCxVQUFhLEdBQW1CO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQWlCTSxxQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7YUFDOUIsSUFBSSxDQUFFLFVBQUMsTUFBYztZQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixrQkFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxrQkFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTlDRCxDQUFxQyx1QkFBVSxHQThDOUM7QUE5Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHtBbGxNaXBzfSBmcm9tIFwiLi4vLi4vYWxsLW1pcHNcIjtcclxuXHJcbmltcG9ydCB7IENvbG9yUGlja2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb2xvci1waWNrZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5cclxuaW1wb3J0IHtIZWFkTGlnaHRTdGF0ZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC10eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpZ2h0c1ZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG5cclxuICAgIHByaXZhdGUgcGlja2VyID0gbmV3IENvbG9yUGlja2VyKCk7XHJcbiAgICBwcml2YXRlIHNlbGVjdGVkQ29sb3I6IENvbG9yID0gbmV3IENvbG9yKFwiR3JheVwiKTtcclxuXHJcbiAgICBfbGVmdDogSGVhZExpZ2h0U3RhdGUgPSBIZWFkTGlnaHRTdGF0ZS5PbjtcclxuICAgIF9yaWdodDogSGVhZExpZ2h0U3RhdGUgPSBIZWFkTGlnaHRTdGF0ZS5PbjtcclxuXHJcbiAgICBnZXQgbGVmdExFRCgpIDogSGVhZExpZ2h0U3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZWZ0O1xyXG4gICAgfVxyXG4gICAgc2V0IGxlZnRMRUQodmFsOiBIZWFkTGlnaHRTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2xlZnQgPSB2YWw7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFeWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJpZ2h0TEVEKCkgOiBIZWFkTGlnaHRTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0O1xyXG4gICAgfVxyXG4gICAgc2V0IHJpZ2h0TEVEKHZhbDogSGVhZExpZ2h0U3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9yaWdodCA9IHZhbDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV5ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWRPcHRpb25zOiBBcnJheTxhbnk+ID0gW1xyXG4gICAgICAgIHsgaWQ6IEhlYWRMaWdodFN0YXRlLk9mZiwgdG9TdHJpbmc6ICgpID0+IHsgcmV0dXJuIEhlYWRMaWdodFN0YXRlW0hlYWRMaWdodFN0YXRlLk9mZl07IH0gfSxcclxuICAgICAgICB7IGlkOiBIZWFkTGlnaHRTdGF0ZS5PbiwgdG9TdHJpbmc6ICgpID0+IHsgcmV0dXJuIEhlYWRMaWdodFN0YXRlW0hlYWRMaWdodFN0YXRlLk9uXTsgfSB9LFxyXG4gICAgICAgIHsgaWQ6IEhlYWRMaWdodFN0YXRlLlNsb3dCbGluaywgdG9TdHJpbmc6ICgpID0+IHsgcmV0dXJuIEhlYWRMaWdodFN0YXRlW0hlYWRMaWdodFN0YXRlLlNsb3dCbGlua107IH0gfSxcclxuICAgICAgICB7IGlkOiBIZWFkTGlnaHRTdGF0ZS5GYXN0QmxpbmssIHRvU3RyaW5nOiAoKSA9PiB7IHJldHVybiBIZWFkTGlnaHRTdGF0ZVtIZWFkTGlnaHRTdGF0ZS5GYXN0QmxpbmtdOyB9IH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlQ29sb3IoKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZXIuc2hvdygnI2ZmMDAwMCcsICdBUkdCJylcclxuICAgICAgICAgICAgLnRoZW4oIChyZXN1bHQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gbmV3IENvbG9yKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBBbGxNaXBzLnNldENoZXN0TEVEKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVFeWVzKCkge1xyXG4gICAgICAgIEFsbE1pcHMuc2V0SGVhZExFRCh0aGlzLnJpZ2h0TEVELCB0aGlzLnJpZ2h0TEVELCB0aGlzLmxlZnRMRUQsIHRoaXMubGVmdExFRCk7XHJcbiAgICB9XHJcbn0iXX0=