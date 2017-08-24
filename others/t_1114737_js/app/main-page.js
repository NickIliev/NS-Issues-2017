var createViewModel = require("./main-view-model").createViewModel;

var viewModel = createViewModel();
viewModel.set("isInitialized", true);

var listView;

function onPageLoaded(args) {
    var page = args.object;
    listView = page.getViewById("list");
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;

// not working with RadListView
exports.onSwipeCellFinished = function (args) {

    console.log("onSwipeEnded");
    
    var index = args.itemIndex;

    var oldItem = viewModel.items.getItem(index);
    console.log("status before set " + viewModel.get("status"+oldItem.id));

    viewModel.set("status"+oldItem.id, true);
    console.log("status after set " + viewModel.get("status"+oldItem.id)); // although the status+id binidng is now true.. the visibility is not triggered

    listView.refresh();
}

// not working with ListView
exports.itemTap = function (args) {

    console.log("itemTap");
    
    var index = args.index;

    var oldItem = viewModel.items.getItem(index);
    console.log("status before set " + viewModel.get("status"+oldItem.id));

    viewModel.set("status"+oldItem.id, true);
    console.log("status after set " + viewModel.get("status"+oldItem.id)); // although the status+id binidng is now true.. the visibility is not triggered

    listView.refresh();
}
