import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MyDoctorsComponent } from "./myDoctors.component";
import { ViewVisitHistoryComponent } from "./viewVisitHistory/viewVisitHistory.component";
import { MyDoctorsService } from "./myDoctors.service";
import { SharedModule } from "../../shared/shared.module";
import { LocateAddress } from "nativescript-locate-address";


export const routerConfig = [
    {
        path: "",
        component: MyDoctorsComponent
    },
    {
        path: "mydoctors",
        component: MyDoctorsComponent
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule
    ],
    declarations: [
        MyDoctorsComponent, ViewVisitHistoryComponent
    ],
    providers: [MyDoctorsService, LocateAddress],
    entryComponents: [ViewVisitHistoryComponent],
})

export class MyDoctorsModule { }