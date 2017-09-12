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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFvQmpELElBQWEsZUFBZTtJQUl4QjtRQUZTLG1CQUFjLEdBQVcsUUFBUSxDQUFDO1FBQ2xDLFNBQUksR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFQWTtJQUFSLFlBQUssRUFBRTs7OENBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs7dURBQW1DO0FBQ2xDO0lBQVIsWUFBSyxFQUFFOzs2Q0FBdUI7QUFIdEIsZUFBZTtJQWxCM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSw2ekJBY1g7S0FDRixDQUFDOztHQUNXLGVBQWUsQ0FRM0I7QUFSWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtYi1oZWFkZXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLCBhdXRvXCIgcm93cz1cIipcIiBjbGFzcz1cImFjdGlvbkJhcldpdGhvdXRCYWNrXCI+XG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBjb2w9XCIwXCIgcm93PVwiMFwiIFtob3Jpem9udGFsQWxpZ25tZW50XT1cImlucHV0QWxpZ25tZW50XCIgKm5nSWY9XCIhbG9nb1wiPlxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cIipcIiBjb2x1bW5zPVwiKlwiPlxuICAgICAgICAgICAgPExhYmVsIGNvbD1cIjBcIiByb3c9XCIwXCIgW3RleHRdPVwidGl0bGVcIiBjbGFzcz1cInRpdGxlVGV4dFwiPjwvTGFiZWw+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBjbGFzcz1cImhlYWRlckxvZ29cIiB2ZXJ0aWNhbEFsaWdubWVudD1cIm1pZGRsZVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgY29sPVwiMFwiIHJvdz1cIjBcIiAqbmdJZj1cImxvZ29cIj5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L2ltYWdlcy9yZWRlc2lnbi9sb2dvLnBuZ1wiPjwvSW1hZ2U+XG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBob3Jpem9udGFsQWxpZ25tZW50PVwicmlnaHRcIiBjb2w9XCIyXCIgcm93PVwiMFwiPlxuICAgICAgICAgICAgPG1iLW1lbnU+PC9tYi1tZW51PlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgIDwvR3JpZExheW91dD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGlucHV0QWxpZ25tZW50OiBzdHJpbmcgPSBcImNlbnRlclwiO1xuICAgIEBJbnB1dCgpIGxvZ286IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gXG4gICAgfVxuXG59XG4iXX0=