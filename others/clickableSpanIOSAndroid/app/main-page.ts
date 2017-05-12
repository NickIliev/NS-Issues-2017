import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Label } from "ui/label";
import { TextView } from "ui/text-view";
import { isAndroid, isIOS } from "platform";
import { Color } from "color";
var delegateModule;

declare var android: any;
declare var UIEdgeInsetsMake: any;

if (isIOS) {
    delegateModule = require("./delegate/delegate");
}

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}


export function textViewloaded(args) {
    var textview: TextView = <TextView>args.object;

    if (isAndroid) {
        var ss = new android.text.SpannableString("Android is a Software stack");
        var ClickableSpanClass = android.text.style.ClickableSpan.extend({
            onClick: function (view) {
                console.log("on span click");
            },
            updateDrawState: function (tp) {
                this.super.updateDrawState(tp);
                tp.setUnderlineText(false);
                tp.setColor(new Color("red").android);
            }
        });

        var ClickableSpanClass2 = android.text.style.ClickableSpan.extend({
            onClick: function (view) {
                console.log("on span click2");

            },
            updateDrawState: function (tp) {
                this.super.updateDrawState(tp);
                tp.setUnderlineText(false);
            }
        });
        var clickablespan = new ClickableSpanClass();
        var clickablespan2 = new ClickableSpanClass2();

        ss.setSpan(clickablespan, 0, 7, 33);
        ss.setSpan(clickablespan2, 13, 21, 33);

        textview.android.setText(ss);
        textview.android.setMovementMethod(android.text.method.LinkMovementMethod.getInstance());
    } else if (isIOS){
        var tv = <any>textview;

        var attrsting = NSMutableAttributedString.alloc().initWithString("test ala bala"); // lenght == 13

        attrsting.addAttributeValueRange(NSForegroundColorAttributeName, UIColor.redColor, { location: 0, length: 13 }); // apply the default color for your whole TetView (0. 13)
        attrsting.addAttributeValueRange(NSForegroundColorAttributeName, UIColor.greenColor, { location: 6, length: 2 }); // apply the color for your clickable spans
        attrsting.addAttributeValueRange(NSForegroundColorAttributeName, UIColor.brownColor, { location: 9, length: 3 }); // apply the color for your clickable spans

        tv.ios.text = undefined;
        tv.ios.attributedText = attrsting;

        var uiTextView = tv.ios;
        let newDelegate = delegateModule.newUITextViewDelegateImpl.initWithOriginalDelegate(tv._delegate);
        tv._delegate = newDelegate;

        uiTextView.delegate = newDelegate;
    }
}

