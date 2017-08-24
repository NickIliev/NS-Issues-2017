import { BackgroundFetch } from "nativescript-background-fetch";

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationPerformFetchWithCompletionHandler(applicaiton: any, completionHandler: any) {
        BackgroundFetch.performFetchWithCompletionHandler(completionHandler);
    }
}