"use strict";
var router_1 = require("@angular/router");
var tabstrip_component_1 = require("./tabstrip.component");
var common = require("../shared");
var tabMenuRoutes = [
    {
        path: "nav",
        component: tabstrip_component_1.TabMenuComponent,
        children: common.ROUTES.slice()
    }
];
exports.tabMenuRouting = router_1.RouterModule.forChild(tabMenuRoutes);
