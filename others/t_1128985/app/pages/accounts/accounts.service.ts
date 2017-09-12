import { Injectable } from "@angular/core";
import { AccountModel } from "./accounts.model";

@Injectable()
export class AccountService {

     public selectedAccount: any = "";


    public setSelectedAccount(account: AccountModel) {
        this.selectedAccount = account;
    }

    public getAllAccounts() {
        return {
            "account": {
                "currentYear": {
                    "year": 2017,
                    "accounts": [{
                            "id": 1243,
                            "name": "Limited Purpose Flex Spending Account (LPFSA)",
                            "totalAmount": 3000,
                            "usedAmount": 200,
                            "legendDetails": [],
                            "annualContributionLimit": null,
                            "showInvestedAmount": false,
                            "investedAmount": null,
                            "contributionsYTD": null,
                            "contributionsThisYear": null
                        }, {
                            "id": 1245,
                            "name": "Health Savings Account (HSA)",
                            "totalAmount": 6000,
                            "usedAmount": 500,
                            "legendDetails" : [{
                                "text": "Contributions 2016",
                                "cost": "1500",
                                "color": "rgb(61, 168, 72)"
                            }, {
                                "text": "Contributions YTD",
                                "cost": "4500",
                                "color": "rgb(110, 190, 118)"
                            }, {
                                "text": "Invested",
                                "cost": "3000",
                                "color": "rgb(7, 29, 73)"
                            }],
                            "annualContributionLimit": 5000,
                            "showInvestedAmount": true,
                            "investedAmount": 3000,
                            "contributionsYTD": 4500,
                            "contributionsThisYear": 1500
                        }
                    ]
                },
                "priorYear": {
                    "year": 2016,
                    "accounts": [{
                            "id": 1243,
                            "name": "Limited Purpose Spending account",
                            "totalAmount": 2000,
                            "usedAmount": 980,
                            "legendDetails": [],
                            "annualContributionLimit": null,
                            "showInvestedAmount": false,
                            "investedAmount": null,
                            "contributionsYTD": null,
                            "contributionsThisYear": null
                        },
                        {
                            "id": 1243,
                            "name": "Health Savings Account (HSA)",
                            "totalAmount": 6200,
                            "usedAmount": 980,
                            "legendDetails" : [{
                                "text": "Contributions 2016",
                                "cost": "1500",
                                "color": "rgb(61, 168, 72)"
                            }, {
                                "text": "Contributions YTD",
                                "cost": "4500",
                                "color": "rgb(110, 190, 118)"
                            }, {
                                "text": "Invested",
                                "cost": "3000",
                                "color": "rgb(7, 29, 73)"
                            }],
                            "annualContributionLimit": 5000,
                            "showInvestedAmount": true,
                            "investedAmount": null,
                            "contributionsYTD": 3000,
                            "contributionsThisYear": 3000
                        }
                    ]
                }
            },
            "actionItems": 2
        };
    }
}