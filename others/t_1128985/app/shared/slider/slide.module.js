"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var slides_component_1 = require("./slides/slides.component");
var slide_component_1 = require("./slide/slide.component");
var SlidesModule = (function () {
    function SlidesModule() {
    }
    return SlidesModule;
}());
SlidesModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [slide_component_1.SlideComponent, slides_component_1.SlidesComponent],
        declarations: [slides_component_1.SlidesComponent, slide_component_1.SlideComponent],
        providers: [],
        schemas: [core_1.NO_ERRORS_SCHEMA]
    })
], SlidesModule);
exports.SlidesModule = SlidesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELDBDQUErQztBQUUvQyw4REFBNEQ7QUFDNUQsMkRBQXlEO0FBU3pELElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUFQeEIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxnQ0FBYyxFQUFFLGtDQUFlLENBQUM7UUFDMUMsWUFBWSxFQUFFLENBQUMsa0NBQWUsRUFBRSxnQ0FBYyxDQUFDO1FBQy9DLFNBQVMsRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7S0FDaEMsQ0FBQztHQUNXLFlBQVksQ0FBSTtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU2xpZGVzQ29tcG9uZW50IH0gZnJvbSBcIi4vc2xpZGVzL3NsaWRlcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vc2xpZGUvc2xpZGUuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NsaWRlQ29tcG9uZW50LCBTbGlkZXNDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1NsaWRlc0NvbXBvbmVudCwgU2xpZGVDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW10sXG4gICAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVzTW9kdWxlIHsgfVxuIl19