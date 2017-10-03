"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var platform_1 = require("tns-core-modules/platform");
var frame = require("tns-core-modules/ui/frame");
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        return _super.call(this) || this;
    }
    Demo.prototype.goAway = function (args) {
        var page = frame.topmost().currentPage;
        var card = page.getViewById("batCard");
        card
            .animate({
            scale: { x: 0, y: 0 },
            opacity: 0,
            duration: 1000
        })
            .then(function () {
            card.visibility = "collapse";
        });
    };
    Demo.prototype.goAwayJoker = function (args) {
        var page = frame.topmost().currentPage;
        var card = page.getViewById("jokerCard");
        card
            .animate({
            scale: { x: 0, y: 0 },
            opacity: 0,
            duration: 1000
        })
            .then(function () {
            card.visibility = "collapse";
        });
    };
    Demo.prototype.cardLoaded = function (args) {
        var card = args.object;
        console.log("card = " + card);
        if (platform_1.isAndroid) {
            console.log("card native android = " + card.android);
        }
        else if (platform_1.isIOS) {
            console.log("card native ios = " + card.ios);
        }
    };
    return Demo;
}(observable_1.Observable));
exports.Demo = Demo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXlFO0FBRXpFLHNEQUE2RDtBQUM3RCxpREFBbUQ7QUFFbkQ7SUFBMEIsd0JBQVU7SUFDbEM7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFFTSxxQkFBTSxHQUFiLFVBQWMsSUFBSTtRQUNoQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3pDLElBQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSTthQUNELE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNWLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQzthQUNELElBQUksQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDBCQUFXLEdBQWxCLFVBQW1CLElBQUk7UUFDckIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFNLElBQUksR0FBYSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUk7YUFDRCxPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5QkFBVSxHQUFqQixVQUFrQixJQUFlO1FBQy9CLElBQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUExQ0QsQ0FBMEIsdUJBQVUsR0EwQ25DO0FBMUNZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYXJkdmlld1wiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0ICogYXMgZnJhbWUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZW1vIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvQXdheShhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlO1xyXG4gICAgY29uc3QgY2FyZCA9IDxDYXJkVmlldz5wYWdlLmdldFZpZXdCeUlkKFwiYmF0Q2FyZFwiKTtcclxuICAgIGNhcmRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjYXJkLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvQXdheUpva2VyKGFyZ3MpIHtcclxuICAgIGNvbnN0IHBhZ2UgPSBmcmFtZS50b3Btb3N0KCkuY3VycmVudFBhZ2U7XHJcbiAgICBjb25zdCBjYXJkID0gPENhcmRWaWV3PnBhZ2UuZ2V0Vmlld0J5SWQoXCJqb2tlckNhcmRcIik7XHJcbiAgICBjYXJkXHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY2FyZC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjYXJkTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3QgY2FyZCA9IDxDYXJkVmlldz5hcmdzLm9iamVjdDtcclxuICAgIGNvbnNvbGUubG9nKFwiY2FyZCA9IFwiICsgY2FyZCk7XHJcbiAgICBpZiAoaXNBbmRyb2lkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBuYXRpdmUgYW5kcm9pZCA9IFwiICsgY2FyZC5hbmRyb2lkKTtcclxuICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIG5hdGl2ZSBpb3MgPSBcIiArIGNhcmQuaW9zKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19