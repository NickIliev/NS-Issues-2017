import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ClaimModalComponent } from "./claimModal/claimModal.component";
import { ClaimSummaryComponent } from "./claimSummary/claimSummary.component";
import { ClaimDetailComponent } from "./claimDetail/claimDetail.component";
import { SharedModule } from "../../shared/shared.module";

import { ClaimType } from "../../shared/utils/ClaimType.pipe";

export const routerConfig = [
    {
        path: "",
        component: ClaimSummaryComponent
    },
    {
        path: "ClaimDetail",
        component: ClaimDetailComponent,
        data: { title: "ClaimDetail" }
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
        ClaimSummaryComponent,
        ClaimModalComponent,
        ClaimDetailComponent,
        ClaimType
    ],
    providers: [ModalDialogService],
    entryComponents: [ClaimModalComponent],
})

export class ClaimModule { }