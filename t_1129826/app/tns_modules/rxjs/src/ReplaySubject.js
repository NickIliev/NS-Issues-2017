"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("./Subject");
var queue_1 = require("./scheduler/queue");
var Subscription_1 = require("./Subscription");
var observeOn_1 = require("./operator/observeOn");
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
var SubjectSubscription_1 = require("./SubjectSubscription");
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGF5U3ViamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcGxheVN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBb0M7QUFFcEMsMkNBQTBDO0FBRTFDLCtDQUE4QztBQUM5QyxrREFBMkQ7QUFDM0QsMEVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RDs7R0FFRztBQUNIO0lBQXNDLGlDQUFVO0lBSzlDLHVCQUFZLFVBQTZDLEVBQzdDLFVBQTZDLEVBQ3JDLFNBQXNCO1FBRjlCLDJCQUFBLEVBQUEsYUFBcUIsTUFBTSxDQUFDLGlCQUFpQjtRQUM3QywyQkFBQSxFQUFBLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFEekQsWUFHRSxpQkFBTyxTQUdSO1FBSm1CLGVBQVMsR0FBVCxTQUFTLENBQWE7UUFObEMsYUFBTyxHQUFxQixFQUFFLENBQUM7UUFRckMsS0FBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDbkQsS0FBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7O0lBQ3JELENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssS0FBUTtRQUNYLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxpQkFBTSxJQUFJLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVTLGtDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxT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akUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF2RkQsQ0FBc0MsaUJBQU8sR0F1RjVDO0FBdkZZLHNDQUFhO0FBeUYxQjtJQUNFLHFCQUFtQixJQUFZLEVBQVMsS0FBUTtRQUE3QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBRztJQUNoRCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL1N1YmplY3QnO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4vU2NoZWR1bGVyJztcbmltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi9zY2hlZHVsZXIvcXVldWUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZlT25TdWJzY3JpYmVyIH0gZnJvbSAnLi9vcGVyYXRvci9vYnNlcnZlT24nO1xuaW1wb3J0IHsgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3ViamVjdFN1YnNjcmlwdGlvbic7XG4vKipcbiAqIEBjbGFzcyBSZXBsYXlTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBsYXlTdWJqZWN0PFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIHByaXZhdGUgX2V2ZW50czogUmVwbGF5RXZlbnQ8VD5bXSA9IFtdO1xuICBwcml2YXRlIF9idWZmZXJTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgX3dpbmRvd1RpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihidWZmZXJTaXplOiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICAgIHdpbmRvd1RpbWU6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9idWZmZXJTaXplID0gYnVmZmVyU2l6ZSA8IDEgPyAxIDogYnVmZmVyU2l6ZTtcbiAgICB0aGlzLl93aW5kb3dUaW1lID0gd2luZG93VGltZSA8IDEgPyAxIDogd2luZG93VGltZTtcbiAgfVxuXG4gIG5leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSB0aGlzLl9nZXROb3coKTtcbiAgICB0aGlzLl9ldmVudHMucHVzaChuZXcgUmVwbGF5RXZlbnQobm93LCB2YWx1ZSkpO1xuICAgIHRoaXMuX3RyaW1CdWZmZXJUaGVuR2V0RXZlbnRzKCk7XG4gICAgc3VwZXIubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBfZXZlbnRzID0gdGhpcy5fdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICBsZXQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgc3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIHN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHN1YnNjcmliZXIuYWRkKHN1YnNjcmliZXIgPSBuZXcgT2JzZXJ2ZU9uU3Vic2NyaWJlcjxUPihzdWJzY3JpYmVyLCBzY2hlZHVsZXIpKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW4gPSBfZXZlbnRzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgc3Vic2NyaWJlci5uZXh0KF9ldmVudHNbaV0udmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgX2dldE5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5zY2hlZHVsZXIgfHwgcXVldWUpLm5vdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTogUmVwbGF5RXZlbnQ8VD5bXSB7XG4gICAgY29uc3Qgbm93ID0gdGhpcy5fZ2V0Tm93KCk7XG4gICAgY29uc3QgX2J1ZmZlclNpemUgPSB0aGlzLl9idWZmZXJTaXplO1xuICAgIGNvbnN0IF93aW5kb3dUaW1lID0gdGhpcy5fd2luZG93VGltZTtcbiAgICBjb25zdCBfZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gICAgbGV0IGV2ZW50c0NvdW50ID0gX2V2ZW50cy5sZW5ndGg7XG4gICAgbGV0IHNwbGljZUNvdW50ID0gMDtcblxuICAgIC8vIFRyaW0gZXZlbnRzIHRoYXQgZmFsbCBvdXQgb2YgdGhlIHRpbWUgd2luZG93LlxuICAgIC8vIFN0YXJ0IGF0IHRoZSBmcm9udCBvZiB0aGUgbGlzdC4gQnJlYWsgZWFybHkgb25jZVxuICAgIC8vIHdlIGVuY291bnRlciBhbiBldmVudCB0aGF0IGZhbGxzIHdpdGhpbiB0aGUgd2luZG93LlxuICAgIHdoaWxlIChzcGxpY2VDb3VudCA8IGV2ZW50c0NvdW50KSB7XG4gICAgICBpZiAoKG5vdyAtIF9ldmVudHNbc3BsaWNlQ291bnRdLnRpbWUpIDwgX3dpbmRvd1RpbWUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBzcGxpY2VDb3VudCsrO1xuICAgIH1cblxuICAgIGlmIChldmVudHNDb3VudCA+IF9idWZmZXJTaXplKSB7XG4gICAgICBzcGxpY2VDb3VudCA9IE1hdGgubWF4KHNwbGljZUNvdW50LCBldmVudHNDb3VudCAtIF9idWZmZXJTaXplKTtcbiAgICB9XG5cbiAgICBpZiAoc3BsaWNlQ291bnQgPiAwKSB7XG4gICAgICBfZXZlbnRzLnNwbGljZSgwLCBzcGxpY2VDb3VudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ldmVudHM7XG4gIH1cbn1cblxuY2xhc3MgUmVwbGF5RXZlbnQ8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGltZTogbnVtYmVyLCBwdWJsaWMgdmFsdWU6IFQpIHtcbiAgfVxufVxuIl19