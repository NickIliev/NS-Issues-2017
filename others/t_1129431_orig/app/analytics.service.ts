import { Injectable } from '@angular/core';
import { AdobeAnalytics } from 'nativescript-adobe-analytics';
import { isIOS } from 'tns-core-modules/platform';

@Injectable() 
export class AnalyticsService {

    private _analytics: AdobeAnalytics;

    constructor() {
        this._analytics = new AdobeAnalytics();
        // if (!isIOS) {
        //     AdobeAnalytics.configure({ sample: 'Nathan testing Android' });
        // }
    }

    public get plugin() {
        return this._analytics;
    }
}