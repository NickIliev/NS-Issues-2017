"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VisibilityValueConverter = (function () {
    function VisibilityValueConverter() {
    }
    VisibilityValueConverter.prototype.toView = function (value) {
        if (value) {
            return "collapsed";
        }
        else {
            return "visible";
        }
    };
    VisibilityValueConverter.prototype.toModel = function (value) {
        return value;
    };
    return VisibilityValueConverter;
}());
exports.VisibilityValueConverter = VisibilityValueConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eVZhbHVlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlzaWJpbGl0eVZhbHVlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFBQTtJQVlBLENBQUM7SUFYRyx5Q0FBTSxHQUFOLFVBQU8sS0FBYTtRQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQU8sR0FBUCxVQUFRLEtBQWE7UUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBWaXNpYmlsaXR5VmFsdWVDb252ZXJ0ZXIge1xyXG4gICAgdG9WaWV3KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjb2xsYXBzZWRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvTW9kZWwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==