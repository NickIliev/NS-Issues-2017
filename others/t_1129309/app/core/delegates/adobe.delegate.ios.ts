import { AdobeAnalytics } from 'nativescript-adobe-analytics';

let FRESH_LAUNCH = true;

export class AdobeDemoAppDelegate extends UIResponder {
    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationDidFinishLaunchingWithOptions(application, launchOptions): boolean {
        AdobeAnalytics.configure({name: 'Mohammad testing'}, true);
        return true;
    }

    public applicationDidBecomeActive(application): void {
        if (FRESH_LAUNCH) {
            FRESH_LAUNCH = false;
        }
    }
}