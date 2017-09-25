"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var _this = this;
        var err = _this = _super.call(this, 'argument out of range') || this;
        _this.name = err.name = 'ArgumentOutOfRangeError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBcmd1bWVudE91dE9mUmFuZ2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7R0FTRztBQUNIO0lBQTZDLDJDQUFLO0lBQ2hEO1FBQUEsaUJBS0M7UUFKQyxJQUFNLEdBQUcsV0FBUSxrQkFBTSx1QkFBdUIsQ0FBQyxRQUFBLENBQUM7UUFDekMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDO1FBQ2xELEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7O0lBQ3JDLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFQRCxDQUE2QyxLQUFLLEdBT2pEO0FBUFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhbiBlbGVtZW50IHdhcyBxdWVyaWVkIGF0IGEgY2VydGFpbiBpbmRleCBvZiBhblxuICogT2JzZXJ2YWJsZSwgYnV0IG5vIHN1Y2ggaW5kZXggb3IgcG9zaXRpb24gZXhpc3RzIGluIHRoYXQgc2VxdWVuY2UuXG4gKlxuICogQHNlZSB7QGxpbmsgZWxlbWVudEF0fVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VMYXN0fVxuICpcbiAqIEBjbGFzcyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvclxuICovXG5leHBvcnQgY2xhc3MgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGVycjogYW55ID0gc3VwZXIoJ2FyZ3VtZW50IG91dCBvZiByYW5nZScpO1xuICAgICg8YW55PiB0aGlzKS5uYW1lID0gZXJyLm5hbWUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=