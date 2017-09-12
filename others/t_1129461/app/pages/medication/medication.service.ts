import { Injectable } from "@angular/core";
import { GlobalService } from "../../shared/services/global.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MedicationService {

  public historySelectedMember: any;
  public selectedUser: any;

  constructor(private _globalService: GlobalService) {
  }

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

  public getAllMedications() {
    return [
      {
          "medicationId": "74523",
          "medicationName": "Diazepam",
          "form": "Tab",
          "dosage": "2mg",
          "pharmacyName": "ABC Medical Association",
          "doctorname": "Franken Stein",
          "address1": "703 Phyllis Street",
          "city": "Bentonville",
          "state": "AR",
          "zipcode": "72712",
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
          "address1": "303 Prospect Creek Drive",
          "city": "Ballwin",
          "state": "MO",
          "zipcode": "63021",
          "doctorMobile": "+18573739516",
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
          "address1": "1210 Knoll Haven Drive",
          "city": "Manchester",
          "state": "MO",
          "zipcode": "63021",
          "doctorMobile": "+18573739517",
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
          "address1": "2010 Hasell road Hoffman Estates",
          "city": "Illinois",
          "state": "IL",
          "zipcode": "60169",
          "doctorMobile": "+18573739518",
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
          "address1": "300 NE Moberly Lane",
          "city": "Bentonville",
          "state": "AR",
          "zipcode": "72712",
          "doctorMobile": "+18573739519",
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
          "address1": "703 Phyllis Street",
          "city": "Bentonville",
          "state": "AR",
          "zipcode": "72712",
          "doctorMobile": "+18573739510",
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
          "address1": "303 Prospect Creek Drive",
          "city": "Ballwin",
          "state": "MO",
          "zipcode": "63021",
          "doctorMobile": "+18573739615",
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
          "address1": "1210 Knoll Haven Drive",
          "city": "Manchester",
          "state": "MO",
          "zipcode": "63021",
          "doctorMobile": "+18573739715",
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
          "address1": "2010 Hasell road Hoffman Estates",
          "city": "Illinois",
          "state": "IL",
          "zipcode": "60169",
          "doctorMobile": "+18573738515",
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
          "address1": "300 NE Moberly Lane",
          "city": "Bentonville",
          "state": "AR",
          "zipcode": "72712",
          "doctorMobile": "+18573733515",
          "pharmacyMobile": "+16172764762",
          "lastDateFill": [
              "01/14/2017", "12/15/2016", "06/03/2016", "12/10/2015"
          ]
      }];
  }

}