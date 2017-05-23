"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_service_1 = require("./shared/login.service");
var AuthGuard = (function () {
    function AuthGuard(router, login) {
        this.router = router;
        this.login = login;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.login.getIsLogged()) {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, login_service_1.LoginService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBDQUFzRDtBQUN0RCx3REFBc0Q7QUFHdEQsSUFBYSxTQUFTO0lBQ3BCLG1CQUFvQixNQUFjLEVBQVUsS0FBa0I7UUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7SUFBSSxDQUFDO0lBRW5FLCtCQUFXLEdBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxTQUFTO0lBRHJCLGlCQUFVLEVBQUU7cUNBRWlCLGVBQU0sRUFBZ0IsNEJBQVk7R0FEbkQsU0FBUyxDQVlyQjtBQVpZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2xvZ2luLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2dpbjpMb2dpblNlcnZpY2UpIHsgfVxuXG4gIGNhbkFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLmxvZ2luLmdldElzTG9nZ2VkKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==