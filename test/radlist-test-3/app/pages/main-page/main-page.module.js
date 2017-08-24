"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-telerik-ui/listview/angular");
var main_page_component_1 = require("./main-page.component");
var main_page_inner_component_1 = require("./main-page-inner/main-page-inner.component");
var inner_one_component_1 = require("./main-page-inner/inner-one.component");
var inner_two_component_1 = require("./main-page-inner/inner-two.component");
exports.routerConfig = [
    {
        path: "",
        component: main_page_component_1.MainPageComponent
    },
    {
        path: "inner",
        component: main_page_inner_component_1.MainPageInnerComponent,
        children: [
            { path: "first", component: inner_one_component_1.InnerOneComponent },
            { path: "second", component: inner_two_component_1.InnerTwoComponent }
        ]
    }
];
var MainPageModule = (function () {
    function MainPageModule() {
    }
    return MainPageModule;
}());
MainPageModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig)
        ],
        declarations: [
            main_page_component_1.MainPageComponent,
            main_page_inner_component_1.MainPageInnerComponent,
            inner_one_component_1.InnerOneComponent,
            inner_two_component_1.InnerTwoComponent,
            angular_1.LISTVIEW_DIRECTIVES
        ]
    })
], MainPageModule);
exports.MainPageModule = MainPageModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUE4RTtBQUM5RSxvREFBcUU7QUFDckUsb0VBQStFO0FBRS9FLDZEQUEwRDtBQUUxRCx5RkFBcUY7QUFDckYsNkVBQTBFO0FBQzFFLDZFQUEwRTtBQUU3RCxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLHVDQUFpQjtLQUMvQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsa0RBQXNCO1FBQ2pDLFFBQVEsRUFBRTtZQUNOLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUNBQWlCLEVBQUU7WUFDL0MsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBRTtTQUNuRDtLQUNKO0NBQ0osQ0FBQztBQW1CRixJQUFhLGNBQWM7SUFBM0I7SUFBOEIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUEvQixJQUErQjtBQUFsQixjQUFjO0lBakIxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztTQUNsRDtRQUNELFlBQVksRUFBRTtZQUNWLHVDQUFpQjtZQUNqQixrREFBc0I7WUFDdEIsdUNBQWlCO1lBQ2pCLHVDQUFpQjtZQUNqQiw2QkFBbUI7U0FDdEI7S0FDSixDQUFDO0dBRVcsY0FBYyxDQUFJO0FBQWxCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBMSVNUVklFV19ESVJFQ1RJVkVTIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3L2FuZ3VsYXJcIjtcblxuaW1wb3J0IHsgTWFpblBhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi9tYWluLXBhZ2UuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IE1haW5QYWdlSW5uZXJDb21wb25lbnQgfSBmcm9tICcuL21haW4tcGFnZS1pbm5lci9tYWluLXBhZ2UtaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IElubmVyT25lQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluLXBhZ2UtaW5uZXIvaW5uZXItb25lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbm5lclR3b0NvbXBvbmVudCB9IGZyb20gJy4vbWFpbi1wYWdlLWlubmVyL2lubmVyLXR3by5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgY29tcG9uZW50OiBNYWluUGFnZUNvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImlubmVyXCIsXG4gICAgICAgIGNvbXBvbmVudDogTWFpblBhZ2VJbm5lckNvbXBvbmVudCxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHsgcGF0aDogXCJmaXJzdFwiLCBjb21wb25lbnQ6IElubmVyT25lQ29tcG9uZW50IH0sXG4gICAgICAgICAgICB7IHBhdGg6IFwic2Vjb25kXCIsIGNvbXBvbmVudDogSW5uZXJUd29Db21wb25lbnQgfVxuICAgICAgICBdXG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWFpblBhZ2VDb21wb25lbnQsXG4gICAgICAgIE1haW5QYWdlSW5uZXJDb21wb25lbnQsXG4gICAgICAgIElubmVyT25lQ29tcG9uZW50LFxuICAgICAgICBJbm5lclR3b0NvbXBvbmVudCxcbiAgICAgICAgTElTVFZJRVdfRElSRUNUSVZFU1xuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNYWluUGFnZU1vZHVsZSB7IH1cbiJdfQ==