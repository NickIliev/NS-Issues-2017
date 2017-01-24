"use strict";
function navigatingTo(args) {
    var testInstance = new Test();
    console.log(testInstance.typeName);
}
exports.navigatingTo = navigatingTo;
var observable_1 = require("data/observable");
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super.call(this) || this;
        _this.foo = "bar";
        _this.bar = true;
        return _this;
    }
    return Test;
}(observable_1.Observable));
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxzQkFBNkIsSUFBZTtJQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFIRCxvQ0FHQztBQUdELDhDQUE2QztBQUU3QztJQUFtQix3QkFBVTtJQUl6QjtRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOztJQUNwQixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFURCxDQUFtQix1QkFBVSxHQVM1QjtBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIHZhciB0ZXN0SW5zdGFuY2UgPSBuZXcgVGVzdCgpO1xuICAgIGNvbnNvbGUubG9nKHRlc3RJbnN0YW5jZS50eXBlTmFtZSk7XG59XG5cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuY2xhc3MgVGVzdCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHB1YmxpYyBmb286IHN0cmluZztcbiAgICBwdWJsaWMgYmFyOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZm9vID0gXCJiYXJcIjtcbiAgICAgICAgdGhpcy5iYXIgPSB0cnVlO1xuICAgIH1cbn07XG4iXX0=