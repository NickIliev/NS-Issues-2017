"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var navigationEntry = {
    moduleName: "pages/controller/controller-page",
    //    context: {mipDevice: mipDevice},
    animated: false,
    backstackVisible: false
};
function navigateToScanner() {
    navigationEntry.moduleName = "pages/scan/scan-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToScanner = navigateToScanner;
function navigateToArrows() {
    navigationEntry.moduleName = "pages/arrows/arrows-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToArrows = navigateToArrows;
function navigateToAccelerometer() {
    navigationEntry.moduleName = "pages/accelerometer/accelerometer-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToAccelerometer = navigateToAccelerometer;
function navigateToJoystick() {
    navigationEntry.moduleName = "pages/joystick/joystick-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToJoystick = navigateToJoystick;
function navigateToSound() {
    navigationEntry.moduleName = "pages/sound/sound-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToSound = navigateToSound;
function navigateToLights() {
    navigationEntry.moduleName = "pages/lights/lights-page";
    frame_1.topmost().navigate(navigationEntry);
}
exports.navigateToLights = navigateToLights;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFtQztBQUVuQyxJQUFJLGVBQWUsR0FBRztJQUNsQixVQUFVLEVBQUUsa0NBQWtDO0lBQzlDLHNDQUFzQztJQUN0QyxRQUFRLEVBQUUsS0FBSztJQUNmLGdCQUFnQixFQUFFLEtBQUs7Q0FDMUIsQ0FBQztBQUVGO0lBQ0ksZUFBZSxDQUFDLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQztJQUNwRCxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUhELDhDQUdDO0FBRUQ7SUFDSSxlQUFlLENBQUMsVUFBVSxHQUFHLDBCQUEwQixDQUFDO0lBQ3hELGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSEQsNENBR0M7QUFFRDtJQUNJLGVBQWUsQ0FBQyxVQUFVLEdBQUcsd0NBQXdDLENBQUM7SUFDdEUsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFIRCwwREFHQztBQUVEO0lBQ0ksZUFBZSxDQUFDLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQztJQUM1RCxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUhELGdEQUdDO0FBRUQ7SUFDSSxlQUFlLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0lBQ3RELGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSEQsMENBR0M7QUFFRDtJQUNJLGVBQWUsQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQUM7SUFDeEQsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFIRCw0Q0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcblxudmFyIG5hdmlnYXRpb25FbnRyeSA9IHtcbiAgICBtb2R1bGVOYW1lOiBcInBhZ2VzL2NvbnRyb2xsZXIvY29udHJvbGxlci1wYWdlXCIsXG4gICAgLy8gICAgY29udGV4dDoge21pcERldmljZTogbWlwRGV2aWNlfSxcbiAgICBhbmltYXRlZDogZmFsc2UsXG4gICAgYmFja3N0YWNrVmlzaWJsZTogZmFsc2Vcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZVRvU2Nhbm5lcigpIHtcbiAgICBuYXZpZ2F0aW9uRW50cnkubW9kdWxlTmFtZSA9IFwicGFnZXMvc2Nhbi9zY2FuLXBhZ2VcIjtcbiAgICB0b3Btb3N0KCkubmF2aWdhdGUobmF2aWdhdGlvbkVudHJ5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRlVG9BcnJvd3MoKSB7XG4gICAgbmF2aWdhdGlvbkVudHJ5Lm1vZHVsZU5hbWUgPSBcInBhZ2VzL2Fycm93cy9hcnJvd3MtcGFnZVwiO1xuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZShuYXZpZ2F0aW9uRW50cnkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVUb0FjY2VsZXJvbWV0ZXIoKSB7XG4gICAgbmF2aWdhdGlvbkVudHJ5Lm1vZHVsZU5hbWUgPSBcInBhZ2VzL2FjY2VsZXJvbWV0ZXIvYWNjZWxlcm9tZXRlci1wYWdlXCI7XG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKG5hdmlnYXRpb25FbnRyeSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZVRvSm95c3RpY2soKSB7XG4gICAgbmF2aWdhdGlvbkVudHJ5Lm1vZHVsZU5hbWUgPSBcInBhZ2VzL2pveXN0aWNrL2pveXN0aWNrLXBhZ2VcIjtcbiAgICB0b3Btb3N0KCkubmF2aWdhdGUobmF2aWdhdGlvbkVudHJ5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRlVG9Tb3VuZCgpIHtcbiAgICBuYXZpZ2F0aW9uRW50cnkubW9kdWxlTmFtZSA9IFwicGFnZXMvc291bmQvc291bmQtcGFnZVwiO1xuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZShuYXZpZ2F0aW9uRW50cnkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVUb0xpZ2h0cygpIHtcbiAgICBuYXZpZ2F0aW9uRW50cnkubW9kdWxlTmFtZSA9IFwicGFnZXMvbGlnaHRzL2xpZ2h0cy1wYWdlXCI7XG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKG5hdmlnYXRpb25FbnRyeSk7XG59XG5cblxuXG4iXX0=