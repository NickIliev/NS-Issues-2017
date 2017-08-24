"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
function minimalSetImpl() {
    // THIS IS NOT a full impl of Set, this is just the minimum
    // bits of functionality we need for this library.
    return (function () {
        function MinimalSet() {
            this._values = [];
        }
        MinimalSet.prototype.add = function (value) {
            if (!this.has(value)) {
                this._values.push(value);
            }
        };
        MinimalSet.prototype.has = function (value) {
            return this._values.indexOf(value) !== -1;
        };
        Object.defineProperty(MinimalSet.prototype, "size", {
            get: function () {
                return this._values.length;
            },
            enumerable: true,
            configurable: true
        });
        MinimalSet.prototype.clear = function () {
            this._values.length = 0;
        };
        return MinimalSet;
    }());
}
exports.minimalSetImpl = minimalSetImpl;
exports.Set = root_1.root.Set || minimalSetImpl();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBYTlCO0lBQ0UsMkRBQTJEO0lBQzNELGtEQUFrRDtJQUNsRCxNQUFNO1FBQUM7WUFDRyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBbUI1QixDQUFDO1FBakJDLHdCQUFHLEdBQUgsVUFBSSxLQUFRO1lBQ1YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUM7UUFFRCx3QkFBRyxHQUFILFVBQUksS0FBUTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsc0JBQUksNEJBQUk7aUJBQVI7Z0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUM7OztXQUFBO1FBRUQsMEJBQUssR0FBTDtZQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0gsaUJBQUM7SUFBRCxDQUFDLEFBcEJNLElBb0JMO0FBQ0osQ0FBQztBQXhCRCx3Q0F3QkM7QUFFWSxRQUFBLEdBQUcsR0FBYSxXQUFJLENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4vcm9vdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldEN0b3Ige1xuICBuZXc8VD4oKTogSVNldDxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2V0PFQ+IHtcbiAgYWRkKHZhbHVlOiBUKTogdm9pZDtcbiAgaGFzKHZhbHVlOiBUKTogYm9vbGVhbjtcbiAgc2l6ZTogbnVtYmVyO1xuICBjbGVhcigpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluaW1hbFNldEltcGw8VD4oKTogSVNldEN0b3Ige1xuICAvLyBUSElTIElTIE5PVCBhIGZ1bGwgaW1wbCBvZiBTZXQsIHRoaXMgaXMganVzdCB0aGUgbWluaW11bVxuICAvLyBiaXRzIG9mIGZ1bmN0aW9uYWxpdHkgd2UgbmVlZCBmb3IgdGhpcyBsaWJyYXJ5LlxuICByZXR1cm4gY2xhc3MgTWluaW1hbFNldDxUPiBpbXBsZW1lbnRzIElTZXQ8VD4ge1xuICAgIHByaXZhdGUgX3ZhbHVlczogVFtdID0gW107XG5cbiAgICBhZGQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYXModmFsdWU6IFQpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZXMuaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNldDogSVNldEN0b3IgPSByb290LlNldCB8fCBtaW5pbWFsU2V0SW1wbCgpOyJdfQ==