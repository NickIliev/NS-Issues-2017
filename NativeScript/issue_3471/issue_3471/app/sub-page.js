"use strict";
var main_view_model_1 = require("./main-view-model");
var frame = require("ui/frame");
function onNavigatingFrom(args) {
    var page = args.object;
    // console.log(page);
    // console.log(page.ios);
    var controller = frame.topmost().ios.controller;
    var navBar = controller.navigationBar;
    console.log(navBar.subviews);
    var myView = navBar.viewWithTag(17);
    myView.removeFromSuperview();
}
exports.onNavigatingFrom = onNavigatingFrom;
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    if (page.ios) {
        var controller = frame.topmost().ios.controller;
        var navBar = controller.navigationBar;
        /**
         * Make ActionBar background transparent
         */
        var navBar = controller.navigationBar;
        navBar.shadowImage = UIImage.alloc().init();
        navBar.setBackgroundImageForBarMetrics(UIImage.alloc(), 0 /* Default */);
        /**
         * Add custom view to navBar
         */
        var navBounds = navBar.bounds;
        var myView = UIView.alloc().init();
        myView.frame = {
            origin: { x: navBounds.origin.x, y: navBounds.origin.y - 20 },
            size: { width: navBounds.size.width, height: navBounds.size.height + 20 }
        };
        myView.autoresizingMask = 2 /* FlexibleWidth */ | 16 /* FlexibleHeight */;
        myView.userInteractionEnabled = false;
        myView.tag = 17;
        navBar.addSubview(myView);
        navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
        var scrollView = page.getViewById("scrollView");
        scrollView.on('scroll', function (args) {
            var scroll = args.object;
            var offset = scroll.verticalOffset;
            myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, (offset - 50) / 50);
        });
    }
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWItcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEscURBQW9EO0FBQ3BELGdDQUFrQztBQUtsQywwQkFBaUMsSUFBZTtJQUMvQyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDaEQsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU3QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBRTlCLENBQUM7QUFaRCw0Q0FZQztBQUVELHVCQUE4QixJQUFlO0lBQzVDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztJQUU1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDdEM7O1dBRUc7UUFDSCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsZUFBb0IsQ0FBQyxDQUFDO1FBQzlFOztXQUVHO1FBQ0gsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLEtBQUssR0FBRztZQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1NBQ3pFLENBQUM7UUFDRixNQUFNLENBQUMsZ0JBQWdCLEdBQUcscUJBQWdDLEdBQUcsdUJBQWlDLENBQUM7UUFDL0YsTUFBTSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUV0QyxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVoQixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRW5GLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQSxJQUFJO1lBQzNCLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxNQUFNLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNuRyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7QUFDRixDQUFDO0FBdkNELHNDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tIFwidWkvZnJhbWVcIjtcblxuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdGcm9tKGFyZ3M6IEV2ZW50RGF0YSkge1xuXHRsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG5cdC8vIGNvbnNvbGUubG9nKHBhZ2UpO1xuXHQvLyBjb25zb2xlLmxvZyhwYWdlLmlvcyk7XG5cdHZhciBjb250cm9sbGVyID0gZnJhbWUudG9wbW9zdCgpLmlvcy5jb250cm9sbGVyO1xuXHR2YXIgbmF2QmFyID0gY29udHJvbGxlci5uYXZpZ2F0aW9uQmFyO1xuXHRjb25zb2xlLmxvZyhuYXZCYXIuc3Vidmlld3MpO1xuXHRcblx0dmFyIG15VmlldyA9IG5hdkJhci52aWV3V2l0aFRhZygxNyk7XG5cdG15Vmlldy5yZW1vdmVGcm9tU3VwZXJ2aWV3KCk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XG5cdGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cblx0cGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcblxuXHRpZiAocGFnZS5pb3MpIHtcblx0XHR2YXIgY29udHJvbGxlciA9IGZyYW1lLnRvcG1vc3QoKS5pb3MuY29udHJvbGxlcjtcblx0XHR2YXIgbmF2QmFyID0gY29udHJvbGxlci5uYXZpZ2F0aW9uQmFyO1xuXHRcdC8qKlxuXHRcdCAqIE1ha2UgQWN0aW9uQmFyIGJhY2tncm91bmQgdHJhbnNwYXJlbnRcblx0XHQgKi9cblx0XHR2YXIgbmF2QmFyID0gY29udHJvbGxlci5uYXZpZ2F0aW9uQmFyO1xuXHRcdG5hdkJhci5zaGFkb3dJbWFnZSA9IFVJSW1hZ2UuYWxsb2MoKS5pbml0KCk7XG5cdFx0bmF2QmFyLnNldEJhY2tncm91bmRJbWFnZUZvckJhck1ldHJpY3MoVUlJbWFnZS5hbGxvYygpLCBVSUJhck1ldHJpY3MuRGVmYXVsdCk7XG5cdFx0LyoqXG5cdFx0ICogQWRkIGN1c3RvbSB2aWV3IHRvIG5hdkJhclxuXHRcdCAqL1xuXHRcdHZhciBuYXZCb3VuZHMgPSBuYXZCYXIuYm91bmRzO1xuXHRcdHZhciBteVZpZXcgPSBVSVZpZXcuYWxsb2MoKS5pbml0KCk7XG5cdFx0bXlWaWV3LmZyYW1lID0ge1xuXHRcdFx0b3JpZ2luOiB7IHg6IG5hdkJvdW5kcy5vcmlnaW4ueCwgeTogbmF2Qm91bmRzLm9yaWdpbi55IC0gMjAgfSxcblx0XHRcdHNpemU6IHsgd2lkdGg6IG5hdkJvdW5kcy5zaXplLndpZHRoLCBoZWlnaHQ6IG5hdkJvdW5kcy5zaXplLmhlaWdodCArIDIwIH1cblx0XHR9O1xuXHRcdG15Vmlldy5hdXRvcmVzaXppbmdNYXNrID0gVUlWaWV3QXV0b3Jlc2l6aW5nLkZsZXhpYmxlV2lkdGggfCBVSVZpZXdBdXRvcmVzaXppbmcuRmxleGlibGVIZWlnaHQ7XG5cdFx0bXlWaWV3LnVzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBmYWxzZTtcblxuXHRcdG15Vmlldy50YWcgPSAxNztcblxuXHRcdG5hdkJhci5hZGRTdWJ2aWV3KG15Vmlldyk7XG5cblx0XHRuYXZCYXIuYmFja2dyb3VuZENvbG9yID0gVUlDb2xvci5jb2xvcldpdGhSZWRHcmVlbkJsdWVBbHBoYSgwLjIwLCAwLjIwLCAwLjIwLCAwLjApO1xuXG5cdFx0dmFyIHNjcm9sbFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwic2Nyb2xsVmlld1wiKTtcblx0XHRzY3JvbGxWaWV3Lm9uKCdzY3JvbGwnLCBhcmdzID0+IHtcblx0XHRcdGxldCBzY3JvbGwgPSA8U2Nyb2xsVmlldz5hcmdzLm9iamVjdDtcblx0XHRcdHZhciBvZmZzZXQgPSBzY3JvbGwudmVydGljYWxPZmZzZXQ7XG5cdFx0XHRteVZpZXcuYmFja2dyb3VuZENvbG9yID0gVUlDb2xvci5jb2xvcldpdGhSZWRHcmVlbkJsdWVBbHBoYSgwLjIwLCAwLjIwLCAwLjIwLCAob2Zmc2V0IC0gNTApIC8gNTApO1xuXHRcdH0pO1xuXHR9XG59XG4iXX0=