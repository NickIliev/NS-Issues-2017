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
     * @param {PromiseLike<T>} promise The promise to be converted.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvbWlzZU9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9taXNlT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvQztBQUVwQyw0Q0FBMkM7QUFJM0M7Ozs7R0FJRztBQUNIO0lBQTBDLHFDQUFhO0lBa0NyRCwyQkFBb0IsT0FBdUIsRUFBVSxTQUFzQjtRQUEzRSxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsYUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxlQUFTLEdBQVQsU0FBUyxDQUFhOztJQUUzRSxDQUFDO0lBaENEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0ksd0JBQU0sR0FBYixVQUFpQixPQUF1QixFQUFFLFNBQXNCO1FBQzlELE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBTVMsc0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFBOUMsaUJBd0RDO1FBdkRDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsSUFBSSxDQUNWLFVBQUMsS0FBSztvQkFDSixLQUFJLENBQUMsS0FB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RUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uL3V0aWwvcm9vdCc7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFByb21pc2VPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgcHVibGljIHZhbHVlOiBUO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFByb21pc2UgdG8gYW4gT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGp1c3QgZW1pdHMgdGhlIFByb21pc2Unc1xuICAgKiByZXNvbHZlZCB2YWx1ZSwgdGhlbiBjb21wbGV0ZXMuPC9zcGFuPlxuICAgKlxuICAgKiBDb252ZXJ0cyBhbiBFUzIwMTUgUHJvbWlzZSBvciBhIFByb21pc2VzL0ErIHNwZWMgY29tcGxpYW50IFByb21pc2UgdG8gYW5cbiAgICogT2JzZXJ2YWJsZS4gSWYgdGhlIFByb21pc2UgcmVzb2x2ZXMgd2l0aCBhIHZhbHVlLCB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAgICogZW1pdHMgdGhhdCByZXNvbHZlZCB2YWx1ZSBhcyBhIGBuZXh0YCwgYW5kIHRoZW4gY29tcGxldGVzLiBJZiB0aGUgUHJvbWlzZVxuICAgKiBpcyByZWplY3RlZCwgdGhlbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgdGhlIGNvcnJlc3BvbmRpbmcgRXJyb3IuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgdGhlIFByb21pc2UgcmV0dXJuZWQgYnkgRmV0Y2ggdG8gYW4gT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUuZnJvbVByb21pc2UoZmV0Y2goJ2h0dHA6Ly9teXNlcnZlci5jb20vJykpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGJpbmRDYWxsYmFja31cbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICpcbiAgICogQHBhcmFtIHtQcm9taXNlTGlrZTxUPn0gcHJvbWlzZSBUaGUgcHJvbWlzZSB0byBiZSBjb252ZXJ0ZWQuXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBbiBvcHRpb25hbCBJU2NoZWR1bGVyIHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgKiB0aGUgZGVsaXZlcnkgb2YgdGhlIHJlc29sdmVkIHZhbHVlIChvciB0aGUgcmVqZWN0aW9uKS5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB3aGljaCB3cmFwcyB0aGUgUHJvbWlzZS5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21Qcm9taXNlXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KHByb21pc2U6IFByb21pc2VMaWtlPFQ+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JzZXJ2YWJsZShwcm9taXNlLCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlTGlrZTxUPiwgcHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuXG4gICAgaWYgKHNjaGVkdWxlciA9PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5faXNTY2FsYXIpIHtcbiAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NhbGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC50aGVuKG51bGwsIGVyciA9PiB7XG4gICAgICAgICAgLy8gZXNjYXBlIHRoZSBwcm9taXNlIHRyYXAsIHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICByb290LnNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBlcnI7IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2lzU2NhbGFyKSB7XG4gICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgMCwgeyB2YWx1ZTogdGhpcy52YWx1ZSwgc3Vic2NyaWJlciB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlLCBzdWJzY3JpYmVyIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoRXJyb3IsIDAsIHsgZXJyLCBzdWJzY3JpYmVyIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKG51bGwsIChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIGVzY2FwZSB0aGUgcHJvbWlzZSB0cmFwLCB0aHJvdyB1bmhhbmRsZWQgZXJyb3JzXG4gICAgICAgICAgICByb290LnNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBlcnI7IH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hOZXh0QXJnPFQ+IHtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbiAgdmFsdWU6IFQ7XG59XG5mdW5jdGlvbiBkaXNwYXRjaE5leHQ8VD4oYXJnOiBEaXNwYXRjaE5leHRBcmc8VD4pIHtcbiAgY29uc3QgeyB2YWx1ZSwgc3Vic2NyaWJlciB9ID0gYXJnO1xuICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoRXJyb3JBcmc8VD4ge1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+O1xuICBlcnI6IGFueTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoRXJyb3I8VD4oYXJnOiBEaXNwYXRjaEVycm9yQXJnPFQ+KSB7XG4gIGNvbnN0IHsgZXJyLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gIH1cbn1cbiJdfQ==