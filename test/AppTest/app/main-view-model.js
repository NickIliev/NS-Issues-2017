"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_component_1 = require("./component/test-component");
var observable_1 = require("data/observable");
var tab_view_1 = require("ui/tab-view");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel(page, router) {
        var _this = _super.call(this) || this;
        _this.builder = require('ui/builder');
        _this.router = router;
        _this.tab = page.getViewById("tabView");
        _this.initializeTabView();
        return _this;
    }
    HelloWorldModel.prototype.initializeTabView = function () {
        var items = [];
        var tabEntry0 = new tab_view_1.TabViewItem();
        tabEntry0.title = "Tab 0";
        tabEntry0.view = this.builder.load({
            path: "component",
            name: "test-component",
            attributes: {
                bindingContext: new test_component_1.TestModel()
            }
        });
        items.push(tabEntry0);
        this.tab.items = items;
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXVEO0FBRXZELDhDQUE2QztBQUk3Qyx3Q0FBbUQ7QUFFbkQ7SUFBcUMsbUNBQVU7SUFNM0MseUJBQVksSUFBVSxFQUFFLE1BQWE7UUFBckMsWUFDSSxpQkFBTyxTQUtWO1FBVE8sYUFBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQU1wQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixLQUFJLENBQUMsR0FBRyxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0lBQzdCLENBQUM7SUFHTywyQ0FBaUIsR0FBekI7UUFFSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFZixJQUFJLFNBQVMsR0FBRyxJQUFJLHNCQUFXLEVBQUUsQ0FBQztRQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9CLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsVUFBVSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxJQUFJLDBCQUFTLEVBQUU7YUFDbEM7U0FDSixDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBaENELENBQXFDLHVCQUFVLEdBZ0M5QztBQWhDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlc3RNb2RlbCB9IGZyb20gJy4vY29tcG9uZW50L3Rlc3QtY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAndWkvbGlzdC12aWV3JztcbmltcG9ydCB7IFRhYlZpZXcsIFRhYlZpZXdJdGVtIH0gZnJvbSAndWkvdGFiLXZpZXcnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIHJvdXRlcjogRnJhbWU7XG4gICAgcHJpdmF0ZSBidWlsZGVyID0gcmVxdWlyZSgndWkvYnVpbGRlcicpO1xuICAgIHByaXZhdGUgdGFiOiBUYWJWaWV3O1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSwgcm91dGVyOiBGcmFtZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgICAgICB0aGlzLnRhYiA9IDxUYWJWaWV3PnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0YWJWaWV3XCIpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVUYWJWaWV3KCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVUYWJWaWV3KCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgICAgIHZhciB0YWJFbnRyeTAgPSBuZXcgVGFiVmlld0l0ZW0oKTtcbiAgICAgICAgdGFiRW50cnkwLnRpdGxlID0gXCJUYWIgMFwiO1xuICAgICAgICB0YWJFbnRyeTAudmlldyA9IHRoaXMuYnVpbGRlci5sb2FkKHtcbiAgICAgICAgICAgIHBhdGg6IFwiY29tcG9uZW50XCIsXG4gICAgICAgICAgICBuYW1lOiBcInRlc3QtY29tcG9uZW50XCIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgYmluZGluZ0NvbnRleHQ6IG5ldyBUZXN0TW9kZWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpdGVtcy5wdXNoKHRhYkVudHJ5MCk7XG4gICAgICAgIHRoaXMudGFiLml0ZW1zID0gaXRlbXM7XG4gICAgfVxufSJdfQ==