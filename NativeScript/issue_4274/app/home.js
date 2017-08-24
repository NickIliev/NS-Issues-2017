"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var helpers = require("./scripts/helpers");
var nativescript_auth0_1 = require("nativescript-auth0");
var init = false;
var auth0Tokens = {};
var lock = null;
var auth0Data;
exports.onPageLoaded = function (args) {
    var page = args.object;
    console.log("Home page");
    lock = helpers.getAuthLock();
    auth0Data = observableModule.fromObject({
        data: "Welcome, press a button below",
        creds: {
            accessToken: lock.credientials.accessToken,
            idToken: lock.credientials.idToken,
            refreshToken: lock.credientials.refreshToken
        },
        tokenExpiryDate: lock.getTokenExpiryDate() + " (" + lock.getRawToken().exp + ")"
    });
    console.dir(lock.credientials);
    console.log("ID TOKEN: " + lock.credientials.idToken);
    page.bindingContext = auth0Data;
};
exports.onLogout = function (args) {
    console.log("Logout");
    appSettings.remove(nativescript_auth0_1.Auth0Lock._tokenKey);
    var navOptions = {
        moduleName: "login",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true
    };
    frameModule.topmost().navigate(navOptions);
};
exports.onGetUserData = function (args) {
    console.log("Get user data");
    lock.getUserInfo().then(function (user) {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(user));
    });
};
exports.onGetTokenData = function (args) {
    console.log("Get token data");
    lock.getTokenInfo().then(function (token) {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(token));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBb0Q7QUFDcEQsc0NBQXdDO0FBQ3hDLGtEQUFvRDtBQUNwRCwyQ0FBNkM7QUFDN0MseURBQStDO0FBQy9DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFHckIsSUFBSSxJQUFJLEdBQWMsSUFBSSxDQUFDO0FBQzNCLElBQUksU0FBc0MsQ0FBQztBQUUzQyxPQUFPLENBQUMsWUFBWSxHQUFHLFVBQVUsSUFBSTtJQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUU3QixTQUFTLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1FBQ3BDLElBQUksRUFBRSwrQkFBK0I7UUFDckMsS0FBSyxFQUFFO1lBQ0gsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVztZQUMxQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPO1lBQ2xDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVk7U0FDL0M7UUFDRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRztLQUNuRixDQUFDLENBQUM7SUFJSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUcvQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxRQUFRLEdBQUcsVUFBVSxJQUFJO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyw4QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTFDLElBQUksVUFBVSxHQUFHO1FBQ2IsVUFBVSxFQUFFLE9BQU87UUFDbkIsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsWUFBWSxFQUFFLElBQUk7S0FDckIsQ0FBQztJQUVGLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBO0FBRUQsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFTLElBQUk7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxjQUFjLEdBQUcsVUFBUyxJQUFJO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZnJhbWVNb2R1bGUgZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlTW9kdWxlIGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSBcIi4vc2NyaXB0cy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBBdXRoMExvY2sgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWF1dGgwXCI7XG52YXIgaW5pdCA9IGZhbHNlO1xudmFyIGF1dGgwVG9rZW5zID0ge307XG5cbmRlY2xhcmUgdmFyIEpTT046IGFueTtcbmxldCBsb2NrOiBBdXRoMExvY2sgPSBudWxsO1xubGV0IGF1dGgwRGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlO1xuXG5leHBvcnRzLm9uUGFnZUxvYWRlZCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICBjb25zb2xlLmxvZyhcIkhvbWUgcGFnZVwiKTsgXG4gICAgbG9jayA9IGhlbHBlcnMuZ2V0QXV0aExvY2soKTtcblxuICAgIGF1dGgwRGF0YSA9IG9ic2VydmFibGVNb2R1bGUuZnJvbU9iamVjdCh7XG4gICAgICAgIGRhdGE6IFwiV2VsY29tZSwgcHJlc3MgYSBidXR0b24gYmVsb3dcIixcbiAgICAgICAgY3JlZHM6IHsgXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogbG9jay5jcmVkaWVudGlhbHMuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBpZFRva2VuOiBsb2NrLmNyZWRpZW50aWFscy5pZFRva2VuLFxuICAgICAgICAgICAgcmVmcmVzaFRva2VuOiBsb2NrLmNyZWRpZW50aWFscy5yZWZyZXNoVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgdG9rZW5FeHBpcnlEYXRlOiBsb2NrLmdldFRva2VuRXhwaXJ5RGF0ZSgpICsgXCIgKFwiICsgbG9jay5nZXRSYXdUb2tlbigpLmV4cCArIFwiKVwiXG4gICAgfSk7XG5cblxuICAgIFxuICAgIGNvbnNvbGUuZGlyKGxvY2suY3JlZGllbnRpYWxzKTtcblxuXG4gICAgY29uc29sZS5sb2coXCJJRCBUT0tFTjogXCIgKyBsb2NrLmNyZWRpZW50aWFscy5pZFRva2VuKTtcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gYXV0aDBEYXRhOyBcbn0gXG5cbmV4cG9ydHMub25Mb2dvdXQgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiTG9nb3V0XCIpO1xuICAgIGFwcFNldHRpbmdzLnJlbW92ZShBdXRoMExvY2suX3Rva2VuS2V5KTtcbiAgICAgICAgIFxuICB2YXIgbmF2T3B0aW9ucyA9IHtcbiAgICAgIG1vZHVsZU5hbWU6IFwibG9naW5cIixcbiAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICBuYW1lOiBcImZhZGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogMzgwLFxuICAgICAgICAgIGN1cnZlOiBcImVhc2VJblwiXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlIC8vRG9udCB3YW50IHRoZSB1c2VyIHRvIG5hdiBiYWNrIHRvIGxvZ2luXG4gIH07XG4gIFxuICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUobmF2T3B0aW9ucyk7XG59XG5cbmV4cG9ydHMub25HZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgIGNvbnNvbGUubG9nKFwiR2V0IHVzZXIgZGF0YVwiKTtcbiAgICBsb2NrLmdldFVzZXJJbmZvKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXBsZXRlXCIpO1xuICAgICAgICBhdXRoMERhdGEuc2V0KFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydHMub25HZXRUb2tlbkRhdGEgPSBmdW5jdGlvbihhcmdzKXtcbiAgICBjb25zb2xlLmxvZyhcIkdldCB0b2tlbiBkYXRhXCIpO1xuICAgIGxvY2suZ2V0VG9rZW5JbmZvKCkudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb21wbGV0ZVwiKTtcbiAgICAgICAgYXV0aDBEYXRhLnNldChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodG9rZW4pKTtcbiAgICB9KTtcbn0iXX0=