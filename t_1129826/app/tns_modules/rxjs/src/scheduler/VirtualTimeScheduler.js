"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncAction_1 = require("./AsyncAction");
var AsyncScheduler_1 = require("./AsyncScheduler");
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    /**
     * Prompt the Scheduler to execute all of its queued actions, therefore
     * clearing its queue.
     * @return {void}
     */
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = scheduler.index += 1; }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        // If an action is rescheduled, we save allocations by mutating its state,
        // pushing it to the end of the scheduler queue, and recycling the action.
        // But since the VirtualTimeScheduler is used for testing, VirtualActions
        // must be immutable so they can be inspected later.
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlydHVhbFRpbWVTY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWaXJ0dWFsVGltZVNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUU1QyxtREFBa0Q7QUFFbEQ7SUFBMEMsd0NBQWM7SUFPdEQsOEJBQVksZUFBbUQsRUFDNUMsU0FBNEM7UUFEbkQsZ0NBQUEsRUFBQSwrQkFBbUQ7UUFDNUMsMEJBQUEsRUFBQSxZQUFvQixNQUFNLENBQUMsaUJBQWlCO1FBRC9ELFlBRUUsa0JBQU0sZUFBZSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQyxTQUN6QztRQUZrQixlQUFTLEdBQVQsU0FBUyxDQUFtQztRQUp4RCxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUFLMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBSyxHQUFaO1FBRVEsSUFBQSxTQUEyQixFQUExQixvQkFBTyxFQUFFLHdCQUFTLENBQVM7UUFDbEMsSUFBSSxLQUFVLEVBQUUsTUFBd0IsQ0FBQztRQUV6QyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7WUFDOUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxLQUFLLENBQUM7WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDaEMsTUFB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QUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBMURELENBQXNDLHlCQUFXLEdBMERoRDtBQTFEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQXN5bmNTY2hlZHVsZXIgfSBmcm9tICcuL0FzeW5jU2NoZWR1bGVyJztcblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxUaW1lU2NoZWR1bGVyIGV4dGVuZHMgQXN5bmNTY2hlZHVsZXIge1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgZnJhbWVUaW1lRmFjdG9yOiBudW1iZXIgPSAxMDtcblxuICBwdWJsaWMgZnJhbWU6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgY29uc3RydWN0b3IoU2NoZWR1bGVyQWN0aW9uOiB0eXBlb2YgQXN5bmNBY3Rpb24gPSBWaXJ0dWFsQWN0aW9uLFxuICAgICAgICAgICAgICBwdWJsaWMgbWF4RnJhbWVzOiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgICBzdXBlcihTY2hlZHVsZXJBY3Rpb24sICgpID0+IHRoaXMuZnJhbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb21wdCB0aGUgU2NoZWR1bGVyIHRvIGV4ZWN1dGUgYWxsIG9mIGl0cyBxdWV1ZWQgYWN0aW9ucywgdGhlcmVmb3JlXG4gICAqIGNsZWFyaW5nIGl0cyBxdWV1ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHB1YmxpYyBmbHVzaCgpOiB2b2lkIHtcblxuICAgIGNvbnN0IHthY3Rpb25zLCBtYXhGcmFtZXN9ID0gdGhpcztcbiAgICBsZXQgZXJyb3I6IGFueSwgYWN0aW9uOiBBc3luY0FjdGlvbjxhbnk+O1xuXG4gICAgd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpICYmICh0aGlzLmZyYW1lID0gYWN0aW9uLmRlbGF5KSA8PSBtYXhGcmFtZXMpIHtcbiAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpIHtcbiAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsQWN0aW9uPFQ+IGV4dGVuZHMgQXN5bmNBY3Rpb248VD4ge1xuXG4gIHByb3RlY3RlZCBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzY2hlZHVsZXI6IFZpcnR1YWxUaW1lU2NoZWR1bGVyLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgd29yazogKHRoaXM6IFZpcnR1YWxBY3Rpb248VD4sIHN0YXRlPzogVCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSBzY2hlZHVsZXIuaW5kZXggKz0gMSkge1xuICAgIHN1cGVyKHNjaGVkdWxlciwgd29yayk7XG4gICAgdGhpcy5pbmRleCA9IHNjaGVkdWxlci5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgcHVibGljIHNjaGVkdWxlKHN0YXRlPzogVCwgZGVsYXk6IG51bWJlciA9IDApOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgcmV0dXJuIHN1cGVyLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gSWYgYW4gYWN0aW9uIGlzIHJlc2NoZWR1bGVkLCB3ZSBzYXZlIGFsbG9jYXRpb25zIGJ5IG11dGF0aW5nIGl0cyBzdGF0ZSxcbiAgICAvLyBwdXNoaW5nIGl0IHRvIHRoZSBlbmQgb2YgdGhlIHNjaGVkdWxlciBxdWV1ZSwgYW5kIHJlY3ljbGluZyB0aGUgYWN0aW9uLlxuICAgIC8vIEJ1dCBzaW5jZSB0aGUgVmlydHVhbFRpbWVTY2hlZHVsZXIgaXMgdXNlZCBmb3IgdGVzdGluZywgVmlydHVhbEFjdGlvbnNcbiAgICAvLyBtdXN0IGJlIGltbXV0YWJsZSBzbyB0aGV5IGNhbiBiZSBpbnNwZWN0ZWQgbGF0ZXIuXG4gICAgY29uc3QgYWN0aW9uID0gbmV3IFZpcnR1YWxBY3Rpb24odGhpcy5zY2hlZHVsZXIsIHRoaXMud29yayk7XG4gICAgdGhpcy5hZGQoYWN0aW9uKTtcbiAgICByZXR1cm4gYWN0aW9uLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyOiBWaXJ0dWFsVGltZVNjaGVkdWxlciwgaWQ/OiBhbnksIGRlbGF5OiBudW1iZXIgPSAwKTogYW55IHtcbiAgICB0aGlzLmRlbGF5ID0gc2NoZWR1bGVyLmZyYW1lICsgZGVsYXk7XG4gICAgY29uc3Qge2FjdGlvbnN9ID0gc2NoZWR1bGVyO1xuICAgIGFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICBhY3Rpb25zLnNvcnQoVmlydHVhbEFjdGlvbi5zb3J0QWN0aW9ucyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyOiBWaXJ0dWFsVGltZVNjaGVkdWxlciwgaWQ/OiBhbnksIGRlbGF5OiBudW1iZXIgPSAwKTogYW55IHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9leGVjdXRlKHN0YXRlOiBULCBkZWxheTogbnVtYmVyKTogYW55IHtcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBzdXBlci5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc29ydEFjdGlvbnM8VD4oYTogVmlydHVhbEFjdGlvbjxUPiwgYjogVmlydHVhbEFjdGlvbjxUPikge1xuICAgIGlmIChhLmRlbGF5ID09PSBiLmRlbGF5KSB7XG4gICAgICBpZiAoYS5pbmRleCA9PT0gYi5pbmRleCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSBpZiAoYS5pbmRleCA+IGIuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhLmRlbGF5ID4gYi5kZWxheSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==