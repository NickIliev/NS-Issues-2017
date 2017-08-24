"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
/**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.
 *
 * <span class="informal">Emits only the i-th value, then completes.</span>
 *
 * <img src="./img/elementAt.png" width="100%">
 *
 * `elementAt` returns an Observable that emits the item at the specified
 * `index` in the source Observable, or a default value if that `index` is out
 * of range and the `default` argument is provided. If the `default` argument is
 * not given and the `index` is out of range, the output Observable will emit an
 * `ArgumentOutOfRangeError` error.
 *
 * @example <caption>Emit only the third click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.elementAt(2);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // click 1 = nothing
 * // click 2 = nothing
 * // click 3 = MouseEvent object logged to console
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link skip}
 * @see {@link single}
 * @see {@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
 * Observable has completed before emitting the i-th `next` notification.
 *
 * @param {number} index Is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {T} [defaultValue] The default value returned for missing indices.
 * @return {Observable} An Observable that emits a single item, if it is found.
 * Otherwise, will emit the default value if given. If not, then emits an error.
 * @method elementAt
 * @owner Observable
 */
function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}
exports.elementAt = elementAt;
var ElementAtOperator = (function () {
    function ElementAtOperator(index, defaultValue) {
        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    ElementAtOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
    };
    return ElementAtOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ElementAtSubscriber = (function (_super) {
    __extends(ElementAtSubscriber, _super);
    function ElementAtSubscriber(destination, index, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.index = index;
        _this.defaultValue = defaultValue;
        return _this;
    }
    ElementAtSubscriber.prototype._next = function (x) {
        if (this.index-- === 0) {
            this.destination.next(x);
            this.destination.complete();
        }
    };
    ElementAtSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index >= 0) {
            if (typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
            }
            else {
                destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
            }
        }
        destination.complete();
    };
    return ElementAtSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxlbWVudEF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBQzNDLDJFQUEwRTtBQUkxRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxtQkFBa0QsS0FBYSxFQUFFLFlBQWdCO0lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUZELDhCQUVDO0FBRUQ7SUFFRSwyQkFBb0IsS0FBYSxFQUFVLFlBQWdCO1FBQXZDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBSTtRQUN6RCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sSUFBSSxpREFBdUIsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFxQyx1Q0FBYTtJQUVoRCw2QkFBWSxXQUEwQixFQUFVLEtBQWEsRUFBVSxZQUFnQjtRQUF2RixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUYrQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVUsa0JBQVksR0FBWixZQUFZLENBQUk7O0lBRXZGLENBQUM7SUFFUyxtQ0FBSyxHQUFmLFVBQWdCLENBQUk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVTLHVDQUFTLEdBQW5CO1FBQ0UsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksaURBQXVCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0gsQ0FBQztRQUNELFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBeEJELENBQXFDLHVCQUFVLEdBd0I5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgfSBmcm9tICcuLi91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBzaW5nbGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgIGluIGEgc2VxdWVuY2Ugb2YgZW1pc3Npb25zXG4gKiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RW1pdHMgb25seSB0aGUgaS10aCB2YWx1ZSwgdGhlbiBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZWxlbWVudEF0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBlbGVtZW50QXRgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWRcbiAqIGBpbmRleGAgaW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBvciBhIGRlZmF1bHQgdmFsdWUgaWYgdGhhdCBgaW5kZXhgIGlzIG91dFxuICogb2YgcmFuZ2UgYW5kIHRoZSBgZGVmYXVsdGAgYXJndW1lbnQgaXMgcHJvdmlkZWQuIElmIHRoZSBgZGVmYXVsdGAgYXJndW1lbnQgaXNcbiAqIG5vdCBnaXZlbiBhbmQgdGhlIGBpbmRleGAgaXMgb3V0IG9mIHJhbmdlLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgd2lsbCBlbWl0IGFuXG4gKiBgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JgIGVycm9yLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSB0aGUgdGhpcmQgY2xpY2sgZXZlbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5lbGVtZW50QXQoMik7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW46XG4gKiAvLyBjbGljayAxID0gbm90aGluZ1xuICogLy8gY2xpY2sgMiA9IG5vdGhpbmdcbiAqIC8vIGNsaWNrIDMgPSBNb3VzZUV2ZW50IG9iamVjdCBsb2dnZWQgdG8gY29uc29sZVxuICpcbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgbGFzdH1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKiBAc2VlIHtAbGluayBzaW5nbGV9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEB0aHJvd3Mge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBXaGVuIHVzaW5nIGBlbGVtZW50QXQoaSlgLCBpdCBkZWxpdmVycyBhblxuICogQXJndW1lbnRPdXRPclJhbmdlRXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYCBjYWxsYmFjayBpZiBgaSA8IDBgIG9yIHRoZVxuICogT2JzZXJ2YWJsZSBoYXMgY29tcGxldGVkIGJlZm9yZSBlbWl0dGluZyB0aGUgaS10aCBgbmV4dGAgbm90aWZpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlIGVtaXNzaW9uIHRoYXQgaGFzXG4gKiBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXIgYDBgLlxuICogQHBhcmFtIHtUfSBbZGVmYXVsdFZhbHVlXSBUaGUgZGVmYXVsdCB2YWx1ZSByZXR1cm5lZCBmb3IgbWlzc2luZyBpbmRpY2VzLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2luZ2xlIGl0ZW0sIGlmIGl0IGlzIGZvdW5kLlxuICogT3RoZXJ3aXNlLCB3aWxsIGVtaXQgdGhlIGRlZmF1bHQgdmFsdWUgaWYgZ2l2ZW4uIElmIG5vdCwgdGhlbiBlbWl0cyBhbiBlcnJvci5cbiAqIEBtZXRob2QgZWxlbWVudEF0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudEF0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGluZGV4OiBudW1iZXIsIGRlZmF1bHRWYWx1ZT86IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRWxlbWVudEF0T3BlcmF0b3IoaW5kZXgsIGRlZmF1bHRWYWx1ZSkpO1xufVxuXG5jbGFzcyBFbGVtZW50QXRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluZGV4OiBudW1iZXIsIHByaXZhdGUgZGVmYXVsdFZhbHVlPzogVCkge1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IEVsZW1lbnRBdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5pbmRleCwgdGhpcy5kZWZhdWx0VmFsdWUpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRWxlbWVudEF0U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIGluZGV4OiBudW1iZXIsIHByaXZhdGUgZGVmYXVsdFZhbHVlPzogVCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh4OiBUKSB7XG4gICAgaWYgKHRoaXMuaW5kZXgtLSA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHgpO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGlmICh0aGlzLmluZGV4ID49IDApIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5kZWZhdWx0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLm5leHQodGhpcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVzdGluYXRpb24uZXJyb3IobmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxufVxuIl19