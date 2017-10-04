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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcnMtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBRXZFLHlGQUFxRjtBQUNyRiwwRUFBdUU7QUFDdkUsMkRBQXdEO0FBRXhELElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUscUNBQWdCLEVBQUU7SUFDekMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxrREFBc0IsRUFBRTtDQUNyRSxDQUFDO0FBTUY7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQUo3QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztBQUFyQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgQ2FyRGV0YWlsRWRpdENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1kZXRhaWwtZWRpdC9jYXItZGV0YWlsLWVkaXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENhckRldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1kZXRhaWwvY2FyLWRldGFpbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2FyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1saXN0LmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogQ2FyTGlzdENvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiBcImNhci1kZXRhaWwvOmlkXCIsIGNvbXBvbmVudDogQ2FyRGV0YWlsQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwiY2FyLWRldGFpbC1lZGl0LzppZFwiLCBjb21wb25lbnQ6IENhckRldGFpbEVkaXRDb21wb25lbnQgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyc1JvdXRpbmdNb2R1bGUgeyB9XHJcbiJdfQ==