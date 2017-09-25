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
    return AjaxObservable;
}(Observable_1.Observable));
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
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWpheE9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBamF4T2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF1QztBQUN2QyxnREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELCtDQUE4QztBQUM5QywrQ0FBOEM7QUFFOUMsMENBQWlEO0FBbUJqRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLFdBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLFdBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7QUFDSCxDQUFDO0FBRUQ7SUFDRSxFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxNQUFNLFNBQVEsQ0FBQztRQUNuQixJQUFJLENBQUM7WUFDSCxJQUFNLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDOUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDO29CQUNILE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JB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QUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7O0lBQzNCLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBK0IsS0FBSyxHQWlCbkM7QUFqQlksOEJBQVM7QUFtQnRCOzs7O0dBSUc7QUFDSDtJQUFzQyxvQ0FBUztJQUM3QywwQkFBWSxHQUFtQixFQUFFLE9BQW9CO2VBQ25ELGtCQUFNLGNBQWMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFKRCxDQUFzQyxTQUFTLEdBSTlDO0FBSlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uLy4uL3V0aWwvcm9vdCc7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uLy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi8uLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi8uLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWFwT3BlcmF0b3IgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9tYXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqYXhSZXF1ZXN0IHtcbiAgdXJsPzogc3RyaW5nO1xuICBib2R5PzogYW55O1xuICB1c2VyPzogc3RyaW5nO1xuICBhc3luYz86IGJvb2xlYW47XG4gIG1ldGhvZD86IHN0cmluZztcbiAgaGVhZGVycz86IE9iamVjdDtcbiAgdGltZW91dD86IG51bWJlcjtcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIGhhc0NvbnRlbnQ/OiBib29sZWFuO1xuICBjcm9zc0RvbWFpbj86IGJvb2xlYW47XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gIGNyZWF0ZVhIUj86ICgpID0+IFhNTEh0dHBSZXF1ZXN0O1xuICBwcm9ncmVzc1N1YnNjcmliZXI/OiBTdWJzY3JpYmVyPGFueT47XG4gIHJlc3BvbnNlVHlwZT86IHN0cmluZztcbn1cblxuZnVuY3Rpb24gZ2V0Q09SU1JlcXVlc3QodGhpczogQWpheFJlcXVlc3QpOiBYTUxIdHRwUmVxdWVzdCB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyByb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH0gZWxzZSBpZiAoISFyb290LlhEb21haW5SZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyByb290LlhEb21haW5SZXF1ZXN0KCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDT1JTIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0WE1MSHR0cFJlcXVlc3QoKTogWE1MSHR0cFJlcXVlc3Qge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgcm9vdC5YTUxIdHRwUmVxdWVzdCgpO1xuICB9IGVsc2Uge1xuICAgIGxldCBwcm9nSWQ6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvZ0lkcyA9IFsnTXN4bWwyLlhNTEhUVFAnLCAnTWljcm9zb2Z0LlhNTEhUVFAnLCAnTXN4bWwyLlhNTEhUVFAuNC4wJ107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb2dJZCA9IHByb2dJZHNbaV07XG4gICAgICAgICAgaWYgKG5ldyByb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy9zdXBwcmVzcyBleGNlcHRpb25zXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgcm9vdC5BY3RpdmVYT2JqZWN0KHByb2dJZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdYTUxIdHRwUmVxdWVzdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqYXhDcmVhdGlvbk1ldGhvZCB7XG4gICh1cmxPclJlcXVlc3Q6IHN0cmluZyB8IEFqYXhSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+O1xuICBnZXQodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT47XG4gIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk/OiBhbnksIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT47XG4gIHB1dCh1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPjtcbiAgcGF0Y2godXJsOiBzdHJpbmcsIGJvZHk/OiBhbnksIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPEFqYXhSZXNwb25zZT47XG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPjtcbiAgZ2V0SlNPTjxUPih1cmw6IHN0cmluZywgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8VD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4R2V0KHVybDogc3RyaW5nLCBoZWFkZXJzOiBPYmplY3QgPSBudWxsKSB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8QWpheFJlc3BvbnNlPih7IG1ldGhvZDogJ0dFVCcsIHVybCwgaGVhZGVycyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4UG9zdCh1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPiB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8QWpheFJlc3BvbnNlPih7IG1ldGhvZDogJ1BPU1QnLCB1cmwsIGJvZHksIGhlYWRlcnMgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWpheERlbGV0ZSh1cmw6IHN0cmluZywgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPiB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8QWpheFJlc3BvbnNlPih7IG1ldGhvZDogJ0RFTEVURScsIHVybCwgaGVhZGVycyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4UHV0KHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+IHtcbiAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZTxBamF4UmVzcG9uc2U+KHsgbWV0aG9kOiAnUFVUJywgdXJsLCBib2R5LCBoZWFkZXJzIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhQYXRjaCh1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8QWpheFJlc3BvbnNlPiB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8QWpheFJlc3BvbnNlPih7IG1ldGhvZDogJ1BBVENIJywgdXJsLCBib2R5LCBoZWFkZXJzIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhHZXRKU09OPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8QWpheFJlc3BvbnNlPih7IG1ldGhvZDogJ0dFVCcsIHVybCwgcmVzcG9uc2VUeXBlOiAnanNvbicsIGhlYWRlcnMgfSlcbiAgICAubGlmdDxUPihuZXcgTWFwT3BlcmF0b3I8QWpheFJlc3BvbnNlLCBUPigoeDogQWpheFJlc3BvbnNlLCBpbmRleDogbnVtYmVyKTogVCA9PiB4LnJlc3BvbnNlLCBudWxsKSk7XG59O1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgZm9yIGFuIEFqYXggcmVxdWVzdCB3aXRoIGVpdGhlciBhIHJlcXVlc3Qgb2JqZWN0IHdpdGhcbiAgICogdXJsLCBoZWFkZXJzLCBldGMgb3IgYSBzdHJpbmcgZm9yIGEgVVJMLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoJy9wcm9kdWN0cycpO1xuICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoeyB1cmw6ICdwcm9kdWN0cycsIG1ldGhvZDogJ0dFVCcgfSk7XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gcmVxdWVzdCBDYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqICAgQSBzdHJpbmcgb2YgdGhlIFVSTCB0byBtYWtlIHRoZSBBamF4IGNhbGwuXG4gICAqICAgQW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqICAgLSB1cmw6IFVSTCBvZiB0aGUgcmVxdWVzdFxuICAgKiAgIC0gYm9keTogVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3RcbiAgICogICAtIG1ldGhvZDogTWV0aG9kIG9mIHRoZSByZXF1ZXN0LCBzdWNoIGFzIEdFVCwgUE9TVCwgUFVULCBQQVRDSCwgREVMRVRFXG4gICAqICAgLSBhc3luYzogV2hldGhlciB0aGUgcmVxdWVzdCBpcyBhc3luY1xuICAgKiAgIC0gaGVhZGVyczogT3B0aW9uYWwgaGVhZGVyc1xuICAgKiAgIC0gY3Jvc3NEb21haW46IHRydWUgaWYgYSBjcm9zcyBkb21haW4gcmVxdWVzdCwgZWxzZSBmYWxzZVxuICAgKiAgIC0gY3JlYXRlWEhSOiBhIGZ1bmN0aW9uIHRvIG92ZXJyaWRlIGlmIHlvdSBuZWVkIHRvIHVzZSBhbiBhbHRlcm5hdGVcbiAgICogICBYTUxIdHRwUmVxdWVzdCBpbXBsZW1lbnRhdGlvbi5cbiAgICogICAtIHJlc3VsdFNlbGVjdG9yOiBhIGZ1bmN0aW9uIHRvIHVzZSB0byBhbHRlciB0aGUgb3V0cHV0IHZhbHVlIHR5cGUgb2ZcbiAgICogICB0aGUgT2JzZXJ2YWJsZS4gR2V0cyB7QGxpbmsgQWpheFJlc3BvbnNlfSBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBjb250YWluaW5nIHRoZSBYTUxIdHRwUmVxdWVzdC5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGFqYXhcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgKi9cbiAgc3RhdGljIGNyZWF0ZTogQWpheENyZWF0aW9uTWV0aG9kID0gKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGU6IGFueSA9ICh1cmxPclJlcXVlc3Q6IHN0cmluZyB8IEFqYXhSZXF1ZXN0KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHVybE9yUmVxdWVzdCk7XG4gICAgfTtcblxuICAgIGNyZWF0ZS5nZXQgPSBhamF4R2V0O1xuICAgIGNyZWF0ZS5wb3N0ID0gYWpheFBvc3Q7XG4gICAgY3JlYXRlLmRlbGV0ZSA9IGFqYXhEZWxldGU7XG4gICAgY3JlYXRlLnB1dCA9IGFqYXhQdXQ7XG4gICAgY3JlYXRlLnBhdGNoID0gYWpheFBhdGNoO1xuICAgIGNyZWF0ZS5nZXRKU09OID0gYWpheEdldEpTT047XG5cbiAgICByZXR1cm4gPEFqYXhDcmVhdGlvbk1ldGhvZD5jcmVhdGU7XG4gIH0pKCk7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0OiBBamF4UmVxdWVzdDtcblxuICBjb25zdHJ1Y3Rvcih1cmxPclJlcXVlc3Q6IHN0cmluZyB8IEFqYXhSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGNvbnN0IHJlcXVlc3Q6IEFqYXhSZXF1ZXN0ID0ge1xuICAgICAgYXN5bmM6IHRydWUsXG4gICAgICBjcmVhdGVYSFI6IGZ1bmN0aW9uKHRoaXM6IEFqYXhSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyb3NzRG9tYWluID8gZ2V0Q09SU1JlcXVlc3QuY2FsbCh0aGlzKSA6IGdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB9LFxuICAgICAgY3Jvc3NEb21haW46IGZhbHNlLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgdGltZW91dDogMFxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHVybE9yUmVxdWVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlcXVlc3QudXJsID0gdXJsT3JSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gdXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgIGlmICh1cmxPclJlcXVlc3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICByZXF1ZXN0W3Byb3BdID0gdXJsT3JSZXF1ZXN0W3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gbmV3IEFqYXhTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucmVxdWVzdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8RXZlbnQ+IHtcbiAgcHJpdmF0ZSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICBwcml2YXRlIGRvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHVibGljIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyB8fCB7fTtcblxuICAgIC8vIGZvcmNlIENPUlMgaWYgcmVxdWVzdGVkXG4gICAgaWYgKCFyZXF1ZXN0LmNyb3NzRG9tYWluICYmICFoZWFkZXJzWydYLVJlcXVlc3RlZC1XaXRoJ10pIHtcbiAgICAgIGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGNvbnRlbnQgdHlwZSBpcyBzZXRcbiAgICBpZiAoISgnQ29udGVudC1UeXBlJyBpbiBoZWFkZXJzKSAmJiAhKHJvb3QuRm9ybURhdGEgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2Ygcm9vdC5Gb3JtRGF0YSkgJiYgdHlwZW9mIHJlcXVlc3QuYm9keSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCc7XG4gICAgfVxuXG4gICAgLy8gcHJvcGVybHkgc2VyaWFsaXplIGJvZHlcbiAgICByZXF1ZXN0LmJvZHkgPSB0aGlzLnNlcmlhbGl6ZUJvZHkocmVxdWVzdC5ib2R5LCByZXF1ZXN0LmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKTtcblxuICAgIHRoaXMuc2VuZCgpO1xuICB9XG5cbiAgbmV4dChlOiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgY29uc3QgeyB4aHIsIHJlcXVlc3QsIGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IEFqYXhSZXNwb25zZShlLCB4aHIsIHJlcXVlc3QpO1xuXG4gICAgZGVzdGluYXRpb24ubmV4dChyZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIHNlbmQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXF1ZXN0OiB7IHVzZXIsIG1ldGhvZCwgdXJsLCBhc3luYywgcGFzc3dvcmQsIGhlYWRlcnMsIGJvZHkgfVxuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNyZWF0ZVhIUiA9IHJlcXVlc3QuY3JlYXRlWEhSO1xuICAgIGNvbnN0IHhocjogWE1MSHR0cFJlcXVlc3QgPSB0cnlDYXRjaChjcmVhdGVYSFIpLmNhbGwocmVxdWVzdCk7XG5cbiAgICBpZiAoPGFueT54aHIgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhociA9IHhocjtcblxuICAgICAgLy8gc2V0IHVwIHRoZSBldmVudHMgYmVmb3JlIG9wZW4gWEhSXG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvVXNpbmdfWE1MSHR0cFJlcXVlc3RcbiAgICAgIC8vIFlvdSBuZWVkIHRvIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJlZm9yZSBjYWxsaW5nIG9wZW4oKSBvbiB0aGUgcmVxdWVzdC5cbiAgICAgIC8vIE90aGVyd2lzZSB0aGUgcHJvZ3Jlc3MgZXZlbnRzIHdpbGwgbm90IGZpcmUuXG4gICAgICB0aGlzLnNldHVwRXZlbnRzKHhociwgcmVxdWVzdCk7XG4gICAgICAvLyBvcGVuIFhIUlxuICAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2goeGhyLm9wZW4pLmNhbGwoeGhyLCBtZXRob2QsIHVybCwgYXN5bmMsIHVzZXIsIHBhc3N3b3JkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHhoci5vcGVuKS5jYWxsKHhociwgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIHRpbWVvdXQsIHJlc3BvbnNlVHlwZSBhbmQgd2l0aENyZWRlbnRpYWxzIGNhbiBiZSBzZXQgb25jZSB0aGUgWEhSIGlzIG9wZW5cbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICB4aHIudGltZW91dCA9IHJlcXVlc3QudGltZW91dDtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIXJlcXVlc3Qud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgaGVhZGVyc1xuICAgICAgdGhpcy5zZXRIZWFkZXJzKHhociwgaGVhZGVycyk7XG5cbiAgICAgIC8vIGZpbmFsbHkgc2VuZCB0aGUgcmVxdWVzdFxuICAgICAgcmVzdWx0ID0gYm9keSA/IHRyeUNhdGNoKHhoci5zZW5kKS5jYWxsKHhociwgYm9keSkgOiB0cnlDYXRjaCh4aHIuc2VuZCkuY2FsbCh4aHIpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHhocjtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplQm9keShib2R5OiBhbnksIGNvbnRlbnRUeXBlPzogc3RyaW5nKSB7XG4gICAgaWYgKCFib2R5IHx8IHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfSBlbHNlIGlmIChyb290LkZvcm1EYXRhICYmIGJvZHkgaW5zdGFuY2VvZiByb290LkZvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gYm9keTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgIGNvbnN0IHNwbGl0SW5kZXggPSBjb250ZW50VHlwZS5pbmRleE9mKCc7Jyk7XG4gICAgICBpZiAoc3BsaXRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29udGVudFR5cGUgPSBjb250ZW50VHlwZS5zdWJzdHJpbmcoMCwgc3BsaXRJbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGJvZHkpLm1hcChrZXkgPT4gYCR7ZW5jb2RlVVJJKGtleSl9PSR7ZW5jb2RlVVJJKGJvZHlba2V5XSl9YCkuam9pbignJicpO1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBoZWFkZXJzOiBPYmplY3QpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEV2ZW50cyh4aHI6IFhNTEh0dHBSZXF1ZXN0LCByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIGNvbnN0IHByb2dyZXNzU3Vic2NyaWJlciA9IHJlcXVlc3QucHJvZ3Jlc3NTdWJzY3JpYmVyO1xuXG4gICAgZnVuY3Rpb24geGhyVGltZW91dCh0aGlzOiBYTUxIdHRwUmVxdWVzdCwgZTogUHJvZ3Jlc3NFdmVudCkge1xuICAgICAgY29uc3Qge3N1YnNjcmliZXIsIHByb2dyZXNzU3Vic2NyaWJlciwgcmVxdWVzdCB9ID0gKDxhbnk+eGhyVGltZW91dCk7XG4gICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgIH1cbiAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhUaW1lb3V0RXJyb3IodGhpcywgcmVxdWVzdCkpOyAvL1RPRE86IE1ha2UgYmV0dGVyZXIuXG4gICAgfTtcbiAgICB4aHIub250aW1lb3V0ID0geGhyVGltZW91dDtcbiAgICAoPGFueT54aHJUaW1lb3V0KS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAoPGFueT54aHJUaW1lb3V0KS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAoPGFueT54aHJUaW1lb3V0KS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgaWYgKHhoci51cGxvYWQgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgIGxldCB4aHJQcm9ncmVzczogKGU6IFByb2dyZXNzRXZlbnQpID0+IHZvaWQ7XG4gICAgICAgIHhoclByb2dyZXNzID0gZnVuY3Rpb24oZTogUHJvZ3Jlc3NFdmVudCkge1xuICAgICAgICAgIGNvbnN0IHsgcHJvZ3Jlc3NTdWJzY3JpYmVyIH0gPSAoPGFueT54aHJQcm9ncmVzcyk7XG4gICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLm5leHQoZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChyb290LlhEb21haW5SZXF1ZXN0KSB7XG4gICAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSB4aHJQcm9ncmVzcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSB4aHJQcm9ncmVzcztcbiAgICAgICAgfVxuICAgICAgICAoPGFueT54aHJQcm9ncmVzcykucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgfVxuICAgICAgbGV0IHhockVycm9yOiAoZTogRXJyb3JFdmVudCkgPT4gdm9pZDtcbiAgICAgIHhockVycm9yID0gZnVuY3Rpb24odGhpczogWE1MSHR0cFJlcXVlc3QsIGU6IEVycm9yRXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBwcm9ncmVzc1N1YnNjcmliZXIsIHN1YnNjcmliZXIsIHJlcXVlc3QgfSA9ICg8YW55PnhockVycm9yKTtcbiAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4RXJyb3IoJ2FqYXggZXJyb3InLCB0aGlzLCByZXF1ZXN0KSk7XG4gICAgICB9O1xuICAgICAgeGhyLm9uZXJyb3IgPSB4aHJFcnJvcjtcbiAgICAgICg8YW55PnhockVycm9yKS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICg8YW55PnhockVycm9yKS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICg8YW55PnhockVycm9yKS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geGhyUmVhZHlTdGF0ZUNoYW5nZSh0aGlzOiBYTUxIdHRwUmVxdWVzdCwgZTogUHJvZ3Jlc3NFdmVudCkge1xuICAgICAgY29uc3QgeyBzdWJzY3JpYmVyLCBwcm9ncmVzc1N1YnNjcmliZXIsIHJlcXVlc3QgfSA9ICg8YW55PnhoclJlYWR5U3RhdGVDaGFuZ2UpO1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gdGhpcy5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB0aGlzLnN0YXR1cztcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBhbnkgPSAodGhpcy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/ICAoXG4gICAgICAgICAgdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dCkgOiB0aGlzLnJlc3BvbnNlKTtcblxuICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoMjAwIDw9IHN0YXR1cyAmJiBzdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhFcnJvcignYWpheCBlcnJvciAnICsgc3RhdHVzLCB0aGlzLCByZXF1ZXN0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB4aHJSZWFkeVN0YXRlQ2hhbmdlO1xuICAgICg8YW55PnhoclJlYWR5U3RhdGVDaGFuZ2UpLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICg8YW55PnhoclJlYWR5U3RhdGVDaGFuZ2UpLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAoPGFueT54aHJSZWFkeVN0YXRlQ2hhbmdlKS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgZG9uZSwgeGhyIH0gPSB0aGlzO1xuICAgIGlmICghZG9uZSAmJiB4aHIgJiYgeGhyLnJlYWR5U3RhdGUgIT09IDQgJiYgdHlwZW9mIHhoci5hYm9ydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgeGhyLmFib3J0KCk7XG4gICAgfVxuICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIG5vcm1hbGl6ZWQgQUpBWCByZXNwb25zZS5cbiAqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4UmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhSZXNwb25zZSB7XG4gIC8qKiBAdHlwZSB7bnVtYmVyfSBUaGUgSFRUUCBzdGF0dXMgY29kZSAqL1xuICBzdGF0dXM6IG51bWJlcjtcblxuICAvKiogQHR5cGUge3N0cmluZ3xBcnJheUJ1ZmZlcnxEb2N1bWVudHxvYmplY3R8YW55fSBUaGUgcmVzcG9uc2UgZGF0YSAqL1xuICByZXNwb25zZTogYW55O1xuXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSBUaGUgcmF3IHJlc3BvbnNlVGV4dCAqL1xuICByZXNwb25zZVRleHQ6IHN0cmluZztcblxuICAvKiogQHR5cGUge3N0cmluZ30gVGhlIHJlc3BvbnNlVHlwZSAoZS5nLiAnanNvbicsICdhcnJheWJ1ZmZlcicsIG9yICd4bWwnKSAqL1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3JpZ2luYWxFdmVudDogRXZlbnQsIHB1YmxpYyB4aHI6IFhNTEh0dHBSZXF1ZXN0LCBwdWJsaWMgcmVxdWVzdDogQWpheFJlcXVlc3QpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2VUeXBlIHx8IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuXG4gICAgc3dpdGNoICh0aGlzLnJlc3BvbnNlVHlwZSkge1xuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIGlmICgncmVzcG9uc2UnIGluIHhocikge1xuICAgICAgICAgIC8vSUUgZG9lcyBub3Qgc3VwcG9ydCBqc29uIGFzIHJlc3BvbnNlVHlwZSwgcGFyc2UgaXQgaW50ZXJuYWxseVxuICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUeXBlID8geGhyLnJlc3BvbnNlIDogSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQgfHwgJ251bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3htbCc6XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlc3BvbnNlID0gKCdyZXNwb25zZScgaW4geGhyKSA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIGVycm9yLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhFcnJvclxuICovXG5leHBvcnQgY2xhc3MgQWpheEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAvKiogQHR5cGUge1hNTEh0dHBSZXF1ZXN0fSBUaGUgWEhSIGluc3RhbmNlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXJyb3IgKi9cbiAgeGhyOiBYTUxIdHRwUmVxdWVzdDtcblxuICAvKiogQHR5cGUge0FqYXhSZXF1ZXN0fSBUaGUgQWpheFJlcXVlc3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBlcnJvciAqL1xuICByZXF1ZXN0OiBBamF4UmVxdWVzdDtcblxuICAvKiogQHR5cGUge251bWJlcn0gVGhlIEhUVFAgc3RhdHVzIGNvZGUgKi9cbiAgc3RhdHVzOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCB4aHI6IFhNTEh0dHBSZXF1ZXN0LCByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy54aHIgPSB4aHI7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gIH1cbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4VGltZW91dEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4VGltZW91dEVycm9yIGV4dGVuZHMgQWpheEVycm9yIHtcbiAgY29uc3RydWN0b3IoeGhyOiBYTUxIdHRwUmVxdWVzdCwgcmVxdWVzdDogQWpheFJlcXVlc3QpIHtcbiAgICBzdXBlcignYWpheCB0aW1lb3V0JywgeGhyLCByZXF1ZXN0KTtcbiAgfVxufVxuIl19