"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SlideComponent = (function () {
    function SlideComponent() {
        this.cssClass = this.cssClass ? this.cssClass : "";
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
    core_1.ViewChild("slideLayout"),
    __metadata("design:type", core_1.ElementRef)
], SlideComponent.prototype, "slideLayout", void 0);
__decorate([
    core_1.Input("class"),
    __metadata("design:type", String)
], SlideComponent.prototype, "cssClass", void 0);
SlideComponent = __decorate([
    core_1.Component({
        selector: "mb-image-slide",
        template: "\n        <StackLayout #slideLayout orientation=\"horizontal\" [class]=\"cssClass\">\n            <ng-content></ng-content>\n        </StackLayout>\n    "
    }),
    __metadata("design:paramtypes", [])
], SlideComponent);
exports.SlideComponent = SlideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZVNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQWFoRixJQUFhLGNBQWM7SUFnQnZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFkRCxzQkFBSSxzQ0FBVTthQUFkLFVBQWUsS0FBc0I7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQVMsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVc7YUFBZixVQUFnQixNQUF1QjtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBUyxNQUFNLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBTUQsaUNBQVEsR0FBUixjQUFhLENBQUM7SUFJbEIscUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBdkI2QjtJQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQzs4QkFBYyxpQkFBVTttREFBQztBQUNsQztJQUFmLFlBQUssQ0FBQyxPQUFPLENBQUM7O2dEQUFrQjtBQUZ4QixjQUFjO0lBVDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRSwySkFJVDtLQUNKLENBQUM7O0dBRVcsY0FBYyxDQXdCMUI7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCAqIGFzIGdlc3R1cmVzIGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYi1pbWFnZS1zbGlkZVwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8U3RhY2tMYXlvdXQgI3NsaWRlTGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIFtjbGFzc109XCJjc3NDbGFzc1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9TdGFja0xheW91dD5cclxuICAgIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAVmlld0NoaWxkKFwic2xpZGVMYXlvdXRcIikgc2xpZGVMYXlvdXQ6IEVsZW1lbnRSZWY7XHJcbiAgICBASW5wdXQoXCJjbGFzc1wiKSBjc3NDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIHNldCBzbGlkZVdpZHRoKHdpZHRoOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxheW91dC53aWR0aCA9IDxhbnk+IHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzbGlkZUhlaWdodChoZWlnaHQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmhlaWdodCA9IDxhbnk+IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZUxheW91dC5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY3NzQ2xhc3MgPSB0aGlzLmNzc0NsYXNzID8gdGhpcy5jc3NDbGFzcyA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgICAvLyBuZ0FmdGVyVmlld0luXHJcblxyXG59Il19