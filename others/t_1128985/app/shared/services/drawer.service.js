"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrawerService = (function () {
    function DrawerService() {
    }
    DrawerService.prototype.toggle = function (force) {
        //this.drawer.toggleDrawerState();
        this.drawer.showDrawer();
        // if (this.drawer) {
        //     if (typeof force !== "undefined") {
        //         if (force === false) {
        //             this.drawer.closeDrawer();
        //         }
        //     } else {
        //         this.drawer.toggleDrawerState();
        //     }
        // } else {
        // }
    };
    DrawerService.prototype.enableGesture = function (isEnable) {
        this.drawer.gesturesEnabled = isEnable;
    };
    return DrawerService;
}());
DrawerService = __decorate([
    core_1.Injectable()
], DrawerService);
exports.DrawerService = DrawerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUkzQyxJQUFhLGFBQWE7SUFBMUI7SUF1QkEsQ0FBQztJQW5CVSw4QkFBTSxHQUFiLFVBQWMsS0FBZTtRQUN6QixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixxQkFBcUI7UUFDckIsMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyx5Q0FBeUM7UUFDekMsWUFBWTtRQUNaLGVBQWU7UUFDZiwyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLFdBQVc7UUFDWCxJQUFJO0lBQ1IsQ0FBQztJQUVNLHFDQUFhLEdBQXBCLFVBQXFCLFFBQWtCO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUUzQyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtHQUNBLGFBQWEsQ0F1QnpCO0FBdkJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmF3ZXJTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBkcmF3ZXI6IFNpZGVEcmF3ZXJUeXBlO1xuXG4gICAgcHVibGljIHRvZ2dsZShmb3JjZT86IGJvb2xlYW4pIHsgICAgICAgIFxuICAgICAgICAvL3RoaXMuZHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XG4gICAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICAgICAgLy8gaWYgKHRoaXMuZHJhd2VyKSB7XG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGZvcmNlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kcmF3ZXIudG9nZ2xlRHJhd2VyU3RhdGUoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVHZXN0dXJlKGlzRW5hYmxlPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSBpc0VuYWJsZTtcblxuICAgIH1cbn0iXX0=