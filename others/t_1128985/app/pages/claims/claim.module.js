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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhaW0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0ZBQThFO0FBQzlFLHNEQUF1RTtBQUN2RSxvREFBcUU7QUFDckUsc0NBQTJEO0FBQzNELGtFQUF1RTtBQUN2RSwwRUFBd0U7QUFDeEUsZ0ZBQThFO0FBQzlFLDZFQUEyRTtBQUMzRSw0REFBMEQ7QUFFMUQsb0VBQThEO0FBRWpELFFBQUEsWUFBWSxHQUFHO0lBQ3hCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsOENBQXFCO0tBQ25DO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixTQUFTLEVBQUUsNENBQW9CO1FBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7S0FDakM7Q0FDSixDQUFDO0FBcUJGLElBQWEsV0FBVztJQUF4QjtJQUEyQixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBQTVCLElBQTRCO0FBQWYsV0FBVztJQW5CdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNBLFlBQVksRUFBRTtZQUNYLDhDQUFxQjtZQUNyQiwwQ0FBbUI7WUFDbkIsNENBQW9CO1lBQ3BCLDBCQUFTO1NBQ1o7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBa0IsQ0FBQztRQUMvQixlQUFlLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztLQUN6QyxDQUFDO0dBRVcsV0FBVyxDQUFJO0FBQWYsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IENsYWltTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFpbU1vZGFsL2NsYWltTW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDbGFpbVN1bW1hcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFpbVN1bW1hcnkvY2xhaW1TdW1tYXJ5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2xhaW1EZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFpbURldGFpbC9jbGFpbURldGFpbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBDbGFpbVR5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3V0aWxzL0NsYWltVHlwZS5waXBlXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiBcIlwiLFxuICAgICAgICBjb21wb25lbnQ6IENsYWltU3VtbWFyeUNvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcIkNsYWltRGV0YWlsXCIsXG4gICAgICAgIGNvbXBvbmVudDogQ2xhaW1EZXRhaWxDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiQ2xhaW1EZXRhaWxcIiB9XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2xhaW1TdW1tYXJ5Q29tcG9uZW50LFxuICAgICAgICBDbGFpbU1vZGFsQ29tcG9uZW50LFxuICAgICAgICBDbGFpbURldGFpbENvbXBvbmVudCxcbiAgICAgICAgQ2xhaW1UeXBlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtNb2RhbERpYWxvZ1NlcnZpY2VdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0NsYWltTW9kYWxDb21wb25lbnRdLFxufSlcblxuZXhwb3J0IGNsYXNzIENsYWltTW9kdWxlIHsgfSJdfQ==