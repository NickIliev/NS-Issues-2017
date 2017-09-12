import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { MedicationComponent } from "./medication.component";
import { ViewPrescriptionModalComponent } from "./ViewPrescriptionModal/ViewPrescriptionModal.component";
import { SharedModule } from "../../shared/shared.module";
import { MedicationService } from "./medication.service";
import { LocateAddress } from "nativescript-locate-address";

export const routerConfig = [
    {
        path: "",
        component: MedicationComponent
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
    declarations: [MedicationComponent, ViewPrescriptionModalComponent],
    providers: [ModalDialogService, MedicationService, LocateAddress],
    entryComponents: [ViewPrescriptionModalComponent],
})

export class MedicationModule {
    constructor() { }
}
