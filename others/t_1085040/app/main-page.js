"use strict";
var stack_layout_1 = require("ui/layouts/stack-layout");
var label_1 = require("ui/label");
var list_view_1 = require("ui/list-view");
var nativescript_tsx_1 = require("nativescript-tsx");
// using nativescript-tsx and UIBuilder
function navigatingTo(args) {
    var page = args.object;
    var list = new list_view_1.ListView();
    list.itemTemplate = nativescript_tsx_1.UIBuilder.createElement(stack_layout_1.StackLayout, null,
        nativescript_tsx_1.UIBuilder.createElement(label_1.Label, { text: "{{ $value }}" }));
    // list.itemTemplate = () => {
    //     var stack = new StackLayout();
    //     var lbl = new Label();
    //     lbl.bind({ sourceProperty: "$value", targetProperty: "text" });
    //     stack.addChild(lbl);
    //     return stack;
    // }
    list.items = [5, 4, 3];
    page.content = list;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsd0RBQXNEO0FBQ3RELGtDQUFpQztBQUNqQywwQ0FBd0M7QUFFeEMscURBQTZDO0FBQzdDLHVDQUF1QztBQUV2QyxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBYyxDQUFDO0lBRS9CLElBQUksSUFBSSxHQUFHLElBQUksb0JBQVEsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsMkNBQUMsMEJBQVc7UUFDNUIsMkNBQUMsYUFBSyxJQUFDLElBQUksRUFBQyxjQUFjLEdBQUcsQ0FDbkIsQ0FBQztJQUdmLDhCQUE4QjtJQUM5QixxQ0FBcUM7SUFDckMsNkJBQTZCO0lBQzdCLHNFQUFzRTtJQUN0RSwyQkFBMkI7SUFDM0Isb0JBQW9CO0lBQ3BCLElBQUk7SUFFSixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFDO0FBcEJELG9DQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5pbXBvcnQgYnVpbGRlciA9IHJlcXVpcmUoXCJ1aS9idWlsZGVyXCIpO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcblxuaW1wb3J0IHsgVUlCdWlsZGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10c3hcIjtcbi8vIHVzaW5nIG5hdGl2ZXNjcmlwdC10c3ggYW5kIFVJQnVpbGRlclxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgbGV0IHBhZ2UgPSBhcmdzLm9iamVjdCBhcyBQYWdlO1xuICAgIFxuICAgIHZhciBsaXN0ID0gbmV3IExpc3RWaWV3KCk7XG4gICAgbGlzdC5pdGVtVGVtcGxhdGUgPSA8U3RhY2tMYXlvdXQ+XG4gICAgICAgIDxMYWJlbCB0ZXh0PVwie3sgJHZhbHVlIH19XCIgLz5cbiAgICA8L1N0YWNrTGF5b3V0PjtcblxuXG4gICAgLy8gbGlzdC5pdGVtVGVtcGxhdGUgPSAoKSA9PiB7XG4gICAgLy8gICAgIHZhciBzdGFjayA9IG5ldyBTdGFja0xheW91dCgpO1xuICAgIC8vICAgICB2YXIgbGJsID0gbmV3IExhYmVsKCk7XG4gICAgLy8gICAgIGxibC5iaW5kKHsgc291cmNlUHJvcGVydHk6IFwiJHZhbHVlXCIsIHRhcmdldFByb3BlcnR5OiBcInRleHRcIiB9KTtcbiAgICAvLyAgICAgc3RhY2suYWRkQ2hpbGQobGJsKTtcbiAgICAvLyAgICAgcmV0dXJuIHN0YWNrO1xuICAgIC8vIH1cblxuICAgIGxpc3QuaXRlbXMgPSBbNSwgNCwgM107XG4gICAgcGFnZS5jb250ZW50ID0gbGlzdDtcbn1cbiJdfQ==