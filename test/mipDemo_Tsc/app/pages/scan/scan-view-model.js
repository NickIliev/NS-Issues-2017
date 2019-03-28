"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("tns-core-modules/data/observable-array");
var bluetooth_scanner_1 = require("nativescript-mip-ble/bluetooth.scanner");
var mip_device_1 = require("nativescript-mip-ble/mip-device");
var all_mips_1 = require("../../all-mips");
var ScanViewModel = /** @class */ (function () {
    function ScanViewModel() {
        //super();
        this.scanner = new bluetooth_scanner_1.BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();
        this.devicesAround = new observable_array_1.ObservableArray();
        this.devicesAround.push(new mip_device_1.MipDevice("B4:99:4C:48:14:24", "Test", "who knows?"));
    }
    ScanViewModel.prototype.getPermissions = function () {
        this.scanner.initialisePermissionsIfRequired();
    };
    ScanViewModel.prototype.connect = function (args) {
        var mipDevice = this.devicesAround.getItem(args.index);
        mipDevice.connect(this.onDisconnected)
            .then(function (UUID) {
            all_mips_1.AllMips.addMipDevice(mipDevice);
            alert("Device Connected");
        });
    };
    ScanViewModel.prototype.scan = function (eventData) {
        var listView = eventData.object;
        this.devicesAround.splice(0);
        this.scanner.scan(this.onRobotFound)
            .then(function () {
            listView.notifyPullToRefreshFinished();
        }, function (err) {
            listView.notifyPullToRefreshFinished();
            alert("error while scanning: " + err);
        });
    };
    ScanViewModel.prototype.onRobotFound = function (mip) {
        exports.Scanner.devicesAround.push(mip);
    };
    ScanViewModel.prototype.onDisconnected = function (mip) {
        all_mips_1.AllMips.removeMip(mip);
    };
    return ScanViewModel;
}());
exports.ScanViewModel = ScanViewModel;
exports.Scanner = new ScanViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nhbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkVBQXlFO0FBQ3pFLDRFQUEwRTtBQUMxRSw4REFBNEQ7QUFFNUQsMkNBQXlDO0FBRXpDO0lBS0k7UUFDSSxVQUFVO1FBRVYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG9DQUFnQixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBRS9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxrQ0FBZSxFQUFhLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBUyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFHTSxzQ0FBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ2pDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDUCxrQkFBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFTSw0QkFBSSxHQUFYLFVBQVksU0FBNEI7UUFDcEMsSUFBSSxRQUFRLEdBQWdCLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMvQixJQUFJLENBQ0w7WUFDSSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUMzQyxDQUFDLEVBQ0QsVUFBQyxHQUFHO1lBQ0EsUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDdkMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVPLG9DQUFZLEdBQXBCLFVBQXFCLEdBQWM7UUFDL0IsZUFBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLHNDQUFjLEdBQXRCLFVBQXVCLEdBQWM7UUFDakMsa0JBQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEWSxzQ0FBYTtBQXNEZixRQUFBLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IEJsdWV0b290aFNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1pcC1ibGUvYmx1ZXRvb3RoLnNjYW5uZXJcIjtcclxuaW1wb3J0IHsgTWlwRGV2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL21pcC1kZXZpY2VcIjtcclxuaW1wb3J0IHsgUmFkTGlzdFZpZXcsIExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcclxuaW1wb3J0IHsgQWxsTWlwcyB9IGZyb20gXCIuLi8uLi9hbGwtbWlwc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjYW5WaWV3TW9kZWwgey8vIGV4dGVuZHMgb2JzZXJ2YWJsZS5PYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwdWJsaWMgc2Nhbm5lcjogQmx1ZXRvb3RoU2Nhbm5lcjtcclxuICAgIHB1YmxpYyBkZXZpY2VzQXJvdW5kOiBPYnNlcnZhYmxlQXJyYXk8TWlwRGV2aWNlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL3N1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nhbm5lciA9IG5ldyBCbHVldG9vdGhTY2FubmVyKCk7XHJcbiAgICAgICAgdGhpcy5zY2FubmVyLmluaXRpYWxpc2VQZXJtaXNzaW9uc0lmUmVxdWlyZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXZpY2VzQXJvdW5kID0gbmV3IE9ic2VydmFibGVBcnJheTxNaXBEZXZpY2U+KCk7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VzQXJvdW5kLnB1c2gobmV3IE1pcERldmljZShcIkI0Ojk5OjRDOjQ4OjE0OjI0XCIsIFwiVGVzdFwiLCBcIndobyBrbm93cz9cIikpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGVybWlzc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FubmVyLmluaXRpYWxpc2VQZXJtaXNzaW9uc0lmUmVxdWlyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChhcmdzKSB7XHJcbiAgICAgICAgdmFyIG1pcERldmljZTogTWlwRGV2aWNlID0gdGhpcy5kZXZpY2VzQXJvdW5kLmdldEl0ZW0oYXJncy5pbmRleCk7XHJcbiAgICAgICAgbWlwRGV2aWNlLmNvbm5lY3QodGhpcy5vbkRpc2Nvbm5lY3RlZClcclxuICAgICAgICAgICAgLnRoZW4oKFVVSUQpID0+IHtcclxuICAgICAgICAgICAgICAgIEFsbE1pcHMuYWRkTWlwRGV2aWNlKG1pcERldmljZSk7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRldmljZSBDb25uZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjYW4oZXZlbnREYXRhOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIHZhciBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBldmVudERhdGEub2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLmRldmljZXNBcm91bmQuc3BsaWNlKDApO1xyXG5cclxuICAgICAgICB0aGlzLnNjYW5uZXIuc2Nhbih0aGlzLm9uUm9ib3RGb3VuZClcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3Igd2hpbGUgc2Nhbm5pbmc6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJvYm90Rm91bmQobWlwOiBNaXBEZXZpY2UpIHtcclxuICAgICAgICBTY2FubmVyLmRldmljZXNBcm91bmQucHVzaChtaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EaXNjb25uZWN0ZWQobWlwOiBNaXBEZXZpY2UpIHtcclxuICAgICAgICBBbGxNaXBzLnJlbW92ZU1pcChtaXApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIFNjYW5uZXIgPSBuZXcgU2NhblZpZXdNb2RlbCgpOyJdfQ==