"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var imagePicker = require("nativescript-imagepicker");
var permissions = require("nativescript-permissions");
var platform = require("tns-core-modules/platform");
/* ***********************************************************
* The ImageAddRemove custom component uses an imagepicker plugin to let the user select
* an image and provides custom logic and design to the process.
*************************************************************/
var ImageAddRemoveComponent = (function () {
    function ImageAddRemoveComponent() {
        this.imageUrl = "";
        this.selectionChanged = new core_1.EventEmitter();
    }
    ImageAddRemoveComponent.prototype.onImageAddRemoveTap = function () {
        var _this = this;
        if (this.imageUrl) {
            this.handleImageChange(null);
            return;
        }
        var context = imagePicker.create({
            mode: "single"
        });
        var queue = Promise.resolve();
        // lower SDK versions will grant permission from AndroidManifest file
        if (platform.device.os === "Android" && Number(platform.device.sdkVersion) >= 23) {
            queue = queue.then(function () { return permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE"); });
        }
        queue.then(function () { return _this.startSelection(context); })
            .catch(function (errorMessage) { return console.log(errorMessage); });
    };
    ImageAddRemoveComponent.prototype.startSelection = function (context) {
        var _this = this;
        context
            .authorize()
            .then(function () { return context.present(); })
            .then(function (selection) { return selection.forEach(function (selectedImage) { return _this.handleImageChange(selectedImage.fileUri); }); })
            .catch(function (errorMessage) { return console.log(errorMessage); });
    };
    ImageAddRemoveComponent.prototype.handleImageChange = function (newValue) {
        var oldValue = this.imageUrl;
        if (newValue) {
            // iOS simulator fileUri looks like file:///Users/...
            newValue = newValue.replace("file://", "");
        }
        if (oldValue === newValue) {
            return;
        }
        this.imageUrl = newValue;
        this.selectionChanged.emit({ oldValue: oldValue, newValue: newValue });
    };
    return ImageAddRemoveComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageAddRemoveComponent.prototype, "imageUrl", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageAddRemoveComponent.prototype, "selectionChanged", void 0);
ImageAddRemoveComponent = __decorate([
    core_1.Component({
        selector: "ImageAddRemove",
        moduleId: module.id,
        templateUrl: "./image-add-remove.component.html",
        styleUrls: ["./image-add-remove.component.css"]
    })
], ImageAddRemoveComponent);
exports.ImageAddRemoveComponent = ImageAddRemoveComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RTtBQUN2RSxzREFBd0Q7QUFDeEQsc0RBQXdEO0FBQ3hELG9EQUFzRDtBQUV0RDs7OzhEQUc4RDtBQU85RCxJQUFhLHVCQUF1QjtJQU5wQztRQU9hLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDckIscUJBQWdCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBK0N2RSxDQUFDO0lBN0NHLHFEQUFtQixHQUFuQjtRQUFBLGlCQW9CQztRQW5CRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0IsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDL0IsSUFBSSxFQUFFLFFBQVE7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTlCLHFFQUFxRTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsV0FBVyxDQUFDLGlCQUFpQixDQUFDLDBDQUEwQyxDQUFDLEVBQXpFLENBQXlFLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQzthQUN6QyxLQUFLLENBQUMsVUFBQyxZQUFpQixJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxnREFBYyxHQUFkLFVBQWUsT0FBTztRQUF0QixpQkFNQztRQUxHLE9BQU87YUFDRixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBQyxTQUFTLElBQUssT0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsYUFBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxFQUFuRixDQUFtRixDQUFDO2FBQ3hHLEtBQUssQ0FBQyxVQUFDLFlBQWlCLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELG1EQUFpQixHQUFqQixVQUFrQixRQUFRO1FBQ3RCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLHFEQUFxRDtZQUNyRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFoRFk7SUFBUixZQUFLLEVBQUU7O3lEQUF1QjtBQUNyQjtJQUFULGFBQU0sRUFBRTs4QkFBbUIsbUJBQVk7aUVBQTJCO0FBRjFELHVCQUF1QjtJQU5uQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztLQUNsRCxDQUFDO0dBQ1csdUJBQXVCLENBaURuQztBQWpEWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGUgSW1hZ2VBZGRSZW1vdmUgY3VzdG9tIGNvbXBvbmVudCB1c2VzIGFuIGltYWdlcGlja2VyIHBsdWdpbiB0byBsZXQgdGhlIHVzZXIgc2VsZWN0XHJcbiogYW4gaW1hZ2UgYW5kIHByb3ZpZGVzIGN1c3RvbSBsb2dpYyBhbmQgZGVzaWduIHRvIHRoZSBwcm9jZXNzLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkltYWdlQWRkUmVtb3ZlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUFkZFJlbW92ZUNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBpbWFnZVVybDogc3RyaW5nID0gXCJcIjtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBvbkltYWdlQWRkUmVtb3ZlVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlVXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW1hZ2VDaGFuZ2UobnVsbCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcXVldWUgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgLy8gbG93ZXIgU0RLIHZlcnNpb25zIHdpbGwgZ3JhbnQgcGVybWlzc2lvbiBmcm9tIEFuZHJvaWRNYW5pZmVzdCBmaWxlXHJcbiAgICAgICAgaWYgKHBsYXRmb3JtLmRldmljZS5vcyA9PT0gXCJBbmRyb2lkXCIgJiYgTnVtYmVyKHBsYXRmb3JtLmRldmljZS5zZGtWZXJzaW9uKSA+PSAyMykge1xyXG4gICAgICAgICAgICBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4gcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oXCJhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHF1ZXVlLnRoZW4oKCkgPT4gdGhpcy5zdGFydFNlbGVjdGlvbihjb250ZXh0KSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxlY3Rpb24oY29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHRcclxuICAgICAgICAgICAgLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaCgoc2VsZWN0ZWRJbWFnZSkgPT4gdGhpcy5oYW5kbGVJbWFnZUNoYW5nZShzZWxlY3RlZEltYWdlLmZpbGVVcmkpKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSW1hZ2VDaGFuZ2UobmV3VmFsdWUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBpT1Mgc2ltdWxhdG9yIGZpbGVVcmkgbG9va3MgbGlrZSBmaWxlOi8vL1VzZXJzLy4uLlxyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnJlcGxhY2UoXCJmaWxlOi8vXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmltYWdlVXJsID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkLmVtaXQoeyBvbGRWYWx1ZSwgbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19