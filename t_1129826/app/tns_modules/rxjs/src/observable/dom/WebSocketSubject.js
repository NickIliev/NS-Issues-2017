"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../../Subject");
var Subscriber_1 = require("../../Subscriber");
var Observable_1 = require("../../Observable");
var Subscription_1 = require("../../Subscription");
var root_1 = require("../../util/root");
var ReplaySubject_1 = require("../../ReplaySubject");
var tryCatch_1 = require("../../util/tryCatch");
var errorObject_1 = require("../../util/errorObject");
var assign_1 = require("../../util/assign");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var WebSocketSubject = (function (_super) {
    __extends(WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = this;
        if (urlConfigOrSource instanceof Observable_1.Observable) {
            _this = _super.call(this, destination, urlConfigOrSource) || this;
        }
        else {
            _this = _super.call(this) || this;
            _this.WebSocketCtor = root_1.root.WebSocket;
            _this._output = new Subject_1.Subject();
            if (typeof urlConfigOrSource === 'string') {
                _this.url = urlConfigOrSource;
            }
            else {
                // WARNING: config object could override important members here.
                assign_1.assign(_this, urlConfigOrSource);
            }
            if (!_this.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new ReplaySubject_1.ReplaySubject();
        }
        return _this;
    }
    WebSocketSubject.prototype.resultSelector = function (e) {
        return JSON.parse(e.data);
    };
    /**
     * Wrapper around the w3c-compatible WebSocket object provided by the browser.
     *
     * @example <caption>Wraps browser WebSocket</caption>
     *
     * let socket$ = Observable.webSocket('ws://localhost:8081');
     *
     * socket$.subscribe(
     *    (msg) => console.log('message received: ' + msg),
     *    (err) => console.log(err),
     *    () => console.log('complete')
     *  );
     *
     * socket$.next(JSON.stringify({ op: 'hello' }));
     *
     * @example <caption>Wraps WebSocket from nodejs-websocket (using node.js)</caption>
     *
     * import { w3cwebsocket } from 'websocket';
     *
     * let socket$ = Observable.webSocket({
     *   url: 'ws://localhost:8081',
     *   WebSocketCtor: w3cwebsocket
     * });
     *
     * socket$.subscribe(
     *    (msg) => console.log('message received: ' + msg),
     *    (err) => console.log(err),
     *    () => console.log('complete')
     *  );
     *
     * socket$.next(JSON.stringify({ op: 'hello' }));
     *
     * @param {string | WebSocketSubjectConfig} urlConfigOrSource the source of the websocket as an url or a structure defining the websocket object
     * @return {WebSocketSubject}
     * @static true
     * @name webSocket
     * @owner Observable
     */
    WebSocketSubject.create = function (urlConfigOrSource) {
        return new WebSocketSubject(urlConfigOrSource);
    };
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this, this.destination);
        sock.operator = operator;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this.socket = null;
        if (!this.source) {
            this.destination = new ReplaySubject_1.ReplaySubject();
        }
        this._output = new Subject_1.Subject();
    };
    // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new Observable_1.Observable(function (observer) {
            var result = tryCatch_1.tryCatch(subMsg)();
            if (result === errorObject_1.errorObject) {
                observer.error(errorObject_1.errorObject.e);
            }
            else {
                self.next(result);
            }
            var subscription = self.subscribe(function (x) {
                var result = tryCatch_1.tryCatch(messageFilter)(x);
                if (result === errorObject_1.errorObject) {
                    observer.error(errorObject_1.errorObject.e);
                }
                else if (result) {
                    observer.next(x);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                var result = tryCatch_1.tryCatch(unsubMsg)();
                if (result === errorObject_1.errorObject) {
                    observer.error(errorObject_1.errorObject.e);
                }
                else {
                    self.next(result);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var WebSocketCtor = this.WebSocketCtor;
        var observer = this._output;
        var socket = null;
        try {
            socket = this.protocol ?
                new WebSocketCtor(this.url, this.protocol) :
                new WebSocketCtor(this.url);
            this.socket = socket;
            if (this.binaryType) {
                this.socket.binaryType = this.binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new Subscription_1.Subscription(function () {
            _this.socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var openObserver = _this.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = Subscriber_1.Subscriber.create(function (x) { return socket.readyState === 1 && socket.send(x); }, function (e) {
                var closingObserver = _this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                        'and an optional reason: { code: number, reason: string }'));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            var result = tryCatch_1.tryCatch(_this.resultSelector)(e);
            if (result === errorObject_1.errorObject) {
                observer.error(errorObject_1.errorObject.e);
            }
            else {
                observer.next(result);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this.socket) {
            this._connectSocket();
        }
        var subscription = new Subscription_1.Subscription();
        subscription.add(this._output.subscribe(subscriber));
        subscription.add(function () {
            var socket = _this.socket;
            if (_this._output.observers.length === 0) {
                if (socket && socket.readyState === 1) {
                    socket.close();
                }
                _this._resetState();
            }
        });
        return subscription;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _a = this, source = _a.source, socket = _a.socket;
        if (socket && socket.readyState === 1) {
            socket.close();
            this._resetState();
        }
        _super.prototype.unsubscribe.call(this);
        if (!source) {
            this.destination = new ReplaySubject_1.ReplaySubject();
        }
    };
    return WebSocketSubject;
}(Subject_1.AnonymousSubject));
exports.WebSocketSubject = WebSocketSubject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU29ja2V0U3ViamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIldlYlNvY2tldFN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBMEQ7QUFDMUQsK0NBQThDO0FBQzlDLCtDQUE4QztBQUM5QyxtREFBa0Q7QUFFbEQsd0NBQXVDO0FBQ3ZDLHFEQUFvRDtBQUVwRCxnREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELDRDQUEyQztBQWEzQzs7OztHQUlHO0FBQ0g7SUFBeUMsb0NBQW1CO0lBMkQxRCwwQkFBWSxpQkFBa0UsRUFBRSxXQUF5QjtRQUF6RyxpQkFrQkM7UUFqQkMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLFlBQVksdUJBQVUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBQSxrQkFBTSxXQUFXLEVBQWtCLGlCQUFpQixDQUFDLFNBQUM7UUFDeEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sUUFBQSxpQkFBTyxTQUFDO1lBQ1IsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFLLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxpQkFBaUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFpQixDQUFDO1lBQy9CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixnRUFBZ0U7Z0JBQ2hFLGVBQU0sQ0FBQyxLQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksNkJBQWEsRUFBRSxD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QUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM1BELENBQXlDLDBCQUFnQixHQTJQeEQ7QUEzUFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgQW5vbnltb3VzU3ViamVjdCB9IGZyb20gJy4uLy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uLy4uL3V0aWwvcm9vdCc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAnLi4vLi4vUmVwbGF5U3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZlciwgTmV4dE9ic2VydmVyIH0gZnJvbSAnLi4vLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi8uLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuLi8uLi91dGlsL2Fzc2lnbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2ViU29ja2V0U3ViamVjdENvbmZpZyB7XG4gIHVybDogc3RyaW5nO1xuICBwcm90b2NvbD86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gIHJlc3VsdFNlbGVjdG9yPzogPFQ+KGU6IE1lc3NhZ2VFdmVudCkgPT4gVDtcbiAgb3Blbk9ic2VydmVyPzogTmV4dE9ic2VydmVyPEV2ZW50PjtcbiAgY2xvc2VPYnNlcnZlcj86IE5leHRPYnNlcnZlcjxDbG9zZUV2ZW50PjtcbiAgY2xvc2luZ09ic2VydmVyPzogTmV4dE9ic2VydmVyPHZvaWQ+O1xuICBXZWJTb2NrZXRDdG9yPzogeyBuZXcodXJsOiBzdHJpbmcsIHByb3RvY29sPzogc3RyaW5nfEFycmF5PHN0cmluZz4pOiBXZWJTb2NrZXQgfTtcbiAgYmluYXJ5VHlwZT86ICdibG9iJyB8ICdhcnJheWJ1ZmZlcic7XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0U3ViamVjdDxUPiBleHRlbmRzIEFub255bW91c1N1YmplY3Q8VD4ge1xuXG4gIHVybDogc3RyaW5nO1xuICBwcm90b2NvbDogc3RyaW5nfEFycmF5PHN0cmluZz47XG4gIHNvY2tldDogV2ViU29ja2V0O1xuICBvcGVuT2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxFdmVudD47XG4gIGNsb3NlT2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxDbG9zZUV2ZW50PjtcbiAgY2xvc2luZ09ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dm9pZD47XG4gIFdlYlNvY2tldEN0b3I6IHsgbmV3KHVybDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZ3xBcnJheTxzdHJpbmc+KTogV2ViU29ja2V0IH07XG4gIGJpbmFyeVR5cGU/OiAnYmxvYicgfCAnYXJyYXlidWZmZXInO1xuXG4gIHByaXZhdGUgX291dHB1dDogU3ViamVjdDxUPjtcblxuICByZXN1bHRTZWxlY3RvcihlOiBNZXNzYWdlRXZlbnQpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgYXJvdW5kIHRoZSB3M2MtY29tcGF0aWJsZSBXZWJTb2NrZXQgb2JqZWN0IHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5XcmFwcyBicm93c2VyIFdlYlNvY2tldDwvY2FwdGlvbj5cbiAgICpcbiAgICogbGV0IHNvY2tldCQgPSBPYnNlcnZhYmxlLndlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6ODA4MScpO1xuICAgKlxuICAgKiBzb2NrZXQkLnN1YnNjcmliZShcbiAgICogICAgKG1zZykgPT4gY29uc29sZS5sb2coJ21lc3NhZ2UgcmVjZWl2ZWQ6ICcgKyBtc2cpLFxuICAgKiAgICAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpLFxuICAgKiAgICAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgKiAgKTtcbiAgICpcbiAgICogc29ja2V0JC5uZXh0KEpTT04uc3RyaW5naWZ5KHsgb3A6ICdoZWxsbycgfSkpO1xuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5XcmFwcyBXZWJTb2NrZXQgZnJvbSBub2RlanMtd2Vic29ja2V0ICh1c2luZyBub2RlLmpzKTwvY2FwdGlvbj5cbiAgICpcbiAgICogaW1wb3J0IHsgdzNjd2Vic29ja2V0IH0gZnJvbSAnd2Vic29ja2V0JztcbiAgICpcbiAgICogbGV0IHNvY2tldCQgPSBPYnNlcnZhYmxlLndlYlNvY2tldCh7XG4gICAqICAgdXJsOiAnd3M6Ly9sb2NhbGhvc3Q6ODA4MScsXG4gICAqICAgV2ViU29ja2V0Q3RvcjogdzNjd2Vic29ja2V0XG4gICAqIH0pO1xuICAgKlxuICAgKiBzb2NrZXQkLnN1YnNjcmliZShcbiAgICogICAgKG1zZykgPT4gY29uc29sZS5sb2coJ21lc3NhZ2UgcmVjZWl2ZWQ6ICcgKyBtc2cpLFxuICAgKiAgICAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpLFxuICAgKiAgICAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgKiAgKTtcbiAgICpcbiAgICogc29ja2V0JC5uZXh0KEpTT04uc3RyaW5naWZ5KHsgb3A6ICdoZWxsbycgfSkpO1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IFdlYlNvY2tldFN1YmplY3RDb25maWd9IHVybENvbmZpZ09yU291cmNlIHRoZSBzb3VyY2Ugb2YgdGhlIHdlYnNvY2tldCBhcyBhbiB1cmwgb3IgYSBzdHJ1Y3R1cmUgZGVmaW5pbmcgdGhlIHdlYnNvY2tldCBvYmplY3RcbiAgICogQHJldHVybiB7V2ViU29ja2V0U3ViamVjdH1cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIHdlYlNvY2tldFxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPih1cmxDb25maWdPclNvdXJjZTogc3RyaW5nIHwgV2ViU29ja2V0U3ViamVjdENvbmZpZyk6IFdlYlNvY2tldFN1YmplY3Q8VD4ge1xuICAgIHJldHVybiBuZXcgV2ViU29ja2V0U3ViamVjdDxUPih1cmxDb25maWdPclNvdXJjZSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih1cmxDb25maWdPclNvdXJjZTogc3RyaW5nIHwgV2ViU29ja2V0U3ViamVjdENvbmZpZyB8IE9ic2VydmFibGU8VD4sIGRlc3RpbmF0aW9uPzogT2JzZXJ2ZXI8VD4pIHtcbiAgICBpZiAodXJsQ29uZmlnT3JTb3VyY2UgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICBzdXBlcihkZXN0aW5hdGlvbiwgPE9ic2VydmFibGU8VD4+IHVybENvbmZpZ09yU291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuV2ViU29ja2V0Q3RvciA9IHJvb3QuV2ViU29ja2V0O1xuICAgICAgdGhpcy5fb3V0cHV0ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICAgIGlmICh0eXBlb2YgdXJsQ29uZmlnT3JTb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsQ29uZmlnT3JTb3VyY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXQVJOSU5HOiBjb25maWcgb2JqZWN0IGNvdWxkIG92ZXJyaWRlIGltcG9ydGFudCBtZW1iZXJzIGhlcmUuXG4gICAgICAgIGFzc2lnbih0aGlzLCB1cmxDb25maWdPclNvdXJjZSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuV2ViU29ja2V0Q3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFdlYlNvY2tldCBjb25zdHJ1Y3RvciBjYW4gYmUgZm91bmQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIGxpZnQ8Uj4ob3BlcmF0b3I6IE9wZXJhdG9yPFQsIFI+KTogV2ViU29ja2V0U3ViamVjdDxSPiB7XG4gICAgY29uc3Qgc29jayA9IG5ldyBXZWJTb2NrZXRTdWJqZWN0PFI+KHRoaXMsIDxhbnk+IHRoaXMuZGVzdGluYXRpb24pO1xuICAgIHNvY2sub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICByZXR1cm4gc29jaztcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0U3RhdGUoKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLl9vdXRwdXQgPSBuZXcgU3ViamVjdDxUPigpO1xuICB9XG5cbiAgLy8gVE9ETzogZmFjdG9yIHRoaXMgb3V0IHRvIGJlIGEgcHJvcGVyIE9wZXJhdG9yL1N1YnNjcmliZXIgaW1wbGVtZW50YXRpb24gYW5kIGVsaW1pbmF0ZSBjbG9zdXJlc1xuICBtdWx0aXBsZXgoc3ViTXNnOiAoKSA9PiBhbnksIHVuc3ViTXNnOiAoKSA9PiBhbnksIG1lc3NhZ2VGaWx0ZXI6ICh2YWx1ZTogVCkgPT4gYm9vbGVhbikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKHN1Yk1zZykoKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5uZXh0KHJlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBzZWxmLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2gobWVzc2FnZUZpbHRlcikoeCk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh4KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICAgZXJyID0+IG9ic2VydmVyLmVycm9yKGVyciksXG4gICAgICAgICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKCkpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaCh1bnN1Yk1zZykoKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLm5leHQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25uZWN0U29ja2V0KCkge1xuICAgIGNvbnN0IHsgV2ViU29ja2V0Q3RvciB9ID0gdGhpcztcbiAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMuX291dHB1dDtcblxuICAgIGxldCBzb2NrZXQ6IFdlYlNvY2tldCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHNvY2tldCA9IHRoaXMucHJvdG9jb2wgP1xuICAgICAgICBuZXcgV2ViU29ja2V0Q3Rvcih0aGlzLnVybCwgdGhpcy5wcm90b2NvbCkgOlxuICAgICAgICBuZXcgV2ViU29ja2V0Q3Rvcih0aGlzLnVybCk7XG4gICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICAgIGlmICh0aGlzLmJpbmFyeVR5cGUpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25vcGVuID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBvcGVuT2JzZXJ2ZXIgPSB0aGlzLm9wZW5PYnNlcnZlcjtcbiAgICAgIGlmIChvcGVuT2JzZXJ2ZXIpIHtcbiAgICAgICAgb3Blbk9ic2VydmVyLm5leHQoZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IFN1YnNjcmliZXIuY3JlYXRlKFxuICAgICAgICAoeCkgPT4gc29ja2V0LnJlYWR5U3RhdGUgPT09IDEgJiYgc29ja2V0LnNlbmQoeCksXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2xvc2luZ09ic2VydmVyID0gdGhpcy5jbG9zaW5nT2JzZXJ2ZXI7XG4gICAgICAgICAgaWYgKGNsb3NpbmdPYnNlcnZlcikge1xuICAgICAgICAgICAgY2xvc2luZ09ic2VydmVyLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGUgJiYgZS5jb2RlKSB7XG4gICAgICAgICAgICBzb2NrZXQuY2xvc2UoZS5jb2RlLCBlLnJlYXNvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBUeXBlRXJyb3IoJ1dlYlNvY2tldFN1YmplY3QuZXJyb3IgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBvYmplY3Qgd2l0aCBhbiBlcnJvciBjb2RlLCAnICtcbiAgICAgICAgICAgICAgJ2FuZCBhbiBvcHRpb25hbCByZWFzb246IHsgY29kZTogbnVtYmVyLCByZWFzb246IHN0cmluZyB9JykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9yZXNldFN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICggKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2xvc2luZ09ic2VydmVyID0gdGhpcy5jbG9zaW5nT2JzZXJ2ZXI7XG4gICAgICAgICAgaWYgKGNsb3NpbmdPYnNlcnZlcikge1xuICAgICAgICAgICAgY2xvc2luZ09ic2VydmVyLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocXVldWUgJiYgcXVldWUgaW5zdGFuY2VvZiBSZXBsYXlTdWJqZWN0KSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoKDxSZXBsYXlTdWJqZWN0PFQ+PnF1ZXVlKS5zdWJzY3JpYmUodGhpcy5kZXN0aW5hdGlvbikpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzb2NrZXQub25lcnJvciA9IChlOiBFdmVudCkgPT4ge1xuICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgfTtcblxuICAgIHNvY2tldC5vbmNsb3NlID0gKGU6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNsb3NlT2JzZXJ2ZXIgPSB0aGlzLmNsb3NlT2JzZXJ2ZXI7XG4gICAgICBpZiAoY2xvc2VPYnNlcnZlcikge1xuICAgICAgICBjbG9zZU9ic2VydmVyLm5leHQoZSk7XG4gICAgICB9XG4gICAgICBpZiAoZS53YXNDbGVhbikge1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLnJlc3VsdFNlbGVjdG9yKShlKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCB7IHNvdXJjZSB9ID0gdGhpcztcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNvY2tldCkge1xuICAgICAgdGhpcy5fY29ubmVjdFNvY2tldCgpO1xuICAgIH1cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHN1YnNjcmlwdGlvbi5hZGQodGhpcy5fb3V0cHV0LnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgc3Vic2NyaXB0aW9uLmFkZCgoKSA9PiB7XG4gICAgICBjb25zdCB7IHNvY2tldCB9ID0gdGhpcztcbiAgICAgIGlmICh0aGlzLl9vdXRwdXQub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoc29ja2V0ICYmIHNvY2tldC5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cblxuICB1bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IHNvdXJjZSwgc29ja2V0IH0gPSB0aGlzO1xuICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgIH1cbiAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==