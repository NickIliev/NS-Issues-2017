"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var signedHome_component_1 = require("./signedHome/signedHome.component");
var articleDetail_component_1 = require("./articleDetail/articleDetail.component");
var shared_module_1 = require("../../shared/shared.module");
var home_service_1 = require("./home.service");
var slide_module_1 = require("../../shared/slider/slide.module");
var anonymousHome_component_1 = require("./anonymousHome/anonymousHome.component");
var analytics_service_1 = require("../../analytics.service");
exports.routerConfig = [
    {
        path: "signedHome",
        component: signedHome_component_1.SignedHomeComponent
    },
    {
        path: "anonymousHome",
        component: anonymousHome_component_1.AnonymousHomeComponent,
    },
    {
        path: "articleDetail",
        component: articleDetail_component_1.ArticleDetailComponent,
        data: { title: "articleDetail" }
    }
];
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule,
            slide_module_1.SlidesModule
        ],
        declarations: [signedHome_component_1.SignedHomeComponent, anonymousHome_component_1.AnonymousHomeComponent, articleDetail_component_1.ArticleDetailComponent],
        providers: [home_service_1.HomeService, analytics_service_1.AnalyticsService]
    }),
    __metadata("design:paramtypes", [])
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUVyRSwwRUFBd0U7QUFDeEUsbUZBQWlGO0FBQ2pGLDREQUEwRDtBQUMxRCwrQ0FBNkM7QUFDN0MsaUVBQWdFO0FBQ2hFLG1GQUFpRjtBQUNqRiw2REFBMkQ7QUFFOUMsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUsMENBQW1CO0tBQ2pDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUsZ0RBQXNCO0tBQ3BDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUsZ0RBQXNCO1FBQ2pDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7S0FDbkM7Q0FDSixDQUFDO0FBZ0JGLElBQWEsVUFBVTtJQUNuQjtJQUFnQixDQUFDO0lBQ3JCLGlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxVQUFVO0lBZHRCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1lBQ1osMkJBQVk7U0FDZjtRQUNELFlBQVksRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdEQUFzQixFQUFFLGdEQUFzQixDQUFDO1FBQ25GLFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsb0NBQWdCLENBQUM7S0FDN0MsQ0FBQzs7R0FFVyxVQUFVLENBRXRCO0FBRlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgU2lnbmVkSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL3NpZ25lZEhvbWUvc2lnbmVkSG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFydGljbGVEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9hcnRpY2xlRGV0YWlsL2FydGljbGVEZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IEhvbWVTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTbGlkZXNNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NsaWRlci9zbGlkZS5tb2R1bGVcIjtcbmltcG9ydCB7IEFub255bW91c0hvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9hbm9ueW1vdXNIb21lL2Fub255bW91c0hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2FuYWx5dGljcy5zZXJ2aWNlXCI7IFxuaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiBcInNpZ25lZEhvbWVcIixcbiAgICAgICAgY29tcG9uZW50OiBTaWduZWRIb21lQ29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiYW5vbnltb3VzSG9tZVwiLFxuICAgICAgICBjb21wb25lbnQ6IEFub255bW91c0hvbWVDb21wb25lbnQsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiYXJ0aWNsZURldGFpbFwiLFxuICAgICAgICBjb21wb25lbnQ6IEFydGljbGVEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiYXJ0aWNsZURldGFpbFwiIH1cbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgU2xpZGVzTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTaWduZWRIb21lQ29tcG9uZW50LCBBbm9ueW1vdXNIb21lQ29tcG9uZW50LCBBcnRpY2xlRGV0YWlsQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtIb21lU2VydmljZSwgQW5hbHl0aWNzU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIl19