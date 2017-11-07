"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var item_detail_component_1 = require("./item-detail.component");
var autocomplete_1 = require("nativescript-pro-ui/autocomplete");
// import { RadAutoCompleteTextViewComponent } from 'nativescript-pro-ui/autocomplete/angular';
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ItemsComponent = (function () {
    function ItemsComponent(vcRef, modalService) {
        this.vcRef = vcRef;
        this.modalService = modalService;
        this.countries = ['Australia', 'Albania', 'Austria', 'Argentina',
            'Maldives', 'Bulgaria', 'Belgium', 'Cyprus', 'Italy', 'Japan',
            'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
            'Latvia', 'Luxembourg', 'Macedonia', 'Moldova', 'Monaco', 'Netherlands', 'Norway',
            'Poland', 'Romania', 'Russia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey', 'Ukraine',
            'Vatican City', 'Chad', 'China', 'Chile'];
        this.initDataItems();
    }
    ItemsComponent.prototype.launchModal = function () {
        var options = {
            viewContainerRef: this.vcRef,
            context: '',
            fullscreen: true
        };
        this.modalService.showModal(item_detail_component_1.ItemDetailComponent, options)
            .then(console.log)
            .catch(console.log);
    };
    ItemsComponent.prototype.onSuggestionViewVisible = function () {
        console.log('supposed to be visible');
    };
    ItemsComponent.prototype.initDataItems = function () {
        this.items = new observable_array_1.ObservableArray();
        for (var _i = 0, _a = this.countries; _i < _a.length; _i++) {
            var item = _a[_i];
            this.items.push(new autocomplete_1.TokenModel(item, ''));
        }
        console.log(this.items);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef, modal_dialog_1.ModalDialogService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTREO0FBQzVELGtFQUEyRjtBQUMzRixpRUFBOEQ7QUFFOUQsaUVBQThEO0FBQzlELCtGQUErRjtBQUMvRiwyRUFBeUU7QUFPekU7SUFZSSx3QkFBb0IsS0FBdUIsRUFBVSxZQUFnQztRQUFqRSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQVI3RSxjQUFTLEdBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXO1lBQzdFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTztZQUM3RCxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTO1lBQ3pFLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVE7WUFDakYsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVM7WUFDcEYsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFJdEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLElBQU0sT0FBTyxHQUF1QjtZQUNoQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQ0FBbUIsRUFBRSxPQUFPLENBQUM7YUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBR00sZ0RBQXVCLEdBQTlCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxzQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQ0FBZSxFQUFjLENBQUM7UUFFL0MsR0FBRyxDQUFDLENBQWUsVUFBYyxFQUFkLEtBQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxjQUFjLEVBQWQsSUFBYztZQUE1QixJQUFNLElBQUksU0FBQTtZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUF6Q1EsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FhNkIsdUJBQWdCLEVBQXdCLGlDQUFrQjtPQVo1RSxjQUFjLENBMEMxQjtJQUFELHFCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dPcHRpb25zLCBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xuaW1wb3J0IHsgSXRlbURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vaXRlbS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nJztcbmltcG9ydCB7IFRva2VuTW9kZWwgfSBmcm9tICduYXRpdmVzY3JpcHQtcHJvLXVpL2F1dG9jb21wbGV0ZSc7XG4vLyBpbXBvcnQgeyBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlL2FuZ3VsYXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgaXRlbXM6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPjtcbiAgICBcbiAgICBwcml2YXRlIGNvdW50cmllczogc3RyaW5nW10gPSBbJ0F1c3RyYWxpYScsICdBbGJhbmlhJywgJ0F1c3RyaWEnLCAnQXJnZW50aW5hJyxcbiAgICAnTWFsZGl2ZXMnLCAnQnVsZ2FyaWEnLCAnQmVsZ2l1bScsICdDeXBydXMnLCAnSXRhbHknLCAnSmFwYW4nLFxuICAgICdEZW5tYXJrJywgJ0ZpbmxhbmQnLCAnRnJhbmNlJywgJ0dlcm1hbnknLCAnR3JlZWNlJywgJ0h1bmdhcnknLCAnSXJlbGFuZCcsXG4gICAgJ0xhdHZpYScsICdMdXhlbWJvdXJnJywgJ01hY2Vkb25pYScsICdNb2xkb3ZhJywgJ01vbmFjbycsICdOZXRoZXJsYW5kcycsICdOb3J3YXknLFxuICAgICdQb2xhbmQnLCAnUm9tYW5pYScsICdSdXNzaWEnLCAnU3dlZGVuJywgJ1Nsb3ZlbmlhJywgJ1Nsb3Zha2lhJywgJ1R1cmtleScsICdVa3JhaW5lJyxcbiAgICAnVmF0aWNhbiBDaXR5JywgJ0NoYWQnLCAnQ2hpbmEnLCAnQ2hpbGUnXTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSkge1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGF1bmNoTW9kYWwoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgICBjb250ZXh0OiAnJyxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoSXRlbURldGFpbENvbXBvbmVudCwgb3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGNvbnNvbGUubG9nKVxuICAgICAgICAgICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBvblN1Z2dlc3Rpb25WaWV3VmlzaWJsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1cHBvc2VkIHRvIGJlIHZpc2libGUnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFRva2VuTW9kZWw+KCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuY291bnRyaWVzKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFRva2VuTW9kZWwoaXRlbSwgJycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xuICAgIH1cbn0iXX0=