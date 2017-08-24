
import viewModel = require("./main-view-model");
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import viewModule = require('tns-core-modules/ui/core/view');
import frameModule = require("tns-core-modules/ui/frame");
import utilsModule = require("tns-core-modules/utils/utils");

import { Label } from "ui/label";

export function onPageLoaded(args) {
    var page = args.object;

    page.bindingContext = new viewModel.ViewModel();
}

export function onItemSwiping(args: listViewModule.SwipeActionsEventData) {
}

export function onSwipeCellProgressChanged(args: listViewModule.SwipeActionsEventData) {
    var swipeLimits = args.data.swipeLimits;
    var currentItemView = args.object;

    console.log("args.swipeView: " + args.swipeView);
    var swipeView = args.swipeView;

    var lbl = args.swipeView.getViewById("lbl") as Label;
    console.log("onSwipeCellProgressChanged lbl: " + lbl);

    if (args.data.x > 200) {
        console.log("Notify perform left action");
    } else if (args.data.x < -200) {
        console.log("Notify perform right action");

        // we could delete the item when the user swipes over the rule above (n else if)

        // var listView = <listViewModule.RadListView>frameModule.topmost().currentPage.getViewById("listView");
        // var viewModel: viewModel.ViewModel = <viewModel.ViewModel>listView.bindingContext;
        // viewModel.dataItems.splice(args.index, 1);
    }
}
// << listview-swipe-action-release-notify

// >> listview-swipe-action-release-limits
export function onSwipeCellStarted(args: listViewModule.SwipeActionsEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var leftItem = swipeView.getViewById<viewModule.View>('mark-view');
    var rightItem = swipeView.getViewById<viewModule.View>('delete-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 1.4;

}
// << listview-swipe-action-release-limits

// >> listview-swipe-action-release-execute
export function onSwipeCellFinished(args: listViewModule.SwipeActionsEventData) {
    var listView = <listViewModule.RadListView>frameModule.topmost().currentPage.getViewById("listView");
    console.log("onSwipeCellFinished");

}

export function onLeftSwipeClick(args: listViewModule.ListViewEventData) {
    var listView = <listViewModule.RadListView>frameModule.topmost().currentPage.getViewById("listView");
    console.log("Left swipe click");
    listView.notifySwipeToExecuteFinished();
}

export function onRightSwipeClick(args) {
    var listView = <listViewModule.RadListView>frameModule.topmost().currentPage.getViewById("listView");
    console.log("Right swipe click");
    var viewModel: viewModel.ViewModel = <viewModel.ViewModel>listView.bindingContext;
    viewModel.dataItems.splice(viewModel.dataItems.indexOf(args.object.bindingContext), 1);
}
