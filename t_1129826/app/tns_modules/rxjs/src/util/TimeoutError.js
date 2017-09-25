"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error thrown when duetime elapses.
 *
 * @see {@link timeout}
 *
 * @class TimeoutError
 */
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError() {
        var _this = this;
        var err = _this = _super.call(this, 'Timeout has occurred') || this;
        _this.name = err.name = 'TimeoutError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZW91dEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGltZW91dEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0g7SUFBa0MsZ0NBQUs7SUFDckM7UUFBQSxpQkFLQztRQUpDLElBQU0sR0FBRyxXQUFRLGtCQUFNLHNCQUFzQixDQUFDLFFBQUEsQ0FBQztRQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7O0lBQ3JDLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxDQUFrQyxLQUFLLEdBT3RDO0FBUFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gZHVldGltZSBlbGFwc2VzLlxyXG4gKlxyXG4gKiBAc2VlIHtAbGluayB0aW1lb3V0fVxyXG4gKlxyXG4gKiBAY2xhc3MgVGltZW91dEVycm9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgZXJyOiBhbnkgPSBzdXBlcignVGltZW91dCBoYXMgb2NjdXJyZWQnKTtcclxuICAgICg8YW55PiB0aGlzKS5uYW1lID0gZXJyLm5hbWUgPSAnVGltZW91dEVycm9yJztcclxuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcclxuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==