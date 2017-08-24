"use strict";
var core_1 = require("@angular/core");
var orientation = require('nativescript-orientation');
var AppComponent = (function () {
    function AppComponent() {
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQU10RDtJQUFBO0lBS0EsQ0FBQztJQUhVLDRCQUFLLEdBQVo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFSTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7O29CQUFBO0lBTUYsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLG9CQUFZLGVBS3hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG52YXIgb3JpZW50YXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtb3JpZW50YXRpb24nKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgb25UYXAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG9yaWVudGF0aW9uLmdldE9yaWVudGF0aW9uKCkpOyAgXG4gICAgfVxufVxuIl19