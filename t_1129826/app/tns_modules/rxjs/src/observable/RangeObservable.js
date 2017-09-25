"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var RangeObservable = (function (_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, count, scheduler) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this._count = count;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits a sequence of numbers within a specified
     * range.
     *
     * <span class="informal">Emits a sequence of numbers in a range.</span>
     *
     * <img src="./img/range.png" width="100%">
     *
     * `range` operator emits a range of sequential integers, in order, where you
     * select the `start` of the range and its `length`. By default, uses no
     * IScheduler and just delivers the notifications synchronously, but may use
     * an optional IScheduler to regulate those deliveries.
     *
     * @example <caption>Emits the numbers 1 to 10</caption>
     * var numbers = Rx.Observable.range(1, 10);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link interval}
     *
     * @param {number} [start=0] The value of the first integer in the sequence.
     * @param {number} [count=0] The number of sequential integers to generate.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the notifications.
     * @return {Observable} An Observable of numbers that emits a finite range of
     * sequential integers.
     * @static true
     * @name range
     * @owner Observable
     */
    RangeObservable.create = function (start, count, scheduler) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = 0; }
        return new RangeObservable(start, count, scheduler);
    };
    RangeObservable.dispatch = function (state) {
        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var start = this.start;
        var count = this._count;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(RangeObservable.dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(start++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
    };
    return RangeObservable;
}(Observable_1.Observable));
exports.RangeObservable = RangeObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2VPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmFuZ2VPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBSTNDOzs7O0dBSUc7QUFDSDtJQUFxQyxtQ0FBa0I7SUErRHJELHlCQUFZLEtBQWEsRUFDYixLQUFhLEVBQ2IsU0FBc0I7UUFGbEMsWUFHRSxpQkFBTyxTQUlSO1FBSEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQzdCLENBQUM7SUFwRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0ksc0JBQU0sR0FBYixVQUFjLEtBQWlCLEVBQ2pCLEtBQWlCLEVBQ2pCLFNBQXNCO1FBRnRCLHNCQUFBLEVBQUEsU0FBaUI7UUFDakIsc0JBQUEsRUFBQSxTQUFpQjtRQUU3QixNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sd0JBQVEsR0FBZixVQUFnQixLQUFVO1FBRWhCLElBQUEsbUJBQUssRUFBRSxtQkFBSyxFQUFFLG1CQUFLLEVBQUUsNkJBQVUsQ0FBVztRQUVsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN4QixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBZVMsb0NBQVUsR0FBcEIsVUFBcUIsVUFBOEI7UUFDakQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNyRCxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxVQUFVLFlBQUE7YUFDaEMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sR0FBRyxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdEIsS0FBSyxDQUFDO2dCQUNSLENBQUM7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDO2dCQUNSLENBQUM7WUFDSCxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBL0ZELENBQXFDLHVCQUFVLEdBK0Y5QztBQS9GWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgUmFuZ2VPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxudW1iZXI+IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBzZXF1ZW5jZSBvZiBudW1iZXJzIHdpdGhpbiBhIHNwZWNpZmllZFxuICAgKiByYW5nZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIGEgc2VxdWVuY2Ugb2YgbnVtYmVycyBpbiBhIHJhbmdlLjwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9yYW5nZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogYHJhbmdlYCBvcGVyYXRvciBlbWl0cyBhIHJhbmdlIG9mIHNlcXVlbnRpYWwgaW50ZWdlcnMsIGluIG9yZGVyLCB3aGVyZSB5b3VcbiAgICogc2VsZWN0IHRoZSBgc3RhcnRgIG9mIHRoZSByYW5nZSBhbmQgaXRzIGBsZW5ndGhgLiBCeSBkZWZhdWx0LCB1c2VzIG5vXG4gICAqIElTY2hlZHVsZXIgYW5kIGp1c3QgZGVsaXZlcnMgdGhlIG5vdGlmaWNhdGlvbnMgc3luY2hyb25vdXNseSwgYnV0IG1heSB1c2VcbiAgICogYW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byByZWd1bGF0ZSB0aG9zZSBkZWxpdmVyaWVzLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0cyB0aGUgbnVtYmVycyAxIHRvIDEwPC9jYXB0aW9uPlxuICAgKiB2YXIgbnVtYmVycyA9IFJ4Lk9ic2VydmFibGUucmFuZ2UoMSwgMTApO1xuICAgKiBudW1iZXJzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgdGltZXJ9XG4gICAqIEBzZWUge0BsaW5rIGludGVydmFsfVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgaW50ZWdlciBpbiB0aGUgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnQ9MF0gVGhlIG51bWJlciBvZiBzZXF1ZW50aWFsIGludGVnZXJzIHRvIGdlbmVyYXRlLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAqIHRoZSBlbWlzc2lvbnMgb2YgdGhlIG5vdGlmaWNhdGlvbnMuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgbnVtYmVycyB0aGF0IGVtaXRzIGEgZmluaXRlIHJhbmdlIG9mXG4gICAqIHNlcXVlbnRpYWwgaW50ZWdlcnMuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSByYW5nZVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZShzdGFydDogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBjb3VudDogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbmV3IFJhbmdlT2JzZXJ2YWJsZShzdGFydCwgY291bnQsIHNjaGVkdWxlcik7XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2goc3RhdGU6IGFueSkge1xuXG4gICAgY29uc3QgeyBzdGFydCwgaW5kZXgsIGNvdW50LCBzdWJzY3JpYmVyIH0gPSBzdGF0ZTtcblxuICAgIGlmIChpbmRleCA+PSBjb3VudCkge1xuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXIubmV4dChzdGFydCk7XG5cbiAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGF0ZS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICBzdGF0ZS5zdGFydCA9IHN0YXJ0ICsgMTtcblxuICAgICg8YW55PiB0aGlzKS5zY2hlZHVsZShzdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0OiBudW1iZXI7XG4gIHByaXZhdGUgX2NvdW50OiBudW1iZXI7XG4gIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyO1xuXG4gIGNvbnN0cnVjdG9yKHN0YXJ0OiBudW1iZXIsXG4gICAgICAgICAgICAgIGNvdW50OiBudW1iZXIsXG4gICAgICAgICAgICAgIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxudW1iZXI+KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5fY291bnQ7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKFJhbmdlT2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICBpbmRleCwgY291bnQsIHN0YXJ0LCBzdWJzY3JpYmVyXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG8ge1xuICAgICAgICBpZiAoaW5kZXgrKyA+PSBjb3VudCkge1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLm5leHQoc3RhcnQrKyk7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==