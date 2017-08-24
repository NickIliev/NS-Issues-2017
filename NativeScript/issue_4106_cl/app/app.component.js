"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var shared_1 = require("./shared");
var Platform = require("platform");
var AppComponent = (function () {
    function AppComponent(router, translate, loginService, tokenService) {
        this.router = router;
        this.loginService = loginService;
        this.tokenService = tokenService;
        var language = Platform.device.language;
        translate.addLangs(["en", "de"]);
        translate.setDefaultLang('de');
        translate.use(Platform.device.language.startsWith('d') ? language : 'en');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var that = this;
        // Initialize the firebase
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
            onPushTokenReceivedCallback: function (deviceID) {
                application_settings_1.setString("deviceID", deviceID);
                console.log("Device ID : ", deviceID);
            },
            // Handle Receive Push Notification
            onMessageReceivedCallback: function (message) {
                // get User or Group Details in Push Notification  
                console.log("userName: " + message.data.username + " " + "chatUserId: " + message.data.userid + "Group Name: " + message.data.groupname + " " + "chatGroupId: " + message.data.groupid);
                // If application open navigate to Push Notification  
                if (message.foreground == false) {
                    //  Private chat Redirection
                    if (message.data.userid != -1) {
                        var navigationExtras = {
                            queryParams: {
                                "OtherName": message.data.username,
                                "chatUserId": message.data.userid
                            }
                        };
                        that.router.navigate(["/tc-chat"], navigationExtras);
                    }
                    else {
                        var navigationExtras = {
                            queryParams: {
                                "groupName": message.data.groupname,
                                "chatGroupId": message.data.groupid
                            }
                        };
                        that.router.navigate(["/tc-group-chat"], navigationExtras);
                    }
                }
            }
        }).then(function (instance) {
            console.log("firebase.init done");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
        if (this.tokenService.isTokenExpired(application_settings_1.getString("accessToken"))) {
            this.loginService.refreshTokenTimer()
                .subscribe(function (res) {
                console.log("successfully .");
                _this.tokenService.initialize(_this.loginService.getToken());
            }, function (error) {
                console.log("refresh error");
            });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "gr-main",
        template: "<page-router-outlet></page-router-outlet>"
    }),
    __metadata("design:paramtypes", [router_1.Router, core_2.TranslateService, shared_1.LoginService, shared_1.TokenService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsdURBQTBEO0FBQzFELDZEQUFrRjtBQUNsRiwwQ0FBMkQ7QUFDM0QsNENBQXVEO0FBQ3ZELG1DQUFxRDtBQUNyRCxtQ0FBcUM7QUFLckMsSUFBYSxZQUFZO0lBRXJCLHNCQUFvQixNQUFjLEVBQUUsU0FBMkIsRUFBUyxZQUEwQixFQUFTLFlBQTBCO1FBQWpILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBc0MsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUdqSSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNELCtCQUFRLEdBQVI7UUFBQSxpQkFpRUM7UUEvREcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLDBCQUEwQjtRQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ1Ysa0ZBQWtGO1lBQ2xGLDZCQUE2QjtZQUU3QiwyQkFBMkIsRUFBRSxVQUFVLFFBQVE7Z0JBQzNDLGdDQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsbUNBQW1DO1lBQ25DLHlCQUF5QixFQUFFLFVBQVUsT0FBTztnQkFFeEMsbURBQW1EO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXhMLHNEQUFzRDtnQkFDdEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUU5Qiw0QkFBNEI7b0JBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxnQkFBZ0IsR0FBcUI7NEJBQ3JDLFdBQVcsRUFBRTtnQ0FDVCxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRO2dDQUNsQyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNOzZCQUNwQzt5QkFDSixDQUFBO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDekQsQ0FBQztvQkFFRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixJQUFJLGdCQUFnQixHQUFxQjs0QkFDckMsV0FBVyxFQUFFO2dDQUNULFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0NBQ25DLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU87NkJBQ3RDO3lCQUNKLENBQUE7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQy9ELENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7U0FDSixDQUFDLENBQUMsSUFBSSxDQUNILFVBQUMsUUFBUTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQ0EsQ0FBQztRQUVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGdDQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtpQkFDaEMsU0FBUyxDQUNWLFVBQUMsR0FBRztnQkFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMvRCxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUNBLENBQUM7UUFDVixDQUFDO0lBQ1QsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTdFRCxJQTZFQztBQTdFWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsU0FBUztRQUNuQixRQUFRLEVBQUUsMkNBQTJDO0tBQ3hELENBQUM7cUNBRzhCLGVBQU0sRUFBYSx1QkFBZ0IsRUFBdUIscUJBQVksRUFBdUIscUJBQVk7R0FGNUgsWUFBWSxDQTZFeEI7QUE3RVksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IGdldFN0cmluZywgZ2V0TnVtYmVyLCBzZXROdW1iZXIsIHNldFN0cmluZyB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBMb2dpblNlcnZpY2UsIFRva2VuU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZFwiXG5pbXBvcnQgKiBhcyBQbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImdyLW1haW5cIixcbiAgICB0ZW1wbGF0ZTogXCI8cGFnZS1yb3V0ZXItb3V0bGV0PjwvcGFnZS1yb3V0ZXItb3V0bGV0PlwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLHByaXZhdGUgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UscHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSkge1xuICAgICAgICBcblxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBQbGF0Zm9ybS5kZXZpY2UubGFuZ3VhZ2U7XG4gICAgICAgIHRyYW5zbGF0ZS5hZGRMYW5ncyhbXCJlblwiLCBcImRlXCJdKTtcbiAgICAgICAgdHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKCdkZScpO1xuXG4gICAgICAgIHRyYW5zbGF0ZS51c2UoUGxhdGZvcm0uZGV2aWNlLmxhbmd1YWdlLnN0YXJ0c1dpdGgoJ2QnKSA/IGxhbmd1YWdlIDogJ2VuJyk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBmaXJlYmFzZVxuICAgICAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgcGFzcyBpbiBwcm9wZXJ0aWVzIGZvciBkYXRhYmFzZSwgYXV0aGVudGljYXRpb24gYW5kIGNsb3VkIG1lc3NhZ2luZyxcbiAgICAgICAgICAgIC8vIHNlZSB0aGVpciByZXNwZWN0aXZlIGRvY3MuXG5cbiAgICAgICAgICAgIG9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKGRldmljZUlEKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiZGV2aWNlSURcIiwgZGV2aWNlSUQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIElEIDogXCIsIGRldmljZUlEKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBIYW5kbGUgUmVjZWl2ZSBQdXNoIE5vdGlmaWNhdGlvblxuICAgICAgICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBVc2VyIG9yIEdyb3VwIERldGFpbHMgaW4gUHVzaCBOb3RpZmljYXRpb24gIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlck5hbWU6IFwiICsgbWVzc2FnZS5kYXRhLnVzZXJuYW1lICsgXCIgXCIgKyBcImNoYXRVc2VySWQ6IFwiICsgbWVzc2FnZS5kYXRhLnVzZXJpZCArIFwiR3JvdXAgTmFtZTogXCIgKyBtZXNzYWdlLmRhdGEuZ3JvdXBuYW1lICsgXCIgXCIgKyBcImNoYXRHcm91cElkOiBcIiArIG1lc3NhZ2UuZGF0YS5ncm91cGlkKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIGFwcGxpY2F0aW9uIG9wZW4gbmF2aWdhdGUgdG8gUHVzaCBOb3RpZmljYXRpb24gIFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmZvcmVncm91bmQgPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgUHJpdmF0ZSBjaGF0IFJlZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEudXNlcmlkICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk90aGVyTmFtZVwiOiBtZXNzYWdlLmRhdGEudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhdFVzZXJJZFwiOiBtZXNzYWdlLmRhdGEudXNlcmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3V0ZXIubmF2aWdhdGUoW1wiL3RjLWNoYXRcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICBHcm91cCBDaGF0IFJlZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJncm91cE5hbWVcIjogbWVzc2FnZS5kYXRhLmdyb3VwbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGF0R3JvdXBJZFwiOiBtZXNzYWdlLmRhdGEuZ3JvdXBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi90Yy1ncm91cC1jaGF0XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgIChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBkb25lXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICBpZiAodGhpcy50b2tlblNlcnZpY2UuaXNUb2tlbkV4cGlyZWQoZ2V0U3RyaW5nKFwiYWNjZXNzVG9rZW5cIikpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpblNlcnZpY2UucmVmcmVzaFRva2VuVGltZXIoKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NmdWxseSAuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlblNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLmxvZ2luU2VydmljZS5nZXRUb2tlbigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZnJlc2ggZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG59Il19