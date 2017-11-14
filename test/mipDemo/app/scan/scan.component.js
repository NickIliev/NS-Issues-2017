"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("data/observable-array");
var bluetooth_scanner_1 = require("nativescript-mip-ble/bluetooth.scanner");
var all_mips_1 = require("../all-mips");
var core_1 = require("@angular/core");
var ScanComponent = (function () {
    function ScanComponent() {
        this.scanner = new bluetooth_scanner_1.BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();
        this.devicesAround = new observable_array_1.ObservableArray();
    }
    ScanComponent.prototype.getPermissions = function () {
        this.scanner.initialisePermissionsIfRequired();
    };
    ScanComponent.prototype.connect = function (args) {
        console.log("args: " + args.index);
        var mipDevice = this.devicesAround.getItem(args.index);
        // mipDevice.connect(this.onDisconnected)
        mipDevice.connect(function () { })
            .then(function (UUID) {
            all_mips_1.AllMips.addMipDevice(mipDevice);
            alert("Device Connected");
        });
    };
    ScanComponent.prototype.scan = function () {
        // var listView: RadListView = eventData.object;
        var _this = this;
        this.devicesAround.splice(0);
        this.scanner.scan(function (mip) { return _this.devicesAround.push(mip); })
            .then(function () {
            // listView.notifyPullToRefreshFinished();
        }, function (err) {
            // listView.notifyPullToRefreshFinished();
            alert("error while scanning: " + err);
        });
    };
    ScanComponent.prototype.onDisconnected = function (mip) {
        all_mips_1.AllMips.removeMip(mip);
    };
    ScanComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mip-scan',
            templateUrl: './scan.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ScanComponent);
    return ScanComponent;
}());
exports.ScanComponent = ScanComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2FuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF3RDtBQUN4RCw0RUFBMEU7QUFFMUUsd0NBQXNDO0FBRXRDLHNDQUEwQztBQU8xQztJQUlJO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG9DQUFnQixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBRS9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxrQ0FBZSxFQUFhLENBQUM7SUFDMUQsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTSwrQkFBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUseUNBQXlDO1FBQ3pDLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBUSxDQUFDLENBQUM7YUFDdkIsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNQLGtCQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVNLDRCQUFJLEdBQVg7UUFDSSxnREFBZ0Q7UUFEcEQsaUJBY0M7UUFYRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQWMsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUE1QixDQUE0QixDQUFDO2FBQzlELElBQUksQ0FDTDtZQUNJLDBDQUEwQztRQUM5QyxDQUFDLEVBQ0QsVUFBQyxHQUFHO1lBQ0EsMENBQTBDO1lBQzFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTyxzQ0FBYyxHQUF0QixVQUF1QixHQUFjO1FBQ2pDLGtCQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUE1Q1EsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7U0FDdkMsQ0FBQzs7T0FDVyxhQUFhLENBNkN6QjtJQUFELG9CQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBCbHVldG9vdGhTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL2JsdWV0b290aC5zY2FubmVyXCI7XG5pbXBvcnQgeyBNaXBEZXZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1pcC1ibGUvbWlwLWRldmljZVwiO1xuaW1wb3J0IHsgQWxsTWlwcyB9IGZyb20gXCIuLi9hbGwtbWlwc1wiO1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ21pcC1zY2FuJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2Nhbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2NhbkNvbXBvbmVudCB7XG4gICAgcHVibGljIHNjYW5uZXI6IEJsdWV0b290aFNjYW5uZXI7XG4gICAgcHVibGljIGRldmljZXNBcm91bmQ6IE9ic2VydmFibGVBcnJheTxNaXBEZXZpY2U+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2Nhbm5lciA9IG5ldyBCbHVldG9vdGhTY2FubmVyKCk7XG4gICAgICAgIHRoaXMuc2Nhbm5lci5pbml0aWFsaXNlUGVybWlzc2lvbnNJZlJlcXVpcmVkKCk7XG5cbiAgICAgICAgdGhpcy5kZXZpY2VzQXJvdW5kID0gbmV3IE9ic2VydmFibGVBcnJheTxNaXBEZXZpY2U+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBlcm1pc3Npb25zKCkge1xuICAgICAgICB0aGlzLnNjYW5uZXIuaW5pdGlhbGlzZVBlcm1pc3Npb25zSWZSZXF1aXJlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25uZWN0KGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhcmdzOiBcIiArIGFyZ3MuaW5kZXgpO1xuICAgICAgICB2YXIgbWlwRGV2aWNlOiBNaXBEZXZpY2UgPSB0aGlzLmRldmljZXNBcm91bmQuZ2V0SXRlbShhcmdzLmluZGV4KTtcbiAgICAgICAgLy8gbWlwRGV2aWNlLmNvbm5lY3QodGhpcy5vbkRpc2Nvbm5lY3RlZClcbiAgICAgICAgbWlwRGV2aWNlLmNvbm5lY3QoKCkgPT4geyB9KVxuICAgICAgICAgICAgLnRoZW4oKFVVSUQpID0+IHtcbiAgICAgICAgICAgICAgICBBbGxNaXBzLmFkZE1pcERldmljZShtaXBEZXZpY2UpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRGV2aWNlIENvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHNjYW4oKSB7XG4gICAgICAgIC8vIHZhciBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBldmVudERhdGEub2JqZWN0O1xuXG4gICAgICAgIHRoaXMuZGV2aWNlc0Fyb3VuZC5zcGxpY2UoMCk7XG5cbiAgICAgICAgdGhpcy5zY2FubmVyLnNjYW4oKG1pcDogTWlwRGV2aWNlKSA9PiB0aGlzLmRldmljZXNBcm91bmQucHVzaChtaXApKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3Igd2hpbGUgc2Nhbm5pbmc6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EaXNjb25uZWN0ZWQobWlwOiBNaXBEZXZpY2UpIHtcbiAgICAgICAgQWxsTWlwcy5yZW1vdmVNaXAobWlwKTtcbiAgICB9XG59Il19