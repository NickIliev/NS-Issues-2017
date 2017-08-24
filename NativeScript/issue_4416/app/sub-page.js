"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Frame.defaultTransition = { name: "slide", duration: 5000 };
var frame_1 = require("ui/frame");
function onTap(args) {
    frame_1.topmost().navigate({
        moduleName: "main-page",
        transition: {
            duration: 1500,
            name: "slide"
        }
    });
}
exports.onTap = onTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWItcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtEQUErRDtBQUUvRCxrQ0FBbUM7QUFFbkMsZUFBc0IsSUFBSTtJQUN0QixlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsV0FBVztRQUN2QixVQUFVLEVBQUU7WUFDUixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxPQUFPO1NBQ2hCO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQVJELHNCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJhbWUgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuLy8gRnJhbWUuZGVmYXVsdFRyYW5zaXRpb24gPSB7IG5hbWU6IFwic2xpZGVcIiwgZHVyYXRpb246IDUwMDAgfTtcclxuXHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRhcChhcmdzKSB7XHJcbiAgICB0b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IFwibWFpbi1wYWdlXCIsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSJdfQ==