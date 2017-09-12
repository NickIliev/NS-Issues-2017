"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var slide_component_1 = require("../slide/slide.component");
var gestures = require("ui/gestures");
var platform = require("platform");
var AnimationModule = require("ui/animation");
var enums_1 = require("ui/enums");
var app = require("application");
var absolute_layout_1 = require("ui/layouts/absolute-layout");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
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
    function SlidesComponent(ref, page, _routerExtensions) {
        this.ref = ref;
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.direction = direction.none;
        this.indicators = [];
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
    SlidesComponent.prototype.ngAfterViewInit = function () {
        // loop through slides and setup height and widith
        /* setTimeout(() => {
                this.setSliderConfiguration();
                  }, 5000);*/
        this.setSliderConfiguration();
    };
    SlidesComponent.prototype.setSliderConfiguration = function () {
        var _this = this;
        this.slides.forEach(function (slide) {
            absolute_layout_1.AbsoluteLayout.setLeft(slide.layout, _this.pageWidth);
            // 		//slide.slideWidth = this.pageWidth;
            slide.slideWidth = "100%";
            slide.slideHeight = "140";
            // 		//slide.slideHeight = this.pageHeight;
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
    };
    SlidesComponent.prototype.ngOnDestroy = function () {
    };
    //footer stuff
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
            if (index == activeIndex) {
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
        this.currentSlide.slide.layout.off('pan');
        this.currentSlide = slide;
        // sets up each slide so that they are positioned to transition either way.
        this.positionSlides(this.currentSlide);
        //if (this.disablePan === false) {
        this.applySwipe(this.pageWidth);
        //}
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
        alert("jai");
        console.dir(args);
    };
    SlidesComponent.prototype.applySwipe = function (pageWidth) {
        var _this = this;
        var previousDelta = -1; //hack to get around ios firing pan event after release
        var endingVelocity = 0;
        var startTime, deltaTime;
        this.currentSlide.slide.layout.on(gestures.GestureTypes.tap, function (args) {
            _this._routerExtensions.navigate(["/accounts/home"], {
                animated: false
            });
        });
        this.currentSlide.slide.layout.on(gestures.GestureTypes.pan, function (args) {
            if (args.state === gestures.GestureStateTypes.began) {
                startTime = Date.now();
                previousDelta = 0;
                endingVelocity = 250;
                //this.triggerStartEvent();
            }
            else if (args.state === gestures.GestureStateTypes.ended) {
                deltaTime = Date.now() - startTime;
                // if velocityScrolling is enabled then calculate the velocitty
                // swiping left to right.
                if (args.deltaX > (pageWidth / 8)) {
                    if (_this.hasPrevious) {
                        _this.transitioning = true;
                        _this.showLeftSlide(_this.currentSlide, args.deltaX, endingVelocity).then(function () {
                            if (_this.currentSlide && _this.currentSlide.left) {
                                _this.setupPanel(_this.currentSlide.left);
                            }
                            //this.triggerChangeEventLeftToRight();
                        });
                    }
                    else {
                        //We're at the start
                        //Notify no more slides
                        //this.triggerCancelEvent(cancellationReason.noPrevSlides);
                    }
                    return;
                }
                else if (args.deltaX < (-pageWidth / 8)) {
                    if (_this.hasNext) {
                        _this.transitioning = true;
                        _this.showRightSlide(_this.currentSlide, args.deltaX, endingVelocity).then(function () {
                            if (_this.currentSlide && _this.currentSlide.right) {
                                _this.setupPanel(_this.currentSlide.right);
                            }
                            // Notify changed
                            //this.triggerChangeEventRightToLeft();
                            if (!_this.hasNext) {
                                // Notify finsihed
                                // this.notify({
                                // 	eventName: SlideContainer.FINISHED_EVENT,
                                // 	object: this
                                // });
                            }
                        });
                    }
                    else {
                        // We're at the end
                        // Notify no more slides
                        //this.triggerCancelEvent(cancellationReason.noMoreSlides);
                    }
                    return;
                }
                if ((_this.transitioning === false) || (args.state === 3)) {
                    //Notify cancelled
                    //this.triggerCancelEvent(cancellationReason.user);
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
        if (this.currentSlide.index == num)
            return;
        var duration = landingDuration;
        if (Math.abs(num - this.currentSlide.index) != 1)
            duration = traverseDuration;
        if (this.currentSlide.index < num)
            this.nextSlide(duration).then(function () { return _this.GoToSlide(num); });
        else
            this.previousSlide(duration).then(function () { return _this.GoToSlide(num); });
    };
    SlidesComponent.prototype.nextSlide = function (duration) {
        var _this = this;
        if (!this.hasNext) {
            //this.triggerCancelEvent(cancellationReason.noMoreSlides);
            return;
        }
        this.direction = direction.left;
        this.transitioning = true;
        //	this.triggerStartEvent();
        return this.showRightSlide(this.currentSlide, null, null, duration).then(function () {
            if (_this.currentSlide && _this.currentSlide.right) {
                _this.setupPanel(_this.currentSlide.right);
            }
            //this.triggerChangeEventRightToLeft();
        });
    };
    SlidesComponent.prototype.previousSlide = function (duration) {
        var _this = this;
        if (!this.hasPrevious) {
            //this.triggerCancelEvent(cancellationReason.noPrevSlides);
            return;
        }
        this.direction = direction.right;
        this.transitioning = true;
        //this.triggerStartEvent();
        return this.showLeftSlide(this.currentSlide, null, null, duration).then(function () {
            if (_this.currentSlide && _this.currentSlide.left) {
                _this.setupPanel(_this.currentSlide.left);
            }
            //this.triggerChangeEventLeftToRight();
        });
    };
    return SlidesComponent;
}());
__decorate([
    core_1.ContentChildren(core_1.forwardRef(function () { return slide_component_1.SlideComponent; })),
    __metadata("design:type", core_1.QueryList)
], SlidesComponent.prototype, "slides", void 0);
__decorate([
    core_1.Input('pageWidth'),
    __metadata("design:type", Number)
], SlidesComponent.prototype, "pageWidth", void 0);
__decorate([
    core_1.Input('pageHeight'),
    __metadata("design:type", Number)
], SlidesComponent.prototype, "pageHeight", void 0);
__decorate([
    core_1.Input('loop'),
    __metadata("design:type", Boolean)
], SlidesComponent.prototype, "loop", void 0);
__decorate([
    core_1.Input('pageIndicators'),
    __metadata("design:type", Boolean)
], SlidesComponent.prototype, "pageIndicators", void 0);
SlidesComponent = __decorate([
    core_1.Component({
        selector: 'mb-slides',
        template: "\n\t\t<GridLayout rows=\"auto,auto\" column=\"50,*,50\" style.paddingBottom=\"0\">\t\t\t\n\t\t\t<AbsoluteLayout row=\"0\" col=\"1\" style.marginLeft=\"0\" style.marginRight=\"0\" verticalAlignment=\"top\" horizontalAlignment=\"center\">\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</AbsoluteLayout>\n\t\t\t<GridLayout row=\"1\" colspan=\"3\" rows=\"*\" column=\"*\" width=\"100%\" height=\"25\">\n\t\t\t\t<StackLayout row=\"0\" col=\"0\" orientation=\"horizontal\" verticalAlignment=\"bottom\" horizontalAlignment=\"center\">\n\t\t\t\t\t<StackLayout *ngFor=\"let indicator of indicators; let i = index\">\n\t\t\t\t\t\t<Image width=\"18\" height=\"18\" style.marginRight=\"10\" *ngIf=\"indicator.active\" loadMode=\"async\" src=\"~/images/icon/indicator_blue_active.png\"></Image>\n\t\t\t\t\t\t<Image width=\"18\" height=\"18\" style.marginRight=\"10\" *ngIf=\"!indicator.active\" loadMode=\"async\" src=\"~/images/icon/indicator_blue_deactive.png\" (tap)=GoToSlide(i);></Image>\n\t\t\t\t\t</StackLayout>\n\t\t\t\t</StackLayout>\n\t\t\t</GridLayout>\n\t\t</GridLayout>\t\t\n\t",
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, page_1.Page, router_1.RouterExtensions])
], SlidesComponent);
exports.SlidesComponent = SlidesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsaWRlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0w7QUFFeEwsNERBQTBEO0FBQzFELHNDQUF3QztBQUN4QyxtQ0FBcUM7QUFDckMsOENBQWdEO0FBQ2hELGtDQUF1RDtBQUN2RCxpQ0FBbUM7QUFDbkMsOERBQTREO0FBSTVELGdDQUErQjtBQUMvQixzREFBK0Q7QUFZL0QsSUFBSyxTQUlKO0FBSkQsV0FBSyxTQUFTO0lBQ2IseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7SUFDSiwyQ0FBSyxDQUFBO0FBQ04sQ0FBQyxFQUpJLFNBQVMsS0FBVCxTQUFTLFFBSWI7QUFFRCxJQUFLLGtCQUlKO0FBSkQsV0FBSyxrQkFBa0I7SUFDdEIsMkRBQUksQ0FBQTtJQUNKLDJFQUFZLENBQUE7SUFDWiwyRUFBWSxDQUFBO0FBQ2IsQ0FBQyxFQUpJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFJdEI7QUFzQkQsSUFBYSxlQUFlO0lBc0IzQix5QkFBb0IsR0FBc0IsRUFBUyxJQUFVLEVBQVUsaUJBQW1DO1FBQXRGLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFibEcsY0FBUyxHQUFjLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFjN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQVhELHNCQUFJLG9DQUFPO2FBQVg7WUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksd0NBQVc7YUFBZjtZQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxD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LENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCx1Q0FBdUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBdFhELElBc1hDO0FBclhtRDtJQUFsRCxzQkFBZSxDQUFDLGlCQUFVLENBQUMsY0FBTSxPQUFBLGdDQUFjLEVBQWQsQ0FBYyxDQUFDLENBQUM7OEJBQVMsZ0JBQVM7K0NBQWlCO0FBR2pFO0lBQW5CLFlBQUssQ0FBQyxXQUFXLENBQUM7O2tEQUFtQjtBQUNqQjtJQUFwQixZQUFLLENBQUMsWUFBWSxDQUFDOzttREFBb0I7QUFDekI7SUFBZCxZQUFLLENBQUMsTUFBTSxDQUFDOzs2Q0FBZTtBQUNKO0lBQXhCLFlBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7dURBQXlCO0FBUHJDLGVBQWU7SUFwQjNCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsbWpDQWNUO1FBQ0QsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7S0FDckMsQ0FBQztxQ0F3QndCLHdCQUFpQixFQUFlLFdBQUksRUFBNkIseUJBQWdCO0dBdEI5RixlQUFlLENBc1gzQjtBQXRYWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2VzdHVyZVR5cGVzLCBQYW5HZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi4vc2xpZGUvc2xpZGUuY29tcG9uZW50JztcclxuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSAndWkvZ2VzdHVyZXMnO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tICdwbGF0Zm9ybSc7XHJcbmltcG9ydCAqIGFzIEFuaW1hdGlvbk1vZHVsZSBmcm9tICd1aS9hbmltYXRpb24nO1xyXG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSwgT3JpZW50YXRpb24gfSBmcm9tICd1aS9lbnVtcyc7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XHJcbmltcG9ydCB7IEFic29sdXRlTGF5b3V0IH0gZnJvbSAndWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXQnO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gJ3VpL2xheW91dHMvZ3JpZC1sYXlvdXQnO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ3VpL2xhYmVsJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5leHBvcnQgaW50ZXJmYWNlIElJbmRpY2F0b3JzIHtcclxuXHRhY3RpdmU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNsaWRlTWFwIHtcclxuXHRzbGlkZTogU2xpZGVDb21wb25lbnQ7XHJcblx0aW5kZXg6IG51bWJlcjtcclxuXHRsZWZ0PzogSVNsaWRlTWFwO1xyXG5cdHJpZ2h0PzogSVNsaWRlTWFwO1xyXG59XHJcblxyXG5lbnVtIGRpcmVjdGlvbiB7XHJcblx0bm9uZSxcclxuXHRsZWZ0LFxyXG5cdHJpZ2h0XHJcbn1cclxuXHJcbmVudW0gY2FuY2VsbGF0aW9uUmVhc29uIHtcclxuXHR1c2VyLFxyXG5cdG5vUHJldlNsaWRlcyxcclxuXHRub01vcmVTbGlkZXNcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdtYi1zbGlkZXMnLFxyXG5cdHRlbXBsYXRlOiBgXHJcblx0XHQ8R3JpZExheW91dCByb3dzPVwiYXV0byxhdXRvXCIgY29sdW1uPVwiNTAsKiw1MFwiIHN0eWxlLnBhZGRpbmdCb3R0b209XCIwXCI+XHRcdFx0XHJcblx0XHRcdDxBYnNvbHV0ZUxheW91dCByb3c9XCIwXCIgY29sPVwiMVwiIHN0eWxlLm1hcmdpbkxlZnQ9XCIwXCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJ0b3BcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCI+XHJcblx0XHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cdFx0XHQ8L0Fic29sdXRlTGF5b3V0PlxyXG5cdFx0XHQ8R3JpZExheW91dCByb3c9XCIxXCIgY29sc3Bhbj1cIjNcIiByb3dzPVwiKlwiIGNvbHVtbj1cIipcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyNVwiPlxyXG5cdFx0XHRcdDxTdGFja0xheW91dCByb3c9XCIwXCIgY29sPVwiMFwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxyXG5cdFx0XHRcdFx0PFN0YWNrTGF5b3V0ICpuZ0Zvcj1cImxldCBpbmRpY2F0b3Igb2YgaW5kaWNhdG9yczsgbGV0IGkgPSBpbmRleFwiPlxyXG5cdFx0XHRcdFx0XHQ8SW1hZ2Ugd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIxMFwiICpuZ0lmPVwiaW5kaWNhdG9yLmFjdGl2ZVwiIGxvYWRNb2RlPVwiYXN5bmNcIiBzcmM9XCJ+L2ltYWdlcy9pY29uL2luZGljYXRvcl9ibHVlX2FjdGl2ZS5wbmdcIj48L0ltYWdlPlxyXG5cdFx0XHRcdFx0XHQ8SW1hZ2Ugd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIxMFwiICpuZ0lmPVwiIWluZGljYXRvci5hY3RpdmVcIiBsb2FkTW9kZT1cImFzeW5jXCIgc3JjPVwifi9pbWFnZXMvaWNvbi9pbmRpY2F0b3JfYmx1ZV9kZWFjdGl2ZS5wbmdcIiAodGFwKT1Hb1RvU2xpZGUoaSk7PjwvSW1hZ2U+XHJcblx0XHRcdFx0XHQ8L1N0YWNrTGF5b3V0PlxyXG5cdFx0XHRcdDwvU3RhY2tMYXlvdXQ+XHJcblx0XHRcdDwvR3JpZExheW91dD5cclxuXHRcdDwvR3JpZExheW91dD5cdFx0XHJcblx0YCxcclxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gU2xpZGVDb21wb25lbnQpKSBzbGlkZXM6IFF1ZXJ5TGlzdDxTbGlkZUNvbXBvbmVudD47XHJcblxyXG5cdC8vQFZpZXdDaGlsZCgnZm9vdGVyJykgZm9vdGVyOiBFbGVtZW50UmVmO1xyXG5cdEBJbnB1dCgncGFnZVdpZHRoJykgcGFnZVdpZHRoOiBudW1iZXI7XHJcblx0QElucHV0KCdwYWdlSGVpZ2h0JykgcGFnZUhlaWdodDogbnVtYmVyO1xyXG5cdEBJbnB1dCgnbG9vcCcpIGxvb3A6IGJvb2xlYW47XHJcblx0QElucHV0KCdwYWdlSW5kaWNhdG9ycycpIHBhZ2VJbmRpY2F0b3JzOiBib29sZWFuO1xyXG5cdHByaXZhdGUgdHJhbnNpdGlvbmluZzogYm9vbGVhbjtcclxuXHRwcml2YXRlIGRpcmVjdGlvbjogZGlyZWN0aW9uID0gZGlyZWN0aW9uLm5vbmU7XHJcblxyXG5cdGluZGljYXRvcnM6IElJbmRpY2F0b3JzW107XHJcblx0Y3VycmVudFNsaWRlOiBJU2xpZGVNYXA7XHJcblx0X3NsaWRlTWFwOiBJU2xpZGVNYXBbXTtcclxuXHJcblx0Z2V0IGhhc05leHQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gISF0aGlzLmN1cnJlbnRTbGlkZSAmJiAhIXRoaXMuY3VycmVudFNsaWRlLnJpZ2h0O1xyXG5cdH1cclxuXHRnZXQgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gISF0aGlzLmN1cnJlbnRTbGlkZSAmJiAhIXRoaXMuY3VycmVudFNsaWRlLmxlZnQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBwYWdlOiBQYWdlLCBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblx0XHR0aGlzLmluZGljYXRvcnMgPSBbXTtcclxuXHJcblxyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmxvb3AgPSB0aGlzLmxvb3AgPyB0aGlzLmxvb3AgOiBmYWxzZTtcclxuXHRcdHRoaXMucGFnZUluZGljYXRvcnMgPSB0aGlzLnBhZ2VJbmRpY2F0b3JzID8gdGhpcy5wYWdlSW5kaWNhdG9ycyA6IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMucGFnZVdpZHRoID0gdGhpcy5wYWdlV2lkdGggPyB0aGlzLnBhZ2VXaWR0aCA6IHBsYXRmb3JtLnNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcclxuXHRcdHRoaXMucGFnZUhlaWdodCA9IHRoaXMucGFnZUhlaWdodCA/IHRoaXMucGFnZUhlaWdodCA6IHBsYXRmb3JtLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XHJcblxyXG5cdH1cclxuXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0Ly8gbG9vcCB0aHJvdWdoIHNsaWRlcyBhbmQgc2V0dXAgaGVpZ2h0IGFuZCB3aWRpdGhcclxuLyogc2V0VGltZW91dCgoKSA9PiB7IFxyXG5cdFx0dGhpcy5zZXRTbGlkZXJDb25maWd1cmF0aW9uKCk7XHJcblx0XHQgIH0sIDUwMDApOyovXHJcblx0XHQgIHRoaXMuc2V0U2xpZGVyQ29uZmlndXJhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFNsaWRlckNvbmZpZ3VyYXRpb24oKSB7XHJcblxyXG5cdFx0dGhpcy5zbGlkZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50KSA9PiB7XHJcblxyXG5cdFx0XHRBYnNvbHV0ZUxheW91dC5zZXRMZWZ0KHNsaWRlLmxheW91dCwgdGhpcy5wYWdlV2lkdGgpXHJcblx0XHRcdC8vIFx0XHQvL3NsaWRlLnNsaWRlV2lkdGggPSB0aGlzLnBhZ2VXaWR0aDtcclxuXHRcdFx0c2xpZGUuc2xpZGVXaWR0aCA9IFwiMTAwJVwiO1xyXG5cdFx0XHRzbGlkZS5zbGlkZUhlaWdodCA9IFwiMTQwXCI7XHJcblx0XHRcdC8vIFx0XHQvL3NsaWRlLnNsaWRlSGVpZ2h0ID0gdGhpcy5wYWdlSGVpZ2h0O1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuYnVpbGRTbGlkZU1hcCh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuXHRcdGlmICh0aGlzLnBhZ2VJbmRpY2F0b3JzKSB7XHRcdFxyXG5cdFx0XHR0aGlzLmJ1aWxkRm9vdGVyKHRoaXMuc2xpZGVzLmxlbmd0aCk7XHJcblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRBY3RpdmVQYWdlSW5kaWNhdG9yKDApO1xyXG5cdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlKSB7XHJcblx0XHRcdHRoaXMucG9zaXRpb25TbGlkZXModGhpcy5jdXJyZW50U2xpZGUpO1xyXG5cdFx0XHR0aGlzLmFwcGx5U3dpcGUodGhpcy5wYWdlV2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8vZm9vdGVyIHN0dWZmXHJcblx0cHJpdmF0ZSBidWlsZEZvb3RlcihwYWdlQ291bnQ6IG51bWJlciA9IDUpOiB2b2lkIHtcclxuXHRcdGxldCBpbmRleCA9IDA7XHJcblx0XHR3aGlsZSAoaW5kZXggPCBwYWdlQ291bnQpIHtcclxuXHRcdFx0dGhpcy5pbmRpY2F0b3JzLnB1c2goeyBhY3RpdmU6IGZhbHNlIH0pO1xyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlUGFnZUluZGljYXRvcihhY3RpdmVJbmRleDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmluZGljYXRvcnMubWFwKChpbmRpY2F0b3I6IElJbmRpY2F0b3JzLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdGlmIChpbmRleCA9PSBhY3RpdmVJbmRleCkge1xyXG5cdFx0XHRcdGluZGljYXRvci5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGljYXRvci5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5pbmRpY2F0b3JzID0gWy4uLnRoaXMuaW5kaWNhdG9yc107XHJcblx0XHR0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0fVxyXG5cclxuXHQvLyBwcml2YXRlICBmdW5jdGlvbnNcclxuXHRwcml2YXRlIHNldHVwUGFuZWwoc2xpZGU6IElTbGlkZU1hcCkge1xyXG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ubm9uZTtcclxuXHRcdHRoaXMudHJhbnNpdGlvbmluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0Lm9mZigncGFuJyk7XHJcblx0XHR0aGlzLmN1cnJlbnRTbGlkZSA9IHNsaWRlO1xyXG5cclxuXHRcdC8vIHNldHMgdXAgZWFjaCBzbGlkZSBzbyB0aGF0IHRoZXkgYXJlIHBvc2l0aW9uZWQgdG8gdHJhbnNpdGlvbiBlaXRoZXIgd2F5LlxyXG5cdFx0dGhpcy5wb3NpdGlvblNsaWRlcyh0aGlzLmN1cnJlbnRTbGlkZSk7XHJcblxyXG5cdFx0Ly9pZiAodGhpcy5kaXNhYmxlUGFuID09PSBmYWxzZSkge1xyXG5cdFx0dGhpcy5hcHBseVN3aXBlKHRoaXMucGFnZVdpZHRoKTtcclxuXHRcdC8vfVxyXG5cclxuXHJcblx0XHR0aGlzLnNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IodGhpcy5jdXJyZW50U2xpZGUuaW5kZXgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcG9zaXRpb25TbGlkZXMoc2xpZGU6IElTbGlkZU1hcCkge1xyXG5cdFx0Ly8gc2V0cyB1cCBlYWNoIHNsaWRlIHNvIHRoYXQgdGhleSBhcmUgcG9zaXRpb25lZCB0byB0cmFuc2l0aW9uIGVpdGhlciB3YXkuXHJcblx0XHRpZiAoc2xpZGUubGVmdCAhPSBudWxsICYmIHNsaWRlLmxlZnQuc2xpZGUgIT0gbnVsbCkge1xyXG5cdFx0XHRzbGlkZS5sZWZ0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoICogMjtcclxuXHRcdH1cclxuXHRcdHNsaWRlLnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoO1xyXG5cdFx0aWYgKHNsaWRlLnJpZ2h0ICE9IG51bGwgJiYgc2xpZGUucmlnaHQuc2xpZGUgIT0gbnVsbCkge1xyXG5cdFx0XHRzbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IDA7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNob3dSaWdodFNsaWRlKHNsaWRlTWFwOiBJU2xpZGVNYXAsIG9mZnNldDogbnVtYmVyID0gdGhpcy5wYWdlV2lkdGgsIGVuZGluZ1ZlbG9jaXR5OiBudW1iZXIgPSAyLCBkdXJhdGlvbjogbnVtYmVyID0gMjAwKTogQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvblByb21pc2Uge1xyXG5cdFx0bGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XHJcblx0XHRhbmltYXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uOyAvLyBkZWZhdWx0IHZhbHVlXHJcblxyXG5cdFx0bGV0IHRyYW5zaXRpb24gPSBuZXcgQXJyYXkoKTtcclxuXHJcblx0XHR0cmFuc2l0aW9uLnB1c2goe1xyXG5cdFx0XHR0YXJnZXQ6IHNsaWRlTWFwLnJpZ2h0LnNsaWRlLmxheW91dCxcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxyXG5cdFx0XHRkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XHJcblx0XHR9KTtcclxuXHRcdHRyYW5zaXRpb24ucHVzaCh7XHJcblx0XHRcdHRhcmdldDogc2xpZGVNYXAuc2xpZGUubGF5b3V0LFxyXG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogLXRoaXMucGFnZVdpZHRoICogMiwgeTogMCB9LFxyXG5cdFx0XHRkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XHJcblx0XHR9KTtcclxuXHRcdGxldCBhbmltYXRpb25TZXQgPSBuZXcgQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvbih0cmFuc2l0aW9uLCBmYWxzZSk7XHJcblxyXG5cdFx0cmV0dXJuIGFuaW1hdGlvblNldC5wbGF5KCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNob3dMZWZ0U2xpZGUoc2xpZGVNYXA6IElTbGlkZU1hcCwgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLnBhZ2VXaWR0aCwgZW5kaW5nVmVsb2NpdHk6IG51bWJlciA9IDIsIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XHJcblxyXG5cdFx0bGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XHJcblx0XHRhbmltYXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uOyAvLyBkZWZhdWx0IHZhbHVlXHJcblx0XHRsZXQgdHJhbnNpdGlvbiA9IG5ldyBBcnJheSgpO1xyXG5cclxuXHRcdHRyYW5zaXRpb24ucHVzaCh7XHJcblx0XHRcdHRhcmdldDogc2xpZGVNYXAubGVmdC5zbGlkZS5sYXlvdXQsXHJcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcclxuXHRcdFx0ZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxyXG5cdFx0fSk7XHJcblx0XHR0cmFuc2l0aW9uLnB1c2goe1xyXG5cdFx0XHR0YXJnZXQ6IHNsaWRlTWFwLnNsaWRlLmxheW91dCxcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuXHRcdFx0ZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxyXG5cdFx0fSk7XHJcblx0XHRsZXQgYW5pbWF0aW9uU2V0ID0gbmV3IEFuaW1hdGlvbk1vZHVsZS5BbmltYXRpb24odHJhbnNpdGlvbiwgZmFsc2UpO1xyXG5cclxuXHRcdHJldHVybiBhbmltYXRpb25TZXQucGxheSgpO1xyXG5cclxuXHR9XHJcblx0b25QYW4oYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0YWxlcnQoXCJqYWlcIik7XHJcblx0XHRjb25zb2xlLmRpcihhcmdzKTtcclxuXHR9XHJcblx0cHVibGljIGFwcGx5U3dpcGUocGFnZVdpZHRoOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGxldCBwcmV2aW91c0RlbHRhID0gLTE7IC8vaGFjayB0byBnZXQgYXJvdW5kIGlvcyBmaXJpbmcgcGFuIGV2ZW50IGFmdGVyIHJlbGVhc2VcclxuXHRcdGxldCBlbmRpbmdWZWxvY2l0eSA9IDA7XHJcblx0XHRsZXQgc3RhcnRUaW1lLCBkZWx0YVRpbWU7XHJcblx0XHR0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQub24oZ2VzdHVyZXMuR2VzdHVyZVR5cGVzLnRhcCwgKGFyZ3MpOiBhbnkgPT57XHJcblx0XHRcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2FjY291bnRzL2hvbWVcIl0sIHtcclxuXHRcdFx0XHRhbmltYXRlZDogZmFsc2VcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0Lm9uKGdlc3R1cmVzLkdlc3R1cmVUeXBlcy5wYW4sIChhcmdzOiBQYW5HZXN0dXJlRXZlbnREYXRhKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChhcmdzLnN0YXRlID09PSBnZXN0dXJlcy5HZXN0dXJlU3RhdGVUeXBlcy5iZWdhbikge1xyXG5cdFx0XHRcdHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcblx0XHRcdFx0cHJldmlvdXNEZWx0YSA9IDA7XHJcblx0XHRcdFx0ZW5kaW5nVmVsb2NpdHkgPSAyNTA7XHJcblxyXG5cdFx0XHRcdC8vdGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGFyZ3Muc3RhdGUgPT09IGdlc3R1cmVzLkdlc3R1cmVTdGF0ZVR5cGVzLmVuZGVkKSB7XHJcblx0XHRcdFx0ZGVsdGFUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcclxuXHRcdFx0XHQvLyBpZiB2ZWxvY2l0eVNjcm9sbGluZyBpcyBlbmFibGVkIHRoZW4gY2FsY3VsYXRlIHRoZSB2ZWxvY2l0dHlcclxuXHJcblx0XHRcdFx0Ly8gc3dpcGluZyBsZWZ0IHRvIHJpZ2h0LlxyXG5cdFx0XHRcdGlmIChhcmdzLmRlbHRhWCA+IChwYWdlV2lkdGggLyA4KSkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzUHJldmlvdXMpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBhcmdzLmRlbHRhWCwgZW5kaW5nVmVsb2NpdHkpLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSAmJiB0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50U2xpZGUubGVmdCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNoYW5nZUV2ZW50TGVmdFRvUmlnaHQoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvL1dlJ3JlIGF0IHRoZSBzdGFydFxyXG5cdFx0XHRcdFx0XHQvL05vdGlmeSBubyBtb3JlIHNsaWRlc1xyXG5cdFx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub1ByZXZTbGlkZXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBzd2lwaW5nIHJpZ2h0IHRvIGxlZnRcclxuXHRcdFx0XHRlbHNlIGlmIChhcmdzLmRlbHRhWCA8ICgtcGFnZVdpZHRoIC8gOCkpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc05leHQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93UmlnaHRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgYXJncy5kZWx0YVgsIGVuZGluZ1ZlbG9jaXR5KS50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5jdXJyZW50U2xpZGUgJiYgdGhpcy5jdXJyZW50U2xpZGUucmlnaHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRTbGlkZS5yaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBOb3RpZnkgY2hhbmdlZFxyXG5cdFx0XHRcdFx0XHRcdC8vdGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRSaWdodFRvTGVmdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuaGFzTmV4dCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm90aWZ5IGZpbnNpaGVkXHJcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzLm5vdGlmeSh7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBcdGV2ZW50TmFtZTogU2xpZGVDb250YWluZXIuRklOSVNIRURfRVZFTlQsXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBcdG9iamVjdDogdGhpc1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gfSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vIFdlJ3JlIGF0IHRoZSBlbmRcclxuXHRcdFx0XHRcdFx0Ly8gTm90aWZ5IG5vIG1vcmUgc2xpZGVzXHJcblx0XHRcdFx0XHRcdC8vdGhpcy50cmlnZ2VyQ2FuY2VsRXZlbnQoY2FuY2VsbGF0aW9uUmVhc29uLm5vTW9yZVNsaWRlcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoKHRoaXMudHJhbnNpdGlvbmluZyA9PT0gZmFsc2UpIHx8IChhcmdzLnN0YXRlID09PSAzKSkge1xyXG5cdFx0XHRcdFx0Ly9Ob3RpZnkgY2FuY2VsbGVkXHJcblx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi51c2VyKTtcclxuXHRcdFx0XHRcdHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcclxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDIwMCxcclxuXHRcdFx0XHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTmV4dCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMjAwLFxyXG5cdFx0XHRcdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoYXBwLmlvcykgLy9mb3Igc29tZSByZWFzb24gaSBoYXZlIHRvIHNldCB0aGVzZSBpbiBpb3Mgb3IgdGhlcmUgaXMgc29tZSBzb3J0IG9mIGJvdW5jZSBiYWNrLlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gMDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc1ByZXZpb3VzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXHJcblx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDIwMCxcclxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0aWYgKGFwcC5pb3MpXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50U2xpZGUubGVmdC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IC10aGlzLnBhZ2VXaWR0aDtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoYXBwLmlvcylcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghdGhpcy50cmFuc2l0aW9uaW5nXHJcblx0XHRcdFx0XHQmJiBwcmV2aW91c0RlbHRhICE9PSBhcmdzLmRlbHRhWFxyXG5cdFx0XHRcdFx0JiYgYXJncy5kZWx0YVggIT0gbnVsbFxyXG5cdFx0XHRcdFx0JiYgYXJncy5kZWx0YVggPCAwKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTmV4dCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5sZWZ0O1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IGFyZ3MuZGVsdGFYIC0gdGhpcy5wYWdlV2lkdGg7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gYXJncy5kZWx0YVg7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIXRoaXMudHJhbnNpdGlvbmluZ1xyXG5cdFx0XHRcdFx0JiYgcHJldmlvdXNEZWx0YSAhPT0gYXJncy5kZWx0YVhcclxuXHRcdFx0XHRcdCYmIGFyZ3MuZGVsdGFYICE9IG51bGxcclxuXHRcdFx0XHRcdCYmIGFyZ3MuZGVsdGFYID4gMCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc1ByZXZpb3VzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLnJpZ2h0O1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IGFyZ3MuZGVsdGFYIC0gdGhpcy5wYWdlV2lkdGg7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtKHRoaXMucGFnZVdpZHRoICogMikgKyBhcmdzLmRlbHRhWDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChhcmdzLmRlbHRhWCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0cHJldmlvdXNEZWx0YSA9IGFyZ3MuZGVsdGFYO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBidWlsZFNsaWRlTWFwKHNsaWRlczogU2xpZGVDb21wb25lbnRbXSkge1xyXG5cdFx0dGhpcy5fc2xpZGVNYXAgPSBbXTtcclxuXHRcdHNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuXHRcdFx0dGhpcy5fc2xpZGVNYXAucHVzaCh7XHJcblx0XHRcdFx0c2xpZGU6IHNsaWRlLFxyXG5cdFx0XHRcdGluZGV4OiBpbmRleCxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuX3NsaWRlTWFwLmZvckVhY2goKG1hcHBpbmc6IElTbGlkZU1hcCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXSAhPSBudWxsKVxyXG5cdFx0XHRcdG1hcHBpbmcubGVmdCA9IHRoaXMuX3NsaWRlTWFwW2luZGV4IC0gMV07XHJcblx0XHRcdGlmICh0aGlzLl9zbGlkZU1hcFtpbmRleCArIDFdICE9IG51bGwpXHJcblx0XHRcdFx0bWFwcGluZy5yaWdodCA9IHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAodGhpcy5sb29wKSB7XHJcblx0XHRcdHRoaXMuX3NsaWRlTWFwWzBdLmxlZnQgPSB0aGlzLl9zbGlkZU1hcFt0aGlzLl9zbGlkZU1hcC5sZW5ndGggLSAxXTtcclxuXHRcdFx0dGhpcy5fc2xpZGVNYXBbdGhpcy5fc2xpZGVNYXAubGVuZ3RoIC0gMV0ucmlnaHQgPSB0aGlzLl9zbGlkZU1hcFswXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9zbGlkZU1hcFswXTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBHb1RvU2xpZGUobnVtOiBudW1iZXIsIHRyYXZlcnNlRHVyYXRpb246IG51bWJlciA9IDUwLCBsYW5kaW5nRHVyYXRpb246IG51bWJlciA9IDIwMCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlLmluZGV4ID09IG51bSkgcmV0dXJuO1xyXG5cclxuXHRcdHZhciBkdXJhdGlvbjogbnVtYmVyID0gbGFuZGluZ0R1cmF0aW9uO1xyXG5cdFx0aWYgKE1hdGguYWJzKG51bSAtIHRoaXMuY3VycmVudFNsaWRlLmluZGV4KSAhPSAxKSBkdXJhdGlvbiA9IHRyYXZlcnNlRHVyYXRpb247XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlLmluZGV4IDwgbnVtKVxyXG5cdFx0XHR0aGlzLm5leHRTbGlkZShkdXJhdGlvbikudGhlbigoKSA9PiB0aGlzLkdvVG9TbGlkZShudW0pKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5wcmV2aW91c1NsaWRlKGR1cmF0aW9uKS50aGVuKCgpID0+IHRoaXMuR29Ub1NsaWRlKG51bSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG5leHRTbGlkZShkdXJhdGlvbj86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZiAoIXRoaXMuaGFzTmV4dCkge1xyXG5cdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ubGVmdDtcclxuXHRcdHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XHJcblx0XHQvL1x0dGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2hvd1JpZ2h0U2xpZGUodGhpcy5jdXJyZW50U2xpZGUsIG51bGwsIG51bGwsIGR1cmF0aW9uKS50aGVuKCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlICYmIHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0KSB7XHJcblx0XHRcdFx0dGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvL3RoaXMudHJpZ2dlckNoYW5nZUV2ZW50UmlnaHRUb0xlZnQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBwcmV2aW91c1NsaWRlKGR1cmF0aW9uPzogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGlmICghdGhpcy5oYXNQcmV2aW91cykge1xyXG5cdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub1ByZXZTbGlkZXMpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XHJcblx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xyXG5cdFx0Ly90aGlzLnRyaWdnZXJTdGFydEV2ZW50KCk7XHJcblx0XHRyZXR1cm4gdGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBudWxsLCBudWxsLCBkdXJhdGlvbikudGhlbigoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSAmJiB0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0KSB7XHJcblx0XHRcdFx0dGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLmxlZnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vdGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRMZWZ0VG9SaWdodCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59Il19