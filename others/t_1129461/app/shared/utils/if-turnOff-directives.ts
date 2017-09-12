import { Directive, Input } from "@angular/core";
import { TemplateRef, ViewContainerRef } from "@angular/core";
import { Globals } from "../global";
@Directive({ selector: "[mbIfTurnOff]" })
export class IfTurnOffDirective {
    constructor(private global: Globals, private templateRef: TemplateRef<any>, private container: ViewContainerRef) {
    }

    @Input() set mbIfTurnOff(condition: boolean) {
        if (!this.global.isTurnOff) {
            this.container.createEmbeddedView(this.templateRef);
        } else {
            this.container.clear();
        }
    }
}