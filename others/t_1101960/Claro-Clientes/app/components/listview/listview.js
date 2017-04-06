var viewModel = require("./listview-view-model");
var viewModel = new viewModel.vmEquipos();

var listViewModule = require("ui/list-view");

function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;

    var listView = page.getViewById("list");
    listView.on(listViewModule.ListView.loadMoreItemsEvent, function (data) {
        viewModel.addItem();
    });
}
exports.navigatingTo = navigatingTo;

function onItemTap(args) {
    viewModel.addItem("My new item added");
}
exports.onItemTap = onItemTap;