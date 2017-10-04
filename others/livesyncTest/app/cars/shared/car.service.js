"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var Rx_1 = require("rxjs/Rx");
var car_model_1 = require("./car.model");
var editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];
/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
var CarService = /** @class */ (function () {
    function CarService(_ngZone) {
        this._ngZone = _ngZone;
        this._cars = [];
    }
    CarService_1 = CarService;
    CarService.cloneUpdateModel = function (car) {
        return editableProperties.reduce(function (a, e) { return (a[e] = car[e], a); }, {});
    };
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
    CarService.prototype.update = function (carModel) {
        var updateModel = CarService_1.cloneUpdateModel(carModel);
        return firebase.update("/cars/" + carModel.id, updateModel);
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
                    this._cars.push(new car_model_1.Car(data[id]));
                }
            }
        }
        return this._cars;
    };
    CarService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error);
    };
    CarService = CarService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CarService);
    return CarService;
    var CarService_1;
}());
exports.CarService = CarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRDtBQUVuRCx1REFBMEQ7QUFDMUQsOEJBQXFDO0FBR3JDLHlDQUFrQztBQUVsQyxJQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLE9BQU87SUFDUCxVQUFVO0lBQ1YsU0FBUztJQUNULE1BQU07SUFDTixPQUFPO0lBQ1AsT0FBTztJQUNQLGNBQWM7SUFDZCxPQUFPO0NBQ1YsQ0FBQztBQUVGOzs7Ozs7OzhEQU84RDtBQUU5RDtJQU9JLG9CQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUYzQixVQUFLLEdBQWUsRUFBRSxDQUFDO0lBRVEsQ0FBQzttQkFQL0IsVUFBVTtJQUNKLDJCQUFnQixHQUEvQixVQUFnQyxHQUFRO1FBQ3BDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFsQixDQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFNRCwrQkFBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRztZQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQseUJBQUksR0FBSjtRQUFBLGlCQVlDO1FBWEcsTUFBTSxDQUFDLElBQUksZUFBVSxDQUFDLFVBQUMsUUFBYTtZQUNoQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUM7WUFFcEIsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLFFBQWE7UUFDaEIsSUFBTSxXQUFXLEdBQUcsWUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxnQ0FBVyxHQUFYLFVBQVksY0FBc0IsRUFBRSxhQUFxQjtRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN2QixhQUFhLGVBQUE7WUFDYixjQUFjLGdCQUFBO1lBQ2QsVUFBVSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLG1DQUFjLEdBQXRCLFVBQXVCLElBQVM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLEdBQUcsQ0FBQyxDQUFDLElBQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU8saUNBQVksR0FBcEIsVUFBcUIsS0FBZTtRQUNoQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBL0RRLFVBQVU7UUFEdEIsaUJBQVUsRUFBRTt5Q0FRb0IsYUFBTTtPQVAxQixVQUFVLENBZ0V0QjtJQUFELGlCQUFDOztDQUFBLEFBaEVELElBZ0VDO0FBaEVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcbmltcG9ydCB7IENhciB9IGZyb20gXCIuL2Nhci5tb2RlbFwiO1xuXG5jb25zdCBlZGl0YWJsZVByb3BlcnRpZXMgPSBbXG4gICAgXCJkb29yc1wiLFxuICAgIFwiaW1hZ2VVcmxcIixcbiAgICBcImx1Z2dhZ2VcIixcbiAgICBcIm5hbWVcIixcbiAgICBcInByaWNlXCIsXG4gICAgXCJzZWF0c1wiLFxuICAgIFwidHJhbnNtaXNzaW9uXCIsXG4gICAgXCJjbGFzc1wiXG5dO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBUaGlzIGlzIHRoZSBtYXN0ZXIgZGV0YWlsIGRhdGEgc2VydmljZS4gSXQgaGFuZGxlcyBhbGwgdGhlIGRhdGEgb3BlcmF0aW9uc1xuKiBvZiByZXRyaWV2aW5nIGFuZCB1cGRhdGluZyB0aGUgZGF0YS4gSW4gdGhpcyBjYXNlLCBpdCBpcyBjb25uZWN0ZWQgdG8gRmlyZWJhc2UgYW5kXG4qIGlzIHVzaW5nIHRoZSB7Tn0gRmlyZWJhc2UgcGx1Z2luLiBMZWFybiBtb3JlIGFib3V0IGl0IGhlcmU6XG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9FZGR5VmVyYnJ1Z2dlbi9uYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXG4qIFRoZSB7Tn0gRmlyZWJhc2UgcGx1Z2luIG5lZWRzIHNvbWUgaW5pdGlhbGl6YXRpb24gc3RlcHMgYmVmb3JlIHRoZSBhcHAgc3RhcnRzLlxuKiBDaGVjayBvdXQgaG93IGl0IGlzIGltcG9ydGVkIGluIHRoZSBtYWluLnRzIGZpbGUgYW5kIHRoZSBhY3R1YWwgc2NyaXB0IGluIC9zaGFyZWQvZmlyZWJhc2UuY29tbW9uLnRzIGZpbGUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhclNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGNsb25lVXBkYXRlTW9kZWwoY2FyOiBDYXIpOiBvYmplY3Qge1xuICAgICAgICByZXR1cm4gZWRpdGFibGVQcm9wZXJ0aWVzLnJlZHVjZSgoYSwgZSkgPT4gKGFbZV0gPSBjYXJbZV0sIGEpLCB7fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FyczogQXJyYXk8Q2FyPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHsgfVxuXG4gICAgZ2V0Q2FyQnlJZChpZDogc3RyaW5nKTogQ2FyIHtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhcnMuZmlsdGVyKChjYXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYXIuaWQgPT09IGlkO1xuICAgICAgICB9KVswXTtcbiAgICB9XG5cbiAgICBsb2FkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwiY2Fyc1wiO1xuXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgICAgIH0pLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoY2FyTW9kZWw6IENhcik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU1vZGVsID0gQ2FyU2VydmljZS5jbG9uZVVwZGF0ZU1vZGVsKGNhck1vZGVsKTtcblxuICAgICAgICByZXR1cm4gZmlyZWJhc2UudXBkYXRlKFwiL2NhcnMvXCIgKyBjYXJNb2RlbC5pZCwgdXBkYXRlTW9kZWwpO1xuICAgIH1cblxuICAgIHVwbG9hZEltYWdlKHJlbW90ZUZ1bGxQYXRoOiBzdHJpbmcsIGxvY2FsRnVsbFBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBmaXJlYmFzZS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGgsXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aCxcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpOiBBcnJheTxDYXI+IHtcbiAgICAgICAgdGhpcy5fY2FycyA9IFtdO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2Fycy5wdXNoKG5ldyBDYXIoZGF0YVtpZF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY2FycztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gICAgfVxufVxuIl19