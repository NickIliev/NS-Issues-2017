import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabMenuComponent } from "./tabstrip.component";

import * as common from "../shared";
import * as shared from "../../shared";

const tabMenuRoutes: Routes = [
  {
    path: "nav",
    component: TabMenuComponent,
    children: [...common.ROUTES]
  }
];

export const tabMenuRouting: ModuleWithProviders = RouterModule.forChild(tabMenuRoutes);
