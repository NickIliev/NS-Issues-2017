"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncScheduler_1 = require("./AsyncScheduler");
var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AnimationFrameScheduler = AnimationFrameScheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbmltYXRpb25GcmFtZVNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1EQUFrRDtBQUVsRDtJQUE2QywyQ0FBYztJQUEzRDs7SUEyQkEsQ0FBQztJQTFCUSx1Q0FBSyxHQUFaLFVBQWEsTUFBeUI7UUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFcEIsSUFBQSxzQkFBTyxDQUFTO1FBQ3ZCLElBQUksS0FBVSxDQUFDO1FBQ2YsSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVuQyxHQUFHLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELEtBQUssQ0FBQztZQUNSLENBQUM7UUFDSCxDQUFDLFFBQVEsRUFBRSxLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBRXhELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLEVBQUUsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNyRCxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQztZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUEzQkQsQ0FBNkMsK0JBQWMsR0EyQjFEO0FBM0JZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgZXh0ZW5kcyBBc3luY1NjaGVkdWxlciB7XG4gIHB1YmxpYyBmbHVzaChhY3Rpb24/OiBBc3luY0FjdGlvbjxhbnk+KTogdm9pZCB7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB7YWN0aW9uc30gPSB0aGlzO1xuICAgIGxldCBlcnJvcjogYW55O1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG4gICAgbGV0IGNvdW50OiBudW1iZXIgPSBhY3Rpb25zLmxlbmd0aDtcbiAgICBhY3Rpb24gPSBhY3Rpb24gfHwgYWN0aW9ucy5zaGlmdCgpO1xuXG4gICAgZG8ge1xuICAgICAgaWYgKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKCsraW5kZXggPCBjb3VudCAmJiAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGNvdW50ICYmIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpKSB7XG4gICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=