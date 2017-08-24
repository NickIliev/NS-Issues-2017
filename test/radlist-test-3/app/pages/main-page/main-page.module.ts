import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LISTVIEW_DIRECTIVES } from "nativescript-telerik-ui/listview/angular";

import { MainPageComponent } from "./main-page.component";

import { MainPageInnerComponent } from './main-page-inner/main-page-inner.component';
import { InnerOneComponent } from './main-page-inner/inner-one.component';
import { InnerTwoComponent } from './main-page-inner/inner-two.component';

export const routerConfig = [
    {
        path: "",
        component: MainPageComponent
    },
    {
        path: "inner",
        component: MainPageInnerComponent,
        children: [
            { path: "first", component: InnerOneComponent },
            { path: "second", component: InnerTwoComponent }
        ]
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig)
    ],
    declarations: [
        MainPageComponent,
        MainPageInnerComponent,
        InnerOneComponent,
        InnerTwoComponent,
        LISTVIEW_DIRECTIVES
    ]
})

export class MainPageModule { }
