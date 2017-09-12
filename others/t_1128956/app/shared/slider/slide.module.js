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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELDBDQUErQztBQUUvQyw4REFBNEQ7QUFDNUQsMkRBQXlEO0FBU3pELElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUFQeEIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxnQ0FBYyxFQUFFLGtDQUFlLENBQUM7UUFDMUMsWUFBWSxFQUFFLENBQUMsa0NBQWUsRUFBRSxnQ0FBYyxDQUFDO1FBQy9DLFNBQVMsRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7S0FDaEMsQ0FBQztHQUNXLFlBQVksQ0FBSTtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgU2xpZGVzQ29tcG9uZW50IH0gZnJvbSBcIi4vc2xpZGVzL3NsaWRlcy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9zbGlkZS9zbGlkZS5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtTbGlkZUNvbXBvbmVudCwgU2xpZGVzQ29tcG9uZW50XSxcclxuICAgIGRlY2xhcmF0aW9uczogW1NsaWRlc0NvbXBvbmVudCwgU2xpZGVDb21wb25lbnRdLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxuICAgICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNNb2R1bGUgeyB9XHJcbiJdfQ==