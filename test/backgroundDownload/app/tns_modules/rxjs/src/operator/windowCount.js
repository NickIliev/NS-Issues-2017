"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var Subject_1 = require("../Subject");
/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferCount}
 *
 * @param {number} windowSize The maximum number of values emitted by each
 * window.
 * @param {number} [startWindowEvery] Interval at which to start a new window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * @return {Observable<Observable<T>>} An Observable of windows, which in turn
 * are Observable of values.
 * @method windowCount
 * @owner Observable
 */
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject_1.Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Q291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aW5kb3dDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUUzQyxzQ0FBcUM7QUFFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0NHO0FBQ0gscUJBQW9ELFVBQWtCLEVBQ3ZDLGdCQUE0QjtJQUE1QixpQ0FBQSxFQUFBLG9CQUE0QjtJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixDQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUhELGtDQUdDO0FBRUQ7SUFFRSw2QkFBb0IsVUFBa0IsRUFDbEIsZ0JBQXdCO1FBRHhCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO0lBQzVDLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssVUFBcUMsRUFBRSxNQUFXO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUkscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQUVEOzs7O0dBSUc7QUFDSDtJQUF1Qyx5Q0FBYTtJQUlsRCwrQkFBc0IsV0FBc0MsRUFDeEMsVUFBa0IsRUFDbEIsZ0JBQXdCO1FBRjVDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBTHFCLGlCQUFXLEdBQVgsV0FBVyxDQUEyQjtRQUN4QyxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFMcEMsYUFBTyxHQUFpQixDQUFFLElBQUksaUJBQU8sRUFBSyxDQUFFLENBQUM7UUFDN0MsV0FB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ZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuXG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHdpdGggZWFjaFxuICogbmVzdGVkIE9ic2VydmFibGUgZW1pdHRpbmcgYXQgbW9zdCBgd2luZG93U2l6ZWAgdmFsdWVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGJ1ZmZlckNvdW50fSwgYnV0IGVtaXRzIGEgbmVzdGVkXG4gKiBPYnNlcnZhYmxlIGluc3RlYWQgb2YgYW4gYXJyYXkuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvd2luZG93Q291bnQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2luZG93cyBvZiBpdGVtcyBpdCBjb2xsZWN0cyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyB3aW5kb3dzIGV2ZXJ5IGBzdGFydFdpbmRvd0V2ZXJ5YFxuICogaXRlbXMsIGVhY2ggY29udGFpbmluZyBubyBtb3JlIHRoYW4gYHdpbmRvd1NpemVgIGl0ZW1zLiBXaGVuIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgY29tcGxldGVzIG9yIGVuY291bnRlcnMgYW4gZXJyb3IsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0c1xuICogdGhlIGN1cnJlbnQgd2luZG93IGFuZCBwcm9wYWdhdGVzIHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBJZiBgc3RhcnRXaW5kb3dFdmVyeWAgaXMgbm90IHByb3ZpZGVkLCB0aGVuIG5ldyB3aW5kb3dzIGFyZVxuICogc3RhcnRlZCBpbW1lZGlhdGVseSBhdCB0aGUgc3RhcnQgb2YgdGhlIHNvdXJjZSBhbmQgd2hlbiBlYWNoIHdpbmRvdyBjb21wbGV0ZXNcbiAqIHdpdGggc2l6ZSBgd2luZG93U2l6ZWAuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+SWdub3JlIGV2ZXJ5IDNyZCBjbGljayBldmVudCwgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3Qgb25lPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Mud2luZG93Q291bnQoMylcbiAqICAgLm1hcCh3aW4gPT4gd2luLnNraXAoMSkpIC8vIHNraXAgZmlyc3Qgb2YgZXZlcnkgMyBjbGlja3NcbiAqICAgLm1lcmdlQWxsKCk7IC8vIGZsYXR0ZW4gdGhlIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXNcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+SWdub3JlIGV2ZXJ5IDNyZCBjbGljayBldmVudCwgc3RhcnRpbmcgZnJvbSB0aGUgdGhpcmQgb25lPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Mud2luZG93Q291bnQoMiwgMylcbiAqICAgLm1lcmdlQWxsKCk7IC8vIGZsYXR0ZW4gdGhlIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXNcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgd2luZG93fVxuICogQHNlZSB7QGxpbmsgd2luZG93VGltZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1doZW59XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gd2luZG93U2l6ZSBUaGUgbWF4aW11bSBudW1iZXIgb2YgdmFsdWVzIGVtaXR0ZWQgYnkgZWFjaFxuICogd2luZG93LlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydFdpbmRvd0V2ZXJ5XSBJbnRlcnZhbCBhdCB3aGljaCB0byBzdGFydCBhIG5ldyB3aW5kb3cuXG4gKiBGb3IgZXhhbXBsZSBpZiBgc3RhcnRXaW5kb3dFdmVyeWAgaXMgYDJgLCB0aGVuIGEgbmV3IHdpbmRvdyB3aWxsIGJlIHN0YXJ0ZWRcbiAqIG9uIGV2ZXJ5IG90aGVyIHZhbHVlIGZyb20gdGhlIHNvdXJjZS4gQSBuZXcgd2luZG93IGlzIHN0YXJ0ZWQgYXQgdGhlXG4gKiBiZWdpbm5pbmcgb2YgdGhlIHNvdXJjZSBieSBkZWZhdWx0LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+Pn0gQW4gT2JzZXJ2YWJsZSBvZiB3aW5kb3dzLCB3aGljaCBpbiB0dXJuXG4gKiBhcmUgT2JzZXJ2YWJsZSBvZiB2YWx1ZXMuXG4gKiBAbWV0aG9kIHdpbmRvd0NvdW50XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2luZG93Q291bnQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgd2luZG93U2l6ZTogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2luZG93RXZlcnk6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgV2luZG93Q291bnRPcGVyYXRvcjxUPih3aW5kb3dTaXplLCBzdGFydFdpbmRvd0V2ZXJ5KSk7XG59XG5cbmNsYXNzIFdpbmRvd0NvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBPYnNlcnZhYmxlPFQ+PiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3dTaXplOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc3RhcnRXaW5kb3dFdmVyeTogbnVtYmVyKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgV2luZG93Q291bnRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMud2luZG93U2l6ZSwgdGhpcy5zdGFydFdpbmRvd0V2ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFdpbmRvd0NvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHdpbmRvd3M6IFN1YmplY3Q8VD5bXSA9IFsgbmV3IFN1YmplY3Q8VD4oKSBdO1xuICBwcml2YXRlIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxPYnNlcnZhYmxlPFQ+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB3aW5kb3dTaXplOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc3RhcnRXaW5kb3dFdmVyeTogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIGRlc3RpbmF0aW9uLm5leHQodGhpcy53aW5kb3dzWzBdKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIGNvbnN0IHN0YXJ0V2luZG93RXZlcnkgPSAodGhpcy5zdGFydFdpbmRvd0V2ZXJ5ID4gMCkgPyB0aGlzLnN0YXJ0V2luZG93RXZlcnkgOiB0aGlzLndpbmRvd1NpemU7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSB0aGlzLndpbmRvd1NpemU7XG4gICAgY29uc3Qgd2luZG93cyA9IHRoaXMud2luZG93cztcbiAgICBjb25zdCBsZW4gPSB3aW5kb3dzLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuICYmICF0aGlzLmNsb3NlZDsgaSsrKSB7XG4gICAgICB3aW5kb3dzW2ldLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCBjID0gdGhpcy5jb3VudCAtIHdpbmRvd1NpemUgKyAxO1xuICAgIGlmIChjID49IDAgJiYgYyAlIHN0YXJ0V2luZG93RXZlcnkgPT09IDAgJiYgIXRoaXMuY2xvc2VkKSB7XG4gICAgICB3aW5kb3dzLnNoaWZ0KCkuY29tcGxldGUoKTtcbiAgICB9XG4gICAgaWYgKCsrdGhpcy5jb3VudCAlIHN0YXJ0V2luZG93RXZlcnkgPT09IDAgJiYgIXRoaXMuY2xvc2VkKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBuZXcgU3ViamVjdDxUPigpO1xuICAgICAgd2luZG93cy5wdXNoKHdpbmRvdyk7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KHdpbmRvdyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSkge1xuICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLndpbmRvd3M7XG4gICAgaWYgKHdpbmRvd3MpIHtcbiAgICAgIHdoaWxlICh3aW5kb3dzLmxlbmd0aCA+IDAgJiYgIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgIHdpbmRvd3Muc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLndpbmRvd3M7XG4gICAgaWYgKHdpbmRvd3MpIHtcbiAgICAgIHdoaWxlICh3aW5kb3dzLmxlbmd0aCA+IDAgJiYgIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMud2luZG93cyA9IG51bGw7XG4gIH1cbn1cbiJdfQ==