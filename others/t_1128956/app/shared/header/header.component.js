"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HeaderComponent = (function () {
    function HeaderComponent() {
        this.inputAlignment = "center";
        this.logo = false;
    }
    return HeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "inputAlignment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "logo", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: "mb-header",
        template: "\n    <GridLayout columns=\"*, auto\" rows=\"*\" class=\"actionBarWithoutBack\">\n        <StackLayout orientation=\"horizontal\" col=\"0\" row=\"0\" [horizontalAlignment]=\"inputAlignment\" *ngIf=\"!logo\">\n            <GridLayout rows=\"*\" columns=\"*\">\n            <Label col=\"0\" row=\"0\" [text]=\"title\" class=\"titleText\"></Label>\n            </GridLayout>\n        </StackLayout>\n        <StackLayout orientation=\"horizontal\" class=\"headerLogo\" verticalAlignment=\"middle\" horizontalAlignment=\"left\" col=\"0\" row=\"0\" *ngIf=\"logo\">\n            <Image src=\"~/images/redesign/logo.png\"></Image>\n        </StackLayout>\n        <StackLayout orientation=\"horizontal\" horizontalAlignment=\"right\" col=\"2\" row=\"0\">\n            <mb-menu></mb-menu>\n        </StackLayout>\n    </GridLayout>\n  ",
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFvQmpELElBQWEsZUFBZTtJQUl4QjtRQUZTLG1CQUFjLEdBQVcsUUFBUSxDQUFDO1FBQ2xDLFNBQUksR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFQWTtJQUFSLFlBQUssRUFBRTs7OENBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs7dURBQW1DO0FBQ2xDO0lBQVIsWUFBSyxFQUFFOzs2Q0FBdUI7QUFIdEIsZUFBZTtJQWxCM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSw2ekJBY1g7S0FDRixDQUFDOztHQUNXLGVBQWUsQ0FRM0I7QUFSWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYi1oZWFkZXJcIixcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKiwgYXV0b1wiIHJvd3M9XCIqXCIgY2xhc3M9XCJhY3Rpb25CYXJXaXRob3V0QmFja1wiPlxyXG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBjb2w9XCIwXCIgcm93PVwiMFwiIFtob3Jpem9udGFsQWxpZ25tZW50XT1cImlucHV0QWxpZ25tZW50XCIgKm5nSWY9XCIhbG9nb1wiPlxyXG4gICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiKlwiIGNvbHVtbnM9XCIqXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBjb2w9XCIwXCIgcm93PVwiMFwiIFt0ZXh0XT1cInRpdGxlXCIgY2xhc3M9XCJ0aXRsZVRleHRcIj48L0xhYmVsPlxyXG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XHJcbiAgICAgICAgPC9TdGFja0xheW91dD5cclxuICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgY2xhc3M9XCJoZWFkZXJMb2dvXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIiBob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiIGNvbD1cIjBcIiByb3c9XCIwXCIgKm5nSWY9XCJsb2dvXCI+XHJcbiAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L2ltYWdlcy9yZWRlc2lnbi9sb2dvLnBuZ1wiPjwvSW1hZ2U+XHJcbiAgICAgICAgPC9TdGFja0xheW91dD5cclxuICAgICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cInJpZ2h0XCIgY29sPVwiMlwiIHJvdz1cIjBcIj5cclxuICAgICAgICAgICAgPG1iLW1lbnU+PC9tYi1tZW51PlxyXG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICA8L0dyaWRMYXlvdXQ+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaW5wdXRBbGlnbm1lbnQ6IHN0cmluZyA9IFwiY2VudGVyXCI7XHJcbiAgICBASW5wdXQoKSBsb2dvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiBcclxuICAgIH1cclxuXHJcbn1cclxuIl19