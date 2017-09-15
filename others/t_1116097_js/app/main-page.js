var listview_1 = require("nativescript-telerik-ui-pro/listview");

function navigatingTo(args) {
    var page = args.object;

    var container = page.getViewById("container");

    var radList = new listview_1.RadListView();
    radList.height = 300;
    radList.items = [1, 2, 3, 4, 5, 6.6, 888];
    radList.itemTemplate = "<StackLayout><Label text='{{ $value }}' /></StackLayout>";
    var linearLayout = new listview_1.ListViewLinearLayout();
    linearLayout.scrollDirection = "Vertical";
    radList.listViewLayout = linearLayout;

    container.addChild(radList);
}
exports.navigatingTo = navigatingTo;