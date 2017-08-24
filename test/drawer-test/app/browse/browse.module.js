"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var browse_component_1 = require("./browse.component");
var browse_routing_module_1 = require("./browse-routing.module");
var shared_module_1 = require("../shared/shared.module");
var BrowseModule = (function () {
    function BrowseModule() {
    }
    return BrowseModule;
}());
BrowseModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            browse_routing_module_1.BrowseRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            browse_component_1.BrowseComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], BrowseModule);
exports.BrowseModule = BrowseModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLHVEQUFxRDtBQUNyRCxpRUFBOEQ7QUFFOUQseURBQXVEO0FBZXZELElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUFieEIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLDJDQUFtQjtZQUNuQiw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysa0NBQWU7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcblxuaW1wb3J0IHsgQnJvd3NlQ29tcG9uZW50IH0gZnJvbSBcIi4vYnJvd3NlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQnJvd3NlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2Jyb3dzZS1yb3V0aW5nLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQnJvd3NlUm91dGluZ01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnJvd3NlQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZU1vZHVsZSB7IH1cbiJdfQ==