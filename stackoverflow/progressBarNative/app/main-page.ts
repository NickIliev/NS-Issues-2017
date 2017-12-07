
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Progress } from "ui/progress";
import { isAndroid } from "platform";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}

export function onPbLoaded(args) {
    let pb = <Progress>args.object;
    
    if(isAndroid) {
        let nativeProgress = pb.android; // android.widget.ProgressBar{d26eea9 V.ED..... ......ID 0,0-0,0}
        console.log("nativeProgress Android: " + nativeProgress); 

        nativeProgress.scaleX = 1.5; 
        nativeProgress.scaleY = 4;

        // nativeProgress.setScaleY(5)
        // SCALE_Y added in API level 14
        // Property<View, Float> SCALE_Y
        // A Property wrapper around the scaleY functionality handled by the setScaleY(float) and getScaleY() methods.
    }
}