"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var mainScreen_routing_1 = require("./mainScreen.routing");
var mainScreen_component_1 = require("./mainScreen.component");
var allChatUser_component_1 = require("./chatlist/allChatUser.component");
var privateChatUser_component_1 = require("./chatlist/privateChatUser.component");
var homeScreenList_component_1 = require("./homelist/homeScreenList.component");
var allContacts_component_1 = require("./chatlist/allContacts.component");
var groupChatUser_component_1 = require("./chatlist/groupChatUser.component");
var core_2 = require("@ngx-translate/core");
var MainMenuModule = (function () {
    function MainMenuModule() {
    }
    return MainMenuModule;
}());
MainMenuModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            mainScreen_routing_1.mainMenuRouting,
            core_2.TranslateModule.forChild()
        ],
        declarations: [
            mainScreen_component_1.MainScreen,
            allChatUser_component_1.AllChatUser,
            privateChatUser_component_1.PrivateChatUser,
            homeScreenList_component_1.HomeScreenList,
            allContacts_component_1.AllContacts,
            groupChatUser_component_1.GroupChatUser
        ]
    })
], MainMenuModule);
exports.MainMenuModule = MainMenuModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblNjcmVlbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluU2NyZWVuLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdGQUE4RTtBQUM5RSxvREFBcUU7QUFDckUsc0NBQXlDO0FBQ3pDLDJEQUF1RDtBQUN2RCwrREFBb0Q7QUFHcEQsMEVBQStEO0FBQy9ELGtGQUF1RTtBQUV2RSxnRkFBcUU7QUFDckUsMEVBQStEO0FBQy9ELDhFQUFtRTtBQUVuRSw0Q0FBdUU7QUFxQnZFLElBQWEsY0FBYztJQUEzQjtJQUE4QixDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBQS9CLElBQStCO0FBQWxCLGNBQWM7SUFwQjFCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsb0NBQWU7WUFDZixzQkFBZSxDQUFDLFFBQVEsRUFBRTtTQUM3QjtRQUNELFlBQVksRUFBRTtZQUNWLGlDQUFVO1lBRVYsbUNBQVc7WUFDWCwyQ0FBZTtZQUVmLHlDQUFjO1lBQ2QsbUNBQVc7WUFDWCx1Q0FBYTtTQUNoQjtLQUVKLENBQUM7R0FFVyxjQUFjLENBQUk7QUFBbEIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IG1haW5NZW51Um91dGluZyB9IGZyb20gXCIuL21haW5TY3JlZW4ucm91dGluZ1wiO1xuaW1wb3J0IHsgTWFpblNjcmVlbiB9IGZyb20gXCIuL21haW5TY3JlZW4uY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gXCIuLi9hdXRoLWd1YXJkLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFsbENoYXRVc2VyIH0gZnJvbSBcIi4vY2hhdGxpc3QvYWxsQ2hhdFVzZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcml2YXRlQ2hhdFVzZXIgfSBmcm9tIFwiLi9jaGF0bGlzdC9wcml2YXRlQ2hhdFVzZXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IEhvbWVTY3JlZW5MaXN0IH0gZnJvbSBcIi4vaG9tZWxpc3QvaG9tZVNjcmVlbkxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBbGxDb250YWN0cyB9IGZyb20gXCIuL2NoYXRsaXN0L2FsbENvbnRhY3RzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgR3JvdXBDaGF0VXNlciB9IGZyb20gXCIuL2NoYXRsaXN0L2dyb3VwQ2hhdFVzZXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgbWFpbk1lbnVSb3V0aW5nLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUuZm9yQ2hpbGQoKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1haW5TY3JlZW4sXG5cbiAgICAgICAgQWxsQ2hhdFVzZXIsXG4gICAgICAgIFByaXZhdGVDaGF0VXNlcixcblxuICAgICAgICBIb21lU2NyZWVuTGlzdCxcbiAgICAgICAgQWxsQ29udGFjdHMsXG4gICAgICAgIEdyb3VwQ2hhdFVzZXJcbiAgICBdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBNYWluTWVudU1vZHVsZSB7IH1cblxuIl19