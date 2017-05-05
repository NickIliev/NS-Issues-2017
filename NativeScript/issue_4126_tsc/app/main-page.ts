import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

declare var java: any;
declare var android: any;

let vm = new HelloWorldModel();;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    
    page.bindingContext = vm;

}

export function encode() {
    var text = new java.lang.String("Yolo 10000");
    var data = text.getBytes("UTF-8");
    var base64 = android.util.Base64.encodeToString(data, android.util.Base64.DEFAULT);

    vm.set("baseString", base64);
}

export function decode() {
    var text = vm.get("baseString");

    var data = android.util.Base64.decode(text, android.util.Base64.DEFAULT);
    var decoded = new java.lang.String(data, java.nio.charset.StandardCharsets.UTF_8);

    vm.set("decoded", decoded);
}