"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * @example <caption>Emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>On every click, emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link pairwise}
 * @see {@link windowCount}
 *
 * @param {number} bufferSize The maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] Interval at which to start a new buffer.
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @return {Observable<T[]>} An Observable of arrays of buffered values.
 * @method bufferCount
 * @owner Observable
 */
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = BufferCountSubscriber;
        }
        else {
            this.subscriberClass = BufferSkipCountSubscriber;
        }
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber_1.Subscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferSkipCountSubscriber = (function (_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this, buffers = _a.buffers, destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWZmZXJDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILHFCQUFvRCxVQUFrQixFQUFFLGdCQUErQjtJQUEvQixpQ0FBQSxFQUFBLHVCQUErQjtJQUNyRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixDQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUZELGtDQUVDO0FBRUQ7SUFHRSw2QkFBb0IsVUFBa0IsRUFBVSxnQkFBd0I7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN0RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztRQUMvQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLHlCQUF5QixDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUVEOzs7O0dBSUc7QUFDSDtJQUF1Qyx5Q0FBYTtJQUdsRCwrQkFBWSxXQUE0QixFQUFVLFVBQWtCO1FBQXBFLFlBQ0Usa0JBQU0sV0FB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QkFBVSxHQXNDcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEJ1ZmZlcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyB1bnRpbCB0aGUgc2l6ZSBoaXRzIHRoZSBtYXhpbXVtXG4gKiBgYnVmZmVyU2l6ZWAgZ2l2ZW4uXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbGxlY3RzIHZhbHVlcyBmcm9tIHRoZSBwYXN0IGFzIGFuIGFycmF5LCBhbmQgZW1pdHNcbiAqIHRoYXQgYXJyYXkgb25seSB3aGVuIGl0cyBzaXplIHJlYWNoZXMgYGJ1ZmZlclNpemVgLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2J1ZmZlckNvdW50LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEJ1ZmZlcnMgYSBudW1iZXIgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IGBidWZmZXJTaXplYCB0aGVuXG4gKiBlbWl0cyB0aGUgYnVmZmVyIGFuZCBjbGVhcnMgaXQsIGFuZCBzdGFydHMgYSBuZXcgYnVmZmVyIGVhY2hcbiAqIGBzdGFydEJ1ZmZlckV2ZXJ5YCB2YWx1ZXMuIElmIGBzdGFydEJ1ZmZlckV2ZXJ5YCBpcyBub3QgcHJvdmlkZWQgb3IgaXNcbiAqIGBudWxsYCwgdGhlbiBuZXcgYnVmZmVycyBhcmUgc3RhcnRlZCBpbW1lZGlhdGVseSBhdCB0aGUgc3RhcnQgb2YgdGhlIHNvdXJjZVxuICogYW5kIHdoZW4gZWFjaCBidWZmZXIgY2xvc2VzIGFuZCBpcyBlbWl0dGVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgdGhlIGxhc3QgdHdvIGNsaWNrIGV2ZW50cyBhcyBhbiBhcnJheTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyQ291bnQoMik7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+T24gZXZlcnkgY2xpY2ssIGVtaXQgdGhlIGxhc3QgdHdvIGNsaWNrIGV2ZW50cyBhcyBhbiBhcnJheTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyQ291bnQoMiwgMSk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyVGltZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcldoZW59XG4gKiBAc2VlIHtAbGluayBwYWlyd2lzZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd0NvdW50fVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBidWZmZXJTaXplIFRoZSBtYXhpbXVtIHNpemUgb2YgdGhlIGJ1ZmZlciBlbWl0dGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydEJ1ZmZlckV2ZXJ5XSBJbnRlcnZhbCBhdCB3aGljaCB0byBzdGFydCBhIG5ldyBidWZmZXIuXG4gKiBGb3IgZXhhbXBsZSBpZiBgc3RhcnRCdWZmZXJFdmVyeWAgaXMgYDJgLCB0aGVuIGEgbmV3IGJ1ZmZlciB3aWxsIGJlIHN0YXJ0ZWRcbiAqIG9uIGV2ZXJ5IG90aGVyIHZhbHVlIGZyb20gdGhlIHNvdXJjZS4gQSBuZXcgYnVmZmVyIGlzIHN0YXJ0ZWQgYXQgdGhlXG4gKiBiZWdpbm5pbmcgb2YgdGhlIHNvdXJjZSBieSBkZWZhdWx0LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fSBBbiBPYnNlcnZhYmxlIG9mIGFycmF5cyBvZiBidWZmZXJlZCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGJ1ZmZlckNvdW50XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyQ291bnQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgYnVmZmVyU2l6ZTogbnVtYmVyLCBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIgPSBudWxsKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgQnVmZmVyQ291bnRPcGVyYXRvcjxUPihidWZmZXJTaXplLCBzdGFydEJ1ZmZlckV2ZXJ5KSk7XG59XG5cbmNsYXNzIEJ1ZmZlckNvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUW10+IHtcbiAgcHJpdmF0ZSBzdWJzY3JpYmVyQ2xhc3M6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlciwgcHJpdmF0ZSBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIpIHtcbiAgICBpZiAoIXN0YXJ0QnVmZmVyRXZlcnkgfHwgYnVmZmVyU2l6ZSA9PT0gc3RhcnRCdWZmZXJFdmVyeSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyQ2xhc3MgPSBCdWZmZXJDb3VudFN1YnNjcmliZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlckNsYXNzID0gQnVmZmVyU2tpcENvdW50U3Vic2NyaWJlcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VFtdPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgdGhpcy5zdWJzY3JpYmVyQ2xhc3Moc3Vic2NyaWJlciwgdGhpcy5idWZmZXJTaXplLCB0aGlzLnN0YXJ0QnVmZmVyRXZlcnkpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyQ291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgYnVmZmVyOiBUW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuXG4gICAgYnVmZmVyLnB1c2godmFsdWUpO1xuXG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPT0gdGhpcy5idWZmZXJTaXplKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChidWZmZXIpO1xuICAgIH1cbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyU2tpcENvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGJ1ZmZlcnM6IEFycmF5PFRbXT4gPSBbXTtcbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlciwgcHJpdmF0ZSBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCB7IGJ1ZmZlclNpemUsIHN0YXJ0QnVmZmVyRXZlcnksIGJ1ZmZlcnMsIGNvdW50IH0gPSB0aGlzO1xuXG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGlmIChjb3VudCAlIHN0YXJ0QnVmZmVyRXZlcnkgPT09IDApIHtcbiAgICAgIGJ1ZmZlcnMucHVzaChbXSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IGJ1ZmZlcnMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID09PSBidWZmZXJTaXplKSB7XG4gICAgICAgIGJ1ZmZlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgYnVmZmVycywgZGVzdGluYXRpb24gfSA9IHRoaXM7XG5cbiAgICB3aGlsZSAoYnVmZmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVycy5zaGlmdCgpO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxufVxuIl19