import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { fromNativeSource } from "image-source";
import { takePicture, requestPermissions } from "nativescript-camera";
import { isIOS, isAndroid} from "platform";

declare let android: any;
declare let java: any;
declare let UIImageJPEGRepresentation: any;
declare let NSDataBase64EncodingOptions: any;
declare let ByteArrayOutputStream: any;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    requestPermissions();
}

export function takePhoto() {
    takePicture({
        width: 1280, height: 720, keepAspectRatio: false, saveToGallery: false
    }).then((imageAsset) => {
        imageAsset.getImageAsync((res) => {
            console.log(res);

            var image = fromNativeSource(res);
            if (isIOS) {
                let imageData = UIImageJPEGRepresentation(image.ios, 1.0);
                let base64Img = imageData.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.NSDataBase64EncodingEndLineWithLineFeed);
                console.log(base64Img); // our image repesented in  base64 string result
            } else if (isAndroid) {
                let bitmap = res;
                let byteArrayOutputStream = new java.io.ByteArrayOutputStream();  
                bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                let byteArray = byteArrayOutputStream.toByteArray();
                let base64String = android.util.Base64.encodeToString(byteArray, android.util.Base64.DEFAULT);

                console.log(base64String); // our image repesented in  base64 string result
            }
        });
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}