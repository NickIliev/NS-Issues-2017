"use strict";
var observable_1 = require("data/observable");
var platform_1 = require("platform");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        var mainScreen = platform_1.screen.mainScreen;
        console.log(mainScreen.heightDIPs);
        console.log(mainScreen.heightPixels);
        console.log(mainScreen.scale);
        console.log(mainScreen.widthDIPs);
        console.log(mainScreen.widthPixels);
        _this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        _this.userSelectionHeight = (_this.items.length * 35) + (_this.items.length * 0.9);
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items !== value) {
                this._items = value;
                this.notifyPropertyChange('items', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "userSelectionHeight", {
        get: function () {
            return this._userSelectionHeight;
        },
        set: function (value) {
            if (this._userSelectionHeight !== value) {
                this._userSelectionHeight = value;
                this.notifyPropertyChange('userSelectionHeight', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBNkM7QUFDN0MscUNBQWlEO0FBRWpEO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQVdWO1FBVEcsSUFBSSxVQUFVLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEMsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBRSxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O0lBQ3JGLENBQUM7SUFFRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVUsS0FBaUI7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTRCxzQkFBSSxnREFBbUI7YUFBdkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7YUFFRCxVQUF3QixLQUFhO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDM0QsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBUUwsc0JBQUM7QUFBRCxDQUFDLEFBeENELENBQXFDLHVCQUFVLEdBd0M5QztBQXhDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgc2NyZWVuLCBTY3JlZW5NZXRyaWNzIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHByaXZhdGUgX3VzZXJTZWxlY3Rpb25IZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9pdGVtczogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHZhciBtYWluU2NyZWVuID0gc2NyZWVuLm1haW5TY3JlZW47XG4gICAgICAgIGNvbnNvbGUubG9nKG1haW5TY3JlZW4uaGVpZ2h0RElQcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzKTtcbiAgICAgICAgY29uc29sZS5sb2cobWFpblNjcmVlbi5zY2FsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1haW5TY3JlZW4ud2lkdGhESVBzKTtcbiAgICAgICAgY29uc29sZS5sb2cobWFpblNjcmVlbi53aWR0aFBpeGVscyk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG4gICAgICAgIHRoaXMudXNlclNlbGVjdGlvbkhlaWdodCA9ICh0aGlzLml0ZW1zLmxlbmd0aCAqIDM1ICkgKyAodGhpcy5pdGVtcy5sZW5ndGggKiAwLjkpO1xuICAgIH1cblxuICAgIGdldCBpdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIHNldCBpdGVtcyh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXRlbXMnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB1c2VyU2VsZWN0aW9uSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU2VsZWN0aW9uSGVpZ2h0O1xuICAgIH1cblxuICAgIHNldCB1c2VyU2VsZWN0aW9uSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJTZWxlY3Rpb25IZWlnaHQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VsZWN0aW9uSGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCd1c2VyU2VsZWN0aW9uSGVpZ2h0JywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG59Il19