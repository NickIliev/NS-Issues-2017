import { Injectable } from "@angular/core";


@Injectable()
export class AboutAppService {

    public getTerms() {
        return {
            "html1": "<p style=\"font-size:19;font-family: Arial;padding: 0 10;\"><span style=\"font-weight:bold\">Section Title</span></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu dapibus urna. Donec dignissim augue vitae elit dignissim, ut pretium risus aliquam.</br></br>Nam ut sodales mauris. Morbi luctus molestie ante eget fringilla. Suspendisse at risus eros. Curabitur ac laoreet leo. In ante ex, dapibus eget lorem vel, venenatis gravida nunc. Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat. Fusce eu orci at tellus convallis feugiat ac ut quam. Sed gravida ipsum et feugiat ornare.</br></br><span style=\"font-weight:bold\">Section Title</span></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu dapibus urna. Donec dignissim augue vitae elit dignissim, ut pretium.</br></br> Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat.</p>"
        };
    }
    public getPrivacyPolicy() {
        return {
            "html1": "<p style=\"font-size:19;font-family: Arial;padding: 0 10;\"><span style=\"font-weight:bold\">Section Title</span></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu dapibus urna. Donec dignissim augue vitae elit dignissim, ut pretium risus aliquam.</br></br>Nam ut sodales mauris. Morbi luctus molestie ante eget fringilla. Suspendisse at risus eros. Curabitur ac laoreet leo. In ante ex, dapibus eget lorem vel, venenatis gravida nunc. Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat. Fusce eu orci at tellus convallis feugiat ac ut quam. Sed gravida ipsum et feugiat ornare.</br></br><span style=\"font-weight:bold\">Section Title</span></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu dapibus urna. Donec dignissim augue vitae elit dignissim, ut pretium.</br></br> Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat.</p>"
        };
    }
}