declare const SentryClient: any;
export class Sentry {

    private _ios: any = SentryClient;

    constructor() {
        console.log("SENTRY IOS CONSTRUCTOR");
        this._ios = SentryClient.alloc().initWithDsnString("DNS_KEY");
        this._ios.clipsToBounds = true;
        this._ios.startCrashHandler();

    }



}

/**
* This is how sentry is initialized in native iOS.
*/
// [SentryClient setShared:[[SentryClient alloc] initWithDsnString:@"DNS_KEY"]];
// [[SentryClient shared] startCrashHandler];
