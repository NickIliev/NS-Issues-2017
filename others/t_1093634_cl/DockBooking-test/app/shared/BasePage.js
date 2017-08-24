"use strict";
var frame_1 = require("ui/frame");
var observable_1 = require("data/observable");
var utils_1 = require("utils/utils");
var appViewModel = new observable_1.Observable({
    selectedPage: "home"
});
var BasePage = (function () {
    function BasePage() {
        //implement this function in the inheriting pages to set their specific binding context
        this.contentLoaded = function (args) { };
    }
    BasePage.prototype.basepageLoaded = function (args) {
        var page = args.object;
        page.bindingContext = appViewModel;
        var drawer = page.getViewById("drawer");
        drawer.showDrawer();
        drawer.closeDrawer();
    };
    BasePage.prototype.toggleDrawer = function () {
        var page = frame_1.topmost().currentPage;
        var drawer = page.getViewById("drawer");
        drawer.toggleDrawerState();
    };
    BasePage.prototype.closeDrawer = function () {
        var page = frame_1.topmost().currentPage;
        var drawer = page.getViewById("drawer");
        drawer.closeDrawer();
    };
    BasePage.prototype.openDrawer = function () {
        var page = frame_1.topmost().currentPage;
        var drawer = page.getViewById("drawer");
        drawer.showDrawer();
    };
    BasePage.prototype.navigate = function (args) {
        var page = frame_1.topmost().currentPage;
        page.enableSwipeBackNavigation = false; // NO WAY (vedi anche dopo, tento di disabilitare la slide navigation in iOS)
        // let drawer = <RadSideDrawer>page.getViewById("drawer");
        // drawer.closeDrawer();
        var pageName = args.object.text.toLowerCase();
        if (appViewModel.get("selectedPage") !== pageName) {
            appViewModel.set("selectedPage", pageName);
            frame_1.topmost().navigate({
                moduleName: "pages/" + pageName + "/" + pageName,
                backstackVisible: false,
                clearHistory: false,
                animated: true,
                transition: {
                    name: "slide",
                    duration: 250,
                    curve: "easeOut"
                }
            });
        }
        // garbage collect
        utils_1.GC();
    };
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCYXNlUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0NBQW1DO0FBRW5DLDhDQUF3RDtBQUd4RCxxQ0FBcUQ7QUFHckQsSUFBSSxZQUFZLEdBQUcsSUFBSSx1QkFBVSxDQUFDO0lBQzlCLFlBQVksRUFBRSxNQUFNO0NBQ3ZCLENBQUMsQ0FBQztBQUVIO0lBQUE7UUFDSSx1RkFBdUY7UUFDOUUsa0JBQWEsR0FBRyxVQUFDLElBQWMsSUFBTSxDQUFDLENBQUM7SUF3RHBELENBQUM7SUF0REcsaUNBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBUyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksR0FBUyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw2QkFBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLEdBQVMsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsMkJBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLElBQUksR0FBUyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQyxDQUFDLDZFQUE2RTtRQUVySCwwREFBMEQ7UUFDMUQsd0JBQXdCO1FBRXhCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRCxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQyxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2YsVUFBVSxFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVE7Z0JBQ2hELGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLFNBQVM7aUJBQ25CO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELGtCQUFrQjtRQUNsQixVQUFnQixFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBMURxQiw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IEdDIGFzIGdhcmJhZ2VDb2xsZWN0b3IgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuXG5sZXQgYXBwVmlld01vZGVsID0gbmV3IE9ic2VydmFibGUoe1xuICAgIHNlbGVjdGVkUGFnZTogXCJob21lXCJcbn0pO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2Uge1xuICAgIC8vaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gaW4gdGhlIGluaGVyaXRpbmcgcGFnZXMgdG8gc2V0IHRoZWlyIHNwZWNpZmljIGJpbmRpbmcgY29udGV4dFxuICAgIGFic3RyYWN0IGNvbnRlbnRMb2FkZWQgPSAoYXJnczpFdmVudERhdGEpID0+IHt9O1xuXG4gICAgYmFzZXBhZ2VMb2FkZWQoYXJncyl7XG4gICAgICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBhcHBWaWV3TW9kZWw7XG5cbiAgICAgICAgbGV0IGRyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnBhZ2UuZ2V0Vmlld0J5SWQoXCJkcmF3ZXJcIik7XG4gICAgICAgIGRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgICAgIGRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIH1cbiAgICBcbiAgICB0b2dnbGVEcmF3ZXIoKXtcbiAgICAgICAgbGV0IHBhZ2UgPSA8UGFnZT50b3Btb3N0KCkuY3VycmVudFBhZ2U7XG4gICAgICAgIGxldCBkcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHJhd2VyXCIpO1xuICAgICAgICBkcmF3ZXIudG9nZ2xlRHJhd2VyU3RhdGUoKTtcbiAgICB9XG5cbiAgICBjbG9zZURyYXdlcigpe1xuICAgICAgICBsZXQgcGFnZSA9IDxQYWdlPnRvcG1vc3QoKS5jdXJyZW50UGFnZTtcbiAgICAgICAgbGV0IGRyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnBhZ2UuZ2V0Vmlld0J5SWQoXCJkcmF3ZXJcIik7XG4gICAgICAgIGRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIH1cblxuICAgIG9wZW5EcmF3ZXIoKXtcbiAgICAgICAgbGV0IHBhZ2UgPSA8UGFnZT50b3Btb3N0KCkuY3VycmVudFBhZ2U7XG4gICAgICAgIGxldCBkcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHJhd2VyXCIpO1xuICAgICAgICBkcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKGFyZ3Mpe1xuICAgICAgICBsZXQgcGFnZSA9IDxQYWdlPnRvcG1vc3QoKS5jdXJyZW50UGFnZTtcbiAgICAgICAgcGFnZS5lbmFibGVTd2lwZUJhY2tOYXZpZ2F0aW9uID0gZmFsc2U7IC8vIE5PIFdBWSAodmVkaSBhbmNoZSBkb3BvLCB0ZW50byBkaSBkaXNhYmlsaXRhcmUgbGEgc2xpZGUgbmF2aWdhdGlvbiBpbiBpT1MpXG5cbiAgICAgICAgLy8gbGV0IGRyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnBhZ2UuZ2V0Vmlld0J5SWQoXCJkcmF3ZXJcIik7XG4gICAgICAgIC8vIGRyYXdlci5jbG9zZURyYXdlcigpO1xuXG4gICAgICAgIGxldCBwYWdlTmFtZSA9IGFyZ3Mub2JqZWN0LnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoYXBwVmlld01vZGVsLmdldChcInNlbGVjdGVkUGFnZVwiKSAhPT0gcGFnZU5hbWUpIHtcbiAgICAgICAgICAgIGFwcFZpZXdNb2RlbC5zZXQoXCJzZWxlY3RlZFBhZ2VcIiwgcGFnZU5hbWUpO1xuICAgICAgICAgICAgdG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiBcInBhZ2VzL1wiICsgcGFnZU5hbWUgKyBcIi9cIiArIHBhZ2VOYW1lLFxuICAgICAgICAgICAgICAgIGJhY2tzdGFja1Zpc2libGU6IGZhbHNlLCAvLyBOTyBXQVlcbiAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IGZhbHNlLCAvLyBOTyBXQVlcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZU91dFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnYXJiYWdlIGNvbGxlY3RcbiAgICAgICAgZ2FyYmFnZUNvbGxlY3RvcigpO1xuICAgIH1cbn1cbiJdfQ==