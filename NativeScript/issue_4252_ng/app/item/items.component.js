"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var http = require("http");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
        http.request({
            url: "https://httpbin.org/patch",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
        }).then(function (response) {
            var result = response.content.toJSON();
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    var element = result[key];
                    console.log(key + " " + element);
                }
            }
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUU3QywyQkFBNkI7QUFPN0IsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxNQUFNLEVBQUUsT0FBTztZQUNmLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTtZQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQ3BGLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxRQUFRO1lBQ3RCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQUltQywwQkFBVztHQUhuQyxjQUFjLENBMkIxQjtBQTNCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcblxuICAgICAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vaHR0cGJpbi5vcmcvcGF0Y2hcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoeyBNeVZhcmlhYmxlT25lOiBcIlZhbHVlT25lXCIsIE15VmFyaWFibGVUd286IFwiVmFsdWVUd29cIiB9KVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSByZXN1bHRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5ICsgXCIgXCIgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJyZWQgXCIgKyBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19