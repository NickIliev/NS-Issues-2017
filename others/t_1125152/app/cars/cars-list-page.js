"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var cars_list_view_model_1 = require("./cars-list-view-model");
/* ***********************************************************
* This is the master list code behind in the master-detail structure.
* This code behind gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    var page = args.object;
    var viewModel = new cars_list_view_model_1.CarsListViewModel();
    page.bindingContext = viewModel;
    viewModel.load();
}
exports.onNavigatingTo = onNavigatingTo;
/* ***********************************************************
* Use the "itemTap" event handler of the <RadListView> to navigate to the
* item details page. Retrieve a reference for the data item (the id) and pass it
* to the item details page, so that it can identify which data item to display.
* Learn more about navigating with a parameter in this documentation article:
* http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
*************************************************************/
function onCarItemTap(args) {
    var tappedCarItem = args.view.bindingContext;
    frame_1.topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}
exports.onCarItemTap = onCarItemTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy1saXN0LXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJzLWxpc3QtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtDQUFtQztBQUduQywrREFBMkQ7QUFHM0Q7Ozs7OERBSThEO0FBRTlEOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQU0sU0FBUyxHQUFHLElBQUksd0NBQWlCLEVBQUUsQ0FBQztJQUUxQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUNoQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckIsQ0FBQztBQWZELHdDQWVDO0FBRUQ7Ozs7Ozs4REFNOEQ7QUFDOUQsc0JBQTZCLElBQXVCO0lBQ2hELElBQU0sYUFBYSxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBRXBELGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNmLFVBQVUsRUFBRSxzQ0FBc0M7UUFDbEQsT0FBTyxFQUFFLGFBQWE7UUFDdEIsUUFBUSxFQUFFLElBQUk7UUFDZCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLE1BQU07U0FDaEI7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBYkQsb0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlld1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgQ2Fyc0xpc3RWaWV3TW9kZWwgfSBmcm9tIFwiLi9jYXJzLWxpc3Qtdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi9zaGFyZWQvY2FyLW1vZGVsXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIG1hc3RlciBsaXN0IGNvZGUgYmVoaW5kIGluIHRoZSBtYXN0ZXItZGV0YWlsIHN0cnVjdHVyZS5cclxuKiBUaGlzIGNvZGUgYmVoaW5kIGdldHMgdGhlIGRhdGEsIHBhc3NlcyBpdCB0byB0aGUgbWFzdGVyIHZpZXcgYW5kIGRpc3BsYXlzIGl0IGluIGEgbGlzdC5cclxuKiBJdCBhbHNvIGhhbmRsZXMgdGhlIG5hdmlnYXRpb24gdG8gdGhlIGRldGFpbHMgcGFnZSBmb3IgZWFjaCBpdGVtLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSk6IHZvaWQge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgY29uc3Qgdmlld01vZGVsID0gbmV3IENhcnNMaXN0Vmlld01vZGVsKCk7XHJcblxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZpZXdNb2RlbDtcclxuICAgIHZpZXdNb2RlbC5sb2FkKCk7XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIml0ZW1UYXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSA8UmFkTGlzdFZpZXc+IHRvIG5hdmlnYXRlIHRvIHRoZVxyXG4qIGl0ZW0gZGV0YWlscyBwYWdlLiBSZXRyaWV2ZSBhIHJlZmVyZW5jZSBmb3IgdGhlIGRhdGEgaXRlbSAodGhlIGlkKSBhbmQgcGFzcyBpdFxyXG4qIHRvIHRoZSBpdGVtIGRldGFpbHMgcGFnZSwgc28gdGhhdCBpdCBjYW4gaWRlbnRpZnkgd2hpY2ggZGF0YSBpdGVtIHRvIGRpc3BsYXkuXHJcbiogTGVhcm4gbW9yZSBhYm91dCBuYXZpZ2F0aW5nIHdpdGggYSBwYXJhbWV0ZXIgaW4gdGhpcyBkb2N1bWVudGF0aW9uIGFydGljbGU6XHJcbiogaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvcmUtY29uY2VwdHMvYW5ndWxhci1uYXZpZ2F0aW9uLmh0bWwjcGFzc2luZy1wYXJhbWV0ZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2FySXRlbVRhcChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFwcGVkQ2FySXRlbSA9IDxDYXI+YXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xyXG5cclxuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogXCJjYXJzL2Nhci1kZXRhaWwtcGFnZS9jYXItZGV0YWlsLXBhZ2VcIixcclxuICAgICAgICBjb250ZXh0OiB0YXBwZWRDYXJJdGVtLFxyXG4gICAgICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXX0=