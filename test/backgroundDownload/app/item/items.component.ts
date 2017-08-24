import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { isAndroid, isIOS } from "platform";

declare var NNSObject, NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionConfiguration, NSURL : any;


@Component({
	selector: "ns-items",
	moduleId: module.id,
	templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
	items: Item[];

	constructor(private itemService: ItemService) { }

	ngOnInit(): void {
		this.items = this.itemService.getItems();
	}

	onTap() {
		if(isIOS) {

			class BackgroundUploadDelegate extends NSObject implements NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionDownloadDelegate {

				static ObjCProtocols = [NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionDownloadDelegate];

				// NSURLSessionDelegate
				URLSessionDidBecomeInvalidWithError(session, error) {
					console.log("URLSessionDidBecomeInvalidWithError:");
					//console.log(" - session: " + session);
					//console.log(" - error:   " + error);
				}

				URLSessionDidReceiveChallengeCompletionHandler(session, challenge, comlpetionHandler) {
					//console.log("URLSessionDidFinishEventsForBackgroundURLSession: " + session + " " + challenge);
					var disposition = null;
					var credential = null;
					comlpetionHandler(disposition, credential);
				}

				URLSessionDidFinishEventsForBackgroundURLSession(session) {
					console.log("URLSessionDidFinishEventsForBackgroundURLSession: " + session);
				}

				// NSURLSessionTaskDelegate
				URLSessionTaskDidCompleteWithError(session, nsTask, error) {
					console.log("URLSessionTaskDidCompleteWithError");
					console.log(error);
				}

				URLSessionTaskDidReceiveChallengeCompletionHandler(session, task, challenge, completionHandler) {
					console.log("URLSessionTaskDidReceiveChallengeCompletionHandler: " + session + " " + task + " " + challenge);
					var disposition = null;
					var credential = null;
					completionHandler(disposition, credential);
				}

				URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend(nsSession: NSURLSession, nsTask: NSURLSessionTask, data, sent: number, expectedTotal: number) {
					console.log("URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend")
				}

				URLSessionTaskNeedNewBodyStream(session, task, need) {
					console.log("URLSessionTaskNeedNewBodyStream");
				}

				URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler(session, task, redirect, request, completionHandler) {
					console.log("URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler");
					completionHandler(request);
				}

				// NSURLSessionDataDelegate
				URLSessionDataTaskDidReceiveResponseCompletionHandler(session, dataTask, response, completionHandler) {
					console.log("URLSessionDataTaskDidReceiveResponseCompletionHandler");
					var disposition = null;
					completionHandler(disposition);
				}

				URLSessionDataTaskDidBecomeDownloadTask(session, dataTask, downloadTask) {
					console.log("URLSessionDataTaskDidBecomeDownloadTask");
				}

				URLSessionDataTaskDidReceiveData(session, dataTask, data) {

					console.log("URLSessionDataTaskDidReceiveData");
				}

				URLSessionDataTaskWillCacheResponseCompletionHandler() {
					console.log("URLSessionDataTaskWillCacheResponseCompletionHandler");
				}

				// NSURLSessionDownloadDelegate
				URLSessionDownloadTaskDidResumeAtOffsetExpectedTotalBytes(session, task, offset, expects) {
					console.log("URLSessionDownloadTaskDidResumeAtOffsetExpectedTotalBytes");
				}

				URLSessionDownloadTaskDidWriteDataTotalBytesWrittenTotalBytesExpectedToWrite(session, task, data, written, expected) {
					console.log("URLSessionDownloadTaskDidWriteDataTotalBytesWrittenTotalBytesExpectedToWrite");
				}

				URLSessionDownloadTaskDidFinishDownloadingToURL(session, task, url) {
					console.log("URLSessionDownloadTaskDidFinishDownloadingToURL");
					console.log(session);
					console.log(task);
					console.log(url);
				}
			}


			let config = NSURLSessionConfiguration.backgroundSessionConfigurationWithIdentifier("org.nativescript.sample");
			var delegate = BackgroundUploadDelegate.alloc().init();
			let session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(config, delegate, null);
			console.log(session);
			let url = NSURL.URLWithString("https://httpbin.org/image");
			let task = session.downloadTaskWithURL(url);
			task.resume();
		} else {
			console.log("Android");
		}
	}
}
