"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var recording_component_1 = require("./recording/recording.component");
var recordings_component_1 = require("./recordings/recordings.component");
var main_component_1 = require("./main/main.component");
var settings_service_1 = require("./settings.service");
var recordings_service_1 = require("./recordings/recordings.service");
var item_service_1 = require("./item/item.service");
var items_component_1 = require("./item/items.component");
var item_detail_component_1 = require("./item/item-detail.component");
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
            forms_1.NativeScriptFormsModule,
            app_routing_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            main_component_1.MainComponent,
            recording_component_1.RecordingComponent,
            recordings_component_1.RecordingsComponent,
            items_component_1.ItemsComponent,
            item_detail_component_1.ItemDetailComponent
        ],
        providers: [
            item_service_1.ItemService,
            settings_service_1.SettingsService,
            recordings_service_1.RecordingsService
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFvRTtBQUNwRSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBRS9DLHVFQUFxRTtBQUNyRSwwRUFBd0U7QUFFeEUsd0RBQXNEO0FBQ3RELHVEQUFxRDtBQUNyRCxzRUFBb0U7QUFFcEUsb0RBQWtEO0FBQ2xELDBEQUF3RDtBQUN4RCxzRUFBbUU7QUFrQ25FLElBQWEsU0FBUztJQUF0QjtJQUVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksU0FBUztJQWhDckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FDZjtRQUVELE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFFdkIsOEJBQWdCO1NBQ25CO1FBRUQsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWiw4QkFBYTtZQUNiLHdDQUFrQjtZQUNsQiwwQ0FBbUI7WUFFbkIsZ0NBQWM7WUFDZCwyQ0FBbUI7U0FDdEI7UUFFRCxTQUFTLEVBQUU7WUFDUCwwQkFBVztZQUNYLGtDQUFlO1lBQ2Ysc0NBQWlCO1NBQ3BCO1FBRUQsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FFckI7QUFGWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgUmVjb3JkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9yZWNvcmRpbmcvcmVjb3JkaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9yZWNvcmRpbmdzL3JlY29yZGluZ3MuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTWFpbkNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi9tYWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICcuL3NldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb3JkaW5nc1NlcnZpY2UgfSBmcm9tICcuL3JlY29yZGluZ3MvcmVjb3JkaW5ncy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgSXRlbXNDb21wb25lbnQgfSBmcm9tIFwiLi9pdGVtL2l0ZW1zLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSXRlbURldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbS1kZXRhaWwuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG5cbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG5cbiAgICAgICAgQXBwUm91dGluZ01vZHVsZVxuICAgIF0sXG5cbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBNYWluQ29tcG9uZW50LFxuICAgICAgICBSZWNvcmRpbmdDb21wb25lbnQsXG4gICAgICAgIFJlY29yZGluZ3NDb21wb25lbnQsXG5cbiAgICAgICAgSXRlbXNDb21wb25lbnQsXG4gICAgICAgIEl0ZW1EZXRhaWxDb21wb25lbnRcbiAgICBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEl0ZW1TZXJ2aWNlLFxuICAgICAgICBTZXR0aW5nc1NlcnZpY2UsXG4gICAgICAgIFJlY29yZGluZ3NTZXJ2aWNlXG4gICAgXSxcblxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcbiAgICBcbn1cbiJdfQ==