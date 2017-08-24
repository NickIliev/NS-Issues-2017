"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ExampleComponent = (function () {
    function ExampleComponent() {
        this.count = 0;
    }
    ExampleComponent.prototype.returnPressHandler = function () {
        this.count++;
    };
    ExampleComponent.prototype.resetCount = function () {
        this.count = 0;
    };
    return ExampleComponent;
}());
ExampleComponent = __decorate([
    core_1.Component({
        selector: "ns-example",
        moduleId: module.id,
        templateUrl: "./example.component.html",
    })
], ExampleComponent);
exports.ExampleComponent = ExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQU8xQyxJQUFhLGdCQUFnQjtJQUw3QjtRQU9XLFVBQUssR0FBVyxDQUFDLENBQUM7SUFVN0IsQ0FBQztJQVJVLDZDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0scUNBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGdCQUFnQjtJQUw1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwwQkFBMEI7S0FDMUMsQ0FBQztHQUNXLGdCQUFnQixDQVk1QjtBQVpZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1leGFtcGxlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9leGFtcGxlLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFeGFtcGxlQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgY291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHJldHVyblByZXNzSGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0Q291bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG59Il19