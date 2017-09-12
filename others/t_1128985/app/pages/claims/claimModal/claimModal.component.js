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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1Nb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFpbU1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUUsSUFBYSxtQkFBbUI7SUFFNUIsNkJBQTJCLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQVdsRCxzQkFBaUIsR0FBRyxDQUFDO2dCQUN4QixNQUFNLEVBQUUsYUFBYTtnQkFDckIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsY0FBYztnQkFDdEIsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1FBT0kscUJBQWdCLEdBQUcsQ0FBQztnQkFDdkIsTUFBTSxFQUFFLGdCQUFnQjtnQkFDeEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsZ0JBQWdCO2dCQUN4QixZQUFZLEVBQUUsS0FBSzthQUN0QixFQUFFO2dCQUNDLE1BQU0sRUFBRSxpQkFBaUI7Z0JBQ3pCLFlBQVksRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztRQUVJLHdCQUFtQixHQUFHLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixZQUFZLEVBQUUsSUFBSTthQUNyQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNyQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7UUFDSSxxQkFBZ0IsR0FBRyxDQUFDO2dCQUN2QixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsV0FBVztnQkFDbkIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7YUFDckIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO0lBeERILENBQUM7SUFFTSwyQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLHFDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFVTSw4Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSSxFQUFFLFVBQVU7UUFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQXFDTSxnREFBa0IsR0FBekIsVUFBMEIsSUFBSSxFQUFFLFVBQVU7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVNLDJDQUFhLEdBQXBCLFVBQXFCLFVBQVU7UUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLHlDQUFXLEdBQWxCLFVBQW1CLElBQUksRUFBRSxVQUFVO1FBQy9CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOENBQWdCLEdBQXZCLFVBQXdCLFVBQVU7UUFDOUIsSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBdEZELElBc0ZDO0FBdEZZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDaEMsQ0FBQztxQ0FJMEMsMkJBQWlCO0dBRmhELG1CQUFtQixDQXNGL0I7QUF0Rlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2xhaW1Nb2RhbC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiY2xhaW1Nb2RhbC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDbGFpbU1vZGFsQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNvcnRpbmdMb29rdXBMaXN0ID0gW3tcbiAgICAgICAgXCJ0ZXh0XCI6IFwiTW9zdCBSZWNlbnRcIixcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcbiAgICB9LCB7XG4gICAgICAgIFwidGV4dFwiOiBcIk9sZGVzdCBGaXJzdFwiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogZmFsc2VcbiAgICB9XTtcblxuICAgIHB1YmxpYyBzb3J0SXRlbVNlbGVjdGVkKGl0ZW0sIGxvb2t1cExpc3QpIHtcbiAgICAgICAgbG9va3VwTGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uaXNTZWxlY3RlZCA9IGZhbHNlKTtcbiAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWVtYmVyTG9va3VwTGlzdCA9IFt7XG4gICAgICAgIFwidGV4dFwiOiBcIkpvaG4gQXBwbGVzZWVkXCIsXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXG4gICAgfSwge1xuICAgICAgICBcInRleHRcIjogXCJKYW5lIEFwcGxlc2VlZFwiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogZmFsc2VcbiAgICB9LCB7XG4gICAgICAgIFwidGV4dFwiOiBcIlN0ZXZlIEFwcGxlc2VlZFwiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogZmFsc2VcbiAgICB9XTtcblxuICAgIHB1YmxpYyB2aXNpdFR5cGVMb29rdXBMaXN0ID0gW3tcbiAgICAgICAgXCJ0ZXh0XCI6IFwiTWVkaWNhbFwiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxuICAgIH0sIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiVmlzaW9uXCIsXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXG4gICAgfSwge1xuICAgICAgICBcInRleHRcIjogXCJEZW50YWxcIixcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcbiAgICB9XTtcbiAgICBwdWJsaWMgc3RhdHVzTG9va3VwTGlzdCA9IFt7XG4gICAgICAgIFwidGV4dFwiOiBcIkFkanVzdGVkXCIsXG4gICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXG4gICAgfSwge1xuICAgICAgICBcInRleHRcIjogXCJDb21wbGV0ZWRcIixcbiAgICAgICAgXCJpc1NlbGVjdGVkXCI6IHRydWVcbiAgICB9LCB7XG4gICAgICAgIFwidGV4dFwiOiBcIkRlbmllZFwiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxuICAgIH0sIHtcbiAgICAgICAgXCJ0ZXh0XCI6IFwiUGVuZGluZ1wiLFxuICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxuICAgIH1dO1xuXG4gICAgcHVibGljIGl0ZW1TZWxlY3RVbnNlbGVjdChpdGVtLCBsb29rdXBMaXN0KSB7XG4gICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9ICFpdGVtLmlzU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQWxsU2VsZWN0ZWQobG9va3VwTGlzdCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBsb29rdXBMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0QWxsKGFyZ3MsIGxvb2t1cExpc3QpIHtcbiAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSB0aGlzLmlzQWxsU2VsZWN0ZWQobG9va3VwTGlzdCk7XG4gICAgICAgIGxvb2t1cExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9ICFpc1NlbGVjdGVkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRJdGVtcyhsb29rdXBMaXN0KSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gbG9va3VwTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzU2VsZWN0ZWQgPT09IHRydWUpO1xuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcbiAgICB9XG59Il19