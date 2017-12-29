
import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as paytm from "nativescript-paytm";

export function navigatingTo(args: EventData) {
    let myPay = new paytm.Paytm();

    // myPay.initialize("bla bla");
}