"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
/**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
 * are equal.
 *
 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
 *
 * <img src="./img/sequenceEqual.png" width="100%">
 *
 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
 * observables completes, the operator will wait for the other observable to complete; If the other
 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
 * completes or emits after the other complets, the returned observable will never complete.
 *
 * @example <caption>figure out if the Konami code matches</caption>
 * var code = Rx.Observable.from([
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "KeyB",
 *  "KeyA",
 *  "Enter" // no start key, clearly.
 * ]);
 *
 * var keys = Rx.Observable.fromEvent(document, 'keyup')
 *  .map(e => e.code);
 * var matches = keys.bufferCount(11, 1)
 *  .mergeMap(
 *    last11 =>
 *      Rx.Observable.from(last11)
 *        .sequenceEqual(code)
 *   );
 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
 *
 * @see {@link combineLatest}
 * @see {@link zip}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} compareTo The observable sequence to compare the source sequence to.
 * @param {function} [comparor] An optional function to compare each value pair
 * @return {Observable} An Observable of a single boolean value representing whether or not
 * the values emitted by both observables were equal in sequence.
 * @method sequenceEqual
 * @owner Observable
 */
function sequenceEqual(compareTo, comparor) {
    return this.lift(new SequenceEqualOperator(compareTo, comparor));
}
exports.sequenceEqual = sequenceEqual;
var SequenceEqualOperator = (function () {
    function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
}());
exports.SequenceEqualOperator = SequenceEqualOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SequenceEqualSubscriber = (function (_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        var _this = _super.call(this, destination) || this;
        _this.compareTo = compareTo;
        _this.comparor = comparor;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        }
        else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this, _a = _c._a, _b = _c._b, comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            if (comparor) {
                areEqual = tryCatch_1.tryCatch(comparor)(a, b);
                if (areEqual === errorObject_1.errorObject) {
                    this.destination.error(errorObject_1.errorObject.e);
                }
            }
            else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        }
        else {
            this._b.push(value);
            this.checkValues();
        }
    };
    return SequenceEqualSubscriber;
}(Subscriber_1.Subscriber));
exports.SequenceEqualSubscriber = SequenceEqualSubscriber;
var SequenceEqualCompareToSubscriber = (function (_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        return _this;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent._complete();
    };
    return SequenceEqualCompareToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVuY2VFcXVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcXVlbmNlRXF1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0Q0FBMkM7QUFDM0MsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURHO0FBQ0gsdUJBQXNELFNBQXdCLEVBQzdDLFFBQWtDO0lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUhELHNDQUdDO0FBRUQ7SUFDRSwrQkFBb0IsU0FBd0IsRUFDeEIsUUFBaUM7UUFEakMsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUNyRCxDQUFDO0lBRUQsb0NBQUksR0FBSixVQUFLLFVBQStCLEVBQUUsTUFBVztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksc0RBQXFCO0FBVWxDOzs7O0dBSUc7QUFDSDtJQUFtRCwyQ0FBYTtJQUs5RCxpQ0FBWSxXQUF3QixFQUNoQixTQUF3QixFQUN4QixRQUFpQztRQUZyRCxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUptQixlQUFTLEdBQVQsU0FBUyxDQUFlO1FBQ3hCLGNBQVEsR0FBUixRQUFRLENBQXlCO1FBTjdDLFFBQUUsR0FBUSxFQUFFLENBQUM7UUFDYixRQUFFLEdBQVEsRUFBRSxDQUFDO1FBQ2Isa0JBQVksR0FBRyxLQUFLLENBQUM7UUFNM0IsS0FBSSxDQUFD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bUQsdUJBQVUsR0ErRDVEO0FBL0RZLDBEQUF1QjtBQWlFcEM7SUFBcUQsb0RBQWE7SUFDaEUsMENBQVksV0FBd0IsRUFBVSxNQUFxQztRQUFuRixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUY2QyxZQUFNLEdBQU4sTUFBTSxDQUErQjs7SUFFbkYsQ0FBQztJQUVTLGdEQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRVMsaURBQU0sR0FBaEIsVUFBaUIsR0FBUTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRVMsb0RBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDSCx1Q0FBQztBQUFELENBQUMsQUFoQkQsQ0FBcUQsdUJBQVUsR0FnQjlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG4vKipcbiAqIENvbXBhcmVzIGFsbCB2YWx1ZXMgb2YgdHdvIG9ic2VydmFibGVzIGluIHNlcXVlbmNlIHVzaW5nIGFuIG9wdGlvbmFsIGNvbXBhcm9yIGZ1bmN0aW9uXG4gKiBhbmQgcmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIGEgc2luZ2xlIGJvb2xlYW4gdmFsdWUgcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoZSB0d28gc2VxdWVuY2VzXG4gKiBhcmUgZXF1YWwuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNoZWNrcyB0byBzZWUgb2YgYWxsIHZhbHVlcyBlbWl0dGVkIGJ5IGJvdGggb2JzZXJ2YWJsZXMgYXJlIGVxdWFsLCBpbiBvcmRlci48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zZXF1ZW5jZUVxdWFsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBzZXF1ZW5jZUVxdWFsYCBzdWJzY3JpYmVzIHRvIHR3byBvYnNlcnZhYmxlcyBhbmQgYnVmZmVycyBpbmNvbWluZyB2YWx1ZXMgZnJvbSBlYWNoIG9ic2VydmFibGUuIFdoZW5ldmVyIGVpdGhlclxuICogb2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCB0aGUgdmFsdWUgaXMgYnVmZmVyZWQgYW5kIHRoZSBidWZmZXJzIGFyZSBzaGlmdGVkIGFuZCBjb21wYXJlZCBmcm9tIHRoZSBib3R0b21cbiAqIHVwOyBJZiBhbnkgdmFsdWUgcGFpciBkb2Vzbid0IG1hdGNoLCB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIGVtaXQgYGZhbHNlYCBhbmQgY29tcGxldGUuIElmIG9uZSBvZiB0aGVcbiAqIG9ic2VydmFibGVzIGNvbXBsZXRlcywgdGhlIG9wZXJhdG9yIHdpbGwgd2FpdCBmb3IgdGhlIG90aGVyIG9ic2VydmFibGUgdG8gY29tcGxldGU7IElmIHRoZSBvdGhlclxuICogb2JzZXJ2YWJsZSBlbWl0cyBiZWZvcmUgY29tcGxldGluZywgdGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGBmYWxzZWAgYW5kIGNvbXBsZXRlLiBJZiBvbmUgb2JzZXJ2YWJsZSBuZXZlclxuICogY29tcGxldGVzIG9yIGVtaXRzIGFmdGVyIHRoZSBvdGhlciBjb21wbGV0cywgdGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBuZXZlciBjb21wbGV0ZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5maWd1cmUgb3V0IGlmIHRoZSBLb25hbWkgY29kZSBtYXRjaGVzPC9jYXB0aW9uPlxuICogdmFyIGNvZGUgPSBSeC5PYnNlcnZhYmxlLmZyb20oW1xuICogIFwiQXJyb3dVcFwiLFxuICogIFwiQXJyb3dVcFwiLFxuICogIFwiQXJyb3dEb3duXCIsXG4gKiAgXCJBcnJvd0Rvd25cIixcbiAqICBcIkFycm93TGVmdFwiLFxuICogIFwiQXJyb3dSaWdodFwiLFxuICogIFwiQXJyb3dMZWZ0XCIsXG4gKiAgXCJBcnJvd1JpZ2h0XCIsXG4gKiAgXCJLZXlCXCIsXG4gKiAgXCJLZXlBXCIsXG4gKiAgXCJFbnRlclwiIC8vIG5vIHN0YXJ0IGtleSwgY2xlYXJseS5cbiAqIF0pO1xuICpcbiAqIHZhciBrZXlzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXG4gKiAgLm1hcChlID0+IGUuY29kZSk7XG4gKiB2YXIgbWF0Y2hlcyA9IGtleXMuYnVmZmVyQ291bnQoMTEsIDEpXG4gKiAgLm1lcmdlTWFwKFxuICogICAgbGFzdDExID0+XG4gKiAgICAgIFJ4Lk9ic2VydmFibGUuZnJvbShsYXN0MTEpXG4gKiAgICAgICAgLnNlcXVlbmNlRXF1YWwoY29kZSlcbiAqICAgKTtcbiAqIG1hdGNoZXMuc3Vic2NyaWJlKG1hdGNoZWQgPT4gY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWwgY2hlYXQgYXQgQ29udHJhPyAnLCBtYXRjaGVkKSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUxhdGVzdH1cbiAqIEBzZWUge0BsaW5rIHppcH1cbiAqIEBzZWUge0BsaW5rIHdpdGhMYXRlc3RGcm9tfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gY29tcGFyZVRvIFRoZSBvYnNlcnZhYmxlIHNlcXVlbmNlIHRvIGNvbXBhcmUgdGhlIHNvdXJjZSBzZXF1ZW5jZSB0by5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb21wYXJvcl0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gY29tcGFyZSBlYWNoIHZhbHVlIHBhaXJcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgYSBzaW5nbGUgYm9vbGVhbiB2YWx1ZSByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3RcbiAqIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSBib3RoIG9ic2VydmFibGVzIHdlcmUgZXF1YWwgaW4gc2VxdWVuY2UuXG4gKiBAbWV0aG9kIHNlcXVlbmNlRXF1YWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZUVxdWFsPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGNvbXBhcmVUbzogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcm9yPzogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgU2VxdWVuY2VFcXVhbE9wZXJhdG9yKGNvbXBhcmVUbywgY29tcGFyb3IpKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlRXF1YWxPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wYXJlVG86IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcGFyb3I6IChhOiBULCBiOiBUKSA9PiBib29sZWFuKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgU2VxdWVuY2VFcXVhbFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jb21wYXJlVG8sIHRoaXMuY29tcGFyb3IpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgX2E6IFRbXSA9IFtdO1xuICBwcml2YXRlIF9iOiBUW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25lQ29tcGxldGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcGFyZVRvOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBhcm9yOiAoYTogVCwgYjogVCkgPT4gYm9vbGVhbikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZChjb21wYXJlVG8uc3Vic2NyaWJlKG5ldyBTZXF1ZW5jZUVxdWFsQ29tcGFyZVRvU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgdGhpcykpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vbmVDb21wbGV0ZSAmJiB0aGlzLl9iLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5lbWl0KGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYS5wdXNoKHZhbHVlKTtcbiAgICAgIHRoaXMuY2hlY2tWYWx1ZXMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vbmVDb21wbGV0ZSkge1xuICAgICAgdGhpcy5lbWl0KHRoaXMuX2EubGVuZ3RoID09PSAwICYmIHRoaXMuX2IubGVuZ3RoID09PSAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb25lQ29tcGxldGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVmFsdWVzKCkge1xuICAgIGNvbnN0IHsgX2EsIF9iLCBjb21wYXJvciB9ID0gdGhpcztcbiAgICB3aGlsZSAoX2EubGVuZ3RoID4gMCAmJiBfYi5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgYSA9IF9hLnNoaWZ0KCk7XG4gICAgICBsZXQgYiA9IF9iLnNoaWZ0KCk7XG4gICAgICBsZXQgYXJlRXF1YWwgPSBmYWxzZTtcbiAgICAgIGlmIChjb21wYXJvcikge1xuICAgICAgICBhcmVFcXVhbCA9IHRyeUNhdGNoKGNvbXBhcm9yKShhLCBiKTtcbiAgICAgICAgaWYgKGFyZUVxdWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZUVxdWFsID0gYSA9PT0gYjtcbiAgICAgIH1cbiAgICAgIGlmICghYXJlRXF1YWwpIHtcbiAgICAgICAgdGhpcy5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmV4dEIodmFsdWU6IFQpIHtcbiAgICBpZiAodGhpcy5fb25lQ29tcGxldGUgJiYgdGhpcy5fYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZW1pdChmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2IucHVzaCh2YWx1ZSk7XG4gICAgICB0aGlzLmNoZWNrVmFsdWVzKCk7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFNlcXVlbmNlRXF1YWxDb21wYXJlVG9TdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBPYnNlcnZlcjxSPiwgcHJpdmF0ZSBwYXJlbnQ6IFNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyPFQsIFI+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnQubmV4dEIodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMucGFyZW50LmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMucGFyZW50Ll9jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=