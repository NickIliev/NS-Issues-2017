"use strict";
var core_1 = require("@angular/core");
var orientation = require('nativescript-orientation');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        orientation.enableRotation();
    };
    AppComponent.prototype.onTap = function () {
        console.log(orientation.getOrientation());
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUNsRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQU10RDtJQUFBO0lBU0EsQ0FBQztJQVJHLCtCQUFRLEdBQVI7UUFDSSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUdNLDRCQUFLLEdBQVo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFaTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7O29CQUFBO0lBVUYsbUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLG9CQUFZLGVBU3hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG52YXIgb3JpZW50YXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtb3JpZW50YXRpb24nKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIG9yaWVudGF0aW9uLmVuYWJsZVJvdGF0aW9uKCk7XG4gICAgfVxuXG4gIFxuICAgIHB1YmxpYyBvblRhcCgpIHtcbiAgICAgICAgY29uc29sZS5sb2cob3JpZW50YXRpb24uZ2V0T3JpZW50YXRpb24oKSk7ICBcbiAgICB9XG59XG4iXX0=