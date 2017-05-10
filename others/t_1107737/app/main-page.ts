// >> dataform-getting-started-context
import { Observable, fromObject } from "data/observable";

var vmRegister = fromObject({
    statusWorking: false,
    completed: false,
    registerFormData: {
        nickname: "ysta",
        email1: "test@gmail.com",
        email2: "test@yahoo.com",
        password1: "somePass",
        password2: "anotherPass",
        moreInfo1: "some info",
        moreInfo2: "some info",
        moreInfo3: "some info",
        moreInfo4: "some info",
        moreInfo5: "some info",
        moreInfo6: "some info",
        moreInfo7: "some info",
        moreInfo8: "some info",
        moreInfo9: "some info",
        moreInfo10: "some info",
        moreInfo11: "some info"
    }
});

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmRegister;
}
