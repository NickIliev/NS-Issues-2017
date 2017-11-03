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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1pbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUNyRSx3Q0FBeUU7QUFDekUsMkNBQXlEO0FBRXpELHNEQUF3RDtBQUV4RCxJQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztBQUM1QyxJQUFNLElBQUksR0FBRyxjQUFRLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtBQUV2RCxJQUFNLDBDQUEwQyxHQUFHO0lBQy9DLE9BQU8sRUFBRSx5QkFBaUI7SUFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGOzs7OERBRzhEO0FBUTlEO0lBUEE7UUFnQkksMEVBQTBFO1FBQ2xFLG9CQUFlLEdBQXFCLElBQUksQ0FBQztRQUV6QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztJQXVFdkMsQ0FBQztrQ0FuRlkseUJBQXlCO0lBQ2xDLHNCQUFXLDRDQUFlO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLDBCQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7SUFFYyw4Q0FBb0IsR0FBbkM7UUFDSSwyQkFBeUIsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQU9ELHNCQUFJLCtDQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBYSxLQUFhO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNC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ImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEZvbGRlciwga25vd25Gb2xkZXJzLCBwYXRoIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcblxuY29uc3QgdGVtcEltYWdlRm9sZGVyTmFtZSA9IFwibnNpbWFnZXBpY2tlclwiO1xuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1lbXB0eVxuXG5jb25zdCBNWV9JTUFHRV9BRERfUkVNT1ZFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXlJbWFnZUFkZFJlbW92ZUNvbXBvbmVudCksIC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8tZm9yd2FyZC1yZWZcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVGhlIE15SW1hZ2VBZGRSZW1vdmUgY3VzdG9tIGNvbXBvbmVudCB1c2VzIGFuIGltYWdlcGlja2VyIHBsdWdpbiB0byBsZXQgdGhlIHVzZXIgc2VsZWN0XG4qIGFuIGltYWdlIGFuZCBwcm92aWRlcyBjdXN0b20gbG9naWMgYW5kIGRlc2lnbiB0byB0aGUgcHJvY2Vzcy5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJNeUltYWdlQWRkUmVtb3ZlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215LWltYWdlLWFkZC1yZW1vdmUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbXktaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnQuY3NzXCJdLFxuICAgIHByb3ZpZGVyczogW01ZX0lNQUdFX0FERF9SRU1PVkVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTXlJbWFnZUFkZFJlbW92ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBzdGF0aWMgZ2V0IGltYWdlVGVtcEZvbGRlcigpOiBGb2xkZXIge1xuICAgICAgICByZXR1cm4ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIodGVtcEltYWdlRm9sZGVyTmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJJbWFnZVRlbXBGb2xkZXIoKTogdm9pZCB7XG4gICAgICAgIE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnQuaW1hZ2VUZW1wRm9sZGVyLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgLy8gcGxhY2Vob2xkZXIgZm9yIHRoZSBjYWxsYmFjayBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgICBwcml2YXRlIGlubmVySW1hZ2VVcmw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVVybDtcbiAgICB9XG5cbiAgICBzZXQgaW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5pbm5lckltYWdlVXJsICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbm5lckltYWdlVXJsID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRhdGlvblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5pbm5lckltYWdlVXJsICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbm5lckltYWdlVXJsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRhdGlvblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudGF0aW9uXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIH1cblxuICAgIG9uSW1hZ2VBZGRSZW1vdmVUYXAoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmltYWdlVXJsKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUltYWdlQ2hhbmdlKG51bGwpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBNeUltYWdlQWRkUmVtb3ZlQ29tcG9uZW50LmNsZWFySW1hZ2VUZW1wRm9sZGVyKCk7XG5cbiAgICAgICAgdGhpcy5waWNrSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBwaWNrSW1hZ2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAuYXV0aG9yaXplKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxuICAgICAgICAgICAgLnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKHNlbGVjdGVkQXNzZXQ6IGltYWdlUGlja2VyLlNlbGVjdGVkQXNzZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBc3NldC5nZXRJbWFnZSh7IG1heEhlaWdodDogNzY4IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW1hZ2VTb3VyY2U6IEltYWdlU291cmNlKSA9PiB0aGlzLmhhbmRsZUltYWdlQ2hhbmdlKGltYWdlU291cmNlKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUltYWdlQ2hhbmdlKHNvdXJjZTogSW1hZ2VTb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJhaXNlUHJvcGVydHlDaGFuZ2UgPSB0cnVlO1xuICAgICAgICBsZXQgdGVtcEltYWdlUGF0aCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgdGVtcEltYWdlUGF0aCA9IHBhdGguam9pbihNeUltYWdlQWRkUmVtb3ZlQ29tcG9uZW50LmltYWdlVGVtcEZvbGRlci5wYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcbiAgICAgICAgICAgIHJhaXNlUHJvcGVydHlDaGFuZ2UgPSBzb3VyY2Uuc2F2ZVRvRmlsZSh0ZW1wSW1hZ2VQYXRoLCBcImpwZWdcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmFpc2VQcm9wZXJ0eUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IHRlbXBJbWFnZVBhdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=