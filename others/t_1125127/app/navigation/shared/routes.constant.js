"use strict";
/// modules imports
var spaceView_component_1 = require("../../modules/spaceView/spaceView.component");
var assetView_component_1 = require("../../modules/assetView/assetView.component");
var aboutView_component_1 = require("../../modules/aboutView/aboutView.component");
var notificationView_component_1 = require("../../modules/notificationView/notificationView.component");
var scanQrcodeView_component_1 = require("../../modules/scanQrcodeView/scanQrcodeView.component");
var requestView_component_1 = require("../../modules/requestView/requestView.component");
//import { HomeViewComponent } from "../../modules/homeView/homeView.component";
var authenticationView_component_1 = require("../../modules/authenticationView/authenticationView.component");
exports.ROUTES = [
    /// start routes declaration
    { path: "spaceView", component: spaceView_component_1.SpaceViewComponent },
    { path: "spaceView/:id", component: spaceView_component_1.SpaceViewComponent },
    { path: "assetView", component: assetView_component_1.AssetViewComponent },
    { path: "assetView/:id", component: assetView_component_1.AssetViewComponent },
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
//# sourceMappingURL=routes.constant.js.map