import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TextView } from "ui/text-view";

import { isAndroid, isIOS } from "platform";

declare var NSLineBreakByTruncatingTail: any;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;

    let tv = <TextView>page.getViewById("tv");
    tv.text = "sample text";

    if (isAndroid) {
        let tvAndriod = tv.android;
        tvAndriod.inputType = "text";
        tvAndriod.maxLines = "3";
    } else if (isIOS) {
        tv.ios.textContainer.maximumNumberOfLines = 3;
        tv.ios.textContainer.lineBreakMode = NSLineBreakByTruncatingTail;
    }

    tv.on("textChange", () => {
        if (isAndroid) {
            if (tv.android.getLayout().getLineCount() > 3) {
                tv.android.getText().delete(tv.android.getText().length() - 1, tv.android.getText().length());
            }
        }
    })
}


