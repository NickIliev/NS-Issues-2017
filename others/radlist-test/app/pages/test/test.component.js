"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var TestComponent = (function () {
    function TestComponent(page) {
        this.page = page;
    }
    TestComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        selector: 'app-test',
        templateUrl: 'pages/test/test.html',
        styleUrls: ['pages/test/test-common.css'],
    }),
    __metadata("design:paramtypes", [page_1.Page])
], TestComponent);
exports.TestComponent = TestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnQ0FBK0I7QUFRL0IsSUFBYSxhQUFhO0lBQ3hCLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFbkMsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGFBQWE7SUFOekIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDMUMsQ0FBQztxQ0FHMEIsV0FBSTtHQURuQixhQUFhLENBTXpCO0FBTlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtdGVzdCcsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvdGVzdC90ZXN0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZXMvdGVzdC90ZXN0LWNvbW1vbi5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxufSJdfQ==