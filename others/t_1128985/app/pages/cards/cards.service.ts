import { Injectable } from "@angular/core";
import { MemberListModel } from "./memberList.model";

@Injectable()
export class CardsService {

public selectedMember: MemberListModel;
    public isCardsPopUp: boolean = true;
    
  public getAllMembers() {
    return [
      {
        "firstName": "Steve",
        "lastName": "Applessed",
        "memberId": "123456",
        "type": "Subscriber",
        "cardDetails": {
          "planName": "PPO Saver",
          "planType": "Deductible",
          "patientName": "Steve Appleseed",
          "cardNo": "ABC123456789",
          "suffix": "00",
          "serviceNo": "1-800-000-0000",
          "rxBin": "003858",
          "pcn": "A4",
          "rxGrp": "MASA",
          "copays": [
            {
              "name": "Office Visit",
              "suffix": "OV",
              "amount": "15"
            },
            {
              "name": "Behavior Health",
              "suffix": "BH",
              "amount": "15"
            },
            {
              "name": "Emergency Room",
              "suffix": "ER",
              "amount": "15"
            },
            {
              "name": "Preventive",
              "suffix": "PV",
              "amount": "0"
            }
          ],
          "choice": "Plan",
          "memberServiceNo": "1-800-000-0000",
          "providerServiceNo": "1-800-000-0000",
          "preAuthNo": "1-800-000-0000",
          "abuseNo": "1-800-000-0000",
          "locateProvNo": "1-800-000-0000",
          "blueCareNo": "1-800-000-0000"
        }
      },
      {
        "firstName": "Mark",
        "lastName": "Applessed",
        "memberId": "1234",
        "type": "Dependent",
        "cardDetails": {
          "planName": "PPO Saver",
          "planType": "Deductible",
          "patientName": "Mark Appleseed",
          "cardNo": "ABC123456789",
          "suffix": "00",
          "serviceNo": "1-800-000-0000",
          "rxBin": "003858",
          "pcn": "A4",
          "rxGrp": "MASA",
          "copays": [
            {
              "name": "Office Visit",
              "suffix": "OV",
              "amount": "15"
            },
            {
              "name": "Behavior Health",
              "suffix": "BH",
              "amount": "15"
            },
            {
              "name": "Emergency Room",
              "suffix": "ER",
              "amount": "15"
            },
            {
              "name": "Preventive",
              "suffix": "PV",
              "amount": "0"
            }
          ],
          "choice": "Plan",
          "memberServiceNo": "1-800-000-0000",
          "providerServiceNo": "1-800-000-0000",
          "preAuthNo": "1-800-000-0000",
          "abuseNo": "1-800-000-0000",
          "locateProvNo": "1-800-000-0000",
          "blueCareNo": "1-800-000-0000"
        }

      },
      {
        "firstName": "Gretchen",
        "lastName": "Applessed",
        "memberId": "123434",
        "type": "Dependent",
        "cardDetails": {
          "planName": "PPO Saver",
          "planType": "Deductible",
          "patientName": "Gretchen Appleseed",
          "cardNo": "ABC123456789",
          "suffix": "002",
          "serviceNo": "1-800-000-0000",
          "rxBin": "003858",
          "pcn": "A4",
          "rxGrp": "MASA",
          "copays": [
            {
              "name": "Office Visit",
              "suffix": "OV",
              "amount": "15"
            },
            {
              "name": "Behavior Health",
              "suffix": "BH",
              "amount": "15"
            },
            {
              "name": "Emergency Room",
              "suffix": "ER",
              "amount": "15"
            },
            {
              "name": "Preventive",
              "suffix": "PV",
              "amount": "0"
            }
          ],
          "choice": "Plan",
          "memberServiceNo": "1-800-000-0000",
          "providerServiceNo": "1-800-000-0000",
          "preAuthNo": "1-800-000-0000",
          "abuseNo": "1-800-000-0000",
          "locateProvNo": "1-800-000-0000",
          "blueCareNo": "1-800-000-0000"
        }

      },
      {
        "firstName": "John",
        "lastName": "Applessed",
        "memberId": "123467",
        "type": "Dependent",
        "cardDetails": {
          "planName": "PPO Saver",
          "planType": "Deductible",
          "patientName": "John Appleseed",
          "cardNo": "ABC123456789",
          "suffix": "00",
          "serviceNo": "1-800-000-0000",
          "rxBin": "003858",
          "pcn": "A4",
          "rxGrp": "MASA",
          "copays": [
            {
              "name": "Office Visit",
              "suffix": "OV",
              "amount": "15"
            },
            {
              "name": "Behavior Health",
              "suffix": "BH",
              "amount": "15"
            },
            {
              "name": "Emergency Room",
              "suffix": "ER",
              "amount": "15"
            },
            {
              "name": "Preventive",
              "suffix": "PV",
              "amount": "0"
            }
          ],
          "choice": "Plan",
          "memberServiceNo": "1-800-000-0000",
          "providerServiceNo": "1-800-000-0000",
          "preAuthNo": "1-800-000-0000",
          "abuseNo": "1-800-000-0000",
          "locateProvNo": "1-800-000-0000",
          "blueCareNo": "1-800-000-0000"
        }
      },
    ];
  }
}