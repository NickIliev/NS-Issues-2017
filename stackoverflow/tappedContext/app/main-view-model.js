var Observable = require("data/observable").Observable;

function RegisterViewModel() {
    var viewModel = new Observable();
    viewModel.shows = [
        { name: "Reg1" },
        { name: "Reg2" },
        { name: "Reg3" },
        { name: "Reg4" },
        { name: "Reg5" },
    ];

    return viewModel;
}
exports.RegisterViewModel = RegisterViewModel;