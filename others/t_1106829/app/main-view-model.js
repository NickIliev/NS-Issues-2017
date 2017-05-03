var Observable = require("data/observable").Observable;
var pagesModule = require("ui/page");
var labelModule = require("ui/label");
var frameModule = require("ui/frame");

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        // this.counter--;
        // this.set("message", getMessage(this.counter));

var topmost = frameModule.topmost();
        topmost.navigate(factoryFunc);
    }

    return viewModel;
}

var factoryFunc = function () {
    var page = new pagesModule.Page();

    return page;
};

exports.createViewModel = createViewModel;