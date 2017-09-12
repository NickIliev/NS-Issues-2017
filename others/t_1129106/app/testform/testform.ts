import { Observable } from "data/observable";
import { topmost } from 'ui/frame';
import { Page } from 'ui/page';
import * as fs from "tns-core-modules/file-system";
import * as bufferModule from "buffer";

import { isIOS, isAndroid } from "platform";

// declare var android: any;
// declare var NSData: any;

export class ViewModel extends Observable {
    private page: Page = null;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    public onBack() {
        topmost().goBack();
    };

    public readWriteBinaryTap(record) {

        var fileName = "icon.png";
        var destinationPath = __dirname + "/" + fileName;

        //read file
        var sourceFile = fs.File.fromPath(__dirname + "/../media/" + fileName);

        var source = sourceFile.readSync(e => { console.log(e); });
        console.log(source);
        //emulate saving and retrieiving this data as base64 (I want to store this image in the firebase database)
        //I want to store other binary files too - not just images.

        if (isAndroid) {
            var base64String = android.util.Base64.encodeToString(source, android.util.Base64.NO_WRAP);
            // console.log(base64String);
        } else if (isIOS) {
            var base64StringIOS = source.base64EncodedStringWithOptions(0);
            // console.log(base64StringIOS);

            var binarySource = NSData.alloc().initWithBase64Encoding(base64StringIOS);
            console.log(binarySource)
        }

        //save file
        var destinationFile = fs.File.fromPath(destinationPath);
        destinationFile.writeSync(source, e => { console.log(e); });
        this.set("image", destinationPath);
    };


}

var viewModel: ViewModel;
export function pageLoaded(args) {
    var page = <Page>args.object;
    viewModel = new ViewModel(page);
    page.bindingContext = viewModel;
};

