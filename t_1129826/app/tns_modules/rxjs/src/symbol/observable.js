"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../util/root");
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBb0M7QUFFcEMsNkJBQW9DLE9BQVk7SUFDOUMsSUFBSSxZQUFpQixDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QixZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixZQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFoQkQsa0RBZ0JDO0FBRVksUUFBQSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsV0FBSSxDQUFDLENBQUM7QUFFcEQ7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBRyxrQkFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uL3V0aWwvcm9vdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xPYnNlcnZhYmxlKGNvbnRleHQ6IGFueSkge1xuICBsZXQgJCRvYnNlcnZhYmxlOiBhbnk7XG4gIGxldCBTeW1ib2wgPSBjb250ZXh0LlN5bWJvbDtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sLm9ic2VydmFibGU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4gICAgICAgIFN5bWJvbC5vYnNlcnZhYmxlID0gJCRvYnNlcnZhYmxlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAkJG9ic2VydmFibGUgPSAnQEBvYnNlcnZhYmxlJztcbiAgfVxuXG4gIHJldHVybiAkJG9ic2VydmFibGU7XG59XG5cbmV4cG9ydCBjb25zdCBvYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZShyb290KTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugb2JzZXJ2YWJsZSBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBjb25zdCAkJG9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuIl19