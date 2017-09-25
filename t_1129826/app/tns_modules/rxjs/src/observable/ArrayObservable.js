"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var ScalarObservable_1 = require("./ScalarObservable");
var EmptyObservable_1 = require("./EmptyObservable");
var isScheduler_1 = require("../util/isScheduler");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        var _this = _super.call(this) || this;
        _this.array = array;
        _this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            _this._isScalar = true;
            _this.value = array[0];
        }
        return _this;
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXJyYXlPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBQzNDLHVEQUFzRDtBQUN0RCxxREFBb0Q7QUFFcEQsbURBQWtEO0FBR2xEOzs7O0dBSUc7QUFDSDtJQUF3QyxtQ0FBYTtJQTBGbkQseUJBQW9CLEtBQVUsRUFBVSxTQUFzQjtRQUE5RCxZQUNFLGlCQUFPLFNBS1I7UUFObUIsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7UUFFNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7O0lBQ0gsQ0FBQztJQTlGTSxzQkFBTSxHQUFiLFVBQWlCLEtBQVUsRUFBRSxTQUFzQjtRQUNqRCxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFTRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQ0c7SUFDSSxrQkFBRSxHQUFUO1FBQWEsZUFBK0I7YUFBL0IsVUFBK0IsRUFBL0IscUJBQStCLEVBQS9CLElBQStCO1lBQS9CLDBCQUErQjs7UUFDMUMsSUFBSSxTQUFTLEdBQWUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sU0FBUyxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDO1FBRUQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBUyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksaUNBQWUsQ0FBSSxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBVTtRQUVoQixJQUFBLG1CQUFLLEVBQUUsbUJBQUssRUFBRSxtQkFBSyxFQUFFLDZCQUFVLENBQVc7UUFFbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBYVMsb0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNyRCxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxVQUFVLFlBQUE7YUFDaEMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3JELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUNELFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQW5IRCxDQUF3Qyx1QkFBVSxHQW1IakQ7QUFuSFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFNjYWxhck9ic2VydmFibGUgfSBmcm9tICcuL1NjYWxhck9ic2VydmFibGUnO1xuaW1wb3J0IHsgRW1wdHlPYnNlcnZhYmxlIH0gZnJvbSAnLi9FbXB0eU9ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEFycmF5T2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIHN0YXRpYyBjcmVhdGU8VD4oYXJyYXk6IFRbXSwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKGFycmF5LCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgc3RhdGljIG9mPFQ+KGl0ZW0xOiBULCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIG9mPFQ+KGl0ZW0xOiBULCBpdGVtMjogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgaXRlbTI6IFQsIGl0ZW0zOiBULCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIG9mPFQ+KGl0ZW0xOiBULCBpdGVtMjogVCwgaXRlbTM6IFQsIGl0ZW00OiBULCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIG9mPFQ+KGl0ZW0xOiBULCBpdGVtMjogVCwgaXRlbTM6IFQsIGl0ZW00OiBULCBpdGVtNTogVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBvZjxUPihpdGVtMTogVCwgaXRlbTI6IFQsIGl0ZW0zOiBULCBpdGVtNDogVCwgaXRlbTU6IFQsIGl0ZW02OiBULCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIG9mPFQ+KC4uLmFycmF5OiBBcnJheTxUIHwgSVNjaGVkdWxlcj4pOiBPYnNlcnZhYmxlPFQ+O1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgc29tZSB2YWx1ZXMgeW91IHNwZWNpZnkgYXMgYXJndW1lbnRzLFxuICAgKiBpbW1lZGlhdGVseSBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBhbmQgdGhlbiBlbWl0cyBhIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIHRoZSBhcmd1bWVudHMgeW91IHByb3ZpZGUsIHRoZW4gY29tcGxldGVzLlxuICAgKiA8L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvb2YucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IG9ubHlcbiAgICogZW1pdHMgdGhlIGFyZ3VtZW50cyBnaXZlbiwgYW5kIHRoZSBjb21wbGV0ZSBub3RpZmljYXRpb24gdGhlcmVhZnRlci4gSXQgY2FuXG4gICAqIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyIE9ic2VydmFibGVzLCBzdWNoIGFzIHdpdGgge0BsaW5rIGNvbmNhdH0uXG4gICAqIEJ5IGRlZmF1bHQsIGl0IHVzZXMgYSBgbnVsbGAgSVNjaGVkdWxlciwgd2hpY2ggbWVhbnMgdGhlIGBuZXh0YFxuICAgKiBub3RpZmljYXRpb25zIGFyZSBzZW50IHN5bmNocm9ub3VzbHksIGFsdGhvdWdoIHdpdGggYSBkaWZmZXJlbnQgSVNjaGVkdWxlclxuICAgKiBpdCBpcyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgd2hlbiB0aG9zZSBub3RpZmljYXRpb25zIHdpbGwgYmUgZGVsaXZlcmVkLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IDEwLCAyMCwgMzAsIHRoZW4gJ2EnLCAnYicsICdjJywgdGhlbiBzdGFydCB0aWNraW5nIGV2ZXJ5IHNlY29uZC48L2NhcHRpb24+XG4gICAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS5vZigxMCwgMjAsIDMwKTtcbiAgICogdmFyIGxldHRlcnMgPSBSeC5PYnNlcnZhYmxlLm9mKCdhJywgJ2InLCAnYycpO1xuICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgKiB2YXIgcmVzdWx0ID0gbnVtYmVycy5jb25jYXQobGV0dGVycykuY29uY2F0KGludGVydmFsKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKiBAc2VlIHtAbGluayBlbXB0eX1cbiAgICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gICAqIEBzZWUge0BsaW5rIHRocm93fVxuICAgKlxuICAgKiBAcGFyYW0gey4uLlR9IHZhbHVlcyBBcmd1bWVudHMgdGhhdCByZXByZXNlbnQgYG5leHRgIHZhbHVlcyB0byBiZSBlbWl0dGVkLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAqIHRoZSBlbWlzc2lvbnMgb2YgdGhlIGBuZXh0YCBub3RpZmljYXRpb25zLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgZWFjaCBnaXZlbiBpbnB1dCB2YWx1ZS5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIG9mXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgb2Y8VD4oLi4uYXJyYXk6IEFycmF5PFQgfCBJU2NoZWR1bGVyPik6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBzY2hlZHVsZXIgPSA8SVNjaGVkdWxlcj5hcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICBpZiAoaXNTY2hlZHVsZXIoc2NoZWR1bGVyKSkge1xuICAgICAgYXJyYXkucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZTxUPig8YW55PmFycmF5LCBzY2hlZHVsZXIpO1xuICAgIH0gZWxzZSBpZiAobGVuID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFNjYWxhck9ic2VydmFibGU8VD4oPGFueT5hcnJheVswXSwgc2NoZWR1bGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGU8VD4oc2NoZWR1bGVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2goc3RhdGU6IGFueSkge1xuXG4gICAgY29uc3QgeyBhcnJheSwgaW5kZXgsIGNvdW50LCBzdWJzY3JpYmVyIH0gPSBzdGF0ZTtcblxuICAgIGlmIChpbmRleCA+PSBjb3VudCkge1xuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpbmRleF0pO1xuXG4gICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUuaW5kZXggPSBpbmRleCArIDE7XG5cbiAgICAoPGFueT4gdGhpcykuc2NoZWR1bGUoc3RhdGUpO1xuICB9XG5cbiAgLy8gdmFsdWUgdXNlZCBpZiBBcnJheSBoYXMgb25lIHZhbHVlIGFuZCBfaXNTY2FsYXJcbiAgdmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBUW10sIHByaXZhdGUgc2NoZWR1bGVyPzogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKCFzY2hlZHVsZXIgJiYgYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICB0aGlzLnZhbHVlID0gYXJyYXlbMF07XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLmFycmF5O1xuICAgIGNvbnN0IGNvdW50ID0gYXJyYXkubGVuZ3RoO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuXG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShBcnJheU9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHtcbiAgICAgICAgYXJyYXksIGluZGV4LCBjb3VudCwgc3Vic2NyaWJlclxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQgJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2ldKTtcbiAgICAgIH1cbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==