"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscription_1 = require("../Subscription");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferWhen}
 * @see {@link windowToggle}
 *
 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
 * buffers.
 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferToggle
 * @owner Observable
 */
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
exports.bufferToggle = bufferToggle;
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(subscribeToResult_1.subscribeToResult(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_1.Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyVG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsZ0RBQStDO0FBRS9DLCtEQUE4RDtBQUM5RCxzREFBcUQ7QUFHckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFDSCxzQkFBd0QsUUFBa0MsRUFDdkQsZUFBeUQ7SUFDMUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBTyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBSEQsb0NBR0M7QUFFRDtJQUVFLDhCQUFvQixRQUFrQyxFQUNsQyxlQUF5RDtRQUR6RCxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBMEM7SUFDN0UsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxVQUEyQixFQUFFLE1BQVc7UUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQU9EOzs7O0dBSUc7QUFDSDtJQUEyQywwQ0FBcUI7SUFHOUQsZ0NBQVksV0FBNEIsRUFDcEIsUUFBa0MsRUFDbEMsZUFBZ0U7UUFGcEYsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FFbkI7UUFKbUIsY0FBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMscUJBQWUsR0FBZixlQUFlLENBQWlEO1FBSjVFLGNBQVEsR0FBNEIsRUFBRSxDQUFDO1FBTTdDLEtBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQUMsS0FBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0lBQzlDLENBQUM7SUFFUyxzQ0FB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ImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5cbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIHN0YXJ0aW5nIGZyb20gYW4gZW1pc3Npb24gZnJvbVxuICogYG9wZW5pbmdzYCBhbmQgZW5kaW5nIHdoZW4gdGhlIG91dHB1dCBvZiBgY2xvc2luZ1NlbGVjdG9yYCBlbWl0cy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29sbGVjdHMgdmFsdWVzIGZyb20gdGhlIHBhc3QgYXMgYW4gYXJyYXkuIFN0YXJ0c1xuICogY29sbGVjdGluZyBvbmx5IHdoZW4gYG9wZW5pbmdgIGVtaXRzLCBhbmQgY2FsbHMgdGhlIGBjbG9zaW5nU2VsZWN0b3JgXG4gKiBmdW5jdGlvbiB0byBnZXQgYW4gT2JzZXJ2YWJsZSB0aGF0IHRlbGxzIHdoZW4gdG8gY2xvc2UgdGhlIGJ1ZmZlci48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJUb2dnbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQnVmZmVycyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIGJ5IG9wZW5pbmcgdGhlIGJ1ZmZlciB2aWEgc2lnbmFscyBmcm9tIGFuXG4gKiBPYnNlcnZhYmxlIHByb3ZpZGVkIHRvIGBvcGVuaW5nc2AsIGFuZCBjbG9zaW5nIGFuZCBzZW5kaW5nIHRoZSBidWZmZXJzIHdoZW5cbiAqIGEgU3Vic2NyaWJhYmxlIG9yIFByb21pc2UgcmV0dXJuZWQgYnkgdGhlIGBjbG9zaW5nU2VsZWN0b3JgIGZ1bmN0aW9uIGVtaXRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IG90aGVyIHNlY29uZCwgZW1pdCB0aGUgY2xpY2sgZXZlbnRzIGZyb20gdGhlIG5leHQgNTAwbXM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIG9wZW5pbmdzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBidWZmZXJlZCA9IGNsaWNrcy5idWZmZXJUb2dnbGUob3BlbmluZ3MsIGkgPT5cbiAqICAgaSAlIDIgPyBSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMCkgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAqICk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUaW1lfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyV2hlbn1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RvZ2dsZX1cbiAqXG4gKiBAcGFyYW0ge1N1YnNjcmliYWJsZU9yUHJvbWlzZTxPPn0gb3BlbmluZ3MgQSBTdWJzY3JpYmFibGUgb3IgUHJvbWlzZSBvZiBub3RpZmljYXRpb25zIHRvIHN0YXJ0IG5ld1xuICogYnVmZmVycy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IE8pOiBTdWJzY3JpYmFibGVPclByb21pc2V9IGNsb3NpbmdTZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXNcbiAqIHRoZSB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBgb3BlbmluZ3NgIG9ic2VydmFibGUgYW5kIHJldHVybnMgYSBTdWJzY3JpYmFibGUgb3IgUHJvbWlzZSxcbiAqIHdoaWNoLCB3aGVuIGl0IGVtaXRzLCBzaWduYWxzIHRoYXQgdGhlIGFzc29jaWF0ZWQgYnVmZmVyIHNob3VsZCBiZSBlbWl0dGVkXG4gKiBhbmQgY2xlYXJlZC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gb2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJUb2dnbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJUb2dnbGU8VCwgTz4odGhpczogT2JzZXJ2YWJsZTxUPiwgb3BlbmluZ3M6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxPPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2luZ1NlbGVjdG9yOiAodmFsdWU6IE8pID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgQnVmZmVyVG9nZ2xlT3BlcmF0b3I8VCwgTz4ob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBCdWZmZXJUb2dnbGVPcGVyYXRvcjxULCBPPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFRbXT4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3BlbmluZ3M6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxPPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICh2YWx1ZTogTykgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUW10+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IEJ1ZmZlclRvZ2dsZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5vcGVuaW5ncywgdGhpcy5jbG9zaW5nU2VsZWN0b3IpKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgQnVmZmVyQ29udGV4dDxUPiB7XG4gIGJ1ZmZlcjogVFtdO1xuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEJ1ZmZlclRvZ2dsZVN1YnNjcmliZXI8VCwgTz4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgTz4ge1xuICBwcml2YXRlIGNvbnRleHRzOiBBcnJheTxCdWZmZXJDb250ZXh0PFQ+PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFRbXT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgb3BlbmluZ3M6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxPPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICh2YWx1ZTogTykgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT4gfCB2b2lkKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9wZW5pbmdzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG4gICAgY29uc3QgbGVuID0gY29udGV4dHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnRleHRzW2ldLmJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuICAgIHdoaWxlIChjb250ZXh0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHMuc2hpZnQoKTtcbiAgICAgIGNvbnRleHQuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBjb250ZXh0LmJ1ZmZlciA9IG51bGw7XG4gICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuICAgIHN1cGVyLl9lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG4gICAgd2hpbGUgKGNvbnRleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjb250ZXh0cy5zaGlmdCgpO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGNvbnRleHQuYnVmZmVyKTtcbiAgICAgIGNvbnRleHQuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBjb250ZXh0LmJ1ZmZlciA9IG51bGw7XG4gICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuICAgIHN1cGVyLl9jb21wbGV0ZSgpO1xuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBhbnksIGlubmVyVmFsdWU6IE8sXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBPPik6IHZvaWQge1xuICAgIG91dGVyVmFsdWUgPyB0aGlzLmNsb3NlQnVmZmVyKG91dGVyVmFsdWUpIDogdGhpcy5vcGVuQnVmZmVyKGlubmVyVmFsdWUpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBPPik6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VCdWZmZXIoKDxhbnk+IGlubmVyU3ViKS5jb250ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgb3BlbkJ1ZmZlcih2YWx1ZTogTyk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbG9zaW5nU2VsZWN0b3IgPSB0aGlzLmNsb3NpbmdTZWxlY3RvcjtcbiAgICAgIGNvbnN0IGNsb3NpbmdOb3RpZmllciA9IGNsb3NpbmdTZWxlY3Rvci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgIGlmIChjbG9zaW5nTm90aWZpZXIpIHtcbiAgICAgICAgdGhpcy50cnlTdWJzY3JpYmUoY2xvc2luZ05vdGlmaWVyKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUJ1ZmZlcihjb250ZXh0OiBCdWZmZXJDb250ZXh0PFQ+KTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuXG4gICAgaWYgKGNvbnRleHRzICYmIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHsgYnVmZmVyLCBzdWJzY3JpcHRpb24gfSA9IGNvbnRleHQ7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIGNvbnRleHRzLnNwbGljZShjb250ZXh0cy5pbmRleE9mKGNvbnRleHQpLCAxKTtcbiAgICAgIHRoaXMucmVtb3ZlKHN1YnNjcmlwdGlvbik7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyeVN1YnNjcmliZShjbG9zaW5nTm90aWZpZXI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcblxuICAgIGNvbnN0IGJ1ZmZlcjogQXJyYXk8VD4gPSBbXTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgY29uc3QgY29udGV4dCA9IHsgYnVmZmVyLCBzdWJzY3JpcHRpb24gfTtcbiAgICBjb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuXG4gICAgY29uc3QgaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBjbG9zaW5nTm90aWZpZXIsIDxhbnk+Y29udGV4dCk7XG5cbiAgICBpZiAoIWlubmVyU3Vic2NyaXB0aW9uIHx8IGlubmVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgdGhpcy5jbG9zZUJ1ZmZlcihjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+IGlubmVyU3Vic2NyaXB0aW9uKS5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgdGhpcy5hZGQoaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZChpbm5lclN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG59XG4iXX0=