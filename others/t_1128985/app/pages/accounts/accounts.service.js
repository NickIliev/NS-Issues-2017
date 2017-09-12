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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFJM0MsSUFBYSxjQUFjO0lBRDNCO1FBR1ksb0JBQWUsR0FBUSxFQUFFLENBQUM7SUE2RnRDLENBQUM7SUExRlUsMkNBQWtCLEdBQXpCLFVBQTBCLE9BQXFCO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFTSx1Q0FBYyxHQUFyQjtRQUNJLE1BQU0sQ0FBQztZQUNILFNBQVMsRUFBRTtnQkFDUCxhQUFhLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osVUFBVSxFQUFFLENBQUM7NEJBQ0wsSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLCtDQUErQzs0QkFDdkQsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUUsRUFBRTs0QkFDbkIseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsS0FBSzs0QkFDM0IsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEMsRUFBRTs0QkFDQyxJQUFJLEVBQUUsSUFBSTs0QkFDVixNQUFNLEVBQUUsOEJBQThCOzRCQUN0QyxhQUFhLEVBQUUsSUFBSTs0QkFDbkIsWUFBWSxFQUFFLEdBQUc7NEJBQ2pCLGVBQWUsRUFBRyxDQUFDO29DQUNmLE1BQU0sRUFBRSxvQkFBb0I7b0NBQzVCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxrQkFBa0I7aUNBQzlCLEVBQUU7b0NBQ0MsTUFBTSxFQUFFLG1CQUFtQjtvQ0FDM0IsTUFBTSxFQUFFLE1BQU07b0NBQ2QsT0FBTyxFQUFFLG9CQUFvQjtpQ0FDaEMsRUFBRTtvQ0FDQyxNQUFNLEVBQUUsVUFBVTtvQ0FDbEIsTUFBTSxFQUFFLE1BQU07b0NBQ2QsT0FBTyxFQUFFLGdCQUFnQjtpQ0FDNUIsQ0FBQzs0QkFDRix5QkFBeUIsRUFBRSxJQUFJOzRCQUMvQixvQkFBb0IsRUFBRSxJQUFJOzRCQUMxQixnQkFBZ0IsRUFBRSxJQUFJOzRCQUN0QixrQkFBa0IsRUFBRSxJQUFJOzRCQUN4Qix1QkFBdUIsRUFBRSxJQUFJO3lCQUNoQztxQkFDSjtpQkFDSjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLElBQUk7b0JBQ1osVUFBVSxFQUFFLENBQUM7NEJBQ0wsSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLGtDQUFrQzs0QkFDMUMsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUUsRUFBRTs0QkFDbkIseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsS0FBSzs0QkFDM0IsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEM7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLDhCQUE4Qjs0QkFDdEMsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFlBQVksRUFBRSxHQUFHOzRCQUNqQixlQUFlLEVBQUcsQ0FBQztvQ0FDZixNQUFNLEVBQUUsb0JBQW9CO29DQUM1QixNQUFNLEVBQUUsTUFBTTtvQ0FDZCxPQUFPLEVBQUUsa0JBQWtCO2lDQUM5QixFQUFFO29DQUNDLE1BQU0sRUFBRSxtQkFBbUI7b0NBQzNCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxvQkFBb0I7aUNBQ2hDLEVBQUU7b0NBQ0MsTUFBTSxFQUFFLFVBQVU7b0NBQ2xCLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sRUFBRSxnQkFBZ0I7aUNBQzVCLENBQUM7NEJBQ0YseUJBQXlCLEVBQUUsSUFBSTs0QkFDL0Isb0JBQW9CLEVBQUUsSUFBSTs0QkFDMUIsZ0JBQWdCLEVBQUUsSUFBSTs0QkFDdEIsa0JBQWtCLEVBQUUsSUFBSTs0QkFDeEIsdUJBQXVCLEVBQUUsSUFBSTt5QkFDaEM7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELGFBQWEsRUFBRSxDQUFDO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBL0ZELElBK0ZDO0FBL0ZZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0ErRjFCO0FBL0ZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY2NvdW50TW9kZWwgfSBmcm9tIFwiLi9hY2NvdW50cy5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjb3VudFNlcnZpY2Uge1xuXG4gICAgIHB1YmxpYyBzZWxlY3RlZEFjY291bnQ6IGFueSA9IFwiXCI7XG5cblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZEFjY291bnQoYWNjb3VudDogQWNjb3VudE1vZGVsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gYWNjb3VudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsQWNjb3VudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImFjY291bnRcIjoge1xuICAgICAgICAgICAgICAgIFwiY3VycmVudFllYXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInllYXJcIjogMjAxNyxcbiAgICAgICAgICAgICAgICAgICAgXCJhY2NvdW50c1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogMTI0MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJMaW1pdGVkIFB1cnBvc2UgRmxleCBTcGVuZGluZyBBY2NvdW50IChMUEZTQSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsQW1vdW50XCI6IDMwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VkQW1vdW50XCI6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZ2VuZERldGFpbHNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbm51YWxDb250cmlidXRpb25MaW1pdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd0ludmVzdGVkQW1vdW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW52ZXN0ZWRBbW91bnRcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRyaWJ1dGlvbnNZVERcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRyaWJ1dGlvbnNUaGlzWWVhclwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxMjQ1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkhlYWx0aCBTYXZpbmdzIEFjY291bnQgKEhTQSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsQW1vdW50XCI6IDYwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VkQW1vdW50XCI6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZ2VuZERldGFpbHNcIiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgMjAxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIxNTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoNjEsIDE2OCwgNzIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgWVREXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29zdFwiOiBcIjQ1MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYigxMTAsIDE5MCwgMTE4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCJJbnZlc3RlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIzMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoNywgMjksIDczKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbm51YWxDb250cmlidXRpb25MaW1pdFwiOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd0ludmVzdGVkQW1vdW50XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnZlc3RlZEFtb3VudFwiOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1lURFwiOiA0NTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1RoaXNZZWFyXCI6IDE1MDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJwcmlvclllYXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInllYXJcIjogMjAxNixcbiAgICAgICAgICAgICAgICAgICAgXCJhY2NvdW50c1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogMTI0MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJMaW1pdGVkIFB1cnBvc2UgU3BlbmRpbmcgYWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxBbW91bnRcIjogMjAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZWRBbW91bnRcIjogOTgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGVnZW5kRGV0YWlsc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFubnVhbENvbnRyaWJ1dGlvbkxpbWl0XCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93SW52ZXN0ZWRBbW91bnRcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnZlc3RlZEFtb3VudFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1lURFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1RoaXNZZWFyXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAxMjQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkhlYWx0aCBTYXZpbmdzIEFjY291bnQgKEhTQSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsQW1vdW50XCI6IDYyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VkQW1vdW50XCI6IDk4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZ2VuZERldGFpbHNcIiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgMjAxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIxNTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoNjEsIDE2OCwgNzIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIkNvbnRyaWJ1dGlvbnMgWVREXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29zdFwiOiBcIjQ1MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYigxMTAsIDE5MCwgMTE4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCJJbnZlc3RlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogXCIzMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2IoNywgMjksIDczKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbm51YWxDb250cmlidXRpb25MaW1pdFwiOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd0ludmVzdGVkQW1vdW50XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnZlc3RlZEFtb3VudFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1lURFwiOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udHJpYnV0aW9uc1RoaXNZZWFyXCI6IDMwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFjdGlvbkl0ZW1zXCI6IDJcbiAgICAgICAgfTtcbiAgICB9XG59Il19