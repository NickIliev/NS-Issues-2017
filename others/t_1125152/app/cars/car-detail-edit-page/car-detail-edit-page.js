"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs_1 = require("ui/dialogs");
var frame_1 = require("ui/frame");
var car_detail_edit_view_model_1 = require("./car-detail-edit-view-model");
/* ***********************************************************
* This is the item detail edit code behind.
* This code behind gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
/* ***********************************************************
* Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
* Use it to initialize the view model and assign it as a view binding context.
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
    page.bindingContext = new car_detail_edit_view_model_1.CarDetailEditViewModel(page.navigationContext);
}
exports.onNavigatingTo = onNavigatingTo;
/* ***********************************************************
* The edit cancel button navigates back to the item details page.
*************************************************************/
function onCancelButtonTap(args) {
    frame_1.topmost().goBack();
}
exports.onCancelButtonTap = onCancelButtonTap;
/* ***********************************************************
* The edit done button calls the view model save changes logic.
*************************************************************/
function onDoneButtonTap(args) {
    /* ***********************************************************
    * By design this app is set up to work with read-only sample data.
    * Follow the steps in the "Firebase database setup" section in app/readme.md file
    * and uncomment the code block below to make it editable.
    *************************************************************/
    /* ***********************************************************
    const actionItem = <ActionItem>args.object;
    const bindingContext = <CarDetailEditViewModel>actionItem.bindingContext;

    bindingContext.saveChanges()
        .then(() => topmost().navigate({
            moduleName: "cars/cars-list-page",
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }))
        .catch((errorMessage: any) =>
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" }));
    *************************************************************/
    /* ***********************************************************
    * Comment out the code block below if you made the app editable.
    *************************************************************/
    var readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
    var queue = Promise.resolve();
    queue.then(function () { return dialogs_1.alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }); })
        .then(function () { return frame_1.topmost().navigate({
        moduleName: "cars/cars-list-page",
        clearHistory: true,
        animated: true,
        transition: {
            name: "slideBottom",
            duration: 200,
            curve: "ease"
        }
    }); });
}
exports.onDoneButtonTap = onDoneButtonTap;
function onSelectorTap(args) {
    var gridLayout = args.object;
    var tag = gridLayout.get("tag");
    var bindingContext = gridLayout.bindingContext;
    var selectedValue = bindingContext.car[tag];
    var context = { tag: tag, selectedValue: selectedValue };
    var modalPagePath = "cars/list-selector-modal-page/list-selector-modal-page";
    var page = gridLayout.page;
    page.showModal(modalPagePath, context, function (value) {
        if (value) {
            bindingContext.car[tag] = value;
        }
    }, false);
}
exports.onSelectorTap = onSelectorTap;
function onImageAddRemoveTap(args) {
    var gridLayout = args.object;
    var bindingContext = gridLayout.bindingContext;
    bindingContext.onImageAddRemove();
}
exports.onImageAddRemoveTap = onImageAddRemoveTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC1lZGl0LXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXItZGV0YWlsLWVkaXQtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNDQUFtQztBQUNuQyxrQ0FBbUM7QUFJbkMsMkVBQXNFO0FBRXRFOzs7OERBRzhEO0FBRTlEOzs7OERBRzhEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUUvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksbURBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0UsQ0FBQztBQWJELHdDQWFDO0FBRUQ7OzhEQUU4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxlQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixDQUFDO0FBRkQsOENBRUM7QUFFRDs7OERBRThEO0FBQzlELHlCQUFnQyxJQUFlO0lBQzNDOzs7O2tFQUk4RDtJQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBaUI4RDtJQUU5RDs7a0VBRThEO0lBQzlELElBQU0sZUFBZSxHQUFHLDJGQUEyRixDQUFDLENBQUMsc0NBQXNDO0lBQzNKLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxlQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBckYsQ0FBcUYsQ0FBQztTQUNsRyxJQUFJLENBQUMsY0FBTSxPQUFBLGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUUsTUFBTTtTQUNoQjtLQUNKLENBQUMsRUFUVSxDQVNWLENBQUMsQ0FBQztBQUNaLENBQUM7QUExQ0QsMENBMENDO0FBRUQsdUJBQThCLElBQWU7SUFDekMsSUFBTSxVQUFVLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxJQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLElBQU0sY0FBYyxHQUEyQixVQUFVLENBQUMsY0FBYyxDQUFDO0lBQ3pFLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsSUFBTSxPQUFPLEdBQUcsRUFBRSxHQUFHLEtBQUEsRUFBRSxhQUFhLGVBQUEsRUFBRSxDQUFDO0lBQ3ZDLElBQU0sYUFBYSxHQUFHLHdEQUF3RCxDQUFDO0lBQy9FLElBQU0sSUFBSSxHQUFTLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFFbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBYTtRQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNkLENBQUM7QUFkRCxzQ0FjQztBQUVELDZCQUFvQyxJQUFlO0lBQy9DLElBQU0sVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDM0MsSUFBTSxjQUFjLEdBQTJCLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFFekUsY0FBYyxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDdEMsQ0FBQztBQUxELGtEQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSBcInVpL2FjdGlvbi1iYXJcIjtcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IENhckRldGFpbEVkaXRWaWV3TW9kZWwgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQtdmlldy1tb2RlbFwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGlzIGlzIHRoZSBpdGVtIGRldGFpbCBlZGl0IGNvZGUgYmVoaW5kLlxyXG4qIFRoaXMgY29kZSBiZWhpbmQgZ2V0cyB0aGUgc2VsZWN0ZWQgZGF0YSBpdGVtLCBwcm92aWRlcyBvcHRpb25zIHRvIGVkaXQgdGhlIGl0ZW0gYW5kIHNhdmVzIHRoZSBjaGFuZ2VzLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBpdGVtIGlkIHBhcmFtZXRlciBwYXNzZWQgdGhyb3VnaCBuYXZpZ2F0aW9uLlxyXG4qIFVzZSBpdCB0byBpbml0aWFsaXplIHRoZSB2aWV3IG1vZGVsIGFuZCBhc3NpZ24gaXQgYXMgYSB2aWV3IGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpOiB2b2lkIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuXHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IENhckRldGFpbEVkaXRWaWV3TW9kZWwocGFnZS5uYXZpZ2F0aW9uQ29udGV4dCk7XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVGhlIGVkaXQgY2FuY2VsIGJ1dHRvbiBuYXZpZ2F0ZXMgYmFjayB0byB0aGUgaXRlbSBkZXRhaWxzIHBhZ2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkNhbmNlbEJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIHRvcG1vc3QoKS5nb0JhY2soKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGUgZWRpdCBkb25lIGJ1dHRvbiBjYWxscyB0aGUgdmlldyBtb2RlbCBzYXZlIGNoYW5nZXMgbG9naWMuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRvbmVCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBCeSBkZXNpZ24gdGhpcyBhcHAgaXMgc2V0IHVwIHRvIHdvcmsgd2l0aCByZWFkLW9ubHkgc2FtcGxlIGRhdGEuXHJcbiAgICAqIEZvbGxvdyB0aGUgc3RlcHMgaW4gdGhlIFwiRmlyZWJhc2UgZGF0YWJhc2Ugc2V0dXBcIiBzZWN0aW9uIGluIGFwcC9yZWFkbWUubWQgZmlsZVxyXG4gICAgKiBhbmQgdW5jb21tZW50IHRoZSBjb2RlIGJsb2NrIGJlbG93IHRvIG1ha2UgaXQgZWRpdGFibGUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBjb25zdCBhY3Rpb25JdGVtID0gPEFjdGlvbkl0ZW0+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBiaW5kaW5nQ29udGV4dCA9IDxDYXJEZXRhaWxFZGl0Vmlld01vZGVsPmFjdGlvbkl0ZW0uYmluZGluZ0NvbnRleHQ7XHJcblxyXG4gICAgYmluZGluZ0NvbnRleHQuc2F2ZUNoYW5nZXMoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiY2Fycy9jYXJzLWxpc3QtcGFnZVwiLFxyXG4gICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlQm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PlxyXG4gICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIk9vcHMhXCIsIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pKTtcclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQ29tbWVudCBvdXQgdGhlIGNvZGUgYmxvY2sgYmVsb3cgaWYgeW91IG1hZGUgdGhlIGFwcCBlZGl0YWJsZS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBjb25zdCByZWFkT25seU1lc3NhZ2UgPSBcIkNoZWNrIG91dCB0aGUgXFxcIkZpcmViYXNlIGRhdGFiYXNlIHNldHVwXFxcIiBzZWN0aW9uIGluIHRoZSByZWFkbWUgZmlsZSB0byBtYWtlIGl0IGVkaXRhYmxlLlwiOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgcXVldWUgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIHF1ZXVlLnRoZW4oKCkgPT4gYWxlcnQoeyB0aXRsZTogXCJSZWFkLU9ubHkgVGVtcGxhdGUhXCIsIG1lc3NhZ2U6IHJlYWRPbmx5TWVzc2FnZSwgb2tCdXR0b25UZXh0OiBcIk9rXCIgfSkpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gdG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICAgICAgbW9kdWxlTmFtZTogXCJjYXJzL2NhcnMtbGlzdC1wYWdlXCIsXHJcbiAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVCb3R0b21cIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uU2VsZWN0b3JUYXAoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBncmlkTGF5b3V0ID0gPEdyaWRMYXlvdXQ+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCB0YWcgPSBncmlkTGF5b3V0LmdldChcInRhZ1wiKTtcclxuICAgIGNvbnN0IGJpbmRpbmdDb250ZXh0ID0gPENhckRldGFpbEVkaXRWaWV3TW9kZWw+Z3JpZExheW91dC5iaW5kaW5nQ29udGV4dDtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBiaW5kaW5nQ29udGV4dC5jYXJbdGFnXTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB7IHRhZywgc2VsZWN0ZWRWYWx1ZSB9O1xyXG4gICAgY29uc3QgbW9kYWxQYWdlUGF0aCA9IFwiY2Fycy9saXN0LXNlbGVjdG9yLW1vZGFsLXBhZ2UvbGlzdC1zZWxlY3Rvci1tb2RhbC1wYWdlXCI7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+Z3JpZExheW91dC5wYWdlO1xyXG5cclxuICAgIHBhZ2Uuc2hvd01vZGFsKG1vZGFsUGFnZVBhdGgsIGNvbnRleHQsICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGJpbmRpbmdDb250ZXh0LmNhclt0YWddID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25JbWFnZUFkZFJlbW92ZVRhcChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnN0IGdyaWRMYXlvdXQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGJpbmRpbmdDb250ZXh0ID0gPENhckRldGFpbEVkaXRWaWV3TW9kZWw+Z3JpZExheW91dC5iaW5kaW5nQ29udGV4dDtcclxuXHJcbiAgICBiaW5kaW5nQ29udGV4dC5vbkltYWdlQWRkUmVtb3ZlKCk7XHJcbn1cclxuIl19