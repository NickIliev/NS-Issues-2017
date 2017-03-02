/**
 * Created by jeremiahminton on 2/27/17.
 */
"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var observable_1 = require("data/observable");
var angular_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular");
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(page, _changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.page = page;
        _this._changeDetectionRef = _changeDetectionRef;
        return _this;
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
    };
    HomeComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    HomeComponent.prototype.closeDrawer = function () {
        this.drawer.closeDrawer();
    };
    return HomeComponent;
}(observable_1.Observable));
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], HomeComponent.prototype, "drawerComponent", void 0);
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [page_1.Page, core_1.ChangeDetectorRef])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFHSCxzQ0FBd0c7QUFHeEcsZ0NBQStCO0FBRy9CLDhDQUE2QztBQUM3QywwRUFBd0c7QUFVeEcsSUFBYSxhQUFhO0lBQVMsaUNBQVU7SUFDekMsdUJBQW9CLElBQVUsRUFBVSxtQkFBc0M7UUFBOUUsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQU07UUFBVSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1COztJQUU5RSxDQUFDO0lBS0QsdUNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSx3SUFBd0k7Y0FDOUosNklBQTZJLENBQUMsQ0FBQztJQUN6SixDQUFDO0lBRU0sa0NBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUFtQyx1QkFBVSxHQXlCNUM7QUFwQnNDO0lBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7OEJBQXlCLGdDQUFzQjtzREFBQztBQUx6RSxhQUFhO0lBUnpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLE1BQU07UUFDaEIsV0FBVyxFQUFFLHFCQUFxQjtRQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztLQUNwQyxDQUFDO0lBRUQsaUJBQVUsRUFBRTtxQ0FFaUIsV0FBSSxFQUErQix3QkFBaUI7R0FEckUsYUFBYSxDQXlCekI7QUF6Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgamVyZW1pYWhtaW50b24gb24gMi8yNy8xNy5cbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbmplY3RhYmxlLCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2hvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJtYWluQ29udGVudFRleHRcIiwgXCJTaWRlRHJhd2VyIGZvciBOYXRpdmVTY3JpcHQgY2FuIGJlIGVhc2lseSBzZXR1cCBpbiB0aGUgWE1MIGRlZmluaXRpb24gb2YgeW91ciBwYWdlIGJ5IGRlZmluaW5nIG1haW4tIGFuZCBkcmF3ZXItY29udGVudC4gVGhlIGNvbXBvbmVudFwiXG4gICAgICAgICAgICArIFwiIGhhcyBhIGRlZmF1bHQgdHJhbnNpdGlvbiBhbmQgcG9zaXRpb24gYW5kIGFsc28gZXhwb3NlcyBub3RpZmljYXRpb25zIHJlbGF0ZWQgdG8gY2hhbmdlcyBpbiBpdHMgc3RhdGUuIFN3aXBlIGZyb20gbGVmdCB0byBvcGVuIHNpZGUgZHJhd2VyLlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkRyYXdlcigpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZURyYXdlcigpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9XG59Il19