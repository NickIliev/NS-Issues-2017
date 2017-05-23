"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var core_1 = require("@angular/core");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var shared_1 = require("./shared");
var login_module_1 = require("./login/login.module");
var mainScreen_module_1 = require("./main/mainScreen.module");
var http_2 = require("@angular/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
shared_1.setStatusBarColors();
// AoT requires an exported function for factories 
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, "~/i18n/", ".json");
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        providers: [
            shared_1.BackendService,
            shared_1.LoginService,
            shared_1.HieberService,
            app_routing_1.authProviders,
            shared_1.TokenService
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.appRoutes),
            login_module_1.LoginModule,
            mainScreen_module_1.MainMenuModule,
            http_2.HttpModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_2.Http]
                }
            })
        ],
        declarations: [
            app_component_1.AppComponent,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0NBQXlDO0FBQ3pDLGtEQUFtRTtBQUNuRSxzREFBdUU7QUFDdkUsNkNBQXlEO0FBQ3pELGlEQUErQztBQUMvQyxtQ0FBeUc7QUFDekcscURBQW1EO0FBRW5ELDhEQUEwRDtBQUUxRCxzQ0FBaUQ7QUFDakQsNENBQXVFO0FBQ3ZFLDBEQUFpRTtBQUVqRSwyQkFBa0IsRUFBRSxDQUFDO0FBQ3JCLG1EQUFtRDtBQUNuRCwyQkFBa0MsSUFBVTtJQUMxQyxNQUFNLENBQUMsSUFBSSxpQ0FBbUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCw4Q0FFQztBQWdDRCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUEvQnJCLGVBQVEsQ0FBQztRQUNSLFNBQVMsRUFBRTtZQUNULHVCQUFjO1lBQ2QscUJBQVk7WUFDWixzQkFBYTtZQUNiLDJCQUFhO1lBRWIscUJBQVk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQiw2QkFBc0I7WUFDdEIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyx1QkFBUyxDQUFDO1lBQzNDLDBCQUFXO1lBQ1gsa0NBQWM7WUFDZCxpQkFBVTtZQUNWLHNCQUFlLENBQUMsT0FBTyxDQUFDO2dCQUN0QixNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFLHNCQUFlO29CQUN4QixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixJQUFJLEVBQUUsQ0FBQyxXQUFJLENBQUM7aUJBQ2I7YUFDRixDQUFDO1NBQ0g7UUFDRCxZQUFZLEVBQUU7WUFDWiw0QkFBWTtTQUViO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBhdXRoUHJvdmlkZXJzLCBhcHBSb3V0ZXMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgc2V0U3RhdHVzQmFyQ29sb3JzLCBCYWNrZW5kU2VydmljZSwgTG9naW5TZXJ2aWNlLCBIaWViZXJTZXJ2aWNlLCBUb2tlblNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSBcIi4vbG9naW4vbG9naW4ubW9kdWxlXCI7XG5cbmltcG9ydCB7IE1haW5NZW51TW9kdWxlIH0gZnJvbSBcIi4vbWFpbi9tYWluU2NyZWVuLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBIdHRwTW9kdWxlLCBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyIH0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcbmltcG9ydCB7IFRyYW5zbGF0ZUh0dHBMb2FkZXIgfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXJcIjtcblxuc2V0U3RhdHVzQmFyQ29sb3JzKCk7XG4vLyBBb1QgcmVxdWlyZXMgYW4gZXhwb3J0ZWQgZnVuY3Rpb24gZm9yIGZhY3RvcmllcyBcbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwOiBIdHRwKSB7XG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwLCBcIn4vaTE4bi9cIiwgXCIuanNvblwiKTtcbn1cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEJhY2tlbmRTZXJ2aWNlLFxuICAgIExvZ2luU2VydmljZSxcbiAgICBIaWViZXJTZXJ2aWNlLFxuICAgIGF1dGhQcm92aWRlcnMsXG4gXG4gICAgVG9rZW5TZXJ2aWNlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3QoYXBwUm91dGVzKSxcbiAgICBMb2dpbk1vZHVsZSxcbiAgICBNYWluTWVudU1vZHVsZSxcbiAgICBIdHRwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IEh0dHBMb2FkZXJGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cF1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG5cbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=