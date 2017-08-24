import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { RecordingComponent } from './recording/recording.component';
import { RecordingsComponent } from './recordings/recordings.component';

import { MainComponent } from './main/main.component';
import { SettingsService } from './settings.service';
import { RecordingsService } from './recordings/recordings.service';

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],

    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,

        AppRoutingModule
    ],

    declarations: [
        AppComponent,
        MainComponent,
        RecordingComponent,
        RecordingsComponent,

        ItemsComponent,
        ItemDetailComponent
    ],

    providers: [
        ItemService,
        SettingsService,
        RecordingsService
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
    
}
