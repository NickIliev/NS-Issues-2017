"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_1 = require("data/observable");
var connectivity = require("connectivity");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.connectionStatus = "checking ...";
        this.observable = new observable_1.Observable();
        this.switchStatus = false;
    }
    ItemsComponent.prototype.onSwitchLoaded = function (args) {
        this.switch = args.object;
    };
    ItemsComponent.prototype.onStackTap = function () {
        var connectionType = connectivity.getConnectionType();
        console.log("connectionType: " + connectionType);
        switch (connectionType) {
            case connectivity.connectionType.none:
                this.connectionStatus = "None";
                this.switch.checked = false;
                break;
            case connectivity.connectionType.wifi:
                this.connectionStatus = "Wi-Fi";
                this.switch.checked = true;
                break;
            case connectivity.connectionType.mobile:
                this.connectionStatus = "Mobile";
                this.switch.checked = true;
                break;
            default:
                break;
        }
    };
    ItemsComponent.prototype.onSecondChecked = function (args) {
        console.log("switch change value");
        console.log(args.object.checked);
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                args.object.checked = false;
                break;
            default:
                break;
        }
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDhDQUF3RDtBQUV4RCwyQ0FBNkM7QUFRN0M7SUFTSTtRQUZBLHFCQUFnQixHQUFXLGNBQWMsQ0FBQztRQUd0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSx1Q0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDSSxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSyxDQUFDO1lBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEQsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQWxEUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDOztPQUNXLGNBQWMsQ0FtRDFCO0lBQUQscUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSwgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcblxuICAgIG15VGV4dDogRGF0ZTtcbiAgICBwcml2YXRlIG9ic2VydmFibGU6IE9ic2VydmFibGU7XG4gICAgc3dpdGNoU3RhdHVzOiBib29sZWFuO1xuICAgIHN3aXRjaDogU3dpdGNoO1xuXG4gICAgY29ubmVjdGlvblN0YXR1czogc3RyaW5nID0gXCJjaGVja2luZyAuLi5cIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLnN3aXRjaFN0YXR1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN3aXRjaExvYWRlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdGFja1RhcCgpIHtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGlvblR5cGU6IFwiICsgY29ubmVjdGlvblR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IFwiTm9uZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzID0gXCJXaS1GaVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IFwiTW9iaWxlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2guY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2Vjb25kQ2hlY2tlZChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpdGNoIGNoYW5nZSB2YWx1ZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QuY2hlY2tlZCk7XG4gICAgICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IGNvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpO1xuICAgICAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxuICAgICAgICAgICAgICAgIGFyZ3Mub2JqZWN0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59Il19