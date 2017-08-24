"use strict";
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this.name = "Cell name";
        _this.items = [11, 22, 33, 44, 55, 66, 77];
        return _this;
    }
    HelloWorldModel.prototype.onTap = function (args) {
        console.log(args.object); // e.g. Label
        console.log(args.object.page);
        console.log(args.object.page.bindingContext.name);
        var tappedLabel = args.object;
        //console.log(tappedLabel.text)
        //console.log(args.eventName); // e.g. tap
        //console.log(this) // binded data for the cell template
    };
    HelloWorldModel.prototype.onOtherTap = function (args) {
        console.log(this); // HelloWorldModel
        console.log(this.name); // "Cell name"
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBd0Q7QUFHeEQ7SUFBcUMsbUNBQVU7SUFLM0M7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFIRyw2QkFBNkI7UUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7UUFDeEIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztJQUM5QyxDQUFDO0lBR00sK0JBQUssR0FBWixVQUFhLElBQUk7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWpELElBQUksV0FBVyxHQUFVLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsK0JBQStCO1FBRS9CLDBDQUEwQztRQUUxQyx3REFBd0Q7SUFDNUQsQ0FBQztJQUVNLG9DQUFVLEdBQWpCLFVBQWtCLElBQWU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLGNBQWM7SUFDekMsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWhDRCxDQUFxQyx1QkFBVSxHQWdDOUM7QUFoQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidWkvbGFiZWxcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PG51bWJlcj5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgZGVmYXVsdCB2YWx1ZXMuXG4gICAgICAgIHRoaXMubmFtZSA9IFwiQ2VsbCBuYW1lXCI7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbMTEsIDIyLCAzMywgNDQsIDU1LCA2NiwgNzddO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpOyAvLyBlLmcuIExhYmVsXG5cbiAgICAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QucGFnZSlcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QucGFnZS5iaW5kaW5nQ29udGV4dC5uYW1lKVxuXG4gICAgICAgIHZhciB0YXBwZWRMYWJlbCA9IDxMYWJlbD5hcmdzLm9iamVjdDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXBwZWRMYWJlbC50ZXh0KVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coYXJncy5ldmVudE5hbWUpOyAvLyBlLmcuIHRhcFxuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcykgLy8gYmluZGVkIGRhdGEgZm9yIHRoZSBjZWxsIHRlbXBsYXRlXG4gICAgfVxuXG4gICAgcHVibGljIG9uT3RoZXJUYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpOyAvLyBIZWxsb1dvcmxkTW9kZWxcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKSAvLyBcIkNlbGwgbmFtZVwiXG4gICAgfVxufSJdfQ==