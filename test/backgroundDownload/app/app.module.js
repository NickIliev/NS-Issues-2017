"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var item_service_1 = require("./item/item.service");
var items_component_1 = require("./item/items.component");
var item_detail_component_1 = require("./item/item-detail.component");
var application = require("application");
var platform_1 = require("platform");
if (platform_1.isIOS) {
    var AppDelegate = (function (_super) {
        __extends(AppDelegate, _super);
        function AppDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppDelegate.prototype.applicationHandleEventsForBackgroundURLSessionCompletionHandler = function (app, identifier, handler) {
            // Do some stuff, if async - keep the handler to call when ready
            console.log("applicationHandleEventsForBackgroundURLSessionCompletionHandler: " + identifier);
            handler();
        };
        return AppDelegate;
    }(NSObject));
    AppDelegate.ObjCProtocols = [UIApplicationDelegate];
    application.ios.delegate = AppDelegate;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            app_routing_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            items_component_1.ItemsComponent,
            item_detail_component_1.ItemDetailComponent
        ],
        providers: [
            item_service_1.ItemService
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0Msb0RBQWtEO0FBQ2xELDBEQUF3RDtBQUN4RCxzRUFBbUU7QUFDbkUseUNBQTRDO0FBQzVDLHFDQUE0QztBQUU1QyxFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztJQUNSO1FBQTBCLCtCQUFRO1FBQWxDOztRQVVBLENBQUM7UUFQRyxxRkFBK0QsR0FBL0QsVUFBZ0UsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPO1lBQ3BGLGdFQUFnRTtZQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBRTlGLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVMLGtCQUFDO0lBQUQsQ0FBQyxBQVZELENBQTBCLFFBQVE7SUFDdkIseUJBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFVbkQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0FBQzNDLENBQUM7QUFzQkQsSUFBYSxTQUFTO0lBQXRCO0lBQXdCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBekIsSUFBeUI7QUFBWixTQUFTO0lBcEJyQixlQUFRLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDUCw0QkFBWTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLDhCQUFnQjtTQUNuQjtRQUNELFlBQVksRUFBRTtZQUNWLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCwyQ0FBbUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDUCwwQkFBVztTQUNkO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBRztBQUFaLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0vaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJdGVtc0NvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbXMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJdGVtRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vaXRlbS9pdGVtLWRldGFpbC5jb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuaWYgKGlzSU9TKSB7XG4gICAgY2xhc3MgQXBwRGVsZWdhdGUgZXh0ZW5kcyBOU09iamVjdCBpbXBsZW1lbnRzIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSB7XG4gICAgICAgIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1VJQXBwbGljYXRpb25EZWxlZ2F0ZV07XG5cbiAgICAgICAgYXBwbGljYXRpb25IYW5kbGVFdmVudHNGb3JCYWNrZ3JvdW5kVVJMU2Vzc2lvbkNvbXBsZXRpb25IYW5kbGVyKGFwcCwgaWRlbnRpZmllciwgaGFuZGxlcikge1xuICAgICAgICAgICAgLy8gRG8gc29tZSBzdHVmZiwgaWYgYXN5bmMgLSBrZWVwIHRoZSBoYW5kbGVyIHRvIGNhbGwgd2hlbiByZWFkeVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcHBsaWNhdGlvbkhhbmRsZUV2ZW50c0ZvckJhY2tncm91bmRVUkxTZXNzaW9uQ29tcGxldGlvbkhhbmRsZXI6IFwiICsgaWRlbnRpZmllcik7XG5cbiAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgYXBwbGljYXRpb24uaW9zLmRlbGVnYXRlID0gQXBwRGVsZWdhdGU7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBJdGVtRGV0YWlsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSXRlbVNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=