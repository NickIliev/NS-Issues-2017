import { AdobeAnalytics } from 'nativescript-adobe-analytics';
import { isIOS } from 'tns-core-modules/platform';

export class AdobeDemoAppDelegate { 

    constructor() {
        if (!isIOS) {
            AdobeAnalytics.configure({ sample: 'Mohammad testing Android' }, true);
        }
    }
}