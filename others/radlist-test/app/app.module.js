"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-telerik-ui/listview/angular");
var app_component_1 = require("./app.component");
var main_page_component_1 = require("./pages/main-page/main-page.component");
var main_page_inner_component_1 = require("./pages/main-page/main-page-inner/main-page-inner.component");
var test_component_1 = require("./pages/test/test.component");
var test_inner_component_1 = require("./pages/test/test-inner/test-inner.component");
var routes = [
    { path: '', pathMatch: 'full', redirectTo: '/main/(outlet:test)', },
    { path: 'main', component: main_page_component_1.MainPageComponent, children: [
            { path: 'test', component: main_page_inner_component_1.MainPageInnerComponent, outlet: 'outlet' },
        ] },
    { path: 'test', component: test_component_1.TestComponent, children: [
            { path: 'test-inner', component: test_inner_component_1.TestInnerComponent, outlet: 'outlet' }
        ] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            angular_1.LISTVIEW_DIRECTIVES,
            main_page_component_1.MainPageComponent,
            main_page_inner_component_1.MainPageInnerComponent,
            test_component_1.TestComponent,
            test_inner_component_1.TestInnerComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(routes)
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHNEQUF1RTtBQUV2RSxvRUFBK0U7QUFFL0UsaURBQStDO0FBQy9DLDZFQUEwRTtBQUMxRSx5R0FBcUc7QUFDckcsOERBQTREO0FBQzVELHFGQUFrRjtBQUVsRixJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUscUJBQXFCLEdBQUc7SUFDbkUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBRSxRQUFRLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrREFBc0IsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1NBQ3RFLEVBQUM7SUFDRixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUUsUUFBUSxFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtTQUN4RSxFQUFDO0NBQ0gsQ0FBQztBQW1CRixJQUFhLFNBQVM7SUFBdEI7SUFBd0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUF6QixJQUF5QjtBQUFaLFNBQVM7SUFqQnJCLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osNkJBQW1CO1lBQ25CLHVDQUFpQjtZQUNqQixrREFBc0I7WUFDdEIsOEJBQWE7WUFDYix5Q0FBa0I7U0FDbkI7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1FBQ3pCLE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN6QztRQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO0tBQzVCLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExJU1RWSUVXX0RJUkVDVElWRVMgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9hbmd1bGFyJztcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTWFpblBhZ2VDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL21haW4tcGFnZS9tYWluLXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5QYWdlSW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL21haW4tcGFnZS9tYWluLXBhZ2UtaW5uZXIvbWFpbi1wYWdlLWlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy90ZXN0L3Rlc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRlc3RJbm5lckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvdGVzdC90ZXN0LWlubmVyL3Rlc3QtaW5uZXIuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogJycsIHBhdGhNYXRjaDogJ2Z1bGwnLCByZWRpcmVjdFRvOiAnL21haW4vKG91dGxldDp0ZXN0KScsIH0sXG4gIHsgcGF0aDogJ21haW4nLCBjb21wb25lbnQ6IE1haW5QYWdlQ29tcG9uZW50LCBjaGlsZHJlbjogW1xuICAgIHsgcGF0aDogJ3Rlc3QnLCBjb21wb25lbnQ6IE1haW5QYWdlSW5uZXJDb21wb25lbnQsIG91dGxldDogJ291dGxldCcgfSxcbiAgXX0sXG4gIHsgcGF0aDogJ3Rlc3QnLCBjb21wb25lbnQ6IFRlc3RDb21wb25lbnQsIGNoaWxkcmVuOiBbXG4gICAgeyBwYXRoOiAndGVzdC1pbm5lcicsIGNvbXBvbmVudDogVGVzdElubmVyQ29tcG9uZW50LCBvdXRsZXQ6ICdvdXRsZXQnIH1cbiAgXX1cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBMSVNUVklFV19ESVJFQ1RJVkVTLFxuICAgIE1haW5QYWdlQ29tcG9uZW50LFxuICAgIE1haW5QYWdlSW5uZXJDb21wb25lbnQsXG4gICAgVGVzdENvbXBvbmVudCxcbiAgICBUZXN0SW5uZXJDb21wb25lbnRcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIl19