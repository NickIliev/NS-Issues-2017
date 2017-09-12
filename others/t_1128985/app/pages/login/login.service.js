"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_service_1 = require("../../shared/services/global.service");
var LoginService = (function () {
    function LoginService(_globalService) {
        this._globalService = _globalService;
        this.isnotify = false;
        this.isuserChange = false;
    }
    LoginService.prototype.loginUser = function (params) {
        return this._globalService.globalLoginPost("mobilelogin_stub", params);
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [global_service_1.GlobalService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdUVBQXFFO0FBT3JFLElBQWEsWUFBWTtJQU1yQixzQkFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFKMUMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQUlyQyxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLE1BQU07UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUdMLG1CQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBTzJCLDhCQUFhO0dBTnhDLFlBQVksQ0FjeEI7QUFkWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2xvYmFsLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IExvZ2luVXNlciB9IGZyb20gXCIuL2xvZ2luLm1vZGVsXCI7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XG5cbiAgICBwdWJsaWMgaXNub3RpZnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXN1c2VyQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzRW5hYmxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBpc0VuYWJsZW5vdGlmeTogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nbG9iYWxTZXJ2aWNlOiBHbG9iYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbG9naW5Vc2VyKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsU2VydmljZS5nbG9iYWxMb2dpblBvc3QoXCJtb2JpbGVsb2dpbl9zdHViXCIsIHBhcmFtcyk7XG4gICAgfVxuXG5cbn0iXX0=