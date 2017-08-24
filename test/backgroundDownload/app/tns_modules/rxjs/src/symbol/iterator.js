"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../util/root");
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvQztBQUVwQyxnQ0FBdUMsSUFBUztJQUM5QyxJQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRWhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixxREFBcUQ7UUFDN0MsSUFBQSxnQkFBRyxDQUFVO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUcsSUFBSSxPQUFPLElBQUksS0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFDTyxJQUFBLGdCQUFHLENBQVU7UUFDckIsMkNBQTJDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLHdGQUF3RjtnQkFDeEYsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssTUFBTSxJQUFJLEtBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0FBQ0gsQ0FBQztBQTVCRCx3REE0QkM7QUFFWSxRQUFBLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxXQUFJLENBQUMsQ0FBQztBQUVyRDs7R0FFRztBQUNVLFFBQUEsVUFBVSxHQUFHLGdCQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcblxuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbEl0ZXJhdG9yUG9ueWZpbGwocm9vdDogYW55KSB7XG4gIGNvbnN0IFN5bWJvbDogYW55ID0gcm9vdC5TeW1ib2w7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgU3ltYm9sLml0ZXJhdG9yID0gU3ltYm9sKCdpdGVyYXRvciBwb2x5ZmlsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xuICB9IGVsc2Uge1xuICAgIC8vIFtmb3IgTW96aWxsYSBHZWNrbyAyNy0zNTpdKGh0dHBzOi8vbXpsLmxhLzJld0UxekMpXG4gICAgY29uc3QgeyBTZXQgfSA9IHJvb3Q7XG4gICAgaWYgKFNldCAmJiB0eXBlb2YgbmV3IFNldCgpWydAQGl0ZXJhdG9yJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAnQEBpdGVyYXRvcic7XG4gICAgfVxuICAgIGNvbnN0IHsgTWFwIH0gPSByb290O1xuICAgIC8vIHJlcXVpcmVkIGZvciBjb21wYXRhYmlsaXR5IHdpdGggZXM2LXNoaW1cbiAgICBpZiAoTWFwKSB7XG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcC5wcm90b3R5cGUpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gc3BlYywgTWFwLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSBhbmQgTWFwLm9yb3RvdHlwZS5lbnRyaWVzIG11c3QgYmUgZXF1YWwuXG4gICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJiBNYXAucHJvdG90eXBlW2tleV0gPT09IE1hcC5wcm90b3R5cGVbJ2VudHJpZXMnXSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICdAQGl0ZXJhdG9yJztcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0b3IgPSBzeW1ib2xJdGVyYXRvclBvbnlmaWxsKHJvb3QpO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBpdGVyYXRvciBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBjb25zdCAkJGl0ZXJhdG9yID0gaXRlcmF0b3I7XG4iXX0=