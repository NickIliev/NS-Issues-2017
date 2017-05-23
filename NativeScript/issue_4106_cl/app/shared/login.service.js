"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("application-settings");
var http_1 = require("@angular/http");
var router_1 = require("nativescript-angular/router");
var token_service_1 = require("./token.service");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var dialogsModule = require("ui/dialogs");
var refreshToken = "refreshToken";
var tokenKey = "token";
var isLogged = "isLogged";
var refreshKey = "refreshToken";
var deviceToken = "deviceToken";
var LoginService = (function () {
    function LoginService(routerExtensions, http, tokenService) {
        this.routerExtensions = routerExtensions;
        this.http = http;
        this.tokenService = tokenService;
        this.isAuthenticate = true;
        // OLD Base URL for requesting Token from Identity server and 
        // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';
        this.baseApiUrl = 'https://Host.begis.de/Hieber/Test/MessageApi/api';
        // NEW Base URL for requesting Token from Identity server 
        // private tokenUrl= 'https://host.begis.de/Test/IdSrv/connect';
        // private baseApiUrl = 'https://host.begis.de/Test/MessageApi/api';
        // New end Points
        this.tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
        if (this.token) {
            // this.backend.el.authentication.setAuthorization(this.token,this.refreshToken, "bearer");
        }
    }
    Object.defineProperty(LoginService.prototype, "isLoggedIn", {
        //  private baseApiUrl = 'http://192.168.103.120/CmsIdSrv/identity';*/
        get: function () {
            return !!application_settings_1.getString(tokenKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "isLogged", {
        get: function () {
            return application_settings_1.getBoolean(isLogged);
        },
        set: function (theLogin) {
            application_settings_1.setBoolean(isLogged, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "deviceToken", {
        get: function () {
            return application_settings_1.getString(deviceToken);
        },
        set: function (refresh) {
            application_settings_1.setString(deviceToken, refresh);
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.getdeviceToken = function () {
        return this.deviceToken;
    };
    Object.defineProperty(LoginService.prototype, "token", {
        get: function () {
            return application_settings_1.getString(tokenKey);
        },
        set: function (theToken) {
            application_settings_1.setString(tokenKey, theToken);
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.getToken = function () {
        return this.token;
    };
    Object.defineProperty(LoginService.prototype, "refreshToken", {
        get: function () {
            return application_settings_1.getString(refreshToken);
        },
        set: function (refresh) {
            application_settings_1.setString(refreshToken, refresh);
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.getrefreshToken = function () {
        return this.refreshToken;
    };
    LoginService.prototype.getIsLogged = function () {
        return this.isLogged;
    };
    /** Login Web API Call and error Handaling */
    LoginService.prototype.login = function (user) {
        var _this = this;
        // this.initFirebase();
        var content = "username=" + user.email + "&password=" + user.password + "&grant_type=password" + "&scope=offline_access read openid";
        return this.http.post(this.tokenUrl + '/token', content, { headers: this.getHeaders() }).map(function (res) { return res.json(); })
            .do(function (res) {
            _this.token = res.access_token;
            _this.tokenService.expires_in = res.expires_in;
            _this.refreshToken = res.refresh_token;
            _this.isLogged = true;
            application_settings_1.setString("refreshToken", res.refresh_token);
            application_settings_1.setString("accessToken", res.access_token);
            console.log("access_token: login_check: " + _this.token + _this.refreshToken);
            _this.refreshTokenCounter = setInterval(function () { return _this.refreshTokenTimer(); }, 3, 6e+6);
        })
            .catch(this.handleErrors);
    };
    // Register device for Push Notification
    LoginService.prototype.registerDevice = function (deviceId, token) {
        var headers = this.getDeviceRegsiterHeader(token);
        this.registerDeviceToken = application_settings_1.getString("deviceID", deviceId);
        // console.log("Calling API:"+ this.registerDeviceToken);
        return this.http.post(this.baseApiUrl + '/PushNotification?deviceid=' + this.registerDeviceToken, { headers: this.getDeviceRegsiterHeader(token) }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    LoginService.prototype.refreshTokenTimer = function () {
        var _this = this;
        var content = "grant_type=refresh_token" + "&scope=offline_access read openid" + "&refresh_token=" + application_settings_1.getString("refreshToken");
        return this.http.post(this.tokenUrl + "/token", content, { headers: this.getHeaders() }).map(function (res) { return res.json(); })
            .do(function (res) {
            _this.token = res.access_token;
            application_settings_1.setString("accessToken", res.access_token);
            application_settings_1.setString("refreshToken", res.refresh_token);
            // console.log("access_token: login_check: "+ this.token + this.refreshToken );
            _this.refreshToken = res.refresh_token;
            _this.tokenService.initialize(_this.token);
            _this.isLogged = true;
        })
            .catch(this.handleError);
        // var that = this;
        // return http.request({
        //   url:this.tokenUrl + "/token",
        //   method:"POST",
        //   headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + "cm8uY2xpZW50OnNlY3JldA==" },
        //   content: "grant_type=refresh_token"+"&refresh_token="+"7721ad6af779208ca7cf2cb6b3b07252"
        // }).then(function (response){
        //   var content = JSON.parse(response.content);
        //   console.log(content.refresh_token+"");
        // });
    };
    LoginService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.json();
        console.log(body);
        return body.data || {};
    };
    // Handle errMsg
    LoginService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    };
    LoginService.prototype.tokentake = function (token) {
        console.log(token + "take this token");
    };
    // Logout from the Application and remove Application settings
    LoginService.prototype.logoff = function () {
        // this.backend.el.authentication.clearAuthorization();
        this.isLogged == false;
        this.token = "";
        application_settings_1.setNumber("userID", 0);
        application_settings_1.setNumber("userID1", 0);
        application_settings_1.setString("userName", "");
    };
    // Header Details for Register Device Token
    LoginService.prototype.getDeviceRegsiterHeader = function (token) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + token);
        // console.log("Token1: "+ token);
        return headers;
    };
    // set Header for API call
    LoginService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Basic " + "cm8uY2xpZW50OnNlY3JldA==");
        return headers;
    };
    // Handle Error
    LoginService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        http_1.Http, token_service_1.TokenService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkRBQStGO0FBQy9GLHNDQUF3RDtBQUV4RCxzREFBK0Q7QUFDL0QsaURBQStDO0FBRS9DLDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUUxQyxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFFcEMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUU1QixJQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFDbEMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBS2xDLElBQWEsWUFBWTtJQW9FdkIsc0JBQ1UsZ0JBQWtDLEVBQ2xDLElBQVUsRUFBVSxZQUEwQjtRQUQ5QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXBFeEQsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFLdEIsOERBQThEO1FBQzlELDZEQUE2RDtRQUNyRCxlQUFVLEdBQUcsa0RBQWtELENBQUM7UUFFeEUsMERBQTBEO1FBQzFELGdFQUFnRTtRQUNoRSxvRUFBb0U7UUFFcEUsaUJBQWlCO1FBQ1QsYUFBUSxHQUFHLHVEQUF1RCxDQUFDO1FBdUR6RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLDJGQUEyRjtRQUU3RixDQUFDO0lBQ0gsQ0FBQztJQXhERCxzQkFBSSxvQ0FBVTtRQUZkLHNFQUFzRTthQUV0RTtZQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0NBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixDQUFD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ZTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBak1ELElBaU1DO0FBak1ZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTtxQ0FzRWlCLHlCQUFnQjtRQUM1QixXQUFJLEVBQXdCLDRCQUFZO0dBdEU3QyxZQUFZLENBaU14QjtBQWpNWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIHNldE51bWJlciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSBcIi4vdG9rZW4uc2VydmljZVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbnZhciBkaWFsb2dzTW9kdWxlID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XG5cbmNvbnN0IHJlZnJlc2hUb2tlbiA9IFwicmVmcmVzaFRva2VuXCI7XG5cbmNvbnN0IHRva2VuS2V5ID0gXCJ0b2tlblwiO1xuY29uc3QgaXNMb2dnZWQgPSBcImlzTG9nZ2VkXCI7XG5cbmNvbnN0IHJlZnJlc2hLZXkgPSBcInJlZnJlc2hUb2tlblwiO1xuY29uc3QgZGV2aWNlVG9rZW4gPSBcImRldmljZVRva2VuXCI7XG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5TZXJ2aWNlIHtcblxuICBpc0F1dGhlbnRpY2F0ZSA9IHRydWU7XG4gIHJlZ2lzdGVyRGV2aWNlVG9rZW46IHN0cmluZztcbiAgcmVmcmVzaFRva2VuQ291bnRlcjogbnVtYmVyO1xuXG5cbiAgLy8gT0xEIEJhc2UgVVJMIGZvciByZXF1ZXN0aW5nIFRva2VuIGZyb20gSWRlbnRpdHkgc2VydmVyIGFuZCBcbiAgLy8gcHJpdmF0ZSB0b2tlblVybCA9ICdodHRwOi8vMTkyLjE2OC4xMDMuMTIwL0lkU3J2L2Nvbm5lY3QnO1xuICBwcml2YXRlIGJhc2VBcGlVcmwgPSAnaHR0cHM6Ly9Ib3N0LmJlZ2lzLmRlL0hpZWJlci9UZXN0L01lc3NhZ2VBcGkvYXBpJztcblxuICAvLyBORVcgQmFzZSBVUkwgZm9yIHJlcXVlc3RpbmcgVG9rZW4gZnJvbSBJZGVudGl0eSBzZXJ2ZXIgXG4gIC8vIHByaXZhdGUgdG9rZW5Vcmw9ICdodHRwczovL2hvc3QuYmVnaXMuZGUvVGVzdC9JZFNydi9jb25uZWN0JztcbiAgLy8gcHJpdmF0ZSBiYXNlQXBpVXJsID0gJ2h0dHBzOi8vaG9zdC5iZWdpcy5kZS9UZXN0L01lc3NhZ2VBcGkvYXBpJztcblxuICAvLyBOZXcgZW5kIFBvaW50c1xuICBwcml2YXRlIHRva2VuVXJsID0gJ2h0dHBzOi8vSG9zdC5iZWdpcy5kZS9IaWViZXJXZWJfVGVzdC9JZGVudGl0eS9jb25uZWN0JztcbiAgLy8gIHByaXZhdGUgYmFzZUFwaVVybCA9ICdodHRwOi8vMTkyLjE2OC4xMDMuMTIwL0Ntc0lkU3J2L2lkZW50aXR5JzsqL1xuXG4gIGdldCBpc0xvZ2dlZEluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWdldFN0cmluZyh0b2tlbktleSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc0xvZ2dlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ2V0Qm9vbGVhbihpc0xvZ2dlZCk7XG4gIH1cblxuICBwcml2YXRlIHNldCBpc0xvZ2dlZCh0aGVMb2dpbjogYm9vbGVhbikge1xuICAgIHNldEJvb2xlYW4oaXNMb2dnZWQsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGRldmljZVRva2VuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGdldFN0cmluZyhkZXZpY2VUb2tlbik7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgZGV2aWNlVG9rZW4ocmVmcmVzaDogc3RyaW5nKSB7XG4gICAgc2V0U3RyaW5nKGRldmljZVRva2VuLCByZWZyZXNoKTtcbiAgfVxuXG4gIGdldGRldmljZVRva2VuKCkge1xuICAgIHJldHVybiB0aGlzLmRldmljZVRva2VuO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdG9rZW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0U3RyaW5nKHRva2VuS2V5KTtcbiAgfVxuICBwcml2YXRlIHNldCB0b2tlbih0aGVUb2tlbjogc3RyaW5nKSB7XG4gICAgc2V0U3RyaW5nKHRva2VuS2V5LCB0aGVUb2tlbik7XG4gIH1cblxuICBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJlZnJlc2hUb2tlbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRTdHJpbmcocmVmcmVzaFRva2VuKTtcbiAgfVxuICBwcml2YXRlIHNldCByZWZyZXNoVG9rZW4ocmVmcmVzaDogc3RyaW5nKSB7XG4gICAgc2V0U3RyaW5nKHJlZnJlc2hUb2tlbiwgcmVmcmVzaCk7XG4gIH1cblxuICBnZXRyZWZyZXNoVG9rZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuO1xuICB9XG5cbiAgZ2V0SXNMb2dnZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlKSB7XG4gICAgaWYgKHRoaXMudG9rZW4pIHtcbiAgICAgIC8vIHRoaXMuYmFja2VuZC5lbC5hdXRoZW50aWNhdGlvbi5zZXRBdXRob3JpemF0aW9uKHRoaXMudG9rZW4sdGhpcy5yZWZyZXNoVG9rZW4sIFwiYmVhcmVyXCIpO1xuXG4gICAgfVxuICB9XG5cbiAgLyoqIExvZ2luIFdlYiBBUEkgQ2FsbCBhbmQgZXJyb3IgSGFuZGFsaW5nICovXG4gIGxvZ2luKHVzZXI6IFVzZXIpIHtcbiAgICAvLyB0aGlzLmluaXRGaXJlYmFzZSgpO1xuICAgIHZhciBjb250ZW50ID0gXCJ1c2VybmFtZT1cIiArIHVzZXIuZW1haWwgKyBcIiZwYXNzd29yZD1cIiArIHVzZXIucGFzc3dvcmQgKyBcIiZncmFudF90eXBlPXBhc3N3b3JkXCIgKyBcIiZzY29wZT1vZmZsaW5lX2FjY2VzcyByZWFkIG9wZW5pZFwiO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIHRoaXMudG9rZW5VcmwgKyAnL3Rva2VuJyxcbiAgICAgIGNvbnRlbnQsXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH1cbiAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5kbyhyZXMgPT4ge1xuICAgICAgICB0aGlzLnRva2VuID0gcmVzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy50b2tlblNlcnZpY2UuZXhwaXJlc19pbiA9IHJlcy5leHBpcmVzX2luO1xuICAgICAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IHJlcy5yZWZyZXNoX3Rva2VuO1xuICAgICAgICB0aGlzLmlzTG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgc2V0U3RyaW5nKFwicmVmcmVzaFRva2VuXCIsIHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzVG9rZW5cIiwgcmVzLmFjY2Vzc190b2tlbik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXNzX3Rva2VuOiBsb2dpbl9jaGVjazogXCIgKyB0aGlzLnRva2VuICsgdGhpcy5yZWZyZXNoVG9rZW4pO1xuICAgICAgICB0aGlzLnJlZnJlc2hUb2tlbkNvdW50ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJlZnJlc2hUb2tlblRpbWVyKCksIDMsIDZlKzYpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICAvLyBSZWdpc3RlciBkZXZpY2UgZm9yIFB1c2ggTm90aWZpY2F0aW9uXG4gIHJlZ2lzdGVyRGV2aWNlKGRldmljZUlkOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0RGV2aWNlUmVnc2l0ZXJIZWFkZXIodG9rZW4pO1xuXG4gICAgdGhpcy5yZWdpc3RlckRldmljZVRva2VuID0gZ2V0U3RyaW5nKFwiZGV2aWNlSURcIiwgZGV2aWNlSWQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FsbGluZyBBUEk6XCIrIHRoaXMucmVnaXN0ZXJEZXZpY2VUb2tlbik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9QdXNoTm90aWZpY2F0aW9uP2RldmljZWlkPScgKyB0aGlzLnJlZ2lzdGVyRGV2aWNlVG9rZW4sXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0RGV2aWNlUmVnc2l0ZXJIZWFkZXIodG9rZW4pIH1cbiAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuXG4gIHJlZnJlc2hUb2tlblRpbWVyKCkge1xuICAgIHZhciBjb250ZW50ID0gXCJncmFudF90eXBlPXJlZnJlc2hfdG9rZW5cIiArIFwiJnNjb3BlPW9mZmxpbmVfYWNjZXNzIHJlYWQgb3BlbmlkXCIgKyBcIiZyZWZyZXNoX3Rva2VuPVwiICsgZ2V0U3RyaW5nKFwicmVmcmVzaFRva2VuXCIpO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIHRoaXMudG9rZW5VcmwgKyBcIi90b2tlblwiLCBjb250ZW50LFxuICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9XG4gICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAuZG8ocmVzID0+IHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHNldFN0cmluZyhcImFjY2Vzc1Rva2VuXCIsIHJlcy5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICBzZXRTdHJpbmcoXCJyZWZyZXNoVG9rZW5cIiwgcmVzLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFjY2Vzc190b2tlbjogbG9naW5fY2hlY2s6IFwiKyB0aGlzLnRva2VuICsgdGhpcy5yZWZyZXNoVG9rZW4gKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSByZXMucmVmcmVzaF90b2tlbjtcbiAgICAgICAgdGhpcy50b2tlblNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnRva2VuKTtcbiAgICAgICAgdGhpcy5pc0xvZ2dlZCA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIC8vIHZhciB0aGF0ID0gdGhpcztcbiAgICAvLyByZXR1cm4gaHR0cC5yZXF1ZXN0KHtcbiAgICAvLyAgIHVybDp0aGlzLnRva2VuVXJsICsgXCIvdG9rZW5cIixcbiAgICAvLyAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAvLyAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiwgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgXCIgKyBcImNtOHVZMnhwWlc1ME9uTmxZM0psZEE9PVwiIH0sXG4gICAgLy8gICBjb250ZW50OiBcImdyYW50X3R5cGU9cmVmcmVzaF90b2tlblwiK1wiJnJlZnJlc2hfdG9rZW49XCIrXCI3NzIxYWQ2YWY3NzkyMDhjYTdjZjJjYjZiM2IwNzI1MlwiXG4gICAgLy8gfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuICAgIC8vICAgdmFyIGNvbnRlbnQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgIC8vICAgY29uc29sZS5sb2coY29udGVudC5yZWZyZXNoX3Rva2VuK1wiXCIpO1xuICAgIC8vIH0pO1xuICB9XG4gIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgIHJldHVybiBib2R5LmRhdGEgfHwge307XG4gIH1cblxuICAvLyBIYW5kbGUgZXJyTXNnXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIC8vIEluIGEgcmVhbCB3b3JsZCBhcHAsIHdlIG1pZ2h0IHVzZSBhIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXG4gICAgLy8gV2UnZCBhbHNvIGRpZyBkZWVwZXIgaW50byB0aGUgZXJyb3IgdG8gZ2V0IGEgYmV0dGVyIG1lc3NhZ2VcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxuXG4gIHRva2VudGFrZSh0b2tlbjogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2codG9rZW4gKyBcInRha2UgdGhpcyB0b2tlblwiKTtcbiAgfVxuXG4gIC8vIExvZ291dCBmcm9tIHRoZSBBcHBsaWNhdGlvbiBhbmQgcmVtb3ZlIEFwcGxpY2F0aW9uIHNldHRpbmdzXG4gIGxvZ29mZigpIHtcbiAgICAvLyB0aGlzLmJhY2tlbmQuZWwuYXV0aGVudGljYXRpb24uY2xlYXJBdXRob3JpemF0aW9uKCk7XG4gICAgdGhpcy5pc0xvZ2dlZCA9PSBmYWxzZTtcbiAgICB0aGlzLnRva2VuID0gXCJcIjtcbiAgICBzZXROdW1iZXIoXCJ1c2VySURcIiwgMCk7XG4gICAgc2V0TnVtYmVyKFwidXNlcklEMVwiLCAwKTtcbiAgICBzZXRTdHJpbmcoXCJ1c2VyTmFtZVwiLCBcIlwiKTtcbiAgfVxuXG4gIC8vIEhlYWRlciBEZXRhaWxzIGZvciBSZWdpc3RlciBEZXZpY2UgVG9rZW5cbiAgcHJpdmF0ZSBnZXREZXZpY2VSZWdzaXRlckhlYWRlcih0b2tlbikge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiVG9rZW4xOiBcIisgdG9rZW4pO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLy8gc2V0IEhlYWRlciBmb3IgQVBJIGNhbGxcbiAgcHJpdmF0ZSBnZXRIZWFkZXJzKCkge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIFwiY204dVkyeHBaVzUwT25ObFkzSmxkQT09XCIpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLy8gSGFuZGxlIEVycm9yXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn0iXX0=