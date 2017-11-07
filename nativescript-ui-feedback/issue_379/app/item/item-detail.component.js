"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var autocomplete_1 = require("nativescript-pro-ui/autocomplete");
// import { RadAutoCompleteTextViewComponent } from 'nativescript-pro-ui/autocomplete/angular';
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ItemDetailComponent = (function () {
    function ItemDetailComponent(params) {
        this.params = params;
        this.countries = ['Australia', 'Albania', 'Austria', 'Argentina',
            'Maldives', 'Bulgaria', 'Belgium', 'Cyprus', 'Italy', 'Japan',
            'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
            'Latvia', 'Luxembourg', 'Macedonia', 'Moldova', 'Monaco', 'Netherlands', 'Norway',
            'Poland', 'Romania', 'Russia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey', 'Ukraine',
            'Vatican City', 'Chad', 'China', 'Chile'];
        this.initDataItems();
    }
    ItemDetailComponent.prototype.onCancelTap = function () {
        this.params.closeCallback();
    };
    ItemDetailComponent.prototype.onItemSelected = function (item) {
        this.params.closeCallback(item);
    };
    ItemDetailComponent.prototype.onSuggestionViewVisible = function () {
        console.log('supposed to be visible');
    };
    ItemDetailComponent.prototype.initDataItems = function () {
        this.items = new observable_array_1.ObservableArray();
        for (var _i = 0, _a = this.countries; _i < _a.length; _i++) {
            var item = _a[_i];
            this.items.push(new autocomplete_1.TokenModel(item, ''));
        }
        console.log(this.items);
    };
    ItemDetailComponent = __decorate([
        core_1.Component({
            selector: "ns-details",
            moduleId: module.id,
            templateUrl: "./item-detail.component.html",
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSxpRUFBOEQ7QUFDOUQsK0ZBQStGO0FBQy9GLDJFQUF5RTtBQVF6RTtJQVdJLDZCQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQVByQyxjQUFTLEdBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXO1lBQ3pFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTztZQUM3RCxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTO1lBQ3pFLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVE7WUFDakYsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVM7WUFDcEYsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFHMUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLDRDQUFjLEdBQXJCLFVBQXNCLElBQVM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLHFEQUF1QixHQUE5QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sMkNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0NBQWUsRUFBYyxDQUFDO1FBRS9DLEdBQUcsQ0FBQyxDQUFlLFVBQWMsRUFBZCxLQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWM7WUFBNUIsSUFBTSxJQUFJLFNBQUE7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBbkNRLG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUMsQ0FBQzt5Q0FZOEIsZ0NBQWlCO09BWHBDLG1CQUFtQixDQW9DL0I7SUFBRCwwQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZyc7XG5cbmltcG9ydCB7IFRva2VuTW9kZWwgfSBmcm9tICduYXRpdmVzY3JpcHQtcHJvLXVpL2F1dG9jb21wbGV0ZSc7XG4vLyBpbXBvcnQgeyBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlL2FuZ3VsYXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXknO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWRldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbS1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbURldGFpbENvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgaXRlbXM6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPjtcblxuICAgIHByaXZhdGUgY291bnRyaWVzOiBzdHJpbmdbXSA9IFsnQXVzdHJhbGlhJywgJ0FsYmFuaWEnLCAnQXVzdHJpYScsICdBcmdlbnRpbmEnLFxuICAgICAgICAnTWFsZGl2ZXMnLCAnQnVsZ2FyaWEnLCAnQmVsZ2l1bScsICdDeXBydXMnLCAnSXRhbHknLCAnSmFwYW4nLFxuICAgICAgICAnRGVubWFyaycsICdGaW5sYW5kJywgJ0ZyYW5jZScsICdHZXJtYW55JywgJ0dyZWVjZScsICdIdW5nYXJ5JywgJ0lyZWxhbmQnLFxuICAgICAgICAnTGF0dmlhJywgJ0x1eGVtYm91cmcnLCAnTWFjZWRvbmlhJywgJ01vbGRvdmEnLCAnTW9uYWNvJywgJ05ldGhlcmxhbmRzJywgJ05vcndheScsXG4gICAgICAgICdQb2xhbmQnLCAnUm9tYW5pYScsICdSdXNzaWEnLCAnU3dlZGVuJywgJ1Nsb3ZlbmlhJywgJ1Nsb3Zha2lhJywgJ1R1cmtleScsICdVa3JhaW5lJyxcbiAgICAgICAgJ1ZhdGljYW4gQ2l0eScsICdDaGFkJywgJ0NoaW5hJywgJ0NoaWxlJ107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2FuY2VsVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVNlbGVjdGVkKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKGl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN1Z2dlc3Rpb25WaWV3VmlzaWJsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1cHBvc2VkIHRvIGJlIHZpc2libGUnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFRva2VuTW9kZWw+KCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuY291bnRyaWVzKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFRva2VuTW9kZWwoaXRlbSwgJycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xuICAgIH1cbn1cbiJdfQ==