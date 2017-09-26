// TODO: figure out setting template specific binding context to support having separate viewModel for this

var navigation = require("~/components/navigation");

exports.tileSymptomCheckerTap = function () {
    navigation.goToSymptomCheckerPage();
};

exports.tileExploreConditionsTap = function () {
    navigation.goToConditionSearch();
};