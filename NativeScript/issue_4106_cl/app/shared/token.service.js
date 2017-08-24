"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var TokenService = (function () {
    function TokenService(http) {
        this.http = http;
        // old url for request token
        // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';
        // New URL for request token
        // private tokenUrl= 'https://host.begis.de/Test/IdSrv/connect';
        // New end Points
        this.tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
        this.expirationTime = 0; //defaultValue
    }
    /** Saves Expiration Time in a Variable  */
    TokenService.prototype.initialize = function (token) {
        var _this = this;
        this.getAccessTokenValidation(token)
            .subscribe(function (res) {
            _this.expirationTime = res.exp;
        }, function (error) {
            console.log("Error while getting Token.");
        });
    };
    /** Get Access-Token as JSON*/ // donot get it
    TokenService.prototype.getAccessTokenValidation = function (token) {
        var headers = this.getHeaders();
        return this.http.get(this.tokenUrl + '/accesstokenvalidation?token=' + token)
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** is Token Expired */
    TokenService.prototype.isTokenExpired = function (token) {
        var currentTime = Math.floor(Date.now() / 1000);
        console.log("Current Time: " + currentTime + " Expiration Time " + this.expirationTime);
        //AccessToken expires in 60 seconds or less
        if ((this.expirationTime - 60) <= currentTime) {
            return true;
        }
        else {
            return false;
        }
    };
    // handle error occured
    TokenService.prototype.handleErrors = function (error) {
        // alert(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    TokenService.prototype.getHeaders = function () {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    };
    return TokenService;
}());
TokenService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msc0NBQXFDO0FBQ3JDLDhCQUFvRTtBQUtwRSxJQUFhLFlBQVk7SUFpQnZCLHNCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWY5Qiw0QkFBNEI7UUFDNUIsNkRBQTZEO1FBRTdELDRCQUE0QjtRQUM1QixnRUFBZ0U7UUFFaEUsaUJBQWlCO1FBQ1QsYUFBUSxHQUFHLHVEQUF1RCxDQUFDO1FBU3pFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYztJQUN6QyxDQUFDO0lBRUQsMkNBQTJDO0lBQ3BDLGlDQUFVLEdBQWpCLFVBQWtCLEtBQWE7UUFBL0IsaUJBVUM7UUFUQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDO2FBQ2pDLFNBQVMsQ0FDVixVQUFDLEdBQUc7WUFDRixLQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDaEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQ0EsQ0FBQTtJQUNMLENBQUM7SUFFRCw4QkFBOEIsQ0FBQyxlQUFlO0lBQ3RDLCtDQUF3QixHQUFoQyxVQUFpQyxLQUFhO1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRywrQkFBK0IsR0FBRyxLQUFLLENBQUM7YUFDMUUsR0FBRyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCx1QkFBdUI7SUFDaEIscUNBQWMsR0FBckIsVUFBc0IsS0FBYTtRQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsR0FBRyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEYsMkNBQTJDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsbUNBQVksR0FBWixVQUFhLEtBQWU7UUFDMUIsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxpQ0FBVSxHQUFsQjtRQUNFLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7QUFqRVksWUFBWTtJQUR4QixpQkFBVSxFQUFFO3FDQWtCZSxXQUFJO0dBakJuQixZQUFZLENBaUV4QjtBQWpFWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCIuL2xvZ2luLnNlcnZpY2VcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IHsgZ2V0TnVtYmVyLCBzZXROdW1iZXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcblxuICAvLyBvbGQgdXJsIGZvciByZXF1ZXN0IHRva2VuXG4gIC8vIHByaXZhdGUgdG9rZW5VcmwgPSAnaHR0cDovLzE5Mi4xNjguMTAzLjEyMC9JZFNydi9jb25uZWN0JztcblxuICAvLyBOZXcgVVJMIGZvciByZXF1ZXN0IHRva2VuXG4gIC8vIHByaXZhdGUgdG9rZW5Vcmw9ICdodHRwczovL2hvc3QuYmVnaXMuZGUvVGVzdC9JZFNydi9jb25uZWN0JztcblxuICAvLyBOZXcgZW5kIFBvaW50c1xuICBwcml2YXRlIHRva2VuVXJsID0gJ2h0dHBzOi8vSG9zdC5iZWdpcy5kZS9IaWViZXJXZWJfVGVzdC9JZGVudGl0eS9jb25uZWN0JztcbiAgLyogcHJpdmF0ZSBiYXNlQXBpVXJsID0gJ2h0dHA6Ly8xOTIuMTY4LjEwMy4xMjAvQ21zSWRTcnYvaWRlbnRpdHknOyovXG5cbiAgcHVibGljIGV4cGlyZXNfaW46IG51bWJlcjtcblxuICBwdWJsaWMgZXhwaXJhdGlvblRpbWU6IG51bWJlcjtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xuICAgIHRoaXMuZXhwaXJhdGlvblRpbWUgPSAwOyAvL2RlZmF1bHRWYWx1ZVxuICB9XG5cbiAgLyoqIFNhdmVzIEV4cGlyYXRpb24gVGltZSBpbiBhIFZhcmlhYmxlICAqL1xuICBwdWJsaWMgaW5pdGlhbGl6ZSh0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5nZXRBY2Nlc3NUb2tlblZhbGlkYXRpb24odG9rZW4pXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmV4cGlyYXRpb25UaW1lID0gcmVzLmV4cDtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGlsZSBnZXR0aW5nIFRva2VuLlwiKTtcbiAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIC8qKiBHZXQgQWNjZXNzLVRva2VuIGFzIEpTT04qLyAvLyBkb25vdCBnZXQgaXRcbiAgcHJpdmF0ZSBnZXRBY2Nlc3NUb2tlblZhbGlkYXRpb24odG9rZW46IHN0cmluZykge1xuICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy50b2tlblVybCArICcvYWNjZXNzdG9rZW52YWxpZGF0aW9uP3Rva2VuPScgKyB0b2tlbilcbiAgICAgIC5tYXAoKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICAvKiogaXMgVG9rZW4gRXhwaXJlZCAqL1xuICBwdWJsaWMgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBUaW1lOiBcIiArIGN1cnJlbnRUaW1lICsgXCIgRXhwaXJhdGlvbiBUaW1lIFwiICsgdGhpcy5leHBpcmF0aW9uVGltZSk7XG4gICAgLy9BY2Nlc3NUb2tlbiBleHBpcmVzIGluIDYwIHNlY29uZHMgb3IgbGVzc1xuICAgIGlmICgodGhpcy5leHBpcmF0aW9uVGltZSAtIDYwKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgZXJyb3Igb2NjdXJlZFxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIZWFkZXJzKCkge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cbn0iXX0=