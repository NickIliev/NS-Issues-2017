import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

import * as common from "./";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule
  ],
  declarations: [
    /// additional declarations
common.ImagePipe,
    common.ActionBarComponent,
    common.IfAndroidDirective,
    common.IfIosDirective,
    common.HyperlinkDirective,
    LISTVIEW_DIRECTIVES
  ],
  exports: [
    /// additional exports
common.ImagePipe,
    common.ActionBarComponent,
    common.IfAndroidDirective,
    common.IfIosDirective,
    common.HyperlinkDirective,
    LISTVIEW_DIRECTIVES
  ],
  providers: [
    /// additional services
common.backendServicesService,
    common.NavigationService,
    common.NotificationService

  ]
})
export class SharedModule {}
