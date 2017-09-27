"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var file_system_1 = require("file-system");
var imagePicker = require("nativescript-imagepicker");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
var car_model_1 = require("../shared/car-model");
var car_service_1 = require("../shared/car-service");
var roundingValueConverter_1 = require("./roundingValueConverter");
var visibilityValueConverter_1 = require("./visibilityValueConverter");
var tempImageFolderName = "nsimagepicker";
var CarDetailEditViewModel = (function (_super) {
    __extends(CarDetailEditViewModel, _super);
    function CarDetailEditViewModel(car) {
        var _this = _super.call(this) || this;
        // get a fresh editable copy of car model
        _this.car = new car_model_1.Car(car);
        _this.isUpdating = false;
        _this._carService = car_service_1.CarService.getInstance();
        _this._isCarImageDirty = false;
        // set up value converter to force iOS UISlider to work with discrete steps
        _this._roundingValueConverter = new roundingValueConverter_1.RoundingValueConverter();
        _this._visibilityValueConverter = new visibilityValueConverter_1.VisibilityValueConverter();
        return _this;
    }
    Object.defineProperty(CarDetailEditViewModel, "imageTempFolder", {
        get: function () {
            return file_system_1.knownFolders.temp().getFolder(tempImageFolderName);
        },
        enumerable: true,
        configurable: true
    });
    CarDetailEditViewModel.clearImageTempFolder = function () {
        CarDetailEditViewModel.imageTempFolder.clear();
    };
    Object.defineProperty(CarDetailEditViewModel.prototype, "roundingValueConverter", {
        get: function () {
            return this._roundingValueConverter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditViewModel.prototype, "visibilityValueConverter", {
        get: function () {
            return this._visibilityValueConverter;
        },
        enumerable: true,
        configurable: true
    });
    CarDetailEditViewModel.prototype.saveChanges = function () {
        var _this = this;
        var queue = Promise.resolve();
        this.isUpdating = true;
        // TODO: car image should be required field
        if (this._isCarImageDirty && this.car.imageUrl) {
            queue = queue
                .then(function () {
                // no need to explicitly delete old image as upload to an existing remote path overwrites it
                var localFullPath = _this.car.imageUrl;
                var remoteFullPath = _this.car.imageStoragePath;
                return _this._carService.uploadImage(remoteFullPath, localFullPath);
            })
                .then(function (uploadedFile) {
                _this.car.imageUrl = uploadedFile.url;
                _this._isCarImageDirty = false;
            });
        }
        return queue.then(function () {
            return _this._carService.update(_this.car);
        }).then(function () { return _this.isUpdating = false; })
            .catch(function (errorMessage) {
            _this.isUpdating = false;
            throw errorMessage;
        });
    };
    CarDetailEditViewModel.prototype.onImageAddRemove = function () {
        if (this.car.imageUrl) {
            this.handleImageChange(null);
            return;
        }
        CarDetailEditViewModel.clearImageTempFolder();
        this.pickImage();
    };
    CarDetailEditViewModel.prototype.pickImage = function () {
        var _this = this;
        var context = imagePicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () { return context.present(); })
            .then(function (selection) { return selection.forEach(function (selectedAsset) {
            selectedAsset.getImage({ maxHeight: 768 })
                .then(function (imageSource) { return _this.handleImageChange(imageSource); });
        }); }).catch(function (errorMessage) { return console.log(errorMessage); });
    };
    CarDetailEditViewModel.prototype.handleImageChange = function (source) {
        var raisePropertyChange = true;
        var tempImagePath = null;
        if (source) {
            tempImagePath = file_system_1.path.join(CarDetailEditViewModel.imageTempFolder.path, Date.now() + ".jpg");
            raisePropertyChange = source.saveToFile(tempImagePath, "jpeg");
        }
        if (raisePropertyChange) {
            this.car.imageUrl = tempImagePath;
            this._isCarImageDirty = true;
        }
    };
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", car_model_1.Car)
    ], CarDetailEditViewModel.prototype, "car", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Boolean)
    ], CarDetailEditViewModel.prototype, "isUpdating", void 0);
    return CarDetailEditViewModel;
}(observable_1.Observable));
exports.CarDetailEditViewModel = CarDetailEditViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC1lZGl0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXItZGV0YWlsLWVkaXQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywyQ0FBeUQ7QUFFekQsc0RBQXdEO0FBRXhELDRGQUFnRjtBQUNoRixpREFBMEM7QUFDMUMscURBQW1EO0FBQ25ELG1FQUFrRTtBQUNsRSx1RUFBc0U7QUFFdEUsSUFBTSxtQkFBbUIsR0FBRyxlQUFlLENBQUM7QUFFNUM7SUFBNEMsMENBQVU7SUFpQmxELGdDQUFZLEdBQVE7UUFBcEIsWUFDSSxpQkFBTyxTQWNWO1FBWkcseUNBQXlDO1FBQ3pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxlQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsS0FBSSxDQUFDLFdBQVcsR0FBRyx3QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFOUIsMkVBQTJFO1FBQzNFLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLCtDQUFzQixFQUFFLENBQUM7UUFFNUQsS0FBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksbURBQXdCLEVBQUUsQ0FBQzs7SUFDcEUsQ0FBQztJQS9CRCxzQkFBVyx5Q0FBZTthQUExQjtZQUNJLE1BQU0sQ0FBQywwQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBRWMsMkNBQW9CLEdBQW5DO1FBQ0ksc0JBQXNCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25ELENBQUM7SUEyQkQsc0JBQUksMERBQXNCO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUN4QyxD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QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXpCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxhQUFhLEdBQUcsa0JBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLElBQUksRUFBSyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQU0sQ0FBQyxDQUFDO1lBQzVGLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUF6R3FCO1FBQXJCLGtEQUFrQixFQUFFO2tDQUFNLGVBQUc7dURBQUM7SUFDVDtRQUFyQixrREFBa0IsRUFBRTs7OERBQXFCO0lBeUc5Qyw2QkFBQztDQUFBLEFBbkhELENBQTRDLHVCQUFVLEdBbUhyRDtBQW5IWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBGb2xkZXIsIGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vYnNlcnZhYmxlLXByb3BlcnR5LWRlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi4vc2hhcmVkL2Nhci1tb2RlbFwiO1xyXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jYXItc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3VuZGluZ1ZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vcm91bmRpbmdWYWx1ZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBWaXNpYmlsaXR5VmFsdWVDb252ZXJ0ZXIgfSBmcm9tIFwiLi92aXNpYmlsaXR5VmFsdWVDb252ZXJ0ZXJcIjtcclxuXHJcbmNvbnN0IHRlbXBJbWFnZUZvbGRlck5hbWUgPSBcIm5zaW1hZ2VwaWNrZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJEZXRhaWxFZGl0Vmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBzdGF0aWMgZ2V0IGltYWdlVGVtcEZvbGRlcigpOiBGb2xkZXIge1xyXG4gICAgICAgIHJldHVybiBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcih0ZW1wSW1hZ2VGb2xkZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjbGVhckltYWdlVGVtcEZvbGRlcigpOiB2b2lkIHtcclxuICAgICAgICBDYXJEZXRhaWxFZGl0Vmlld01vZGVsLmltYWdlVGVtcEZvbGRlci5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBjYXI6IENhcjtcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBpc1VwZGF0aW5nOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX3JvdW5kaW5nVmFsdWVDb252ZXJ0ZXI6IFJvdW5kaW5nVmFsdWVDb252ZXJ0ZXI7XHJcbiAgICBwcml2YXRlIF92aXNpYmlsaXR5VmFsdWVDb252ZXJ0ZXI6IFZpc2liaWxpdHlWYWx1ZUNvbnZlcnRlcjtcclxuICAgIHByaXZhdGUgX2lzQ2FySW1hZ2VEaXJ0eTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FyOiBDYXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvLyBnZXQgYSBmcmVzaCBlZGl0YWJsZSBjb3B5IG9mIGNhciBtb2RlbFxyXG4gICAgICAgIHRoaXMuY2FyID0gbmV3IENhcihjYXIpO1xyXG5cclxuICAgICAgICB0aGlzLmlzVXBkYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FyU2VydmljZSA9IENhclNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9pc0NhckltYWdlRGlydHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHVwIHZhbHVlIGNvbnZlcnRlciB0byBmb3JjZSBpT1MgVUlTbGlkZXIgdG8gd29yayB3aXRoIGRpc2NyZXRlIHN0ZXBzXHJcbiAgICAgICAgdGhpcy5fcm91bmRpbmdWYWx1ZUNvbnZlcnRlciA9IG5ldyBSb3VuZGluZ1ZhbHVlQ29udmVydGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Zpc2liaWxpdHlWYWx1ZUNvbnZlcnRlciA9IG5ldyBWaXNpYmlsaXR5VmFsdWVDb252ZXJ0ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcm91bmRpbmdWYWx1ZUNvbnZlcnRlcigpOiBSb3VuZGluZ1ZhbHVlQ29udmVydGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm91bmRpbmdWYWx1ZUNvbnZlcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlzaWJpbGl0eVZhbHVlQ29udmVydGVyKCk6IFZpc2liaWxpdHlWYWx1ZUNvbnZlcnRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2liaWxpdHlWYWx1ZUNvbnZlcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ2hhbmdlcygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzVXBkYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBjYXIgaW1hZ2Ugc2hvdWxkIGJlIHJlcXVpcmVkIGZpZWxkXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2FySW1hZ2VEaXJ0eSAmJiB0aGlzLmNhci5pbWFnZVVybCkge1xyXG4gICAgICAgICAgICBxdWV1ZSA9IHF1ZXVlXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBleHBsaWNpdGx5IGRlbGV0ZSBvbGQgaW1hZ2UgYXMgdXBsb2FkIHRvIGFuIGV4aXN0aW5nIHJlbW90ZSBwYXRoIG92ZXJ3cml0ZXMgaXRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbEZ1bGxQYXRoID0gdGhpcy5jYXIuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3RlRnVsbFBhdGggPSB0aGlzLmNhci5pbWFnZVN0b3JhZ2VQYXRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FyU2VydmljZS51cGxvYWRJbWFnZShyZW1vdGVGdWxsUGF0aCwgbG9jYWxGdWxsUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHVwbG9hZGVkRmlsZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXIuaW1hZ2VVcmwgPSB1cGxvYWRlZEZpbGUudXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0NhckltYWdlRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHF1ZXVlLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FyU2VydmljZS51cGRhdGUodGhpcy5jYXIpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4gdGhpcy5pc1VwZGF0aW5nID0gZmFsc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkltYWdlQWRkUmVtb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNhci5pbWFnZVVybCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUltYWdlQ2hhbmdlKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ2FyRGV0YWlsRWRpdFZpZXdNb2RlbC5jbGVhckltYWdlVGVtcEZvbGRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnBpY2tJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGlja0ltYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnRleHRcclxuICAgICAgICAgICAgLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuICAgICAgICAgICAgICAgIChzZWxlY3RlZEFzc2V0OiBpbWFnZVBpY2tlci5TZWxlY3RlZEFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBc3NldC5nZXRJbWFnZSh7IG1heEhlaWdodDogNzY4IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2UpID0+IHRoaXMuaGFuZGxlSW1hZ2VDaGFuZ2UoaW1hZ2VTb3VyY2UpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUltYWdlQ2hhbmdlKHNvdXJjZTogSW1hZ2VTb3VyY2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmFpc2VQcm9wZXJ0eUNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRlbXBJbWFnZVBhdGggPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRlbXBJbWFnZVBhdGggPSBwYXRoLmpvaW4oQ2FyRGV0YWlsRWRpdFZpZXdNb2RlbC5pbWFnZVRlbXBGb2xkZXIucGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcbiAgICAgICAgICAgIHJhaXNlUHJvcGVydHlDaGFuZ2UgPSBzb3VyY2Uuc2F2ZVRvRmlsZSh0ZW1wSW1hZ2VQYXRoLCBcImpwZWdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmFpc2VQcm9wZXJ0eUNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhci5pbWFnZVVybCA9IHRlbXBJbWFnZVBhdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQ2FySW1hZ2VEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==