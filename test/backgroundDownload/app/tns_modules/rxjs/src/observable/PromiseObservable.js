"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../util/root");
var Observable_1 = require("../Observable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        var _this = _super.call(this) || this;
        _this.promise = promise;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {Promise<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvbWlzZU9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9taXNlT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvQztBQUVwQyw0Q0FBMkM7QUFJM0M7Ozs7R0FJRztBQUNIO0lBQTBDLHFDQUFhO0lBa0NyRCwyQkFBb0IsT0FBbUIsRUFBVSxTQUFzQjtRQUF2RSxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7O0lBRXZFLENBQUM7SUFoQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSSx3QkFBTSxHQUFiLFVBQWlCLE9BQW1CLEVBQUUsU0FBc0I7UUFDMUQsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFNUyxzQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUE5QyxpQkF3REM7UUF2REMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUIsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN4QixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQ1YsVUFBQyxLQUFLO29CQUNKLEtBQUksQ0FBQyxLQUFL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QUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgUHJvbWlzZU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBwdWJsaWMgdmFsdWU6IFQ7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgUHJvbWlzZSB0byBhbiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQganVzdCBlbWl0cyB0aGUgUHJvbWlzZSdzXG4gICAqIHJlc29sdmVkIHZhbHVlLCB0aGVuIGNvbXBsZXRlcy48L3NwYW4+XG4gICAqXG4gICAqIENvbnZlcnRzIGFuIEVTMjAxNSBQcm9taXNlIG9yIGEgUHJvbWlzZXMvQSsgc3BlYyBjb21wbGlhbnQgUHJvbWlzZSB0byBhblxuICAgKiBPYnNlcnZhYmxlLiBJZiB0aGUgUHJvbWlzZSByZXNvbHZlcyB3aXRoIGEgdmFsdWUsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICAgKiBlbWl0cyB0aGF0IHJlc29sdmVkIHZhbHVlIGFzIGEgYG5leHRgLCBhbmQgdGhlbiBjb21wbGV0ZXMuIElmIHRoZSBQcm9taXNlXG4gICAqIGlzIHJlamVjdGVkLCB0aGVuIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyB0aGUgY29ycmVzcG9uZGluZyBFcnJvci5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCB0aGUgUHJvbWlzZSByZXR1cm5lZCBieSBGZXRjaCB0byBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiB2YXIgcmVzdWx0ID0gUnguT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShmZXRjaCgnaHR0cDovL215c2VydmVyLmNvbS8nKSk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgYmluZENhbGxiYWNrfVxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb21pc2U8VD59IHByb21pc2UgVGhlIHByb21pc2UgdG8gYmUgY29udmVydGVkLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICogdGhlIGRlbGl2ZXJ5IG9mIHRoZSByZXNvbHZlZCB2YWx1ZSAob3IgdGhlIHJlamVjdGlvbikuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgd2hpY2ggd3JhcHMgdGhlIFByb21pc2UuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBmcm9tUHJvbWlzZVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JzZXJ2YWJsZShwcm9taXNlLCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPFQ+LCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICBpZiAoc2NoZWR1bGVyID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NjYWxhcikge1xuICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4obnVsbCwgZXJyID0+IHtcbiAgICAgICAgICAvLyBlc2NhcGUgdGhlIHByb21pc2UgdHJhcCwgdGhyb3cgdW5oYW5kbGVkIGVycm9yc1xuICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNTY2FsYXIpIHtcbiAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlOiB0aGlzLnZhbHVlLCBzdWJzY3JpYmVyIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWUsIHN1YnNjcmliZXIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnIsIHN1YnNjcmliZXIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4obnVsbCwgKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gZXNjYXBlIHRoZSBwcm9taXNlIHRyYXAsIHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaE5leHRBcmc8VD4ge1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+O1xuICB2YWx1ZTogVDtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoTmV4dEFyZzxUPikge1xuICBjb25zdCB7IHZhbHVlLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hFcnJvckFyZzxUPiB7XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD47XG4gIGVycjogYW55O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcjxUPihhcmc6IERpc3BhdGNoRXJyb3JBcmc8VD4pIHtcbiAgY29uc3QgeyBlcnIsIHN1YnNjcmliZXIgfSA9IGFyZztcbiAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgfVxufVxuIl19