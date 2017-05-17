"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular");
var SidedrawerComponent = (function () {
    function SidedrawerComponent(_changeDetectionRef) {
        this._changeDetectionRef = _changeDetectionRef;
    }
    SidedrawerComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    SidedrawerComponent.prototype.ngOnInit = function () {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    };
    Object.defineProperty(SidedrawerComponent.prototype, "mainContentText", {
        get: function () {
            return this._mainContentText;
        },
        set: function (value) {
            this._mainContentText = value;
        },
        enumerable: true,
        configurable: true
    });
    SidedrawerComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    SidedrawerComponent.prototype.onCloseDrawerTap = function () {
        this.drawer.closeDrawer();
    };
    return SidedrawerComponent;
}());
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], SidedrawerComponent.prototype, "drawerComponent", void 0);
SidedrawerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "sidedrawer",
        templateUrl: 'sidedrawer.component.html',
        styleUrls: ['sidedrawer.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], SidedrawerComponent);
exports.SidedrawerComponent = SidedrawerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWRyYXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlZHJhd2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUkvRiwwRUFBd0c7QUFTeEcsSUFBYSxtQkFBbUI7SUFHNUIsNkJBQW9CLG1CQUFzQztRQUF0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO0lBQzFELENBQUM7SUFLRCw2Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLDZSQUE2UixDQUFDO0lBQ3pULENBQUM7SUFFRCxzQkFBSSxnREFBZTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1NLHdDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sOENBQWdCLEdBQXZCO1FBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBM0JzQztJQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDOzhCQUF5QixnQ0FBc0I7NERBQUM7QUFOekUsbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztLQUMxQyxDQUFDO3FDQUkyQyx3QkFBaUI7R0FIakQsbUJBQW1CLENBaUMvQjtBQWpDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwic2lkZWRyYXdlclwiLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZWRyYXdlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3NpZGVkcmF3ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVkcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuICAgIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZW50VGV4dCA9IFwiU2lkZURyYXdlciBmb3IgTmF0aXZlU2NyaXB0IGNhbiBiZSBlYXNpbHkgc2V0dXAgaW4gdGhlIEhUTUwgZGVmaW5pdGlvbiBvZiB5b3VyIHBhZ2UgYnkgZGVmaW5pbmcgdGtEcmF3ZXJDb250ZW50IGFuZCB0a01haW5Db250ZW50LiBUaGUgY29tcG9uZW50IGhhcyBhIGRlZmF1bHQgdHJhbnNpdGlvbiBhbmQgcG9zaXRpb24gYW5kIGFsc28gZXhwb3NlcyBub3RpZmljYXRpb25zIHJlbGF0ZWQgdG8gY2hhbmdlcyBpbiBpdHMgc3RhdGUuIFN3aXBlIGZyb20gbGVmdCB0byBvcGVuIHNpZGUgZHJhd2VyLlwiO1xuICAgIH1cblxuICAgIGdldCBtYWluQ29udGVudFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluQ29udGVudFRleHQ7XG4gICAgfVxuXG4gICAgc2V0IG1haW5Db250ZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21haW5Db250ZW50VGV4dCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9XG59Il19