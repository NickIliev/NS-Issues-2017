"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.downloadCounts = [
            { month: "Jan", downloads: 123 },
            { month: "Feb", downloads: 456 }
        ];
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            template: "\n<GridLayout>\n    <RadCartesianChart>\n        <CategoricalAxis tkCartesianHorizontalAxis></CategoricalAxis>\n        <LinearAxis tkCartesianVerticalAxis></LinearAxis>\n        <BarSeries tkCartesianSeries [items]=\"downloadCounts\" categoryProperty=\"month\" valueProperty=\"downloads\"></BarSeries>\n    </RadCartesianChart>\n</GridLayout>\n"
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQWUxQztJQWJBO1FBY0ksbUJBQWMsR0FBRztZQUNiLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2hDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ25DLENBQUE7SUFDTCxDQUFDO0lBTFksYUFBYTtRQWJ6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyVkFRYjtTQUNBLENBQUM7T0FDVyxhQUFhLENBS3pCO0lBQUQsb0JBQUM7Q0FBQSxBQUxELElBS0M7QUFMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlOiBgXG48R3JpZExheW91dD5cbiAgICA8UmFkQ2FydGVzaWFuQ2hhcnQ+XG4gICAgICAgIDxDYXRlZ29yaWNhbEF4aXMgdGtDYXJ0ZXNpYW5Ib3Jpem9udGFsQXhpcz48L0NhdGVnb3JpY2FsQXhpcz5cbiAgICAgICAgPExpbmVhckF4aXMgdGtDYXJ0ZXNpYW5WZXJ0aWNhbEF4aXM+PC9MaW5lYXJBeGlzPlxuICAgICAgICA8QmFyU2VyaWVzIHRrQ2FydGVzaWFuU2VyaWVzIFtpdGVtc109XCJkb3dubG9hZENvdW50c1wiIGNhdGVnb3J5UHJvcGVydHk9XCJtb250aFwiIHZhbHVlUHJvcGVydHk9XCJkb3dubG9hZHNcIj48L0JhclNlcmllcz5cbiAgICA8L1JhZENhcnRlc2lhbkNoYXJ0PlxuPC9HcmlkTGF5b3V0PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcbiAgICBkb3dubG9hZENvdW50cyA9IFtcbiAgICAgICAgeyBtb250aDogXCJKYW5cIiwgZG93bmxvYWRzOiAxMjMgfSxcbiAgICAgICAgeyBtb250aDogXCJGZWJcIiwgZG93bmxvYWRzOiA0NTYgfVxuICAgIF1cbn0iXX0=