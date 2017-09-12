"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AccountService = (function () {
    function AccountService() {
        this.selectedAccount = "";
    }
    AccountService.prototype.setSelectedAccount = function (account) {
        this.selectedAccount = account;
    };
    AccountService.prototype.getAllAccounts = function () {
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
                            "legendDetails": [{
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
                            "legendDetails": [{
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
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable()
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFJM0MsSUFBYSxjQUFjO0lBRDNCO1FBR1ksb0JBQWUsR0FBUSxFQUFFLENBQUM7SUE2RnRDLENBQUM7SUExRlUsMkNBQWtCLEdBQXpCLFVBQTBCLE9BQXFCO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFTSx1Q0FBYyxHQUFyQjtRQUNJLE1BQU0sQ0FBQztZQUNILFNBQVMsRUFBRTtnQkFDUCxhQUFhLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osVUFBVSxFQUFFLENBQUM7NEJBQ0wsSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLCtDQUErQzs0QkFDdkQsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUUsRUFBRTs0QkFDbkIseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsS0FBSzs0QkFDM0IsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEMsRUFBRTs0QkFDQyxJQUFJLEVBQUUsSUFBSTs0QkFDVixNQUFNLEVBQUUsOEJBQThCOzRCQUN0QyxhQUFhLEVBQUUsSUFBSTs0QkFDbkIsWUFBWSxFQUFFLEdBQUc7NEJBQ2pCLGVBQWUsRUFBRyxDQUFDO29DQUNmLE1BQU0sRUFBRSxvQkFBb0I7b0NBQzVCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxrQkFBa0I7aUNBQzlCLEVBQUU7b0NBQ0MsTUFBTSxFQUFFLG1CQUFtQjtvQ0FDM0IsTUFBTSxFQUFFLE1BQU07b0NBQ2QsT0FBTyxFQUFFLG9CQUFvQjtpQ0FDaEMsRUFBRTtvQ0FDQyxNQUFNLEVBQUUsVUFBVTtvQ0FDbEIsTUFBTSxFQUFFLE1BQU07b0NBQ2QsT0FBTyxFQUFFLGdCQUFnQjtpQ0FDNUIsQ0FBQzs0QkFDRix5QkFBeUIsRUFBRSxJQUFJOzRCQUMvQixvQkFBb0IsRUFBRSxJQUFJOzRCQUMxQixnQkFBZ0IsRUFBRSxJQUFJOzRCQUN0QixrQkFBa0IsRUFBRSxJQUFJOzRCQUN4Qix1QkFBdUIsRUFBRSxJQUFJO3lCQUNoQztxQkFDSjtpQkFDSjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLElBQUk7b0JBQ1osVUFBVSxFQUFFLENBQUM7NEJBQ0wsSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLGtDQUFrQzs0QkFDMUMsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUUsRUFBRTs0QkFDbkIseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsS0FBSzs0QkFDM0IsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEM7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLDhCQUE4Qjs0QkFDdEMsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUcsQ0FBQztvQ0FDZixNQUFNLEVBQUUsb0JBQW9CO29DQUM1QixNQUFNLEVBQUUsTUFBTTtvQ0FDZCxPQUFPLEVBQUUsa0JBQWtCO2lDQUM5QixFQUFFO29DQUNDLE1BQU0sRUFBRSxtQkFBbUI7b0NBQzNCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxvQkFBb0I7aUNBQ2hDLEVBQUU7b0NBQ0MsTUFBTSxFQUFFLFVBQVU7b0NBQ2xCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxnQkFBZ0I7aUNBQzVCLENBQUM7NEJBQ0YseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsSUFBSTs0QkFDMUIsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEM7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELGFBQWEsRUFBRSxDQUFDO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBL0ZELElBK0ZDO0FBL0ZZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0ErRjFCO0FBL0ZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjY291bnRNb2RlbCB9IGZyb20gXCIuL2FjY291bnRzLm1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBY2NvdW50U2VydmljZSB7XHJcblxyXG4gICAgIHB1YmxpYyBzZWxlY3RlZEFjY291bnQ6IGFueSA9IFwiXCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZEFjY291bnQoYWNjb3VudDogQWNjb3VudE1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxBY2NvdW50cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImFjY291bnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjdXJyZW50WWVhclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ5ZWFyXCI6IDIwMTcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY2NvdW50c1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxMjQzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiTGltaXRlZCBQdXJwb3NlIEZsZXggU3BlbmRpbmcgQWNjb3VudCAoTFBGU0EpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsQW1vdW50XCI6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZWRBbW91bnRcIjogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWdlbmREZXRhaWxzXCI6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbm51YWxDb250cmlidXRpb25MaW1pdFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93SW52ZXN0ZWRBbW91bnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImludmVzdGVkQW1vdW50XCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRyaWJ1dGlvbnNZVERcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1RoaXNZZWFyXCI6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxMjQ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiSGVhbHRoIFNhdmluZ3MgQWNjb3VudCAoSFNBKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbEFtb3VudFwiOiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VkQW1vdW50XCI6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGVnZW5kRGV0YWlsc1wiIDogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCJDb250cmlidXRpb25zIDIwMTZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIxNTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYig2MSwgMTY4LCA3MilcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgWVREXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3N0XCI6IFwiNDUwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoMTEwLCAxOTAsIDExOClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkludmVzdGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3N0XCI6IFwiMzAwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoNywgMjksIDczKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5udWFsQ29udHJpYnV0aW9uTGltaXRcIjogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd0ludmVzdGVkQW1vdW50XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImludmVzdGVkQW1vdW50XCI6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRyaWJ1dGlvbnNZVERcIjogNDUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1RoaXNZZWFyXCI6IDE1MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInByaW9yWWVhclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ5ZWFyXCI6IDIwMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY2NvdW50c1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxMjQzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiTGltaXRlZCBQdXJwb3NlIFNwZW5kaW5nIGFjY291bnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxBbW91bnRcIjogMjAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlZEFtb3VudFwiOiA5ODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZ2VuZERldGFpbHNcIjogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFubnVhbENvbnRyaWJ1dGlvbkxpbWl0XCI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dJbnZlc3RlZEFtb3VudFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW52ZXN0ZWRBbW91bnRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1lURFwiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250cmlidXRpb25zVGhpc1llYXJcIjogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDEyNDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJIZWFsdGggU2F2aW5ncyBBY2NvdW50IChIU0EpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsQW1vdW50XCI6IDYyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZWRBbW91bnRcIjogOTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWdlbmREZXRhaWxzXCIgOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgMjAxNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29zdFwiOiBcIjE1MDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwicmdiKDYxLCAxNjgsIDcyKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwiQ29udHJpYnV0aW9ucyBZVERcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCI0NTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYigxMTAsIDE5MCwgMTE4KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwiSW52ZXN0ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIzMDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYig3LCAyOSwgNzMpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbm51YWxDb250cmlidXRpb25MaW1pdFwiOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93SW52ZXN0ZWRBbW91bnRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW52ZXN0ZWRBbW91bnRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1lURFwiOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250cmlidXRpb25zVGhpc1llYXJcIjogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFjdGlvbkl0ZW1zXCI6IDJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59Il19