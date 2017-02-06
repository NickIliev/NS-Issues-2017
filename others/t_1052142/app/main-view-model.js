"use strict";
var observable_1 = require("data/observable");
var httpModule = require("http");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.items2 = [];
        _this.loadCountries();
        return _this;
    }
    HelloWorldModel.prototype.loadCountries = function () {
        var _this = this;
        httpModule.request({
            url: "http://services.groupkt.com/country/get/all",
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            var list = response.content.toJSON().RestResponse.result;
            list.forEach(function (country) {
                console.log(country.name);
                _this.items.push(country);
                _this.items2.push(country);
            });
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBNkM7QUFDN0MsaUNBQW1DO0FBRW5DO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBUE0sV0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFlBQU0sR0FBRyxFQUFFLENBQUM7UUFLZixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7O0lBQ3hCLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBQUEsaUJBa0JDO1FBaEJHLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDZixHQUFHLEVBQUUsNkNBQTZDO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxtQ0FBbUM7YUFDdEQ7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQS9CRCxDQUFxQyx1QkFBVSxHQStCOUM7QUEvQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHVibGljIGl0ZW1zID0gW107XG4gICAgcHVibGljIGl0ZW1zMiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5sb2FkQ291bnRyaWVzKClcbiAgICB9XG5cbiAgICBsb2FkQ291bnRyaWVzKCkge1xuXG4gICAgICAgIGh0dHBNb2R1bGUucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL3NlcnZpY2VzLmdyb3Vwa3QuY29tL2NvdW50cnkvZ2V0L2FsbFwiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCkuUmVzdFJlc3BvbnNlLnJlc3VsdDtcblxuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGNvdW50cnkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMyLnB1c2goY291bnRyeSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXX0=