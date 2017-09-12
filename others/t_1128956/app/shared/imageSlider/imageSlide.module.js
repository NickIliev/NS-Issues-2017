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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZVNsaWRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCwwQ0FBK0M7QUFFL0MsNkVBQXNFO0FBQ3RFLDBFQUFtRTtBQVNuRSxJQUFhLGlCQUFpQjtJQUE5QjtJQUFpQyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBQWxDLElBQWtDO0FBQXJCLGlCQUFpQjtJQVA3QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLHFDQUFjLEVBQUUsdUNBQWUsQ0FBQztRQUMxQyxZQUFZLEVBQUUsQ0FBQyx1Q0FBZSxFQUFFLHFDQUFjLENBQUM7UUFDL0MsU0FBUyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztLQUNoQyxDQUFDO0dBQ1csaUJBQWlCLENBQUk7QUFBckIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBTbGlkZXNDb21wb25lbnQgfSBmcm9tIFwiLi9pbWFnZVNsaWRlcy9pbWFnZVNsaWRlcy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9pbWFnZVNsaWRlL2ltYWdlU2xpZGUuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbU2xpZGVDb21wb25lbnQsIFNsaWRlc0NvbXBvbmVudF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZXNDb21wb25lbnQsIFNsaWRlQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbiAgICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1hZ2VTbGlkZXNNb2R1bGUgeyB9XHJcbiJdfQ==