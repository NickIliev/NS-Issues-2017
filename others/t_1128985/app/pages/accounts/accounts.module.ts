import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountsHomeComponent } from "../accounts/accountsHome/accountsHome.component";
import { MyAccountsComponent } from "../accounts/myAccounts/myAccounts.component";
import { AccountService } from "./accounts.service";
import { SharedModule } from "../../shared/shared.module";

export const routerConfig = [
    {
        path: "",
        component: AccountsHomeComponent,
        data: { title: "MyAccounts"}
    },
    {
        path: "home",
        component: AccountsHomeComponent,
        data: { title: "MyAccounts"}
    },
    {
        path: "myAccounts",
        component: MyAccountsComponent,
        data: { title: "MyAccounts"}
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
        AccountsHomeComponent,
        MyAccountsComponent
    ],
    providers: [AccountService]
})

export class AccountsModule {
    constructor() { }
}
