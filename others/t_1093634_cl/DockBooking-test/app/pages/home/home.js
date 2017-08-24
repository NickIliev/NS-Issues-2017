"use strict";
var color_1 = require("color");
var BasePage_1 = require("../../shared/BasePage");
var home_view_model_1 = require("./home-view-model");
var app = require("application");
var autocompleteModel = require("./autocomplete-model");
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentLoaded = function (args) {
            var page = args.object;
            page.bindingContext = new home_view_model_1.HomeModel();
        };
        _this.onNavigatedTo = function (args) {
            console.log('navigated to home');
        };
        _this.onRadAutoLoaded = function (args) {
            _this.searchField = args.object;
            _this.searchField.bindingContext = new autocompleteModel.ViewModel(args);
            _this.searchField.on('tap', function () {
                // this.searchTransition();
                console.log('tap in search');
            });
            if (app.ios) {
                // console.log(autocomplete.ios); // TKAutoCompleteTextView from http://docs.telerik.com/devtools/ios/api/Classes/TKAutoCompleteTextView.html
                var radIOS = _this.searchField.ios;
                var wantedColor = new color_1.Color("#07354c");
                radIOS.suggestionView.backgroundColor = wantedColor.ios; // NOTE that we are using the iOS color
            }
        };
        return _this;
    }
    return HomePage;
}(BasePage_1.BasePage));
module.exports = new HomePage();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtCQUE4QjtBQUU5QixrREFBaUQ7QUFDakQscURBQThDO0FBRTlDLGlDQUFvQztBQUNwQyx3REFBMkQ7QUFHM0Q7SUFBdUIsNEJBQVE7SUFBL0I7UUFBQSxxRUE0QkM7UUF4QkcsbUJBQWEsR0FBRyxVQUFDLElBQUk7WUFDakIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksMkJBQVMsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQTtRQUVELG1CQUFhLEdBQUcsVUFBQyxJQUFlO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUE7UUFFRCxxQkFBZSxHQUFHLFVBQUMsSUFBMkI7WUFDMUMsS0FBSSxDQUFDLFdBQVcsR0FBNEIsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4RCxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLDJCQUEyQjtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQTtZQUVGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNWLDZJQUE2STtnQkFDN0ksSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7Z0JBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsdUNBQXVDO1lBQ3BHLENBQUM7UUFDTCxDQUFDLENBQUE7O0lBQ0wsQ0FBQztJQUFELGVBQUM7QUFBRCxDQUFDLEFBNUJELENBQXVCLG1CQUFRLEdBNEI5QjtBQUVELGlCQUFTLElBQUksUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IEF1dG9Db21wbGV0ZUV2ZW50RGF0YSwgUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2F1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL0Jhc2VQYWdlXCI7XG5pbXBvcnQgeyBIb21lTW9kZWwgfSBmcm9tICcuL2hvbWUtdmlldy1tb2RlbCc7XG5cbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgYXV0b2NvbXBsZXRlTW9kZWwgPSByZXF1aXJlKFwiLi9hdXRvY29tcGxldGUtbW9kZWxcIik7XG5cblxuY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XG5cbiAgICBzZWFyY2hGaWVsZCA6IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3O1xuXG4gICAgY29udGVudExvYWRlZCA9IChhcmdzKSA9PiB7XG4gICAgICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSG9tZU1vZGVsKCk7XG4gICAgfVxuXG4gICAgb25OYXZpZ2F0ZWRUbyA9IChhcmdzOiBFdmVudERhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ25hdmlnYXRlZCB0byBob21lJyk7XG4gICAgfVxuXG4gICAgb25SYWRBdXRvTG9hZGVkID0gKGFyZ3M6IEF1dG9Db21wbGV0ZUV2ZW50RGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaEZpZWxkID0gPFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3PmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlYXJjaEZpZWxkLmJpbmRpbmdDb250ZXh0ID0gbmV3IGF1dG9jb21wbGV0ZU1vZGVsLlZpZXdNb2RlbChhcmdzKTtcbiAgICAgICAgdGhpcy5zZWFyY2hGaWVsZC5vbigndGFwJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5zZWFyY2hUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGFwIGluIHNlYXJjaCcpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhdXRvY29tcGxldGUuaW9zKTsgLy8gVEtBdXRvQ29tcGxldGVUZXh0VmlldyBmcm9tIGh0dHA6Ly9kb2NzLnRlbGVyaWsuY29tL2RldnRvb2xzL2lvcy9hcGkvQ2xhc3Nlcy9US0F1dG9Db21wbGV0ZVRleHRWaWV3Lmh0bWxcbiAgICAgICAgICAgIHZhciByYWRJT1MgPSB0aGlzLnNlYXJjaEZpZWxkLmlvcztcbiAgICAgICAgICAgIHZhciB3YW50ZWRDb2xvciA9IG5ldyBDb2xvcihcIiMwNzM1NGNcIik7XG4gICAgICAgICAgICByYWRJT1Muc3VnZ2VzdGlvblZpZXcuYmFja2dyb3VuZENvbG9yID0gd2FudGVkQ29sb3IuaW9zOyAvLyBOT1RFIHRoYXQgd2UgYXJlIHVzaW5nIHRoZSBpT1MgY29sb3JcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhvbWVQYWdlKCk7XG4iXX0=