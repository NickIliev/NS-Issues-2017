import { Observable } from 'data/observable';

import * as app from "application";

declare let android: any;

export class HelloWorldModel extends Observable {

    constructor() {
        super();
    }

    public onTap() {
        let decorView: any = app.android.startActivity.getWindow().getDecorView();
        
        decorView.playSoundEffect(android.view.SoundEffectConstants.CLICK);
    }
}