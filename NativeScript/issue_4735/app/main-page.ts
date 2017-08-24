import { Observable } from "data/observable";

let pageData = new Observable();

export function onNavigatingTo(args) {
    let page = args.object;

    pageData.set("MemberUserID", 99);

    let comments = [{
        MemberUserID: 11
    },{
        MemberUserID: 99
    }];

    pageData.set("comments", comments);

    page.bindingContext = pageData;
}
