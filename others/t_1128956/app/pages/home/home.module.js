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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUVyRSwwRUFBd0U7QUFDeEUsbUZBQWlGO0FBQ2pGLDREQUEwRDtBQUMxRCwrQ0FBNkM7QUFDN0MsaUVBQWdFO0FBQ2hFLG1GQUFpRjtBQUNqRiw2REFBMkQ7QUFFOUMsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUsMENBQW1CO0tBQ2pDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUsZ0RBQXNCO0tBQ3BDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUsZ0RBQXNCO1FBQ2pDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7S0FDbkM7Q0FDSixDQUFDO0FBZ0JGLElBQWEsVUFBVTtJQUNuQjtJQUFnQixDQUFDO0lBQ3JCLGlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxVQUFVO0lBZHRCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1lBQ1osMkJBQVk7U0FDZjtRQUNELFlBQVksRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdEQUFzQixFQUFFLGdEQUFzQixDQUFDO1FBQ25GLFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsb0NBQWdCLENBQUM7S0FDN0MsQ0FBQzs7R0FFVyxVQUFVLENBRXRCO0FBRlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IFNpZ25lZEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9zaWduZWRIb21lL3NpZ25lZEhvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFydGljbGVEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9hcnRpY2xlRGV0YWlsL2FydGljbGVEZXRhaWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBIb21lU2VydmljZSB9IGZyb20gXCIuL2hvbWUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTbGlkZXNNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NsaWRlci9zbGlkZS5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQW5vbnltb3VzSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2Fub255bW91c0hvbWUvYW5vbnltb3VzSG9tZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9hbmFseXRpY3Muc2VydmljZVwiOyBcclxuaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcclxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcInNpZ25lZEhvbWVcIixcclxuICAgICAgICBjb21wb25lbnQ6IFNpZ25lZEhvbWVDb21wb25lbnRcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCJhbm9ueW1vdXNIb21lXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBBbm9ueW1vdXNIb21lQ29tcG9uZW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcImFydGljbGVEZXRhaWxcIixcclxuICAgICAgICBjb21wb25lbnQ6IEFydGljbGVEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJhcnRpY2xlRGV0YWlsXCIgfVxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcclxuICAgICAgICBTbGlkZXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTaWduZWRIb21lQ29tcG9uZW50LCBBbm9ueW1vdXNIb21lQ29tcG9uZW50LCBBcnRpY2xlRGV0YWlsQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW0hvbWVTZXJ2aWNlLCBBbmFseXRpY3NTZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVNb2R1bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iXX0=