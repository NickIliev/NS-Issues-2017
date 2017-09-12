import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewContainerRef } from "@angular/core";

import { DropDownModule } from "nativescript-drop-down/angular";
import { SharedModule } from "../../shared/shared.module";

import { FormValidationService } from "../../shared/services/formValidation.service";
import { CardsComponent } from "./cards.component";
import { CardsService } from "./cards.service";
import { CardDetailComponent } from "./cardDetail/cardDetail.component";

export const routerConfig = [
       { path: "", component: CardsComponent },
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule,
        ReactiveFormsModule,
        DropDownModule,
    ],
    declarations: [
      CardsComponent,CardDetailComponent
    ],
    providers: [CardsService],
    exports: [
        CardDetailComponent
    ],
    entryComponents: [CardDetailComponent]

})

export class CardsModule {
    constructor() { }
}





