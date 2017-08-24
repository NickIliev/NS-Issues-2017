"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var platform_1 = require("platform");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.onTap = function () {
        if (platform_1.isIOS) {
            var BackgroundUploadDelegate = (function (_super) {
                __extends(BackgroundUploadDelegate, _super);
                function BackgroundUploadDelegate() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // NSURLSessionDelegate
                BackgroundUploadDelegate.prototype.URLSessionDidBecomeInvalidWithError = function (session, error) {
                    console.log("URLSessionDidBecomeInvalidWithError:");
                    //console.log(" - session: " + session);
                    //console.log(" - error:   " + error);
                };
                BackgroundUploadDelegate.prototype.URLSessionDidReceiveChallengeCompletionHandler = function (session, challenge, comlpetionHandler) {
                    //console.log("URLSessionDidFinishEventsForBackgroundURLSession: " + session + " " + challenge);
                    var disposition = null;
                    var credential = null;
                    comlpetionHandler(disposition, credential);
                };
                BackgroundUploadDelegate.prototype.URLSessionDidFinishEventsForBackgroundURLSession = function (session) {
                    console.log("URLSessionDidFinishEventsForBackgroundURLSession: " + session);
                };
                // NSURLSessionTaskDelegate
                BackgroundUploadDelegate.prototype.URLSessionTaskDidCompleteWithError = function (session, nsTask, error) {
                    console.log("URLSessionTaskDidCompleteWithError");
                    console.log(error);
                };
                BackgroundUploadDelegate.prototype.URLSessionTaskDidReceiveChallengeCompletionHandler = function (session, task, challenge, completionHandler) {
                    console.log("URLSessionTaskDidReceiveChallengeCompletionHandler: " + session + " " + task + " " + challenge);
                    var disposition = null;
                    var credential = null;
                    completionHandler(disposition, credential);
                };
                BackgroundUploadDelegate.prototype.URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend = function (nsSession, nsTask, data, sent, expectedTotal) {
                    console.log("URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend");
                };
                BackgroundUploadDelegate.prototype.URLSessionTaskNeedNewBodyStream = function (session, task, need) {
                    console.log("URLSessionTaskNeedNewBodyStream");
                };
                BackgroundUploadDelegate.prototype.URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler = function (session, task, redirect, request, completionHandler) {
                    console.log("URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler");
                    completionHandler(request);
                };
                // NSURLSessionDataDelegate
                BackgroundUploadDelegate.prototype.URLSessionDataTaskDidReceiveResponseCompletionHandler = function (session, dataTask, response, completionHandler) {
                    console.log("URLSessionDataTaskDidReceiveResponseCompletionHandler");
                    var disposition = null;
                    completionHandler(disposition);
                };
                BackgroundUploadDelegate.prototype.URLSessionDataTaskDidBecomeDownloadTask = function (session, dataTask, downloadTask) {
                    console.log("URLSessionDataTaskDidBecomeDownloadTask");
                };
                BackgroundUploadDelegate.prototype.URLSessionDataTaskDidReceiveData = function (session, dataTask, data) {
                    console.log("URLSessionDataTaskDidReceiveData");
                };
                BackgroundUploadDelegate.prototype.URLSessionDataTaskWillCacheResponseCompletionHandler = function () {
                    console.log("URLSessionDataTaskWillCacheResponseCompletionHandler");
                };
                // NSURLSessionDownloadDelegate
                BackgroundUploadDelegate.prototype.URLSessionDownloadTaskDidResumeAtOffsetExpectedTotalBytes = function (session, task, offset, expects) {
                    console.log("URLSessionDownloadTaskDidResumeAtOffsetExpectedTotalBytes");
                };
                BackgroundUploadDelegate.prototype.URLSessionDownloadTaskDidWriteDataTotalBytesWrittenTotalBytesExpectedToWrite = function (session, task, data, written, expected) {
                    console.log("URLSessionDownloadTaskDidWriteDataTotalBytesWrittenTotalBytesExpectedToWrite");
                };
                BackgroundUploadDelegate.prototype.URLSessionDownloadTaskDidFinishDownloadingToURL = function (session, task, url) {
                    console.log("URLSessionDownloadTaskDidFinishDownloadingToURL");
                    console.log(session);
                    console.log(task);
                    console.log(url);
                };
                return BackgroundUploadDelegate;
            }(NSObject));
            BackgroundUploadDelegate.ObjCProtocols = [NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionDownloadDelegate];
            var config = NSURLSessionConfiguration.backgroundSessionConfigurationWithIdentifier("org.nativescript.sample");
            var delegate = BackgroundUploadDelegate.alloc().init();
            var session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(config, delegate, null);
            console.log(session);
            var url = NSURL.URLWithString("https://httpbin.org/image");
            var task = session.downloadTaskWithURL(url);
            task.resume();
        }
        else {
            console.log("Android");
        }
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUU3QyxxQ0FBNEM7QUFVNUMsSUFBYSxjQUFjO0lBRzFCLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsaUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUNDLEVBQUUsQ0FBQSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBRVY7Z0JBQXVDLDRDQUFRO2dCQUEvQzs7Z0JBbUZBLENBQUM7Z0JBL0VBLHVCQUF1QjtnQkFDdkIsc0VBQW1DLEdBQW5DLFVBQW9DLE9BQU8sRUFBRSxLQUFLO29CQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBQ3BELHdDQUF3QztvQkFDeEMsc0NBQXNDO2dCQUN2QyxDQUFDO2dCQUVELGlGQUE4QyxHQUE5QyxVQUErQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQjtvQkFDbkYsZ0dBQWdHO29CQUNoRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdEIsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUVELG1GQUFnRCxHQUFoRCxVQUFpRCxPQUFPO29CQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUVELDJCQUEyQjtnQkFDM0IscUVBQWtDLEdBQWxDLFVBQW1DLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSztvQkFDeEQs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QW9CLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztZQW9GakksSUFBSSxNQUFNLEdBQUcseUJBQXlCLENBQUMsNENBQTRDLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUMvRyxJQUFJLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2RCxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsNkNBQTZDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0YsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQTdHRCxJQTZHQztBQTdHWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUNyQyxDQUFDO3FDQUlnQywwQkFBVztHQUhoQyxjQUFjLENBNkcxQjtBQTdHWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuZGVjbGFyZSB2YXIgTk5TT2JqZWN0LCBOU1VSTFNlc3Npb25EZWxlZ2F0ZSwgTlNVUkxTZXNzaW9uVGFza0RlbGVnYXRlLCBOU1VSTFNlc3Npb25EYXRhRGVsZWdhdGUsIE5TVVJMU2Vzc2lvbkNvbmZpZ3VyYXRpb24sIE5TVVJMIDogYW55O1xuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0aXRlbXM6IEl0ZW1bXTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdFx0dGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcblx0fVxuXG5cdG9uVGFwKCkge1xuXHRcdGlmKGlzSU9TKSB7XG5cblx0XHRcdGNsYXNzIEJhY2tncm91bmRVcGxvYWREZWxlZ2F0ZSBleHRlbmRzIE5TT2JqZWN0IGltcGxlbWVudHMgTlNVUkxTZXNzaW9uRGVsZWdhdGUsIE5TVVJMU2Vzc2lvblRhc2tEZWxlZ2F0ZSwgTlNVUkxTZXNzaW9uRGF0YURlbGVnYXRlLCBOU1VSTFNlc3Npb25Eb3dubG9hZERlbGVnYXRlIHtcblxuXHRcdFx0XHRzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtOU1VSTFNlc3Npb25EZWxlZ2F0ZSwgTlNVUkxTZXNzaW9uVGFza0RlbGVnYXRlLCBOU1VSTFNlc3Npb25EYXRhRGVsZWdhdGUsIE5TVVJMU2Vzc2lvbkRvd25sb2FkRGVsZWdhdGVdO1xuXG5cdFx0XHRcdC8vIE5TVVJMU2Vzc2lvbkRlbGVnYXRlXG5cdFx0XHRcdFVSTFNlc3Npb25EaWRCZWNvbWVJbnZhbGlkV2l0aEVycm9yKHNlc3Npb24sIGVycm9yKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJVUkxTZXNzaW9uRGlkQmVjb21lSW52YWxpZFdpdGhFcnJvcjpcIik7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIiAtIHNlc3Npb246IFwiICsgc2Vzc2lvbik7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIiAtIGVycm9yOiAgIFwiICsgZXJyb3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvbkRpZFJlY2VpdmVDaGFsbGVuZ2VDb21wbGV0aW9uSGFuZGxlcihzZXNzaW9uLCBjaGFsbGVuZ2UsIGNvbWxwZXRpb25IYW5kbGVyKSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIlVSTFNlc3Npb25EaWRGaW5pc2hFdmVudHNGb3JCYWNrZ3JvdW5kVVJMU2Vzc2lvbjogXCIgKyBzZXNzaW9uICsgXCIgXCIgKyBjaGFsbGVuZ2UpO1xuXHRcdFx0XHRcdHZhciBkaXNwb3NpdGlvbiA9IG51bGw7XG5cdFx0XHRcdFx0dmFyIGNyZWRlbnRpYWwgPSBudWxsO1xuXHRcdFx0XHRcdGNvbWxwZXRpb25IYW5kbGVyKGRpc3Bvc2l0aW9uLCBjcmVkZW50aWFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdFVSTFNlc3Npb25EaWRGaW5pc2hFdmVudHNGb3JCYWNrZ3JvdW5kVVJMU2Vzc2lvbihzZXNzaW9uKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJVUkxTZXNzaW9uRGlkRmluaXNoRXZlbnRzRm9yQmFja2dyb3VuZFVSTFNlc3Npb246IFwiICsgc2Vzc2lvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBOU1VSTFNlc3Npb25UYXNrRGVsZWdhdGVcblx0XHRcdFx0VVJMU2Vzc2lvblRhc2tEaWRDb21wbGV0ZVdpdGhFcnJvcihzZXNzaW9uLCBuc1Rhc2ssIGVycm9yKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJVUkxTZXNzaW9uVGFza0RpZENvbXBsZXRlV2l0aEVycm9yXCIpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdFVSTFNlc3Npb25UYXNrRGlkUmVjZWl2ZUNoYWxsZW5nZUNvbXBsZXRpb25IYW5kbGVyKHNlc3Npb24sIHRhc2ssIGNoYWxsZW5nZSwgY29tcGxldGlvbkhhbmRsZXIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlVSTFNlc3Npb25UYXNrRGlkUmVjZWl2ZUNoYWxsZW5nZUNvbXBsZXRpb25IYW5kbGVyOiBcIiArIHNlc3Npb24gKyBcIiBcIiArIHRhc2sgKyBcIiBcIiArIGNoYWxsZW5nZSk7XG5cdFx0XHRcdFx0dmFyIGRpc3Bvc2l0aW9uID0gbnVsbDtcblx0XHRcdFx0XHR2YXIgY3JlZGVudGlhbCA9IG51bGw7XG5cdFx0XHRcdFx0Y29tcGxldGlvbkhhbmRsZXIoZGlzcG9zaXRpb24sIGNyZWRlbnRpYWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvblRhc2tEaWRTZW5kQm9keURhdGFUb3RhbEJ5dGVzU2VudFRvdGFsQnl0ZXNFeHBlY3RlZFRvU2VuZChuc1Nlc3Npb246IE5TVVJMU2Vzc2lvbiwgbnNUYXNrOiBOU1VSTFNlc3Npb25UYXNrLCBkYXRhLCBzZW50OiBudW1iZXIsIGV4cGVjdGVkVG90YWw6IG51bWJlcikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvblRhc2tEaWRTZW5kQm9keURhdGFUb3RhbEJ5dGVzU2VudFRvdGFsQnl0ZXNFeHBlY3RlZFRvU2VuZFwiKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvblRhc2tOZWVkTmV3Qm9keVN0cmVhbShzZXNzaW9uLCB0YXNrLCBuZWVkKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJVUkxTZXNzaW9uVGFza05lZWROZXdCb2R5U3RyZWFtXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvblRhc2tXaWxsUGVyZm9ybUhUVFBSZWRpcmVjdGlvbk5ld1JlcXVlc3RDb21wbGV0aW9uSGFuZGxlcihzZXNzaW9uLCB0YXNrLCByZWRpcmVjdCwgcmVxdWVzdCwgY29tcGxldGlvbkhhbmRsZXIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlVSTFNlc3Npb25UYXNrV2lsbFBlcmZvcm1IVFRQUmVkaXJlY3Rpb25OZXdSZXF1ZXN0Q29tcGxldGlvbkhhbmRsZXJcIik7XG5cdFx0XHRcdFx0Y29tcGxldGlvbkhhbmRsZXIocmVxdWVzdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBOU1VSTFNlc3Npb25EYXRhRGVsZWdhdGVcblx0XHRcdFx0VVJMU2Vzc2lvbkRhdGFUYXNrRGlkUmVjZWl2ZVJlc3BvbnNlQ29tcGxldGlvbkhhbmRsZXIoc2Vzc2lvbiwgZGF0YVRhc2ssIHJlc3BvbnNlLCBjb21wbGV0aW9uSGFuZGxlcikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRhdGFUYXNrRGlkUmVjZWl2ZVJlc3BvbnNlQ29tcGxldGlvbkhhbmRsZXJcIik7XG5cdFx0XHRcdFx0dmFyIGRpc3Bvc2l0aW9uID0gbnVsbDtcblx0XHRcdFx0XHRjb21wbGV0aW9uSGFuZGxlcihkaXNwb3NpdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRVUkxTZXNzaW9uRGF0YVRhc2tEaWRCZWNvbWVEb3dubG9hZFRhc2soc2Vzc2lvbiwgZGF0YVRhc2ssIGRvd25sb2FkVGFzaykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRhdGFUYXNrRGlkQmVjb21lRG93bmxvYWRUYXNrXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvbkRhdGFUYXNrRGlkUmVjZWl2ZURhdGEoc2Vzc2lvbiwgZGF0YVRhc2ssIGRhdGEpIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRhdGFUYXNrRGlkUmVjZWl2ZURhdGFcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRVUkxTZXNzaW9uRGF0YVRhc2tXaWxsQ2FjaGVSZXNwb25zZUNvbXBsZXRpb25IYW5kbGVyKCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRhdGFUYXNrV2lsbENhY2hlUmVzcG9uc2VDb21wbGV0aW9uSGFuZGxlclwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE5TVVJMU2Vzc2lvbkRvd25sb2FkRGVsZWdhdGVcblx0XHRcdFx0VVJMU2Vzc2lvbkRvd25sb2FkVGFza0RpZFJlc3VtZUF0T2Zmc2V0RXhwZWN0ZWRUb3RhbEJ5dGVzKHNlc3Npb24sIHRhc2ssIG9mZnNldCwgZXhwZWN0cykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRvd25sb2FkVGFza0RpZFJlc3VtZUF0T2Zmc2V0RXhwZWN0ZWRUb3RhbEJ5dGVzXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0VVJMU2Vzc2lvbkRvd25sb2FkVGFza0RpZFdyaXRlRGF0YVRvdGFsQnl0ZXNXcml0dGVuVG90YWxCeXRlc0V4cGVjdGVkVG9Xcml0ZShzZXNzaW9uLCB0YXNrLCBkYXRhLCB3cml0dGVuLCBleHBlY3RlZCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRvd25sb2FkVGFza0RpZFdyaXRlRGF0YVRvdGFsQnl0ZXNXcml0dGVuVG90YWxCeXRlc0V4cGVjdGVkVG9Xcml0ZVwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdFVSTFNlc3Npb25Eb3dubG9hZFRhc2tEaWRGaW5pc2hEb3dubG9hZGluZ1RvVVJMKHNlc3Npb24sIHRhc2ssIHVybCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVVJMU2Vzc2lvbkRvd25sb2FkVGFza0RpZEZpbmlzaERvd25sb2FkaW5nVG9VUkxcIik7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coc2Vzc2lvbik7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGFzayk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cblx0XHRcdGxldCBjb25maWcgPSBOU1VSTFNlc3Npb25Db25maWd1cmF0aW9uLmJhY2tncm91bmRTZXNzaW9uQ29uZmlndXJhdGlvbldpdGhJZGVudGlmaWVyKFwib3JnLm5hdGl2ZXNjcmlwdC5zYW1wbGVcIik7XG5cdFx0XHR2YXIgZGVsZWdhdGUgPSBCYWNrZ3JvdW5kVXBsb2FkRGVsZWdhdGUuYWxsb2MoKS5pbml0KCk7XG5cdFx0XHRsZXQgc2Vzc2lvbiA9IE5TVVJMU2Vzc2lvbi5zZXNzaW9uV2l0aENvbmZpZ3VyYXRpb25EZWxlZ2F0ZURlbGVnYXRlUXVldWUoY29uZmlnLCBkZWxlZ2F0ZSwgbnVsbCk7XG5cdFx0XHRjb25zb2xlLmxvZyhzZXNzaW9uKTtcblx0XHRcdGxldCB1cmwgPSBOU1VSTC5VUkxXaXRoU3RyaW5nKFwiaHR0cHM6Ly9odHRwYmluLm9yZy9pbWFnZVwiKTtcblx0XHRcdGxldCB0YXNrID0gc2Vzc2lvbi5kb3dubG9hZFRhc2tXaXRoVVJMKHVybCk7XG5cdFx0XHR0YXNrLnJlc3VtZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkFuZHJvaWRcIik7XG5cdFx0fVxuXHR9XG59XG4iXX0=