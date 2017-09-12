"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SlideComponent = (function () {
    function SlideComponent() {
        this.cssClass = this.cssClass ? this.cssClass : '';
    }
    Object.defineProperty(SlideComponent.prototype, "slideWidth", {
        set: function (width) {
            this.layout.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideComponent.prototype, "slideHeight", {
        set: function (height) {
            this.layout.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideComponent.prototype, "layout", {
        get: function () {
            return this.slideLayout.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    SlideComponent.prototype.ngOnInit = function () { };
    return SlideComponent;
}());
__decorate([
    core_1.ViewChild('slideLayout'),
    __metadata("design:type", core_1.ElementRef)
], SlideComponent.prototype, "slideLayout", void 0);
__decorate([
    core_1.Input('class'),
    __metadata("design:type", String)
], SlideComponent.prototype, "cssClass", void 0);
SlideComponent = __decorate([
    core_1.Component({
        selector: 'mb-slide',
        template: "\n\t<StackLayout #slideLayout orientation=\"horizontal\" [class]=\"cssClass\">\n\t\t<ng-content></ng-content>\n\t</StackLayout>\n\t",
    }),
    __metadata("design:paramtypes", [])
], SlideComponent);
exports.SlideComponent = SlideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdGO0FBY2hGLElBQWEsY0FBYztJQWlCMUI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQWZELHNCQUFJLHNDQUFVO2FBQWQsVUFBZSxLQUFzQjtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBUSxLQUFLLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBVzthQUFmLFVBQWdCLE1BQXVCO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFRLE1BQU0sQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFNO2FBQVY7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUE7UUFDdEMsQ0FBQzs7O09BQUE7SUFNRCxpQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUlmLHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXhCMEI7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWMsaUJBQVU7bURBQUM7QUFDbEM7SUFBZixZQUFLLENBQUMsT0FBTyxDQUFDOztnREFBa0I7QUFGckIsY0FBYztJQVQxQixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLHFJQUlUO0tBQ0QsQ0FBQzs7R0FFVyxjQUFjLENBeUIxQjtBQXpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCAqIGFzIGdlc3R1cmVzIGZyb20gJ3VpL2dlc3R1cmVzJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdtYi1zbGlkZScsXG5cdHRlbXBsYXRlOiBgXG5cdDxTdGFja0xheW91dCAjc2xpZGVMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgW2NsYXNzXT1cImNzc0NsYXNzXCI+XG5cdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHQ8L1N0YWNrTGF5b3V0PlxuXHRgLFxufSlcblxuZXhwb3J0IGNsYXNzIFNsaWRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZCgnc2xpZGVMYXlvdXQnKSBzbGlkZUxheW91dDogRWxlbWVudFJlZjtcblx0QElucHV0KCdjbGFzcycpIGNzc0NsYXNzOiBzdHJpbmc7XG5cblx0c2V0IHNsaWRlV2lkdGgod2lkdGg6IG51bWJlciB8IHN0cmluZykge1xuXHRcdHRoaXMubGF5b3V0LndpZHRoID0gPGFueT53aWR0aDtcblx0fVxuXG5cdHNldCBzbGlkZUhlaWdodChoZWlnaHQ6IG51bWJlciB8IHN0cmluZykge1xuXHRcdHRoaXMubGF5b3V0LmhlaWdodCA9IDxhbnk+aGVpZ2h0O1xuXHR9XG5cblxuXHRnZXQgbGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcblx0XHRyZXR1cm4gdGhpcy5zbGlkZUxheW91dC5uYXRpdmVFbGVtZW50XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNzc0NsYXNzID0gdGhpcy5jc3NDbGFzcyA/IHRoaXMuY3NzQ2xhc3MgOiAnJztcblx0fVxuXG5cdG5nT25Jbml0KCkgeyB9XG5cblx0Ly9uZ0FmdGVyVmlld0luXG5cbn0iXX0=