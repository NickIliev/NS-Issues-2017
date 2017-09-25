"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var UsingObservable = (function (_super) {
    __extends(UsingObservable, _super);
    function UsingObservable(resourceFactory, observableFactory) {
        var _this = _super.call(this) || this;
        _this.resourceFactory = resourceFactory;
        _this.observableFactory = observableFactory;
        return _this;
    }
    UsingObservable.create = function (resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
    };
    UsingObservable.prototype._subscribe = function (subscriber) {
        var _a = this, resourceFactory = _a.resourceFactory, observableFactory = _a.observableFactory;
        var resource;
        try {
            resource = resourceFactory();
            return new UsingSubscriber(subscriber, resource, observableFactory);
        }
        catch (err) {
            subscriber.error(err);
        }
    };
    return UsingObservable;
}(Observable_1.Observable));
exports.UsingObservable = UsingObservable;
var UsingSubscriber = (function (_super) {
    __extends(UsingSubscriber, _super);
    function UsingSubscriber(destination, resource, observableFactory) {
        var _this = _super.call(this, destination) || this;
        _this.resource = resource;
        _this.observableFactory = observableFactory;
        destination.add(resource);
        _this.tryUse();
        return _this;
    }
    UsingSubscriber.prototype.tryUse = function () {
        try {
            var source = this.observableFactory.call(this, this.resource);
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    return UsingSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNpbmdPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXNpbmdPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWtFO0FBSWxFLCtEQUE4RDtBQUM5RCxzREFBcUQ7QUFDckQ7Ozs7R0FJRztBQUNIO0lBQXdDLG1DQUFhO0lBT25ELHlCQUFvQixlQUFtRCxFQUNuRCxpQkFBdUY7UUFEM0csWUFFRSxpQkFBTyxTQUNSO1FBSG1CLHFCQUFlLEdBQWYsZUFBZSxDQUFvQztRQUNuRCx1QkFBaUIsR0FBakIsaUJBQWlCLENBQXNFOztJQUUzRyxDQUFDO0lBUk0sc0JBQU0sR0FBYixVQUFpQixlQUFtRCxFQUNuRCxpQkFBdUY7UUFDdEcsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFJLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFPUyxvQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUN0QyxJQUFBLFNBQTZDLEVBQTNDLG9DQUFlLEVBQUUsd0NBQWlCLENBQVU7UUFFcEQsSUFBSSxRQUErQixDQUFDO1FBRXBDLElBQUksQ0FBQztZQUNILFFBQVEsR0FBMEIsZUFBZSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUF4QkQsQ0FBd0MsdUJBQVUsR0F3QmpEO0FBeEJZLDBDQUFlO0FBMEI1QjtJQUFpQyxtQ0FBcUI7SUFDcEQseUJBQVksV0FBMEIsRUFDbEIsUUFBK0IsRUFDL0IsaUJBQXVGO1FBRjNHLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBR25CO1FBTG1CLGNBQVEsR0FBUixRQUFRLENBQXVCO1FBQy9CLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBc0U7UUFFekcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O0lBQ2hCLENBQUM7SUFFTyxnQ0FBTSxHQUFkO1FBQ0UsSUFBSSxDQUFDO1lBQ0gsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDO1FBQ0gsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbkJELENBQWlDLGlDQUFlLEdBbUIvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliYWJsZU9yUHJvbWlzZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFVzaW5nT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIHN0YXRpYyBjcmVhdGU8VD4ocmVzb3VyY2VGYWN0b3J5OiAoKSA9PiBBbm9ueW1vdXNTdWJzY3JpcHRpb24gfCB2b2lkLFxuICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGVGYWN0b3J5OiAocmVzb3VyY2U6IEFub255bW91c1N1YnNjcmlwdGlvbikgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgdm9pZCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgVXNpbmdPYnNlcnZhYmxlPFQ+KHJlc291cmNlRmFjdG9yeSwgb2JzZXJ2YWJsZUZhY3RvcnkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNvdXJjZUZhY3Rvcnk6ICgpID0+IEFub255bW91c1N1YnNjcmlwdGlvbiB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgb2JzZXJ2YWJsZUZhY3Rvcnk6IChyZXNvdXJjZTogQW5vbnltb3VzU3Vic2NyaXB0aW9uKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8VD4gfCB2b2lkKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBjb25zdCB7IHJlc291cmNlRmFjdG9yeSwgb2JzZXJ2YWJsZUZhY3RvcnkgfSA9IHRoaXM7XG5cbiAgICBsZXQgcmVzb3VyY2U6IEFub255bW91c1N1YnNjcmlwdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICByZXNvdXJjZSA9IDxBbm9ueW1vdXNTdWJzY3JpcHRpb24+cmVzb3VyY2VGYWN0b3J5KCk7XG4gICAgICByZXR1cm4gbmV3IFVzaW5nU3Vic2NyaWJlcihzdWJzY3JpYmVyLCByZXNvdXJjZSwgb2JzZXJ2YWJsZUZhY3RvcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBVc2luZ1N1YnNjcmliZXI8VD4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgVD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZTogQW5vbnltb3VzU3Vic2NyaXB0aW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIG9ic2VydmFibGVGYWN0b3J5OiAocmVzb3VyY2U6IEFub255bW91c1N1YnNjcmlwdGlvbikgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgdm9pZCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICBkZXN0aW5hdGlvbi5hZGQocmVzb3VyY2UpO1xuICAgIHRoaXMudHJ5VXNlKCk7XG4gIH1cblxuICBwcml2YXRlIHRyeVVzZSgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5vYnNlcnZhYmxlRmFjdG9yeS5jYWxsKHRoaXMsIHRoaXMucmVzb3VyY2UpO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBzb3VyY2UpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgfVxuICB9XG59Il19