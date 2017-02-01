var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.someItems = [1, 3, 5, 7, 9, 2, 4, 6, 8];

    return viewModel;
}

exports.createViewModel = createViewModel;