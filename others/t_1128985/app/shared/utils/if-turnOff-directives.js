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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtdHVybk9mZi1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaWYtdHVybk9mZi1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELHNDQUE4RDtBQUM5RCxvQ0FBb0M7QUFFcEMsSUFBYSxrQkFBa0I7SUFDM0IsNEJBQW9CLE1BQWUsRUFBVSxXQUE2QixFQUFVLFNBQTJCO1FBQTNGLFdBQU0sR0FBTixNQUFNLENBQVM7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUMvRyxDQUFDO0lBRVEsc0JBQUksMkNBQVc7YUFBZixVQUFnQixTQUFrQjtZQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVBZO0lBQVIsWUFBSyxFQUFFOzs7cURBTVA7QUFWUSxrQkFBa0I7SUFEOUIsZ0JBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQztxQ0FFVCxnQkFBTyxFQUF1QixrQkFBVyxFQUEwQix1QkFBZ0I7R0FEdEcsa0JBQWtCLENBVzlCO0FBWFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbFwiO1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiBcIlttYklmVHVybk9mZl1cIiB9KVxuZXhwb3J0IGNsYXNzIElmVHVybk9mZkRpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnbG9iYWw6IEdsb2JhbHMsIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG1iSWZUdXJuT2ZmKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMuZ2xvYmFsLmlzVHVybk9mZikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=