"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ClaimStatus = (function () {
    function ClaimStatus() {
    }
    ClaimStatus.prototype.transform = function (value) {
        var claimStatus;
        switch (value) {
            case "C":
                claimStatus = "completed";
                break;
            case "D":
                claimStatus = "denied";
                break;
            case "P":
                claimStatus = "pending";
                break;
        }
        return claimStatus;
    };
    return ClaimStatus;
}());
ClaimStatus = __decorate([
    core_1.Pipe({
        name: "ClaimStatus"
    })
], ClaimStatus);
exports.ClaimStatus = ClaimStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhaW1TdGF0dXMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNsYWltU3RhdHVzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFLcEQsSUFBYSxXQUFXO0lBQXhCO0lBZ0JBLENBQUM7SUFmTywrQkFBUyxHQUFULFVBQVUsS0FBYTtRQUN2QixJQUFJLFdBQVcsQ0FBQztRQUNoQixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxHQUFHO2dCQUNKLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQzFCLEtBQUssQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDSixXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixLQUFLLENBQUM7WUFDVixLQUFLLEdBQUc7Z0JBQ0osV0FBVyxHQUFHLFNBQVMsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxXQUFXO0lBSHZCLFdBQUksQ0FBQztRQUNKLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUM7R0FDVyxXQUFXLENBZ0J2QjtBQWhCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6IFwiQ2xhaW1TdGF0dXNcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xhaW1TdGF0dXMgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgICAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGNsYWltU3RhdHVzO1xyXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkNcIjpcclxuICAgICAgICAgICAgICAgIGNsYWltU3RhdHVzID0gXCJjb21wbGV0ZWRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRFwiOlxyXG4gICAgICAgICAgICAgICAgY2xhaW1TdGF0dXMgPSBcImRlbmllZFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJQXCI6XHJcbiAgICAgICAgICAgICAgICBjbGFpbVN0YXR1cyA9IFwicGVuZGluZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbGFpbVN0YXR1cztcclxuICAgIH1cclxufSJdfQ==