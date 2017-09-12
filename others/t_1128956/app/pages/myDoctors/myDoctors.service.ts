import { Injectable } from "@angular/core";

@Injectable()
export class MyDoctorsService {

    public selectedDoctor; // TO SHARE DATA BETWEEN MAIN COMPONENT AND VISIT HISTORY MODAL
    public selectedMember; // TO SHARE DATA BETWEEN MAIN COMPONENT AND VISIT HISTORY MODAL

    public getAllMembers() {
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
    }

    public getAllDoctors() {
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
    }

}