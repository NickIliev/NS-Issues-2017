"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MyDoctorsService = (function () {
    function MyDoctorsService() {
    }
    MyDoctorsService.prototype.getAllMembers = function () {
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
    MyDoctorsService.prototype.getAllDoctors = function () {
        return {
            "doctors": [{
                    "doctorId": 74523,
                    "name": "Franken Stein",
                    "speciality": "Internal Medicine",
                    "address1": "127 Elkins Circle",
                    "city": "Folsom",
                    "state": "CA",
                    "zipcode": 95630,
                    "mobile": "+18573739515",
                    "review": {
                        "total": 27,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "07/18/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "Michael Phelps",
                    "speciality": "Internal Medicine",
                    "address1": "980 Seabough CT",
                    "city": "Folsom",
                    "state": "CA",
                    "zipcode": 95630,
                    "mobile": "+16172764762",
                    "review": {
                        "total": 98,
                        "totalpoints": 124
                    },
                    "visits": [
                        "07/14/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "Dexter",
                    "speciality": "Internal Medicine",
                    "address1": "12499 Folsom Blvd",
                    "city": "Rancho Cordova",
                    "state": "CA",
                    "zipcode": 95742,
                    "mobile": "+18573739516",
                    "review": {
                        "total": 16,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "07/08/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "Eoin Morgan",
                    "speciality": "Internal Medicine",
                    "address1": "101, Federal Way",
                    "city": "Boston",
                    "state": "MA",
                    "zipcode": 12836,
                    "mobile": "+16172764763",
                    "review": {
                        "total": 8,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "07/01/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "Steve Smith",
                    "speciality": "Internal Medicine",
                    "address1": "101, Federal Way",
                    "city": "Boston",
                    "state": "MA",
                    "zipcode": 12836,
                    "mobile": "+18573739517",
                    "review": {
                        "total": 76,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "06/21/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "John Watson",
                    "speciality": "Internal Medicine",
                    "address1": "101, Federal Way",
                    "city": "Boston",
                    "state": "MA",
                    "zipcode": 12836,
                    "mobile": "+16172764764",
                    "review": {
                        "total": 87,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "06/15/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                },
                {
                    "doctorId": 34322,
                    "name": "Sherlock",
                    "speciality": "Internal Medicine",
                    "address1": "101, Federal Way",
                    "city": "Boston",
                    "state": "MA",
                    "zipcode": 12836,
                    "mobile": "+18573739518",
                    "review": {
                        "total": 145,
                        "totalpoints": 1238923
                    },
                    "visits": [
                        "06/10/2017", "12/15/2016", "06/03/2016", "12/10/2015"
                    ]
                }
            ]
        };
    };
    return MyDoctorsService;
}());
MyDoctorsService = __decorate([
    core_1.Injectable()
], MyDoctorsService);
exports.MyDoctorsService = MyDoctorsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlEb2N0b3JzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteURvY3RvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUczQyxJQUFhLGdCQUFnQjtJQUE3QjtJQXlKQSxDQUFDO0lBcEpVLHdDQUFhLEdBQXBCO1FBQ0ksTUFBTSxDQUFDO1lBQ0M7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixNQUFNLEVBQUUsWUFBWTthQUN2QjtZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDdkIsTUFBTSxFQUFFLFdBQVc7YUFDdEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsT0FBTztnQkFDcEIsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxXQUFXO2FBQ3RCO1NBQ0osQ0FBQztJQUNWLENBQUM7SUFFTSx3Q0FBYSxHQUFwQjtRQUNJLE1BQU0sQ0FBQztZQUNILFNBQVMsRUFBRSxDQUFDO29CQUNSLFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsZUFBZTtvQkFDdkIsWUFBWSxFQUFFLG1CQUFtQjtvQkFDakMsVUFBVSxFQUFFLG1CQUFtQjtvQkFDL0IsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFNBQVMsRUFBRSxLQUFLO29CQUNoQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFO3dCQUNOLE9BQU8sRUFBRSxFQUFFO3dCQUNYLGFBQWEsRUFBRSxPQUFPO3FCQUN6QjtvQkFDRCxRQUFRLEVBQUU7d0JBQ04sWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWTtxQkFDekQ7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksVUFBVSxFQUFFLEtB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Rzt3QkFDWixhQUFhLEVBQUUsT0FBTztxQkFDekI7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVk7cUJBQ3pEO2lCQUNKO2FBQ0E7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FBQyxBQXpKRCxJQXlKQztBQXpKWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtHQUNBLGdCQUFnQixDQXlKNUI7QUF6SlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNeURvY3RvcnNTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWREb2N0b3I7IC8vIFRPIFNIQVJFIERBVEEgQkVUV0VFTiBNQUlOIENPTVBPTkVOVCBBTkQgVklTSVQgSElTVE9SWSBNT0RBTFxyXG4gICAgcHVibGljIHNlbGVjdGVkTWVtYmVyOyAvLyBUTyBTSEFSRSBEQVRBIEJFVFdFRU4gTUFJTiBDT01QT05FTlQgQU5EIFZJU0lUIEhJU1RPUlkgTU9EQUxcclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsTWVtYmVycygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogNDIzMSxcclxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBcIlN0ZXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc2VlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIlN1YnNjcmliZXJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEyMzQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJNYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc2VlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogNjc4OSxcclxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBcIlN0ZXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc2VlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbERvY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJkb2N0b3JzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICBcImRvY3RvcklkXCI6IDc0NTIzLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiRnJhbmtlbiBTdGVpblwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVjaWFsaXR5XCI6IFwiSW50ZXJuYWwgTWVkaWNpbmVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMjcgRWxraW5zIENpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwiRm9sc29tXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwiQ0FcIixcclxuICAgICAgICAgICAgICAgIFwiemlwY29kZVwiOiA5NTYzMCxcclxuICAgICAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJldmlld1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOiAyNyxcclxuICAgICAgICAgICAgICAgICAgICBcInRvdGFscG9pbnRzXCI6IDEyMzg5MjNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInZpc2l0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIwNy8xOC8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkb2N0b3JJZFwiOiAzNDMyMixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIk1pY2hhZWwgUGhlbHBzXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWNpYWxpdHlcIjogXCJJbnRlcm5hbCBNZWRpY2luZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjk4MCBTZWFib3VnaCBDVFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwiRm9sc29tXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwiQ0FcIixcclxuICAgICAgICAgICAgICAgIFwiemlwY29kZVwiOiA5NTYzMCxcclxuICAgICAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiKzE2MTcyNzY0NzYyXCIsXHJcbiAgICAgICAgICAgICAgICBcInJldmlld1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOiA5OCxcclxuICAgICAgICAgICAgICAgICAgICBcInRvdGFscG9pbnRzXCI6IDEyNFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidmlzaXRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIjA3LzE0LzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRvY3RvcklkXCI6IDM0MzIyLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiRGV4dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWNpYWxpdHlcIjogXCJJbnRlcm5hbCBNZWRpY2luZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEyNDk5IEZvbHNvbSBCbHZkXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCJSYW5jaG8gQ29yZG92YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBcIkNBXCIsXHJcbiAgICAgICAgICAgICAgICBcInppcGNvZGVcIjogOTU3NDIsXHJcbiAgICAgICAgICAgICAgICBcIm1vYmlsZVwiOiBcIisxODU3MzczOTUxNlwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXZpZXdcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbHBvaW50c1wiOiAxMjM4OTIzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ2aXNpdHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFwiMDcvMDgvMjAxN1wiLCBcIjEyLzE1LzIwMTZcIiwgXCIwNi8wMy8yMDE2XCIsIFwiMTIvMTAvMjAxNVwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZG9jdG9ySWRcIjogMzQzMjIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJFb2luIE1vcmdhblwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVjaWFsaXR5XCI6IFwiSW50ZXJuYWwgTWVkaWNpbmVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ6aXBjb2RlXCI6IDEyODM2LFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGVcIjogXCIrMTYxNzI3NjQ3NjNcIixcclxuICAgICAgICAgICAgICAgIFwicmV2aWV3XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbHBvaW50c1wiOiAxMjM4OTIzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ2aXNpdHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFwiMDcvMDEvMjAxN1wiLCBcIjEyLzE1LzIwMTZcIiwgXCIwNi8wMy8yMDE2XCIsIFwiMTIvMTAvMjAxNVwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZG9jdG9ySWRcIjogMzQzMjIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJTdGV2ZSBTbWl0aFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVjaWFsaXR5XCI6IFwiSW50ZXJuYWwgTWVkaWNpbmVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzczFcIjogXCIxMDEsIEZlZGVyYWwgV2F5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCJCb3N0b25cIixcclxuICAgICAgICAgICAgICAgIFwic3RhdGVcIjogXCJNQVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ6aXBjb2RlXCI6IDEyODM2LFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGVcIjogXCIrMTg1NzM3Mzk1MTdcIixcclxuICAgICAgICAgICAgICAgIFwicmV2aWV3XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6IDc2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG90YWxwb2ludHNcIjogMTIzODkyM1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidmlzaXRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIjA2LzIxLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRvY3RvcklkXCI6IDM0MzIyLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiSm9obiBXYXRzb25cIixcclxuICAgICAgICAgICAgICAgIFwic3BlY2lhbGl0eVwiOiBcIkludGVybmFsIE1lZGljaW5lXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3MxXCI6IFwiMTAxLCBGZWRlcmFsIFdheVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwiQm9zdG9uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwiTUFcIixcclxuICAgICAgICAgICAgICAgIFwiemlwY29kZVwiOiAxMjgzNixcclxuICAgICAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiKzE2MTcyNzY0NzY0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJldmlld1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOiA4NyxcclxuICAgICAgICAgICAgICAgICAgICBcInRvdGFscG9pbnRzXCI6IDEyMzg5MjNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInZpc2l0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIwNi8xNS8yMDE3XCIsIFwiMTIvMTUvMjAxNlwiLCBcIjA2LzAzLzIwMTZcIiwgXCIxMi8xMC8yMDE1XCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkb2N0b3JJZFwiOiAzNDMyMixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlNoZXJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWNpYWxpdHlcIjogXCJJbnRlcm5hbCBNZWRpY2luZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzMVwiOiBcIjEwMSwgRmVkZXJhbCBXYXlcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcIkJvc3RvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBcIk1BXCIsXHJcbiAgICAgICAgICAgICAgICBcInppcGNvZGVcIjogMTI4MzYsXHJcbiAgICAgICAgICAgICAgICBcIm1vYmlsZVwiOiBcIisxODU3MzczOTUxOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXZpZXdcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjogMTQ1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG90YWxwb2ludHNcIjogMTIzODkyM1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidmlzaXRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIjA2LzEwLzIwMTdcIiwgXCIxMi8xNS8yMDE2XCIsIFwiMDYvMDMvMjAxNlwiLCBcIjEyLzEwLzIwMTVcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSJdfQ==