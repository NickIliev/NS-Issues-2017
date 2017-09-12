"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormatDecimal = (function () {
    function FormatDecimal() {
    }
    FormatDecimal.prototype.transform = function (value, args) {
        var targetValue = value.toString().split(".")[args];
        if (args === 0) {
            targetValue = targetValue;
        }
        else {
            targetValue === null ? targetValue = "0" : targetValue;
        }
        return targetValue;
    };
    return FormatDecimal;
}());
FormatDecimal = __decorate([
    core_1.Pipe({
        name: "FormatDecimal"
    })
], FormatDecimal);
exports.FormatDecimal = FormatDecimal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWF0RGVjaW1hbC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRm9ybWF0RGVjaW1hbC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9EO0FBS3BELElBQWEsYUFBYTtJQUExQjtJQVdBLENBQUM7SUFWTyxpQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLElBQVk7UUFDN0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0UsV0FBVyxLQUFLLElBQUksR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMzQixDQUFDO0lBQ1Qsb0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLGFBQWE7SUFIekIsV0FBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLGVBQWU7S0FDdEIsQ0FBQztHQUNXLGFBQWEsQ0FXekI7QUFYWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AUGlwZSh7XG4gIG5hbWU6IFwiRm9ybWF0RGVjaW1hbFwiXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1hdERlY2ltYWwgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICAgICAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIsIGFyZ3M6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbYXJnc107XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlID0gdGFyZ2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWUgPT09IG51bGwgPyB0YXJnZXRWYWx1ZSA9IFwiMFwiIDogdGFyZ2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRWYWx1ZTtcbiAgICAgICAgfVxufSJdfQ==