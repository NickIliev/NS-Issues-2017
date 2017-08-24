"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var noop_1 = require("../util/noop");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var NeverObservable = (function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
        return _super.call(this) || this;
    }
    /**
     * Creates an Observable that emits no items to the Observer.
     *
     * <span class="informal">An Observable that never emits anything.</span>
     *
     * <img src="./img/never.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that emits
     * neither values nor errors nor the completion notification. It can be used
     * for testing purposes or for composing with other Observables. Please not
     * that by never emitting a complete notification, this Observable keeps the
     * subscription from being disposed automatically. Subscriptions need to be
     * manually disposed.
     *
     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
     * function info() {
     *   console.log('Will not be called');
     * }
     * var result = Rx.Observable.never().startWith(7);
     * result.subscribe(x => console.log(x), info, info);
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link of}
     * @see {@link throw}
     *
     * @return {Observable} A "never" Observable: never emits anything.
     * @static true
     * @name never
     * @owner Observable
     */
    NeverObservable.create = function () {
        return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return NeverObservable;
}(Observable_1.Observable));
exports.NeverObservable = NeverObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV2ZXJPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmV2ZXJPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTJDO0FBRTNDLHFDQUFvQztBQUVwQzs7OztHQUlHO0FBQ0g7SUFBd0MsbUNBQWE7SUFvQ25EO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBckNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSSxzQkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksZUFBZSxFQUFLLENBQUM7SUFDbEMsQ0FBQztJQU1TLG9DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLFdBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUF3Qyx1QkFBVSxHQTJDakQ7QUEzQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbC9ub29wJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBOZXZlck9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlci5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkFuIE9ic2VydmFibGUgdGhhdCBuZXZlciBlbWl0cyBhbnl0aGluZy48L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvbmV2ZXIucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gICAqIG5laXRoZXIgdmFsdWVzIG5vciBlcnJvcnMgbm9yIHRoZSBjb21wbGV0aW9uIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWRcbiAgICogZm9yIHRlc3RpbmcgcHVycG9zZXMgb3IgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyIE9ic2VydmFibGVzLiBQbGVhc2Ugbm90XG4gICAqIHRoYXQgYnkgbmV2ZXIgZW1pdHRpbmcgYSBjb21wbGV0ZSBub3RpZmljYXRpb24sIHRoaXMgT2JzZXJ2YWJsZSBrZWVwcyB0aGVcbiAgICogc3Vic2NyaXB0aW9uIGZyb20gYmVpbmcgZGlzcG9zZWQgYXV0b21hdGljYWxseS4gU3Vic2NyaXB0aW9ucyBuZWVkIHRvIGJlXG4gICAqIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBudW1iZXIgNywgdGhlbiBuZXZlciBlbWl0IGFueXRoaW5nIGVsc2UgKG5vdCBldmVuIGNvbXBsZXRlKS48L2NhcHRpb24+XG4gICAqIGZ1bmN0aW9uIGluZm8oKSB7XG4gICAqICAgY29uc29sZS5sb2coJ1dpbGwgbm90IGJlIGNhbGxlZCcpO1xuICAgKiB9XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLm5ldmVyKCkuc3RhcnRXaXRoKDcpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGluZm8sIGluZm8pO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAqXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEEgXCJuZXZlclwiIE9ic2VydmFibGU6IG5ldmVyIGVtaXRzIGFueXRoaW5nLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgbmV2ZXJcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oKSB7XG4gICAgcmV0dXJuIG5ldyBOZXZlck9ic2VydmFibGU8VD4oKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogdm9pZCB7XG4gICAgbm9vcCgpO1xuICB9XG59XG4iXX0=