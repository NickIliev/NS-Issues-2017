"use strict";
var main_view_model_1 = require("./main-view-model");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
function navigatingTo(args) {
    var page = args.object;
    var loader = new nativescript_loading_indicator_1.LoadingIndicator();
    createLoader(loader);
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function createLoader(loader) {
    // optional options 
    // android and ios have some platform specific options 
    var options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            details: "Additional detail note!",
            square: false,
            margin: 10,
            dimBackground: true,
            color: "#4B9ED6"
        }
    };
    loader.show(options); // options is optional 
}
function hideLoader(loader) {
    // Do whatever it is you want to do while the loader is showing, then 
    loader.hide();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxxREFBb0Q7QUFDcEQsaUZBQWtFO0FBRWxFLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQ3BDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFQRCxvQ0FPQztBQUVELHNCQUFzQixNQUF3QjtJQUUxQyxvQkFBb0I7SUFDcEIsdURBQXVEO0lBQ3ZELElBQUksT0FBTyxHQUFHO1FBQ1YsT0FBTyxFQUFFLFlBQVk7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUU7WUFDTCxhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixHQUFHLEVBQUUsR0FBRztZQUNSLG9CQUFvQixFQUFFLFNBQVM7WUFDL0IscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixhQUFhLEVBQUUsQ0FBQztZQUNoQixpQkFBaUIsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxFQUFFO1lBQ1YsYUFBYSxFQUFFLElBQUk7WUFDbkIsS0FBSyxFQUFFLFNBQVM7U0FDbkI7S0FDSixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtBQUNqRCxDQUFDO0FBRUQsb0JBQW9CLE1BQU07SUFDdEIsc0VBQXNFO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIHZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICAgIGNyZWF0ZUxvYWRlcihsb2FkZXIpO1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9hZGVyKGxvYWRlcjogTG9hZGluZ0luZGljYXRvcikge1xuICAgIFxuICAgIC8vIG9wdGlvbmFsIG9wdGlvbnMgXG4gICAgLy8gYW5kcm9pZCBhbmQgaW9zIGhhdmUgc29tZSBwbGF0Zm9ybSBzcGVjaWZpYyBvcHRpb25zIFxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXG4gICAgICAgIHByb2dyZXNzOiAwLjY1LFxuICAgICAgICBhbmRyb2lkOiB7XG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcbiAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcbiAgICAgICAgICAgIHByb2dyZXNzU3R5bGU6IDEsXG4gICAgICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxuICAgICAgICB9LFxuICAgICAgICBpb3M6IHtcbiAgICAgICAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcbiAgICAgICAgICAgIHNxdWFyZTogZmFsc2UsXG4gICAgICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRlci5zaG93KG9wdGlvbnMpOyAvLyBvcHRpb25zIGlzIG9wdGlvbmFsIFxufVxuXG5mdW5jdGlvbiBoaWRlTG9hZGVyKGxvYWRlcikge1xuICAgIC8vIERvIHdoYXRldmVyIGl0IGlzIHlvdSB3YW50IHRvIGRvIHdoaWxlIHRoZSBsb2FkZXIgaXMgc2hvd2luZywgdGhlbiBcbiAgIGxvYWRlci5oaWRlKCk7XG59Il19