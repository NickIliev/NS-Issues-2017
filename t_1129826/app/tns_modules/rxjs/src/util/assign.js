"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
function assignImpl(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var len = sources.length;
    for (var i = 0; i < len; i++) {
        var source = sources[i];
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k];
            }
        }
    }
    return target;
}
exports.assignImpl = assignImpl;
;
function getAssign(root) {
    return root.Object.assign || assignImpl;
}
exports.getAssign = getAssign;
exports.assign = getAssign(root_1.root);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBRTlCLG9CQUEyQixNQUFjO0lBQUUsaUJBQW9CO1NBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtRQUFwQixnQ0FBb0I7O0lBQzdELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM3QixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFYRCxnQ0FXQztBQUFBLENBQUM7QUFFRixtQkFBMEIsSUFBUztJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDO0FBQzFDLENBQUM7QUFGRCw4QkFFQztBQUVZLFFBQUEsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvb3QgfSBmcm9tICcuL3Jvb3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduSW1wbCh0YXJnZXQ6IE9iamVjdCwgLi4uc291cmNlczogT2JqZWN0W10pIHtcbiAgY29uc3QgbGVuID0gc291cmNlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgIGZvciAobGV0IGsgaW4gc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIHRhcmdldFtrXSA9IHNvdXJjZVtrXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NpZ24ocm9vdDogYW55KSB7XG4gIHJldHVybiByb290Lk9iamVjdC5hc3NpZ24gfHwgYXNzaWduSW1wbDtcbn1cblxuZXhwb3J0IGNvbnN0IGFzc2lnbiA9IGdldEFzc2lnbihyb290KTsiXX0=