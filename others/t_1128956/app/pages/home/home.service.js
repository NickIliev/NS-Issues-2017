"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_service_1 = require("../../shared/services/global.service");
var HomeService = (function () {
    function HomeService(_globalService) {
        this._globalService = _globalService;
    }
    HomeService.prototype.getOnloadData = function () {
        return this._globalService.globalGet("homepagememberprofile_stub");
    };
    HomeService.prototype.getHealthyLiving = function () {
        return this._globalService.globalGet("home/living");
    };
    HomeService.prototype.getAuthInfo = function () {
        return [
            {
                "userState": "RV",
                "firstName": "Steve",
                "lastName": "Applessed",
                "mobileNo": "1234567890",
                "email": "ramya.bojanala@gmail.com",
                "dob": "12/12/1990",
                "memberId": "",
                "ssn": "",
            }
        ];
    };
    HomeService.prototype.getNewUserAuthInfo = function () {
        return [
            {
                "userState": "",
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
    return HomeService;
}());
HomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [global_service_1.GlobalService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUFxRTtBQU9yRSxJQUFhLFdBQVc7SUFFcEIscUJBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQ2pELENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELHNDQUFnQixHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxJQUFJO2dCQUNkLFdBQVcsRUFBRSxPQUFPO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDN0IsVUFBVSxFQUFDLFlBQVk7Z0JBQ2pCLE9BQU8sRUFBQywwQkFBMEI7Z0JBQ3hDLEtBQUssRUFBQyxZQUFZO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2dCQUNkLEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDQSxDQUFDO0lBQ0osQ0FBQztJQUNBLHdDQUFrQixHQUFsQjtRQUNBLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxFQUFFO2dCQUNaLFdBQVcsRUFBRSxFQUFFO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2dCQUNwQixVQUFVLEVBQUMsRUFBRTtnQkFDUCxPQUFPLEVBQUMsRUFBRTtnQkFDaEIsS0FBSyxFQUFDLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNBLENBQUM7SUFDSixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FHMkIsOEJBQWE7R0FGeEMsV0FBVyxDQXdDdkI7QUF4Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgR2xvYmFsU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2xvYmFsLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCB7IEhvbWVNb2RlbCwgSGVhbHRoeUxpdmluZyB9IGZyb20gXCIuL2hvbWUubW9kZWxcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIb21lU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZ2xvYmFsU2VydmljZTogR2xvYmFsU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldE9ubG9hZERhdGEoKTogT2JzZXJ2YWJsZTxIb21lTW9kZWw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsU2VydmljZS5nbG9iYWxHZXQoXCJob21lcGFnZW1lbWJlcnByb2ZpbGVfc3R1YlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWFsdGh5TGl2aW5nKCk6IE9ic2VydmFibGU8SGVhbHRoeUxpdmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nbG9iYWxTZXJ2aWNlLmdsb2JhbEdldChcImhvbWUvbGl2aW5nXCIpO1xyXG4gICAgfVxyXG4gICAgZ2V0QXV0aEluZm8oKXtcclxuICAgICByZXR1cm4gICBbXHJcbiAgICAgIHtcclxuXHQgICAgXCJ1c2VyU3RhdGVcIjpcIlJWXCIsXHJcbiAgICAgICBcImZpcnN0TmFtZVwiOiBcIlN0ZXZlXCIsXHJcbiAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc3NlZFwiLFxyXG5cdFx0XCJtb2JpbGVOb1wiOlwiMTIzNDU2Nzg5MFwiLFxyXG4gICAgICAgIFwiZW1haWxcIjpcInJhbXlhLmJvamFuYWxhQGdtYWlsLmNvbVwiLFxyXG5cdFx0XCJkb2JcIjpcIjEyLzEyLzE5OTBcIixcdFx0XHJcbiAgICAgICAgXCJtZW1iZXJJZFwiOiBcIlwiLFxyXG4gICAgICAgIFwic3NuXCI6IFwiXCIsICAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgXTtcclxuICAgIH1cclxuICAgICBnZXROZXdVc2VyQXV0aEluZm8oKXtcclxuICAgICByZXR1cm4gICBbXHJcbiAgICAgIHtcclxuXHQgICAgXCJ1c2VyU3RhdGVcIjpcIlwiLFxyXG4gICAgICAgXCJmaXJzdE5hbWVcIjogXCJcIixcclxuICAgICAgICBcImxhc3ROYW1lXCI6IFwiXCIsXHJcblx0XHRcIm1vYmlsZU5vXCI6XCJcIixcclxuICAgICAgICBcImVtYWlsXCI6XCJcIixcclxuXHRcdFwiZG9iXCI6XCJcIixcdFx0XHJcbiAgICAgICAgXCJtZW1iZXJJZFwiOiBcIlwiLFxyXG4gICAgICAgIFwic3NuXCI6IFwiXCIsICAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgXTtcclxuICAgIH1cclxufSJdfQ==