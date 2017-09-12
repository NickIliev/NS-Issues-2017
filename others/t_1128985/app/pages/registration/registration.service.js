"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_service_1 = require("../../shared/services/global.service");
var RegistrationService = (function () {
    function RegistrationService(_globalService) {
        this._globalService = _globalService;
    }
    RegistrationService.prototype.createUser = function (params) {
        return this._globalService.globalPost("register_stub", params);
    };
    RegistrationService.prototype.verifyUser = function (params) {
        return this._globalService.globalPost("verify_stub", params);
    };
    RegistrationService.prototype.getAuthInfo = function () {
        return [
            {
                "userState": "RNV",
                "firstName": "",
                "lastName": "",
                "mobileNo": "",
                "email": "",
                "dob": "",
                "memberId": "",
                "ssn": "",
            }
        ];
    };
    return RegistrationService;
}());
RegistrationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [global_service_1.GlobalService])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyx1RUFBcUU7QUFPckUsSUFBYSxtQkFBbUI7SUFHNUIsNkJBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQ2pELENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNELHdDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0QseUNBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxLQUFLO2dCQUNkLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFVBQVUsRUFBRSxFQUFFO2dCQUNwQixVQUFVLEVBQUMsRUFBRTtnQkFDUCxPQUFPLEVBQUMsRUFBRTtnQkFDaEIsS0FBSyxFQUFDLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNBLENBQUM7SUFDSixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFO3FDQUkyQiw4QkFBYTtHQUh4QyxtQkFBbUIsQ0EwQi9CO0FBMUJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2xvYmFsLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IENyZWF0ZVVzZXIsIFZlcmlmeVVzZXIgfSBmcm9tIFwiLi9yZWdpc3RyYXRpb24ubW9kZWxcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uU2VydmljZSB7XG5wdWJsaWMgcmVnaXN0cmF0aW9uX3R5cGU6IHN0cmluZztcbnB1YmxpYyB1c2VyX25hbWU6IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nbG9iYWxTZXJ2aWNlOiBHbG9iYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgY3JlYXRlVXNlcihwYXJhbXMpOiBPYnNlcnZhYmxlPENyZWF0ZVVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbFNlcnZpY2UuZ2xvYmFsUG9zdChcInJlZ2lzdGVyX3N0dWJcIiwgcGFyYW1zKTtcbiAgICB9XG4gICAgdmVyaWZ5VXNlcihwYXJhbXMpOiBPYnNlcnZhYmxlPFZlcmlmeVVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbFNlcnZpY2UuZ2xvYmFsUG9zdChcInZlcmlmeV9zdHViXCIsIHBhcmFtcyk7XG4gICAgfVxuICAgIGdldEF1dGhJbmZvKCl7XG4gICAgIHJldHVybiAgIFtcbiAgICAgIHtcblx0ICAgIFwidXNlclN0YXRlXCI6XCJSTlZcIixcbiAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJcIixcbiAgICAgICAgXCJsYXN0TmFtZVwiOiBcIlwiLFxuXHRcdFwibW9iaWxlTm9cIjpcIlwiLFxuICAgICAgICBcImVtYWlsXCI6XCJcIixcblx0XHRcImRvYlwiOlwiXCIsXHRcdFxuICAgICAgICBcIm1lbWJlcklkXCI6IFwiXCIsXG4gICAgICAgIFwic3NuXCI6IFwiXCIsICAgICAgICBcbiAgICAgIH1cbiAgICAgIF07XG4gICAgfVxufSJdfQ==