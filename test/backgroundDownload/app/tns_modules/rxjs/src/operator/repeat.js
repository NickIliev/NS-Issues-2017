"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var EmptyObservable_1 = require("../observable/EmptyObservable");
/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
 * an empty Observable.
 * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
 * count times.
 * @method repeat
 * @owner Observable
 */
function repeat(count) {
    if (count === void 0) { count = -1; }
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
exports.repeat = repeat;
var RepeatOperator = (function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RepeatSubscriber = (function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RepeatSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBRTNDLGlFQUFnRTtBQUdoRTs7Ozs7Ozs7Ozs7R0FXRztBQUNILGdCQUErQyxLQUFrQjtJQUFsQixzQkFBQSxFQUFBLFNBQWlCLENBQUM7SUFDL0QsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksaUNBQWUsRUFBSyxDQUFDO0lBQ2xDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztBQUNILENBQUM7QUFSRCx3QkFRQztBQUVEO0lBQ0Usd0JBQW9CLEtBQWEsRUFDYixNQUFxQjtRQURyQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUN6QyxDQUFDO0lBQ0QsNkJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWtDLG9DQUFhO0lBQzdDLDBCQUFZLFdBQTRCLEVBQ3BCLEtBQWEsRUFDYixNQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixXQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsWUFBTSxHQUFOLE1BQU0sQ0FBZTs7SUFFekMsQ0FBQztJQUNELG1DQUFRLEdBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBQSxTQUF3QixFQUF0QixrQkFBTSxFQUFFLGdCQUFLLENBQVU7WUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBakJELENBQWtDLHVCQUFVLEdBaUIzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRW1wdHlPYnNlcnZhYmxlIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9FbXB0eU9ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcmVwZWF0cyB0aGUgc3RyZWFtIG9mIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IG1vc3QgY291bnQgdGltZXMuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9yZXBlYXQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gVGhlIG51bWJlciBvZiB0aW1lcyB0aGUgc291cmNlIE9ic2VydmFibGUgaXRlbXMgYXJlIHJlcGVhdGVkLCBhIGNvdW50IG9mIDAgd2lsbCB5aWVsZFxuICogYW4gZW1wdHkgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCByZXBlYXRzIHRoZSBzdHJlYW0gb2YgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgbW9zdFxuICogY291bnQgdGltZXMuXG4gKiBAbWV0aG9kIHJlcGVhdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjb3VudDogbnVtYmVyID0gLTEpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGU8VD4oKTtcbiAgfSBlbHNlIGlmIChjb3VudCA8IDApIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZXBlYXRPcGVyYXRvcigtMSwgdGhpcykpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFJlcGVhdE9wZXJhdG9yKGNvdW50IC0gMSwgdGhpcykpO1xuICB9XG59XG5cbmNsYXNzIFJlcGVhdE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdW50OiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSB7XG4gIH1cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBSZXBlYXRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuY291bnQsIHRoaXMuc291cmNlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFJlcGVhdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb3VudDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuICBjb21wbGV0ZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICBjb25zdCB7IHNvdXJjZSwgY291bnQgfSA9IHRoaXM7XG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNvbXBsZXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKGNvdW50ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNvdXJjZS5zdWJzY3JpYmUodGhpcy5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlKCkpO1xuICAgIH1cbiAgfVxufVxuIl19