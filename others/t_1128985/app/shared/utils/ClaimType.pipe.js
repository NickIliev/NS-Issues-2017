"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ClaimType = (function () {
    function ClaimType() {
    }
    ClaimType.prototype.transform = function (value) {
        var claimType;
        switch (value) {
            case "M":
                claimType = "medical";
                break;
            case "D":
                claimType = "dental";
                break;
            case "V":
                claimType = "vision";
                break;
            case "P":
                claimType = "pharmacy";
                break;
        }
        return claimType;
    };
    return ClaimType;
}());
ClaimType = __decorate([
    core_1.Pipe({
        name: "ClaimType"
    })
], ClaimType);
exports.ClaimType = ClaimType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhaW1UeXBlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDbGFpbVR5cGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUtwRCxJQUFhLFNBQVM7SUFBdEI7SUFtQkEsQ0FBQztJQWxCTyw2QkFBUyxHQUFULFVBQVUsS0FBYTtRQUN2QixJQUFJLFNBQVMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLEdBQUc7Z0JBQ0osU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxHQUFHO2dCQUNKLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDSixTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixLQUFLLENBQUM7WUFDVixLQUFLLEdBQUc7Z0JBQ0osU0FBUyxHQUFHLFVBQVUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxTQUFTO0lBSHJCLFdBQUksQ0FBQztRQUNKLElBQUksRUFBRSxXQUFXO0tBQ2xCLENBQUM7R0FDVyxTQUFTLENBbUJyQjtBQW5CWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AUGlwZSh7XG4gIG5hbWU6IFwiQ2xhaW1UeXBlXCJcbn0pXG5leHBvcnQgY2xhc3MgQ2xhaW1UeXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNsYWltVHlwZTtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICBjbGFpbVR5cGUgPSBcIm1lZGljYWxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgY2xhaW1UeXBlID0gXCJkZW50YWxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJWXCI6XG4gICAgICAgICAgICAgICAgY2xhaW1UeXBlID0gXCJ2aXNpb25cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQXCI6XG4gICAgICAgICAgICAgICAgY2xhaW1UeXBlID0gXCJwaGFybWFjeVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFpbVR5cGU7XG4gICAgfVxufSJdfQ==