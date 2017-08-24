"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        var _this = _super.call(this) || this;
        _this.error = error;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * <img src="./img/throw.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then emit an error.</caption>
     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @example <caption>Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x === 13 ?
     *     Rx.Observable.throw('Thirteens are bad') :
     *     Rx.Observable.of('a', 'b', 'c')
     * );
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     *
     * @param {any} error The particular Error to pass to the error notification.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the error notification.
     * @return {Observable} An error Observable: emits only the error notification
     * using the given error argument.
     * @static true
     * @name throw
     * @owner Observable
     */
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
        var error = arg.error, subscriber = arg.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
}(Observable_1.Observable));
exports.ErrorObservable = ErrorObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXJyb3JPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBUTNDOzs7O0dBSUc7QUFDSDtJQUFxQyxtQ0FBZTtJQW1EbEQseUJBQW1CLEtBQVUsRUFBVSxTQUFzQjtRQUE3RCxZQUNFLGlCQUFPLFNBQ1I7UUFGa0IsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7O0lBRTdELENBQUM7SUFuREQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVDRztJQUNJLHNCQUFNLEdBQWIsVUFBYyxLQUFVLEVBQUUsU0FBc0I7UUFDOUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sd0JBQVEsR0FBZixVQUFnQixHQUFnQjtRQUN0QixJQUFBLGlCQUFLLEVBQUUsMkJBQVUsQ0FBUztRQUNsQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFNUyxvQ0FBVSxHQUFwQixVQUFxQixVQUFlO1FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JELEtBQUssT0FBQSxFQUFFLFVBQVUsWUFBQTthQUNsQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbkVELENBQXFDLHVCQUFVLEdBbUU5QztBQW5FWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGF0Y2hBcmcge1xuICBlcnJvcjogYW55O1xuICBzdWJzY3JpYmVyOiBhbnk7XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgbm8gaXRlbXMgdG8gdGhlIE9ic2VydmVyIGFuZCBpbW1lZGlhdGVseVxuICAgKiBlbWl0cyBhbiBlcnJvciBub3RpZmljYXRpb24uXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5KdXN0IGVtaXRzICdlcnJvcicsIGFuZCBub3RoaW5nIGVsc2UuXG4gICAqIDwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy90aHJvdy5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogVGhpcyBzdGF0aWMgb3BlcmF0b3IgaXMgdXNlZnVsIGZvciBjcmVhdGluZyBhIHNpbXBsZSBPYnNlcnZhYmxlIHRoYXQgb25seVxuICAgKiBlbWl0cyB0aGUgZXJyb3Igbm90aWZpY2F0aW9uLiBJdCBjYW4gYmUgdXNlZCBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXJcbiAgICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBudW1iZXIgNywgdGhlbiBlbWl0IGFuIGVycm9yLjwvY2FwdGlvbj5cbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdvb3BzIScpKS5zdGFydFdpdGgoNyk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIGFuZCBmbGF0dGVuIG51bWJlcnMgdG8gdGhlIHNlcXVlbmNlICdhJywgJ2InLCAnYycsIGJ1dCB0aHJvdyBhbiBlcnJvciBmb3IgMTM8L2NhcHRpb24+XG4gICAqIHZhciBpbnRlcnZhbCA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gICAqIHZhciByZXN1bHQgPSBpbnRlcnZhbC5tZXJnZU1hcCh4ID0+XG4gICAqICAgeCA9PT0gMTMgP1xuICAgKiAgICAgUnguT2JzZXJ2YWJsZS50aHJvdygnVGhpcnRlZW5zIGFyZSBiYWQnKSA6XG4gICAqICAgICBSeC5PYnNlcnZhYmxlLm9mKCdhJywgJ2InLCAnYycpXG4gICAqICk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKiBAc2VlIHtAbGluayBlbXB0eX1cbiAgICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gICAqIEBzZWUge0BsaW5rIG9mfVxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZXJyb3IgVGhlIHBhcnRpY3VsYXIgRXJyb3IgdG8gcGFzcyB0byB0aGUgZXJyb3Igbm90aWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAqIHRoZSBlbWlzc2lvbiBvZiB0aGUgZXJyb3Igbm90aWZpY2F0aW9uLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBlcnJvciBPYnNlcnZhYmxlOiBlbWl0cyBvbmx5IHRoZSBlcnJvciBub3RpZmljYXRpb25cbiAgICogdXNpbmcgdGhlIGdpdmVuIGVycm9yIGFyZ3VtZW50LlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgdGhyb3dcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUoZXJyb3I6IGFueSwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IEVycm9yT2JzZXJ2YWJsZSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvck9ic2VydmFibGUoZXJyb3IsIHNjaGVkdWxlcik7XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2goYXJnOiBEaXNwYXRjaEFyZykge1xuICAgIGNvbnN0IHsgZXJyb3IsIHN1YnNjcmliZXIgfSA9IGFyZztcbiAgICBzdWJzY3JpYmVyLmVycm9yKGVycm9yKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcjogYW55LCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgY29uc3QgZXJyb3IgPSB0aGlzLmVycm9yO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuXG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShFcnJvck9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHtcbiAgICAgICAgZXJyb3IsIHN1YnNjcmliZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==