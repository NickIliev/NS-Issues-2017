"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
function dispatch(state) {
    var obj = state.obj, keys = state.keys, length = state.length, index = state.index, subscriber = state.subscriber;
    if (index === length) {
        subscriber.complete();
        return;
    }
    var key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PairsObservable = (function (_super) {
    __extends(PairsObservable, _super);
    function PairsObservable(obj, scheduler) {
        var _this = _super.call(this) || this;
        _this.obj = obj;
        _this.scheduler = scheduler;
        _this.keys = Object.keys(obj);
        return _this;
    }
    /**
     * Convert an object into an observable sequence of [key, value] pairs
     * using an optional IScheduler to enumerate the object.
     *
     * @example <caption>Converts a javascript object to an Observable</caption>
     * var obj = {
     *   foo: 42,
     *   bar: 56,
     *   baz: 78
     * };
     *
     * var source = Rx.Observable.pairs(obj);
     *
     * var subscription = source.subscribe(
     *   function (x) {
     *     console.log('Next: %s', x);
     *   },
     *   function (err) {
     *     console.log('Error: %s', err);
     *   },
     *   function () {
     *     console.log('Completed');
     *   });
     *
     * @param {Object} obj The object to inspect and turn into an
     * Observable sequence.
     * @param {Scheduler} [scheduler] An optional IScheduler to run the
     * enumeration of the input sequence on.
     * @returns {(Observable<Array<string | T>>)} An observable sequence of
     * [key, value] pairs from the object.
     */
    PairsObservable.create = function (obj, scheduler) {
        return new PairsObservable(obj, scheduler);
    };
    PairsObservable.prototype._subscribe = function (subscriber) {
        var _a = this, keys = _a.keys, scheduler = _a.scheduler;
        var length = keys.length;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                obj: this.obj, keys: keys, length: length, index: 0, subscriber: subscriber
            });
        }
        else {
            for (var idx = 0; idx < length; idx++) {
                var key = keys[idx];
                subscriber.next([key, this.obj[key]]);
            }
            subscriber.complete();
        }
    };
    return PairsObservable;
}(Observable_1.Observable));
exports.PairsObservable = PairsObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpcnNPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGFpcnNPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBWTNDLGtCQUFvRCxLQUFzQjtJQUNqRSxJQUFBLGVBQUcsRUFBRSxpQkFBSSxFQUFFLHFCQUFNLEVBQUUsbUJBQUssRUFBRSw2QkFBVSxDQUFVO0lBRXJELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLG1DQUE2QjtJQXNDbkUseUJBQW9CLEdBQVcsRUFBVSxTQUFzQjtRQUEvRCxZQUNFLGlCQUFPLFNBRVI7UUFIbUIsU0FBRyxHQUFILEdBQUcsQ0FBUTtRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7UUFFN0QsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUMvQixDQUFDO0lBdENEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSSxzQkFBTSxHQUFiLFVBQWlCLEdBQVcsRUFBRSxTQUFzQjtRQUNsRCxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFPUyxvQ0FBVSxHQUFwQixVQUFxQixVQUF5QztRQUN0RCxJQUFBLFNBQXdCLEVBQXZCLGNBQUksRUFBRSx3QkFBUyxDQUFTO1FBQy9CLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxZQUFBO2FBQ2xELENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQ0QsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBM0RELENBQXdDLHVCQUFVLEdBMkRqRDtBQTNEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi9zY2hlZHVsZXIvQWN0aW9uJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XHJcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xyXG5cclxuaW50ZXJmYWNlIFBhaXJzQ29udGV4dDxUPiB7XHJcbiAgb2JqOiBPYmplY3Q7XHJcbiAga2V5czogQXJyYXk8c3RyaW5nPjtcclxuICBsZW5ndGg6IG51bWJlcjtcclxuICBpbmRleDogbnVtYmVyO1xyXG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8QXJyYXk8c3RyaW5nIHwgVD4+O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaDxUPih0aGlzOiBBY3Rpb248UGFpcnNDb250ZXh0PFQ+Piwgc3RhdGU6IFBhaXJzQ29udGV4dDxUPikge1xyXG4gIGNvbnN0IHtvYmosIGtleXMsIGxlbmd0aCwgaW5kZXgsIHN1YnNjcmliZXJ9ID0gc3RhdGU7XHJcblxyXG4gIGlmIChpbmRleCA9PT0gbGVuZ3RoKSB7XHJcbiAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXkgPSBrZXlzW2luZGV4XTtcclxuICBzdWJzY3JpYmVyLm5leHQoW2tleSwgb2JqW2tleV1dKTtcclxuXHJcbiAgc3RhdGUuaW5kZXggPSBpbmRleCArIDE7XHJcblxyXG4gIHRoaXMuc2NoZWR1bGUoc3RhdGUpO1xyXG59XHJcblxyXG4vKipcclxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cclxuICogQGV4dGVuZHMge0lnbm9yZWR9XHJcbiAqIEBoaWRlIHRydWVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYWlyc09ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPEFycmF5PHN0cmluZyB8IFQ+PiB7XHJcbiAgcHJpdmF0ZSBrZXlzOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0IGFuIG9iamVjdCBpbnRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2Ugb2YgW2tleSwgdmFsdWVdIHBhaXJzXHJcbiAgICogdXNpbmcgYW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byBlbnVtZXJhdGUgdGhlIG9iamVjdC5cclxuICAgKlxyXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnRzIGEgamF2YXNjcmlwdCBvYmplY3QgdG8gYW4gT2JzZXJ2YWJsZTwvY2FwdGlvbj5cclxuICAgKiB2YXIgb2JqID0ge1xyXG4gICAqICAgZm9vOiA0MixcclxuICAgKiAgIGJhcjogNTYsXHJcbiAgICogICBiYXo6IDc4XHJcbiAgICogfTtcclxuICAgKlxyXG4gICAqIHZhciBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLnBhaXJzKG9iaik7XHJcbiAgICpcclxuICAgKiB2YXIgc3Vic2NyaXB0aW9uID0gc291cmNlLnN1YnNjcmliZShcclxuICAgKiAgIGZ1bmN0aW9uICh4KSB7XHJcbiAgICogICAgIGNvbnNvbGUubG9nKCdOZXh0OiAlcycsIHgpO1xyXG4gICAqICAgfSxcclxuICAgKiAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgKiAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAlcycsIGVycik7XHJcbiAgICogICB9LFxyXG4gICAqICAgZnVuY3Rpb24gKCkge1xyXG4gICAqICAgICBjb25zb2xlLmxvZygnQ29tcGxldGVkJyk7XHJcbiAgICogICB9KTtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0IGFuZCB0dXJuIGludG8gYW5cclxuICAgKiBPYnNlcnZhYmxlIHNlcXVlbmNlLlxyXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBbiBvcHRpb25hbCBJU2NoZWR1bGVyIHRvIHJ1biB0aGVcclxuICAgKiBlbnVtZXJhdGlvbiBvZiB0aGUgaW5wdXQgc2VxdWVuY2Ugb24uXHJcbiAgICogQHJldHVybnMgeyhPYnNlcnZhYmxlPEFycmF5PHN0cmluZyB8IFQ+Pil9IEFuIG9ic2VydmFibGUgc2VxdWVuY2Ugb2ZcclxuICAgKiBba2V5LCB2YWx1ZV0gcGFpcnMgZnJvbSB0aGUgb2JqZWN0LlxyXG4gICAqL1xyXG4gIHN0YXRpYyBjcmVhdGU8VD4ob2JqOiBPYmplY3QsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPEFycmF5PHN0cmluZyB8IFQ+PiB7XHJcbiAgICByZXR1cm4gbmV3IFBhaXJzT2JzZXJ2YWJsZTxUPihvYmosIHNjaGVkdWxlcik7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9iajogT2JqZWN0LCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxBcnJheTxzdHJpbmcgfCBUPj4pOiBUZWFyZG93bkxvZ2ljIHtcclxuICAgIGNvbnN0IHtrZXlzLCBzY2hlZHVsZXJ9ID0gdGhpcztcclxuICAgIGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChzY2hlZHVsZXIpIHtcclxuICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaCwgMCwge1xyXG4gICAgICAgIG9iajogdGhpcy5vYmosIGtleXMsIGxlbmd0aCwgaW5kZXg6IDAsIHN1YnNjcmliZXJcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpZHhdO1xyXG4gICAgICAgIHN1YnNjcmliZXIubmV4dChba2V5LCB0aGlzLm9ialtrZXldXSk7XHJcbiAgICAgIH1cclxuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==