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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLHdDQUFrRTtBQUdsRSwwREFBZ0U7QUFDaEUsNERBQTBEO0FBRzFELHFEQUFtRDtBQUNuRCxpREFBK0M7QUFDL0MsMEVBQXdFO0FBRTNELFFBQUEsWUFBWSxHQUFHO0lBQ3JCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtDQUM3QyxDQUFDO0FBd0JGLElBQWEsV0FBVztJQUNwQjtJQUFnQixDQUFDO0lBQ3JCLGtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxXQUFXO0lBdEJ2QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtZQUNaLDJCQUFtQjtZQUNuQix3QkFBYztTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNaLGdDQUFjLEVBQUMsMENBQW1CO1NBQ25DO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDTCwwQ0FBbUI7U0FDdEI7UUFDRCxlQUFlLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztLQUV6QyxDQUFDOztHQUVXLFdBQVcsQ0FFdkI7QUFGWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IENhcmRzQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyZHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDYXJkc1NlcnZpY2UgfSBmcm9tIFwiLi9jYXJkcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDYXJkRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyZERldGFpbC9jYXJkRGV0YWlsLmNvbXBvbmVudFwiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xuICAgICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBDYXJkc0NvbXBvbmVudCB9LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIERyb3BEb3duTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICBDYXJkc0NvbXBvbmVudCxDYXJkRGV0YWlsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtDYXJkc1NlcnZpY2VdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2FyZERldGFpbENvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbQ2FyZERldGFpbENvbXBvbmVudF1cblxufSlcblxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuXG5cblxuXG5cbiJdfQ==