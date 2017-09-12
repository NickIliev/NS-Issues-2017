"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var claimModal_component_1 = require("./claimModal/claimModal.component");
var claimSummary_component_1 = require("./claimSummary/claimSummary.component");
var claimDetail_component_1 = require("./claimDetail/claimDetail.component");
var shared_module_1 = require("../../shared/shared.module");
var ClaimType_pipe_1 = require("../../shared/utils/ClaimType.pipe");
exports.routerConfig = [
    {
        path: "",
        component: claimSummary_component_1.ClaimSummaryComponent
    },
    {
        path: "ClaimDetail",
        component: claimDetail_component_1.ClaimDetailComponent,
        data: { title: "ClaimDetail" }
    }
];
var ClaimModule = (function () {
    function ClaimModule() {
    }
    return ClaimModule;
}());
ClaimModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule
        ],
        declarations: [
            claimSummary_component_1.ClaimSummaryComponent,
            claimModal_component_1.ClaimModalComponent,
            claimDetail_component_1.ClaimDetailComponent,
            ClaimType_pipe_1.ClaimType
        ],
        providers: [modal_dialog_1.ModalDialogService],
        entryComponents: [claimModal_component_1.ClaimModalComponent],
    })
], ClaimModule);
exports.ClaimModule = ClaimModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhaW0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0ZBQThFO0FBQzlFLHNEQUF1RTtBQUN2RSxvREFBcUU7QUFDckUsc0NBQTJEO0FBQzNELGtFQUF1RTtBQUN2RSwwRUFBd0U7QUFDeEUsZ0ZBQThFO0FBQzlFLDZFQUEyRTtBQUMzRSw0REFBMEQ7QUFFMUQsb0VBQThEO0FBRWpELFFBQUEsWUFBWSxHQUFHO0lBQ3hCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsOENBQXFCO0tBQ25DO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixTQUFTLEVBQUUsNENBQW9CO1FBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7S0FDakM7Q0FDSixDQUFDO0FBcUJGLElBQWEsV0FBVztJQUF4QjtJQUEyQixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBQTVCLElBQTRCO0FBQWYsV0FBVztJQW5CdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNBLFlBQVksRUFBRTtZQUNYLDhDQUFxQjtZQUNyQiwwQ0FBbUI7WUFDbkIsNENBQW9CO1lBQ3BCLDBCQUFTO1NBQ1o7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBa0IsQ0FBQztRQUMvQixlQUFlLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztLQUN6QyxDQUFDO0dBRVcsV0FBVyxDQUFJO0FBQWYsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBDbGFpbU1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2xhaW1Nb2RhbC9jbGFpbU1vZGFsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDbGFpbVN1bW1hcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFpbVN1bW1hcnkvY2xhaW1TdW1tYXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDbGFpbURldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL2NsYWltRGV0YWlsL2NsYWltRGV0YWlsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuXHJcbmltcG9ydCB7IENsYWltVHlwZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXRpbHMvQ2xhaW1UeXBlLnBpcGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCJcIixcclxuICAgICAgICBjb21wb25lbnQ6IENsYWltU3VtbWFyeUNvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcIkNsYWltRGV0YWlsXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBDbGFpbURldGFpbENvbXBvbmVudCxcclxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIkNsYWltRGV0YWlsXCIgfVxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDbGFpbVN1bW1hcnlDb21wb25lbnQsXHJcbiAgICAgICAgQ2xhaW1Nb2RhbENvbXBvbmVudCxcclxuICAgICAgICBDbGFpbURldGFpbENvbXBvbmVudCxcclxuICAgICAgICBDbGFpbVR5cGVcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtNb2RhbERpYWxvZ1NlcnZpY2VdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbQ2xhaW1Nb2RhbENvbXBvbmVudF0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xhaW1Nb2R1bGUgeyB9Il19