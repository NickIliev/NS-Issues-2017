import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SlidesComponent } from "./imageSlides/imageSlides.component";
import { SlideComponent } from "./imageSlide/imageSlide.component";

@NgModule({
    imports: [CommonModule],
    exports: [SlideComponent, SlidesComponent],
    declarations: [SlidesComponent, SlideComponent],
    providers: [],
      schemas: [NO_ERRORS_SCHEMA]
})
export class ImageSlidesModule { }
