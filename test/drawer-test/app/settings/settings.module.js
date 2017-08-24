"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var settings_component_1 = require("./settings.component");
var settings_routing_module_1 = require("./settings-routing.module");
var shared_module_1 = require("../shared/shared.module");
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            settings_routing_module_1.SettingsRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            settings_component_1.SettingsComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUU5RSwyREFBeUQ7QUFDekQscUVBQWtFO0FBQ2xFLHlEQUF1RDtBQWV2RCxJQUFhLGNBQWM7SUFBM0I7SUFBOEIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUEvQixJQUErQjtBQUFsQixjQUFjO0lBYjFCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQ0FBcUI7WUFDckIsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHNDQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxjQUFjLENBQUk7QUFBbEIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gXCIuL3NldHRpbmdzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2V0dGluZ3NSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vc2V0dGluZ3Mtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBTZXR0aW5nc1JvdXRpbmdNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNldHRpbmdzQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzTW9kdWxlIHsgfVxuIl19