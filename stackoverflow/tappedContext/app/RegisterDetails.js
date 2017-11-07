
function pageLoaded(args) {
    var page = args.object;
    var receivedContext = page.navigationContext;

    console.log(receivedContext); // receiving object like { name : "Reg3"} here  e.g. receivedContext === { name: "Reg3"}

    page.bindingContext = { passedData: receivedContext }; // now the binding context is passedData.name
}

exports.pageLoaded = pageLoaded;