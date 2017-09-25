"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRW1wdHlPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBTzNDOzs7O0dBSUc7QUFDSDtJQUF3QyxtQ0FBYTtJQXNEbkQseUJBQW9CLFNBQXNCO1FBQTFDLFlBQ0UsaUJBQU8sU0FDUjtRQUZtQixlQUFTLEdBQVQsU0FBUyxDQUFhOztJQUUxQyxDQUFDO0lBdEREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQ0c7SUFDSSxzQkFBTSxHQUFiLFVBQWlCLFNBQXNCO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBSSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sd0JBQVEsR0FBZixVQUFtQixHQUFtQjtRQUM1QixJQUFBLDJCQUFVLENBQVM7UUFDM0IsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFNUyxvQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUU1QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFwRUQsQ0FBd0MsdUJBQVUsR0FvRWpEO0FBcEVZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXNwYXRjaEFyZzxUPiB7XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD47XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRW1wdHlPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlciBhbmQgaW1tZWRpYXRlbHlcbiAgICogZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5KdXN0IGVtaXRzICdjb21wbGV0ZScsIGFuZCBub3RoaW5nIGVsc2UuXG4gICAqIDwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9lbXB0eS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogVGhpcyBzdGF0aWMgb3BlcmF0b3IgaXMgdXNlZnVsIGZvciBjcmVhdGluZyBhIHNpbXBsZSBPYnNlcnZhYmxlIHRoYXQgb25seVxuICAgKiBlbWl0cyB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uLiBJdCBjYW4gYmUgdXNlZCBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXJcbiAgICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBudW1iZXIgNywgdGhlbiBjb21wbGV0ZS48L2NhcHRpb24+XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmVtcHR5KCkuc3RhcnRXaXRoKDcpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgYW5kIGZsYXR0ZW4gb25seSBvZGQgbnVtYmVycyB0byB0aGUgc2VxdWVuY2UgJ2EnLCAnYicsICdjJzwvY2FwdGlvbj5cbiAgICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAgICogdmFyIHJlc3VsdCA9IGludGVydmFsLm1lcmdlTWFwKHggPT5cbiAgICogICB4ICUgMiA9PT0gMSA/IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJykgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAgICogKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nIHRvIHRoZSBjb25zb2xlOlxuICAgKiAvLyB4IGlzIGVxdWFsIHRvIHRoZSBjb3VudCBvbiB0aGUgaW50ZXJ2YWwgZWcoMCwxLDIsMywuLi4pXG4gICAqIC8vIHggd2lsbCBvY2N1ciBldmVyeSAxMDAwbXNcbiAgICogLy8gaWYgeCAlIDIgaXMgZXF1YWwgdG8gMSBwcmludCBhYmNcbiAgICogLy8gaWYgeCAlIDIgaXMgbm90IGVxdWFsIHRvIDEgbm90aGluZyB3aWxsIGJlIG91dHB1dFxuICAgKlxuICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAqXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICogdGhlIGVtaXNzaW9uIG9mIHRoZSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIFwiZW1wdHlcIiBPYnNlcnZhYmxlOiBlbWl0cyBvbmx5IHRoZSBjb21wbGV0ZVxuICAgKiBub3RpZmljYXRpb24uXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBlbXB0eVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGU8VD4oc2NoZWR1bGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBkaXNwYXRjaDxUPihhcmc6IERpc3BhdGNoQXJnPFQ+KSB7XG4gICAgY29uc3QgeyBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcblxuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuXG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShFbXB0eU9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHsgc3Vic2NyaWJlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19