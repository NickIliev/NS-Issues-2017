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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUFxRTtBQUlyRSxJQUFhLGlCQUFpQjtJQUs1QiwyQkFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7SUFDakQsQ0FBQztJQUVNLHlDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDO1lBQ0M7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixNQUFNLEVBQUUsWUFBWTthQUN2QjtZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDdkIsTUFBTSxFQUFFLFdBQVc7YUFDdEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsT0FBTztnQkFDcEIsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxXQUFXO2FBQ3RCO1NBQ0osQ0FBQztJQUNWLENBQUM7SUFFUSw2Q0FBaUIsR0FBeEI7UUFDRSxNQUFNLENBQUM7WUFDTDtnQkFDSSxjQUFjLEVBQUUsT0FBTztnQkFDdkIsZ0JBQWdCLEVBQUUsVUFBVTtnQkFDNUIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsY0FBYyxFQUFFLHlCQUF5QjtnQkFDekMsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsT0FBTztnQkFDbEIsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLGdCQUFnQixFQUFFLGNBQWM7Z0JBQ2hDLGNBQWMsRUFBRTtvQkFDWixZQUFZLEVB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LGdCQUFnQixFQUFFLGNBQWM7Z0JBQ2hDLGNBQWMsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZO2lCQUN6RDthQUNKO1lBQ0Q7Z0JBQ0ksY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLGdCQUFnQixFQUFFLFVBQVU7Z0JBQzVCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGNBQWMsRUFBRSx5QkFBeUI7Z0JBQ3pDLFlBQVksRUFBRSxhQUFhO2dCQUMzQixVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLGNBQWMsRUFBRSxjQUFjO2dCQUM5QixnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxjQUFjLEVBQUU7b0JBQ1osWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWTtpQkFDekQ7YUFDSjtTQUFDLENBQUM7SUFDUCxDQUFDO0lBRUgsd0JBQUM7QUFBRCxDQUFDLEFBN01ELElBNk1DO0FBN01ZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQU15Qiw4QkFBYTtHQUx0QyxpQkFBaUIsQ0E2TTdCO0FBN01ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2xvYmFsLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZWRpY2F0aW9uU2VydmljZSB7XG5cbiAgcHVibGljIGhpc3RvcnlTZWxlY3RlZE1lbWJlcjogYW55O1xuICBwdWJsaWMgc2VsZWN0ZWRVc2VyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZ2xvYmFsU2VydmljZTogR2xvYmFsU2VydmljZSkge1xuICB9XG5cbiAgcHVibGljIGdldEFsbE1lbWJlcnMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IDQyMzEsXG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJTdGV2ZVwiLFxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJTdWJzY3JpYmVyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAxMjM0LFxuICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiTWFya1wiLFxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJEZXBlbmRlbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IDY3ODksXG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJTdGV2ZVwiLFxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJEZXBlbmRlbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xufVxuXG4gIHB1YmxpYyBnZXRBbGxNZWRpY2F0aW9ucygpIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjJtZ1wiLFxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJGcmFua2VuIFN0ZWluXCIsXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcbiAgICAgICAgICAgICAgXCIwNi8yMS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiQWVyc29sXCIsXG4gICAgICAgICAgXCJmb3JtXCI6IFwicG93ZGVyXCIsXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIxMG1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU21pdGhcIixcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xuICAgICAgICAgICAgICBcIjA1LzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU3RlaW5cIixcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xuICAgICAgICAgICAgICBcIjA0LzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIkNsYXJrZSBLZW50XCIsXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcbiAgICAgICAgICAgICAgXCIwMy8yMS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjJtZ1wiLFxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJGcmFua2VuIFN0ZWluXCIsXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcbiAgICAgICAgICAgICAgXCIwMi8yMS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiQWVyc29sXCIsXG4gICAgICAgICAgXCJmb3JtXCI6IFwicG93ZGVyXCIsXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIxMG1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU21pdGhcIixcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xuICAgICAgICAgICAgICBcIjAyLzAyLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIk1hcnkgU3RlaW5cIixcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xuICAgICAgICAgICAgICBcIjAxLzI4LzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJtZWRpY2F0aW9uSWRcIjogXCI3NDUyM1wiLFxuICAgICAgICAgIFwibWVkaWNhdGlvbk5hbWVcIjogXCJEaWF6ZXBhbVwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBcIlRhYlwiLFxuICAgICAgICAgIFwiZG9zYWdlXCI6IFwiMm1nXCIsXG4gICAgICAgICAgXCJwaGFybWFjeU5hbWVcIjogXCJBQkMgTWVkaWNhbCBBc3NvY2lhdGlvblwiLFxuICAgICAgICAgIFwiZG9jdG9ybmFtZVwiOiBcIkNsYXJrZSBLZW50XCIsXG4gICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcbiAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcbiAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcbiAgICAgICAgICBcInppcGNvZGVcIjogXCIxMjgzNlwiLFxuICAgICAgICAgIFwiZG9jdG9yTW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXG4gICAgICAgICAgXCJwaGFybWFjeU1vYmlsZVwiOiBcIisxNjE3Mjc2NDc2MlwiLFxuICAgICAgICAgIFwibGFzdERhdGVGaWxsXCI6IFtcbiAgICAgICAgICAgICAgXCIwMS8xNC8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibWVkaWNhdGlvbklkXCI6IFwiNzQ1MjNcIixcbiAgICAgICAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiRGlhemVwYW1cIixcbiAgICAgICAgICBcImZvcm1cIjogXCJUYWJcIixcbiAgICAgICAgICBcImRvc2FnZVwiOiBcIjJtZ1wiLFxuICAgICAgICAgIFwicGhhcm1hY3lOYW1lXCI6IFwiQUJDIE1lZGljYWwgQXNzb2NpYXRpb25cIixcbiAgICAgICAgICBcImRvY3Rvcm5hbWVcIjogXCJDbGFya2UgS2VudFwiLFxuICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXG4gICAgICAgICAgXCJjaXR5XCI6IFwiQm9zdG9uXCIsXG4gICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXG4gICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMTI4MzZcIixcbiAgICAgICAgICBcImRvY3Rvck1vYmlsZVwiOiBcIisxODU3MzczOTUxNVwiLFxuICAgICAgICAgIFwicGhhcm1hY3lNb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjJcIixcbiAgICAgICAgICBcImxhc3REYXRlRmlsbFwiOiBbXG4gICAgICAgICAgICAgIFwiMDEvMTQvMjAxN1wiLCBcIjEyLzE1LzIwMTZcIiwgXCIwNi8wMy8yMDE2XCIsIFwiMTIvMTAvMjAxNVwiXG4gICAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm1lZGljYXRpb25JZFwiOiBcIjc0NTIzXCIsXG4gICAgICAgICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkRpYXplcGFtXCIsXG4gICAgICAgICAgXCJmb3JtXCI6IFwiVGFiXCIsXG4gICAgICAgICAgXCJkb3NhZ2VcIjogXCIybWdcIixcbiAgICAgICAgICBcInBoYXJtYWN5TmFtZVwiOiBcIkFCQyBNZWRpY2FsIEFzc29jaWF0aW9uXCIsXG4gICAgICAgICAgXCJkb2N0b3JuYW1lXCI6IFwiQ2xhcmtlIEtlbnRcIixcbiAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxuICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxuICAgICAgICAgIFwiemlwY29kZVwiOiBcIjEyODM2XCIsXG4gICAgICAgICAgXCJkb2N0b3JNb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTVcIixcbiAgICAgICAgICBcInBoYXJtYWN5TW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXG4gICAgICAgICAgXCJsYXN0RGF0ZUZpbGxcIjogW1xuICAgICAgICAgICAgICBcIjAxLzE0LzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxuICAgICAgICAgIF1cbiAgICAgIH1dO1xuICB9XG5cbn0iXX0=