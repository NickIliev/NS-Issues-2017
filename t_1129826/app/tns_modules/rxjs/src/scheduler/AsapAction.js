"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Immediate_1 = require("../util/Immediate");
var AsyncAction_1 = require("./AsyncAction");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            Immediate_1.Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNhcEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFzYXBBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBOEM7QUFDOUMsNkNBQTRDO0FBRzVDOzs7O0dBSUc7QUFDSDtJQUFtQyw4QkFBYztJQUUvQyxvQkFBc0IsU0FBd0IsRUFDeEIsSUFBOEM7UUFEcEUsWUFFRSxrQkFBTSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQ3ZCO1FBSHFCLGVBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsVUFBSSxHQUFKLElBQUksQ0FBMEM7O0lBRXBFLENBQUM7SUFFUyxtQ0FBYyxHQUF4QixVQUF5QixTQUF3QixFQUFFLEVBQVEsRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQzVFLDBEQUEwRDtRQUMxRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxpQkFBTSxjQUFjLFlBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0QscURBQXFEO1FBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLG9FQUFvRTtRQUNwRSwwRUFBMEU7UUFDMUUsc0NBQXNDO1FBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxxQkFBUyxDQUFDLFlBQVksQ0FDekUsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ1MsbUNBQWMsR0FBeEIsVUFBeUIsU0FBd0IsRUFBRSxFQUFRLEVBQUUsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUM1RSxzRUFBc0U7UUFDdEUsc0VBQXNFO1FBQ3RFLDJDQUEyQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsaUJBQU0sY0FBYyxZQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELHNFQUFzRTtRQUN0RSwyRUFBMkU7UUFDM0UsV0FBVztRQUNYLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMscUJBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDbEMsQ0FBQztRQUNELHNGQUFzRjtRQUN0RixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUF0Q0QsQ0FBbUMseUJBQVcsR0FzQzdDO0FBdENZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1tZWRpYXRlIH0gZnJvbSAnLi4vdXRpbC9JbW1lZGlhdGUnO1xuaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcbmltcG9ydCB7IEFzYXBTY2hlZHVsZXIgfSBmcm9tICcuL0FzYXBTY2hlZHVsZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIEFzYXBBY3Rpb248VD4gZXh0ZW5kcyBBc3luY0FjdGlvbjxUPiB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNjaGVkdWxlcjogQXNhcFNjaGVkdWxlcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHdvcms6ICh0aGlzOiBBc2FwQWN0aW9uPFQ+LCBzdGF0ZT86IFQpID0+IHZvaWQpIHtcbiAgICBzdXBlcihzY2hlZHVsZXIsIHdvcmspO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVlc3RBc3luY0lkKHNjaGVkdWxlcjogQXNhcFNjaGVkdWxlciwgaWQ/OiBhbnksIGRlbGF5OiBudW1iZXIgPSAwKTogYW55IHtcbiAgICAvLyBJZiBkZWxheSBpcyBncmVhdGVyIHRoYW4gMCwgcmVxdWVzdCBhcyBhbiBhc3luYyBhY3Rpb24uXG4gICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgcmV0dXJuIHN1cGVyLnJlcXVlc3RBc3luY0lkKHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICB9XG4gICAgLy8gUHVzaCB0aGUgYWN0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIHNjaGVkdWxlciBxdWV1ZS5cbiAgICBzY2hlZHVsZXIuYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgIC8vIElmIGEgbWljcm90YXNrIGhhcyBhbHJlYWR5IGJlZW4gc2NoZWR1bGVkLCBkb24ndCBzY2hlZHVsZSBhbm90aGVyXG4gICAgLy8gb25lLiBJZiBhIG1pY3JvdGFzayBoYXNuJ3QgYmVlbiBzY2hlZHVsZWQgeWV0LCBzY2hlZHVsZSBvbmUgbm93LiBSZXR1cm5cbiAgICAvLyB0aGUgY3VycmVudCBzY2hlZHVsZWQgbWljcm90YXNrIGlkLlxuICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuc2NoZWR1bGVkID0gSW1tZWRpYXRlLnNldEltbWVkaWF0ZShcbiAgICAgIHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgbnVsbClcbiAgICApKTtcbiAgfVxuICBwcm90ZWN0ZWQgcmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyOiBBc2FwU2NoZWR1bGVyLCBpZD86IGFueSwgZGVsYXk6IG51bWJlciA9IDApOiBhbnkge1xuICAgIC8vIElmIGRlbGF5IGV4aXN0cyBhbmQgaXMgZ3JlYXRlciB0aGFuIDAsIG9yIGlmIHRoZSBkZWxheSBpcyBudWxsICh0aGVcbiAgICAvLyBhY3Rpb24gd2Fzbid0IHJlc2NoZWR1bGVkKSBidXQgd2FzIG9yaWdpbmFsbHkgc2NoZWR1bGVkIGFzIGFuIGFzeW5jXG4gICAgLy8gYWN0aW9uLCB0aGVuIHJlY3ljbGUgYXMgYW4gYXN5bmMgYWN0aW9uLlxuICAgIGlmICgoZGVsYXkgIT09IG51bGwgJiYgZGVsYXkgPiAwKSB8fCAoZGVsYXkgPT09IG51bGwgJiYgdGhpcy5kZWxheSA+IDApKSB7XG4gICAgICByZXR1cm4gc3VwZXIucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgc2NoZWR1bGVyIHF1ZXVlIGlzIGVtcHR5LCBjYW5jZWwgdGhlIHJlcXVlc3RlZCBtaWNyb3Rhc2sgYW5kXG4gICAgLy8gc2V0IHRoZSBzY2hlZHVsZWQgZmxhZyB0byB1bmRlZmluZWQgc28gdGhlIG5leHQgQXNhcEFjdGlvbiB3aWxsIHNjaGVkdWxlXG4gICAgLy8gaXRzIG93bi5cbiAgICBpZiAoc2NoZWR1bGVyLmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBJbW1lZGlhdGUuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gUmV0dXJuIHVuZGVmaW5lZCBzbyB0aGUgYWN0aW9uIGtub3dzIHRvIHJlcXVlc3QgYSBuZXcgYXN5bmMgaWQgaWYgaXQncyByZXNjaGVkdWxlZC5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=