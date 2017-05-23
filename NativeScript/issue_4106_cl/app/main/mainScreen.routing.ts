import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainScreen } from "./mainScreen.component";
import { AllChatUser } from "./chatlist/allChatUser.component";
import { AuthGuard } from "../auth-guard.service";

const mainMenuRoutes: Routes = [

  {
    path: "main-menu",
    component: MainScreen,
    canActivate: [AuthGuard]
  },
  {
    path: "gr-all-chat-list",
    component: AllChatUser,
    canActivate: [AuthGuard]
  },


];

export const mainMenuRouting: ModuleWithProviders = RouterModule.forChild(mainMenuRoutes);


