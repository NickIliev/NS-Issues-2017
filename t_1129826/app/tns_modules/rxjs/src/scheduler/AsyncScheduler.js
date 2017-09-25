"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scheduler_1 = require("../Scheduler");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        _this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNTY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBc3luY1NjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF5QztBQUd6QztJQUFvQyxrQ0FBUztJQUE3QztRQUFBLHFFQTJDQztRQTFDUSxhQUFPLEdBQTRCLEVBQUUsQ0FBQztRQUM3Qzs7OztXQUlHO1FBQ0ksWUFBTSxHQUFZLEtBQUssQ0FBQztRQUMvQjs7Ozs7V0FLRztRQUNJLGVBQVMsR0FBUSxTQUFTLENBQUM7O0lBNkJwQyxDQUFDO0lBM0JRLDhCQUFLLEdBQVosVUFBYSxNQUF3QjtRQUU1QixJQUFBLHNCQUFPLENBQVM7UUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxLQUFVLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixHQUFHLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELEtBQUssQ0FBQztZQUNSLENBQUM7UUFDSCxDQUFDLFFBQVEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLDhCQUE4QjtRQUVsRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUFvQyxxQkFBUyxHQTJDNUM7QUEzQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIEFzeW5jU2NoZWR1bGVyIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgcHVibGljIGFjdGlvbnM6IEFycmF5PEFzeW5jQWN0aW9uPGFueT4+ID0gW107XG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0aGUgU2NoZWR1bGVyIGlzIGN1cnJlbnRseSBleGVjdXRpbmcgYSBiYXRjaCBvZlxuICAgKiBxdWV1ZWQgYWN0aW9ucy5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBbiBpbnRlcm5hbCBJRCB1c2VkIHRvIHRyYWNrIHRoZSBsYXRlc3QgYXN5bmNocm9ub3VzIHRhc2sgc3VjaCBhcyB0aG9zZVxuICAgKiBjb21pbmcgZnJvbSBgc2V0VGltZW91dGAsIGBzZXRJbnRlcnZhbGAsIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLCBhbmRcbiAgICogb3RoZXJzLlxuICAgKiBAdHlwZSB7YW55fVxuICAgKi9cbiAgcHVibGljIHNjaGVkdWxlZDogYW55ID0gdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBmbHVzaChhY3Rpb246IEFzeW5jQWN0aW9uPGFueT4pOiB2b2lkIHtcblxuICAgIGNvbnN0IHthY3Rpb25zfSA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlcnJvcjogYW55O1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGRvIHtcbiAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpOyAvLyBleGhhdXN0IHRoZSBzY2hlZHVsZXIgcXVldWVcblxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpIHtcbiAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==