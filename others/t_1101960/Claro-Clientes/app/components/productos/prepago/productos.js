'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property');

var viewModel = require("./productos-view-model");
var viewModel = new viewModel.vmEquipos();
var timer = require("timer");

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/categorias/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function pageLoaded(args) {
    // viewModel.set('isLoading', true);
    timer.setTimeout(function () {
        var page = args.object;
        page.bindingContext = viewModel;
    }, 1);

    if (isInit) {
        isInit = false;
    }
    // viewModel.set('isLoading', false);
}
exports.pageLoaded = pageLoaded;

exports.loadOnDemand = function (args) {
    timer.setTimeout(function () {
        viewModel.addItem();
        var listView = args.object;
        listView.notifyLoadOnDemandFinished();
    }, 1);
    args.returnValue = true;
}