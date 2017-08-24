var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();

    viewModel.items = new ObservableArray();

    viewModel.status1 = false;
    viewModel.status2 = false;
    viewModel.status3 = false;
    viewModel.status4 = false;
    viewModel.status5 = false;

    viewModel.items.push({ "id": 1, "name": "John"});
    viewModel.items.push({ "id": 2, "name": "Daniel" });
    viewModel.items.push({ "id": 3, "name": "Mery" });
    viewModel.items.push({ "id": 4, "name": "Chris" });
    viewModel.items.push({ "id": 5, "name": "Anna" });
        viewModel.items.push({ "id": 1, "name": "John"});
    viewModel.items.push({ "id": 2, "name": "Daniel" });
    viewModel.items.push({ "id": 3, "name": "Mery" });
    viewModel.items.push({ "id": 4, "name": "Chris" });
    viewModel.items.push({ "id": 5, "name": "Anna" });
        viewModel.items.push({ "id": 1, "name": "John"});
    viewModel.items.push({ "id": 2, "name": "Daniel" });
    viewModel.items.push({ "id": 3, "name": "Mery" });
    viewModel.items.push({ "id": 4, "name": "Chris" });
    viewModel.items.push({ "id": 5, "name": "Anna" });
        viewModel.items.push({ "id": 1, "name": "John"});
    viewModel.items.push({ "id": 2, "name": "Daniel" });
    viewModel.items.push({ "id": 3, "name": "Mery" });
    viewModel.items.push({ "id": 4, "name": "Chris" });
    viewModel.items.push({ "id": 5, "name": "Anna" });
        viewModel.items.push({ "id": 1, "name": "John"});
    viewModel.items.push({ "id": 2, "name": "Daniel" });
    viewModel.items.push({ "id": 3, "name": "Mery" });
    viewModel.items.push({ "id": 4, "name": "Chris" });
    viewModel.items.push({ "id": 5, "name": "Anna" });

    return viewModel;
}

exports.createViewModel = createViewModel;