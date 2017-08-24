import { Directive, ViewContainerRef, TemplateRef, Inject } from "@angular/core";
import { Device, platformNames } from "platform";
import { DEVICE } from "nativescript-angular/platform-providers";

@Directive({ selector: "[nsIfAndroid]" })
export class IfAndroidDirective {
  constructor(@Inject(DEVICE) device: Device, container: ViewContainerRef, templateRef: TemplateRef<Object>) {
    if (device.os === platformNames.android) {
      container.createEmbeddedView(templateRef);
    }
  }
}

@Directive({ selector: "[nsIfIos]" })
export class IfIosDirective {
  constructor(@Inject(DEVICE) device: Device, container: ViewContainerRef, templateRef: TemplateRef<Object>) {
    if (device.os === platformNames.ios) {
      container.createEmbeddedView(templateRef);
    }
  }
}
