"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var PersonViewModel = (function (_super) {
    __extends(PersonViewModel, _super);
    function PersonViewModel() {
        var _this = _super.call(this) || this;
        _this.person = new PatientQuestionnaire(new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11), "some question");
        return _this;
        //new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
    }
    Object.defineProperty(PersonViewModel.prototype, "person", {
        get: function () {
            return this.get("_person");
        },
        set: function (value) {
            this.set("_person", value);
        },
        enumerable: true,
        configurable: true
    });
    return PersonViewModel;
}(observable_1.Observable));
exports.PersonViewModel = PersonViewModel;
var Person = (function () {
    function Person(name, age, email, city, street, streetNumber) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }
    return Person;
}());
exports.Person = Person;
var PatientQuestionnaire = (function () {
    function PatientQuestionnaire(patient, question1) {
        this.patient = patient;
        this.question1 = question1;
    }
    return PatientQuestionnaire;
}());
exports.PatientQuestionnaire = PatientQuestionnaire;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBRTlEO0lBQXFDLG1DQUFVO0lBRTNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQzs7UUFDbEksMkVBQTJFO0lBQy9FLENBQUM7SUFFRCxzQkFBSSxtQ0FBTTthQUlWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQzthQU5ELFVBQVcsS0FBMkI7WUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFLTCxzQkFBQztBQUFELENBQUMsQUFmRCxDQUFxQyx1QkFBVSxHQWU5QztBQWZZLDBDQUFlO0FBaUI1QjtJQVFJLGdCQUFZLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWTtRQUNwRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSx3QkFBTTtBQWtCbkI7SUFHSSw4QkFBWSxPQUFlLEVBQUUsU0FBaUI7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5cbmV4cG9ydCBjbGFzcyBQZXJzb25WaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBlcnNvbiA9IG5ldyBQYXRpZW50UXVlc3Rpb25uYWlyZShuZXcgUGVyc29uKFwiSm9oblwiLCAyMywgXCJqb2huQGNvbXBhbnkuY29tXCIsIFwiTmV3IFlvcmtcIiwgXCI1dGggQXZlbnVlXCIsIDExKSwgXCJzb21lIHF1ZXN0aW9uXCIpO1xuICAgICAgICAvL25ldyBQZXJzb24oXCJKb2huXCIsIDIzLCBcImpvaG5AY29tcGFueS5jb21cIiwgXCJOZXcgWW9ya1wiLCBcIjV0aCBBdmVudWVcIiwgMTEpO1xuICAgIH1cblxuICAgIHNldCBwZXJzb24odmFsdWU6IFBhdGllbnRRdWVzdGlvbm5haXJlKSB7XG4gICAgICAgIHRoaXMuc2V0KFwiX3BlcnNvblwiLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHBlcnNvbigpOiBQYXRpZW50UXVlc3Rpb25uYWlyZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChcIl9wZXJzb25cIik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGVyc29uIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBhZ2U6IG51bWJlcjtcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgICBwdWJsaWMgY2l0eTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdHJlZXQ6IHN0cmluZztcbiAgICBwdWJsaWMgc3RyZWV0TnVtYmVyOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBhZ2UsIGVtYWlsLCBjaXR5LCBzdHJlZXQsIHN0cmVldE51bWJlcikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcbiAgICAgICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgICAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgICAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgICAgICAgdGhpcy5zdHJlZXROdW1iZXIgPSBzdHJlZXROdW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF0aWVudFF1ZXN0aW9ubmFpcmUge1xuICAgIHBhdGllbnQ6IFBlcnNvbjtcbiAgICBxdWVzdGlvbjE6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihwYXRpZW50OiBQZXJzb24sIHF1ZXN0aW9uMTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucGF0aWVudCA9IHBhdGllbnQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb24xID0gcXVlc3Rpb24xO1xuICAgIH1cbn0iXX0=