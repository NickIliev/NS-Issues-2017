"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./map");
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} A new Observable of property values from the source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
function plucker(props, length) {
    var mapper = function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Y2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbHVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZCQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBQWlELG9CQUF1QjtTQUF2QixVQUF1QixFQUF2QixxQkFBdUIsRUFBdkIsSUFBdUI7UUFBdkIsK0JBQXVCOztJQUN0RSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBTkQsc0JBTUM7QUFFRCxpQkFBaUIsS0FBZSxFQUFFLE1BQWM7SUFDOUMsSUFBTSxNQUFNLEdBQUcsVUFBQyxDQUFTO1FBQ3ZCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hDLElBQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuL21hcCc7XG5cbi8qKlxuICogTWFwcyBlYWNoIHNvdXJjZSB2YWx1ZSAoYW4gb2JqZWN0KSB0byBpdHMgc3BlY2lmaWVkIG5lc3RlZCBwcm9wZXJ0eS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZSB7QGxpbmsgbWFwfSwgYnV0IG1lYW50IG9ubHkgZm9yIHBpY2tpbmcgb25lIG9mXG4gKiB0aGUgbmVzdGVkIHByb3BlcnRpZXMgb2YgZXZlcnkgZW1pdHRlZCBvYmplY3QuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGx1Y2sucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogR2l2ZW4gYSBsaXN0IG9mIHN0cmluZ3MgZGVzY3JpYmluZyBhIHBhdGggdG8gYW4gb2JqZWN0IHByb3BlcnR5LCByZXRyaWV2ZXNcbiAqIHRoZSB2YWx1ZSBvZiBhIHNwZWNpZmllZCBuZXN0ZWQgcHJvcGVydHkgZnJvbSBhbGwgdmFsdWVzIGluIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIElmIGEgcHJvcGVydHkgY2FuJ3QgYmUgcmVzb2x2ZWQsIGl0IHdpbGwgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICogdGhhdCB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgY2xpY2sgdG8gdGhlIHRhZ05hbWUgb2YgdGhlIGNsaWNrZWQgdGFyZ2V0IGVsZW1lbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHRhZ05hbWVzID0gY2xpY2tzLnBsdWNrKCd0YXJnZXQnLCAndGFnTmFtZScpO1xuICogdGFnTmFtZXMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1hcH1cbiAqXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcHJvcGVydGllcyBUaGUgbmVzdGVkIHByb3BlcnRpZXMgdG8gcGx1Y2sgZnJvbSBlYWNoIHNvdXJjZVxuICogdmFsdWUgKGFuIG9iamVjdCkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBIG5ldyBPYnNlcnZhYmxlIG9mIHByb3BlcnR5IHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgdmFsdWVzLlxuICogQG1ldGhvZCBwbHVja1xuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsdWNrPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIC4uLnByb3BlcnRpZXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbnN0IGxlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdsaXN0IG9mIHByb3BlcnRpZXMgY2Fubm90IGJlIGVtcHR5LicpO1xuICB9XG4gIHJldHVybiBtYXAuY2FsbCh0aGlzLCBwbHVja2VyKHByb3BlcnRpZXMsIGxlbmd0aCkpO1xufVxuXG5mdW5jdGlvbiBwbHVja2VyKHByb3BzOiBzdHJpbmdbXSwgbGVuZ3RoOiBudW1iZXIpOiAoeDogc3RyaW5nKSA9PiBhbnkge1xuICBjb25zdCBtYXBwZXIgPSAoeDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRQcm9wID0geDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gY3VycmVudFByb3BbcHJvcHNbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjdXJyZW50UHJvcCA9IHA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFByb3A7XG4gIH07XG5cbiAgcmV0dXJuIG1hcHBlcjtcbn1cbiJdfQ==