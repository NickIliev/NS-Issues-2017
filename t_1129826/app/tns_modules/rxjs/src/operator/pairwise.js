"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 *
 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
 * consecutive values from the source Observable.
 * @method pairwise
 * @owner Observable
 */
function pairwise() {
    return this.lift(new PairwiseOperator());
}
exports.pairwise = pairwise;
var PairwiseOperator = (function () {
    function PairwiseOperator() {
    }
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var PairwiseSubscriber = (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcndpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWlyd2lzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDRDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNIO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFIQywrQkFBSSxHQUFKLFVBQUssVUFBOEIsRUFBRSxNQUFXO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFvQyxzQ0FBYTtJQUkvQyw0QkFBWSxXQUErQjtRQUEzQyxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUpPLGFBQU8sR0FBWSxLQUFLLENBQUM7O0lBSWpDLENBQUM7SUFFRCxrQ0FBSyxHQUFMLFVBQU0sS0FBUTtRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBakJELENBQW9DLHVCQUFVLEdBaUI3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIEdyb3VwcyBwYWlycyBvZiBjb25zZWN1dGl2ZSBlbWlzc2lvbnMgdG9nZXRoZXIgYW5kIGVtaXRzIHRoZW0gYXMgYW4gYXJyYXkgb2ZcbiAqIHR3byB2YWx1ZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlB1dHMgdGhlIGN1cnJlbnQgdmFsdWUgYW5kIHByZXZpb3VzIHZhbHVlIHRvZ2V0aGVyIGFzXG4gKiBhbiBhcnJheSwgYW5kIGVtaXRzIHRoYXQuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGFpcndpc2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogVGhlIE50aCBlbWlzc2lvbiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aWxsIGNhdXNlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogdG8gZW1pdCBhbiBhcnJheSBbKE4tMSl0aCwgTnRoXSBvZiB0aGUgcHJldmlvdXMgYW5kIHRoZSBjdXJyZW50IHZhbHVlLCBhcyBhXG4gKiBwYWlyLiBGb3IgdGhpcyByZWFzb24sIGBwYWlyd2lzZWAgZW1pdHMgb24gdGhlIHNlY29uZCBhbmQgc3Vic2VxdWVudFxuICogZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBidXQgbm90IG9uIHRoZSBmaXJzdCBlbWlzc2lvbiwgYmVjYXVzZVxuICogdGhlcmUgaXMgbm8gcHJldmlvdXMgdmFsdWUgaW4gdGhhdCBjYXNlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrIChzdGFydGluZyBmcm9tIHRoZSBzZWNvbmQpLCBlbWl0IHRoZSByZWxhdGl2ZSBkaXN0YW5jZSB0byB0aGUgcHJldmlvdXMgY2xpY2s8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBhaXJzID0gY2xpY2tzLnBhaXJ3aXNlKCk7XG4gKiB2YXIgZGlzdGFuY2UgPSBwYWlycy5tYXAocGFpciA9PiB7XG4gKiAgIHZhciB4MCA9IHBhaXJbMF0uY2xpZW50WDtcbiAqICAgdmFyIHkwID0gcGFpclswXS5jbGllbnRZO1xuICogICB2YXIgeDEgPSBwYWlyWzFdLmNsaWVudFg7XG4gKiAgIHZhciB5MSA9IHBhaXJbMV0uY2xpZW50WTtcbiAqICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MCAtIHgxLCAyKSArIE1hdGgucG93KHkwIC0geTEsIDIpKTtcbiAqIH0pO1xuICogZGlzdGFuY2Uuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlckNvdW50fVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8QXJyYXk8VD4+fSBBbiBPYnNlcnZhYmxlIG9mIHBhaXJzIChhcyBhcnJheXMpIG9mXG4gKiBjb25zZWN1dGl2ZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHBhaXJ3aXNlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFpcndpc2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8W1QsIFRdPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFBhaXJ3aXNlT3BlcmF0b3IoKSk7XG59XG5cbmNsYXNzIFBhaXJ3aXNlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBbVCwgVF0+IHtcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFtULCBUXT4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgUGFpcndpc2VTdWJzY3JpYmVyKHN1YnNjcmliZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgUGFpcndpc2VTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgcHJldjogVDtcbiAgcHJpdmF0ZSBoYXNQcmV2OiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8W1QsIFRdPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzUHJldikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KFt0aGlzLnByZXYsIHZhbHVlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzUHJldiA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2ID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==