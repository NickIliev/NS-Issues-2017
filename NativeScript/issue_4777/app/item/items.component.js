"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var Observable_1 = require("rxjs/Observable");
var ItemsComponent = (function () {
    function ItemsComponent(service) {
        this.service = service;
        var items = ["44", "55", "66"];
        var subscr;
        this.myItems = Observable_1.Observable.create(function (subscriber) {
            subscr = subscriber;
            subscriber.next(items);
            return function () {
                console.log("Unsubscribe called!");
            };
        });
        var tempItems = this.service.getPickerItems(); // mock service
        tempItems.forEach(function (element) {
            items.push(element); // pushing into the temp array
            // the subsriber will watch for changes and update myItems via the async pipe
        });
    }
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUU3Qyw4Q0FBNkQ7QUFPN0QsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQ3BDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxVQUFVO1lBQ3pDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLGVBQWU7UUFDOUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtZQUNuRCw2RUFBNkU7UUFDakYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7cUNBSStCLDBCQUFXO0dBSC9CLGNBQWMsQ0FxQjFCO0FBckJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgbXlJdGVtczogUnhPYnNlcnZhYmxlPEFycmF5PHN0cmluZz4+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBJdGVtU2VydmljZSkge1xuICAgICAgICBsZXQgaXRlbXMgPSBbXCI0NFwiLCBcIjU1XCIsIFwiNjZcIl07XG4gICAgICAgIFxuICAgICAgICBsZXQgc3Vic2NyO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBSeE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgICAgICAgc3Vic2NyID0gc3Vic2NyaWJlcjtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpdGVtcyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5zdWJzY3JpYmUgY2FsbGVkIVwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB0ZW1wSXRlbXMgPSB0aGlzLnNlcnZpY2UuZ2V0UGlja2VySXRlbXMoKTsgLy8gbW9jayBzZXJ2aWNlXG4gICAgICAgIHRlbXBJdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaXRlbXMucHVzaChlbGVtZW50KTsgLy8gcHVzaGluZyBpbnRvIHRoZSB0ZW1wIGFycmF5XG4gICAgICAgICAgICAvLyB0aGUgc3Vic3JpYmVyIHdpbGwgd2F0Y2ggZm9yIGNoYW5nZXMgYW5kIHVwZGF0ZSBteUl0ZW1zIHZpYSB0aGUgYXN5bmMgcGlwZVxuICAgICAgICB9KTtcbiAgICB9XG59Il19