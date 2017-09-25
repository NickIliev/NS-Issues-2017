var listview_1 = require("nativescript-telerik-ui/listview");
var application = require("application");

exports.pageUnloaded = function() {
    application.off(application.orientationChangedEvent);
    console.log("Page unloaded!");
}
function onNavigatingTo(args) {
    application.on(application.orientationChangedEvent, function(args) {
        setOrientation(args);
    });

    var page = args.object;
    var calcSpan = "3";
    var myContent = ["~/img/Test.png", "~/img/Test.png", "~/img/Test.png", "~/img/Test.png", "~/img/Test.png", "~/img/Test.png"];

    var listView = new listview_1.RadListView();
        listView.height = 900;
        listView.items = myContent;
        listView.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";

    var gridLayout = new listview_1.ListViewGridLayout();
        gridLayout.scrollDirection = "Vertical";
        gridLayout.spanCount = calcSpan;
        listView.listViewLayout = gridLayout;

    var container = page.getViewById("container");
        container.addChild(listView);

    function setOrientation(args) {
        console.log("setOrientation called: " + args.newValue);

        var orientation = args.newValue;
        switch (orientation) {
            case "portrait":
                    console.log("portrait");
                    calcSpan = 3;

                    var listView = new listview_1.RadListView();
                    listView.height = 900;
                    listView.items = myContent;
                    listView.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";

                    var gridLayout = new listview_1.ListViewGridLayout();
                    gridLayout.scrollDirection = "Vertical";
                    gridLayout.spanCount = calcSpan;
                    listView.listViewLayout = gridLayout;

                    container.removeChildren();
                    container.addChild(listView);
                break;
            case "landscape":
                    console.log("landscape");
                    calcSpan = 2;

                    var listView = new listview_1.RadListView();
                    listView.height = 900;
                    listView.items = myContent;
                    listView.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";

                    var gridLayout = new listview_1.ListViewGridLayout();
                    gridLayout.scrollDirection = "Vertical";
                    gridLayout.spanCount = calcSpan;
                    listView.listViewLayout = gridLayout;

                    container.removeChildren();
                    container.addChild(listView);
                break;        
            default:
                    console.log("undefined");
                    calcSpan = 3;

                    var listView = new listview_1.RadListView();
                    listView.height = 900;
                    listView.items = myContent;
                    listView.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";

                    var gridLayout = new listview_1.ListViewGridLayout();
                    gridLayout.scrollDirection = "Vertical";
                    gridLayout.spanCount = calcSpan;
                    listView.listViewLayout = gridLayout;

                    container.removeChildren();
                    container.addChild(listView);
                break;
        }


        listView.refresh();
    }
}
exports.onNavigatingTo = onNavigatingTo;