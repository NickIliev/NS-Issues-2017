"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var ScalarObservable_1 = require("./ScalarObservable");
var EmptyObservable_1 = require("./EmptyObservable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        var _this = _super.call(this) || this;
        _this.arrayLike = arrayLike;
        _this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            _this._isScalar = true;
            _this.value = arrayLike[0];
        }
        return _this;
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlMaWtlT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFycmF5TGlrZU9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBMkM7QUFDM0MsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUlwRDs7OztHQUlHO0FBQ0g7SUFBNEMsdUNBQWE7SUFtQ3ZELDZCQUFvQixTQUF1QixFQUFVLFNBQXNCO1FBQTNFLFlBQ0UsaUJBQU8sU0FLUjtRQU5tQixlQUFTLEdBQVQsU0FBUyxDQUFjO1FBQVUsZUFBUyxHQUFULFNBQVMsQ0FBYTtRQUV6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7SUFDSCxDQUFDO0lBdkNNLDBCQUFNLEdBQWIsVUFBaUIsU0FBdUIsRUFBRSxTQUFzQjtRQUM5RCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLGlDQUFlLEVBQUssQ0FBQztRQUNsQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLG1DQUFnQixDQUFTLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQztJQUNILENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLEtBQVU7UUFDaEIsSUFBQSwyQkFBUyxFQUFFLG1CQUFLLEVBQUUscUJBQU0sRUFBRSw2QkFBVSxDQUFXO1FBRXZELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQWFTLHdDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNSLElBQUEsU0FBK0IsRUFBN0Isd0JBQVMsRUFBRSx3QkFBUyxDQUFVO1FBQ3RDLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ3pELFNBQVMsV0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQTthQUNyQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEQsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBM0RELENBQTRDLHVCQUFVLEdBMkRyRDtBQTNEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFNjYWxhck9ic2VydmFibGUgfSBmcm9tICcuL1NjYWxhck9ic2VydmFibGUnO1xuaW1wb3J0IHsgRW1wdHlPYnNlcnZhYmxlIH0gZnJvbSAnLi9FbXB0eU9ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgQXJyYXlMaWtlT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIHN0YXRpYyBjcmVhdGU8VD4oYXJyYXlMaWtlOiBBcnJheUxpa2U8VD4sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheUxpa2UubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KCk7XG4gICAgfSBlbHNlIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgU2NhbGFyT2JzZXJ2YWJsZTxUPig8YW55PmFycmF5TGlrZVswXSwgc2NoZWR1bGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUxpa2VPYnNlcnZhYmxlKGFycmF5TGlrZSwgc2NoZWR1bGVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2goc3RhdGU6IGFueSkge1xuICAgIGNvbnN0IHsgYXJyYXlMaWtlLCBpbmRleCwgbGVuZ3RoLCBzdWJzY3JpYmVyIH0gPSBzdGF0ZTtcblxuICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlMaWtlW2luZGV4XSk7XG5cbiAgICBzdGF0ZS5pbmRleCA9IGluZGV4ICsgMTtcblxuICAgICg8YW55PiB0aGlzKS5zY2hlZHVsZShzdGF0ZSk7XG4gIH1cblxuICAvLyB2YWx1ZSB1c2VkIGlmIEFycmF5IGhhcyBvbmUgdmFsdWUgYW5kIF9pc1NjYWxhclxuICBwcml2YXRlIHZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcnJheUxpa2U6IEFycmF5TGlrZTxUPiwgcHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoIXNjaGVkdWxlciAmJiBhcnJheUxpa2UubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICB0aGlzLnZhbHVlID0gYXJyYXlMaWtlWzBdO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGNvbnN0IHsgYXJyYXlMaWtlLCBzY2hlZHVsZXIgfSA9IHRoaXM7XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyYXlMaWtlLmxlbmd0aDtcblxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoQXJyYXlMaWtlT2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICBhcnJheUxpa2UsIGluZGV4LCBsZW5ndGgsIHN1YnNjcmliZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlMaWtlW2ldKTtcbiAgICAgIH1cbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==