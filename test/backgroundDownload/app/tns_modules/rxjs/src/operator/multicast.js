"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectableObservable_1 = require("../observable/ConnectableObservable");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return connectable;
}
exports.multicast = multicast;
var MulticastOperator = (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
exports.MulticastOperator = MulticastOperator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGljYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNkVBQTZHO0FBSzdHLG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsbUJBQWtELHVCQUF3RCxFQUM3RSxRQUFtRDtJQUM5RSxJQUFJLGNBQWdDLENBQUM7SUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyx1QkFBdUIsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xELGNBQWMsR0FBcUIsdUJBQXVCLENBQUM7SUFDN0QsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sY0FBYyxHQUFHO1lBQ2YsTUFBTSxDQUFhLHVCQUF1QixDQUFDO1FBQzdDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELElBQU0sV0FBVyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHVEQUErQixDQUFDLENBQUM7SUFDOUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDMUIsV0FBVyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFFNUMsTUFBTSxDQUE0QixXQUFXLENBQUM7QUFDaEQsQ0FBQztBQXBCRCw4QkFvQkM7QUFLRDtJQUNFLDJCQUFvQixjQUFnQyxFQUNoQyxRQUFrRDtRQURsRCxtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEM7SUFDdEUsQ0FBQztJQUNELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDakMsSUFBQSx3QkFBUSxDQUFVO1FBQzFCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdELFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgY29ubmVjdGFibGVPYnNlcnZhYmxlRGVzY3JpcHRvciB9IGZyb20gJy4uL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGljYXN0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHN1YmplY3RPclN1YmplY3RGYWN0b3J5OiBmYWN0b3J5T3JWYWx1ZTxTdWJqZWN0PFQ+Pik6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBtdWx0aWNhc3Q8VD4oU3ViamVjdEZhY3Rvcnk6ICh0aGlzOiBPYnNlcnZhYmxlPFQ+KSA9PiBTdWJqZWN0PFQ+LCBzZWxlY3Rvcj86IHNlbGVjdG9yPFQ+KTogT2JzZXJ2YWJsZTxUPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2YgaW52b2tpbmcgYSBzcGVjaWZpZWQgc2VsZWN0b3Igb24gaXRlbXNcbiAqIGVtaXR0ZWQgYnkgYSBDb25uZWN0YWJsZU9ic2VydmFibGUgdGhhdCBzaGFyZXMgYSBzaW5nbGUgc3Vic2NyaXB0aW9uIHRvIHRoZSB1bmRlcmx5aW5nIHN0cmVhbS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL211bHRpY2FzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN1YmplY3R9IHN1YmplY3RPclN1YmplY3RGYWN0b3J5IC0gRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gaW50ZXJtZWRpYXRlIHN1YmplY3QgdGhyb3VnaFxuICogd2hpY2ggdGhlIHNvdXJjZSBzZXF1ZW5jZSdzIGVsZW1lbnRzIHdpbGwgYmUgbXVsdGljYXN0IHRvIHRoZSBzZWxlY3RvciBmdW5jdGlvblxuICogb3IgU3ViamVjdCB0byBwdXNoIHNvdXJjZSBlbGVtZW50cyBpbnRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3NlbGVjdG9yXSAtIE9wdGlvbmFsIHNlbGVjdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIHVzZSB0aGUgbXVsdGljYXN0ZWQgc291cmNlIHN0cmVhbVxuICogYXMgbWFueSB0aW1lcyBhcyBuZWVkZWQsIHdpdGhvdXQgY2F1c2luZyBtdWx0aXBsZSBzdWJzY3JpcHRpb25zIHRvIHRoZSBzb3VyY2Ugc3RyZWFtLlxuICogU3Vic2NyaWJlcnMgdG8gdGhlIGdpdmVuIHNvdXJjZSB3aWxsIHJlY2VpdmUgYWxsIG5vdGlmaWNhdGlvbnMgb2YgdGhlIHNvdXJjZSBmcm9tIHRoZVxuICogdGltZSBvZiB0aGUgc3Vic2NyaXB0aW9uIGZvcndhcmQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2YgaW52b2tpbmcgdGhlIHNlbGVjdG9yXG4gKiBvbiB0aGUgaXRlbXMgZW1pdHRlZCBieSBhIGBDb25uZWN0YWJsZU9ic2VydmFibGVgIHRoYXQgc2hhcmVzIGEgc2luZ2xlIHN1YnNjcmlwdGlvbiB0b1xuICogdGhlIHVuZGVybHlpbmcgc3RyZWFtLlxuICogQG1ldGhvZCBtdWx0aWNhc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aWNhc3Q8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgc3ViamVjdE9yU3ViamVjdEZhY3Rvcnk6IFN1YmplY3Q8VD4gfCAoKCkgPT4gU3ViamVjdDxUPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yPzogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4gfCBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4ge1xuICBsZXQgc3ViamVjdEZhY3Rvcnk6ICgpID0+IFN1YmplY3Q8VD47XG4gIGlmICh0eXBlb2Ygc3ViamVjdE9yU3ViamVjdEZhY3RvcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzdWJqZWN0RmFjdG9yeSA9IDwoKSA9PiBTdWJqZWN0PFQ+PnN1YmplY3RPclN1YmplY3RGYWN0b3J5O1xuICB9IGVsc2Uge1xuICAgIHN1YmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gc3ViamVjdEZhY3RvcnkoKSB7XG4gICAgICByZXR1cm4gPFN1YmplY3Q8VD4+c3ViamVjdE9yU3ViamVjdEZhY3Rvcnk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBNdWx0aWNhc3RPcGVyYXRvcihzdWJqZWN0RmFjdG9yeSwgc2VsZWN0b3IpKTtcbiAgfVxuXG4gIGNvbnN0IGNvbm5lY3RhYmxlOiBhbnkgPSBPYmplY3QuY3JlYXRlKHRoaXMsIGNvbm5lY3RhYmxlT2JzZXJ2YWJsZURlc2NyaXB0b3IpO1xuICBjb25uZWN0YWJsZS5zb3VyY2UgPSB0aGlzO1xuICBjb25uZWN0YWJsZS5zdWJqZWN0RmFjdG9yeSA9IHN1YmplY3RGYWN0b3J5O1xuXG4gIHJldHVybiA8Q29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+PiBjb25uZWN0YWJsZTtcbn1cblxuZXhwb3J0IHR5cGUgZmFjdG9yeU9yVmFsdWU8VD4gPSBUIHwgKCgpID0+IFQpO1xuZXhwb3J0IHR5cGUgc2VsZWN0b3I8VD4gPSAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+O1xuXG5leHBvcnQgY2xhc3MgTXVsdGljYXN0T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3ViamVjdEZhY3Rvcnk6ICgpID0+IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VsZWN0b3I6IChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD4pIHtcbiAgfVxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICBjb25zdCB7IHNlbGVjdG9yIH0gPSB0aGlzO1xuICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLnN1YmplY3RGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gc2VsZWN0b3Ioc3ViamVjdCkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIHN1YnNjcmlwdGlvbi5hZGQoc291cmNlLnN1YnNjcmliZShzdWJqZWN0KSk7XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfVxufVxuIl19