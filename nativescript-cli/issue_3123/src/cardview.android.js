"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var cardview_common_1 = require("./cardview-common");
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CardView.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    CardView.prototype[cardview_common_1.radiusProperty.setNative] = function (value) {
        this.nativeView.setRadius(value);
    };
    CardView.prototype[cardview_common_1.elevationProperty.setNative] = function (value) {
        this.nativeView.setCardElevation(value);
    };
    CardView.prototype.createNativeView = function () {
        return new android.support.v7.widget.CardView(this._context);
    };
    CardView.prototype.initNativeView = function () {
        this._androidViewId = android.view.View.generateViewId();
        this.nativeView.setId(this._androidViewId);
    };
    CardView.prototype[cardview_common_1.backgroundColorProperty.setNative] = function (value) {
        if (value) {
            try {
                this.nativeView.setCardBackgroundColor(value.android);
            }
            catch (error) {
                // do nothing, catch bad color value
                console.log("bad background-color value:", error);
            }
        }
    };
    CardView.prototype[cardview_common_1.backgroundInternalProperty.setNative] = function (value) {
        if (value) {
            try {
                this.nativeView.setCardBackgroundColor(new color_1.Color(value.color + "").android);
            }
            catch (error) {
                // do nothing, catch bad color value
                console.log("bad background-color value:", error);
            }
        }
    };
    return CardView;
}(cardview_common_1.CardViewCommon));
exports.CardView = CardView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHZpZXcuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmR2aWV3LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBK0M7QUFDL0MscURBTTJCO0FBSTNCO0lBQThCLDRCQUFjO0lBQTVDOztJQStDQSxDQUFDO0lBNUNDLHNCQUFJLDZCQUFPO2FBQVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELG1CQUFDLGdDQUFjLENBQUMsU0FBUyxDQUFDLEdBQTFCLFVBQTJCLEtBQWE7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG1CQUFDLG1DQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUE3QixVQUE4QixLQUFhO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLG1DQUFnQixHQUF2QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxpQ0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxtQkFBQyx5Q0FBdUIsQ0FBQyxTQUFTLENBQUMsR0FBbkMsVUFBb0MsS0FBWTtRQUM5QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLG9DQUFvQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxtQkFBQyw0Q0FBMEIsQ0FBQyxTQUFTLENBQUMsR0FBdEMsVUFBdUMsS0FBVTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQ3BDLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUNwQyxDQUFDO1lBQ0osQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2Ysb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBL0NELENBQThCLGdDQUFjLEdBK0MzQztBQS9DWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcclxuaW1wb3J0IHtcclxuICBiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSxcclxuICBiYWNrZ3JvdW5kSW50ZXJuYWxQcm9wZXJ0eSxcclxuICBDYXJkVmlld0NvbW1vbixcclxuICBlbGV2YXRpb25Qcm9wZXJ0eSxcclxuICByYWRpdXNQcm9wZXJ0eVxyXG59IGZyb20gXCIuL2NhcmR2aWV3LWNvbW1vblwiO1xyXG5cclxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIENhcmRWaWV3IGV4dGVuZHMgQ2FyZFZpZXdDb21tb24ge1xyXG4gIHByaXZhdGUgX2FuZHJvaWRWaWV3SWQ6IG51bWJlcjtcclxuXHJcbiAgZ2V0IGFuZHJvaWQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm5hdGl2ZVZpZXc7XHJcbiAgfVxyXG5cclxuICBbcmFkaXVzUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm5hdGl2ZVZpZXcuc2V0UmFkaXVzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIFtlbGV2YXRpb25Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubmF0aXZlVmlldy5zZXRDYXJkRWxldmF0aW9uKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVOYXRpdmVWaWV3KCkge1xyXG4gICAgcmV0dXJuIG5ldyBhbmRyb2lkLnN1cHBvcnQudjcud2lkZ2V0LkNhcmRWaWV3KHRoaXMuX2NvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXROYXRpdmVWaWV3KCkge1xyXG4gICAgdGhpcy5fYW5kcm9pZFZpZXdJZCA9IGFuZHJvaWQudmlldy5WaWV3LmdlbmVyYXRlVmlld0lkKCk7XHJcbiAgICB0aGlzLm5hdGl2ZVZpZXcuc2V0SWQodGhpcy5fYW5kcm9pZFZpZXdJZCk7XHJcbiAgfVxyXG5cclxuICBbYmFja2dyb3VuZENvbG9yUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogQ29sb3IpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMubmF0aXZlVmlldy5zZXRDYXJkQmFja2dyb3VuZENvbG9yKHZhbHVlLmFuZHJvaWQpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcsIGNhdGNoIGJhZCBjb2xvciB2YWx1ZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmFkIGJhY2tncm91bmQtY29sb3IgdmFsdWU6XCIsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgW2JhY2tncm91bmRJbnRlcm5hbFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3LnNldENhcmRCYWNrZ3JvdW5kQ29sb3IoXHJcbiAgICAgICAgICBuZXcgQ29sb3IodmFsdWUuY29sb3IgKyBcIlwiKS5hbmRyb2lkXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nLCBjYXRjaCBiYWQgY29sb3IgdmFsdWVcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJhZCBiYWNrZ3JvdW5kLWNvbG9yIHZhbHVlOlwiLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19