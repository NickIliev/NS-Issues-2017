import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Progress } from 'ui/progress';
import { HelloWorldModel } from './main-view-model';

import { isAndroid, isIOS } from "platform"

declare let CGAffineTransformMakeScale: any;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onProgressLoaded(args: EventData) {

    let progress = <Progress>args.object;

    if (isAndroid) {
        progress.android.setScaleY(5);  //  progress.android === android.widget.ProgressBar
    } else if (isIOS) {
        let transform = CGAffineTransformMakeScale(1.0, 5.0);  
        progress.ios.transform = transform; // progress.ios === UIProgressView
    }
    
}