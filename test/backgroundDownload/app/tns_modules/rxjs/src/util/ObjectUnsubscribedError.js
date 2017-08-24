"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var _this = this;
        var err = _this = _super.call(this, 'object unsubscribed') || this;
        _this.name = err.name = 'ObjectUnsubscribedError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPYmplY3RVbnN1YnNjcmliZWRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztHQVFHO0FBQ0g7SUFBNkMsMkNBQUs7SUFDaEQ7UUFBQSxpQkFLQztRQUpDLElBQU0sR0FBRyxXQUFRLGtCQUFNLHFCQUFxQixDQUFDLFFBQUEsQ0FBQztRQUN2QyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7UUFDbEQsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzs7SUFDckMsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQVBELENBQTZDLEtBQUssR0FPakQ7QUFQWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGFuIGFjdGlvbiBpcyBpbnZhbGlkIGJlY2F1c2UgdGhlIG9iamVjdCBoYXMgYmVlblxuICogdW5zdWJzY3JpYmVkLlxuICpcbiAqIEBzZWUge0BsaW5rIFN1YmplY3R9XG4gKiBAc2VlIHtAbGluayBCZWhhdmlvclN1YmplY3R9XG4gKlxuICogQGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZXJyOiBhbnkgPSBzdXBlcignb2JqZWN0IHVuc3Vic2NyaWJlZCcpO1xuICAgICg8YW55PiB0aGlzKS5uYW1lID0gZXJyLm5hbWUgPSAnT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=