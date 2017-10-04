"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(text, isItemVisible) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.isItemVisible = isItemVisible;
        return _this;
    }
    Item.prototype.toggleVisibility = function (args) {
        console.dir(this);
        console.log(args.object);
        console.log("toggleVisibility value: " + this.isItemVisible);
        this.set("isItemVisible", !this.isItemVisible);
    };
    return Item;
}(observable_1.Observable));
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [
            new Item("1", true),
            new Item("2", true),
            new Item("3", true),
            new Item("4", true),
        ];
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXlEO0FBR3pEO0lBQW1CLHdCQUFVO0lBRXpCLGNBQW1CLElBQVksRUFBUyxhQUFzQjtRQUE5RCxZQUNJLGlCQUFPLFNBQ1Y7UUFGa0IsVUFBSSxHQUFKLElBQUksQ0FBUTtRQUFTLG1CQUFhLEdBQWIsYUFBYSxDQUFTOztJQUU5RCxDQUFDO0lBRU0sK0JBQWdCLEdBQXZCLFVBQXdCLElBQUk7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFiRCxDQUFtQix1QkFBVSxHQWE1QjtBQUVEO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQVFWO1FBTkcsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDdEIsQ0FBQTs7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBZEQsQ0FBcUMsdUJBQVUsR0FjOUM7QUFkWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGZyb21PYmplY3QgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZXh0OiBzdHJpbmcsIHB1YmxpYyBpc0l0ZW1WaXNpYmxlOiBib29sZWFuKSB7IFxuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3Mub2JqZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b2dnbGVWaXNpYmlsaXR5IHZhbHVlOiBcIiArIHRoaXMuaXNJdGVtVmlzaWJsZSk7XG5cbiAgICAgICAgdGhpcy5zZXQoXCJpc0l0ZW1WaXNpYmxlXCIsICF0aGlzLmlzSXRlbVZpc2libGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgICAgIG5ldyBJdGVtKFwiMVwiLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBJdGVtKFwiMlwiLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBJdGVtKFwiM1wiLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBJdGVtKFwiNFwiLCB0cnVlKSxcbiAgICAgICAgXVxuICAgIH1cbn0iXX0=