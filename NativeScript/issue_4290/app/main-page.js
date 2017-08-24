"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    frame_1.topmost().navigate({
        moduleName: "sub-page",
        animated: true,
        transition: {
            name: "slideRIght",
            duration: 1000
        }
    });
}
exports.onTap = onTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0NBQW1DO0FBRW5DLHNCQUE2QixJQUFlO0lBRXhDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7QUFFakMsQ0FBQztBQUpELG9DQUlDO0FBRUQsZUFBc0IsSUFBZTtJQUVqQyxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsVUFBVTtRQUN0QixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0FBRU4sQ0FBQztBQVhELHNCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tICd1aS9mcmFtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblRhcChhcmdzOiBFdmVudERhdGEpIHtcblxuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZSh7XG4gICAgICAgIG1vZHVsZU5hbWU6IFwic3ViLXBhZ2VcIixcbiAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgIG5hbWU6IFwic2xpZGVSSWdodFwiLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfVxuICAgIH0pXG5cbn0iXX0=