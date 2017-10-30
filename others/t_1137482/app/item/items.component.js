"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var imagepicker = require("nativescript-imagepicker");
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var ItemsComponent = (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ItemsComponent(itemService, zone) {
        this.itemService = itemService;
        this.zone = zone;
        this.context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        permissions.requestPermission([android.Manifest.permission.READ_EXTERNAL_STORAGE]);
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.pick = function () {
        var _this = this;
        this.context
            .authorize()
            .then(function () {
            return _this.context.present();
        })
            .then(function (selection) {
            selection.forEach(function (selected) {
                var imageSource;
                selected.getImage().then(function (imgSource) {
                    var folder = fs.knownFolders.documents().path;
                    // let downloads = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).toString();
                    var path = fs.path.join(folder, "test.png");
                    var saved = imgSource.saveToFile(path, "png");
                    _this.zone.run(function () {
                        if (saved) {
                            var exif = new android.media.ExifInterface(path);
                            var orientation_1 = exif.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);
                            var gpsTimestamps = exif.getAttribute(android.media.ExifInterface.TAG_GPS_TIMESTAMP);
                            console.log("selected image orientation (EXIF) : " + orientation_1);
                            console.log("selected image gpsTimestamps (EXIF) : " + gpsTimestamps);
                        }
                    });
                });
            });
        }).catch(function (e) {
            // process error
        });
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService, core_1.NgZone])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBRzFELCtDQUE2QztBQUc3QyxzREFBd0Q7QUFDeEQsZ0NBQWtDO0FBQ2xDLHNEQUF3RDtBQVN4RDtJQU1JLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFDakgsd0JBQW9CLFdBQXdCLEVBQVUsSUFBWTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFMbEUsWUFBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyx3Q0FBd0M7U0FDMUQsQ0FBQyxDQUFDO1FBSUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQU8sT0FBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCw2QkFBSSxHQUFKO1FBQUEsaUJBb0NDO1FBbkNHLElBQUksQ0FBQyxPQUFPO2FBQ1gsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUMsU0FBUztZQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO2dCQUV2QixJQUFJLFdBQXdCLENBQUM7Z0JBRTdCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO29CQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDOUMsOEhBQThIO29CQUM5SCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzVDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUU5QyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDVixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNQLElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBRWpELElBQUksYUFBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBQ3BJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFFckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsR0FBRyxhQUFXLENBQUMsQ0FBQzs0QkFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsR0FBRyxhQUFhLENBQUMsQ0FBQzt3QkFDMUUsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDLENBQUMsQ0FBQTtZQUdOLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztZQUNQLGdCQUFnQjtRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFwRFEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FTbUMsMEJBQVcsRUFBZ0IsYUFBTTtPQVJ6RCxjQUFjLENBcUQxQjtJQUFELHFCQUFDO0NBQUEsQUFyREQsSUFxREM7QUFyRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XG5cbmRlY2xhcmUgbGV0IGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcbiAgICAgICAgbW9kZTogXCJzaW5nbGVcIiAvLyB1c2UgXCJtdWx0aXBsZVwiIGZvciBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICB9KTtcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDigJlzIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgXG4gICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKFsoPGFueT5hbmRyb2lkKS5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfRVhURVJOQUxfU1RPUkFHRV0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIH1cblxuICAgIHBpY2soKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFxuICAgICAgICAuYXV0aG9yaXplKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcmVzZW50KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3RlZCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlU291cmNlOiBJbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgICAgIHNlbGVjdGVkLmdldEltYWdlKCkudGhlbihpbWdTb3VyY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBkb3dubG9hZHMgPSBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9EQ0lNKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIsIFwidGVzdC5wbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzYXZlZCA9IGltZ1NvdXJjZS5zYXZlVG9GaWxlKHBhdGgsIFwicG5nXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2F2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhpZiA9IG5ldyBhbmRyb2lkLm1lZGlhLkV4aWZJbnRlcmZhY2UocGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZW50YXRpb24gPSBleGlmLmdldEF0dHJpYnV0ZUludChhbmRyb2lkLm1lZGlhLkV4aWZJbnRlcmZhY2UuVEFHX09SSUVOVEFUSU9OLCBhbmRyb2lkLm1lZGlhLkV4aWZJbnRlcmZhY2UuT1JJRU5UQVRJT05fTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3BzVGltZXN0YW1wcyA9IGV4aWYuZ2V0QXR0cmlidXRlKGFuZHJvaWQubWVkaWEuRXhpZkludGVyZmFjZS5UQUdfR1BTX1RJTUVTVEFNUCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBpbWFnZSBvcmllbnRhdGlvbiAoRVhJRikgOiBcIiArIG9yaWVudGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIGltYWdlIGdwc1RpbWVzdGFtcHMgKEVYSUYpIDogXCIgKyBncHNUaW1lc3RhbXBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgLy8gcHJvY2VzcyBlcnJvclxuICAgICAgICB9KTtcbiAgICB9XG59Il19