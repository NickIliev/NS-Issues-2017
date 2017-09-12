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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsaWRlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0w7QUFFeEwsNERBQTBEO0FBQzFELHNDQUF3QztBQUN4QyxtQ0FBcUM7QUFDckMsOENBQWdEO0FBQ2hELGtDQUF1RDtBQUN2RCxpQ0FBbUM7QUFDbkMsOERBQTREO0FBSTVELGdDQUErQjtBQUMvQixzREFBK0Q7QUFZL0QsSUFBSyxTQUlKO0FBSkQsV0FBSyxTQUFTO0lBQ2IseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7SUFDSiwyQ0FBSyxDQUFBO0FBQ04sQ0FBQyxFQUpJLFNBQVMsS0FBVCxTQUFTLFFBSWI7QUFFRCxJQUFLLGtCQUlKO0FBSkQsV0FBSyxrQkFBa0I7SUFDdEIsMkRBQUksQ0FBQTtJQUNKLDJFQUFZLENBQUE7SUFDWiwyRUFBWSxDQUFBO0FBQ2IsQ0FBQyxFQUpJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFJdEI7QUFzQkQsSUFBYSxlQUFlO0lBc0IzQix5QkFBb0IsR0FBc0IsRUFBUyxJQUFVLEVBQVUsaUJBQW1DO1FBQXRGLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFibEcsY0FBUyxHQUFjLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFjN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQVhELHNCQUFJLG9DQUFPO2FBQVg7WUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksd0NBQVc7YUFBZjtZQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxD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LENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCx1Q0FBdUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBdFhELElBc1hDO0FBclhtRDtJQUFsRCxzQkFBZSxDQUFDLGlCQUFVLENBQUMsY0FBTSxPQUFBLGdDQUFjLEVBQWQsQ0FBYyxDQUFDLENBQUM7OEJBQVMsZ0JBQVM7K0NBQWlCO0FBR2pFO0lBQW5CLFlBQUssQ0FBQyxXQUFXLENBQUM7O2tEQUFtQjtBQUNqQjtJQUFwQixZQUFLLENBQUMsWUFBWSxDQUFDOzttREFBb0I7QUFDekI7SUFBZCxZQUFLLENBQUMsTUFBTSxDQUFDOzs2Q0FBZTtBQUNKO0lBQXhCLFlBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7dURBQXlCO0FBUHJDLGVBQWU7SUFwQjNCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsbWpDQWNUO1FBQ0QsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7S0FDckMsQ0FBQztxQ0F3QndCLHdCQUFpQixFQUFlLFdBQUksRUFBNkIseUJBQWdCO0dBdEI5RixlQUFlLENBc1gzQjtBQXRYWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlc3R1cmVUeXBlcywgUGFuR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tICcuLi9zbGlkZS9zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZ2VzdHVyZXMgZnJvbSAndWkvZ2VzdHVyZXMnO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuaW1wb3J0ICogYXMgQW5pbWF0aW9uTW9kdWxlIGZyb20gJ3VpL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSwgT3JpZW50YXRpb24gfSBmcm9tICd1aS9lbnVtcyc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tICd1aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dCc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tICd1aS9sYXlvdXRzL2dyaWQtbGF5b3V0JztcbmltcG9ydCB7IExhYmVsIH0gZnJvbSAndWkvbGFiZWwnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSUluZGljYXRvcnMge1xuXHRhY3RpdmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsaWRlTWFwIHtcblx0c2xpZGU6IFNsaWRlQ29tcG9uZW50O1xuXHRpbmRleDogbnVtYmVyO1xuXHRsZWZ0PzogSVNsaWRlTWFwO1xuXHRyaWdodD86IElTbGlkZU1hcDtcbn1cblxuZW51bSBkaXJlY3Rpb24ge1xuXHRub25lLFxuXHRsZWZ0LFxuXHRyaWdodFxufVxuXG5lbnVtIGNhbmNlbGxhdGlvblJlYXNvbiB7XG5cdHVzZXIsXG5cdG5vUHJldlNsaWRlcyxcblx0bm9Nb3JlU2xpZGVzXG59XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ21iLXNsaWRlcycsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PEdyaWRMYXlvdXQgcm93cz1cImF1dG8sYXV0b1wiIGNvbHVtbj1cIjUwLCosNTBcIiBzdHlsZS5wYWRkaW5nQm90dG9tPVwiMFwiPlx0XHRcdFxuXHRcdFx0PEFic29sdXRlTGF5b3V0IHJvdz1cIjBcIiBjb2w9XCIxXCIgc3R5bGUubWFyZ2luTGVmdD1cIjBcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjBcIiB2ZXJ0aWNhbEFsaWdubWVudD1cInRvcFwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cblx0XHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHRcdFx0PC9BYnNvbHV0ZUxheW91dD5cblx0XHRcdDxHcmlkTGF5b3V0IHJvdz1cIjFcIiBjb2xzcGFuPVwiM1wiIHJvd3M9XCIqXCIgY29sdW1uPVwiKlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjI1XCI+XG5cdFx0XHRcdDxTdGFja0xheW91dCByb3c9XCIwXCIgY29sPVwiMFwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPlxuXHRcdFx0XHRcdDxTdGFja0xheW91dCAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGluZGljYXRvcnM7IGxldCBpID0gaW5kZXhcIj5cblx0XHRcdFx0XHRcdDxJbWFnZSB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiBzdHlsZS5tYXJnaW5SaWdodD1cIjEwXCIgKm5nSWY9XCJpbmRpY2F0b3IuYWN0aXZlXCIgbG9hZE1vZGU9XCJhc3luY1wiIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW5kaWNhdG9yX2JsdWVfYWN0aXZlLnBuZ1wiPjwvSW1hZ2U+XG5cdFx0XHRcdFx0XHQ8SW1hZ2Ugd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgc3R5bGUubWFyZ2luUmlnaHQ9XCIxMFwiICpuZ0lmPVwiIWluZGljYXRvci5hY3RpdmVcIiBsb2FkTW9kZT1cImFzeW5jXCIgc3JjPVwifi9pbWFnZXMvaWNvbi9pbmRpY2F0b3JfYmx1ZV9kZWFjdGl2ZS5wbmdcIiAodGFwKT1Hb1RvU2xpZGUoaSk7PjwvSW1hZ2U+XG5cdFx0XHRcdFx0PC9TdGFja0xheW91dD5cblx0XHRcdFx0PC9TdGFja0xheW91dD5cblx0XHRcdDwvR3JpZExheW91dD5cblx0XHQ8L0dyaWRMYXlvdXQ+XHRcdFxuXHRgLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG5leHBvcnQgY2xhc3MgU2xpZGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IFNsaWRlQ29tcG9uZW50KSkgc2xpZGVzOiBRdWVyeUxpc3Q8U2xpZGVDb21wb25lbnQ+O1xuXG5cdC8vQFZpZXdDaGlsZCgnZm9vdGVyJykgZm9vdGVyOiBFbGVtZW50UmVmO1xuXHRASW5wdXQoJ3BhZ2VXaWR0aCcpIHBhZ2VXaWR0aDogbnVtYmVyO1xuXHRASW5wdXQoJ3BhZ2VIZWlnaHQnKSBwYWdlSGVpZ2h0OiBudW1iZXI7XG5cdEBJbnB1dCgnbG9vcCcpIGxvb3A6IGJvb2xlYW47XG5cdEBJbnB1dCgncGFnZUluZGljYXRvcnMnKSBwYWdlSW5kaWNhdG9yczogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmFuc2l0aW9uaW5nOiBib29sZWFuO1xuXHRwcml2YXRlIGRpcmVjdGlvbjogZGlyZWN0aW9uID0gZGlyZWN0aW9uLm5vbmU7XG5cblx0aW5kaWNhdG9yczogSUluZGljYXRvcnNbXTtcblx0Y3VycmVudFNsaWRlOiBJU2xpZGVNYXA7XG5cdF9zbGlkZU1hcDogSVNsaWRlTWFwW107XG5cblx0Z2V0IGhhc05leHQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhdGhpcy5jdXJyZW50U2xpZGUgJiYgISF0aGlzLmN1cnJlbnRTbGlkZS5yaWdodDtcblx0fVxuXHRnZXQgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhdGhpcy5jdXJyZW50U2xpZGUgJiYgISF0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgcGFnZTogUGFnZSwgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuXHRcdHRoaXMuaW5kaWNhdG9ycyA9IFtdO1xuXG5cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMubG9vcCA9IHRoaXMubG9vcCA/IHRoaXMubG9vcCA6IGZhbHNlO1xuXHRcdHRoaXMucGFnZUluZGljYXRvcnMgPSB0aGlzLnBhZ2VJbmRpY2F0b3JzID8gdGhpcy5wYWdlSW5kaWNhdG9ycyA6IGZhbHNlO1xuXG5cdFx0dGhpcy5wYWdlV2lkdGggPSB0aGlzLnBhZ2VXaWR0aCA/IHRoaXMucGFnZVdpZHRoIDogcGxhdGZvcm0uc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuXHRcdHRoaXMucGFnZUhlaWdodCA9IHRoaXMucGFnZUhlaWdodCA/IHRoaXMucGFnZUhlaWdodCA6IHBsYXRmb3JtLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XG5cblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHQvLyBsb29wIHRocm91Z2ggc2xpZGVzIGFuZCBzZXR1cCBoZWlnaHQgYW5kIHdpZGl0aFxuLyogc2V0VGltZW91dCgoKSA9PiB7IFxuXHRcdHRoaXMuc2V0U2xpZGVyQ29uZmlndXJhdGlvbigpO1xuXHRcdCAgfSwgNTAwMCk7Ki9cblx0XHQgIHRoaXMuc2V0U2xpZGVyQ29uZmlndXJhdGlvbigpO1xuXHR9XG5cblx0cHVibGljIHNldFNsaWRlckNvbmZpZ3VyYXRpb24oKSB7XG5cblx0XHR0aGlzLnNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVDb21wb25lbnQpID0+IHtcblxuXHRcdFx0QWJzb2x1dGVMYXlvdXQuc2V0TGVmdChzbGlkZS5sYXlvdXQsIHRoaXMucGFnZVdpZHRoKVxuXHRcdFx0Ly8gXHRcdC8vc2xpZGUuc2xpZGVXaWR0aCA9IHRoaXMucGFnZVdpZHRoO1xuXHRcdFx0c2xpZGUuc2xpZGVXaWR0aCA9IFwiMTAwJVwiO1xuXHRcdFx0c2xpZGUuc2xpZGVIZWlnaHQgPSBcIjE0MFwiO1xuXHRcdFx0Ly8gXHRcdC8vc2xpZGUuc2xpZGVIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQ7XG5cdFx0fSk7XG5cdFx0dGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLmJ1aWxkU2xpZGVNYXAodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcblxuXHRcdGlmICh0aGlzLnBhZ2VJbmRpY2F0b3JzKSB7XHRcdFxuXHRcdFx0dGhpcy5idWlsZEZvb3Rlcih0aGlzLnNsaWRlcy5sZW5ndGgpO1xuXG5cdFx0fVxuXHRcdHRoaXMuc2V0QWN0aXZlUGFnZUluZGljYXRvcigwKTtcblx0XHRpZiAodGhpcy5jdXJyZW50U2xpZGUpIHtcblx0XHRcdHRoaXMucG9zaXRpb25TbGlkZXModGhpcy5jdXJyZW50U2xpZGUpO1xuXHRcdFx0dGhpcy5hcHBseVN3aXBlKHRoaXMucGFnZVdpZHRoKTtcblx0XHR9XG5cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXG5cdH1cblxuXHQvL2Zvb3RlciBzdHVmZlxuXHRwcml2YXRlIGJ1aWxkRm9vdGVyKHBhZ2VDb3VudDogbnVtYmVyID0gNSk6IHZvaWQge1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKGluZGV4IDwgcGFnZUNvdW50KSB7XG5cdFx0XHR0aGlzLmluZGljYXRvcnMucHVzaCh7IGFjdGl2ZTogZmFsc2UgfSk7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH1cblx0fVxuXG5cdHNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IoYWN0aXZlSW5kZXg6IG51bWJlcikge1xuXHRcdHRoaXMuaW5kaWNhdG9ycy5tYXAoKGluZGljYXRvcjogSUluZGljYXRvcnMsIGluZGV4OiBudW1iZXIpID0+IHtcblx0XHRcdGlmIChpbmRleCA9PSBhY3RpdmVJbmRleCkge1xuXHRcdFx0XHRpbmRpY2F0b3IuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluZGljYXRvci5hY3RpdmUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuaW5kaWNhdG9ycyA9IFsuLi50aGlzLmluZGljYXRvcnNdO1xuXHRcdHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXG5cdC8vIHByaXZhdGUgIGZ1bmN0aW9uc1xuXHRwcml2YXRlIHNldHVwUGFuZWwoc2xpZGU6IElTbGlkZU1hcCkge1xuXHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLm5vbmU7XG5cdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0Lm9mZigncGFuJyk7XG5cdFx0dGhpcy5jdXJyZW50U2xpZGUgPSBzbGlkZTtcblxuXHRcdC8vIHNldHMgdXAgZWFjaCBzbGlkZSBzbyB0aGF0IHRoZXkgYXJlIHBvc2l0aW9uZWQgdG8gdHJhbnNpdGlvbiBlaXRoZXIgd2F5LlxuXHRcdHRoaXMucG9zaXRpb25TbGlkZXModGhpcy5jdXJyZW50U2xpZGUpO1xuXG5cdFx0Ly9pZiAodGhpcy5kaXNhYmxlUGFuID09PSBmYWxzZSkge1xuXHRcdHRoaXMuYXBwbHlTd2lwZSh0aGlzLnBhZ2VXaWR0aCk7XG5cdFx0Ly99XG5cblxuXHRcdHRoaXMuc2V0QWN0aXZlUGFnZUluZGljYXRvcih0aGlzLmN1cnJlbnRTbGlkZS5pbmRleCk7XG5cblx0fVxuXG5cdHByaXZhdGUgcG9zaXRpb25TbGlkZXMoc2xpZGU6IElTbGlkZU1hcCkge1xuXHRcdC8vIHNldHMgdXAgZWFjaCBzbGlkZSBzbyB0aGF0IHRoZXkgYXJlIHBvc2l0aW9uZWQgdG8gdHJhbnNpdGlvbiBlaXRoZXIgd2F5LlxuXHRcdGlmIChzbGlkZS5sZWZ0ICE9IG51bGwgJiYgc2xpZGUubGVmdC5zbGlkZSAhPSBudWxsKSB7XG5cdFx0XHRzbGlkZS5sZWZ0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoICogMjtcblx0XHR9XG5cdFx0c2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XG5cdFx0aWYgKHNsaWRlLnJpZ2h0ICE9IG51bGwgJiYgc2xpZGUucmlnaHQuc2xpZGUgIT0gbnVsbCkge1xuXHRcdFx0c2xpZGUucmlnaHQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAwO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc2hvd1JpZ2h0U2xpZGUoc2xpZGVNYXA6IElTbGlkZU1hcCwgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLnBhZ2VXaWR0aCwgZW5kaW5nVmVsb2NpdHk6IG51bWJlciA9IDIsIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XG5cdFx0bGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XG5cdFx0YW5pbWF0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjsgLy8gZGVmYXVsdCB2YWx1ZVxuXG5cdFx0bGV0IHRyYW5zaXRpb24gPSBuZXcgQXJyYXkoKTtcblxuXHRcdHRyYW5zaXRpb24ucHVzaCh7XG5cdFx0XHR0YXJnZXQ6IHNsaWRlTWFwLnJpZ2h0LnNsaWRlLmxheW91dCxcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcblx0XHRcdGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0fSk7XG5cdFx0dHJhbnNpdGlvbi5wdXNoKHtcblx0XHRcdHRhcmdldDogc2xpZGVNYXAuc2xpZGUubGF5b3V0LFxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCAqIDIsIHk6IDAgfSxcblx0XHRcdGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0fSk7XG5cdFx0bGV0IGFuaW1hdGlvblNldCA9IG5ldyBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uKHRyYW5zaXRpb24sIGZhbHNlKTtcblxuXHRcdHJldHVybiBhbmltYXRpb25TZXQucGxheSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBzaG93TGVmdFNsaWRlKHNsaWRlTWFwOiBJU2xpZGVNYXAsIG9mZnNldDogbnVtYmVyID0gdGhpcy5wYWdlV2lkdGgsIGVuZGluZ1ZlbG9jaXR5OiBudW1iZXIgPSAyLCBkdXJhdGlvbjogbnVtYmVyID0gMjAwKTogQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvblByb21pc2Uge1xuXG5cdFx0bGV0IGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XG5cdFx0YW5pbWF0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjsgLy8gZGVmYXVsdCB2YWx1ZVxuXHRcdGxldCB0cmFuc2l0aW9uID0gbmV3IEFycmF5KCk7XG5cblx0XHR0cmFuc2l0aW9uLnB1c2goe1xuXHRcdFx0dGFyZ2V0OiBzbGlkZU1hcC5sZWZ0LnNsaWRlLmxheW91dCxcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcblx0XHRcdGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0fSk7XG5cdFx0dHJhbnNpdGlvbi5wdXNoKHtcblx0XHRcdHRhcmdldDogc2xpZGVNYXAuc2xpZGUubGF5b3V0LFxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdGR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvbixcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0fSk7XG5cdFx0bGV0IGFuaW1hdGlvblNldCA9IG5ldyBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uKHRyYW5zaXRpb24sIGZhbHNlKTtcblxuXHRcdHJldHVybiBhbmltYXRpb25TZXQucGxheSgpO1xuXG5cdH1cblx0b25QYW4oYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdGFsZXJ0KFwiamFpXCIpO1xuXHRcdGNvbnNvbGUuZGlyKGFyZ3MpO1xuXHR9XG5cdHB1YmxpYyBhcHBseVN3aXBlKHBhZ2VXaWR0aDogbnVtYmVyKTogdm9pZCB7XG5cdFx0bGV0IHByZXZpb3VzRGVsdGEgPSAtMTsgLy9oYWNrIHRvIGdldCBhcm91bmQgaW9zIGZpcmluZyBwYW4gZXZlbnQgYWZ0ZXIgcmVsZWFzZVxuXHRcdGxldCBlbmRpbmdWZWxvY2l0eSA9IDA7XG5cdFx0bGV0IHN0YXJ0VGltZSwgZGVsdGFUaW1lO1xuXHRcdHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC5vbihnZXN0dXJlcy5HZXN0dXJlVHlwZXMudGFwLCAoYXJncyk6IGFueSA9Pntcblx0XHRcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2FjY291bnRzL2hvbWVcIl0sIHtcblx0XHRcdFx0YW5pbWF0ZWQ6IGZhbHNlXG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC5vbihnZXN0dXJlcy5HZXN0dXJlVHlwZXMucGFuLCAoYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSk6IHZvaWQgPT4ge1xuXHRcdFx0aWYgKGFyZ3Muc3RhdGUgPT09IGdlc3R1cmVzLkdlc3R1cmVTdGF0ZVR5cGVzLmJlZ2FuKSB7XG5cdFx0XHRcdHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRcdHByZXZpb3VzRGVsdGEgPSAwO1xuXHRcdFx0XHRlbmRpbmdWZWxvY2l0eSA9IDI1MDtcblxuXHRcdFx0XHQvL3RoaXMudHJpZ2dlclN0YXJ0RXZlbnQoKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJncy5zdGF0ZSA9PT0gZ2VzdHVyZXMuR2VzdHVyZVN0YXRlVHlwZXMuZW5kZWQpIHtcblx0XHRcdFx0ZGVsdGFUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcblx0XHRcdFx0Ly8gaWYgdmVsb2NpdHlTY3JvbGxpbmcgaXMgZW5hYmxlZCB0aGVuIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHR5XG5cblx0XHRcdFx0Ly8gc3dpcGluZyBsZWZ0IHRvIHJpZ2h0LlxuXHRcdFx0XHRpZiAoYXJncy5kZWx0YVggPiAocGFnZVdpZHRoIC8gOCkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5oYXNQcmV2aW91cykge1xuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMuc2hvd0xlZnRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgYXJncy5kZWx0YVgsIGVuZGluZ1ZlbG9jaXR5KS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlICYmIHRoaXMuY3VycmVudFNsaWRlLmxlZnQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50U2xpZGUubGVmdCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNoYW5nZUV2ZW50TGVmdFRvUmlnaHQoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL1dlJ3JlIGF0IHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0Ly9Ob3RpZnkgbm8gbW9yZSBzbGlkZXNcblx0XHRcdFx0XHRcdC8vdGhpcy50cmlnZ2VyQ2FuY2VsRXZlbnQoY2FuY2VsbGF0aW9uUmVhc29uLm5vUHJldlNsaWRlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzd2lwaW5nIHJpZ2h0IHRvIGxlZnRcblx0XHRcdFx0ZWxzZSBpZiAoYXJncy5kZWx0YVggPCAoLXBhZ2VXaWR0aCAvIDgpKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTmV4dCkge1xuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMuc2hvd1JpZ2h0U2xpZGUodGhpcy5jdXJyZW50U2xpZGUsIGFyZ3MuZGVsdGFYLCBlbmRpbmdWZWxvY2l0eSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZSAmJiB0aGlzLmN1cnJlbnRTbGlkZS5yaWdodCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRTbGlkZS5yaWdodCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBOb3RpZnkgY2hhbmdlZFxuXHRcdFx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNoYW5nZUV2ZW50UmlnaHRUb0xlZnQoKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuaGFzTmV4dCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIE5vdGlmeSBmaW5zaWhlZFxuXHRcdFx0XHRcdFx0XHRcdC8vIHRoaXMubm90aWZ5KHtcblx0XHRcdFx0XHRcdFx0XHQvLyBcdGV2ZW50TmFtZTogU2xpZGVDb250YWluZXIuRklOSVNIRURfRVZFTlQsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gXHRvYmplY3Q6IHRoaXNcblx0XHRcdFx0XHRcdFx0XHQvLyB9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFdlJ3JlIGF0IHRoZSBlbmRcblx0XHRcdFx0XHRcdC8vIE5vdGlmeSBubyBtb3JlIHNsaWRlc1xuXHRcdFx0XHRcdFx0Ly90aGlzLnRyaWdnZXJDYW5jZWxFdmVudChjYW5jZWxsYXRpb25SZWFzb24ubm9Nb3JlU2xpZGVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCh0aGlzLnRyYW5zaXRpb25pbmcgPT09IGZhbHNlKSB8fCAoYXJncy5zdGF0ZSA9PT0gMykpIHtcblx0XHRcdFx0XHQvL05vdGlmeSBjYW5jZWxsZWRcblx0XHRcdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi51c2VyKTtcblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC5hbmltYXRlKHtcblx0XHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGgsIHk6IDAgfSxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0XHRcdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmICh0aGlzLmhhc05leHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0LnNsaWRlLmxheW91dC5hbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDIwMCxcblx0XHRcdFx0XHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0aWYgKGFwcC5pb3MpIC8vZm9yIHNvbWUgcmVhc29uIGkgaGF2ZSB0byBzZXQgdGhlc2UgaW4gaW9zIG9yIHRoZXJlIGlzIHNvbWUgc29ydCBvZiBib3VuY2UgYmFjay5cblx0XHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50U2xpZGUucmlnaHQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGhpcy5oYXNQcmV2aW91cykge1xuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50U2xpZGUubGVmdC5zbGlkZS5sYXlvdXQuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0XHRcdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChhcHAuaW9zKVxuXHRcdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5sZWZ0LnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gLXRoaXMucGFnZVdpZHRoO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChhcHAuaW9zKVxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50U2xpZGUuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XG5cblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCF0aGlzLnRyYW5zaXRpb25pbmdcblx0XHRcdFx0XHQmJiBwcmV2aW91c0RlbHRhICE9PSBhcmdzLmRlbHRhWFxuXHRcdFx0XHRcdCYmIGFyZ3MuZGVsdGFYICE9IG51bGxcblx0XHRcdFx0XHQmJiBhcmdzLmRlbHRhWCA8IDApIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc05leHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IGFyZ3MuZGVsdGFYIC0gdGhpcy5wYWdlV2lkdGg7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTbGlkZS5yaWdodC5zbGlkZS5sYXlvdXQudHJhbnNsYXRlWCA9IGFyZ3MuZGVsdGFYO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLnRyYW5zaXRpb25pbmdcblx0XHRcdFx0XHQmJiBwcmV2aW91c0RlbHRhICE9PSBhcmdzLmRlbHRhWFxuXHRcdFx0XHRcdCYmIGFyZ3MuZGVsdGFYICE9IG51bGxcblx0XHRcdFx0XHQmJiBhcmdzLmRlbHRhWCA+IDApIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc1ByZXZpb3VzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5yaWdodDtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLnNsaWRlLmxheW91dC50cmFuc2xhdGVYID0gYXJncy5kZWx0YVggLSB0aGlzLnBhZ2VXaWR0aDtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFNsaWRlLmxlZnQuc2xpZGUubGF5b3V0LnRyYW5zbGF0ZVggPSAtKHRoaXMucGFnZVdpZHRoICogMikgKyBhcmdzLmRlbHRhWDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXJncy5kZWx0YVggIT09IDApIHtcblx0XHRcdFx0XHRwcmV2aW91c0RlbHRhID0gYXJncy5kZWx0YVg7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBidWlsZFNsaWRlTWFwKHNsaWRlczogU2xpZGVDb21wb25lbnRbXSkge1xuXHRcdHRoaXMuX3NsaWRlTWFwID0gW107XG5cdFx0c2xpZGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZUNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0dGhpcy5fc2xpZGVNYXAucHVzaCh7XG5cdFx0XHRcdHNsaWRlOiBzbGlkZSxcblx0XHRcdFx0aW5kZXg6IGluZGV4LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fc2xpZGVNYXAuZm9yRWFjaCgobWFwcGluZzogSVNsaWRlTWFwLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXSAhPSBudWxsKVxuXHRcdFx0XHRtYXBwaW5nLmxlZnQgPSB0aGlzLl9zbGlkZU1hcFtpbmRleCAtIDFdO1xuXHRcdFx0aWYgKHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV0gIT0gbnVsbClcblx0XHRcdFx0bWFwcGluZy5yaWdodCA9IHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV07XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5sb29wKSB7XG5cdFx0XHR0aGlzLl9zbGlkZU1hcFswXS5sZWZ0ID0gdGhpcy5fc2xpZGVNYXBbdGhpcy5fc2xpZGVNYXAubGVuZ3RoIC0gMV07XG5cdFx0XHR0aGlzLl9zbGlkZU1hcFt0aGlzLl9zbGlkZU1hcC5sZW5ndGggLSAxXS5yaWdodCA9IHRoaXMuX3NsaWRlTWFwWzBdO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2xpZGVNYXBbMF07XG5cdH1cblxuXHRwdWJsaWMgR29Ub1NsaWRlKG51bTogbnVtYmVyLCB0cmF2ZXJzZUR1cmF0aW9uOiBudW1iZXIgPSA1MCwgbGFuZGluZ0R1cmF0aW9uOiBudW1iZXIgPSAyMDApOiB2b2lkIHtcblx0XHRpZiAodGhpcy5jdXJyZW50U2xpZGUuaW5kZXggPT0gbnVtKSByZXR1cm47XG5cblx0XHR2YXIgZHVyYXRpb246IG51bWJlciA9IGxhbmRpbmdEdXJhdGlvbjtcblx0XHRpZiAoTWF0aC5hYnMobnVtIC0gdGhpcy5jdXJyZW50U2xpZGUuaW5kZXgpICE9IDEpIGR1cmF0aW9uID0gdHJhdmVyc2VEdXJhdGlvbjtcblxuXHRcdGlmICh0aGlzLmN1cnJlbnRTbGlkZS5pbmRleCA8IG51bSlcblx0XHRcdHRoaXMubmV4dFNsaWRlKGR1cmF0aW9uKS50aGVuKCgpID0+IHRoaXMuR29Ub1NsaWRlKG51bSkpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMucHJldmlvdXNTbGlkZShkdXJhdGlvbikudGhlbigoKSA9PiB0aGlzLkdvVG9TbGlkZShudW0pKTtcblx0fVxuXG5cdHB1YmxpYyBuZXh0U2xpZGUoZHVyYXRpb24/OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuXHRcdGlmICghdGhpcy5oYXNOZXh0KSB7XG5cdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XG5cdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHQvL1x0dGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xuXHRcdHJldHVybiB0aGlzLnNob3dSaWdodFNsaWRlKHRoaXMuY3VycmVudFNsaWRlLCBudWxsLCBudWxsLCBkdXJhdGlvbikudGhlbigoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5jdXJyZW50U2xpZGUgJiYgdGhpcy5jdXJyZW50U2xpZGUucmlnaHQpIHtcblx0XHRcdFx0dGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLnJpZ2h0KTtcblx0XHRcdH1cblx0XHRcdC8vdGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRSaWdodFRvTGVmdCgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHRwdWJsaWMgcHJldmlvdXNTbGlkZShkdXJhdGlvbj86IG51bWJlcik6IFByb21pc2U8YW55PiB7XG5cdFx0aWYgKCF0aGlzLmhhc1ByZXZpb3VzKSB7XG5cdFx0XHQvL3RoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub1ByZXZTbGlkZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLnJpZ2h0O1xuXHRcdHRoaXMudHJhbnNpdGlvbmluZyA9IHRydWU7XG5cdFx0Ly90aGlzLnRyaWdnZXJTdGFydEV2ZW50KCk7XG5cdFx0cmV0dXJuIHRoaXMuc2hvd0xlZnRTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSwgbnVsbCwgbnVsbCwgZHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuY3VycmVudFNsaWRlICYmIHRoaXMuY3VycmVudFNsaWRlLmxlZnQpIHtcblx0XHRcdFx0dGhpcy5zZXR1cFBhbmVsKHRoaXMuY3VycmVudFNsaWRlLmxlZnQpO1xuXHRcdFx0fVxuXHRcdFx0Ly90aGlzLnRyaWdnZXJDaGFuZ2VFdmVudExlZnRUb1JpZ2h0KCk7XG5cdFx0fSk7XG5cdH1cbn0iXX0=