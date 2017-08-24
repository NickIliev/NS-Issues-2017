"use strict";
/// modules imports
var aboutView_component_1 = require("../../modules/aboutView/aboutView.component");
var notificationView_component_1 = require("../../modules/notificationView/notificationView.component");
var scanQrcodeView_component_1 = require("../../modules/scanQrcodeView/scanQrcodeView.component");
var requestView_component_1 = require("../../modules/requestView/requestView.component");
//import { HomeViewComponent } from "../../modules/homeView/homeView.component";
var authenticationView_component_1 = require("../../modules/authenticationView/authenticationView.component");
exports.ROUTES = [
    /// start routes declaration
    { path: "aboutView", component: aboutView_component_1.AboutViewComponent },
    { path: "notificationView", component: notificationView_component_1.NotificationViewComponent },
    { path: "scanQrcodeView", component: scanQrcodeView_component_1.ScanQrcodeViewComponent },
    { path: "requestView", component: requestView_component_1.RequestViewComponent },
    //{ path: "homeView", component: HomeViewComponent },
    { path: "authenticationView", component: authenticationView_component_1.AuthenticationViewComponent },
    {
        path: "",
        component: authenticationView_component_1.AuthenticationViewComponent // HomeViewComponent
    }
];
