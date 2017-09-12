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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZVNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQWFoRixJQUFhLGNBQWM7SUFnQnZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFkRCxzQkFBSSxzQ0FBVTthQUFkLFVBQWUsS0FBc0I7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQVMsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVc7YUFBZixVQUFnQixNQUF1QjtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBUyxNQUFNLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBTUQsaUNBQVEsR0FBUixjQUFhLENBQUM7SUFJbEIscUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBdkI2QjtJQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQzs4QkFBYyxpQkFBVTttREFBQztBQUNsQztJQUFmLFlBQUssQ0FBQyxPQUFPLENBQUM7O2dEQUFrQjtBQUZ4QixjQUFjO0lBVDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRSwySkFJVDtLQUNKLENBQUM7O0dBRVcsY0FBYyxDQXdCMUI7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSBcInVpL2dlc3R1cmVzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1iLWltYWdlLXNsaWRlXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPFN0YWNrTGF5b3V0ICNzbGlkZUxheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBbY2xhc3NdPVwiY3NzQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU2xpZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoXCJzbGlkZUxheW91dFwiKSBzbGlkZUxheW91dDogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoXCJjbGFzc1wiKSBjc3NDbGFzczogc3RyaW5nO1xuXG4gICAgc2V0IHNsaWRlV2lkdGgod2lkdGg6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB0aGlzLmxheW91dC53aWR0aCA9IDxhbnk+IHdpZHRoO1xuICAgIH1cblxuICAgIHNldCBzbGlkZUhlaWdodChoZWlnaHQ6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB0aGlzLmxheW91dC5oZWlnaHQgPSA8YW55PiBoZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IGxheW91dCgpOiBTdGFja0xheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlTGF5b3V0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3NzQ2xhc3MgPSB0aGlzLmNzc0NsYXNzID8gdGhpcy5jc3NDbGFzcyA6IFwiXCI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIC8vIG5nQWZ0ZXJWaWV3SW5cblxufSJdfQ==