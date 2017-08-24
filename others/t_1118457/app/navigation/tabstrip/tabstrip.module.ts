import { NgModule } from "@angular/core";

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { tabMenuRouting } from "./tabstrip.routes";
import { TabMenuComponent } from "./tabstrip.component";
import { SharedModule } from "../../shared/shared.module";

import * as common from "../shared";
import * as shared from "../../shared";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    tabMenuRouting,
    SharedModule,
    ...common.MODULES
  ],
  declarations: [
    TabMenuComponent
  ]
})
export class TabstripMenuModule { }
