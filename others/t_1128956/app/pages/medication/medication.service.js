"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_service_1 = require("../../shared/services/global.service");
var MedicationService = (function () {
    function MedicationService(_globalService) {
        this._globalService = _globalService;
    }
    MedicationService.prototype.getAllMembers = function () {
        return [
            {
                "id": 4231,
                "firstName": "Steve",
                "lastName": "Appleseed",
                "type": "Subscriber"
            },
            {
                "id": 1234,
                "firstName": "Mark",
                "lastName": "Appleseed",
                "type": "Dependent"
            },
            {
                "id": 6789,
                "firstName": "Steve",
                "lastName": "Appleseed",
                "type": "Dependent"
            }
        ];
    };
    MedicationService.prototype.getAllMedications = function () {
        return [
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Franken Stein",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "06/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Aersol",
                "form": "powder",
                "dosage": "10mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Mary Smith",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "05/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Mary Stein",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "04/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Clarke Kent",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "03/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Franken Stein",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "02/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Aersol",
                "form": "powder",
                "dosage": "10mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Mary Smith",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "02/02/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Mary Stein",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "01/28/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Clarke Kent",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "01/14/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Clarke Kent",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "01/14/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            },
            {
                "medicationId": "74523",
                "medicationName": "Diazepam",
                "form": "Tab",
                "dosage": "2mg",
                "pharmacyName": "ABC Medical Association",
                "doctorname": "Clarke Kent",
                "address1": "101, Federal Way",
                "city": "Boston",
                "state": "MA",
                "zipcode": "12836",
                "doctorMobile": "+18573739515",
                "pharmacyMobile": "+16172764762",
                "lastDateFill": [
                    "01/14/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                ]
            }
        ];
    };
    return MedicationService;
}());
MedicationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [global_service_1.GlobalService])
], MedicationService);
exports.MedicationService = MedicationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUFxRTtBQUlyRSxJQUFhLGlCQUFpQjtJQUs1QiwyQkFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7SUFDakQsQ0FBQztJQUVNLHlDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDO1lBQ0M7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixNQUFNLEVBQUUsWUFBWTthQUN2QjtZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDdkIsTUFBTSxFQUFFLFdBQVc7YUFDdEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsT0FBTztnQkFDcEIsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxXQUFXO2FBQ3RCO1NBQ0osQ0FBQztJQUNWLENBQUM7SUFFUSw2Q0FBaUIsR0FBeEI7UUFDRSxNQUFNLENBQUM7WUFDTDtnQkFDSSxjQUFjLEVBQUUsT0FBTztnQkFDdkIsZ0JBQWdCLEVBQUUsVUFBVTtnQkFDNUIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsY0FBYyxFQUFFLHlCQUF5QjtnQkFDekMsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsT0FBTztnQkFDbEIsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLGdCQUFnQixFQUFFLGNBQWM7Z0JBQ2hDLGNBQWMsRUFBRTtvQkFDWixZQUFZLEVB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LGdCQUFnQixFQUFFLGNBQWM7Z0JBQ2hDLGNBQWMsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZO2lCQUN6RDthQUNKO1lBQ0Q7Z0JBQ0ksY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLGdCQUFnQixFQUFFLFVBQVU7Z0JBQzVCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGNBQWMsRUFBRSx5QkFBeUI7Z0JBQ3pDLFlBQVksRUFBRSxhQUFhO2dCQUMzQixVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLGNBQWMsRUFBRSxjQUFjO2dCQUM5QixnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxjQUFjLEVBQUU7b0JBQ1osWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWTtpQkFDekQ7YUFDSjtTQUFDLENBQUM7SUFDUCxDQUFDO0lBRUgsd0JBQUM7QUFBRCxDQUFDLEFBN01ELElBNk1DO0FBN01ZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQU15Qiw4QkFBYTtHQUx0QyxpQkFBaUIsQ0E2TTdCO0FBN01ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nbG9iYWwuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWVkaWNhdGlvblNlcnZpY2Uge1xyXG5cclxuICBwdWJsaWMgaGlzdG9yeVNlbGVjdGVkTWVtYmVyOiBhbnk7XHJcbiAgcHVibGljIHNlbGVjdGVkVXNlcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nbG9iYWxTZXJ2aWNlOiBHbG9iYWxTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWxsTWVtYmVycygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogNDIzMSxcclxuICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcclxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIlN1YnNjcmliZXJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IDEyMzQsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBcIk1hcmtcIixcclxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogNjc4OSxcclxuICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcclxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG59XHJcblxyXG4gIHB1YmxpYyBnZXRBbGxNZWRpY2F0aW9ucygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcclxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxyXG4gICAgICAgICAgXCJmb3JtXCI6IFwiVGFiXCIsXHJcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjJtZ1wiLFxyXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JuYW1lXCI6IFwiRnJhbmtlbiBTdGVpblwiLFxyXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcclxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxyXG4gICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXHJcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lNb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjJcIixcclxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcclxuICAgICAgICAgICAgICBcIjA2LzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgICBcIm1lZGljYXRpb25JZFwiOiBcIjc0NTIzXCIsXHJcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiQWVyc29sXCIsXHJcbiAgICAgICAgICBcImZvcm1cIjogXCJwb3dkZXJcIixcclxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMTBtZ1wiLFxyXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JuYW1lXCI6IFwiTWFyeSBTbWl0aFwiLFxyXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcclxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxyXG4gICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXHJcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lNb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjJcIixcclxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcclxuICAgICAgICAgICAgICBcIjA1LzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgICBcIm1lZGljYXRpb25JZFwiOiBcIjc0NTIzXCIsXHJcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcclxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxyXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIybWdcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcclxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU3RlaW5cIixcclxuICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMTI4MzZcIixcclxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXHJcbiAgICAgICAgICBcImxhc3REYXRlRmlsbFwiOiBbXHJcbiAgICAgICAgICAgICAgXCIwNC8yMS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkRpYXplcGFtXCIsXHJcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcclxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TmFtZVwiOiBcIkFCQyBNZWRpY2FsIEFzc29jaWF0aW9uXCIsXHJcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJDbGFya2UgS2VudFwiLFxyXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcclxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxyXG4gICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXHJcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lNb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjJcIixcclxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcclxuICAgICAgICAgICAgICBcIjAzLzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgICBcIm1lZGljYXRpb25JZFwiOiBcIjc0NTIzXCIsXHJcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcclxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxyXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIybWdcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcclxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIkZyYW5rZW4gU3RlaW5cIixcclxuICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMTI4MzZcIixcclxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXHJcbiAgICAgICAgICBcImxhc3REYXRlRmlsbFwiOiBbXHJcbiAgICAgICAgICAgICAgXCIwMi8yMS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkFlcnNvbFwiLFxyXG4gICAgICAgICAgXCJmb3JtXCI6IFwicG93ZGVyXCIsXHJcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjEwbWdcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcclxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU21pdGhcIixcclxuICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMTI4MzZcIixcclxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXHJcbiAgICAgICAgICBcImxhc3REYXRlRmlsbFwiOiBbXHJcbiAgICAgICAgICAgICAgXCIwMi8wMi8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkRpYXplcGFtXCIsXHJcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcclxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TmFtZVwiOiBcIkFCQyBNZWRpY2FsIEFzc29jaWF0aW9uXCIsXHJcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJNYXJ5IFN0ZWluXCIsXHJcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxyXG4gICAgICAgICAgXCJjaXR5XCI6IFwiQm9zdG9uXCIsXHJcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcclxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXHJcbiAgICAgICAgICBcImRvY3Rvck1vYmlsZVwiOiBcIisxODU3MzczOTUxNVwiLFxyXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxyXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xyXG4gICAgICAgICAgICAgIFwiMDEvMjgvMjAxN1wiLCBcIjEyLzE1LzIwMTZcIiwgXCIwNi8wMy8yMDE2XCIsIFwiMTIvMTAvMjAxNVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcclxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxyXG4gICAgICAgICAgXCJmb3JtXCI6IFwiVGFiXCIsXHJcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjJtZ1wiLFxyXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JuYW1lXCI6IFwiQ2xhcmtlIEtlbnRcIixcclxuICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMTI4MzZcIixcclxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXHJcbiAgICAgICAgICBcImxhc3REYXRlRmlsbFwiOiBbXHJcbiAgICAgICAgICAgICAgXCIwMS8xNC8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxyXG4gICAgICAgICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkRpYXplcGFtXCIsXHJcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcclxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXHJcbiAgICAgICAgICBcInBoYXJtYWN5TmFtZVwiOiBcIkFCQyBNZWRpY2FsIEFzc29jaWF0aW9uXCIsXHJcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJDbGFya2UgS2VudFwiLFxyXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcclxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxyXG4gICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXHJcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxyXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lNb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjJcIixcclxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcclxuICAgICAgICAgICAgICBcIjAxLzE0LzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgICBcIm1lZGljYXRpb25JZFwiOiBcIjc0NTIzXCIsXHJcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcclxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxyXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIybWdcIixcclxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcclxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIkNsYXJrZSBLZW50XCIsXHJcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxyXG4gICAgICAgICAgXCJjaXR5XCI6IFwiQm9zdG9uXCIsXHJcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcclxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXHJcbiAgICAgICAgICBcImRvY3Rvck1vYmlsZVwiOiBcIisxODU3MzczOTUxNVwiLFxyXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxyXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xyXG4gICAgICAgICAgICAgIFwiMDEvMTQvMjAxN1wiLCBcIjEyLzE1LzIwMTZcIiwgXCIwNi8wMy8yMDE2XCIsIFwiMTIvMTAvMjAxNVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH1dO1xyXG4gIH1cclxuXHJcbn0iXX0=