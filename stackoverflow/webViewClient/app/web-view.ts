export class WebViewClientSslImpl extends android.webkit.WebViewClient {
    
    constructor(public owner: any) {
        super();
        return global.__native(this);
    }

    public shouldOverrideUrlLoading(view: android.webkit.WebView, url: string) {
        return false;
    }

    public onPageStarted(view: android.webkit.WebView, url: string, favicon: android.graphics.Bitmap) {
        super.onPageStarted(view, url, favicon);
        const owner = this.owner;
        if (owner) {
            owner._onLoadStarted(url, undefined);
        }
    }

    public onPageFinished(view: android.webkit.WebView, url: string) {
        super.onPageFinished(view, url);
        const owner = this.owner;
        if (owner) {
            owner._onLoadFinished(url, undefined);
        }
    }

    public onReceivedError() {
        let view: android.webkit.WebView = arguments[0];

        if (arguments.length === 4) {
            let errorCode: number = arguments[1];
            let description: string = arguments[2];
            let failingUrl: string = arguments[3];

            super.onReceivedError(view, errorCode, description, failingUrl);

            const owner = this.owner;
            if (owner) {
                owner._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
            }
        } else {
            let request: any = arguments[1];
            let error: any = arguments[2];

            super.onReceivedError(view, request, error);
            const owner = this.owner;
            if (owner) {
                owner._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }
        }
    }

    public onReceivedSslError(view: any, handler: any, error: any) {
        handler.proceed();
    }
};
