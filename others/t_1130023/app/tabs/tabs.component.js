"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var TabsComponent = (function () {
    function TabsComponent() {
        /* ***********************************************************
        * Use the constructor to inject app services that will be needed for
        * the whole tab navigation layout as a whole.
        *************************************************************/
    }
    TabsComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the whole tab
        * navigation layout as a whole.
        *************************************************************/
    };
    Object.defineProperty(TabsComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (this._title !== value) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * The "getIconSource" function returns the correct tab icon source
    * depending on whether the app is ran on Android or iOS.
    * You can find all resources in /App_Resources/os
    *************************************************************/
    TabsComponent.prototype.getIconSource = function (icon) {
        return platform_1.isAndroid ? "res://" + icon : "res://tabIcons/" + icon;
    };
    /* ***********************************************************
    * Get the current tab view title and set it as an ActionBar title.
    * Learn more about the onSelectedIndexChanged event here:
    * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
    *************************************************************/
    TabsComponent.prototype.onSelectedIndexChanged = function (args) {
        var tabView = args.object;
        var selectedTabViewItem = tabView.items[args.newIndex];
        this.title = selectedTabViewItem.title;
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: "TabsComponent",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ["./tabs.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxxQ0FBcUM7QUFTckM7SUFJSTtRQUNJOzs7c0VBRzhEO0lBQ2xFLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0k7OztzRUFHOEQ7SUFDbEUsQ0FBQztJQUVELHNCQUFJLGdDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBVSxLQUFhO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7OztPQU5BO0lBUUQ7Ozs7a0VBSThEO0lBQzlELHFDQUFhLEdBQWIsVUFBYyxJQUFZO1FBQ3RCLE1BQU0sQ0FBQyxvQkFBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7OztrRUFJOEQ7SUFDOUQsOENBQXNCLEdBQXRCLFVBQXVCLElBQW1DO1FBQ3RELElBQU0sT0FBTyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBL0NRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7O09BQ1csYUFBYSxDQWdEekI7SUFBRCxvQkFBQztDQUFBLEFBaERELElBZ0RDO0FBaERZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIFRhYlZpZXcsIFRhYlZpZXdJdGVtIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiVGFic0NvbXBvbmVudFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGFicy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3RhYnMuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgd2lsbCBiZSBuZWVkZWQgZm9yXHJcbiAgICAgICAgKiB0aGUgd2hvbGUgdGFiIG5hdmlnYXRpb24gbGF5b3V0IGFzIGEgd2hvbGUuXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoZSB3aG9sZSB0YWJcclxuICAgICAgICAqIG5hdmlnYXRpb24gbGF5b3V0IGFzIGEgd2hvbGUuXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGl0bGUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcImdldEljb25Tb3VyY2VcIiBmdW5jdGlvbiByZXR1cm5zIHRoZSBjb3JyZWN0IHRhYiBpY29uIHNvdXJjZVxyXG4gICAgKiBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgYXBwIGlzIHJhbiBvbiBBbmRyb2lkIG9yIGlPUy5cclxuICAgICogWW91IGNhbiBmaW5kIGFsbCByZXNvdXJjZXMgaW4gL0FwcF9SZXNvdXJjZXMvb3NcclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBnZXRJY29uU291cmNlKGljb246IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlzQW5kcm9pZCA/IFwicmVzOi8vXCIgKyBpY29uIDogXCJyZXM6Ly90YWJJY29ucy9cIiArIGljb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogR2V0IHRoZSBjdXJyZW50IHRhYiB2aWV3IHRpdGxlIGFuZCBzZXQgaXQgYXMgYW4gQWN0aW9uQmFyIHRpdGxlLlxyXG4gICAgKiBMZWFybiBtb3JlIGFib3V0IHRoZSBvblNlbGVjdGVkSW5kZXhDaGFuZ2VkIGV2ZW50IGhlcmU6XHJcbiAgICAqIGh0dHBzOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL2Nvb2tib29rL3VpL3RhYi12aWV3I3VzaW5nLXNlbGVjdGVkaW5kZXhjaGFuZ2VkLWV2ZW50LWZyb20teG1sXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHRhYlZpZXcgPSA8VGFiVmlldz5hcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRhYlZpZXdJdGVtID0gdGFiVmlldy5pdGVtc1thcmdzLm5ld0luZGV4XTtcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHNlbGVjdGVkVGFiVmlld0l0ZW0udGl0bGU7XHJcbiAgICB9XHJcbn1cclxuIl19