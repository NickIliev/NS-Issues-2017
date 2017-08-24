"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDRDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsZUFBOEMsU0FBc0UsRUFDM0YsT0FBYTtJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUhELHNCQUdDO0FBRUQ7SUFDRSx1QkFBb0IsU0FBc0UsRUFDdEUsT0FBYSxFQUNiLE1BQXNCO1FBRnRCLGNBQVMsR0FBVCxTQUFTLENBQTZEO1FBQ3RFLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLFFBQTZCLEVBQUUsTUFBVztRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWlDLG1DQUFhO0lBRzVDLHlCQUFZLFdBQThCLEVBQ3RCLFNBQXNFLEVBQ3RFLE9BQVksRUFDWixNQUFzQjtRQUgxQyxZQUlFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUxtQixlQUFTLEdBQVQsU0FBUyxDQUE2RDtRQUN0RSxhQUFPLEdBQVAsT0FBTyxDQUFLO1FBQ1osWUFBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFMbEMsV0FBSyxHQUFXLENBQUMsQ0FBQztRQU94QixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxLQUFJLENBQUM7O0lBQ2pDLENBQUM7SUFFTyx3Q0FBYyxHQUF0QixVQUF1QixlQUF3QjtRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUywrQkFBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFUyxtQ0FBUyxHQUFuQjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWpDRCxDQUFpQyx1QkFBVSxHQWlDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZXRoZXIgb3Igbm90IGV2ZXJ5IGl0ZW0gb2YgdGhlIHNvdXJjZSBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbiBzcGVjaWZpZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+QSBzaW1wbGUgZXhhbXBsZSBlbWl0dGluZyB0cnVlIGlmIGFsbCBlbGVtZW50cyBhcmUgbGVzcyB0aGFuIDUsIGZhbHNlIG90aGVyd2lzZTwvY2FwdGlvbj5cbiAqICBPYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDQsIDUsIDYpXG4gKiAgICAgLmV2ZXJ5KHggPT4geCA8IDUpXG4gKiAgICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gLT4gZmFsc2VcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gaXRlbSBtZWV0cyBhIHNwZWNpZmllZCBjb25kaXRpb24uXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIE9wdGlvbmFsIG9iamVjdCB0byB1c2UgZm9yIGB0aGlzYCBpbiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIGJvb2xlYW5zIHRoYXQgZGV0ZXJtaW5lcyBpZiBhbGwgaXRlbXMgb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG1lZXQgdGhlIGNvbmRpdGlvbiBzcGVjaWZpZWQuXG4gKiBAbWV0aG9kIGV2ZXJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlcnk8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQXJnPzogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEV2ZXJ5T3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnLCB0aGlzKSk7XG59XG5cbmNsYXNzIEV2ZXJ5T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnPzogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRXZlcnlTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBFdmVyeVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8Ym9vbGVhbj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnOiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnIHx8IHRoaXM7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNvbXBsZXRlKGV2ZXJ5VmFsdWVNYXRjaDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChldmVyeVZhbHVlTWF0Y2gpO1xuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmluZGV4KyssIHRoaXMuc291cmNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdGhpcy5ub3RpZnlDb21wbGV0ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKHRydWUpO1xuICB9XG59XG4iXX0=