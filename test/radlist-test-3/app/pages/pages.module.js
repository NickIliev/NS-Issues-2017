"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var pages_component_1 = require("./pages.component");
exports.routerConfig = [{
        path: "",
        component: pages_component_1.PagesComponent
    }];
var PagesModule = (function () {
    function PagesModule() {
    }
    return PagesModule;
}());
PagesModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig)
        ],
        declarations: [pages_component_1.PagesComponent]
    }),
    __metadata("design:paramtypes", [])
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFFOUUscURBQW1EO0FBRXRDLFFBQUEsWUFBWSxHQUFHLENBQUM7UUFDekIsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsZ0NBQWM7S0FDNUIsQ0FBQyxDQUFDO0FBWUgsSUFBYSxXQUFXO0lBQ3BCO0lBQWdCLENBQUM7SUFDckIsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLFdBQVc7SUFWdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztTQUNsRDtRQUNELFlBQVksRUFBRSxDQUFDLGdDQUFjLENBQUM7S0FDakMsQ0FBQzs7R0FFVyxXQUFXLENBRXZCO0FBRlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBQYWdlc0NvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFt7XG4gICAgcGF0aDogXCJcIixcbiAgICBjb21wb25lbnQ6IFBhZ2VzQ29tcG9uZW50XG59XTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZylcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhZ2VzQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIFBhZ2VzTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIl19