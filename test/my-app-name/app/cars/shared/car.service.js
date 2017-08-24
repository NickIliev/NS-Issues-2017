"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var firebase = require("nativescript-plugin-firebase");
var car_model_1 = require("./car.model");
/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
var CarService = (function () {
    function CarService(_ngZone) {
        this._ngZone = _ngZone;
        this._cars = [];
    }
    CarService.prototype.getCarById = function (id) {
        if (!id) {
            return;
        }
        return this._cars.filter(function (car) {
            return car.id === id;
        })[0];
    };
    CarService.prototype.load = function () {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            var path = "cars";
            var onValueEvent = function (snapshot) {
                _this._ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).catch(this.handleErrors);
    };
    CarService.prototype.update = function (editObject) {
        return firebase.update("/cars/" + editObject.id, editObject);
    };
    CarService.prototype.uploadImage = function (remoteFullPath, localFullPath) {
        return firebase.uploadFile({
            localFullPath: localFullPath,
            remoteFullPath: remoteFullPath,
            onProgress: null
        });
    };
    CarService.prototype.handleSnapshot = function (data) {
        this._cars = [];
        if (data) {
            for (var id in data) {
                if (data.hasOwnProperty(id)) {
                    var result = Object.assign.apply(Object, [{ id: id }].concat(data[id]));
                    this._cars.push(new car_model_1.Car(result));
                }
            }
        }
        return this._cars;
    };
    CarService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error);
    };
    return CarService;
}());
CarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRDtBQUVuRCw4QkFBcUM7QUFDckMsdURBQTBEO0FBRzFELHlDQUFrQztBQUVsQzs7Ozs7Ozs4REFPOEQ7QUFFOUQsSUFBYSxVQUFVO0lBR25CLG9CQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUYzQixVQUFLLEdBQWUsRUFBRSxDQUFDO0lBRVEsQ0FBQztJQUV4QywrQkFBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRztZQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQseUJBQUksR0FBSjtRQUFBLGlCQVlDO1FBWEcsTUFBTSxDQUFDLElBQUksZUFBVSxDQUFDLFVBQUMsUUFBYTtZQUNoQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUM7WUFFcEIsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLFVBQWU7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxjQUFzQixFQUFFLGFBQXFCO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3ZCLGFBQWEsZUFBQTtZQUNiLGNBQWMsZ0JBQUE7WUFDZCxVQUFVLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sbUNBQWMsR0FBdEIsVUFBdUIsSUFBUztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsR0FBRyxDQUFDLENBQUMsSUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLE9BQWIsTUFBTSxHQUFRLEVBQUUsRUFBRSxJQUFBLEVBQUUsU0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVPLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWU7UUFDaEMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQztBQTNEWSxVQUFVO0lBRHRCLGlCQUFVLEVBQUU7cUNBSW9CLGFBQU07R0FIMUIsVUFBVSxDQTJEdEI7QUEzRFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuaW1wb3J0IHsgQ2FyIH0gZnJvbSBcIi4vY2FyLm1vZGVsXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIG1hc3RlciBkZXRhaWwgZGF0YSBzZXJ2aWNlLiBJdCBoYW5kbGVzIGFsbCB0aGUgZGF0YSBvcGVyYXRpb25zXHJcbiogb2YgcmV0cmlldmluZyBhbmQgdXBkYXRpbmcgdGhlIGRhdGEuIEluIHRoaXMgY2FzZSwgaXQgaXMgY29ubmVjdGVkIHRvIEZpcmViYXNlIGFuZFxyXG4qIGlzIHVzaW5nIHRoZSB7Tn0gRmlyZWJhc2UgcGx1Z2luLiBMZWFybiBtb3JlIGFib3V0IGl0IGhlcmU6XHJcbiogaHR0cHM6Ly9naXRodWIuY29tL0VkZHlWZXJicnVnZ2VuL25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcclxuKiBUaGUge059IEZpcmViYXNlIHBsdWdpbiBuZWVkcyBzb21lIGluaXRpYWxpemF0aW9uIHN0ZXBzIGJlZm9yZSB0aGUgYXBwIHN0YXJ0cy5cclxuKiBDaGVjayBvdXQgaG93IGl0IGlzIGltcG9ydGVkIGluIHRoZSBtYWluLnRzIGZpbGUgYW5kIHRoZSBhY3R1YWwgc2NyaXB0IGluIC9zaGFyZWQvZmlyZWJhc2UuY29tbW9uLnRzIGZpbGUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY2FyczogQXJyYXk8Q2FyPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgICBnZXRDYXJCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJzLmZpbHRlcigoY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXIuaWQgPT09IGlkO1xyXG4gICAgICAgIH0pWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwiY2Fyc1wiO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xyXG4gICAgICAgIH0pLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWRpdE9iamVjdDogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnVwZGF0ZShcIi9jYXJzL1wiICsgZWRpdE9iamVjdC5pZCwgZWRpdE9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkSW1hZ2UocmVtb3RlRnVsbFBhdGg6IHN0cmluZywgbG9jYWxGdWxsUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICBsb2NhbEZ1bGxQYXRoLFxyXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aCxcclxuICAgICAgICAgICAgb25Qcm9ncmVzczogbnVsbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU25hcHNob3QoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY2FycyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oeyBpZCB9LCAuLi5kYXRhW2lkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2Fycy5wdXNoKG5ldyBDYXIocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcclxuICAgIH1cclxufVxyXG4iXX0=