"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var car_detail_view_model_1 = require("./car-detail-view-model");
/* ***********************************************************
* This is the item details code behind in the master-detail structure.
* This code behind retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
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
    page.bindingContext = new car_detail_view_model_1.CarDetailViewModel(page.navigationContext);
}
exports.onNavigatingTo = onNavigatingTo;
/* ***********************************************************
* The back button is essential for a master-detail feature.
*************************************************************/
function onBackButtonTap() {
    frame_1.topmost().goBack();
}
exports.onBackButtonTap = onBackButtonTap;
/* ***********************************************************
* The master-detail template comes with an example of an item edit page.
* Check out the edit page in the /cars/car-detail-edit-page folder.
*************************************************************/
function onEditButtonTap(args) {
    var bindingContext = args.object.bindingContext;
    frame_1.topmost().navigate({
        moduleName: "cars/car-detail-edit-page/car-detail-edit-page",
        context: bindingContext.car,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}
exports.onEditButtonTap = onEditButtonTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLWRldGFpbC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQW1DO0FBR25DLGlFQUE2RDtBQUU3RDs7Ozs4REFJOEQ7QUFFOUQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDBDQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFiRCx3Q0FhQztBQUVEOzs4REFFOEQ7QUFDOUQ7SUFDSSxlQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixDQUFDO0FBRkQsMENBRUM7QUFFRDs7OzhEQUc4RDtBQUM5RCx5QkFBZ0MsSUFBSTtJQUNoQyxJQUFNLGNBQWMsR0FBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFFdEUsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2YsVUFBVSxFQUFFLGdEQUFnRDtRQUM1RCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUc7UUFDM0IsUUFBUSxFQUFFLElBQUk7UUFDZCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxNQUFNO1NBQ2hCO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWJELDBDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IENhckRldGFpbFZpZXdNb2RlbCB9IGZyb20gXCIuL2Nhci1kZXRhaWwtdmlldy1tb2RlbFwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGlzIGlzIHRoZSBpdGVtIGRldGFpbHMgY29kZSBiZWhpbmQgaW4gdGhlIG1hc3Rlci1kZXRhaWwgc3RydWN0dXJlLlxyXG4qIFRoaXMgY29kZSBiZWhpbmQgcmV0cmlldmVzIHRoZSBwYXNzZWQgcGFyYW1ldGVyIGZyb20gdGhlIG1hc3RlciBsaXN0IGNvbXBvbmVudCxcclxuKiBmaW5kcyB0aGUgZGF0YSBpdGVtIGJ5IHRoaXMgcGFyYW1ldGVyIGFuZCBkaXNwbGF5cyB0aGUgZGV0YWlsZWQgZGF0YSBpdGVtIGluZm9ybWF0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSk6IHZvaWQge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG5cclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgQ2FyRGV0YWlsVmlld01vZGVsKHBhZ2UubmF2aWdhdGlvbkNvbnRleHQpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoZSBiYWNrIGJ1dHRvbiBpcyBlc3NlbnRpYWwgZm9yIGEgbWFzdGVyLWRldGFpbCBmZWF0dXJlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25CYWNrQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdG9wbW9zdCgpLmdvQmFjaygpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoZSBtYXN0ZXItZGV0YWlsIHRlbXBsYXRlIGNvbWVzIHdpdGggYW4gZXhhbXBsZSBvZiBhbiBpdGVtIGVkaXQgcGFnZS5cclxuKiBDaGVjayBvdXQgdGhlIGVkaXQgcGFnZSBpbiB0aGUgL2NhcnMvY2FyLWRldGFpbC1lZGl0LXBhZ2UgZm9sZGVyLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25FZGl0QnV0dG9uVGFwKGFyZ3MpOiB2b2lkIHtcclxuICAgIGNvbnN0IGJpbmRpbmdDb250ZXh0ID0gPENhckRldGFpbFZpZXdNb2RlbD5hcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dDtcclxuXHJcbiAgICB0b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IFwiY2Fycy9jYXItZGV0YWlsLWVkaXQtcGFnZS9jYXItZGV0YWlsLWVkaXQtcGFnZVwiLFxyXG4gICAgICAgIGNvbnRleHQ6IGJpbmRpbmdDb250ZXh0LmNhcixcclxuICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwic2xpZGVUb3BcIixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIl19