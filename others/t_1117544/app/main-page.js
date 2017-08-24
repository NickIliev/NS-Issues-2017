var observable_1 = require("data/observable");
var fs = require("file-system");
var listView_1 = require("nativescript-telerik-ui/listview");

var ObservableArray = require("data/observable-array").ObservableArray;

var myImagePaths = new ObservableArray();

var viewModel = new observable_1.Observable();

exports.navigatedTo = function(args) {
    readFiles();
    var page = args.object;
    page.bindingContext = viewModel;
}

function lvloaded(args) {
    var listview = args.object;
    listview.on(listView_1.RadListView.itemTapEvent, function (args) {
        console.log("selected item index " + args.itemIndex);
    });
}
exports.lvloaded = lvloaded;

function readFiles() {
    var documents = fs.knownFolders.currentApp();
    var myFolder = documents.getFolder("images");
    var arr = myFolder.getEntitiesSync();

    myImagePaths = new ObservableArray();

    arr.forEach(function (element) {
        myImagePaths.push({path: element._path});
    });

    viewModel.set("myItems", myImagePaths);
}