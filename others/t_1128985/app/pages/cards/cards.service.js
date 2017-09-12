"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CardsService = (function () {
    function CardsService() {
        this.isCardsPopUp = true;
    }
    CardsService.prototype.getAllMembers = function () {
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
    };
    return CardsService;
}());
CardsService = __decorate([
    core_1.Injectable()
], CardsService);
exports.CardsService = CardsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFJM0MsSUFBYSxZQUFZO0lBRHpCO1FBSVcsaUJBQVksR0FBWSxJQUFJLENBQUM7SUFnTXhDLENBQUM7SUE5TFEsb0NBQWEsR0FBcEI7UUFDRSxNQUFNLENBQUM7WUFDTDtnQkFDRSxXQUFXLEVBQUUsT0FBTztnQkFDcEIsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsYUFBYSxFQUFFO29CQUNiLFVBQVUsRUFBRSxXQUFXO29CQUN2QixVQUFVLEVBQUUsWUFBWTtvQkFDeEIsYUFBYSxFQUFFLGlCQUFpQjtvQkFDaEMsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxJQUFJO29CQUNkLFdBQVcsRUFBRSxnQkFBZ0I7b0JBQzdCLE9BQU8sRUFBRSxRQUFRO29CQUNqQixLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsTUFBTTtvQkFDZixRQUFRLEVBQUU7d0JBQ1I7NEJBQ0UsTUFBTSxFQUFFLGNBQWM7NEJBQ3RCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNmO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxpQkFBaUI7NEJBQ3pCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNmO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxnQkFBZ0I7NEJBQ3hCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNmO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxZQUFZOzRCQUNwQixRQUFRLEVBQUUsSUFBSTs0QkFDZCxRQUFRLEVBQUUsR0FBRzt5QkFDZDtxQkFDRjtvQkFDRCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsaUJBQWlCLEVBQUUsZ0JBQWdC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WSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWVtYmVyTGlzdE1vZGVsIH0gZnJvbSBcIi4vbWVtYmVyTGlzdC5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FyZHNTZXJ2aWNlIHtcblxucHVibGljIHNlbGVjdGVkTWVtYmVyOiBNZW1iZXJMaXN0TW9kZWw7XG4gICAgcHVibGljIGlzQ2FyZHNQb3BVcDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gIHB1YmxpYyBnZXRBbGxNZW1iZXJzKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcbiAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc3NlZFwiLFxuICAgICAgICBcIm1lbWJlcklkXCI6IFwiMTIzNDU2XCIsXG4gICAgICAgIFwidHlwZVwiOiBcIlN1YnNjcmliZXJcIixcbiAgICAgICAgXCJjYXJkRGV0YWlsc1wiOiB7XG4gICAgICAgICAgXCJwbGFuTmFtZVwiOiBcIlBQTyBTYXZlclwiLFxuICAgICAgICAgIFwicGxhblR5cGVcIjogXCJEZWR1Y3RpYmxlXCIsXG4gICAgICAgICAgXCJwYXRpZW50TmFtZVwiOiBcIlN0ZXZlIEFwcGxlc2VlZFwiLFxuICAgICAgICAgIFwiY2FyZE5vXCI6IFwiQUJDMTIzNDU2Nzg5XCIsXG4gICAgICAgICAgXCJzdWZmaXhcIjogXCIwMFwiLFxuICAgICAgICAgIFwic2VydmljZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcInJ4QmluXCI6IFwiMDAzODU4XCIsXG4gICAgICAgICAgXCJwY25cIjogXCJBNFwiLFxuICAgICAgICAgIFwicnhHcnBcIjogXCJNQVNBXCIsXG4gICAgICAgICAgXCJjb3BheXNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJPZmZpY2UgVmlzaXRcIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJPVlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjE1XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIkJlaGF2aW9yIEhlYWx0aFwiLFxuICAgICAgICAgICAgICBcInN1ZmZpeFwiOiBcIkJIXCIsXG4gICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiRW1lcmdlbmN5IFJvb21cIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJFUlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjE1XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIlByZXZlbnRpdmVcIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJQVlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaG9pY2VcIjogXCJQbGFuXCIsXG4gICAgICAgICAgXCJtZW1iZXJTZXJ2aWNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwicHJvdmlkZXJTZXJ2aWNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwicHJlQXV0aE5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcImFidXNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwibG9jYXRlUHJvdk5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcImJsdWVDYXJlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiTWFya1wiLFxuICAgICAgICBcImxhc3ROYW1lXCI6IFwiQXBwbGVzc2VkXCIsXG4gICAgICAgIFwibWVtYmVySWRcIjogXCIxMjM0XCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiLFxuICAgICAgICBcImNhcmREZXRhaWxzXCI6IHtcbiAgICAgICAgICBcInBsYW5OYW1lXCI6IFwiUFBPIFNhdmVyXCIsXG4gICAgICAgICAgXCJwbGFuVHlwZVwiOiBcIkRlZHVjdGlibGVcIixcbiAgICAgICAgICBcInBhdGllbnROYW1lXCI6IFwiTWFyayBBcHBsZXNlZWRcIixcbiAgICAgICAgICBcImNhcmROb1wiOiBcIkFCQzEyMzQ1Njc4OVwiLFxuICAgICAgICAgIFwic3VmZml4XCI6IFwiMDBcIixcbiAgICAgICAgICBcInNlcnZpY2VOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJyeEJpblwiOiBcIjAwMzg1OFwiLFxuICAgICAgICAgIFwicGNuXCI6IFwiQTRcIixcbiAgICAgICAgICBcInJ4R3JwXCI6IFwiTUFTQVwiLFxuICAgICAgICAgIFwiY29wYXlzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiT2ZmaWNlIFZpc2l0XCIsXG4gICAgICAgICAgICAgIFwic3VmZml4XCI6IFwiT1ZcIixcbiAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIxNVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJCZWhhdmlvciBIZWFsdGhcIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJCSFwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjE1XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIkVtZXJnZW5jeSBSb29tXCIsXG4gICAgICAgICAgICAgIFwic3VmZml4XCI6IFwiRVJcIixcbiAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIxNVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJQcmV2ZW50aXZlXCIsXG4gICAgICAgICAgICAgIFwic3VmZml4XCI6IFwiUFZcIixcbiAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hvaWNlXCI6IFwiUGxhblwiLFxuICAgICAgICAgIFwibWVtYmVyU2VydmljZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcInByb3ZpZGVyU2VydmljZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcInByZUF1dGhOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJhYnVzZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcImxvY2F0ZVByb3ZOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJibHVlQ2FyZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIlxuICAgICAgICB9XG5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiR3JldGNoZW5cIixcbiAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc3NlZFwiLFxuICAgICAgICBcIm1lbWJlcklkXCI6IFwiMTIzNDM0XCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiLFxuICAgICAgICBcImNhcmREZXRhaWxzXCI6IHtcbiAgICAgICAgICBcInBsYW5OYW1lXCI6IFwiUFBPIFNhdmVyXCIsXG4gICAgICAgICAgXCJwbGFuVHlwZVwiOiBcIkRlZHVjdGlibGVcIixcbiAgICAgICAgICBcInBhdGllbnROYW1lXCI6IFwiR3JldGNoZW4gQXBwbGVzZWVkXCIsXG4gICAgICAgICAgXCJjYXJkTm9cIjogXCJBQkMxMjM0NTY3ODlcIixcbiAgICAgICAgICBcInN1ZmZpeFwiOiBcIjAwMlwiLFxuICAgICAgICAgIFwic2VydmljZU5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcInJ4QmluXCI6IFwiMDAzODU4XCIsXG4gICAgICAgICAgXCJwY25cIjogXCJBNFwiLFxuICAgICAgICAgIFwicnhHcnBcIjogXCJNQVNBXCIsXG4gICAgICAgICAgXCJjb3BheXNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJPZmZpY2UgVmlzaXRcIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJPVlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjE1XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIkJlaGF2aW9yIEhlYWx0aFwiLFxuICAgICAgICAgICAgICBcInN1ZmZpeFwiOiBcIkJIXCIsXG4gICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiRW1lcmdlbmN5IFJvb21cIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJFUlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjE1XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIlByZXZlbnRpdmVcIixcbiAgICAgICAgICAgICAgXCJzdWZmaXhcIjogXCJQVlwiLFxuICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaG9pY2VcIjogXCJQbGFuXCIsXG4gICAgICAgICAgXCJtZW1iZXJTZXJ2aWNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwicHJvdmlkZXJTZXJ2aWNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwicHJlQXV0aE5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcImFidXNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwibG9jYXRlUHJvdk5vXCI6IFwiMS04MDAtMDAwLTAwMDBcIixcbiAgICAgICAgICBcImJsdWVDYXJlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiXG4gICAgICAgIH1cblxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJKb2huXCIsXG4gICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNzZWRcIixcbiAgICAgICAgXCJtZW1iZXJJZFwiOiBcIjEyMzQ2N1wiLFxuICAgICAgICBcInR5cGVcIjogXCJEZXBlbmRlbnRcIixcbiAgICAgICAgXCJjYXJkRGV0YWlsc1wiOiB7XG4gICAgICAgICAgXCJwbGFuTmFtZVwiOiBcIlBQTyBTYXZlclwiLFxuICAgICAgICAgIFwicGxhblR5cGVcIjogXCJEZWR1Y3RpYmxlXCIsXG4gICAgICAgICAgXCJwYXRpZW50TmFtZVwiOiBcIkpvaG4gQXBwbGVzZWVkXCIsXG4gICAgICAgICAgXCJjYXJkTm9cIjogXCJBQkMxMjM0NTY3ODlcIixcbiAgICAgICAgICBcInN1ZmZpeFwiOiBcIjAwXCIsXG4gICAgICAgICAgXCJzZXJ2aWNlTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwicnhCaW5cIjogXCIwMDM4NThcIixcbiAgICAgICAgICBcInBjblwiOiBcIkE0XCIsXG4gICAgICAgICAgXCJyeEdycFwiOiBcIk1BU0FcIixcbiAgICAgICAgICBcImNvcGF5c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIk9mZmljZSBWaXNpdFwiLFxuICAgICAgICAgICAgICBcInN1ZmZpeFwiOiBcIk9WXCIsXG4gICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiQmVoYXZpb3IgSGVhbHRoXCIsXG4gICAgICAgICAgICAgIFwic3VmZml4XCI6IFwiQkhcIixcbiAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIxNVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJFbWVyZ2VuY3kgUm9vbVwiLFxuICAgICAgICAgICAgICBcInN1ZmZpeFwiOiBcIkVSXCIsXG4gICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiUHJldmVudGl2ZVwiLFxuICAgICAgICAgICAgICBcInN1ZmZpeFwiOiBcIlBWXCIsXG4gICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNob2ljZVwiOiBcIlBsYW5cIixcbiAgICAgICAgICBcIm1lbWJlclNlcnZpY2VOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJwcm92aWRlclNlcnZpY2VOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJwcmVBdXRoTm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwiYWJ1c2VOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCIsXG4gICAgICAgICAgXCJsb2NhdGVQcm92Tm9cIjogXCIxLTgwMC0wMDAtMDAwMFwiLFxuICAgICAgICAgIFwiYmx1ZUNhcmVOb1wiOiBcIjEtODAwLTAwMC0wMDAwXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdO1xuICB9XG59Il19