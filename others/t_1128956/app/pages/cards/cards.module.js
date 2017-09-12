"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var forms_2 = require("@angular/forms");
var angular_1 = require("nativescript-drop-down/angular");
var shared_module_1 = require("../../shared/shared.module");
var cards_component_1 = require("./cards.component");
var cards_service_1 = require("./cards.service");
var cardDetail_component_1 = require("./cardDetail/cardDetail.component");
exports.routerConfig = [
    { path: "", component: cards_component_1.CardsComponent },
];
var CardsModule = (function () {
    function CardsModule() {
    }
    return CardsModule;
}());
CardsModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule,
            forms_2.ReactiveFormsModule,
            angular_1.DropDownModule,
        ],
        declarations: [
            cards_component_1.CardsComponent, cardDetail_component_1.CardDetailComponent
        ],
        providers: [cards_service_1.CardsService],
        exports: [
            cardDetail_component_1.CardDetailComponent
        ],
        entryComponents: [cardDetail_component_1.CardDetailComponent]
    }),
    __metadata("design:paramtypes", [])
], CardsModule);
exports.CardsModule = CardsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLHdDQUFrRTtBQUdsRSwwREFBZ0U7QUFDaEUsNERBQTBEO0FBRzFELHFEQUFtRDtBQUNuRCxpREFBK0M7QUFDL0MsMEVBQXdFO0FBRTNELFFBQUEsWUFBWSxHQUFHO0lBQ3JCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtDQUM3QyxDQUFDO0FBd0JGLElBQWEsV0FBVztJQUNwQjtJQUFnQixDQUFDO0lBQ3JCLGtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxXQUFXO0lBdEJ2QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtZQUNaLDJCQUFtQjtZQUNuQix3QkFBYztTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNaLGdDQUFjLEVBQUMsMENBQW1CO1NBQ25DO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDTCwwQ0FBbUI7U0FDdEI7UUFDRCxlQUFlLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztLQUV6QyxDQUFDOztHQUVXLFdBQVcsQ0FFdkI7QUFGWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDYXJkc0NvbXBvbmVudCB9IGZyb20gXCIuL2NhcmRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDYXJkc1NlcnZpY2UgfSBmcm9tIFwiLi9jYXJkcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENhcmREZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9jYXJkRGV0YWlsL2NhcmREZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xyXG4gICAgICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IENhcmRzQ29tcG9uZW50IH0sXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25Nb2R1bGUsXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgIENhcmRzQ29tcG9uZW50LENhcmREZXRhaWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtDYXJkc1NlcnZpY2VdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIENhcmREZXRhaWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtDYXJkRGV0YWlsQ29tcG9uZW50XVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkc01vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19