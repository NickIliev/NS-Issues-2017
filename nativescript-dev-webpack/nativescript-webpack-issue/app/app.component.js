"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var person_1 = require("./models/person");
var AppComponent = (function () {
    function AppComponent() {
        this.person = person_1.person;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n    <ActionBar title=\"My App\" class=\"action-bar\"></ActionBar>\n    <StackLayout>\n        <Label text=\"test label\" class=\"red\"></Label>\n        <dynamic-form [dataObject]=\"person\"></dynamic-form>\n    </StackLayout>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBWXpDO0lBSUk7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQU0sQ0FBQztJQUN6QixDQUFDO0lBTlEsWUFBWTtRQVZ4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLDBPQU1UO1NBQ0YsQ0FBQzs7T0FDVyxZQUFZLENBT3hCO0lBQUQsbUJBQUM7Q0FBQSxBQVBELElBT0M7QUFQWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IHBlcnNvbiB9IGZyb20gJy4vbW9kZWxzL3BlcnNvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPEFjdGlvbkJhciB0aXRsZT1cIk15IEFwcFwiIGNsYXNzPVwiYWN0aW9uLWJhclwiPjwvQWN0aW9uQmFyPlxyXG4gICAgPFN0YWNrTGF5b3V0PlxyXG4gICAgICAgIDxMYWJlbCB0ZXh0PVwidGVzdCBsYWJlbFwiIGNsYXNzPVwicmVkXCI+PC9MYWJlbD5cclxuICAgICAgICA8ZHluYW1pYy1mb3JtIFtkYXRhT2JqZWN0XT1cInBlcnNvblwiPjwvZHluYW1pYy1mb3JtPlxyXG4gICAgPC9TdGFja0xheW91dD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gIFxyXG4gICAgcGVyc29uO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wZXJzb24gPSBwZXJzb247XHJcbiAgICB9XHJcbn1cclxuIl19