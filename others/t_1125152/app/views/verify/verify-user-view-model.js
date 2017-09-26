var ViewModel = require("~/common/view-model-base")

function VerifyUserViewModel() {
    var data = {
        pageTitle: "VerifyUser",
        dob: null,
        ssn: null
    };
    var viewModel = new ViewModel(data);
    return viewModel;
}


module.exports = VerifyUserViewModel;





//view.goBackToResults = function (args) {
//    console.log("hit tap")
//    var topmost = frame.topmost();
//    topmost.goBack();
//};