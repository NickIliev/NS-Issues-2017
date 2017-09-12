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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsMEVBQWdHO0FBQ2hHLHlFQUFvRjtBQUNwRix1RUFBbUU7QUFDbkUsNkRBQTJEO0FBQzNELGdFQUE4RDtBQUM5RCxzRUFBb0U7QUFDcEUsMENBQStDO0FBRS9DLGlFQUEyRDtBQUMzRCw4REFBNkQ7QUFDN0QsNkVBQTRFO0FBQzVFLDRGQUEwRjtBQUMxRixvRUFBa0U7QUFDbEUscUVBQStEO0FBQy9ELHFHQUFtRztBQUNuRywyREFBeUQ7QUErQ3pELElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUE3Q3hCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsaUNBQXdCO1lBQ3hCLHdDQUE4QjtZQUM5QixxQkFBWTtZQUNaLDJCQUFZO1lBQ1oscUNBQWlCO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wscUJBQVk7WUFDWiw0QkFBWTtZQUNaLDhCQUFhO1lBQ2Isa0NBQWU7WUFDZixzQ0FBaUI7WUFDakIsa0NBQWE7WUFDYiwyQ0FBa0I7WUFDbEIsMENBQWtCO1lBQ2xCLHVDQUFjO1lBQ2QsMkJBQVk7WUFDWixxQ0FBaUI7WUFDakIsc0RBQXlCO1lBQ3pCLDhCQUFXO1lBQ1gsNERBQTRCO1NBQy9CO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWiw4QkFBYTtZQUNiLGtDQUFlO1lBQ2Ysc0NBQWlCO1lBQ2pCLGtDQUFhO1lBQ2IsMkNBQWtCO1lBQ2xCLHVDQUFjO1lBQ2Qsc0RBQXlCO1lBQ3pCLDBDQUFrQjtZQUNsQiw4QkFBVztZQUNYLDREQUE0QjtTQUUvQjtRQUNFLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDM0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsZUFBZSxFQUFFLENBQUMsc0RBQXlCO1lBQ3ZDLDREQUE0QixDQUFDO0tBQ3BDLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgSWZBbmRyb2lkRGlyZWN0aXZlLCBJZklvc0RpcmVjdGl2ZSB9IGZyb20gXCIuL3V0aWxzL2lmLXBsYXRmb3JtLWRpcmVjdGl2ZXNcIjtcclxuaW1wb3J0IHsgSWZUdXJuT2ZmRGlyZWN0aXZlIH0gZnJvbSBcIi4vdXRpbHMvaWYtdHVybk9mZi1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gXCIuLi9zaGFyZWQvdGFiL3RhYi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gXCIuLi9zaGFyZWQvbWVudS9tZW51LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZvcm1hdERlY2ltYWwgfSBmcm9tIFwiLi91dGlscy9Gb3JtYXREZWNpbWFsLnBpcGVcIjtcclxuaW1wb3J0IHsgU2xpZGVzTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zbGlkZXIvc2xpZGUubW9kdWxlXCI7XHJcbmltcG9ydCB7IEltYWdlU2xpZGVzTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9pbWFnZVNsaWRlci9pbWFnZVNsaWRlLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVzdHJpY3RlZEFjY2Vzcy9yZXN0cmljdGVkQWNjZXNzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTaWRlTWVudUNvbXBvbmVudCB9IGZyb20gXCIuL3NpZGVNZW51L3NpZGVNZW51LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDbGFpbVN0YXR1cyB9IGZyb20gXCIuLi9zaGFyZWQvdXRpbHMvQ2xhaW1TdGF0dXMucGlwZVwiO1xyXG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4vZ3VpZGVFZHVjYXRpb25Qcm9tby9ndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lU2VydmljZSB9IGZyb20gXCIuLi9wYWdlcy9ob21lL2hvbWUuc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgU2xpZGVzTW9kdWxlLFxyXG4gICAgICAgIEltYWdlU2xpZGVzTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBUYWJDb21wb25lbnQsXHJcbiAgICAgICAgTWVudUNvbXBvbmVudCxcclxuICAgICAgICBIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgU2lkZU1lbnVDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWF0RGVjaW1hbCxcclxuICAgICAgICBJZkFuZHJvaWREaXJlY3RpdmUsXHJcbiAgICAgICAgSWZUdXJuT2ZmRGlyZWN0aXZlLFxyXG4gICAgICAgIElmSW9zRGlyZWN0aXZlLFxyXG4gICAgICAgIFNsaWRlc01vZHVsZSxcclxuICAgICAgICBJbWFnZVNsaWRlc01vZHVsZSxcclxuICAgICAgICBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50LFxyXG4gICAgICAgIENsYWltU3RhdHVzLFxyXG4gICAgICAgIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnRcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBUYWJDb21wb25lbnQsXHJcbiAgICAgICAgTWVudUNvbXBvbmVudCxcclxuICAgICAgICBIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgU2lkZU1lbnVDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWF0RGVjaW1hbCxcclxuICAgICAgICBJZkFuZHJvaWREaXJlY3RpdmUsXHJcbiAgICAgICAgSWZJb3NEaXJlY3RpdmUsXHJcbiAgICAgICAgUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCxcclxuICAgICAgICBJZlR1cm5PZmZEaXJlY3RpdmUsXHJcbiAgICAgICAgQ2xhaW1TdGF0dXMsXHJcbiAgICAgICAgR3VpZGVFZHVjYXRpb25Qcm9tb0NvbXBvbmVudFxyXG5cclxuICAgIF0sXHJcbiAgICAgICBwcm92aWRlcnM6IFtIb21lU2VydmljZV0sXHJcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50LFxyXG4gICAgICAgIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9Il19