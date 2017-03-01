"use strict";
var BasePage_1 = require("../../shared/BasePage");
var about_view_model_1 = require("./about-view-model");
var AboutPage = (function (_super) {
    __extends(AboutPage, _super);
    function AboutPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentLoaded = function (args) {
            var page = args.object;
            page.bindingContext = new about_view_model_1.AboutModel();
        };
        return _this;
    }
    AboutPage.prototype.onNavigatedTo = function (args) {
        console.log('navigated to about');
    };
    return AboutPage;
}(BasePage_1.BasePage));
module.exports = new AboutPage();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYm91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0RBQWlEO0FBR2pELHVEQUFnRDtBQUdoRDtJQUF3Qiw2QkFBUTtJQUFoQztRQUFBLHFFQVNDO1FBUkcsbUJBQWEsR0FBRyxVQUFDLElBQUk7WUFDakIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksNkJBQVUsRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQTs7SUFLTCxDQUFDO0lBSEcsaUNBQWEsR0FBYixVQUFjLElBQWU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFURCxDQUF3QixtQkFBUSxHQVMvQjtBQUVELGlCQUFTLElBQUksU0FBUyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvQmFzZVBhZ2VcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBYm91dE1vZGVsIH0gZnJvbSAnLi9hYm91dC12aWV3LW1vZGVsJztcblxuXG5jbGFzcyBBYm91dFBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XG4gICAgY29udGVudExvYWRlZCA9IChhcmdzKSA9PiB7XG4gICAgICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgQWJvdXRNb2RlbCgpO1xuICAgIH1cblxuICAgIG9uTmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCduYXZpZ2F0ZWQgdG8gYWJvdXQnKTtcbiAgICB9XG59XG5cbmV4cG9ydCA9IG5ldyBBYm91dFBhZ2UoKTtcbiJdfQ==