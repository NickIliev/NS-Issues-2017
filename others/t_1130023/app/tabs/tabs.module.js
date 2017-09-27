"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var browse_component_1 = require("./browse/browse.component");
var featured_component_1 = require("./featured/featured.component");
var home_component_1 = require("./home/home.component");
var search_component_1 = require("./search/search.component");
var settings_component_1 = require("./settings/settings.component");
var tabs_routing_module_1 = require("./tabs-routing.module");
var tabs_component_1 = require("./tabs.component");
var angular_1 = require("nativescript-telerik-ui-pro/listview/angular");
var TabsModule = (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                tabs_routing_module_1.TabsRoutingModule,
                angular_1.NativeScriptUIListViewModule
            ],
            declarations: [
                tabs_component_1.TabsComponent,
                home_component_1.HomeComponent,
                browse_component_1.BrowseComponent,
                search_component_1.SearchComponent,
                featured_component_1.FeaturedComponent,
                settings_component_1.SettingsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], TabsModule);
    return TabsModule;
}());
exports.TabsModule = TabsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFFOUUsOERBQTREO0FBQzVELG9FQUFrRTtBQUNsRSx3REFBc0Q7QUFDdEQsOERBQTREO0FBQzVELG9FQUFrRTtBQUNsRSw2REFBMEQ7QUFDMUQsbURBQWlEO0FBQ2pELHdFQUE0RjtBQW1CNUY7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQWxCdEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsdUNBQWlCO2dCQUNqQixzQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsOEJBQWE7Z0JBQ2IsOEJBQWE7Z0JBQ2Isa0NBQWU7Z0JBQ2Ysa0NBQWU7Z0JBQ2Ysc0NBQWlCO2dCQUNqQixzQ0FBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFVBQVUsQ0FBSTtJQUFELGlCQUFDO0NBQUEsQUFBM0IsSUFBMkI7QUFBZCxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuXHJcbmltcG9ydCB7IEJyb3dzZUNvbXBvbmVudCB9IGZyb20gXCIuL2Jyb3dzZS9icm93c2UuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZlYXR1cmVkQ29tcG9uZW50IH0gZnJvbSBcIi4vZmVhdHVyZWQvZmVhdHVyZWQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNlYXJjaENvbXBvbmVudCB9IGZyb20gXCIuL3NlYXJjaC9zZWFyY2guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSBcIi4vc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRhYnNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vdGFicy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBUYWJzQ29tcG9uZW50IH0gZnJvbSBcIi4vdGFicy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXcvYW5ndWxhclwiO1xyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBUYWJzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgVGFic0NvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEJyb3dzZUNvbXBvbmVudCxcclxuICAgICAgICBTZWFyY2hDb21wb25lbnQsXHJcbiAgICAgICAgRmVhdHVyZWRDb21wb25lbnQsXHJcbiAgICAgICAgU2V0dGluZ3NDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7IH1cclxuIl19