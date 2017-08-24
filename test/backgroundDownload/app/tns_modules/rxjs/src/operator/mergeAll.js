"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeAllOperator(concurrent));
}
exports.mergeAll = mergeAll;
var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
}());
exports.MergeAllOperator = MergeAllOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeAllSubscriber = (function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        var _this = _super.call(this, destination) || this;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        return _this;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult_1.subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeAllSubscriber = MergeAllSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VBbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXJnZUFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFLOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFDSCxrQkFBaUQsVUFBNkM7SUFBN0MsMkJBQUEsRUFBQSxhQUFxQixNQUFNLENBQUMsaUJBQWlCO0lBQzVGLE1BQU0sQ0FBTSxJQUFJLENBQUMsSUFBSSxDQUFNLElBQUksZ0JBQWdCLENBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNFLDBCQUFvQixVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQ3RDLENBQUM7SUFFRCwrQkFBSSxHQUFKLFVBQUssUUFBcUIsRUFBRSxNQUFXO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksNENBQWdCO0FBUzdCOzs7O0dBSUc7QUFDSDtJQUEyQyxzQ0FBaUM7SUFLMUUsNEJBQVksV0FBd0IsRUFBVSxVQUFrQjtRQUFoRSxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUY2QyxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUp4RCxrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixZQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUM3QixZQUFNLEdBQVcsQ0FBQyxDQUFDOztJQUkzQixDQUFDO0lBRVMsa0NBQUssR0FBZixVQUFnQixVQUF5QjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQW1CLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRVMsc0NBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsUUFBc0I7UUFDbkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQW5DRCxDQUEyQyxpQ0FBZSxHQW1DekQ7QUFuQ1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbGw8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY29uY3VycmVudD86IG51bWJlcik6IFQ7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbGw8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgY29uY3VycmVudD86IG51bWJlcik6IFN1YnNjcmliYWJsZTxSPjtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlIGludG8gYSBmaXJzdC1vcmRlciBPYnNlcnZhYmxlIHdoaWNoXG4gKiBjb25jdXJyZW50bHkgZGVsaXZlcnMgYWxsIHZhbHVlcyB0aGF0IGFyZSBlbWl0dGVkIG9uIHRoZSBpbm5lciBPYnNlcnZhYmxlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tZXJnZUFsbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgbWVyZ2VBbGxgIHN1YnNjcmliZXMgdG8gYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIE9ic2VydmFibGVzLCBhbHNvIGtub3duIGFzXG4gKiBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlLiBFYWNoIHRpbWUgaXQgb2JzZXJ2ZXMgb25lIG9mIHRoZXNlIGVtaXR0ZWQgaW5uZXJcbiAqIE9ic2VydmFibGVzLCBpdCBzdWJzY3JpYmVzIHRvIHRoYXQgYW5kIGRlbGl2ZXJzIGFsbCB0aGUgdmFsdWVzIGZyb20gdGhlXG4gKiBpbm5lciBPYnNlcnZhYmxlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS4gVGhlIG91dHB1dCBPYnNlcnZhYmxlIG9ubHlcbiAqIGNvbXBsZXRlcyBvbmNlIGFsbCBpbm5lciBPYnNlcnZhYmxlcyBoYXZlIGNvbXBsZXRlZC4gQW55IGVycm9yIGRlbGl2ZXJlZCBieVxuICogYSBpbm5lciBPYnNlcnZhYmxlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U3Bhd24gYSBuZXcgaW50ZXJ2YWwgT2JzZXJ2YWJsZSBmb3IgZWFjaCBjbGljayBldmVudCwgYW5kIGJsZW5kIHRoZWlyIG91dHB1dHMgYXMgb25lIE9ic2VydmFibGU8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGhpZ2hlck9yZGVyID0gY2xpY2tzLm1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogdmFyIGZpcnN0T3JkZXIgPSBoaWdoZXJPcmRlci5tZXJnZUFsbCgpO1xuICogZmlyc3RPcmRlci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q291bnQgZnJvbSAwIHRvIDkgZXZlcnkgc2Vjb25kIGZvciBlYWNoIGNsaWNrLCBidXQgb25seSBhbGxvdyAyIGNvbmN1cnJlbnQgdGltZXJzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBoaWdoZXJPcmRlciA9IGNsaWNrcy5tYXAoKGV2KSA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnRha2UoMTApKTtcbiAqIHZhciBmaXJzdE9yZGVyID0gaGlnaGVyT3JkZXIubWVyZ2VBbGwoMik7XG4gKiBmaXJzdE9yZGVyLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lQWxsfVxuICogQHNlZSB7QGxpbmsgY29uY2F0QWxsfVxuICogQHNlZSB7QGxpbmsgZXhoYXVzdH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICogQHNlZSB7QGxpbmsgc3dpdGNofVxuICogQHNlZSB7QGxpbmsgemlwQWxsfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlubmVyXG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB2YWx1ZXMgY29taW5nIGZyb20gYWxsIHRoZVxuICogaW5uZXIgT2JzZXJ2YWJsZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIG1lcmdlQWxsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbGw8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY29uY3VycmVudDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTogVCB7XG4gIHJldHVybiA8YW55PnRoaXMubGlmdDxhbnk+KG5ldyBNZXJnZUFsbE9wZXJhdG9yPFQ+KGNvbmN1cnJlbnQpKTtcbn1cblxuZXhwb3J0IGNsYXNzIE1lcmdlQWxsT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxPYnNlcnZhYmxlPFQ+LCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uY3VycmVudDogbnVtYmVyKSB7XG4gIH1cblxuICBjYWxsKG9ic2VydmVyOiBPYnNlcnZlcjxUPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNZXJnZUFsbFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMuY29uY3VycmVudCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgTWVyZ2VBbGxTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4sIFQ+IHtcbiAgcHJpdmF0ZSBoYXNDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBidWZmZXI6IE9ic2VydmFibGU8VD5bXSA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8VD4sIHByaXZhdGUgY29uY3VycmVudDogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KG9ic2VydmFibGU6IE9ic2VydmFibGU8VD4pIHtcbiAgICBpZiAodGhpcy5hY3RpdmUgPCB0aGlzLmNvbmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuYWN0aXZlKys7XG4gICAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdDxPYnNlcnZhYmxlPFQ+LCBUPih0aGlzLCBvYnNlcnZhYmxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyLnB1c2gob2JzZXJ2YWJsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBTdWJzY3JpcHRpb24pIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgdGhpcy5hY3RpdmUtLTtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5oYXNDb21wbGV0ZWQpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==