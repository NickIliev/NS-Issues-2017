"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var Link = (function () {
    function Link(title, link) {
        this.title = title;
        this.link = link;
    }
    return Link;
}());
exports.Link = Link;
var mainMenuLinks = [
    new Link("AAAAA Main", "/main")
];
var PagesComponent = (function () {
    function PagesComponent(page) {
        this.page = page;
        this.links = [];
        mainMenuLinks.sort(function (a, b) {
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();
            return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
        });
        for (var i = 0; i < mainMenuLinks.length; i++) {
            this.links.push(mainMenuLinks[i]);
        }
    }
    PagesComponent.prototype.ngOnInit = function () {
    };
    return PagesComponent;
}());
PagesComponent = __decorate([
    core_1.Component({
        selector: 'app-test',
        templateUrl: 'pages/pages.html',
    }),
    __metadata("design:paramtypes", [page_1.Page])
], PagesComponent);
exports.PagesComponent = PagesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUUvQjtJQUNJLGNBQW1CLEtBQWEsRUFBUyxJQUFZO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUksQ0FBQztJQUM5RCxXQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxvQkFBSTtBQUlqQixJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO0NBQ2xDLENBQUM7QUFPRixJQUFhLGNBQWM7SUFHekIsd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWhCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM3QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFdBQVcsRUFBRSxrQkFBa0I7S0FDaEMsQ0FBQztxQ0FLMEIsV0FBSTtHQUhuQixjQUFjLENBbUIxQjtBQW5CWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmV4cG9ydCBjbGFzcyBMaW5rIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGl0bGU6IHN0cmluZywgcHVibGljIGxpbms6IHN0cmluZykgeyB9XG59XG5cbmxldCBtYWluTWVudUxpbmtzID0gW1xuICAgIG5ldyBMaW5rKFwiQUFBQUEgTWFpblwiLCBcIi9tYWluXCIpXG5dO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtdGVzdCcsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvcGFnZXMuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgUGFnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgbGlua3M6IEFycmF5PExpbms+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgIHRoaXMubGlua3MgPSBbXTtcblxuICAgIG1haW5NZW51TGlua3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBsZXQgdGl0bGVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBsZXQgdGl0bGVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gKHRpdGxlQSA8IHRpdGxlQikgPyAtMSA6ICh0aXRsZUEgPiB0aXRsZUIpID8gMSA6IDA7XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1haW5NZW51TGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5rcy5wdXNoKG1haW5NZW51TGlua3NbaV0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG59Il19