"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder = require("ui/builder");
var frame = require("ui/frame");
var MyTemplateSelector = (function () {
    function MyTemplateSelector() {
    }
    MyTemplateSelector.prototype.OnSelectTemplate = function (position, bindingContext) {
        var page = frame.topmost().currentPage;
        var view = builder.load({
            path: "~/Views/Slides",
            name: "slider-view",
            page: page
        });
        // required
        view.bindingContext = bindingContext;
        return view;
    };
    return MyTemplateSelector;
}());
exports.MyTemplateSelector = MyTemplateSelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG9DQUFzQztBQUN0QyxnQ0FBa0M7QUFFbEM7SUFBQTtJQWlCQSxDQUFDO0lBZkcsNkNBQWdCLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsY0FBbUI7UUFFbEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUV2QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7UUFFSCxXQUFXO1FBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSVRlbXBsYXRlU2VsZWN0b3IgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhcm91c2VsLXZpZXdcIjtcbmltcG9ydCAqIGFzIGJ1aWxkZXIgZnJvbSBcInVpL2J1aWxkZXJcIjtcbmltcG9ydCAqIGFzIGZyYW1lIGZyb20gJ3VpL2ZyYW1lJztcblxuZXhwb3J0IGNsYXNzIE15VGVtcGxhdGVTZWxlY3RvciBpbXBsZW1lbnRzIElUZW1wbGF0ZVNlbGVjdG9yIHtcbiAgICBcbiAgICBPblNlbGVjdFRlbXBsYXRlKHBvc2l0aW9uOiBudW1iZXIsIGJpbmRpbmdDb250ZXh0OiBhbnkpIHtcblxuICAgICAgICB2YXIgcGFnZSA9IGZyYW1lLnRvcG1vc3QoKS5jdXJyZW50UGFnZTtcblxuICAgICAgICB2YXIgdmlldyA9IGJ1aWxkZXIubG9hZCh7XG4gICAgICAgICAgICBwYXRoOiBcIn4vVmlld3MvU2xpZGVzXCIsXG4gICAgICAgICAgICBuYW1lOiBcInNsaWRlci12aWV3XCIsXG4gICAgICAgICAgICBwYWdlOiBwYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlcXVpcmVkXG4gICAgICAgIHZpZXcuYmluZGluZ0NvbnRleHQgPSBiaW5kaW5nQ29udGV4dDtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG59Il19