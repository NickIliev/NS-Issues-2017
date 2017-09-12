import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MyPlanComponent } from "./myPlan.component";
import { SharedModule } from "../../shared/shared.module";
import { MyPlanHelpInfoComponent } from "./myplanhelp/myplanhelpinfo.component";


export const routerConfig = [
    {
        path: "",
        component: MyPlanComponent
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule
    ],
    declarations: [
        MyPlanComponent, MyPlanHelpInfoComponent
    ],
    entryComponents: [MyPlanHelpInfoComponent],
})

export class MyPlanModule { }