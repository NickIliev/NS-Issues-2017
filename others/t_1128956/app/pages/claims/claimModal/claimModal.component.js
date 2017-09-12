"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ClaimModalComponent = (function () {
    function ClaimModalComponent(modalParams) {
        this.modalParams = modalParams;
        this.sortingLookupList = [{
                "text": "Most Recent",
                "isSelected": true
            }, {
                "text": "Oldest First",
                "isSelected": false
            }];
        this.memberLookupList = [{
                "text": "John Appleseed",
                "isSelected": true
            }, {
                "text": "Jane Appleseed",
                "isSelected": false
            }, {
                "text": "Steve Appleseed",
                "isSelected": false
            }];
        this.visitTypeLookupList = [{
                "text": "Medical",
                "isSelected": true
            }, {
                "text": "Vision",
                "isSelected": true
            }, {
                "text": "Dental",
                "isSelected": true
            }];
        this.statusLookupList = [{
                "text": "Adjusted",
                "isSelected": true
            }, {
                "text": "Completed",
                "isSelected": true
            }, {
                "text": "Denied",
                "isSelected": true
            }, {
                "text": "Pending",
                "isSelected": true
            }];
    }
    ClaimModalComponent.prototype.onApplyFilter = function () {
        this.modalParams.closeCallback();
    };
    ClaimModalComponent.prototype.onClose = function () {
        this.modalParams.closeCallback();
    };
    ClaimModalComponent.prototype.sortItemSelected = function (item, lookupList) {
        lookupList.map(function (item) { return item.isSelected = false; });
        item.isSelected = true;
    };
    ClaimModalComponent.prototype.itemSelectUnselect = function (item, lookupList) {
        item.isSelected = !item.isSelected;
    };
    ClaimModalComponent.prototype.isAllSelected = function (lookupList) {
        var selected = true;
        lookupList.forEach(function (item, index) {
            if (!item.isSelected) {
                selected = false;
            }
        });
        return selected;
    };
    ClaimModalComponent.prototype.onSelectAll = function (args, lookupList) {
        var isSelected = this.isAllSelected(lookupList);
        lookupList.forEach(function (item, index) {
            item.isSelected = !isSelected;
        });
    };
    ClaimModalComponent.prototype.getSelectedItems = function (lookupList) {
        var filteredItems = lookupList.filter(function (item) { return item.isSelected === true; });
        return filteredItems;
    };
    return ClaimModalComponent;
}());
ClaimModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./claimModal.component.html",
        styleUrls: ["claimModal.css"]
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
], ClaimModalComponent);
exports.ClaimModalComponent = ClaimModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1Nb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFpbU1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUUsSUFBYSxtQkFBbUI7SUFFNUIsNkJBQTJCLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQVdsRCxzQkFBaUIsR0FBRyxDQUFDO2dCQUN4QixNQUFNLEVBQUUsYUFBYTtnQkFDckIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsY0FBYztnQkFDdEIsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1FBT0kscUJBQWdCLEdBQUcsQ0FBQztnQkFDdkIsTUFBTSxFQUFFLGdCQUFnQjtnQkFDeEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsZ0JBQWdCO2dCQUN4QixZQUFZLEVBQUUsS0FBSzthQUN0QixFQUFFO2dCQUNDLE1BQU0sRUFBRSxpQkFBaUI7Z0JBQ3pCLFlBQVksRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztRQUVJLHdCQUFtQixHQUFHLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixZQUFZLEVBQUUsSUFBSTthQUNyQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNyQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7UUFDSSxxQkFBZ0IsR0FBRyxDQUFDO2dCQUN2QixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsV0FBVztnQkFDbkIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO0lBeERILENBQUM7SUFFTSwyQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLHFDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFVTSw4Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSSxFQUFFLFVBQVU7UUFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQXFDTSxnREFBa0IsR0FBekIsVUFBMEIsSUFBSSxFQUFFLFVBQVU7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVNLDJDQUFhLEdBQXBCLFVBQXFCLFVBQVU7UUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLHlDQUFXLEdBQWxCLFVBQW1CLElBQUksRUFBRSxVQUFVO1FBQy9CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOENBQWdCLEdBQXZCLFVBQXdCLFVBQVU7UUFDOUIsSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBdEZELElBc0ZDO0FBdEZZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDaEMsQ0FBQztxQ0FJMEMsMkJBQWlCO0dBRmhELG1CQUFtQixDQXNGL0I7QUF0Rlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NsYWltTW9kYWwuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiY2xhaW1Nb2RhbC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDbGFpbU1vZGFsQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BcHBseUZpbHRlcigpIHtcclxuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29ydGluZ0xvb2t1cExpc3QgPSBbe1xyXG4gICAgICAgIFwidGV4dFwiOiBcIk1vc3QgUmVjZW50XCIsXHJcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcclxuICAgIH0sIHtcclxuICAgICAgICBcInRleHRcIjogXCJPbGRlc3QgRmlyc3RcIixcclxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogZmFsc2VcclxuICAgIH1dO1xyXG5cclxuICAgIHB1YmxpYyBzb3J0SXRlbVNlbGVjdGVkKGl0ZW0sIGxvb2t1cExpc3QpIHtcclxuICAgICAgICBsb29rdXBMaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkID0gZmFsc2UpO1xyXG4gICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1lbWJlckxvb2t1cExpc3QgPSBbe1xyXG4gICAgICAgIFwidGV4dFwiOiBcIkpvaG4gQXBwbGVzZWVkXCIsXHJcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcclxuICAgIH0sIHtcclxuICAgICAgICBcInRleHRcIjogXCJKYW5lIEFwcGxlc2VlZFwiLFxyXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiBmYWxzZVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwidGV4dFwiOiBcIlN0ZXZlIEFwcGxlc2VlZFwiLFxyXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiBmYWxzZVxyXG4gICAgfV07XHJcblxyXG4gICAgcHVibGljIHZpc2l0VHlwZUxvb2t1cExpc3QgPSBbe1xyXG4gICAgICAgIFwidGV4dFwiOiBcIk1lZGljYWxcIixcclxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwidGV4dFwiOiBcIlZpc2lvblwiLFxyXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJ0ZXh0XCI6IFwiRGVudGFsXCIsXHJcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcclxuICAgIH1dO1xyXG4gICAgcHVibGljIHN0YXR1c0xvb2t1cExpc3QgPSBbe1xyXG4gICAgICAgIFwidGV4dFwiOiBcIkFkanVzdGVkXCIsXHJcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcclxuICAgIH0sIHtcclxuICAgICAgICBcInRleHRcIjogXCJDb21wbGV0ZWRcIixcclxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwidGV4dFwiOiBcIkRlbmllZFwiLFxyXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJ0ZXh0XCI6IFwiUGVuZGluZ1wiLFxyXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXHJcbiAgICB9XTtcclxuXHJcbiAgICBwdWJsaWMgaXRlbVNlbGVjdFVuc2VsZWN0KGl0ZW0sIGxvb2t1cExpc3QpIHtcclxuICAgICAgICBpdGVtLmlzU2VsZWN0ZWQgPSAhaXRlbS5pc1NlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0FsbFNlbGVjdGVkKGxvb2t1cExpc3QpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGxvb2t1cExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0QWxsKGFyZ3MsIGxvb2t1cExpc3QpIHtcclxuICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IHRoaXMuaXNBbGxTZWxlY3RlZChsb29rdXBMaXN0KTtcclxuICAgICAgICBsb29rdXBMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9ICFpc1NlbGVjdGVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZWxlY3RlZEl0ZW1zKGxvb2t1cExpc3QpIHtcclxuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IGxvb2t1cExpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pc1NlbGVjdGVkID09PSB0cnVlKTtcclxuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcclxuICAgIH1cclxufSJdfQ==