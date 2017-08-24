import { Directive, Input, HostListener } from "@angular/core";

import * as utils from "utils/utils";

@Directive({
  selector: "[nsHyperlink]"
})
export class HyperlinkDirective {
  @Input("nsHyperlink") url: string;

  @HostListener("tap") tap() {
    utils.openUrl(this.url);
  }
}