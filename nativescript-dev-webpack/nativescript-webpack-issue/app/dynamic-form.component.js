"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DynamicFormComponent = (function () {
    function DynamicFormComponent() {
        this.form = new forms_1.FormGroup({});
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // remap the API to be suitable for iterating over it
        this.objectProps =
            Object.keys(this.dataObject)
                .map(function (prop) {
                return Object.assign({}, { key: prop }, _this.dataObject[prop]);
            });
        // setup the form
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.dataObject); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new forms_1.FormControl(this.dataObject[prop].value || '');
        }
        this.form = new forms_1.FormGroup(formGroup);
    };
    DynamicFormComponent.prototype.onTap = function (text) {
        console.log('TAP ' + text);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicFormComponent.prototype, "dataObject", void 0);
    DynamicFormComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-form',
            template: "\n        <StackLayout [formGroup]=\"form\">\n\n            <StackLayout *ngFor=\"let prop of objectProps\">\n                <label [text]=\"prop.label\"></label>\n                <TextField [formControlName]=\"prop.key\" [id]=\"prop.key\" [class]=\"prop.cssClass\"></TextField>\n            </StackLayout>\n            <Label [text]=\"form.value | json\"></Label>\n        </StackLayout>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImR5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsd0NBQXdEO0FBZXhEO0lBT0k7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEcscURBQXFEO1FBQ3JELElBQUksQ0FBQyxXQUFXO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDM0IsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLEVBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUEsQ0FBYSxVQUE0QixFQUE1QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QjtZQUF4QyxJQUFJLElBQUksU0FBQTtZQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsb0NBQUssR0FBTCxVQUFNLElBQUk7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBNUJRO1FBQVIsWUFBSyxFQUFFOzs0REFBWTtJQUZYLG9CQUFvQjtRQWJoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLDZZQVNUO1NBQ0YsQ0FBQzs7T0FDUyxvQkFBb0IsQ0FnQ2hDO0lBQUQsMkJBQUM7Q0FBQSxBQWhDRCxJQWdDQztBQWhDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZHluYW1pYy1mb3JtJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPFN0YWNrTGF5b3V0IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxyXG5cclxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0ICpuZ0Zvcj1cImxldCBwcm9wIG9mIG9iamVjdFByb3BzXCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgW3RleHRdPVwicHJvcC5sYWJlbFwiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBbaWRdPVwicHJvcC5rZXlcIiBbY2xhc3NdPVwicHJvcC5jc3NDbGFzc1wiPjwvVGV4dEZpZWxkPlxyXG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxyXG4gICAgICAgICAgICA8TGFiZWwgW3RleHRdPVwiZm9ybS52YWx1ZSB8IGpzb25cIj48L0xhYmVsPlxyXG4gICAgICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICBgXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBkYXRhT2JqZWN0O1xyXG5cclxuICAgIGZvcm06IEZvcm1Hcm91cDtcclxuICAgIG9iamVjdFByb3BzO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gcmVtYXAgdGhlIEFQSSB0byBiZSBzdWl0YWJsZSBmb3IgaXRlcmF0aW5nIG92ZXIgaXRcclxuICAgICAgICB0aGlzLm9iamVjdFByb3BzID0gXHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kYXRhT2JqZWN0KVxyXG4gICAgICAgIC5tYXAocHJvcCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7IGtleTogcHJvcH0gLCB0aGlzLmRhdGFPYmplY3RbcHJvcF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBzZXR1cCB0aGUgZm9ybVxyXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiBPYmplY3Qua2V5cyh0aGlzLmRhdGFPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIGZvcm1Hcm91cFtwcm9wXSA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLmRhdGFPYmplY3RbcHJvcF0udmFsdWUgfHwgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGFwKHRleHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnVEFQICcgKyB0ZXh0KTtcclxuICAgIH1cclxuXHJcbn0iXX0=