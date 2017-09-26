var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
//var listViewModule = require("ui/list-view");

function TermsConditionsViewModel() {
    var data = {
        pageTitle: "Terms and Condition",
        isLoading: false,
        selectedScreen: 0,
        Header: "",
        Body: "",
        terms: new ObservableArray([]),
        description: "",
        condition: null,
        showBackButton: false
       
    }
    var viewModel = new ViewModel(data);


    viewModel.GetTermsCondition = function () {
        var that = this;
        console.log("get TermsCondition loading");

        var requestOptions = {
            url: constants.apiUrl + "TermsSections/GetTermsCondition",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };

        utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("get TermsCondition completed");
                var data = response.content.toJSON();
                data.Data.forEach(function (item) {
                    that.terms.push({
                        Header: item.Header,
                        Body: item.Body
                    });
                    console.log(JSON.stringify(item));
                });

            },
            function () { // error callback
                console.log("error occurred");
            });
    };
    return viewModel
};

module.exports = TermsConditionsViewModel;