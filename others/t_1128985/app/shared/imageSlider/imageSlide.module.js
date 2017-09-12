"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var imageSlides_component_1 = require("./imageSlides/imageSlides.component");
var imageSlide_component_1 = require("./imageSlide/imageSlide.component");
var ImageSlidesModule = (function () {
    function ImageSlidesModule() {
    }
    return ImageSlidesModule;
}());
ImageSlidesModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [imageSlide_component_1.SlideComponent, imageSlides_component_1.SlidesComponent],
        declarations: [imageSlides_component_1.SlidesComponent, imageSlide_component_1.SlideComponent],
        providers: [],
        schemas: [core_1.NO_ERRORS_SCHEMA]
    })
], ImageSlidesModule);
exports.ImageSlidesModule = ImageSlidesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZVNsaWRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCwwQ0FBK0M7QUFFL0MsNkVBQXNFO0FBQ3RFLDBFQUFtRTtBQVNuRSxJQUFhLGlCQUFpQjtJQUE5QjtJQUFpQyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBQWxDLElBQWtDO0FBQXJCLGlCQUFpQjtJQVA3QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLHFDQUFjLEVBQUUsdUNBQWUsQ0FBQztRQUMxQyxZQUFZLEVBQUUsQ0FBQyx1Q0FBZSxFQUFFLHFDQUFjLENBQUM7UUFDL0MsU0FBUyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztLQUNoQyxDQUFDO0dBQ1csaUJBQWlCLENBQUk7QUFBckIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTbGlkZXNDb21wb25lbnQgfSBmcm9tIFwiLi9pbWFnZVNsaWRlcy9pbWFnZVNsaWRlcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vaW1hZ2VTbGlkZS9pbWFnZVNsaWRlLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTbGlkZUNvbXBvbmVudCwgU2xpZGVzQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZXNDb21wb25lbnQsIFNsaWRlQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlU2xpZGVzTW9kdWxlIHsgfVxuIl19