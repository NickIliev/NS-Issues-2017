"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observableArrayModule = require("data/observable-array");
var template_selector_1 = require("./views/template-selector");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this.templateSelector = new template_selector_1.MyTemplateSelector();
        var person = new Person();
        person.first = "Alexander";
        person.last = "Reyes";
        var items = [person, person, person, person, person];
        _this.itemsSource = new observableArrayModule.ObservableArray(items);
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
var Person = (function () {
    function Person() {
    }
    return Person;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDLDZEQUErRDtBQUMvRCwrREFBK0Q7QUFDL0Q7SUFBcUMsbUNBQVU7SUFLM0M7UUFBQSxZQUNJLGlCQUFPLFNBWVY7UUFWRyw2QkFBNkI7UUFFN0IsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksc0NBQWtCLEVBQUUsQ0FBQztRQUVqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBRXRCLElBQUksS0FBSyxHQUFHLENBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQ3ZELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7O0lBQ2hGLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBcUMsdUJBQVUsR0FtQjlDO0FBbkJZLDBDQUFlO0FBcUI1QjtJQUFBO0lBR0EsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5TW9kdWxlIGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IE15VGVtcGxhdGVTZWxlY3RvciB9IGZyb20gXCIuL3ZpZXdzL3RlbXBsYXRlLXNlbGVjdG9yXCI7XG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwdWJsaWMgdGVtcGxhdGVTZWxlY3RvcjogTXlUZW1wbGF0ZVNlbGVjdG9yO1xuICAgIHB1YmxpYyBpdGVtc1NvdXJjZTogb2JzZXJ2YWJsZUFycmF5TW9kdWxlLk9ic2VydmFibGVBcnJheTxQZXJzb24+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlcy5cblxuICAgICAgICB0aGlzLnRlbXBsYXRlU2VsZWN0b3IgPSBuZXcgTXlUZW1wbGF0ZVNlbGVjdG9yKCk7XG5cbiAgICAgICAgdmFyIHBlcnNvbiA9IG5ldyBQZXJzb24oKTtcbiAgICAgICAgcGVyc29uLmZpcnN0ID0gXCJBbGV4YW5kZXJcIjtcbiAgICAgICAgcGVyc29uLmxhc3QgPSBcIlJleWVzXCI7XG5cbiAgICAgICAgdmFyIGl0ZW1zID0gWyBwZXJzb24sIHBlcnNvbiwgcGVyc29uLCBwZXJzb24sIHBlcnNvbiBdO1xuICAgICAgICB0aGlzLml0ZW1zU291cmNlID0gbmV3IG9ic2VydmFibGVBcnJheU1vZHVsZS5PYnNlcnZhYmxlQXJyYXk8UGVyc29uPihpdGVtcyk7XG4gICAgfVxufVxuXG5jbGFzcyBQZXJzb24ge1xuICAgIHB1YmxpYyBmaXJzdDogYW55O1xuICAgIHB1YmxpYyBsYXN0OiBhbnk7XG59Il19