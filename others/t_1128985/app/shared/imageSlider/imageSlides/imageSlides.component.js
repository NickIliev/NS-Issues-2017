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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTbGlkZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VTbGlkZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZLO0FBRTdLLDJFQUFvRTtBQUNwRSxzQ0FBd0M7QUFDeEMsbUNBQXFDO0FBQ3JDLDhDQUFnRDtBQUNoRCxrQ0FBdUQ7QUFDdkQsaUNBQW1DO0FBQ25DLDhEQUE0RDtBQUk1RCxnQ0FBK0I7QUFDL0IsbUVBQTRFO0FBQzVFLGtEQUFvRDtBQUNwRCxnRUFBOEQ7QUFDOUQsdUNBQXVDO0FBWXZDLElBQUssU0FJSjtBQUpELFdBQUssU0FBUztJQUNWLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0lBQ0osMkNBQUssQ0FBQTtBQUNULENBQUMsRUFKSSxTQUFTLEtBQVQsU0FBUyxRQUliO0FBRUQsSUFBSyxrQkFJSjtBQUpELFdBQUssa0JBQWtCO0lBQ25CLDJEQUFJLENBQUE7SUFDSiwyRUFBWSxDQUFBO0lBQ1osMkVBQVksQ0FBQTtBQUNoQixDQUFDLEVBSkksa0JBQWtCLEtBQWxCLGtCQUFrQixRQUl0QjtBQWdDRCxJQUFhLGVBQWU7SUFzQnhCLHlCQUFvQixHQUFzQixFQUMvQixJQUFVLEVBQ1QsTUFBeUIsRUFDekIsTUFBcUIsRUFDdEIsUUFBaUI7UUFKUixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1QsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBakJwQixjQUFTLEdBQWMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN2QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQWlCaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FB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VSxDQUFDLGNBQU0sT0FBQSxxQ0FBYyxFQUFkLENBQWMsQ0FBQyxDQUFDOzhCQUFTLGdCQUFTOytDQUFpQjtBQUdqRTtJQUFuQixZQUFLLENBQUMsV0FBVyxDQUFDOztrREFBbUI7QUFDakI7SUFBcEIsWUFBSyxDQUFDLFlBQVksQ0FBQzs7bURBQW9CO0FBQ3pCO0lBQWQsWUFBSyxDQUFDLE1BQU0sQ0FBQzs7NkNBQWU7QUFDSjtJQUF4QixZQUFLLENBQUMsZ0JBQWdCLENBQUM7O3VEQUF5QjtBQVB4QyxlQUFlO0lBOUIzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsODhEQXdCVDtRQUNELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO0tBQ3hDLENBQUM7cUNBd0IyQix3QkFBaUI7UUFDekIsV0FBSTtRQUNELDJCQUFpQjtRQUNqQiw4QkFBYTtRQUNaLGdCQUFPO0dBMUJuQixlQUFlLENBNFczQjtBQTVXWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEdlc3R1cmVUeXBlcywgUGFuR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tIFwiLi4vaW1hZ2VTbGlkZS9pbWFnZVNsaWRlLmNvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSBcInVpL2dlc3R1cmVzXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIEFuaW1hdGlvbk1vZHVsZSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSwgT3JpZW50YXRpb24gfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEFic29sdXRlTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ1aS9sYWJlbFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9nbG9iYWxcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSUluZGljYXRvcnMge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2xpZGVNYXAge1xuICAgIHNsaWRlOiBTbGlkZUNvbXBvbmVudDtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGxlZnQ/OiBJU2xpZGVNYXA7XG4gICAgcmlnaHQ/OiBJU2xpZGVNYXA7XG59XG5cbmVudW0gZGlyZWN0aW9uIHtcbiAgICBub25lLFxuICAgIGxlZnQsXG4gICAgcmlnaHRcbn1cblxuZW51bSBjYW5jZWxsYXRpb25SZWFzb24ge1xuICAgIHVzZXIsXG4gICAgbm9QcmV2U2xpZGVzLFxuICAgIG5vTW9yZVNsaWRlc1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtYi1pbWFnZS1zbGlkZXNcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8R3JpZExheW91dCByb3dzPVwiKlwiIGNvbHVtbj1cIipcIj5cbiAgICAgICAgICAgIDxBYnNvbHV0ZUxheW91dCByb3c9XCIwXCIgY29sPVwiMFwiIHZlcnRpY2FsQWxpZ25tZW50PVwibWlkZGxlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvQWJzb2x1dGVMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCAqbmdJZj1cIiFjYXJkc3NsaWRlclwiIHJvdz1cIjBcIiBjb2xzcGFuPVwiM1wiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgY2xhc3M9XCJpbWFnZVNsaWRlclwiIHJvd3M9XCIxNiwgMTIwXCIgY29sPVwiMFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjc1XCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjBcIiBjb2w9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGluZGljYXRvcnM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCJpbmRpY2F0b3IuYWN0aXZlXCIgc3JjPVwifi9pbWFnZXMvaWNvbi9pbmRpY2F0b3JfYmx1ZV9hY3RpdmUucG5nXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCIhaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfZGVhY3RpdmUucG5nXCIgKHRhcCk9R29Ub1NsaWRlKGkpOz48L0ltYWdlPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICA8R3JpZExheW91dCAqbmdJZj1cImNhcmRzc2xpZGVyXCIgcm93PVwiMFwiIGNvbHNwYW49XCIzXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBjbGFzcz1cImltYWdlU2xpZGVyXCIgcm93cz1cIjIwXCIgY29sPVwiMFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjQwXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjBcIiBjb2w9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJib3R0b21cIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGluZGljYXRvcnM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCJpbmRpY2F0b3IuYWN0aXZlXCIgc3JjPVwifi9pbWFnZXMvaWNvbi9pbmRpY2F0b3JfYmx1ZV9hY3RpdmUucG5nXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCIhaW5kaWNhdG9yLmFjdGl2ZVwiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfZGVhY3RpdmUucG5nXCIgKHRhcCk9R29Ub1NsaWRlKGkpOz48L0ltYWdlPlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+ICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvR3JpZExheW91dD5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBTbGlkZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBTbGlkZUNvbXBvbmVudCkpIHNsaWRlczogUXVlcnlMaXN0PFNsaWRlQ29tcG9uZW50PjtcblxuICAgIC8vIEBWaWV3Q2hpbGQoXCJmb290ZXJcIikgZm9vdGVyOiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dChcInBhZ2VXaWR0aFwiKSBwYWdlV2lkdGg6IG51bWJlcjtcbiAgICBASW5wdXQoXCJwYWdlSGVpZ2h0XCIpIHBhZ2VIZWlnaHQ6IG51bWJlcjtcbiAgICBASW5wdXQoXCJsb29wXCIpIGxvb3A6IGJvb2xlYW47XG4gICAgQElucHV0KFwicGFnZUluZGljYXRvcnNcIikgcGFnZUluZGljYXRvcnM6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgZGlyZWN0aW9uOiBkaXJlY3Rpb24gPSBkaXJlY3Rpb24ubm9uZTtcbiAgICBwdWJsaWMgY2FyZHNzbGlkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpbmRpY2F0b3JzOiBJSW5kaWNhdG9yc1tdO1xuICAgIGN1cnJlbnRTbGlkZTogSVNsaWRlTWFwO1xuICAgIF9zbGlkZU1hcDogSVNsaWRlTWFwW107XG5cbiAgICBnZXQgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50U2xpZGUgJiYgISF0aGlzLmN1cnJlbnRTbGlkZS5yaWdodDtcbiAgICB9XG4gICAgZ2V0IGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRTbGlkZSAmJiAhIXRoaXMuY3VycmVudFNsaWRlLmxlZnQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyU2VydmljZSxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9ycyA9IFtdO1xuICAgICAgICB0aGlzLmNhcmRzc2xpZGVyID0gdGhpcy5fZ2xvYmFscy5pc2NhcmRzbGlkZXI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcCA/IHRoaXMubG9vcCA6IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2VJbmRpY2F0b3JzID0gdGhpcy5wYWdlSW5kaWNhdG9ycyA/IHRoaXMucGFnZUluZGljYXRvcnMgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5wYWdlV2lkdGggPSB0aGlzLnBhZ2VXaWR0aCA/IHRoaXMucGFnZVdpZHRoIDogcGxhdGZvcm0uc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgICAgICB0aGlzLnBhZ2VIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQgPyB0aGlzLnBhZ2VIZWlnaHQgOiBwbGF0Zm9ybS5zY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xuICAgIH1cblxuICAgIHNraXBQb3BVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJhd2VyLmVuYWJsZUdlc3R1cmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggc2xpZGVzIGFuZCBzZXR1cCBoZWlnaHQgYW5kIHdpZGl0aFxuXG4gICAgICAgIHRoaXMuc2xpZGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICBBYnNvbHV0ZUxheW91dC5zZXRMZWZ0KHNsaWRlLmxheW91dCwgdGhpcy5wYWdlV2lkdGgpO1xuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVXaWR0aCA9IHRoaXMucGFnZVdpZHRoO1xuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVXaWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVIZWlnaHQgPSBcIjEyMFwiO1xuICAgICAgICAgICAgLy8gc2xpZGUuc2xpZGVIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuYnVpbGRTbGlkZU1hcCh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnBhZ2VJbmRpY2F0b3JzKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRm9vdGVyKHRoaXMuc2xpZGVzLmxlbmd0aCk7XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IoMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNsaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uU2xpZGVzKHRoaXMuY3VycmVudFNsaWRlKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTd2lwZSh0aGlzLnBhZ2VXaWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc2NhcmRTZWNvbmRTbGlkZXIgJiYgdGhpcy5fZ2xvYmFscy5pc2NhcmRzbGlkZXIpIHtcbiAgICAgICAgICAgLy8gdGhpcy5Hb1RvU2xpZGUoMSk7XG4gICAgICAgICAgdGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvb3RlciBzdHVmZlxuICAgIHByaXZhdGUgYnVpbGRGb290ZXIocGFnZUNvdW50OiBudW1iZXIgPSA1KTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IHBhZ2VDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JzLnB1c2goeyBhY3RpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IoYWN0aXZlSW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluZGljYXRvcnMubWFwKChpbmRpY2F0b3I6IElJbmRpY2F0b3JzLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGljYXRvci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbmRpY2F0b3JzID0gWy4uLnRoaXMuaW5kaWNhdG9yc107XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlICBmdW5jdGlvbnNcbiAgICBwcml2YXRlIHNldHVwUGFuZWwoc2xpZGU6IElTbGlkZU1hcCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5ub25lO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0Lm9mZihcInBhblwiKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSBzbGlkZTtcblxuICAgICAgICAvLyBzZXRzIHVwIGVhY2ggc2xpZGUgc28gdGhhdCB0aGV5IGFyZSBwb3NpdGlvbmVkIHRvIHRyYW5zaXRpb24gZWl0aGVyIHdheS5cbiAgICAgICAgdGhpcy5wb3NpdGlvblNsaWRlcyh0aGlzLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuZGlzYWJsZVBhbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hcHBseVN3aXBlKHRoaXMucGFnZVdpZHRoKTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVQYWdlSW5kaWNhdG9yKHRoaXMuY3VycmVudFNsaWRlLmluZGV4KTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcG9zaXRpb25TbGlkZXMoc2xpZGU6IElTbGlkZU1hcCkge1xuICAgICAgICAvLyBzZXRzIHVwIGVhY2ggc2xpZGUgc28gdGhhdCB0aGV5IGFyZSBwb3NpdGlvbmVkIHRvIHRyYW5zaXRpb24gZWl0aGVyIHdheS5cbiAgICAgICAgaWYgKHNsaWRlLmxlZnQgIT0gbnVsbCAmJiBzbGlkZS5sZWZ0LnNsaWRlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGggKiAyO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlLnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoO1xuICAgICAgICBpZiAoc2xpZGUucmlnaHQgIT0gbnVsbCAmJiBzbGlkZS5yaWdodC5zbGlkZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dSaWdodFNsaWRlKHNsaWRlTWFwOiBJU2xpZGVNYXAsIG9mZnNldDogbnVtYmVyID0gdGhpcy5wYWdlV2lkdGgsIGVuZGluZ1ZlbG9jaXR5OiBudW1iZXIgPSAyLCBkdXJhdGlvbjogbnVtYmVyID0gMjAwKTogQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvblByb21pc2Uge1xuICAgICAgICBsZXQgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlcjtcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjsgLy8gZGVmYXVsdCB2YWx1ZVxuXG4gICAgICAgIGxldCB0cmFuc2l0aW9uID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgdHJhbnNpdGlvbi5wdXNoKHtcbiAgICAgICAgICAgIHRhcmdldDogc2xpZGVNYXAucmlnaHQuc2xpZGUubGF5b3V0LFxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxuICAgICAgICAgICAgZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcbiAgICAgICAgfSk7XG4gICAgICAgIHRyYW5zaXRpb24ucHVzaCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHNsaWRlTWFwLnNsaWRlLmxheW91dCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGFuaW1hdGlvblNldCA9IG5ldyBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uKHRyYW5zaXRpb24sIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uU2V0LnBsYXkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMZWZ0U2xpZGUoc2xpZGVNYXA6IElTbGlkZU1hcCwgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLnBhZ2VXaWR0aCwgZW5kaW5nVmVsb2NpdHk6IG51bWJlciA9IDIsIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XG4gICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gZHVyYXRpb247IC8vIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgbGV0IHRyYW5zaXRpb24gPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICB0cmFuc2l0aW9uLnB1c2goe1xuICAgICAgICAgICAgdGFyZ2V0OiBzbGlkZU1hcC5sZWZ0LnNsaWRlLmxheW91dCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG4gICAgICAgIH0pO1xuICAgICAgICB0cmFuc2l0aW9uLnB1c2goe1xuICAgICAgICAgICAgdGFyZ2V0OiBzbGlkZU1hcC5zbGlkZS5sYXlvdXQsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBhbmltYXRpb25TZXQgPSBuZXcgQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvbih0cmFuc2l0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvblNldC5wbGF5KCk7XG5cbiAgICB9XG4gICAgb25QYW4oYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmRpcihhcmdzKTtcbiAgICB9XG4gICAgcHVibGljIGFwcGx5U3dpcGUocGFnZVdpZHRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHByZXZpb3VzRGVsdGEgPSAtMTsgLy8gaGFjayB0byBnZXQgYXJvdW5kIGlvcyBmaXJpbmcgcGFuIGV2ZW50IGFmdGVyIHJlbGVhc2VcbiAgICAgICAgbGV0IGVuZGluZ1ZlbG9jaXR5ID0gMDtcbiAgICAgICAgbGV0IHN0YXJ0VGltZSwgZGVsdGFUaW1lO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC5vbihnZXN0dXJlcy5HZXN0dXJlVHlwZXMucGFuLCAoYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKGFyZ3Muc3RhdGUgPT09IGdlc3R1cmVzLkdlc3R1cmVTdGF0ZVR5cGVzLmJlZ2FuKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0RlbHRhID0gMDtcbiAgICAgICAgICAgICAgICBlbmRpbmdWZWxvY2l0eSA9IDI1MDtcblxuICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlclN0YXJ0RXZlbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJncy5zdGF0ZSA9PT0gZ2VzdHVyZXMuR2VzdHVyZVN0YXRlVHlwZXMuZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIC8vIGlmIHZlbG9jaXR5U2Nyb2xsaW5nIGlzIGVuYWJsZWQgdGhlbiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR0eVxuXG4gICAgICAgICAgICAgICAgLy8gc3dpcGluZyBsZWZ0IHRvIHJpZ2h0LlxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRlbHRhWCA+IChwYWdlV2lkdGggLyA4KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNQcmV2aW91cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xlZnRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgYXJncy5kZWx0YVgsIGVuZGluZ1ZlbG9jaXR5KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50U2xpZGUubGVmdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDaGFuZ2VFdmVudExlZnRUb1JpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZ5IG5vIG1vcmUgc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDYW5jZWxFdmVudChjYW5jZWxsYXRpb25SZWFzb24ubm9QcmV2U2xpZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHN3aXBpbmcgcmlnaHQgdG8gbGVmdFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuZGVsdGFYIDwgKC1wYWdlV2lkdGggLyA4KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmlnaHRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgYXJncy5kZWx0YVgsIGVuZGluZ1ZlbG9jaXR5KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50U2xpZGUucmlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZ5IGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDaGFuZ2VFdmVudFJpZ2h0VG9MZWZ0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgZmluc2loZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVudE5hbWU6IFNsaWRlQ29udGFpbmVyLkZJTklTSEVEX0VWRU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSdyZSBhdCB0aGUgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgbm8gbW9yZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMudHJhbnNpdGlvbmluZyA9PT0gZmFsc2UpIHx8IChhcmdzLnN0YXRlID09PSAzKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgY2FuY2VsbGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHAuaW9zKSAvLyBmb3Igc29tZSByZWFzb24gaSBoYXZlIHRvIHNldCB0aGVzZSBpbiBpb3Mgb3IgdGhlcmUgaXMgc29tZSBzb3J0IG9mIGJvdW5jZSBiYWNrLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNQcmV2aW91cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUubGVmdC5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCAqIDIsIHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHAuaW9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXBwLmlvcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRyYW5zaXRpb25pbmdcbiAgICAgICAgICAgICAgICAgICAgJiYgcHJldmlvdXNEZWx0YSAhPT0gYXJncy5kZWx0YVhcbiAgICAgICAgICAgICAgICAgICAgJiYgYXJncy5kZWx0YVggIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAmJiBhcmdzLmRlbHRhWCA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSBhcmdzLmRlbHRhWCAtIHRoaXMucGFnZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUucmlnaHQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSBhcmdzLmRlbHRhWDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmFuc2l0aW9uaW5nXG4gICAgICAgICAgICAgICAgICAgICYmIHByZXZpb3VzRGVsdGEgIT09IGFyZ3MuZGVsdGFYXG4gICAgICAgICAgICAgICAgICAgICYmIGFyZ3MuZGVsdGFYICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJiYgYXJncy5kZWx0YVggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSBhcmdzLmRlbHRhWCAtIHRoaXMucGFnZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUubGVmdC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IC0odGhpcy5wYWdlV2lkdGggKiAyKSArIGFyZ3MuZGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGVsdGFYICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRGVsdGEgPSBhcmdzLmRlbHRhWDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFNsaWRlTWFwKHNsaWRlczogU2xpZGVDb21wb25lbnRbXSkge1xuICAgICAgICB0aGlzLl9zbGlkZU1hcCA9IFtdO1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zbGlkZU1hcC5wdXNoKHtcbiAgICAgICAgICAgICAgICBzbGlkZTogc2xpZGUsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zbGlkZU1hcC5mb3JFYWNoKChtYXBwaW5nOiBJU2xpZGVNYXAsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zbGlkZU1hcFtpbmRleCAtIDFdICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWFwcGluZy5sZWZ0ID0gdGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zbGlkZU1hcFtpbmRleCArIDFdICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWFwcGluZy5yaWdodCA9IHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlTWFwWzBdLmxlZnQgPSB0aGlzLl9zbGlkZU1hcFt0aGlzLl9zbGlkZU1hcC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlTWFwW3RoaXMuX3NsaWRlTWFwLmxlbmd0aCAtIDFdLnJpZ2h0ID0gdGhpcy5fc2xpZGVNYXBbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlTWFwWzBdO1xuICAgIH1cblxuICAgIHB1YmxpYyBHb1RvU2xpZGUobnVtOiBudW1iZXIsIHRyYXZlcnNlRHVyYXRpb246IG51bWJlciA9IDUwLCBsYW5kaW5nRHVyYXRpb246IG51bWJlciA9IDIwMCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUuaW5kZXggPT09IG51bSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBkdXJhdGlvbjogbnVtYmVyID0gbGFuZGluZ0R1cmF0aW9uO1xuICAgICAgICBpZiAoTWF0aC5hYnMobnVtIC0gdGhpcy5jdXJyZW50U2xpZGUuaW5kZXgpICE9PSAxKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHRyYXZlcnNlRHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNsaWRlLmluZGV4IDwgbnVtKVxuICAgICAgICAgICAgdGhpcy5uZXh0U2xpZGUoZHVyYXRpb24pLnRoZW4oKCkgPT4gdGhpcy5Hb1RvU2xpZGUobnVtKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNTbGlkZShkdXJhdGlvbikudGhlbigoKSA9PiB0aGlzLkdvVG9TbGlkZShudW0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmV4dFNsaWRlKGR1cmF0aW9uPzogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc05leHQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93UmlnaHRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgbnVsbCwgbnVsbCwgZHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0KTtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNoYW5nZUV2ZW50UmlnaHRUb0xlZnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZXZpb3VzU2xpZGUoZHVyYXRpb24/OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAoIXRoaXMuaGFzUHJldmlvdXMpIHtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub1ByZXZTbGlkZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMudHJpZ2dlclN0YXJ0RXZlbnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0xlZnRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgbnVsbCwgbnVsbCwgZHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLmxlZnQpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDaGFuZ2VFdmVudExlZnRUb1JpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdfQ==