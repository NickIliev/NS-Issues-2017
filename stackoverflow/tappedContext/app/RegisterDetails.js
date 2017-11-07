
function pageLoaded(args) {
    var page = args.object;
    var receivedContext = page.navigationContext;

    page.bindingContext = { passedData: receivedContext }
}

exports.pageLoaded = pageLoaded;