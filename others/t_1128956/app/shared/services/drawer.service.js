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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUkzQyxJQUFhLGFBQWE7SUFBMUI7SUF1QkEsQ0FBQztJQW5CVSw4QkFBTSxHQUFiLFVBQWMsS0FBZTtRQUN6QixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixxQkFBcUI7UUFDckIsMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyx5Q0FBeUM7UUFDekMsWUFBWTtRQUNaLGVBQWU7UUFDZiwyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLFdBQVc7UUFDWCxJQUFJO0lBQ1IsQ0FBQztJQUVNLHFDQUFhLEdBQXBCLFVBQXFCLFFBQWtCO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUUzQyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtHQUNBLGFBQWEsQ0F1QnpCO0FBdkJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYXdlclNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBkcmF3ZXI6IFNpZGVEcmF3ZXJUeXBlO1xyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoZm9yY2U/OiBib29sZWFuKSB7ICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmRyYXdlcikge1xyXG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGZvcmNlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5hYmxlR2VzdHVyZShpc0VuYWJsZT86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSBpc0VuYWJsZTtcclxuXHJcbiAgICB9XHJcbn0iXX0=