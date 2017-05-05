"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var item_service_1 = require("./item.service");
var application_1 = require("application");
var ItemsComponent = (function () {
    function ItemsComponent(itemService, routerExtensions, ngZone) {
        var _this = this;
        this.itemService = itemService;
        this.routerExtensions = routerExtensions;
        this.ngZone = ngZone;
        application_1.on(application_1.suspendEvent, function (args) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("suspendEvent");
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application_1.on(application_1.resumeEvent, function (args) {
            if (args.android) {
                // For Android applications, args.android is an android activity class
                _this.routerExtensions.navigate(['/pin'], { clearHistory: true, animated: false });
                console.log("resumeEvent");
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService, router_1.RouterExtensions, core_1.NgZone])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBQzFELHNEQUF5RjtBQUV6RiwrQ0FBNkM7QUFDN0MsMkNBQTBMO0FBTzFMLElBQWEsY0FBYztJQUd2Qix3QkFBb0IsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxNQUFjO1FBQWhILGlCQTBCQztRQTFCbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM1RyxnQkFBYSxDQUFDLDBCQUFZLEVBQUUsVUFBQyxJQUEwQjtZQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZix1RUFBdUU7Z0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixtREFBbUQ7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFhLENBQUMseUJBQVcsRUFBRSxVQUFDLElBQTBCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHNFQUFzRTtnQkFFdEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLG1EQUFtRDtnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxDRCxJQWtDQztBQWxDWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQUltQywwQkFBVyxFQUE0Qix5QkFBZ0IsRUFBa0IsYUFBTTtHQUh2RyxjQUFjLENBa0MxQjtBQWxDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBvbiBhcyBhcHBsaWNhdGlvbk9uLCBsYXVuY2hFdmVudCwgc3VzcGVuZEV2ZW50LCByZXN1bWVFdmVudCwgZXhpdEV2ZW50LCBsb3dNZW1vcnlFdmVudCwgdW5jYXVnaHRFcnJvckV2ZW50LCBBcHBsaWNhdGlvbkV2ZW50RGF0YSwgc3RhcnQgYXMgYXBwbGljYXRpb25TdGFydCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXRlbXM6IEl0ZW1bXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHsgXG4gICAgICAgIGFwcGxpY2F0aW9uT24oc3VzcGVuZEV2ZW50LCAoYXJnczogQXBwbGljYXRpb25FdmVudERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VzcGVuZEV2ZW50XCIpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY3Rpdml0eTogXCIgKyBhcmdzLmFuZHJvaWQpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGlPUyBhcHBsaWNhdGlvbnMsIGFyZ3MuaW9zIGlzIFVJQXBwbGljYXRpb24uXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBwbGljYXRpb25PbihyZXN1bWVFdmVudCwgKGFyZ3M6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXJncy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIEFuZHJvaWQgYXBwbGljYXRpb25zLCBhcmdzLmFuZHJvaWQgaXMgYW4gYW5kcm9pZCBhY3Rpdml0eSBjbGFzc1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3BpbiddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSwgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdW1lRXZlbnRcIilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGlPUyBhcHBsaWNhdGlvbnMsIGFyZ3MuaW9zIGlzIFVJQXBwbGljYXRpb24uXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgfVxufVxuIl19