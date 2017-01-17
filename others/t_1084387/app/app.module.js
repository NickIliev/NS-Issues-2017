"use strict";
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require('nativescript-telerik-ui-pro/listview/angular');
var angular_2 = require("nativescript-telerik-ui-pro/calendar/angular");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, angular_1.LISTVIEW_DIRECTIVES, angular_2.CALENDAR_DIRECTIVES],
            bootstrap: [app_component_1.AppComponent],
            imports: [nativescript_module_1.NativeScriptModule],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCxvQ0FBbUMsMENBQTBDLENBQUMsQ0FBQTtBQUU5RSx3QkFBb0MsOENBQThDLENBQUMsQ0FBQTtBQUNuRix3QkFBb0MsOENBQThDLENBQUMsQ0FBQTtBQUVuRiw4QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQVEvQztJQUFBO0lBQXlCLENBQUM7SUFOMUI7UUFBQyxlQUFRLENBQUM7WUFDTixZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFDLDZCQUFtQixFQUFDLDZCQUFtQixDQUFDO1lBQ3BFLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUMsd0NBQWtCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDOUIsQ0FBQzs7aUJBQUE7SUFDdUIsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsaUJBQVMsWUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcblxuaW1wb3J0IHsgTElTVFZJRVdfRElSRUNUSVZFUyB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyJztcbmltcG9ydCB7IENBTEVOREFSX0RJUkVDVElWRVMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2NhbGVuZGFyL2FuZ3VsYXJcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudCxMSVNUVklFV19ESVJFQ1RJVkVTLENBTEVOREFSX0RJUkVDVElWRVNdLFxuICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZV0sXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==