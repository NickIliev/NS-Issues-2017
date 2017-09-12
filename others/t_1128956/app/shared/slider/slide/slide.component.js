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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdGO0FBY2hGLElBQWEsY0FBYztJQWlCMUI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQWZELHNCQUFJLHNDQUFVO2FBQWQsVUFBZSxLQUFzQjtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBUSxLQUFLLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBVzthQUFmLFVBQWdCLE1BQXVCO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFRLE1BQU0sQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFNO2FBQVY7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUE7UUFDdEMsQ0FBQzs7O09BQUE7SUFNRCxpQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUlmLHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXhCMEI7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWMsaUJBQVU7bURBQUM7QUFDbEM7SUFBZixZQUFLLENBQUMsT0FBTyxDQUFDOztnREFBa0I7QUFGckIsY0FBYztJQVQxQixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLHFJQUlUO0tBQ0QsQ0FBQzs7R0FFVyxjQUFjLENBeUIxQjtBQXpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xyXG5pbXBvcnQgKiBhcyBnZXN0dXJlcyBmcm9tICd1aS9nZXN0dXJlcyc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdtYi1zbGlkZScsXHJcblx0dGVtcGxhdGU6IGBcclxuXHQ8U3RhY2tMYXlvdXQgI3NsaWRlTGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIFtjbGFzc109XCJjc3NDbGFzc1wiPlxyXG5cdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cdDwvU3RhY2tMYXlvdXQ+XHJcblx0YCxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZCgnc2xpZGVMYXlvdXQnKSBzbGlkZUxheW91dDogRWxlbWVudFJlZjtcclxuXHRASW5wdXQoJ2NsYXNzJykgY3NzQ2xhc3M6IHN0cmluZztcclxuXHJcblx0c2V0IHNsaWRlV2lkdGgod2lkdGg6IG51bWJlciB8IHN0cmluZykge1xyXG5cdFx0dGhpcy5sYXlvdXQud2lkdGggPSA8YW55PndpZHRoO1xyXG5cdH1cclxuXHJcblx0c2V0IHNsaWRlSGVpZ2h0KGhlaWdodDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcblx0XHR0aGlzLmxheW91dC5oZWlnaHQgPSA8YW55PmhlaWdodDtcclxuXHR9XHJcblxyXG5cclxuXHRnZXQgbGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuXHRcdHJldHVybiB0aGlzLnNsaWRlTGF5b3V0Lm5hdGl2ZUVsZW1lbnRcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jc3NDbGFzcyA9IHRoaXMuY3NzQ2xhc3MgPyB0aGlzLmNzc0NsYXNzIDogJyc7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHsgfVxyXG5cclxuXHQvL25nQWZ0ZXJWaWV3SW5cclxuXHJcbn0iXX0=