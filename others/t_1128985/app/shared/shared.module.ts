import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { IfAndroidDirective, IfIosDirective } from "./utils/if-platform-directives";
import { IfTurnOffDirective } from "./utils/if-turnOff-directives";
import { TabComponent } from "../shared/tab/tab.component";
import { MenuComponent } from "../shared/menu/menu.component";
import { HeaderComponent } from "../shared/header/header.component";
import { CommonModule } from "@angular/common";
import { DrawerService } from "./services/drawer.service";
import { FormatDecimal } from "./utils/FormatDecimal.pipe";
import { SlidesModule } from "../shared/slider/slide.module";
import { ImageSlidesModule } from "../shared/imageSlider/imageSlide.module";
import { RestrictedAccessComponent } from "./restrictedAccess/restrictedAccess.component";
import { SideMenuComponent } from "./sideMenu/sideMenu.component";
import { ClaimStatus } from "../shared/utils/ClaimStatus.pipe";
import { GuideEducationPromoComponent } from "./guideEducationPromo/guideEducationPromo.component";
import { HomeService } from "../pages/home/home.service";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        CommonModule,
        SlidesModule,
        ImageSlidesModule
    ],
    exports: [
        CommonModule,
        TabComponent,
        MenuComponent,
        HeaderComponent,
        SideMenuComponent,
        FormatDecimal,
        IfAndroidDirective,
        IfTurnOffDirective,
        IfIosDirective,
        SlidesModule,
        ImageSlidesModule,
        RestrictedAccessComponent,
        ClaimStatus,
        GuideEducationPromoComponent
    ],
    declarations: [
        TabComponent,
        MenuComponent,
        HeaderComponent,
        SideMenuComponent,
        FormatDecimal,
        IfAndroidDirective,
        IfIosDirective,
        RestrictedAccessComponent,
        IfTurnOffDirective,
        ClaimStatus,
        GuideEducationPromoComponent

    ],
       providers: [HomeService],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [RestrictedAccessComponent,
        GuideEducationPromoComponent]
})
export class SharedModule { }