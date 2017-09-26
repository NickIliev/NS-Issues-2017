var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Schedule Appointment",
    pageName: "ScheduleAppointment",
    contentPath: "~/views/schedule-appt",
    contentModuleName: "schedule-appt",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;