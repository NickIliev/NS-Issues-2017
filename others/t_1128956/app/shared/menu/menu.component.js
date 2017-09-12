"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drawer_service_1 = require("../services/drawer.service");
var MenuComponent = (function () {
    function MenuComponent(drawerService) {
        this.drawerService = drawerService;
    }
    return MenuComponent;
}());
MenuComponent = __decorate([
    core_1.Component({
        selector: "mb-menu",
        template: "\n        <StackLayout (touch)=\"drawerService.toggle()\" class=\"hamburgerMenu\"><Image src=\"~/images/icon/hamburger_menu.png\" class=\"\"></Image></StackLayout>\n     "
    }),
    __metadata("design:paramtypes", [drawer_service_1.DrawerService])
], MenuComponent);
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyw2REFBMkQ7QUFRM0QsSUFBYSxhQUFhO0lBRXRCLHVCQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUUvQyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGFBQWE7SUFOekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSw0S0FFUjtLQUNMLENBQUM7cUNBR29DLDhCQUFhO0dBRnRDLGFBQWEsQ0FLekI7QUFMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWItbWVudVwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8U3RhY2tMYXlvdXQgKHRvdWNoKT1cImRyYXdlclNlcnZpY2UudG9nZ2xlKClcIiBjbGFzcz1cImhhbWJ1cmdlck1lbnVcIj48SW1hZ2Ugc3JjPVwifi9pbWFnZXMvaWNvbi9oYW1idXJnZXJfbWVudS5wbmdcIiBjbGFzcz1cIlwiPjwvSW1hZ2U+PC9TdGFja0xheW91dD5cclxuICAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHJhd2VyU2VydmljZTogRHJhd2VyU2VydmljZSkge1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=