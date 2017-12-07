
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
        let nativeProgress = <android.widget.ProgressBar>pb.android; // android.widget.ProgressBar{d26eea9 V.ED..... ......ID 0,0-0,0}
        console.log("nativeProgress Android: " + nativeProgress); 

        nativeProgress.setScaleX(3);
        nativeProgress.setScaleY(5);
    }
}