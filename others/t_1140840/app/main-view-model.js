"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var nativescript_fingerprint_auth_1 = require("nativescript-fingerprint-auth");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.status = 'STAnpm inTUS';
        _this.fingerprintAuth = new nativescript_fingerprint_auth_1.FingerprintAuth();
        return _this;
    }
    HelloWorldModel.prototype.doCheckAvailable = function () {
        var _this = this;
        console.log("do check available'");
        this.fingerprintAuth.available().then(function (result) {
            console.log("available result: " + JSON.stringify(result));
            _this.set('status', "Biometric ID available? - " + (result.any ? (result.face ? "Face" : "Touch") : "NO"));
        });
    };
    HelloWorldModel.prototype.doCheckFingerprintsChanged = function () {
        var _this = this;
        this.fingerprintAuth.didFingerprintDatabaseChange().then(function (changed) {
            _this.set('status', "Biometric ID changed? - " + (changed ? "YES" : "NO"));
        });
    };
    HelloWorldModel.prototype.doVerifyFingerprint = function () {
        this.fingerprintAuth.verifyFingerprint({
            message: 'Scan yer finger' // optional
        }).then(function () {
            dialogs_1.alert({
                title: "Biometric ID / passcode OK",
                okButtonText: "Sweet"
            });
        }, function () {
            dialogs_1.alert({
                title: "Biometric ID NOT OK / canceled",
                okButtonText: "Mmkay"
            });
        });
    };
    HelloWorldModel.prototype.doVerifyFingerprintWithCustomFallback = function () {
        this.fingerprintAuth.verifyFingerprintWithCustomFallback({
            message: 'Scan yer finger',
            fallbackMessage: 'Enter PIN' // optional
        }).then(function () {
            dialogs_1.alert({
                title: "Biometric ID OK",
                okButtonText: "Sweet"
            });
        }, function (error) {
            dialogs_1.alert({
                title: "Biometric ID NOT OK",
                message: (error.code === -3 ? "Show custom fallback" : error.message),
                okButtonText: "Mmkay"
            });
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLCtFQUE0RjtBQUM1Rix1REFBb0Q7QUFFcEQ7SUFBcUMsbUNBQVU7SUFJM0M7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFMTSxZQUFNLEdBQVcsY0FBYyxDQUFDO1FBSW5DLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSwrQ0FBZSxFQUFFLENBQUM7O0lBQ2pELENBQUM7SUFFTSwwQ0FBZ0IsR0FBdkI7UUFBQSxpQkFTQztRQVJHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUVsQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDakMsVUFBQyxNQUFrQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSw0QkFBNEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlHLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLG9EQUEwQixHQUFqQztRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksQ0FDcEQsVUFBQyxPQUFnQjtZQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLDBCQUEwQixHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLDZDQUFtQixHQUExQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7WUFDbkMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLFdBQVc7U0FDekMsQ0FBQyxDQUFDLElBQUksQ0FDSDtZQUNJLGVBQUssQ0FBQztnQkFDRixLQUFLLEVBQUUsNEJBQTRCO2dCQUNuQyxZQUFZLEVBQUUsT0FBTzthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDLEVBQ0Q7WUFDSSxlQUFLLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLGdDQUFnQztnQkFDdkMsWUFBWSxFQUFFLE9BQU87YUFDeEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNBLENBQUM7SUFDVixDQUFDO0lBRU0sK0RBQXFDLEdBQTVDO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUNyRCxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLGVBQWUsRUFBRSxXQUFXLENBQUMsV0FBVztTQUMzQyxDQUFDLENBQUMsSUFBSSxDQUNIO1lBQ0ksZUFBSyxDQUFDO2dCQUNGLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFlBQVksRUFBRSxPQUFPO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixlQUFLLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNyRSxZQUFZLEVBQUUsT0FBTzthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0EsQ0FBQztJQUNWLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFuRUQsQ0FBcUMsdUJBQVUsR0FtRTlDO0FBbkVZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGaW5nZXJwcmludEF1dGgsIEJpb21ldHJpY0lEQXZhaWxhYmxlUmVzdWx0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1maW5nZXJwcmludC1hdXRoXCI7XG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgZmluZ2VycHJpbnRBdXRoOiBGaW5nZXJwcmludEF1dGg7XG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gJ1NUQW5wbSBpblRVUyc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5maW5nZXJwcmludEF1dGggPSBuZXcgRmluZ2VycHJpbnRBdXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvQ2hlY2tBdmFpbGFibGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG8gY2hlY2sgYXZhaWxhYmxlJ1wiKVxuXG4gICAgICAgIHRoaXMuZmluZ2VycHJpbnRBdXRoLmF2YWlsYWJsZSgpLnRoZW4oXG4gICAgICAgICAgICAocmVzdWx0OiBCaW9tZXRyaWNJREF2YWlsYWJsZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXZhaWxhYmxlIHJlc3VsdDogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnc3RhdHVzJywgXCJCaW9tZXRyaWMgSUQgYXZhaWxhYmxlPyAtIFwiICsgKHJlc3VsdC5hbnkgPyAocmVzdWx0LmZhY2UgPyBcIkZhY2VcIiA6IFwiVG91Y2hcIikgOiBcIk5PXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9DaGVja0ZpbmdlcnByaW50c0NoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmluZ2VycHJpbnRBdXRoLmRpZEZpbmdlcnByaW50RGF0YWJhc2VDaGFuZ2UoKS50aGVuKFxuICAgICAgICAgICAgKGNoYW5nZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnc3RhdHVzJywgXCJCaW9tZXRyaWMgSUQgY2hhbmdlZD8gLSBcIiArIChjaGFuZ2VkID8gXCJZRVNcIiA6IFwiTk9cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb1ZlcmlmeUZpbmdlcnByaW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbmdlcnByaW50QXV0aC52ZXJpZnlGaW5nZXJwcmludCh7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NhbiB5ZXIgZmluZ2VyJyAvLyBvcHRpb25hbFxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQmlvbWV0cmljIElEIC8gcGFzc2NvZGUgT0tcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlN3ZWV0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJCaW9tZXRyaWMgSUQgTk9UIE9LIC8gY2FuY2VsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk1ta2F5XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvVmVyaWZ5RmluZ2VycHJpbnRXaXRoQ3VzdG9tRmFsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmluZ2VycHJpbnRBdXRoLnZlcmlmeUZpbmdlcnByaW50V2l0aEN1c3RvbUZhbGxiYWNrKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTY2FuIHllciBmaW5nZXInLCAvLyBvcHRpb25hbFxuICAgICAgICAgICAgZmFsbGJhY2tNZXNzYWdlOiAnRW50ZXIgUElOJyAvLyBvcHRpb25hbFxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQmlvbWV0cmljIElEIE9LXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTd2VldFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJCaW9tZXRyaWMgSUQgTk9UIE9LXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IChlcnJvci5jb2RlID09PSAtMyA/IFwiU2hvdyBjdXN0b20gZmFsbGJhY2tcIiA6IGVycm9yLm1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiTW1rYXlcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG59Il19