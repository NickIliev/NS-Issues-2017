"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/* tslint:enable:max-line-length */
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link empty}
 * @see {@link last}
 *
 * @param {any} [defaultValue=null] The default value used if the source
 * Observable is empty.
 * @return {Observable} An Observable that emits either the specified
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdElmRW1wdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0SWZFbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDRDQUEyQztBQUszQyxtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsd0JBQTBELFlBQXNCO0lBQXRCLDZCQUFBLEVBQUEsbUJBQXNCO0lBQzlFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRkQsd0NBRUM7QUFFRDtJQUVFLGdDQUFvQixZQUFlO1FBQWYsaUJBQVksR0FBWixZQUFZLENBQUc7SUFDbkMsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxVQUE2QixFQUFFLE1BQVc7UUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBNkMsNENBQWE7SUFHeEQsa0NBQVksV0FBOEIsRUFBVSxZQUFlO1FBQW5FLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBRm1ELGtCQUFZLEdBQVosWUFBWSxDQUFHO1FBRjNELGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBSWhDLENBQUM7SUFFUyx3Q0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLDRDQUFTLEdBQW5CO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUFsQkQsQ0FBNkMsdUJBQVUsR0FrQnREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZkVtcHR5PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGRlZmF1bHRWYWx1ZT86IFQpOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZkVtcHR5PFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGRlZmF1bHRWYWx1ZT86IFIpOiBPYnNlcnZhYmxlPFQgfCBSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogRW1pdHMgYSBnaXZlbiB2YWx1ZSBpZiB0aGUgc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzIHdpdGhvdXQgZW1pdHRpbmcgYW55XG4gKiBgbmV4dGAgdmFsdWUsIG90aGVyd2lzZSBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHR1cm5zIG91dCB0byBiZSBlbXB0eSwgdGhlblxuICogdGhpcyBvcGVyYXRvciB3aWxsIGVtaXQgYSBkZWZhdWx0IHZhbHVlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RlZmF1bHRJZkVtcHR5LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBkZWZhdWx0SWZFbXB0eWAgZW1pdHMgdGhlIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBvciBhXG4gKiBzcGVjaWZpZWQgZGVmYXVsdCB2YWx1ZSBpZiB0aGUgc291cmNlIE9ic2VydmFibGUgaXMgZW1wdHkgKGNvbXBsZXRlcyB3aXRob3V0XG4gKiBoYXZpbmcgZW1pdHRlZCBhbnkgYG5leHRgIHZhbHVlKS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5JZiBubyBjbGlja3MgaGFwcGVuIGluIDUgc2Vjb25kcywgdGhlbiBlbWl0IFwibm8gY2xpY2tzXCI8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGNsaWNrc0JlZm9yZUZpdmUgPSBjbGlja3MudGFrZVVudGlsKFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoNTAwMCkpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrc0JlZm9yZUZpdmUuZGVmYXVsdElmRW1wdHkoJ25vIGNsaWNrcycpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBlbXB0eX1cbiAqIEBzZWUge0BsaW5rIGxhc3R9XG4gKlxuICogQHBhcmFtIHthbnl9IFtkZWZhdWx0VmFsdWU9bnVsbF0gVGhlIGRlZmF1bHQgdmFsdWUgdXNlZCBpZiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGlzIGVtcHR5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGVpdGhlciB0aGUgc3BlY2lmaWVkXG4gKiBgZGVmYXVsdFZhbHVlYCBpZiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgbm8gaXRlbXMsIG9yIHRoZSB2YWx1ZXMgZW1pdHRlZFxuICogYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBkZWZhdWx0SWZFbXB0eVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZkVtcHR5PFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGRlZmF1bHRWYWx1ZTogUiA9IG51bGwpOiBPYnNlcnZhYmxlPFQgfCBSPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERlZmF1bHRJZkVtcHR5T3BlcmF0b3IoZGVmYXVsdFZhbHVlKSk7XG59XG5cbmNsYXNzIERlZmF1bHRJZkVtcHR5T3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUIHwgUj4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVmYXVsdFZhbHVlOiBSKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VCB8IFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IERlZmF1bHRJZkVtcHR5U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmRlZmF1bHRWYWx1ZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBEZWZhdWx0SWZFbXB0eVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpc0VtcHR5OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUIHwgUj4sIHByaXZhdGUgZGVmYXVsdFZhbHVlOiBSKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5pc0VtcHR5ID0gZmFsc2U7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eSkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=