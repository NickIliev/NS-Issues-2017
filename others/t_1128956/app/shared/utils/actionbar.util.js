"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var ActionBarUtil = (function () {
    function ActionBarUtil() {
    }
    ActionBarUtil.SET_TITLE = function (title) {
        var actionBar = frame_1.topmost().currentPage.actionBar;
        actionBar.title = title;
    };
    ActionBarUtil.ADD_BUTTON = function (button) {
        // NOTE: This MUST be called BEFORE SET_TITLE on start
        frame_1.topmost().currentPage.actionBar.actionItems.addItem(button);
    };
    ActionBarUtil.HIDE_BACK_BUTTON = function () {
        if (frame_1.topmost().ios) {
            frame_1.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
        }
    };
    ActionBarUtil.EMPTY_ITEMS = function () {
        var actionBar = frame_1.topmost().currentPage.actionBar;
        var actionItems = actionBar.actionItems.getItems();
        actionItems.forEach(function (item) {
            actionBar.actionItems.removeItem(item);
        });
    };
    ActionBarUtil.STATUSBAR_STYLE = function (style) {
        if (frame_1.topmost().ios) {
            var navigationBar = frame_1.topmost().ios.controller.navigationBar;
            // 0: default
            // 1: light
            navigationBar.barStyle = style;
        }
    };
    return ActionBarUtil;
}());
exports.ActionBarUtil = ActionBarUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb25iYXIudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFtQztBQUtuQztJQUFBO0lBOEJBLENBQUM7SUE1QmUsdUJBQVMsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxJQUFJLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDYSx3QkFBVSxHQUF4QixVQUF5QixNQUFrQjtRQUN6QyxzREFBc0Q7UUFDdEQsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDYSw4QkFBZ0IsR0FBOUI7UUFDRSxFQUFFLENBQUMsQ0FBQyxlQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLGVBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RyxDQUFDO0lBQ0gsQ0FBQztJQUNhLHlCQUFXLEdBQXpCO1FBQ0UsSUFBSSxTQUFTLEdBQUcsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3ZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNhLDZCQUFlLEdBQTdCLFVBQThCLEtBQWE7UUFDekMsRUFBRSxDQUFDLENBQUMsZUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLGFBQWEsR0FBRyxlQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUMzRCxhQUFhO1lBQ2IsV0FBVztZQUNYLGFBQWEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBOUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSBcInVpL2FjdGlvbi1iYXJcIjtcclxuXHJcbmRlY2xhcmUgbGV0IFVJQmFyU3R5bGU6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXJVdGlsIHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBTRVRfVElUTEUodGl0bGU6IHN0cmluZykge1xyXG4gICAgbGV0IGFjdGlvbkJhciA9IHRvcG1vc3QoKS5jdXJyZW50UGFnZS5hY3Rpb25CYXI7XHJcbiAgICBhY3Rpb25CYXIudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBBRERfQlVUVE9OKGJ1dHRvbjogQWN0aW9uSXRlbSkge1xyXG4gICAgLy8gTk9URTogVGhpcyBNVVNUIGJlIGNhbGxlZCBCRUZPUkUgU0VUX1RJVExFIG9uIHN0YXJ0XHJcbiAgICB0b3Btb3N0KCkuY3VycmVudFBhZ2UuYWN0aW9uQmFyLmFjdGlvbkl0ZW1zLmFkZEl0ZW0oYnV0dG9uKTtcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBISURFX0JBQ0tfQlVUVE9OKCkge1xyXG4gICAgaWYgKHRvcG1vc3QoKS5pb3MpIHtcclxuICAgICAgdG9wbW9zdCgpLmlvcy5jb250cm9sbGVyLnZpc2libGVWaWV3Q29udHJvbGxlci5uYXZpZ2F0aW9uSXRlbS5zZXRIaWRlc0JhY2tCdXR0b25BbmltYXRlZCh0cnVlLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgRU1QVFlfSVRFTVMoKSB7XHJcbiAgICBsZXQgYWN0aW9uQmFyID0gdG9wbW9zdCgpLmN1cnJlbnRQYWdlLmFjdGlvbkJhcjtcclxuICAgIGxldCBhY3Rpb25JdGVtcyA9IGFjdGlvbkJhci5hY3Rpb25JdGVtcy5nZXRJdGVtcygpO1xyXG4gICAgYWN0aW9uSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBhY3Rpb25CYXIuYWN0aW9uSXRlbXMucmVtb3ZlSXRlbShpdGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIFNUQVRVU0JBUl9TVFlMRShzdHlsZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodG9wbW9zdCgpLmlvcykge1xyXG4gICAgICBsZXQgbmF2aWdhdGlvbkJhciA9IHRvcG1vc3QoKS5pb3MuY29udHJvbGxlci5uYXZpZ2F0aW9uQmFyO1xyXG4gICAgICAvLyAwOiBkZWZhdWx0XHJcbiAgICAgIC8vIDE6IGxpZ2h0XHJcbiAgICAgIG5hdmlnYXRpb25CYXIuYmFyU3R5bGUgPSBzdHlsZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19