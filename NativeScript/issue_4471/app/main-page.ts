import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Color } from 'color';

import { CreateViewEventData } from "ui/placeholder";

export function creatingView(args: CreateViewEventData) {
    console.log("Creating view");
    const nativeView = new android.support.v7.widget.SwitchCompat(args.context);
    // const nativeView = new android.widget.Switch(args.context);
    args.view = nativeView;
}

export function loaded(args) {
    console.log("Loaded");
    let color = new Color("#FF0000");
    args.object.nativeView.getThumbDrawable().setColorFilter(color.android, android.graphics.PorterDuff.Mode.SRC_IN);
}
