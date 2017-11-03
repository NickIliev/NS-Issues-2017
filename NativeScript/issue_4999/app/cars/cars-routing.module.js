"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var car_detail_edit_component_1 = require("./car-detail-edit/car-detail-edit.component");
var car_detail_component_1 = require("./car-detail/car-detail.component");
var car_list_component_1 = require("./car-list.component");
var routes = [
    { path: "", component: car_list_component_1.CarListComponent },
    { path: "car-detail/:id", component: car_detail_component_1.CarDetailComponent },
    { path: "car-detail-edit/:id", component: car_detail_edit_component_1.CarDetailEditComponent }
];
var CarsRoutingModule = /** @class */ (function () {
    function CarsRoutingModule() {
    }
    CarsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], CarsRoutingModule);
    return CarsRoutingModule;
}());
exports.CarsRoutingModule = CarsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcnMtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBRXZFLHlGQUFxRjtBQUNyRiwwRUFBdUU7QUFDdkUsMkRBQXdEO0FBRXhELElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUscUNBQWdCLEVBQUU7SUFDekMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxrREFBc0IsRUFBRTtDQUNyRSxDQUFDO0FBTUY7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQUo3QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztBQUFyQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IENhckRldGFpbEVkaXRDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2FyRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC9jYXItZGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2FyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1saXN0LmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogQ2FyTGlzdENvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJjYXItZGV0YWlsLzppZFwiLCBjb21wb25lbnQ6IENhckRldGFpbENvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJjYXItZGV0YWlsLWVkaXQvOmlkXCIsIGNvbXBvbmVudDogQ2FyRGV0YWlsRWRpdENvbXBvbmVudCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyc1JvdXRpbmdNb2R1bGUgeyB9XG4iXX0=