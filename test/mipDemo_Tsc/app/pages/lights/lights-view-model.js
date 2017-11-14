"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var all_mips_1 = require("../../all-mips");
var nativescript_color_picker_1 = require("nativescript-color-picker");
var color_1 = require("color");
var mip_types_1 = require("nativescript-mip-ble/mip-types");
var LightsViewModel = (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRzLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodHMtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEyQztBQUUzQywyQ0FBdUM7QUFFdkMsdUVBQXdEO0FBQ3hELCtCQUE4QjtBQUU5Qiw0REFBOEQ7QUFFOUQ7SUFBcUMsbUNBQVU7SUErQjNDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBL0JPLFlBQU0sR0FBRyxJQUFJLHVDQUFXLEVBQUUsQ0FBQztRQUMzQixtQkFBYSxHQUFVLElBQUksYUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpELFdBQUssR0FBbUIsMEJBQWMsQ0FBQyxFQUFFLENBQUM7UUFDMUMsWUFBTSxHQUFtQiwwQkFBYyxDQUFDLEVBQUUsQ0FBQztRQWtCM0MsZ0JBQVUsR0FBZTtZQUNyQixFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBUSxNQUFNLENBQUMsMEJBQWMsQ0FBQywwQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFGLEVBQUUsRUFBRSxFQUFFLDBCQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxjQUFRLE1BQU0sQ0FBQywwQkFBYyxDQUFDLDBCQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEYsRUFBRSxFQUFFLEVBQUUsMEJBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQVEsTUFBTSxDQUFDLDBCQUFjLENBQUMsMEJBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0RyxFQUFFLEVBQUUsRUFBRSwwQkFBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBUSxNQUFNLENBQUMsMEJBQWMsQ0FBQywwQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ3pHLENBQUM7O0lBSUYsQ0FBQztJQXpCRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUNELFVBQVksR0FBbUI7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7OztPQUpBO0lBTUQsc0JBQUkscUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFDRCxVQUFhLEdBQW1CO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQWlCTSxxQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7YUFDOUIsSUFBSSxDQUFFLFVBQUMsTUFBYztZQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixrQkFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxrQkFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTlDRCxDQUFxQyx1QkFBVSxHQThDOUM7QUE5Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuaW1wb3J0IHtBbGxNaXBzfSBmcm9tIFwiLi4vLi4vYWxsLW1pcHNcIjtcblxuaW1wb3J0IHsgQ29sb3JQaWNrZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvbG9yLXBpY2tlclwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcblxuaW1wb3J0IHtIZWFkTGlnaHRTdGF0ZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC10eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlnaHRzVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIHBpY2tlciA9IG5ldyBDb2xvclBpY2tlcigpO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoXCJHcmF5XCIpO1xuXG4gICAgX2xlZnQ6IEhlYWRMaWdodFN0YXRlID0gSGVhZExpZ2h0U3RhdGUuT247XG4gICAgX3JpZ2h0OiBIZWFkTGlnaHRTdGF0ZSA9IEhlYWRMaWdodFN0YXRlLk9uO1xuXG4gICAgZ2V0IGxlZnRMRUQoKSA6IEhlYWRMaWdodFN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XG4gICAgfVxuICAgIHNldCBsZWZ0TEVEKHZhbDogSGVhZExpZ2h0U3RhdGUpIHtcbiAgICAgICAgdGhpcy5fbGVmdCA9IHZhbDtcbiAgICAgICAgdGhpcy51cGRhdGVFeWVzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHJpZ2h0TEVEKCkgOiBIZWFkTGlnaHRTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yaWdodDtcbiAgICB9XG4gICAgc2V0IHJpZ2h0TEVEKHZhbDogSGVhZExpZ2h0U3RhdGUpIHtcbiAgICAgICAgdGhpcy5fcmlnaHQgPSB2YWw7XG4gICAgICAgIHRoaXMudXBkYXRlRXllcygpO1xuICAgIH1cblxuICAgIGxlZE9wdGlvbnM6IEFycmF5PGFueT4gPSBbXG4gICAgICAgIHsgaWQ6IEhlYWRMaWdodFN0YXRlLk9mZiwgdG9TdHJpbmc6ICgpID0+IHsgcmV0dXJuIEhlYWRMaWdodFN0YXRlW0hlYWRMaWdodFN0YXRlLk9mZl07IH0gfSxcbiAgICAgICAgeyBpZDogSGVhZExpZ2h0U3RhdGUuT24sIHRvU3RyaW5nOiAoKSA9PiB7IHJldHVybiBIZWFkTGlnaHRTdGF0ZVtIZWFkTGlnaHRTdGF0ZS5Pbl07IH0gfSxcbiAgICAgICAgeyBpZDogSGVhZExpZ2h0U3RhdGUuU2xvd0JsaW5rLCB0b1N0cmluZzogKCkgPT4geyByZXR1cm4gSGVhZExpZ2h0U3RhdGVbSGVhZExpZ2h0U3RhdGUuU2xvd0JsaW5rXTsgfSB9LFxuICAgICAgICB7IGlkOiBIZWFkTGlnaHRTdGF0ZS5GYXN0QmxpbmssIHRvU3RyaW5nOiAoKSA9PiB7IHJldHVybiBIZWFkTGlnaHRTdGF0ZVtIZWFkTGlnaHRTdGF0ZS5GYXN0QmxpbmtdOyB9IH1cbiAgICBdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZUNvbG9yKCkge1xuICAgICAgICB0aGlzLnBpY2tlci5zaG93KCcjZmYwMDAwJywgJ0FSR0InKVxuICAgICAgICAgICAgLnRoZW4oIChyZXN1bHQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IG5ldyBDb2xvcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIEFsbE1pcHMuc2V0Q2hlc3RMRUQoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVFeWVzKCkge1xuICAgICAgICBBbGxNaXBzLnNldEhlYWRMRUQodGhpcy5yaWdodExFRCwgdGhpcy5yaWdodExFRCwgdGhpcy5sZWZ0TEVELCB0aGlzLmxlZnRMRUQpO1xuICAgIH1cbn0iXX0=