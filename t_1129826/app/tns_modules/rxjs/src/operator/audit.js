"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link auditTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/audit.png" width="100%">
 *
 * `audit` is similar to `throttle`, but emits the last value from the silenced
 * time window, instead of the first value. `audit` emits the most recent value
 * from the source Observable on the output Observable as soon as its internal
 * timer becomes disabled, and ignores source values while the timer is enabled.
 * Initially, the timer is disabled. As soon as the first source value arrives,
 * the timer is enabled by calling the `durationSelector` function with the
 * source value, which returns the "duration" Observable. When the duration
 * Observable emits a value or completes, the timer is disabled, then the most
 * recent source value is emitted on the output Observable, and this process
 * repeats for the next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttle}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration, returned as an Observable or a Promise.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method audit
 * @owner Observable
 */
function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}
exports.audit = audit;
var AuditOperator = (function () {
    function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditSubscriber = (function (_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
            if (duration === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                var innerSubscription = subscribeToResult_1.subscribeToResult(this, duration);
                if (innerSubscription.closed) {
                    this.clearThrottle();
                }
                else {
                    this.add(this.throttled = innerSubscription);
                }
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsc0RBQXFEO0FBQ3JELCtEQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsZUFBOEMsZ0JBQTBEO0lBQ3RHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsc0JBRUM7QUFFRDtJQUNFLHVCQUFvQixnQkFBMEQ7UUFBMUQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQztJQUM5RSxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBTyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFvQyxtQ0FBcUI7SUFNdkQseUJBQVksV0FBMEIsRUFDbEIsZ0JBQTBEO1FBRDlFLFlBRUUsa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBRm1CLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMEM7UUFKdEUsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUFNbEMsQ0FBQztJQUVTLCtCQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQU0sUUFBUSxHQUFHLG1CQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFNLGlCQUFpQixHQUFHLHFDQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUNRLElBQUEsU0FBcUMsRUFBbkMsZ0JBQUssRUFBRSxzQkFBUSxFQUFFLHdCQUFTLENBQVU7UUFDNUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFBRSxVQUFrQixFQUFFLFVBQWtCO1FBQzdFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbERELENBQW9DLGlDQUFlLEdBa0RsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIElnbm9yZXMgc291cmNlIHZhbHVlcyBmb3IgYSBkdXJhdGlvbiBkZXRlcm1pbmVkIGJ5IGFub3RoZXIgT2JzZXJ2YWJsZSwgdGhlblxuICogZW1pdHMgdGhlIG1vc3QgcmVjZW50IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpc1xuICogcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBhdWRpdFRpbWV9LCBidXQgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHNlY29uZCBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2F1ZGl0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBhdWRpdGAgaXMgc2ltaWxhciB0byBgdGhyb3R0bGVgLCBidXQgZW1pdHMgdGhlIGxhc3QgdmFsdWUgZnJvbSB0aGUgc2lsZW5jZWRcbiAqIHRpbWUgd2luZG93LCBpbnN0ZWFkIG9mIHRoZSBmaXJzdCB2YWx1ZS4gYGF1ZGl0YCBlbWl0cyB0aGUgbW9zdCByZWNlbnQgdmFsdWVcbiAqIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBhcyBzb29uIGFzIGl0cyBpbnRlcm5hbFxuICogdGltZXIgYmVjb21lcyBkaXNhYmxlZCwgYW5kIGlnbm9yZXMgc291cmNlIHZhbHVlcyB3aGlsZSB0aGUgdGltZXIgaXMgZW5hYmxlZC5cbiAqIEluaXRpYWxseSwgdGhlIHRpbWVyIGlzIGRpc2FibGVkLiBBcyBzb29uIGFzIHRoZSBmaXJzdCBzb3VyY2UgdmFsdWUgYXJyaXZlcyxcbiAqIHRoZSB0aW1lciBpcyBlbmFibGVkIGJ5IGNhbGxpbmcgdGhlIGBkdXJhdGlvblNlbGVjdG9yYCBmdW5jdGlvbiB3aXRoIHRoZVxuICogc291cmNlIHZhbHVlLCB3aGljaCByZXR1cm5zIHRoZSBcImR1cmF0aW9uXCIgT2JzZXJ2YWJsZS4gV2hlbiB0aGUgZHVyYXRpb25cbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSBvciBjb21wbGV0ZXMsIHRoZSB0aW1lciBpcyBkaXNhYmxlZCwgdGhlbiB0aGUgbW9zdFxuICogcmVjZW50IHNvdXJjZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSwgYW5kIHRoaXMgcHJvY2Vzc1xuICogcmVwZWF0cyBmb3IgdGhlIG5leHQgc291cmNlIHZhbHVlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgY2xpY2tzIGF0IGEgcmF0ZSBvZiBhdCBtb3N0IG9uZSBjbGljayBwZXIgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuYXVkaXQoZXYgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgZGVsYXlXaGVufVxuICogQHNlZSB7QGxpbmsgc2FtcGxlfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGV9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gZHVyYXRpb25TZWxlY3RvciBBIGZ1bmN0aW9uXG4gKiB0aGF0IHJlY2VpdmVzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIGZvciBjb21wdXRpbmcgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24sIHJldHVybmVkIGFzIGFuIE9ic2VydmFibGUgb3IgYSBQcm9taXNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHBlcmZvcm1zIHJhdGUtbGltaXRpbmcgb2ZcbiAqIGVtaXNzaW9ucyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgYXVkaXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdWRpdDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEF1ZGl0T3BlcmF0b3IoZHVyYXRpb25TZWxlY3RvcikpO1xufVxuXG5jbGFzcyBBdWRpdE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQXVkaXRTdWJzY3JpYmVyPFQsIFQ+KHN1YnNjcmliZXIsIHRoaXMuZHVyYXRpb25TZWxlY3RvcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBBdWRpdFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuXG4gIHByaXZhdGUgdmFsdWU6IFQ7XG4gIHByaXZhdGUgaGFzVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB0aHJvdHRsZWQ6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICAgIGlmICghdGhpcy50aHJvdHRsZWQpIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gdHJ5Q2F0Y2godGhpcy5kdXJhdGlvblNlbGVjdG9yKSh2YWx1ZSk7XG4gICAgICBpZiAoZHVyYXRpb24gPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGR1cmF0aW9uKTtcbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgIHRoaXMuY2xlYXJUaHJvdHRsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWRkKHRoaXMudGhyb3R0bGVkID0gaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaHJvdHRsZSgpIHtcbiAgICBjb25zdCB7IHZhbHVlLCBoYXNWYWx1ZSwgdGhyb3R0bGVkIH0gPSB0aGlzO1xuICAgIGlmICh0aHJvdHRsZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKHRocm90dGxlZCk7XG4gICAgICB0aGlzLnRocm90dGxlZCA9IG51bGw7XG4gICAgICB0aHJvdHRsZWQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJUaHJvdHRsZSgpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclRocm90dGxlKCk7XG4gIH1cbn1cbiJdfQ==