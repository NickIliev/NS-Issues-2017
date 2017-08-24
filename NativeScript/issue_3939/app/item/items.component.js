"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Camera = require("nativescript-camera");
var ItemsComponent = (function () {
    function ItemsComponent() {
    }
    ItemsComponent.prototype.ngOnInit = function () {
        Camera.requestPermissions();
    };
    ItemsComponent.prototype.takePhoto = function () {
        console.log("Before taking picture");
        Camera.takePicture()
            .then(function (imageAsset) {
            console.log("Result is an image asset instance");
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDRDQUE4QztBQU85QyxJQUFhLGNBQWM7SUFBM0I7SUFjQSxDQUFDO0lBYkcsaUNBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7YUFDZixJQUFJLENBQUMsVUFBQyxVQUFVO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7R0FDVyxjQUFjLENBYzFCO0FBZFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCAqIGFzIENhbWVyYSBmcm9tICduYXRpdmVzY3JpcHQtY2FtZXJhJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBDYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSB0YWtpbmcgcGljdHVyZVwiKTtcbiAgICAgICAgQ2FtZXJhLnRha2VQaWN0dXJlKClcbiAgICAgICAgICAgIC50aGVuKChpbWFnZUFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgaXMgYW4gaW1hZ2UgYXNzZXQgaW5zdGFuY2VcIik7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtPiBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==