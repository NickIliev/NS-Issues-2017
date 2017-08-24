"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../util/root");
var tryCatch_1 = require("../../util/tryCatch");
var errorObject_1 = require("../../util/errorObject");
var Observable_1 = require("../../Observable");
var Subscriber_1 = require("../../Subscriber");
var map_1 = require("../../operator/map");
function getCORSRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else if (!!root_1.root.XDomainRequest) {
        return new root_1.root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root_1.root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                    //suppress exceptions
                }
            }
            return new root_1.root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) { headers = null; }
    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
exports.ajaxGet = ajaxGet;
;
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
exports.ajaxPost = ajaxPost;
;
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
exports.ajaxDelete = ajaxDelete;
;
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
exports.ajaxPut = ajaxPut;
;
function ajaxPatch(url, body, headers) {
    return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
}
exports.ajaxPatch = ajaxPatch;
;
function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
        .lift(new map_1.MapOperator(function (x, index) { return x.response; }, null));
}
exports.ajaxGetJSON = ajaxGetJSON;
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var AjaxObservable = (function (_super) {
    __extends(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        var _this = _super.call(this) || this;
        var request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        _this.request = request;
        return _this;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    };
    return AjaxObservable;
}(Observable_1.Observable));
/**
 * Creates an observable for an Ajax request with either a request object with
 * url, headers, etc or a string for a URL.
 *
 * @example
 * source = Rx.Observable.ajax('/products');
 * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
 *
 * @param {string|Object} request Can be one of the following:
 *   A string of the URL to make the Ajax call.
 *   An object with the following properties
 *   - url: URL of the request
 *   - body: The body of the request
 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
 *   - async: Whether the request is async
 *   - headers: Optional headers
 *   - crossDomain: true if a cross domain request, else false
 *   - createXHR: a function to override if you need to use an alternate
 *   XMLHttpRequest implementation.
 *   - resultSelector: a function to use to alter the output value type of
 *   the Observable. Gets {@link AjaxResponse} as an argument.
 * @return {Observable} An observable sequence containing the XMLHttpRequest.
 * @static true
 * @name ajax
 * @owner Observable
*/
AjaxObservable.create = (function () {
    var create = function (urlOrRequest) {
        return new AjaxObservable(urlOrRequest);
    };
    create.get = ajaxGet;
    create.post = ajaxPost;
    create.delete = ajaxDelete;
    create.put = ajaxPut;
    create.patch = ajaxPatch;
    create.getJSON = ajaxGetJSON;
    return create;
})();
exports.AjaxObservable = AjaxObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AjaxSubscriber = (function (_super) {
    __extends(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        var _this = _super.call(this, destination) || this;
        _this.request = request;
        _this.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = _this.serializeBody(request.body, request.headers['Content-Type']);
        _this.send();
        return _this;
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
        var createXHR = request.createXHR;
        var xhr = tryCatch_1.tryCatch(createXHR).call(request);
        if (xhr === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            this.xhr = xhr;
            // set up the events before open XHR
            // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
            // You need to add the event listeners before calling open() on the request.
            // Otherwise the progress events will not fire.
            this.setupEvents(xhr, request);
            // open XHR
            var result = void 0;
            if (user) {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
            // timeout, responseType and withCredentials can be set once the XHR is open
            xhr.timeout = request.timeout;
            xhr.responseType = request.responseType;
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            // set headers
            this.setHeaders(xhr, headers);
            // finally send the request
            result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) { return encodeURI(key) + "=" + encodeURI(body[key]); }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
        }
        ;
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                var xhrProgress_1;
                xhrProgress_1 = function (e) {
                    var progressSubscriber = xhrProgress_1.progressSubscriber;
                    progressSubscriber.next(e);
                };
                if (root_1.root.XDomainRequest) {
                    xhr.onprogress = xhrProgress_1;
                }
                else {
                    xhr.upload.onprogress = xhrProgress_1;
                }
                xhrProgress_1.progressSubscriber = progressSubscriber;
            }
            var xhrError_1;
            xhrError_1 = function (e) {
                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxError('ajax error', this, request));
            };
            xhr.onerror = xhrError_1;
            xhrError_1.request = request;
            xhrError_1.subscriber = this;
            xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (this.readyState === 4) {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (200 <= status_1 && status_1 < 300) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                }
            }
        }
        ;
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this, done = _a.done, xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(Subscriber_1.Subscriber));
exports.AjaxSubscriber = AjaxSubscriber;
/**
 * A normalized AJAX response.
 *
 * @see {@link ajax}
 *
 * @class AjaxResponse
 */
var AjaxResponse = (function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        switch (this.responseType) {
            case 'json':
                if ('response' in xhr) {
                    //IE does not support json as responseType, parse it internally
                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
                }
                else {
                    this.response = JSON.parse(xhr.responseText || 'null');
                }
                break;
            case 'xml':
                this.response = xhr.responseXML;
                break;
            case 'text':
            default:
                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                break;
        }
    }
    return AjaxResponse;
}());
exports.AjaxResponse = AjaxResponse;
/**
 * A normalized AJAX error.
 *
 * @see {@link ajax}
 *
 * @class AjaxError
 */
var AjaxError = (function (_super) {
    __extends(AjaxError, _super);
    function AjaxError(message, xhr, request) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.xhr = xhr;
        _this.request = request;
        _this.status = xhr.status;
        return _this;
    }
    return AjaxError;
}(Error));
exports.AjaxError = AjaxError;
/**
 * @see {@link ajax}
 *
 * @class AjaxTimeoutError
 */
var AjaxTimeoutError = (function (_super) {
    __extends(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
        return _super.call(this, 'ajax timeout', xhr, request) || this;
    }
    return AjaxTimeoutError;
}(AjaxError));
exports.AjaxTimeoutError = AjaxTimeoutError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWpheE9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBamF4T2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF1QztBQUN2QyxnREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELCtDQUE4QztBQUM5QywrQ0FBOEM7QUFFOUMsMENBQWlEO0FBbUJqRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLFdBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLFdBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7QUFDSCxDQUFDO0FBRUQ7SUFDRSxFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxNQUFNLFNBQVEsQ0FBQztRQUNuQixJQUFJLENBQUM7WUFDSCxJQUFNLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDOUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDO29CQUNILE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JB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R0FBRyxDQUFDLE1BQU0sQ0FBQzs7SUFDM0IsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUErQixLQUFLLEdBaUJuQztBQWpCWSw4QkFBUztBQW1CdEI7Ozs7R0FJRztBQUNIO0lBQXNDLG9DQUFTO0lBQzdDLDBCQUFZLEdBQW1CLEVBQUUsT0FBb0I7ZUFDbkQsa0JBQU0sY0FBYyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQUpELENBQXNDLFNBQVMsR0FJOUM7QUFKWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vLi4vdXRpbC9yb290JztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uLy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBNYXBPcGVyYXRvciB9IGZyb20gJy4uLy4uL29wZXJhdG9yL21hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpheFJlcXVlc3Qge1xuICB1cmw/OiBzdHJpbmc7XG4gIGJvZHk/OiBhbnk7XG4gIHVzZXI/OiBzdHJpbmc7XG4gIGFzeW5jPzogYm9vbGVhbjtcbiAgbWV0aG9kPzogc3RyaW5nO1xuICBoZWFkZXJzPzogT2JqZWN0O1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgaGFzQ29udGVudD86IGJvb2xlYW47XG4gIGNyb3NzRG9tYWluPzogYm9vbGVhbjtcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgY3JlYXRlWEhSPzogKCkgPT4gWE1MSHR0cFJlcXVlc3Q7XG4gIHByb2dyZXNzU3Vic2NyaWJlcj86IFN1YnNjcmliZXI8YW55PjtcbiAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRDT1JTUmVxdWVzdCh0aGlzOiBBamF4UmVxdWVzdCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IHJvb3QuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfSBlbHNlIGlmICghIXJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IHJvb3QuWERvbWFpblJlcXVlc3QoKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXInKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRYTUxIdHRwUmVxdWVzdCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyByb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHByb2dJZDogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9nSWRzID0gWydNc3htbDIuWE1MSFRUUCcsICdNaWNyb3NvZnQuWE1MSFRUUCcsICdNc3htbDIuWE1MSFRUUC40LjAnXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJvZ0lkID0gcHJvZ0lkc1tpXTtcbiAgICAgICAgICBpZiAobmV3IHJvb3QuQWN0aXZlWE9iamVjdChwcm9nSWQpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvL3N1cHByZXNzIGV4Y2VwdGlvbnNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyByb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1hNTEh0dHBSZXF1ZXN0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpheENyZWF0aW9uTWV0aG9kIHtcbiAgKHVybE9yUmVxdWVzdDogc3RyaW5nIHwgQWpheFJlcXVlc3QpOiBPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT47XG4gIGdldCh1cmw6IHN0cmluZywgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPjtcbiAgcG9zdCh1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPjtcbiAgcHV0KHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+O1xuICBwYXRjaCh1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPjtcbiAgZGVsZXRlKHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+O1xuICBnZXRKU09OPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhHZXQodXJsOiBzdHJpbmcsIGhlYWRlcnM6IE9iamVjdCA9IG51bGwpIHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnR0VUJywgdXJsLCBoZWFkZXJzIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhQb3N0KHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+IHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnUE9TVCcsIHVybCwgYm9keSwgaGVhZGVycyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4RGVsZXRlKHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+IHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnREVMRVRFJywgdXJsLCBoZWFkZXJzIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhQdXQodXJsOiBzdHJpbmcsIGJvZHk/OiBhbnksIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT4ge1xuICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT4oeyBtZXRob2Q6ICdQVVQnLCB1cmwsIGJvZHksIGhlYWRlcnMgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWpheFBhdGNoKHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+IHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnUEFUQ0gnLCB1cmwsIGJvZHksIGhlYWRlcnMgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWpheEdldEpTT048VD4odXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnR0VUJywgdXJsLCByZXNwb25zZVR5cGU6ICdqc29uJywgaGVhZGVycyB9KVxuICAgIC5saWZ0PFQ+KG5ldyBNYXBPcGVyYXRvcjxBamF4UmVzcG9uc2UsIFQ+KCh4OiBBamF4UmVzcG9uc2UsIGluZGV4OiBudW1iZXIpOiBUID0+IHgucmVzcG9uc2UsIG51bGwpKTtcbn07XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgQWpheE9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSBmb3IgYW4gQWpheCByZXF1ZXN0IHdpdGggZWl0aGVyIGEgcmVxdWVzdCBvYmplY3Qgd2l0aFxuICAgKiB1cmwsIGhlYWRlcnMsIGV0YyBvciBhIHN0cmluZyBmb3IgYSBVUkwuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHNvdXJjZSA9IFJ4Lk9ic2VydmFibGUuYWpheCgnL3Byb2R1Y3RzJyk7XG4gICAqIHNvdXJjZSA9IFJ4Lk9ic2VydmFibGUuYWpheCh7IHVybDogJ3Byb2R1Y3RzJywgbWV0aG9kOiAnR0VUJyB9KTtcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSByZXF1ZXN0IENhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICogICBBIHN0cmluZyBvZiB0aGUgVVJMIHRvIG1ha2UgdGhlIEFqYXggY2FsbC5cbiAgICogICBBbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICogICAtIHVybDogVVJMIG9mIHRoZSByZXF1ZXN0XG4gICAqICAgLSBib2R5OiBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgKiAgIC0gbWV0aG9kOiBNZXRob2Qgb2YgdGhlIHJlcXVlc3QsIHN1Y2ggYXMgR0VULCBQT1NULCBQVVQsIFBBVENILCBERUxFVEVcbiAgICogICAtIGFzeW5jOiBXaGV0aGVyIHRoZSByZXF1ZXN0IGlzIGFzeW5jXG4gICAqICAgLSBoZWFkZXJzOiBPcHRpb25hbCBoZWFkZXJzXG4gICAqICAgLSBjcm9zc0RvbWFpbjogdHJ1ZSBpZiBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LCBlbHNlIGZhbHNlXG4gICAqICAgLSBjcmVhdGVYSFI6IGEgZnVuY3Rpb24gdG8gb3ZlcnJpZGUgaWYgeW91IG5lZWQgdG8gdXNlIGFuIGFsdGVybmF0ZVxuICAgKiAgIFhNTEh0dHBSZXF1ZXN0IGltcGxlbWVudGF0aW9uLlxuICAgKiAgIC0gcmVzdWx0U2VsZWN0b3I6IGEgZnVuY3Rpb24gdG8gdXNlIHRvIGFsdGVyIHRoZSBvdXRwdXQgdmFsdWUgdHlwZSBvZlxuICAgKiAgIHRoZSBPYnNlcnZhYmxlLiBHZXRzIHtAbGluayBBamF4UmVzcG9uc2V9IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIGNvbnRhaW5pbmcgdGhlIFhNTEh0dHBSZXF1ZXN0LlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgYWpheFxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAqL1xuICBzdGF0aWMgY3JlYXRlOiBBamF4Q3JlYXRpb25NZXRob2QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZTogYW55ID0gKHVybE9yUmVxdWVzdDogc3RyaW5nIHwgQWpheFJlcXVlc3QpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUodXJsT3JSZXF1ZXN0KTtcbiAgICB9O1xuXG4gICAgY3JlYXRlLmdldCA9IGFqYXhHZXQ7XG4gICAgY3JlYXRlLnBvc3QgPSBhamF4UG9zdDtcbiAgICBjcmVhdGUuZGVsZXRlID0gYWpheERlbGV0ZTtcbiAgICBjcmVhdGUucHV0ID0gYWpheFB1dDtcbiAgICBjcmVhdGUucGF0Y2ggPSBhamF4UGF0Y2g7XG4gICAgY3JlYXRlLmdldEpTT04gPSBhamF4R2V0SlNPTjtcblxuICAgIHJldHVybiA8QWpheENyZWF0aW9uTWV0aG9kPmNyZWF0ZTtcbiAgfSkoKTtcblxuICBwcml2YXRlIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHVybE9yUmVxdWVzdDogc3RyaW5nIHwgQWpheFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgcmVxdWVzdDogQWpheFJlcXVlc3QgPSB7XG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICAgIGNyZWF0ZVhIUjogZnVuY3Rpb24odGhpczogQWpheFJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Jvc3NEb21haW4gPyBnZXRDT1JTUmVxdWVzdC5jYWxsKHRoaXMpIDogZ2V0WE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIH0sXG4gICAgICBjcm9zc0RvbWFpbjogZmFsc2UsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB0aW1lb3V0OiAwXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgdXJsT3JSZXF1ZXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmVxdWVzdC51cmwgPSB1cmxPclJlcXVlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB1cmxPclJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHVybE9yUmVxdWVzdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIHJlcXVlc3RbcHJvcF0gPSB1cmxPclJlcXVlc3RbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBuZXcgQWpheFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5yZXF1ZXN0KTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxFdmVudD4ge1xuICBwcml2YXRlIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gIHByaXZhdGUgZG9uZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwdWJsaWMgcmVxdWVzdDogQWpheFJlcXVlc3QpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xuXG4gICAgLy8gZm9yY2UgQ09SUyBpZiByZXF1ZXN0ZWRcbiAgICBpZiAoIXJlcXVlc3QuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSkge1xuICAgICAgaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgY29udGVudCB0eXBlIGlzIHNldFxuICAgIGlmICghKCdDb250ZW50LVR5cGUnIGluIGhlYWRlcnMpICYmICEocm9vdC5Gb3JtRGF0YSAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiByb290LkZvcm1EYXRhKSAmJiB0eXBlb2YgcmVxdWVzdC5ib2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04JztcbiAgICB9XG5cbiAgICAvLyBwcm9wZXJseSBzZXJpYWxpemUgYm9keVxuICAgIHJlcXVlc3QuYm9keSA9IHRoaXMuc2VyaWFsaXplQm9keShyZXF1ZXN0LmJvZHksIHJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10pO1xuXG4gICAgdGhpcy5zZW5kKCk7XG4gIH1cblxuICBuZXh0KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICBjb25zdCB7IHhociwgcmVxdWVzdCwgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQWpheFJlc3BvbnNlKGUsIHhociwgcmVxdWVzdCk7XG5cbiAgICBkZXN0aW5hdGlvbi5uZXh0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VuZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgY29uc3Qge1xuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlcXVlc3Q6IHsgdXNlciwgbWV0aG9kLCB1cmwsIGFzeW5jLCBwYXNzd29yZCwgaGVhZGVycywgYm9keSB9XG4gICAgfSA9IHRoaXM7XG4gICAgY29uc3QgY3JlYXRlWEhSID0gcmVxdWVzdC5jcmVhdGVYSFI7XG4gICAgY29uc3QgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IHRyeUNhdGNoKGNyZWF0ZVhIUikuY2FsbChyZXF1ZXN0KTtcblxuICAgIGlmICg8YW55PnhociA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueGhyID0geGhyO1xuXG4gICAgICAvLyBzZXQgdXAgdGhlIGV2ZW50cyBiZWZvcmUgb3BlbiBYSFJcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9Vc2luZ19YTUxIdHRwUmVxdWVzdFxuICAgICAgLy8gWW91IG5lZWQgdG8gYWRkIHRoZSBldmVudCBsaXN0ZW5lcnMgYmVmb3JlIGNhbGxpbmcgb3BlbigpIG9uIHRoZSByZXF1ZXN0LlxuICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBwcm9ncmVzcyBldmVudHMgd2lsbCBub3QgZmlyZS5cbiAgICAgIHRoaXMuc2V0dXBFdmVudHMoeGhyLCByZXF1ZXN0KTtcbiAgICAgIC8vIG9wZW4gWEhSXG4gICAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICByZXN1bHQgPSB0cnlDYXRjaCh4aHIub3BlbikuY2FsbCh4aHIsIG1ldGhvZCwgdXJsLCBhc3luYywgdXNlciwgcGFzc3dvcmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2goeGhyLm9wZW4pLmNhbGwoeGhyLCBtZXRob2QsIHVybCwgYXN5bmMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gdGltZW91dCwgcmVzcG9uc2VUeXBlIGFuZCB3aXRoQ3JlZGVudGlhbHMgY2FuIGJlIHNldCBvbmNlIHRoZSBYSFIgaXMgb3BlblxuICAgICAgeGhyLnRpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG5cbiAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhcmVxdWVzdC53aXRoQ3JlZGVudGlhbHM7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBoZWFkZXJzXG4gICAgICB0aGlzLnNldEhlYWRlcnMoeGhyLCBoZWFkZXJzKTtcblxuICAgICAgLy8gZmluYWxseSBzZW5kIHRoZSByZXF1ZXN0XG4gICAgICByZXN1bHQgPSBib2R5ID8gdHJ5Q2F0Y2goeGhyLnNlbmQpLmNhbGwoeGhyLCBib2R5KSA6IHRyeUNhdGNoKHhoci5zZW5kKS5jYWxsKHhocik7XG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geGhyO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVCb2R5KGJvZHk6IGFueSwgY29udGVudFR5cGU/OiBzdHJpbmcpIHtcbiAgICBpZiAoIWJvZHkgfHwgdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYm9keTtcbiAgICB9IGVsc2UgaWYgKHJvb3QuRm9ybURhdGEgJiYgYm9keSBpbnN0YW5jZW9mIHJvb3QuRm9ybURhdGEpIHtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgY29uc3Qgc3BsaXRJbmRleCA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJzsnKTtcbiAgICAgIGlmIChzcGxpdEluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnN1YnN0cmluZygwLCBzcGxpdEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYm9keSkubWFwKGtleSA9PiBgJHtlbmNvZGVVUkkoa2V5KX09JHtlbmNvZGVVUkkoYm9keVtrZXldKX1gKS5qb2luKCcmJyk7XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QsIGhlYWRlcnM6IE9iamVjdCkge1xuICAgIGZvciAobGV0IGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICBpZiAoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwRXZlbnRzKHhocjogWE1MSHR0cFJlcXVlc3QsIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0KSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NTdWJzY3JpYmVyID0gcmVxdWVzdC5wcm9ncmVzc1N1YnNjcmliZXI7XG5cbiAgICBmdW5jdGlvbiB4aHJUaW1lb3V0KHRoaXM6IFhNTEh0dHBSZXF1ZXN0LCBlOiBQcm9ncmVzc0V2ZW50KSB7XG4gICAgICBjb25zdCB7c3Vic2NyaWJlciwgcHJvZ3Jlc3NTdWJzY3JpYmVyLCByZXF1ZXN0IH0gPSAoPGFueT54aHJUaW1lb3V0KTtcbiAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgICAgfVxuICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheFRpbWVvdXRFcnJvcih0aGlzLCByZXF1ZXN0KSk7IC8vVE9ETzogTWFrZSBiZXR0ZXJlci5cbiAgICB9O1xuICAgIHhoci5vbnRpbWVvdXQgPSB4aHJUaW1lb3V0O1xuICAgICg8YW55PnhoclRpbWVvdXQpLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICg8YW55PnhoclRpbWVvdXQpLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICg8YW55PnhoclRpbWVvdXQpLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICBpZiAoeGhyLnVwbG9hZCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgbGV0IHhoclByb2dyZXNzOiAoZTogUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZDtcbiAgICAgICAgeGhyUHJvZ3Jlc3MgPSBmdW5jdGlvbihlOiBQcm9ncmVzc0V2ZW50KSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9ncmVzc1N1YnNjcmliZXIgfSA9ICg8YW55PnhoclByb2dyZXNzKTtcbiAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICAgICAgICB4aHIub25wcm9ncmVzcyA9IHhoclByb2dyZXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IHhoclByb2dyZXNzO1xuICAgICAgICB9XG4gICAgICAgICg8YW55PnhoclByb2dyZXNzKS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICB9XG4gICAgICBsZXQgeGhyRXJyb3I6IChlOiBFcnJvckV2ZW50KSA9PiB2b2lkO1xuICAgICAgeGhyRXJyb3IgPSBmdW5jdGlvbih0aGlzOiBYTUxIdHRwUmVxdWVzdCwgZTogRXJyb3JFdmVudCkge1xuICAgICAgICBjb25zdCB7IHByb2dyZXNzU3Vic2NyaWJlciwgc3Vic2NyaWJlciwgcmVxdWVzdCB9ID0gKDxhbnk+eGhyRXJyb3IpO1xuICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhFcnJvcignYWpheCBlcnJvcicsIHRoaXMsIHJlcXVlc3QpKTtcbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9IHhockVycm9yO1xuICAgICAgKDxhbnk+eGhyRXJyb3IpLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgKDxhbnk+eGhyRXJyb3IpLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICAgKDxhbnk+eGhyRXJyb3IpLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB4aHJSZWFkeVN0YXRlQ2hhbmdlKHRoaXM6IFhNTEh0dHBSZXF1ZXN0LCBlOiBQcm9ncmVzc0V2ZW50KSB7XG4gICAgICBjb25zdCB7IHN1YnNjcmliZXIsIHByb2dyZXNzU3Vic2NyaWJlciwgcmVxdWVzdCB9ID0gKDxhbnk+eGhyUmVhZHlTdGF0ZUNoYW5nZSk7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgIC8vIG5vcm1hbGl6ZSBJRTkgYnVnIChodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xNDUwKVxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSB0aGlzLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHRoaXMuc3RhdHVzO1xuICAgICAgICBsZXQgcmVzcG9uc2U6IGFueSA9ICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gIChcbiAgICAgICAgICB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0KSA6IHRoaXMucmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIGZpeCBzdGF0dXMgY29kZSB3aGVuIGl0IGlzIDAgKDAgc3RhdHVzIGlzIHVuZG9jdW1lbnRlZCkuXG4gICAgICAgIC8vIE9jY3VycyB3aGVuIGFjY2Vzc2luZyBmaWxlIHJlc291cmNlcyBvciBvbiBBbmRyb2lkIDQuMSBzdG9jayBicm93c2VyXG4gICAgICAgIC8vIHdoaWxlIHJldHJpZXZpbmcgZmlsZXMgZnJvbSBhcHBsaWNhdGlvbiBjYWNoZS5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgIHN0YXR1cyA9IHJlc3BvbnNlID8gMjAwIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgyMDAgPD0gc3RhdHVzICYmIHN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZSk7XG4gICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yICcgKyBzdGF0dXMsIHRoaXMsIHJlcXVlc3QpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHhoclJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgKDxhbnk+eGhyUmVhZHlTdGF0ZUNoYW5nZSkuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgKDxhbnk+eGhyUmVhZHlTdGF0ZUNoYW5nZSkucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICg8YW55PnhoclJlYWR5U3RhdGVDaGFuZ2UpLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBkb25lLCB4aHIgfSA9IHRoaXM7XG4gICAgaWYgKCFkb25lICYmIHhociAmJiB4aHIucmVhZHlTdGF0ZSAhPT0gNCAmJiB0eXBlb2YgeGhyLmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB4aHIuYWJvcnQoKTtcbiAgICB9XG4gICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIHJlc3BvbnNlLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhSZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgQWpheFJlc3BvbnNlIHtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9IFRoZSBIVFRQIHN0YXR1cyBjb2RlICovXG4gIHN0YXR1czogbnVtYmVyO1xuXG4gIC8qKiBAdHlwZSB7c3RyaW5nfEFycmF5QnVmZmVyfERvY3VtZW50fG9iamVjdHxhbnl9IFRoZSByZXNwb25zZSBkYXRhICovXG4gIHJlc3BvbnNlOiBhbnk7XG5cbiAgLyoqIEB0eXBlIHtzdHJpbmd9IFRoZSByYXcgcmVzcG9uc2VUZXh0ICovXG4gIHJlc3BvbnNlVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSBUaGUgcmVzcG9uc2VUeXBlIChlLmcuICdqc29uJywgJ2FycmF5YnVmZmVyJywgb3IgJ3htbCcpICovXG4gIHJlc3BvbnNlVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcmlnaW5hbEV2ZW50OiBFdmVudCwgcHVibGljIHhocjogWE1MSHR0cFJlcXVlc3QsIHB1YmxpYyByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIHRoaXMuc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHhoci5yZXNwb25zZVR5cGUgfHwgcmVxdWVzdC5yZXNwb25zZVR5cGU7XG5cbiAgICBzd2l0Y2ggKHRoaXMucmVzcG9uc2VUeXBlKSB7XG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgaWYgKCdyZXNwb25zZScgaW4geGhyKSB7XG4gICAgICAgICAgLy9JRSBkb2VzIG5vdCBzdXBwb3J0IGpzb24gYXMgcmVzcG9uc2VUeXBlLCBwYXJzZSBpdCBpbnRlcm5hbGx5XG4gICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHhoci5yZXNwb25zZVR5cGUgPyB4aHIucmVzcG9uc2UgOiBKU09OLnBhcnNlKHhoci5yZXNwb25zZSB8fCB4aHIucmVzcG9uc2VUZXh0IHx8ICdudWxsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneG1sJzpcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSAoJ3Jlc3BvbnNlJyBpbiB4aHIpID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBub3JtYWxpemVkIEFKQVggZXJyb3IuXG4gKlxuICogQHNlZSB7QGxpbmsgYWpheH1cbiAqXG4gKiBAY2xhc3MgQWpheEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKiBAdHlwZSB7WE1MSHR0cFJlcXVlc3R9IFRoZSBYSFIgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBlcnJvciAqL1xuICB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuXG4gIC8qKiBAdHlwZSB7QWpheFJlcXVlc3R9IFRoZSBBamF4UmVxdWVzdCBhc3NvY2lhdGVkIHdpdGggdGhlIGVycm9yICovXG4gIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0O1xuXG4gIC8qKiBAdHlwZSB7bnVtYmVyfSBUaGUgSFRUUCBzdGF0dXMgY29kZSAqL1xuICBzdGF0dXM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHhocjogWE1MSHR0cFJlcXVlc3QsIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnhociA9IHhocjtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuc3RhdHVzID0geGhyLnN0YXR1cztcbiAgfVxufVxuXG4vKipcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhUaW1lb3V0RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhUaW1lb3V0RXJyb3IgZXh0ZW5kcyBBamF4RXJyb3Ige1xuICBjb25zdHJ1Y3Rvcih4aHI6IFhNTEh0dHBSZXF1ZXN0LCByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIHN1cGVyKCdhamF4IHRpbWVvdXQnLCB4aHIsIHJlcXVlc3QpO1xuICB9XG59XG4iXX0=