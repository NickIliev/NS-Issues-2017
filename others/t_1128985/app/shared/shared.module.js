"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular");
var if_platform_directives_1 = require("./utils/if-platform-directives");
var if_turnOff_directives_1 = require("./utils/if-turnOff-directives");
var tab_component_1 = require("../shared/tab/tab.component");
var menu_component_1 = require("../shared/menu/menu.component");
var header_component_1 = require("../shared/header/header.component");
var common_1 = require("@angular/common");
var FormatDecimal_pipe_1 = require("./utils/FormatDecimal.pipe");
var slide_module_1 = require("../shared/slider/slide.module");
var imageSlide_module_1 = require("../shared/imageSlider/imageSlide.module");
var restrictedAccess_component_1 = require("./restrictedAccess/restrictedAccess.component");
var sideMenu_component_1 = require("./sideMenu/sideMenu.component");
var ClaimStatus_pipe_1 = require("../shared/utils/ClaimStatus.pipe");
var guideEducationPromo_component_1 = require("./guideEducationPromo/guideEducationPromo.component");
var home_service_1 = require("../pages/home/home.service");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule,
            angular_1.NativeScriptUISideDrawerModule,
            common_1.CommonModule,
            slide_module_1.SlidesModule,
            imageSlide_module_1.ImageSlidesModule
        ],
        exports: [
            common_1.CommonModule,
            tab_component_1.TabComponent,
            menu_component_1.MenuComponent,
            header_component_1.HeaderComponent,
            sideMenu_component_1.SideMenuComponent,
            FormatDecimal_pipe_1.FormatDecimal,
            if_platform_directives_1.IfAndroidDirective,
            if_turnOff_directives_1.IfTurnOffDirective,
            if_platform_directives_1.IfIosDirective,
            slide_module_1.SlidesModule,
            imageSlide_module_1.ImageSlidesModule,
            restrictedAccess_component_1.RestrictedAccessComponent,
            ClaimStatus_pipe_1.ClaimStatus,
            guideEducationPromo_component_1.GuideEducationPromoComponent
        ],
        declarations: [
            tab_component_1.TabComponent,
            menu_component_1.MenuComponent,
            header_component_1.HeaderComponent,
            sideMenu_component_1.SideMenuComponent,
            FormatDecimal_pipe_1.FormatDecimal,
            if_platform_directives_1.IfAndroidDirective,
            if_platform_directives_1.IfIosDirective,
            restrictedAccess_component_1.RestrictedAccessComponent,
            if_turnOff_directives_1.IfTurnOffDirective,
            ClaimStatus_pipe_1.ClaimStatus,
            guideEducationPromo_component_1.GuideEducationPromoComponent
        ],
        providers: [home_service_1.HomeService],
        schemas: [core_1.NO_ERRORS_SCHEMA],
        entryComponents: [restrictedAccess_component_1.RestrictedAccessComponent,
            guideEducationPromo_component_1.GuideEducationPromoComponent]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsMEVBQWdHO0FBQ2hHLHlFQUFvRjtBQUNwRix1RUFBbUU7QUFDbkUsNkRBQTJEO0FBQzNELGdFQUE4RDtBQUM5RCxzRUFBb0U7QUFDcEUsMENBQStDO0FBRS9DLGlFQUEyRDtBQUMzRCw4REFBNkQ7QUFDN0QsNkVBQTRFO0FBQzVFLDRGQUEwRjtBQUMxRixvRUFBa0U7QUFDbEUscUVBQStEO0FBQy9ELHFHQUFtRztBQUNuRywyREFBeUQ7QUErQ3pELElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUE3Q3hCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsaUNBQXdCO1lBQ3hCLHdDQUE4QjtZQUM5QixxQkFBWTtZQUNaLDJCQUFZO1lBQ1oscUNBQWlCO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wscUJBQVk7WUFDWiw0QkFBWTtZQUNaLDhCQUFhO1lBQ2Isa0NBQWU7WUFDZixzQ0FBaUI7WUFDakIsa0NBQWE7WUFDYiwyQ0FBa0I7WUFDbEIsMENBQWtCO1lBQ2xCLHVDQUFjO1lBQ2QsMkJBQVk7WUFDWixxQ0FBaUI7WUFDakIsc0RBQXlCO1lBQ3pCLDhCQUFXO1lBQ1gsNERBQTRCO1NBQy9CO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWiw4QkFBYTtZQUNiLGtDQUFlO1lBQ2Ysc0NBQWlCO1lBQ2pCLGtDQUFhO1lBQ2IsMkNBQWtCO1lBQ2xCLHVDQUFjO1lBQ2Qsc0RBQXlCO1lBQ3pCLDBDQUFrQjtZQUNsQiw4QkFBVztZQUNYLDREQUE0QjtTQUUvQjtRQUNFLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDM0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsZUFBZSxFQUFFLENBQUMsc0RBQXlCO1lBQ3ZDLDREQUE0QixDQUFDO0tBQ3BDLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBJZkFuZHJvaWREaXJlY3RpdmUsIElmSW9zRGlyZWN0aXZlIH0gZnJvbSBcIi4vdXRpbHMvaWYtcGxhdGZvcm0tZGlyZWN0aXZlc1wiO1xuaW1wb3J0IHsgSWZUdXJuT2ZmRGlyZWN0aXZlIH0gZnJvbSBcIi4vdXRpbHMvaWYtdHVybk9mZi1kaXJlY3RpdmVzXCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vc2hhcmVkL3RhYi90YWIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSBcIi4uL3NoYXJlZC9tZW51L21lbnUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZvcm1hdERlY2ltYWwgfSBmcm9tIFwiLi91dGlscy9Gb3JtYXREZWNpbWFsLnBpcGVcIjtcbmltcG9ydCB7IFNsaWRlc01vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2xpZGVyL3NsaWRlLm1vZHVsZVwiO1xuaW1wb3J0IHsgSW1hZ2VTbGlkZXNNb2R1bGUgfSBmcm9tIFwiLi4vc2hhcmVkL2ltYWdlU2xpZGVyL2ltYWdlU2xpZGUubW9kdWxlXCI7XG5pbXBvcnQgeyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVzdHJpY3RlZEFjY2Vzcy9yZXN0cmljdGVkQWNjZXNzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2lkZU1lbnVDb21wb25lbnQgfSBmcm9tIFwiLi9zaWRlTWVudS9zaWRlTWVudS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENsYWltU3RhdHVzIH0gZnJvbSBcIi4uL3NoYXJlZC91dGlscy9DbGFpbVN0YXR1cy5waXBlXCI7XG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4vZ3VpZGVFZHVjYXRpb25Qcm9tby9ndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZVNlcnZpY2UgfSBmcm9tIFwiLi4vcGFnZXMvaG9tZS9ob21lLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFNsaWRlc01vZHVsZSxcbiAgICAgICAgSW1hZ2VTbGlkZXNNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUYWJDb21wb25lbnQsXG4gICAgICAgIE1lbnVDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgU2lkZU1lbnVDb21wb25lbnQsXG4gICAgICAgIEZvcm1hdERlY2ltYWwsXG4gICAgICAgIElmQW5kcm9pZERpcmVjdGl2ZSxcbiAgICAgICAgSWZUdXJuT2ZmRGlyZWN0aXZlLFxuICAgICAgICBJZklvc0RpcmVjdGl2ZSxcbiAgICAgICAgU2xpZGVzTW9kdWxlLFxuICAgICAgICBJbWFnZVNsaWRlc01vZHVsZSxcbiAgICAgICAgUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCxcbiAgICAgICAgQ2xhaW1TdGF0dXMsXG4gICAgICAgIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUYWJDb21wb25lbnQsXG4gICAgICAgIE1lbnVDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgU2lkZU1lbnVDb21wb25lbnQsXG4gICAgICAgIEZvcm1hdERlY2ltYWwsXG4gICAgICAgIElmQW5kcm9pZERpcmVjdGl2ZSxcbiAgICAgICAgSWZJb3NEaXJlY3RpdmUsXG4gICAgICAgIFJlc3RyaWN0ZWRBY2Nlc3NDb21wb25lbnQsXG4gICAgICAgIElmVHVybk9mZkRpcmVjdGl2ZSxcbiAgICAgICAgQ2xhaW1TdGF0dXMsXG4gICAgICAgIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnRcblxuICAgIF0sXG4gICAgICAgcHJvdmlkZXJzOiBbSG9tZVNlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50LFxuICAgICAgICBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9Il19