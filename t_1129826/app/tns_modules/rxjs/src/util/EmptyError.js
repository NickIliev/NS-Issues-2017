"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = (function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var _this = this;
        var err = _this = _super.call(this, 'no elements in sequence') || this;
        _this.name = err.name = 'EmptyError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return EmptyError;
}(Error));
exports.EmptyError = EmptyError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVtcHR5RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7O0dBU0c7QUFDSDtJQUFnQyw4QkFBSztJQUNuQztRQUFBLGlCQUtDO1FBSkMsSUFBTSxHQUFHLFdBQVEsa0JBQU0seUJBQXlCLENBQUMsUUFBQSxDQUFDO1FBQzNDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDckMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzs7SUFDckMsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQVBELENBQWdDLEtBQUssR0FPcEM7QUFQWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gT2JzZXJ2YWJsZSBvciBhIHNlcXVlbmNlIHdhcyBxdWVyaWVkIGJ1dCBoYXMgbm9cbiAqIGVsZW1lbnRzLlxuICpcbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgbGFzdH1cbiAqIEBzZWUge0BsaW5rIHNpbmdsZX1cbiAqXG4gKiBAY2xhc3MgRW1wdHlFcnJvclxuICovXG5leHBvcnQgY2xhc3MgRW1wdHlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZXJyOiBhbnkgPSBzdXBlcignbm8gZWxlbWVudHMgaW4gc2VxdWVuY2UnKTtcbiAgICAoPGFueT4gdGhpcykubmFtZSA9IGVyci5uYW1lID0gJ0VtcHR5RXJyb3InO1xuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=