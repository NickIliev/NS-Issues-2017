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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUFxRTtBQU9yRSxJQUFhLFdBQVc7SUFFcEIscUJBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQ2pELENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELHNDQUFnQixHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxJQUFJO2dCQUNkLFdBQVcsRUFBRSxPQUFPO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDN0IsVUFBVSxFQUFDLFlBQVk7Z0JBQ2pCLE9BQU8sRUFBQywwQkFBMEI7Z0JBQ3hDLEtBQUssRUFBQyxZQUFZO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2dCQUNkLEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDQSxDQUFDO0lBQ0osQ0FBQztJQUNBLHdDQUFrQixHQUFsQjtRQUNBLE1BQU0sQ0FBRztZQUNSO2dCQUNELFdBQVcsRUFBQyxFQUFFO2dCQUNaLFdBQVcsRUFBRSxFQUFFO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2dCQUNwQixVQUFVLEVBQUMsRUFBRTtnQkFDUCxPQUFPLEVBQUMsRUFBRTtnQkFDaEIsS0FBSyxFQUFDLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNBLENBQUM7SUFDSixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FHMkIsOEJBQWE7R0FGeEMsV0FBVyxDQXdDdkI7QUF4Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEdsb2JhbFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dsb2JhbC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBIb21lTW9kZWwsIEhlYWx0aHlMaXZpbmcgfSBmcm9tIFwiLi9ob21lLm1vZGVsXCI7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dsb2JhbFNlcnZpY2U6IEdsb2JhbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXRPbmxvYWREYXRhKCk6IE9ic2VydmFibGU8SG9tZU1vZGVsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nbG9iYWxTZXJ2aWNlLmdsb2JhbEdldChcImhvbWVwYWdlbWVtYmVycHJvZmlsZV9zdHViXCIpO1xuICAgIH1cblxuICAgIGdldEhlYWx0aHlMaXZpbmcoKTogT2JzZXJ2YWJsZTxIZWFsdGh5TGl2aW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nbG9iYWxTZXJ2aWNlLmdsb2JhbEdldChcImhvbWUvbGl2aW5nXCIpO1xuICAgIH1cbiAgICBnZXRBdXRoSW5mbygpe1xuICAgICByZXR1cm4gICBbXG4gICAgICB7XG5cdCAgICBcInVzZXJTdGF0ZVwiOlwiUlZcIixcbiAgICAgICBcImZpcnN0TmFtZVwiOiBcIlN0ZXZlXCIsXG4gICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNzZWRcIixcblx0XHRcIm1vYmlsZU5vXCI6XCIxMjM0NTY3ODkwXCIsXG4gICAgICAgIFwiZW1haWxcIjpcInJhbXlhLmJvamFuYWxhQGdtYWlsLmNvbVwiLFxuXHRcdFwiZG9iXCI6XCIxMi8xMi8xOTkwXCIsXHRcdFxuICAgICAgICBcIm1lbWJlcklkXCI6IFwiXCIsXG4gICAgICAgIFwic3NuXCI6IFwiXCIsICAgICAgICAgXG4gICAgICB9XG4gICAgICBdO1xuICAgIH1cbiAgICAgZ2V0TmV3VXNlckF1dGhJbmZvKCl7XG4gICAgIHJldHVybiAgIFtcbiAgICAgIHtcblx0ICAgIFwidXNlclN0YXRlXCI6XCJcIixcbiAgICAgICBcImZpcnN0TmFtZVwiOiBcIlwiLFxuICAgICAgICBcImxhc3ROYW1lXCI6IFwiXCIsXG5cdFx0XCJtb2JpbGVOb1wiOlwiXCIsXG4gICAgICAgIFwiZW1haWxcIjpcIlwiLFxuXHRcdFwiZG9iXCI6XCJcIixcdFx0XG4gICAgICAgIFwibWVtYmVySWRcIjogXCJcIixcbiAgICAgICAgXCJzc25cIjogXCJcIiwgICAgICAgICBcbiAgICAgIH1cbiAgICAgIF07XG4gICAgfVxufSJdfQ==