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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyx1RUFBcUU7QUFPckUsSUFBYSxtQkFBbUI7SUFHNUIsNkJBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQ2pELENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNELHdDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0QseUNBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxLQUFLO2dCQUNkLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFVBQVUsRUFBRSxFQUFFO2dCQUNwQixVQUFVLEVBQUMsRUFBRTtnQkFDUCxPQUFPLEVBQUMsRUFBRTtnQkFDaEIsS0FBSyxFQUFDLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNBLENBQUM7SUFDSixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFO3FDQUkyQiw4QkFBYTtHQUh4QyxtQkFBbUIsQ0EwQi9CO0FBMUJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nbG9iYWwuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHsgQ3JlYXRlVXNlciwgVmVyaWZ5VXNlciB9IGZyb20gXCIuL3JlZ2lzdHJhdGlvbi5tb2RlbFwiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvblNlcnZpY2Uge1xyXG5wdWJsaWMgcmVnaXN0cmF0aW9uX3R5cGU6IHN0cmluZztcclxucHVibGljIHVzZXJfbmFtZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZ2xvYmFsU2VydmljZTogR2xvYmFsU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVVzZXIocGFyYW1zKTogT2JzZXJ2YWJsZTxDcmVhdGVVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbFNlcnZpY2UuZ2xvYmFsUG9zdChcInJlZ2lzdGVyX3N0dWJcIiwgcGFyYW1zKTtcclxuICAgIH1cclxuICAgIHZlcmlmeVVzZXIocGFyYW1zKTogT2JzZXJ2YWJsZTxWZXJpZnlVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbFNlcnZpY2UuZ2xvYmFsUG9zdChcInZlcmlmeV9zdHViXCIsIHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBnZXRBdXRoSW5mbygpe1xyXG4gICAgIHJldHVybiAgIFtcclxuICAgICAge1xyXG5cdCAgICBcInVzZXJTdGF0ZVwiOlwiUk5WXCIsXHJcbiAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJcIixcclxuICAgICAgICBcImxhc3ROYW1lXCI6IFwiXCIsXHJcblx0XHRcIm1vYmlsZU5vXCI6XCJcIixcclxuICAgICAgICBcImVtYWlsXCI6XCJcIixcclxuXHRcdFwiZG9iXCI6XCJcIixcdFx0XHJcbiAgICAgICAgXCJtZW1iZXJJZFwiOiBcIlwiLFxyXG4gICAgICAgIFwic3NuXCI6IFwiXCIsICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG59Il19