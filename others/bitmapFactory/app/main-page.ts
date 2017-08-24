import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ImageSource, fromFile } from "image-source";

import * as BitmapFactory from "nativescript-bitmap-factory";
import * as SocialShare from "nativescript-social-share";
var resultImage: ImageSource;

export function navigatingTo(args: EventData) {

    var myImage = fromFile("~/images/cosmos.jpg");

    var bmp = BitmapFactory.asBitmap(myImage.toBase64String("jpg", 100));
    
    bmp.dispose(() => {

        bmp.writeText("TEST!", "100,100", {
            color: '#0000ff',
            size: 48
        });
        
        resultImage = bmp.toImageSource();

        SocialShare.shareImage(resultImage);
    });

}