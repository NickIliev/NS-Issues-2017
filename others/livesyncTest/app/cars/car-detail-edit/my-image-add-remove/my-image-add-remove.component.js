"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var file_system_1 = require("file-system");
var imagePicker = require("nativescript-imagepicker");
var tempImageFolderName = "nsimagepicker";
var noop = function () { }; // tslint:disable-line no-empty
var MY_IMAGE_ADD_REMOVE_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MyImageAddRemoveComponent; }),
    multi: true
};
/* ***********************************************************
* The MyImageAddRemove custom component uses an imagepicker plugin to let the user select
* an image and provides custom logic and design to the process.
*************************************************************/
var MyImageAddRemoveComponent = /** @class */ (function () {
    function MyImageAddRemoveComponent() {
        // placeholder for the callback later provided by the ControlValueAccessor
        this.propagateChange = noop;
        this.innerImageUrl = "";
    }
    MyImageAddRemoveComponent_1 = MyImageAddRemoveComponent;
    Object.defineProperty(MyImageAddRemoveComponent, "imageTempFolder", {
        get: function () {
            return file_system_1.knownFolders.temp().getFolder(tempImageFolderName);
        },
        enumerable: true,
        configurable: true
    });
    MyImageAddRemoveComponent.clearImageTempFolder = function () {
        MyImageAddRemoveComponent_1.imageTempFolder.clear();
    };
    Object.defineProperty(MyImageAddRemoveComponent.prototype, "imageUrl", {
        get: function () {
            return this.innerImageUrl;
        },
        set: function (value) {
            if (this.innerImageUrl !== value) {
                this.innerImageUrl = value;
                this.propagateChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    // ControlValueAccessor implementation
    MyImageAddRemoveComponent.prototype.writeValue = function (value) {
        if (this.innerImageUrl !== value) {
            this.innerImageUrl = value;
        }
    };
    // ControlValueAccessor implementation
    MyImageAddRemoveComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // ControlValueAccessor implementation
    // tslint:disable-next-line:no-empty
    MyImageAddRemoveComponent.prototype.registerOnTouched = function (fn) {
    };
    MyImageAddRemoveComponent.prototype.onImageAddRemoveTap = function () {
        if (this.imageUrl) {
            this.handleImageChange(null);
            return;
        }
        MyImageAddRemoveComponent_1.clearImageTempFolder();
        this.pickImage();
    };
    MyImageAddRemoveComponent.prototype.pickImage = function () {
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
    MyImageAddRemoveComponent.prototype.handleImageChange = function (source) {
        var raisePropertyChange = true;
        var tempImagePath = null;
        if (source) {
            tempImagePath = file_system_1.path.join(MyImageAddRemoveComponent_1.imageTempFolder.path, Date.now() + ".jpg");
            raisePropertyChange = source.saveToFile(tempImagePath, "jpeg");
        }
        if (raisePropertyChange) {
            this.imageUrl = tempImagePath;
        }
    };
    MyImageAddRemoveComponent = MyImageAddRemoveComponent_1 = __decorate([
        core_1.Component({
            selector: "MyImageAddRemove",
            moduleId: module.id,
            templateUrl: "./my-image-add-remove.component.html",
            styleUrls: ["./my-image-add-remove.component.css"],
            providers: [MY_IMAGE_ADD_REMOVE_CONTROL_VALUE_ACCESSOR]
        })
    ], MyImageAddRemoveComponent);
    return MyImageAddRemoveComponent;
    var MyImageAddRemoveComponent_1;
}());
exports.MyImageAddRemoveComponent = MyImageAddRemoveComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1pbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUNyRSx3Q0FBeUU7QUFDekUsMkNBQXlEO0FBRXpELHNEQUF3RDtBQUV4RCxJQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztBQUM1QyxJQUFNLElBQUksR0FBRyxjQUFRLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtBQUV2RCxJQUFNLDBDQUEwQyxHQUFHO0lBQy9DLE9BQU8sRUFBRSx5QkFBaUI7SUFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGOzs7OERBRzhEO0FBUTlEO0lBUEE7UUFnQkksMEVBQTBFO1FBQ2xFLG9CQUFlLEdBQXFCLElBQUksQ0FBQztRQUV6QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztJQXVFdkMsQ0FBQztrQ0FuRlkseUJBQXlCO0lBQ2xDLHNCQUFXLDRDQUFlO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLDBCQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7SUFFYyw4Q0FBb0IsR0FBbkM7UUFDSSwyQkFBeUIsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQU9ELHNCQUFJLCtDQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBYSxLQUFhO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNC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ImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBGb2xkZXIsIGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5cclxuY29uc3QgdGVtcEltYWdlRm9sZGVyTmFtZSA9IFwibnNpbWFnZXBpY2tlclwiO1xyXG5jb25zdCBub29wID0gKCkgPT4geyB9OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWVtcHR5XHJcblxyXG5jb25zdCBNWV9JTUFHRV9BRERfUkVNT1ZFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnQpLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWZvcndhcmQtcmVmXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGUgTXlJbWFnZUFkZFJlbW92ZSBjdXN0b20gY29tcG9uZW50IHVzZXMgYW4gaW1hZ2VwaWNrZXIgcGx1Z2luIHRvIGxldCB0aGUgdXNlciBzZWxlY3RcclxuKiBhbiBpbWFnZSBhbmQgcHJvdmlkZXMgY3VzdG9tIGxvZ2ljIGFuZCBkZXNpZ24gdG8gdGhlIHByb2Nlc3MuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTXlJbWFnZUFkZFJlbW92ZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXktaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL215LWltYWdlLWFkZC1yZW1vdmUuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIHByb3ZpZGVyczogW01ZX0lNQUdFX0FERF9SRU1PVkVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBzdGF0aWMgZ2V0IGltYWdlVGVtcEZvbGRlcigpOiBGb2xkZXIge1xyXG4gICAgICAgIHJldHVybiBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcih0ZW1wSW1hZ2VGb2xkZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjbGVhckltYWdlVGVtcEZvbGRlcigpOiB2b2lkIHtcclxuICAgICAgICBNeUltYWdlQWRkUmVtb3ZlQ29tcG9uZW50LmltYWdlVGVtcEZvbGRlci5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBsYWNlaG9sZGVyIGZvciB0aGUgY2FsbGJhY2sgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXHJcbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gICAgcHJpdmF0ZSBpbm5lckltYWdlVXJsOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5pbm5lckltYWdlVXJsICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlubmVySW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRhdGlvblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJJbWFnZVVybCAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbm5lckltYWdlVXJsID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudGF0aW9uXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBvbkltYWdlQWRkUmVtb3ZlVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlVXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW1hZ2VDaGFuZ2UobnVsbCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNeUltYWdlQWRkUmVtb3ZlQ29tcG9uZW50LmNsZWFySW1hZ2VUZW1wRm9sZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGlja0ltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGlja0ltYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnRleHRcclxuICAgICAgICAgICAgLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuICAgICAgICAgICAgICAgIChzZWxlY3RlZEFzc2V0OiBpbWFnZVBpY2tlci5TZWxlY3RlZEFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBc3NldC5nZXRJbWFnZSh7IG1heEhlaWdodDogNzY4IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2UpID0+IHRoaXMuaGFuZGxlSW1hZ2VDaGFuZ2UoaW1hZ2VTb3VyY2UpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUltYWdlQ2hhbmdlKHNvdXJjZTogSW1hZ2VTb3VyY2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmFpc2VQcm9wZXJ0eUNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRlbXBJbWFnZVBhdGggPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRlbXBJbWFnZVBhdGggPSBwYXRoLmpvaW4oTXlJbWFnZUFkZFJlbW92ZUNvbXBvbmVudC5pbWFnZVRlbXBGb2xkZXIucGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcbiAgICAgICAgICAgIHJhaXNlUHJvcGVydHlDaGFuZ2UgPSBzb3VyY2Uuc2F2ZVRvRmlsZSh0ZW1wSW1hZ2VQYXRoLCBcImpwZWdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmFpc2VQcm9wZXJ0eUNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlVXJsID0gdGVtcEltYWdlUGF0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19