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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXlFO0FBRXpFLHNEQUE2RDtBQUM3RCxpREFBbUQ7QUFFbkQ7SUFBMEIsd0JBQVU7SUFDbEM7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFFTSxxQkFBTSxHQUFiLFVBQWMsSUFBSTtRQUNoQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3pDLElBQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSTthQUNELE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNWLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQzthQUNELElBQUksQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDBCQUFXLEdBQWxCLFVBQW1CLElBQUk7UUFDckIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFNLElBQUksR0FBYSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUk7YUFDRCxPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5QkFBVSxHQUFqQixVQUFrQixJQUFlO1FBQy9CLElBQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUExQ0QsQ0FBMEIsdUJBQVUsR0EwQ25DO0FBMUNZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgZnJhbWUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcblxuZXhwb3J0IGNsYXNzIERlbW8gZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnb0F3YXkoYXJncykge1xuICAgIGNvbnN0IHBhZ2UgPSBmcmFtZS50b3Btb3N0KCkuY3VycmVudFBhZ2U7XG4gICAgY29uc3QgY2FyZCA9IDxDYXJkVmlldz5wYWdlLmdldFZpZXdCeUlkKFwiYmF0Q2FyZFwiKTtcbiAgICBjYXJkXG4gICAgICAuYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcmQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdvQXdheUpva2VyKGFyZ3MpIHtcbiAgICBjb25zdCBwYWdlID0gZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlO1xuICAgIGNvbnN0IGNhcmQgPSA8Q2FyZFZpZXc+cGFnZS5nZXRWaWV3QnlJZChcImpva2VyQ2FyZFwiKTtcbiAgICBjYXJkXG4gICAgICAuYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcmQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNhcmRMb2FkZWQoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3QgY2FyZCA9IDxDYXJkVmlldz5hcmdzLm9iamVjdDtcbiAgICBjb25zb2xlLmxvZyhcImNhcmQgPSBcIiArIGNhcmQpO1xuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBuYXRpdmUgYW5kcm9pZCA9IFwiICsgY2FyZC5hbmRyb2lkKTtcbiAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNhcmQgbmF0aXZlIGlvcyA9IFwiICsgY2FyZC5pb3MpO1xuICAgIH1cbiAgfVxufVxuIl19