import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SignedHomeComponent } from "./signedHome/signedHome.component";
import { ArticleDetailComponent } from "./articleDetail/articleDetail.component";
import { SharedModule } from "../../shared/shared.module";
import { HomeService } from "./home.service";
import { SlidesModule } from "../../shared/slider/slide.module";
import { AnonymousHomeComponent } from "./anonymousHome/anonymousHome.component";
import { AnalyticsService } from "../../analytics.service"; 
import { AdobeAnalytics } from 'nativescript-adobe-analytics';
export const routerConfig = [
    {
        path: "signedHome",
        component: SignedHomeComponent
    },
    {
        path: "anonymousHome",
        component: AnonymousHomeComponent,
    },
    {
        path: "articleDetail",
        component: ArticleDetailComponent,
        data: { title: "articleDetail" }
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule,
        SlidesModule
    ],
    declarations: [SignedHomeComponent, AnonymousHomeComponent, ArticleDetailComponent],
    providers: [HomeService, AnalyticsService]
})

export class HomeModule {
    constructor() { }
}
