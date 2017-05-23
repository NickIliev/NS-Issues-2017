"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
var utils = require("utils/utils");
function setStatusBarColors() {
    // Make the iOS status bar transparent with white text.
    if (application.ios) {
        application.on("launch", function () {
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarStyle = UIStatusBarStyle.LightContent;
        });
    }
    // Make the Android status bar transparent.
    // See http://bradmartin.net/2016/03/10/fullscreen-and-navigation-bar-color-in-a-nativescript-android-app/
    // for details on the technique used.
    /*  if (application.android) {
        application.android.onActivityStarted = function () {
          if (application.android && platform.device.sdkVersion >= "21") {
            const View = android.view.View;
            const window = application.android.startActivity.getWindow();
            window.setStatusBarColor(0x000000);
    
            const decorView = window.getDecorView();
            decorView.setSystemUiVisibility(
              View.SYSTEM_UI_FLAG_LAYOUT_STABLE
              | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
              | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
              | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
          }
        };
      }*/
}
exports.setStatusBarColors = setStatusBarColors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhci11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdHVzLWJhci11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQTJDO0FBRTNDLG1DQUFxQztBQU1yQztJQUNFLHVEQUF1RDtJQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QixLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztRQUNsSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsMEdBQTBHO0lBQzFHLHFDQUFxQztJQUN2Qzs7Ozs7Ozs7Ozs7Ozs7O1NBZUs7QUFDTCxDQUFDO0FBM0JELGdEQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xuZGVjbGFyZSB2YXIgVUlTdGF0dXNCYXJTdHlsZTogYW55O1xuZGVjbGFyZSB2YXIgVUlBcHBsaWNhdGlvbjogYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdHVzQmFyQ29sb3JzKCkge1xuICAvLyBNYWtlIHRoZSBpT1Mgc3RhdHVzIGJhciB0cmFuc3BhcmVudCB3aXRoIHdoaXRlIHRleHQuXG4gIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICBhcHBsaWNhdGlvbi5vbihcImxhdW5jaFwiLCAoKSA9PiB7XG4gICAgICB1dGlscy5pb3MuZ2V0dGVyKFVJQXBwbGljYXRpb24sIFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24pLnN0YXR1c0JhclN0eWxlID0gVUlTdGF0dXNCYXJTdHlsZS5MaWdodENvbnRlbnQ7XG4gICAgfSk7XG4gIH1cblxuICAvLyBNYWtlIHRoZSBBbmRyb2lkIHN0YXR1cyBiYXIgdHJhbnNwYXJlbnQuXG4gIC8vIFNlZSBodHRwOi8vYnJhZG1hcnRpbi5uZXQvMjAxNi8wMy8xMC9mdWxsc2NyZWVuLWFuZC1uYXZpZ2F0aW9uLWJhci1jb2xvci1pbi1hLW5hdGl2ZXNjcmlwdC1hbmRyb2lkLWFwcC9cbiAgLy8gZm9yIGRldGFpbHMgb24gdGhlIHRlY2huaXF1ZSB1c2VkLlxuLyogIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbkFjdGl2aXR5U3RhcnRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkICYmIHBsYXRmb3JtLmRldmljZS5zZGtWZXJzaW9uID49IFwiMjFcIikge1xuICAgICAgICBjb25zdCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKTtcbiAgICAgICAgd2luZG93LnNldFN0YXR1c0JhckNvbG9yKDB4MDAwMDAwKTtcblxuICAgICAgICBjb25zdCBkZWNvclZpZXcgPSB3aW5kb3cuZ2V0RGVjb3JWaWV3KCk7XG4gICAgICAgIGRlY29yVmlldy5zZXRTeXN0ZW1VaVZpc2liaWxpdHkoXG4gICAgICAgICAgVmlldy5TWVNURU1fVUlfRkxBR19MQVlPVVRfU1RBQkxFXG4gICAgICAgICAgfCBWaWV3LlNZU1RFTV9VSV9GTEFHX0xBWU9VVF9ISURFX05BVklHQVRJT05cbiAgICAgICAgICB8IFZpZXcuU1lTVEVNX1VJX0ZMQUdfTEFZT1VUX0ZVTExTQ1JFRU5cbiAgICAgICAgICB8IFZpZXcuU1lTVEVNX1VJX0ZMQUdfSU1NRVJTSVZFX1NUSUNLWSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSovXG59XG4iXX0=