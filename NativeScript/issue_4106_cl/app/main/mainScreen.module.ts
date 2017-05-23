import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { mainMenuRouting } from "./mainScreen.routing";
import { MainScreen } from "./mainScreen.component";

import { AuthGuard } from "../auth-guard.service";
import { AllChatUser } from "./chatlist/allChatUser.component";
import { PrivateChatUser } from "./chatlist/privateChatUser.component";

import { HomeScreenList } from "./homelist/homeScreenList.component";
import { AllContacts } from "./chatlist/allContacts.component";
import { GroupChatUser } from "./chatlist/groupChatUser.component";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        mainMenuRouting,
        TranslateModule.forChild()
    ],
    declarations: [
        MainScreen,

        AllChatUser,
        PrivateChatUser,

        HomeScreenList,
        AllContacts,
        GroupChatUser
    ]

})

export class MainMenuModule { }

