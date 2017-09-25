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
     * for testing purposes or for composing with other Observables. Please note
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV2ZXJPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmV2ZXJPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTJDO0FBRTNDLHFDQUFvQztBQUVwQzs7OztHQUlHO0FBQ0g7SUFBd0MsbUNBQWE7SUFvQ25EO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBckNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSSxzQkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksZUFBZSxFQUFLLENBQUM7SUFDbEMsQ0FBQztJQU1TLG9DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLFdBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUF3Qyx1QkFBVSxHQTJDakQ7QUEzQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbC9ub29wJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBOZXZlck9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlci5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkFuIE9ic2VydmFibGUgdGhhdCBuZXZlciBlbWl0cyBhbnl0aGluZy48L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvbmV2ZXIucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gICAqIG5laXRoZXIgdmFsdWVzIG5vciBlcnJvcnMgbm9yIHRoZSBjb21wbGV0aW9uIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWRcbiAgICogZm9yIHRlc3RpbmcgcHVycG9zZXMgb3IgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyIE9ic2VydmFibGVzLiBQbGVhc2Ugbm90ZVxuICAgKiB0aGF0IGJ5IG5ldmVyIGVtaXR0aW5nIGEgY29tcGxldGUgbm90aWZpY2F0aW9uLCB0aGlzIE9ic2VydmFibGUga2VlcHMgdGhlXG4gICAqIHN1YnNjcmlwdGlvbiBmcm9tIGJlaW5nIGRpc3Bvc2VkIGF1dG9tYXRpY2FsbHkuIFN1YnNjcmlwdGlvbnMgbmVlZCB0byBiZVxuICAgKiBtYW51YWxseSBkaXNwb3NlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gbmV2ZXIgZW1pdCBhbnl0aGluZyBlbHNlIChub3QgZXZlbiBjb21wbGV0ZSkuPC9jYXB0aW9uPlxuICAgKiBmdW5jdGlvbiBpbmZvKCkge1xuICAgKiAgIGNvbnNvbGUubG9nKCdXaWxsIG5vdCBiZSBjYWxsZWQnKTtcbiAgICogfVxuICAgKiB2YXIgcmVzdWx0ID0gUnguT2JzZXJ2YWJsZS5uZXZlcigpLnN0YXJ0V2l0aCg3KTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBpbmZvLCBpbmZvKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKiBAc2VlIHtAbGluayBlbXB0eX1cbiAgICogQHNlZSB7QGxpbmsgb2Z9XG4gICAqIEBzZWUge0BsaW5rIHRocm93fVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBIFwibmV2ZXJcIiBPYnNlcnZhYmxlOiBuZXZlciBlbWl0cyBhbnl0aGluZy5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIG5ldmVyXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KCkge1xuICAgIHJldHVybiBuZXcgTmV2ZXJPYnNlcnZhYmxlPFQ+KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IHZvaWQge1xuICAgIG5vb3AoKTtcbiAgfVxufVxuIl19