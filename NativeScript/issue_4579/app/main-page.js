"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var connectivity_1 = require("connectivity");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function monitor() {
    console.log("monitor");
    connectivity_1.startMonitoring(function (newConnectionType) {
        switch (newConnectionType) {
            case connectivity_1.connectionType.none:
                console.log("Connection type changed to none.");
                break;
            case connectivity_1.connectionType.wifi:
                console.log("Connection type changed to WiFi.");
                break;
            case connectivity_1.connectionType.mobile:
                console.log("Connection type changed to mobile.");
                break;
        }
    });
}
exports.monitor = monitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBRXBELDZDQUErRTtBQUUvRSxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUxELG9DQUtDO0FBRUQ7SUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3RCLDhCQUFlLENBQUMsVUFBQyxpQkFBeUI7UUFDdEMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssNkJBQWMsQ0FBQyxJQUFJO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQztZQUNWLEtBQUssNkJBQWMsQ0FBQyxJQUFJO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQztZQUNWLEtBQUssNkJBQWMsQ0FBQyxNQUFNO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7Z0JBQ2xELEtBQUssQ0FBQztRQUVkLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFoQkQsMEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxuaW1wb3J0IHsgc3RhcnRNb25pdG9yaW5nLCBzdG9wTW9uaXRvcmluZywgY29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbml0b3IoKSB7XG4gICAgY29uc29sZS5sb2coXCJtb25pdG9yXCIpXG4gICAgc3RhcnRNb25pdG9yaW5nKChuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobmV3Q29ubmVjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGlvblR5cGUubm9uZTpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG5vbmUuXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb25uZWN0aW9uVHlwZS53aWZpOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gV2lGaS5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG1vYmlsZS5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH0pO1xufSJdfQ==