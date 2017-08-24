"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var utils_1 = require("./utils");
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global, Zone, api) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    Function.prototype.toString = function () {
        if (typeof this === 'function') {
            var originalDelegate = this[utils_1.zoneSymbol('OriginalDelegate')];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[utils_1.zoneSymbol('OriginalDelegate')], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[utils_1.zoneSymbol('Promise')];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[utils_1.zoneSymbol('Error')];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return '[object Promise]';
        }
        return originalObjectToString.apply(this, arguments);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG8tc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQW1DO0FBRW5DLHdFQUF3RTtBQUN4RSw0QkFBNEI7QUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBQyxNQUFXLEVBQUUsSUFBYyxFQUFFLEdBQWlCO0lBQzNFLDZEQUE2RDtJQUM3RCxJQUFNLHdCQUF3QixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdELFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDOUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxPQUFPLGdCQUFnQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN6RixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztZQUNILENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7WUFDSCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7SUFHRiwrREFBK0Q7SUFDL0QsSUFBTSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsa0JBQWtCLENBQUM7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHt6b25lU3ltYm9sfSBmcm9tICcuL3V0aWxzJztcblxuLy8gb3ZlcnJpZGUgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nIHRvIG1ha2Ugem9uZS5qcyBwYXRjaGVkIGZ1bmN0aW9uXG4vLyBsb29rIGxpa2UgbmF0aXZlIGZ1bmN0aW9uXG5ab25lLl9fbG9hZF9wYXRjaCgndG9TdHJpbmcnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAvLyBwYXRjaCBGdW5jLnByb3RvdHlwZS50b1N0cmluZyB0byBsZXQgdGhlbSBsb29rIGxpa2UgbmF0aXZlXG4gIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbiAgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbERlbGVnYXRlID0gdGhpc1t6b25lU3ltYm9sKCdPcmlnaW5hbERlbGVnYXRlJyldO1xuICAgICAgaWYgKG9yaWdpbmFsRGVsZWdhdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbERlbGVnYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRnVuY3Rpb25Ub1N0cmluZy5hcHBseSh0aGlzW3pvbmVTeW1ib2woJ09yaWdpbmFsRGVsZWdhdGUnKV0sIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnaW5hbERlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMgPT09IFByb21pc2UpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlUHJvbWlzZSA9IGdsb2JhbFt6b25lU3ltYm9sKCdQcm9taXNlJyldO1xuICAgICAgICBpZiAobmF0aXZlUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZ1bmN0aW9uVG9TdHJpbmcuYXBwbHkobmF0aXZlUHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMgPT09IEVycm9yKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVycm9yID0gZ2xvYmFsW3pvbmVTeW1ib2woJ0Vycm9yJyldO1xuICAgICAgICBpZiAobmF0aXZlRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luYWxGdW5jdGlvblRvU3RyaW5nLmFwcGx5KG5hdGl2ZUVycm9yLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbEZ1bmN0aW9uVG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuXG4gIC8vIHBhdGNoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgdG8gbGV0IHRoZW0gbG9vayBsaWtlIG5hdGl2ZVxuICBjb25zdCBvcmlnaW5hbE9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmV0dXJuICdbb2JqZWN0IFByb21pc2VdJztcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsT2JqZWN0VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0pO1xuIl19