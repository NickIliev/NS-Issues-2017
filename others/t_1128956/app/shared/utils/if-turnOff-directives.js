"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var global_1 = require("../global");
var IfTurnOffDirective = (function () {
    function IfTurnOffDirective(global, templateRef, container) {
        this.global = global;
        this.templateRef = templateRef;
        this.container = container;
    }
    Object.defineProperty(IfTurnOffDirective.prototype, "mbIfTurnOff", {
        set: function (condition) {
            if (!this.global.isTurnOff) {
                this.container.createEmbeddedView(this.templateRef);
            }
            else {
                this.container.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    return IfTurnOffDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], IfTurnOffDirective.prototype, "mbIfTurnOff", null);
IfTurnOffDirective = __decorate([
    core_1.Directive({ selector: "[mbIfTurnOff]" }),
    __metadata("design:paramtypes", [global_1.Globals, core_2.TemplateRef, core_2.ViewContainerRef])
], IfTurnOffDirective);
exports.IfTurnOffDirective = IfTurnOffDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtdHVybk9mZi1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaWYtdHVybk9mZi1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELHNDQUE4RDtBQUM5RCxvQ0FBb0M7QUFFcEMsSUFBYSxrQkFBa0I7SUFDM0IsNEJBQW9CLE1BQWUsRUFBVSxXQUE2QixFQUFVLFNBQTJCO1FBQTNGLFdBQU0sR0FBTixNQUFNLENBQVM7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUMvRyxDQUFDO0lBRVEsc0JBQUksMkNBQVc7YUFBZixVQUFnQixTQUFrQjtZQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVBZO0lBQVIsWUFBSyxFQUFFOzs7cURBTVA7QUFWUSxrQkFBa0I7SUFEOUIsZ0JBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQztxQ0FFVCxnQkFBTyxFQUF1QixrQkFBVyxFQUEwQix1QkFBZ0I7R0FEdEcsa0JBQWtCLENBVzlCO0FBWFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi9nbG9iYWxcIjtcclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiBcIlttYklmVHVybk9mZl1cIiB9KVxyXG5leHBvcnQgY2xhc3MgSWZUdXJuT2ZmRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYmFsOiBHbG9iYWxzLCBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtYklmVHVybk9mZihjb25kaXRpb246IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2xvYmFsLmlzVHVybk9mZikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=