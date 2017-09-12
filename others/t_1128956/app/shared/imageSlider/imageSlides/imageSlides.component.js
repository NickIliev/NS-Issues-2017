"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var imageSlide_component_1 = require("../imageSlide/imageSlide.component");
var gestures = require("ui/gestures");
var platform = require("platform");
var AnimationModule = require("ui/animation");
var enums_1 = require("ui/enums");
var app = require("application");
var absolute_layout_1 = require("ui/layouts/absolute-layout");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var appSettings = require("application-settings");
var drawer_service_1 = require("../../services/drawer.service");
var global_1 = require("../../global");
var direction;
(function (direction) {
    direction[direction["none"] = 0] = "none";
    direction[direction["left"] = 1] = "left";
    direction[direction["right"] = 2] = "right";
})(direction || (direction = {}));
var cancellationReason;
(function (cancellationReason) {
    cancellationReason[cancellationReason["user"] = 0] = "user";
    cancellationReason[cancellationReason["noPrevSlides"] = 1] = "noPrevSlides";
    cancellationReason[cancellationReason["noMoreSlides"] = 2] = "noMoreSlides";
})(cancellationReason || (cancellationReason = {}));
var SlidesComponent = (function () {
    function SlidesComponent(ref, page, params, drawer, _globals) {
        this.ref = ref;
        this.page = page;
        this.params = params;
        this.drawer = drawer;
        this._globals = _globals;
        this.direction = direction.none;
        this.cardsslider = false;
        this.indicators = [];
        this.cardsslider = this._globals.iscardslider;
    }
    Object.defineProperty(SlidesComponent.prototype, "hasNext", {
        get: function () {
            return !!this.currentSlide && !!this.currentSlide.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlidesComponent.prototype, "hasPrevious", {
        get: function () {
            return !!this.currentSlide && !!this.currentSlide.left;
        },
        enumerable: true,
        configurable: true
    });
    SlidesComponent.prototype.ngOnInit = function () {
        this.loop = this.loop ? this.loop : false;
        this.pageIndicators = this.pageIndicators ? this.pageIndicators : false;
        this.pageWidth = this.pageWidth ? this.pageWidth : platform.screen.mainScreen.widthDIPs;
        this.pageHeight = this.pageHeight ? this.pageHeight : platform.screen.mainScreen.heightDIPs;
    };
    SlidesComponent.prototype.skipPopUp = function () {
        this.params.closeCallback();
        appSettings.setBoolean("isFirstInstallPopup", false);
        this.drawer.enableGesture(true);
    };
    SlidesComponent.prototype.ngAfterViewInit = function () {
        // loop through slides and setup height and widith
        var _this = this;
        this.slides.forEach(function (slide) {
            absolute_layout_1.AbsoluteLayout.setLeft(slide.layout, _this.pageWidth);
            // slide.slideWidth = this.pageWidth;
            // slide.slideWidth = "100%";
            // slide.slideHeight = "120";
            // slide.slideHeight = this.pageHeight;
        });
        this.currentSlide = this.buildSlideMap(this.slides.toArray());
        if (this.pageIndicators) {
            this.buildFooter(this.slides.length);
        }
        this.setActivePageIndicator(0);
        if (this.currentSlide) {
            this.positionSlides(this.currentSlide);
            this.applySwipe(this.pageWidth);
        }
        if (this._globals.iscardSecondSlider && this._globals.iscardslider) {
            // this.GoToSlide(1);
            this.setupPanel(this.currentSlide.right);
        }
    };
    // footer stuff
    SlidesComponent.prototype.buildFooter = function (pageCount) {
        if (pageCount === void 0) { pageCount = 5; }
        var index = 0;
        while (index < pageCount) {
            this.indicators.push({ active: false });
            index++;
        }
    };
    SlidesComponent.prototype.setActivePageIndicator = function (activeIndex) {
        this.indicators.map(function (indicator, index) {
            if (index === activeIndex) {
                indicator.active = true;
            }
            else {
                indicator.active = false;
            }
        });
        this.indicators = this.indicators.slice();
        this.ref.detectChanges();
    };
    // private  functions
    SlidesComponent.prototype.setupPanel = function (slide) {
        this.direction = direction.none;
        this.transitioning = false;
        this.currentSlide.slide.layout.off("pan");
        this.currentSlide = slide;
        // sets up each slide so that they are positioned to transition either way.
        this.positionSlides(this.currentSlide);
        // if (this.disablePan === false) {
        this.applySwipe(this.pageWidth);
        // }
        this.setActivePageIndicator(this.currentSlide.index);
    };
    SlidesComponent.prototype.positionSlides = function (slide) {
        // sets up each slide so that they are positioned to transition either way.
        if (slide.left != null && slide.left.slide != null) {
            slide.left.slide.layout.translateX = -this.pageWidth * 2;
        }
        slide.slide.layout.translateX = -this.pageWidth;
        if (slide.right != null && slide.right.slide != null) {
            slide.right.slide.layout.translateX = 0;
        }
    };
    SlidesComponent.prototype.showRightSlide = function (slideMap, offset, endingVelocity, duration) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 2; }
        if (duration === void 0) { duration = 200; }
        var animationDuration;
        animationDuration = duration; // default value
        var transition = new Array();
        transition.push({
            target: slideMap.right.slide.layout,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: slideMap.slide.layout,
            translate: { x: -this.pageWidth * 2, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlidesComponent.prototype.showLeftSlide = function (slideMap, offset, endingVelocity, duration) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 2; }
        if (duration === void 0) { duration = 200; }
        var animationDuration;
        animationDuration = duration; // default value
        var transition = new Array();
        transition.push({
            target: slideMap.left.slide.layout,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: slideMap.slide.layout,
            translate: { x: 0, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlidesComponent.prototype.onPan = function (args) {
        console.dir(args);
    };
    SlidesComponent.prototype.applySwipe = function (pageWidth) {
        var _this = this;
        var previousDelta = -1; // hack to get around ios firing pan event after release
        var endingVelocity = 0;
        var startTime, deltaTime;
        this.currentSlide.slide.layout.on(gestures.GestureTypes.pan, function (args) {
            if (args.state === gestures.GestureStateTypes.began) {
                startTime = Date.now();
                previousDelta = 0;
                endingVelocity = 250;
                // this.triggerStartEvent();
            }
            else if (args.state === gestures.GestureStateTypes.ended) {
                deltaTime = Date.now() - startTime;
                // if velocityScrolling is enabled then calculate the velocitty
                // swiping left to right.
                if (args.deltaX > (pageWidth / 8)) {
                    if (_this.hasPrevious) {
                        _this.transitioning = true;
                        _this.showLeftSlide(_this.currentSlide, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentSlide.left);
                            // this.triggerChangeEventLeftToRight();
                        });
                    }
                    else {
                        // We're at the start
                        // Notify no more slides
                        // this.triggerCancelEvent(cancellationReason.noPrevSlides);
                    }
                    return;
                }
                else if (args.deltaX < (-pageWidth / 8)) {
                    if (_this.hasNext) {
                        _this.transitioning = true;
                        _this.showRightSlide(_this.currentSlide, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentSlide.right);
                            // Notify changed
                            // this.triggerChangeEventRightToLeft();
                            if (!_this.hasNext) {
                                // Notify finsihed
                                // this.notify({
                                // eventName: SlideContainer.FINISHED_EVENT,
                                // object: this
                                // });
                            }
                        });
                    }
                    else {
                        // We're at the end
                        // Notify no more slides
                        // this.triggerCancelEvent(cancellationReason.noMoreSlides);
                    }
                    return;
                }
                if ((_this.transitioning === false) || (args.state === 3)) {
                    // Notify cancelled
                    // this.triggerCancelEvent(cancellationReason.user);
                    _this.transitioning = true;
                    _this.currentSlide.slide.layout.animate({
                        translate: { x: -_this.pageWidth, y: 0 },
                        duration: 200,
                        curve: enums_1.AnimationCurve.easeOut
                    });
                    if (_this.hasNext) {
                        _this.currentSlide.right.slide.layout.animate({
                            translate: { x: 0, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentSlide.right.slide.layout.translateX = 0;
                    }
                    if (_this.hasPrevious) {
                        _this.currentSlide.left.slide.layout.animate({
                            translate: { x: -_this.pageWidth * 2, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentSlide.left.slide.layout.translateX = -_this.pageWidth;
                    }
                    if (app.ios)
                        _this.currentSlide.slide.layout.translateX = -_this.pageWidth;
                    _this.transitioning = false;
                }
            }
            else {
                if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX < 0) {
                    if (_this.hasNext) {
                        _this.direction = direction.left;
                        _this.currentSlide.slide.layout.translateX = args.deltaX - _this.pageWidth;
                        _this.currentSlide.right.slide.layout.translateX = args.deltaX;
                    }
                }
                else if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX > 0) {
                    if (_this.hasPrevious) {
                        _this.direction = direction.right;
                        _this.currentSlide.slide.layout.translateX = args.deltaX - _this.pageWidth;
                        _this.currentSlide.left.slide.layout.translateX = -(_this.pageWidth * 2) + args.deltaX;
                    }
                }
                if (args.deltaX !== 0) {
                    previousDelta = args.deltaX;
                }
            }
        });
    };
    SlidesComponent.prototype.buildSlideMap = function (slides) {
        var _this = this;
        this._slideMap = [];
        slides.forEach(function (slide, index) {
            _this._slideMap.push({
                slide: slide,
                index: index,
            });
        });
        this._slideMap.forEach(function (mapping, index) {
            if (_this._slideMap[index - 1] != null)
                mapping.left = _this._slideMap[index - 1];
            if (_this._slideMap[index + 1] != null)
                mapping.right = _this._slideMap[index + 1];
        });
        if (this.loop) {
            this._slideMap[0].left = this._slideMap[this._slideMap.length - 1];
            this._slideMap[this._slideMap.length - 1].right = this._slideMap[0];
        }
        return this._slideMap[0];
    };
    SlidesComponent.prototype.GoToSlide = function (num, traverseDuration, landingDuration) {
        var _this = this;
        if (traverseDuration === void 0) { traverseDuration = 50; }
        if (landingDuration === void 0) { landingDuration = 200; }
        if (this.currentSlide.index === num)
            return;
        var duration = landingDuration;
        if (Math.abs(num - this.currentSlide.index) !== 1) {
            duration = traverseDuration;
        }
        if (this.currentSlide.index < num)
            this.nextSlide(duration).then(function () { return _this.GoToSlide(num); });
        else
            this.previousSlide(duration).then(function () { return _this.GoToSlide(num); });
    };
    SlidesComponent.prototype.nextSlide = function (duration) {
        var _this = this;
        if (!this.hasNext) {
            // this.triggerCancelEvent(cancellationReason.noMoreSlides);
            return;
        }
        this.direction = direction.left;
        this.transitioning = true;
        // this.triggerStartEvent();
        return this.showRightSlide(this.currentSlide, null, null, duration).then(function () {
            _this.setupPanel(_this.currentSlide.right);
            // this.triggerChangeEventRightToLeft();
        });
    };
    SlidesComponent.prototype.previousSlide = function (duration) {
        var _this = this;
        if (!this.hasPrevious) {
            // this.triggerCancelEvent(cancellationReason.noPrevSlides);
            return;
        }
        this.direction = direction.right;
        this.transitioning = true;
        // this.triggerStartEvent();
        return this.showLeftSlide(this.currentSlide, null, null, duration).then(function () {
            _this.setupPanel(_this.currentSlide.left);
            // this.triggerChangeEventLeftToRight();
        });
    };
    return SlidesComponent;
}());
__decorate([
    core_1.ContentChildren(core_1.forwardRef(function () { return imageSlide_component_1.SlideComponent; })),
    __metadata("design:type", core_1.QueryList)
], SlidesComponent.prototype, "slides", void 0);
__decorate([
    core_1.Input("pageWidth"),
    __metadata("design:type", Number)
], SlidesComponent.prototype, "pageWidth", void 0);
__decorate([
    core_1.Input("pageHeight"),
    __metadata("design:type", Number)
], SlidesComponent.prototype, "pageHeight", void 0);
__decorate([
    core_1.Input("loop"),
    __metadata("design:type", Boolean)
], SlidesComponent.prototype, "loop", void 0);
__decorate([
    core_1.Input("pageIndicators"),
    __metadata("design:type", Boolean)
], SlidesComponent.prototype, "pageIndicators", void 0);
SlidesComponent = __decorate([
    core_1.Component({
        selector: "mb-image-slides",
        template: "\n        <GridLayout rows=\"*\" column=\"*\">\n            <AbsoluteLayout row=\"0\" col=\"0\" verticalAlignment=\"middle\" horizontalAlignment=\"center\">\n                <ng-content></ng-content>\n            </AbsoluteLayout>\n            <GridLayout *ngIf=\"!cardsslider\" row=\"0\" colspan=\"3\" verticalAlignment=\"bottom\" class=\"imageSlider\" rows=\"16, 120\" col=\"0\" width=\"100%\" height=\"75\">\n                <StackLayout row=\"0\" col=\"0\" verticalAlignment=\"bottom\" orientation=\"horizontal\" horizontalAlignment=\"center\">\n                    <StackLayout *ngFor=\"let indicator of indicators; let i = index\">\n                        <Image width=\"16\" height=\"16\" style.marginRight=\"10\" *ngIf=\"indicator.active\" src=\"~/images/icon/indicator_blue_active.png\"></Image>\n                        <Image width=\"16\" height=\"16\" style.marginRight=\"10\" *ngIf=\"!indicator.active\" src=\"~/images/icon/indicator_blue_deactive.png\" (tap)=GoToSlide(i);></Image>\n                    </StackLayout>\n                </StackLayout>\n\n            </GridLayout>\n             <GridLayout *ngIf=\"cardsslider\" row=\"0\" colspan=\"3\" verticalAlignment=\"bottom\" class=\"imageSlider\" rows=\"20\" col=\"0\" width=\"100%\" height=\"40\">\n                <StackLayout row=\"0\" col=\"0\" verticalAlignment=\"bottom\" orientation=\"horizontal\" horizontalAlignment=\"center\">\n                    <StackLayout *ngFor=\"let indicator of indicators; let i = index\">\n                        <Image width=\"16\" height=\"16\" style.marginRight=\"10\" *ngIf=\"indicator.active\" src=\"~/images/icon/indicator_blue_active.png\"></Image>\n                        <Image width=\"16\" height=\"16\" style.marginRight=\"10\" *ngIf=\"!indicator.active\" src=\"~/images/icon/indicator_blue_deactive.png\" (tap)=GoToSlide(i);></Image>\n                    </StackLayout>\n                </StackLayout>                \n\n            </GridLayout>\n        </GridLayout>\n    ",
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        page_1.Page,
        dialogs_1.ModalDialogParams,
        drawer_service_1.DrawerService,
        global_1.Globals])
], SlidesComponent);
exports.SlidesComponent = SlidesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VTbGlkZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZLO0FBRTdLLDJFQUFvRTtBQUNwRSxzQ0FBd0M7QUFDeEMsbUNBQXFDO0FBQ3JDLDhDQUFnRDtBQUNoRCxrQ0FBdUQ7QUFDdkQsaUNBQW1DO0FBQ25DLDhEQUE0RDtBQUk1RCxnQ0FBK0I7QUFDL0IsbUVBQTRFO0FBQzVFLGtEQUFvRDtBQUNwRCxnRUFBOEQ7QUFDOUQsdUNBQXVDO0FBWXZDLElBQUssU0FJSjtBQUpELFdBQUssU0FBUztJQUNWLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0lBQ0osMkNBQUssQ0FBQTtBQUNULENBQUMsRUFKSSxTQUFTLEtBQVQsU0FBUyxRQUliO0FBRUQsSUFBSyxrQkFJSjtBQUpELFdBQUssa0JBQWtCO0lBQ25CLDJEQUFJLENBQUE7SUFDSiwyRUFBWSxDQUFBO0lBQ1osMkVBQVksQ0FBQTtBQUNoQixDQUFDLEVBSkksa0JBQWtCLEtBQWxCLGtCQUFrQixRQUl0QjtBQWdDRCxJQUFhLGVBQWU7SUFzQnhCLHlCQUFvQixHQUFzQixFQUMvQixJQUFVLEVBQ1QsTUFBeUIsRUFDekIsTUFBcUIsRUFDdEIsUUFBaUI7UUFKUixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1QsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBakJwQixjQUFTLEdBQWMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN2QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQWlCaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FB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VSxDQUFDLGNBQU0sT0FBQSxxQ0FBYyxFQUFkLENBQWMsQ0FBQyxDQUFDOzhCQUFTLGdCQUFTOytDQUFpQjtBQUdqRTtJQUFuQixZQUFLLENBQUMsV0FBVyxDQUFDOztrREFBbUI7QUFDakI7SUFBcEIsWUFBSyxDQUFDLFlBQVksQ0FBQzs7bURBQW9CO0FBQ3pCO0lBQWQsWUFBSyxDQUFDLE1BQU0sQ0FBQzs7NkNBQWU7QUFDSjtJQUF4QixZQUFLLENBQUMsZ0JBQWdCLENBQUM7O3VEQUF5QjtBQVB4QyxlQUFlO0lBOUIzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsODhEQXdCVDtRQUNELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO0tBQ3hDLENBQUM7cUNBd0IyQix3QkFBaUI7UUFDekIsV0FBSTtRQUNELDJCQUFpQjtRQUNqQiw4QkFBYTtRQUNaLGdCQUFPO0dBMUJuQixlQUFlLENBNFczQjtBQTVXWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgR2VzdHVyZVR5cGVzLCBQYW5HZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL2ltYWdlU2xpZGUvaW1hZ2VTbGlkZS5jb21wb25lbnRcIjtcclxuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgKiBhcyBBbmltYXRpb25Nb2R1bGUgZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSwgT3JpZW50YXRpb24gfSBmcm9tIFwidWkvZW51bXNcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uL2dsb2JhbFwiO1xyXG5leHBvcnQgaW50ZXJmYWNlIElJbmRpY2F0b3JzIHtcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2xpZGVNYXAge1xyXG4gICAgc2xpZGU6IFNsaWRlQ29tcG9uZW50O1xyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIGxlZnQ/OiBJU2xpZGVNYXA7XHJcbiAgICByaWdodD86IElTbGlkZU1hcDtcclxufVxyXG5cclxuZW51bSBkaXJlY3Rpb24ge1xyXG4gICAgbm9uZSxcclxuICAgIGxlZnQsXHJcbiAgICByaWdodFxyXG59XHJcblxyXG5lbnVtIGNhbmNlbGxhdGlvblJlYXNvbiB7XHJcbiAgICB1c2VyLFxyXG4gICAgbm9QcmV2U2xpZGVzLFxyXG4gICAgbm9Nb3JlU2xpZGVzXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWItaW1hZ2Utc2xpZGVzXCIsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxHcmlkTGF5b3V0IHJvd3M9XCIqXCIgY29sdW1uPVwiKlwiPlxyXG4gICAgICAgICAgICA8QWJzb2x1dGVMYXlvdXQgcm93PVwiMFwiIGNvbD1cIjBcIiB2ZXJ0aWNhbEFsaWdubWVudD1cIm1pZGRsZVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9BYnNvbHV0ZUxheW91dD5cclxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgKm5nSWY9XCIhY2FyZHNzbGlkZXJcIiByb3c9XCIwXCIgY29sc3Bhbj1cIjNcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImJvdHRvbVwiIGNsYXNzPVwiaW1hZ2VTbGlkZXJcIiByb3dzPVwiMTYsIDEyMFwiIGNvbD1cIjBcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCI3NVwiPlxyXG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjBcIiBjb2w9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0ICpuZ0Zvcj1cImxldCBpbmRpY2F0b3Igb2YgaW5kaWNhdG9yczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIxMFwiICpuZ0lmPVwiaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfYWN0aXZlLnBuZ1wiPjwvSW1hZ2U+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCIhaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfZGVhY3RpdmUucG5nXCIgKHRhcCk9R29Ub1NsaWRlKGkpOz48L0ltYWdlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxyXG5cclxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxyXG4gICAgICAgICAgICAgPEdyaWRMYXlvdXQgKm5nSWY9XCJjYXJkc3NsaWRlclwiIHJvdz1cIjBcIiBjb2xzcGFuPVwiM1wiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgY2xhc3M9XCJpbWFnZVNsaWRlclwiIHJvd3M9XCIyMFwiIGNvbD1cIjBcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCI0MFwiPlxyXG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjBcIiBjb2w9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0ICpuZ0Zvcj1cImxldCBpbmRpY2F0b3Igb2YgaW5kaWNhdG9yczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIxMFwiICpuZ0lmPVwiaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfYWN0aXZlLnBuZ1wiPjwvSW1hZ2U+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCIhaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfZGVhY3RpdmUucG5nXCIgKHRhcCk9R29Ub1NsaWRlKGkpOz48L0ltYWdlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cclxuICAgICAgICA8L0dyaWRMYXlvdXQ+XHJcbiAgICBgLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gU2xpZGVDb21wb25lbnQpKSBzbGlkZXM6IFF1ZXJ5TGlzdDxTbGlkZUNvbXBvbmVudD47XHJcblxyXG4gICAgLy8gQFZpZXdDaGlsZChcImZvb3RlclwiKSBmb290ZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBASW5wdXQoXCJwYWdlV2lkdGhcIikgcGFnZVdpZHRoOiBudW1iZXI7XHJcbiAgICBASW5wdXQoXCJwYWdlSGVpZ2h0XCIpIHBhZ2VIZWlnaHQ6IG51bWJlcjtcclxuICAgIEBJbnB1dChcImxvb3BcIikgbG9vcDogYm9vbGVhbjtcclxuICAgIEBJbnB1dChcInBhZ2VJbmRpY2F0b3JzXCIpIHBhZ2VJbmRpY2F0b3JzOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb246IGRpcmVjdGlvbiA9IGRpcmVjdGlvbi5ub25lO1xyXG4gICAgcHVibGljIGNhcmRzc2xpZGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpbmRpY2F0b3JzOiBJSW5kaWNhdG9yc1tdO1xyXG4gICAgY3VycmVudFNsaWRlOiBJU2xpZGVNYXA7XHJcbiAgICBfc2xpZGVNYXA6IElTbGlkZU1hcFtdO1xyXG5cclxuICAgIGdldCBoYXNOZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuY3VycmVudFNsaWRlICYmICEhdGhpcy5jdXJyZW50U2xpZGUucmlnaHQ7XHJcbiAgICB9XHJcbiAgICBnZXQgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50U2xpZGUgJiYgISF0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwdWJsaWMgcGFnZTogUGFnZSxcclxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXHJcbiAgICAgICAgcHJpdmF0ZSBkcmF3ZXI6IERyYXdlclNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XHJcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JzID0gW107XHJcbiAgICAgICAgdGhpcy5jYXJkc3NsaWRlciA9IHRoaXMuX2dsb2JhbHMuaXNjYXJkc2xpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcCA/IHRoaXMubG9vcCA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZUluZGljYXRvcnMgPSB0aGlzLnBhZ2VJbmRpY2F0b3JzID8gdGhpcy5wYWdlSW5kaWNhdG9ycyA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZVdpZHRoID0gdGhpcy5wYWdlV2lkdGggPyB0aGlzLnBhZ2VXaWR0aCA6IHBsYXRmb3JtLnNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcclxuICAgICAgICB0aGlzLnBhZ2VIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQgPyB0aGlzLnBhZ2VIZWlnaHQgOiBwbGF0Zm9ybS5zY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xyXG4gICAgfVxyXG5cclxuICAgIHNraXBQb3BVcCgpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsUG9wdXBcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmVuYWJsZUdlc3R1cmUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBzbGlkZXMgYW5kIHNldHVwIGhlaWdodCBhbmQgd2lkaXRoXHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgQWJzb2x1dGVMYXlvdXQuc2V0TGVmdChzbGlkZS5sYXlvdXQsIHRoaXMucGFnZVdpZHRoKTtcclxuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVXaWR0aCA9IHRoaXMucGFnZVdpZHRoO1xyXG4gICAgICAgICAgICAvLyBzbGlkZS5zbGlkZVdpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICAgIC8vIHNsaWRlLnNsaWRlSGVpZ2h0ID0gXCIxMjBcIjtcclxuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLmJ1aWxkU2xpZGVNYXAodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZUluZGljYXRvcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZEZvb3Rlcih0aGlzLnNsaWRlcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVQYWdlSW5kaWNhdG9yKDApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblNsaWRlcyh0aGlzLmN1cnJlbnRTbGlkZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTd2lwZSh0aGlzLnBhZ2VXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc2NhcmRTZWNvbmRTbGlkZXIgJiYgdGhpcy5fZ2xvYmFscy5pc2NhcmRzbGlkZXIpIHtcclxuICAgICAgICAgICAvLyB0aGlzLkdvVG9TbGlkZSgxKTtcclxuICAgICAgICAgIHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRTbGlkZS5yaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvb3RlciBzdHVmZlxyXG4gICAgcHJpdmF0ZSBidWlsZEZvb3RlcihwYWdlQ291bnQ6IG51bWJlciA9IDUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGljYXRvcnMucHVzaCh7IGFjdGl2ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IoYWN0aXZlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaW5kaWNhdG9ycy5tYXAoKGluZGljYXRvcjogSUluZGljYXRvcnMsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JzID0gWy4uLnRoaXMuaW5kaWNhdG9yc107XHJcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgIGZ1bmN0aW9uc1xyXG4gICAgcHJpdmF0ZSBzZXR1cFBhbmVsKHNsaWRlOiBJU2xpZGVNYXApIHtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5ub25lO1xyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC5vZmYoXCJwYW5cIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSBzbGlkZTtcclxuXHJcbiAgICAgICAgLy8gc2V0cyB1cCBlYWNoIHNsaWRlIHNvIHRoYXQgdGhleSBhcmUgcG9zaXRpb25lZCB0byB0cmFuc2l0aW9uIGVpdGhlciB3YXkuXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvblNsaWRlcyh0aGlzLmN1cnJlbnRTbGlkZSk7XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLmRpc2FibGVQYW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseVN3aXBlKHRoaXMucGFnZVdpZHRoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IodGhpcy5jdXJyZW50U2xpZGUuaW5kZXgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvc2l0aW9uU2xpZGVzKHNsaWRlOiBJU2xpZGVNYXApIHtcclxuICAgICAgICAvLyBzZXRzIHVwIGVhY2ggc2xpZGUgc28gdGhhdCB0aGV5IGFyZSBwb3NpdGlvbmVkIHRvIHRyYW5zaXRpb24gZWl0aGVyIHdheS5cclxuICAgICAgICBpZiAoc2xpZGUubGVmdCAhPSBudWxsICYmIHNsaWRlLmxlZnQuc2xpZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzbGlkZS5sZWZ0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XHJcbiAgICAgICAgaWYgKHNsaWRlLnJpZ2h0ICE9IG51bGwgJiYgc2xpZGUucmlnaHQuc2xpZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1JpZ2h0U2xpZGUoc2xpZGVNYXA6IElTbGlkZU1hcCwgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLnBhZ2VXaWR0aCwgZW5kaW5nVmVsb2NpdHk6IG51bWJlciA9IDIsIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjsgLy8gZGVmYXVsdCB2YWx1ZVxyXG5cclxuICAgICAgICBsZXQgdHJhbnNpdGlvbiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICB0cmFuc2l0aW9uLnB1c2goe1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHNsaWRlTWFwLnJpZ2h0LnNsaWRlLmxheW91dCxcclxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXHJcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHJhbnNpdGlvbi5wdXNoKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBzbGlkZU1hcC5zbGlkZS5sYXlvdXQsXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcclxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uU2V0ID0gbmV3IEFuaW1hdGlvbk1vZHVsZS5BbmltYXRpb24odHJhbnNpdGlvbiwgZmFsc2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uU2V0LnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dMZWZ0U2xpZGUoc2xpZGVNYXA6IElTbGlkZU1hcCwgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLnBhZ2VXaWR0aCwgZW5kaW5nVmVsb2NpdHk6IG51bWJlciA9IDIsIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XHJcblxyXG4gICAgICAgIGxldCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gZHVyYXRpb247IC8vIGRlZmF1bHQgdmFsdWVcclxuICAgICAgICBsZXQgdHJhbnNpdGlvbiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICB0cmFuc2l0aW9uLnB1c2goe1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHNsaWRlTWFwLmxlZnQuc2xpZGUubGF5b3V0LFxyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogLXRoaXMucGFnZVdpZHRoLCB5OiAwIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcclxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cmFuc2l0aW9uLnB1c2goe1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHNsaWRlTWFwLnNsaWRlLmxheW91dCxcclxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgICAgZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25TZXQgPSBuZXcgQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvbih0cmFuc2l0aW9uLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhbmltYXRpb25TZXQucGxheSgpO1xyXG5cclxuICAgIH1cclxuICAgIG9uUGFuKGFyZ3M6IFBhbkdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmRpcihhcmdzKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhcHBseVN3aXBlKHBhZ2VXaWR0aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzRGVsdGEgPSAtMTsgLy8gaGFjayB0byBnZXQgYXJvdW5kIGlvcyBmaXJpbmcgcGFuIGV2ZW50IGFmdGVyIHJlbGVhc2VcclxuICAgICAgICBsZXQgZW5kaW5nVmVsb2NpdHkgPSAwO1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUsIGRlbHRhVGltZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0Lm9uKGdlc3R1cmVzLkdlc3R1cmVUeXBlcy5wYW4sIChhcmdzOiBQYW5HZXN0dXJlRXZlbnREYXRhKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLnN0YXRlID09PSBnZXN0dXJlcy5HZXN0dXJlU3RhdGVUeXBlcy5iZWdhbikge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzRGVsdGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgZW5kaW5nVmVsb2NpdHkgPSAyNTA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3Muc3RhdGUgPT09IGdlc3R1cmVzLkdlc3R1cmVTdGF0ZVR5cGVzLmVuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBkZWx0YVRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdmVsb2NpdHlTY3JvbGxpbmcgaXMgZW5hYmxlZCB0aGVuIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHR5XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3dpcGluZyBsZWZ0IHRvIHJpZ2h0LlxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVsdGFYID4gKHBhZ2VXaWR0aCAvIDgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJldmlvdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBhcmdzLmRlbHRhWCwgZW5kaW5nVmVsb2NpdHkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLmxlZnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNoYW5nZUV2ZW50TGVmdFRvUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UncmUgYXQgdGhlIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBubyBtb3JlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDYW5jZWxFdmVudChjYW5jZWxsYXRpb25SZWFzb24ubm9QcmV2U2xpZGVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc3dpcGluZyByaWdodCB0byBsZWZ0XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRlbHRhWCA8ICgtcGFnZVdpZHRoIC8gOCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JpZ2h0U2xpZGUodGhpcy5jdXJyZW50U2xpZGUsIGFyZ3MuZGVsdGFYLCBlbmRpbmdWZWxvY2l0eSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50U2xpZGUucmlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDaGFuZ2VFdmVudFJpZ2h0VG9MZWZ0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc05leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgZmluc2loZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnROYW1lOiBTbGlkZUNvbnRhaW5lci5GSU5JU0hFRF9FVkVOVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UncmUgYXQgdGhlIGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgbm8gbW9yZSBzbGlkZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyQ2FuY2VsRXZlbnQoY2FuY2VsbGF0aW9uUmVhc29uLm5vTW9yZVNsaWRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMudHJhbnNpdGlvbmluZyA9PT0gZmFsc2UpIHx8IChhcmdzLnN0YXRlID09PSAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBjYW5jZWxsZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDYW5jZWxFdmVudChjYW5jZWxsYXRpb25SZWFzb24udXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0LnNsaWRlLmxheW91dC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHAuaW9zKSAvLyBmb3Igc29tZSByZWFzb24gaSBoYXZlIHRvIHNldCB0aGVzZSBpbiBpb3Mgb3IgdGhlcmUgaXMgc29tZSBzb3J0IG9mIGJvdW5jZSBiYWNrLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUucmlnaHQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNQcmV2aW91cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0LnNsaWRlLmxheW91dC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHAuaW9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUubGVmdC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IC10aGlzLnBhZ2VXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHAuaW9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IC10aGlzLnBhZ2VXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudHJhbnNpdGlvbmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHByZXZpb3VzRGVsdGEgIT09IGFyZ3MuZGVsdGFYXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgYXJncy5kZWx0YVggIT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGFyZ3MuZGVsdGFYIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gYXJncy5kZWx0YVggLSB0aGlzLnBhZ2VXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUucmlnaHQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSBhcmdzLmRlbHRhWDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmFuc2l0aW9uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgcHJldmlvdXNEZWx0YSAhPT0gYXJncy5kZWx0YVhcclxuICAgICAgICAgICAgICAgICAgICAmJiBhcmdzLmRlbHRhWCAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgYXJncy5kZWx0YVggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IGFyZ3MuZGVsdGFYIC0gdGhpcy5wYWdlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtKHRoaXMucGFnZVdpZHRoICogMikgKyBhcmdzLmRlbHRhWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVsdGFYICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNEZWx0YSA9IGFyZ3MuZGVsdGFYO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRTbGlkZU1hcChzbGlkZXM6IFNsaWRlQ29tcG9uZW50W10pIHtcclxuICAgICAgICB0aGlzLl9zbGlkZU1hcCA9IFtdO1xyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVNYXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzbGlkZTogc2xpZGUsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlTWFwLmZvckVhY2goKG1hcHBpbmc6IElTbGlkZU1hcCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWFwcGluZy5sZWZ0ID0gdGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1hcHBpbmcucmlnaHQgPSB0aGlzLl9zbGlkZU1hcFtpbmRleCArIDFdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sb29wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlTWFwWzBdLmxlZnQgPSB0aGlzLl9zbGlkZU1hcFt0aGlzLl9zbGlkZU1hcC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVNYXBbdGhpcy5fc2xpZGVNYXAubGVuZ3RoIC0gMV0ucmlnaHQgPSB0aGlzLl9zbGlkZU1hcFswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlTWFwWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHb1RvU2xpZGUobnVtOiBudW1iZXIsIHRyYXZlcnNlRHVyYXRpb246IG51bWJlciA9IDUwLCBsYW5kaW5nRHVyYXRpb246IG51bWJlciA9IDIwMCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTbGlkZS5pbmRleCA9PT0gbnVtKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBkdXJhdGlvbjogbnVtYmVyID0gbGFuZGluZ0R1cmF0aW9uO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhudW0gLSB0aGlzLmN1cnJlbnRTbGlkZS5pbmRleCkgIT09IDEpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB0cmF2ZXJzZUR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUuaW5kZXggPCBudW0pXHJcbiAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKGR1cmF0aW9uKS50aGVuKCgpID0+IHRoaXMuR29Ub1NsaWRlKG51bSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1NsaWRlKGR1cmF0aW9uKS50aGVuKCgpID0+IHRoaXMuR29Ub1NsaWRlKG51bSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0U2xpZGUoZHVyYXRpb24/OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5oYXNOZXh0KSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5sZWZ0O1xyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dSaWdodFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBudWxsLCBudWxsLCBkdXJhdGlvbikudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRTbGlkZS5yaWdodCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNoYW5nZUV2ZW50UmlnaHRUb0xlZnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXNTbGlkZShkdXJhdGlvbj86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1ByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub1ByZXZTbGlkZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMudHJpZ2dlclN0YXJ0RXZlbnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBudWxsLCBudWxsLCBkdXJhdGlvbikudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNoYW5nZUV2ZW50TGVmdFRvUmlnaHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=