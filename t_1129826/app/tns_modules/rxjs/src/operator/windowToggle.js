"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var Subscription_1 = require("../Subscription");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
 * emits.
 *
 * <span class="informal">It's like {@link bufferToggle}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowToggle.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows that contain those items
 * emitted by the source Observable between the time when the `openings`
 * Observable emits an item and when the Observable returned by
 * `closingSelector` emits an item.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var result = clicks.windowToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * ).mergeAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowWhen}
 * @see {@link bufferToggle}
 *
 * @param {Observable<O>} openings An observable of notifications to start new
 * windows.
 * @param {function(value: O): Observable} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns an Observable,
 * which, when it emits (either `next` or `complete`), signals that the
 * associated window should complete.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowToggle
 * @owner Observable
 */
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = subscribeToResult_1.subscribeToResult(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject_1.errorObject) {
                return this.error(errorObject_1.errorObject.e);
            }
            else {
                var window_1 = new Subject_1.Subject();
                var subscription = new Subscription_1.Subscription();
                var context = { window: window_1, subscription: subscription };
                this.contexts.push(context);
                var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93VG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93VG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esc0NBQXFDO0FBQ3JDLGdEQUErQztBQUUvQyw2Q0FBNEM7QUFDNUMsbURBQWtEO0FBRWxELHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFDSCxzQkFBd0QsUUFBdUIsRUFDNUMsZUFBa0Q7SUFDbkYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBTyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBSEQsb0NBR0M7QUFFRDtJQUVFLDhCQUFvQixRQUF1QixFQUN2QixlQUFrRDtRQURsRCxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLG9CQUFlLEdBQWYsZUFBZSxDQUFtQztJQUN0RSxDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLFVBQXFDLEVBQUUsTUFBVztRQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFzQixDQUNoRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUNoRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQU9EOzs7O0dBSUc7QUFDSDtJQUEyQywwQ0FBdUI7SUFJaEUsZ0NBQVksV0FBc0MsRUFDOUIsUUFBdUIsRUFDdkIsZUFBa0Q7UUFGdEUsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FFbkI7UUFKbUIsY0FBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixxQkFBZSxHQUFmLGVBQWUsQ0FBbUM7UUFMOUQsY0FBUSxHQUF1QixFQUFFLENBQUM7UUFPeEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcs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QUFDO0lBQ0gsQ0FBQztJQUVELDRDQUFXLEdBQVgsVUFBWSxHQUFRO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELCtDQUFjLEdBQWQsVUFBZSxLQUFtQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFRLEtBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxDQUFDO0lBRU8sNENBQVcsR0FBbkIsVUFBb0IsS0FBYTtRQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFTyxJQUFBLHdCQUFRLENBQVU7UUFDMUIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUEsdUJBQU0sRUFBRSxtQ0FBWSxDQUFhO1FBQ3pDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQTVIRCxDQUEyQyxpQ0FBZSxHQTRIekQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9TdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogQnJhbmNoIG91dCB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIGFzIGEgbmVzdGVkIE9ic2VydmFibGUgc3RhcnRpbmcgZnJvbVxuICogYW4gZW1pc3Npb24gZnJvbSBgb3BlbmluZ3NgIGFuZCBlbmRpbmcgd2hlbiB0aGUgb3V0cHV0IG9mIGBjbG9zaW5nU2VsZWN0b3JgXG4gKiBlbWl0cy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBidWZmZXJUb2dnbGV9LCBidXQgZW1pdHMgYSBuZXN0ZWRcbiAqIE9ic2VydmFibGUgaW5zdGVhZCBvZiBhbiBhcnJheS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy93aW5kb3dUb2dnbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2luZG93cyBvZiBpdGVtcyBpdCBjb2xsZWN0cyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyB3aW5kb3dzIHRoYXQgY29udGFpbiB0aG9zZSBpdGVtc1xuICogZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYmV0d2VlbiB0aGUgdGltZSB3aGVuIHRoZSBgb3BlbmluZ3NgXG4gKiBPYnNlcnZhYmxlIGVtaXRzIGFuIGl0ZW0gYW5kIHdoZW4gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnlcbiAqIGBjbG9zaW5nU2VsZWN0b3JgIGVtaXRzIGFuIGl0ZW0uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RXZlcnkgb3RoZXIgc2Vjb25kLCBlbWl0IHRoZSBjbGljayBldmVudHMgZnJvbSB0aGUgbmV4dCA1MDBtczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgb3BlbmluZ3MgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy53aW5kb3dUb2dnbGUob3BlbmluZ3MsIGkgPT5cbiAqICAgaSAlIDIgPyBSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMCkgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAqICkubWVyZ2VBbGwoKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgd2luZG93fVxuICogQHNlZSB7QGxpbmsgd2luZG93Q291bnR9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICogQHNlZSB7QGxpbmsgd2luZG93V2hlbn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRvZ2dsZX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGU8Tz59IG9wZW5pbmdzIEFuIG9ic2VydmFibGUgb2Ygbm90aWZpY2F0aW9ucyB0byBzdGFydCBuZXdcbiAqIHdpbmRvd3MuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBPKTogT2JzZXJ2YWJsZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICogdGhlIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIGBvcGVuaW5nc2Agb2JzZXJ2YWJsZSBhbmQgcmV0dXJucyBhbiBPYnNlcnZhYmxlLFxuICogd2hpY2gsIHdoZW4gaXQgZW1pdHMgKGVpdGhlciBgbmV4dGAgb3IgYGNvbXBsZXRlYCksIHNpZ25hbHMgdGhhdCB0aGVcbiAqIGFzc29jaWF0ZWQgd2luZG93IHNob3VsZCBjb21wbGV0ZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj59IEFuIG9ic2VydmFibGUgb2Ygd2luZG93cywgd2hpY2ggaW4gdHVyblxuICogYXJlIE9ic2VydmFibGVzLlxuICogQG1ldGhvZCB3aW5kb3dUb2dnbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dUb2dnbGU8VCwgTz4odGhpczogT2JzZXJ2YWJsZTxUPiwgb3BlbmluZ3M6IE9ic2VydmFibGU8Tz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFdpbmRvd1RvZ2dsZU9wZXJhdG9yPFQsIE8+KG9wZW5pbmdzLCBjbG9zaW5nU2VsZWN0b3IpKTtcbn1cblxuY2xhc3MgV2luZG93VG9nZ2xlT3BlcmF0b3I8VCwgTz4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBPYnNlcnZhYmxlPFQ+PiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcGVuaW5nczogT2JzZXJ2YWJsZTxPPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6IChvcGVuVmFsdWU6IE8pID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFdpbmRvd1RvZ2dsZVN1YnNjcmliZXIoXG4gICAgICBzdWJzY3JpYmVyLCB0aGlzLm9wZW5pbmdzLCB0aGlzLmNsb3NpbmdTZWxlY3RvclxuICAgICkpO1xuICB9XG59XG5cbmludGVyZmFjZSBXaW5kb3dDb250ZXh0PFQ+IHtcbiAgd2luZG93OiBTdWJqZWN0PFQ+O1xuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFdpbmRvd1RvZ2dsZVN1YnNjcmliZXI8VCwgTz4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgYW55PiB7XG4gIHByaXZhdGUgY29udGV4dHM6IFdpbmRvd0NvbnRleHQ8VD5bXSA9IFtdO1xuICBwcml2YXRlIG9wZW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxPYnNlcnZhYmxlPFQ+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvcGVuaW5nczogT2JzZXJ2YWJsZTxPPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6IChvcGVuVmFsdWU6IE8pID0+IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZCh0aGlzLm9wZW5TdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBvcGVuaW5ncywgb3BlbmluZ3MpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIGNvbnN0IHsgY29udGV4dHMgfSA9IHRoaXM7XG4gICAgaWYgKGNvbnRleHRzKSB7XG4gICAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnRleHRzW2ldLndpbmRvdy5uZXh0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG5cbiAgICBjb25zdCB7IGNvbnRleHRzIH0gPSB0aGlzO1xuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuXG4gICAgaWYgKGNvbnRleHRzKSB7XG4gICAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICBsZXQgaW5kZXggPSAtMTtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICAgICAgY29udGV4dC53aW5kb3cuZXJyb3IoZXJyKTtcbiAgICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICAgICAgY29udGV4dC53aW5kb3cuY29tcGxldGUoKTtcbiAgICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgY29udGV4dHMgfSA9IHRoaXM7XG4gICAgdGhpcy5jb250ZXh0cyA9IG51bGw7XG4gICAgaWYgKGNvbnRleHRzKSB7XG4gICAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBjb250ZXh0c1tpbmRleF07XG4gICAgICAgIGNvbnRleHQud2luZG93LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGNvbnRleHQuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBhbnksIGlubmVyVmFsdWU6IGFueSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIGFueT4pOiB2b2lkIHtcblxuICAgIGlmIChvdXRlclZhbHVlID09PSB0aGlzLm9wZW5pbmdzKSB7XG5cbiAgICAgIGNvbnN0IHsgY2xvc2luZ1NlbGVjdG9yIH0gPSB0aGlzO1xuICAgICAgY29uc3QgY2xvc2luZ05vdGlmaWVyID0gdHJ5Q2F0Y2goY2xvc2luZ1NlbGVjdG9yKShpbm5lclZhbHVlKTtcblxuICAgICAgaWYgKGNsb3NpbmdOb3RpZmllciA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB3aW5kb3cgPSBuZXcgU3ViamVjdDxUPigpO1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHdpbmRvdywgc3Vic2NyaXB0aW9uIH07XG4gICAgICAgIHRoaXMuY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICAgICAgY29uc3QgaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBjbG9zaW5nTm90aWZpZXIsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChpbm5lclN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlV2luZG93KHRoaXMuY29udGV4dHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgKDxhbnk+IGlubmVyU3Vic2NyaXB0aW9uKS5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uYWRkKGlubmVyU3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh3aW5kb3cpO1xuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2VXaW5kb3codGhpcy5jb250ZXh0cy5pbmRleE9mKG91dGVyVmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlFcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBpZiAoaW5uZXIgIT09IHRoaXMub3BlblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jbG9zZVdpbmRvdyh0aGlzLmNvbnRleHRzLmluZGV4T2YoKDxhbnk+IGlubmVyKS5jb250ZXh0KSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZVdpbmRvdyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29udGV4dHMgfSA9IHRoaXM7XG4gICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICBjb25zdCB7IHdpbmRvdywgc3Vic2NyaXB0aW9uIH0gPSBjb250ZXh0O1xuICAgIGNvbnRleHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgd2luZG93LmNvbXBsZXRlKCk7XG4gICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==