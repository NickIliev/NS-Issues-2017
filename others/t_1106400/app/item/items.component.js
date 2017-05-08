"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var ItemsComponent = (function () {
    function ItemsComponent(page) {
        this.page = page;
        this.environments = []; // environments configured in ConfigProvider
        this.selectedEnv = 0; // environment from last successful login
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.credentials = {
            "username": "",
            "password": "",
            "environment": "",
            "someProp": ""
        };
        this.radDataForm = this.page.getViewById("form");
        console.log("onNgInit this.radDataForm: " + this.radDataForm);
    };
    ItemsComponent.prototype.onButtonLoaded = function (args) {
        var btn = args.object;
        console.log("onButtonLoaded args.object: " + btn);
    };
    ItemsComponent.prototype.onFormLoaded = function (args) {
        console.log("onFormLoaded args.object: " + this.radDataForm);
        // console.log("source BEFORE: " + radDataForm.source);
        // console.log(radDataForm.properties)
        // console.log(radDataForm.properties[3].name); // someProp
        // radDataForm.properties.pop(); // remove the last prop but we also have splice, slice, etc.
        // radDataForm.source = {
        //     "username": "",
        //     "password": "",
        //     "environment": ""
        // };
        // console.log("source AFTER: " + radDataForm.source)
        // radDataForm.reload();
    };
    return ItemsComponent;
}());
__decorate([
    core_1.ViewChild("form"),
    __metadata("design:type", core_1.ElementRef)
], ItemsComponent.prototype, "form", void 0);
ItemsComponent = __decorate([
    core_1.Component({
        template: "\n    <GridLayout rows=\"*, auto\">\n      <RadDataForm id=\"form\" row=\"0\" [source]=\"credentials\" (loaded)=\"onFormLoaded($event)\">\n            <TKEntityProperty tkDataFormProperty name=\"username\" displayName=\"E-Mail\" index=\"0\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Email\"></TKPropertyEditor>\n            </TKEntityProperty>\n            <TKEntityProperty tkDataFormProperty name=\"password\" displayName=\"Password\" index=\"1\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Password\"></TKPropertyEditor>\n            </TKEntityProperty>\n            <TKEntityProperty tkDataFormProperty name=\"environment\" [valuesProvider]=\"environments\" displayName=\"Environment\" index=\"2\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Picker\"></TKPropertyEditor>\n            </TKEntityProperty>\n      </RadDataForm>\n      <Button row=\"1\" text=\"Sign in\" (tap)=\"doLogin()\" (loaded)=\"onButtonLoaded($event)\" class=\"btn\"></Button>\n    </GridLayout>\n  ",
        styles: ["\n    #container { background-color:#efefef; }\n  "]
    }),
    __metadata("design:paramtypes", [page_1.Page])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBR3hGLGdDQUErQjtBQXdCL0IsSUFBYSxjQUFjO0lBUXZCLHdCQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQU50QixpQkFBWSxHQUFrQixFQUFFLENBQUMsQ0FBTSw0Q0FBNEM7UUFDbkYsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBZSx5Q0FBeUM7SUFLdEQsQ0FBQztJQUUzQixpQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxhQUFhLEVBQUUsRUFBRTtZQUNqQixVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLHVDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxxQ0FBWSxHQUFuQixVQUFvQixJQUFJO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELHVEQUF1RDtRQUV2RCxzQ0FBc0M7UUFDdEMsMkRBQTJEO1FBQzNELDZGQUE2RjtRQUU3Rix5QkFBeUI7UUFDekIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsS0FBSztRQUVMLHFEQUFxRDtRQUVyRCx3QkFBd0I7SUFFNUIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQztBQXhDc0I7SUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7OEJBQU8saUJBQVU7NENBQUM7QUFOM0IsY0FBYztJQXJCMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvaENBZVg7UUFDQyxNQUFNLEVBQUUsQ0FBQyxvREFFVixDQUFDO0tBQ0gsQ0FBQztxQ0FTMkIsV0FBSTtHQVJwQixjQUFjLENBOEMxQjtBQTlDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9kYXRhZm9ybVwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBQcm94eVZpZXdDb250YWluZXIgfSBmcm9tIFwidWkvcHJveHktdmlldy1jb250YWluZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICA8R3JpZExheW91dCByb3dzPVwiKiwgYXV0b1wiPlxuICAgICAgPFJhZERhdGFGb3JtIGlkPVwiZm9ybVwiIHJvdz1cIjBcIiBbc291cmNlXT1cImNyZWRlbnRpYWxzXCIgKGxvYWRlZCk9XCJvbkZvcm1Mb2FkZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPFRLRW50aXR5UHJvcGVydHkgdGtEYXRhRm9ybVByb3BlcnR5IG5hbWU9XCJ1c2VybmFtZVwiIGRpc3BsYXlOYW1lPVwiRS1NYWlsXCIgaW5kZXg9XCIwXCI+XG4gICAgICAgICAgICAgICAgPFRLUHJvcGVydHlFZGl0b3IgdGtFbnRpdHlQcm9wZXJ0eUVkaXRvciB0eXBlPVwiRW1haWxcIj48L1RLUHJvcGVydHlFZGl0b3I+XG4gICAgICAgICAgICA8L1RLRW50aXR5UHJvcGVydHk+XG4gICAgICAgICAgICA8VEtFbnRpdHlQcm9wZXJ0eSB0a0RhdGFGb3JtUHJvcGVydHkgbmFtZT1cInBhc3N3b3JkXCIgZGlzcGxheU5hbWU9XCJQYXNzd29yZFwiIGluZGV4PVwiMVwiPlxuICAgICAgICAgICAgICAgIDxUS1Byb3BlcnR5RWRpdG9yIHRrRW50aXR5UHJvcGVydHlFZGl0b3IgdHlwZT1cIlBhc3N3b3JkXCI+PC9US1Byb3BlcnR5RWRpdG9yPlxuICAgICAgICAgICAgPC9US0VudGl0eVByb3BlcnR5PlxuICAgICAgICAgICAgPFRLRW50aXR5UHJvcGVydHkgdGtEYXRhRm9ybVByb3BlcnR5IG5hbWU9XCJlbnZpcm9ubWVudFwiIFt2YWx1ZXNQcm92aWRlcl09XCJlbnZpcm9ubWVudHNcIiBkaXNwbGF5TmFtZT1cIkVudmlyb25tZW50XCIgaW5kZXg9XCIyXCI+XG4gICAgICAgICAgICAgICAgPFRLUHJvcGVydHlFZGl0b3IgdGtFbnRpdHlQcm9wZXJ0eUVkaXRvciB0eXBlPVwiUGlja2VyXCI+PC9US1Byb3BlcnR5RWRpdG9yPlxuICAgICAgICAgICAgPC9US0VudGl0eVByb3BlcnR5PlxuICAgICAgPC9SYWREYXRhRm9ybT5cbiAgICAgIDxCdXR0b24gcm93PVwiMVwiIHRleHQ9XCJTaWduIGluXCIgKHRhcCk9XCJkb0xvZ2luKClcIiAobG9hZGVkKT1cIm9uQnV0dG9uTG9hZGVkKCRldmVudClcIiBjbGFzcz1cImJ0blwiPjwvQnV0dG9uPlxuICAgIDwvR3JpZExheW91dD5cbiAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgI2NvbnRhaW5lciB7IGJhY2tncm91bmQtY29sb3I6I2VmZWZlZjsgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGNyZWRlbnRpYWxzOiBhbnk7ICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWRlbnRpYWxzIHRvIHBhc3MgdG8gYmFja2VuZFxuICAgIHB1YmxpYyBlbnZpcm9ubWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTsgICAgICAvLyBlbnZpcm9ubWVudHMgY29uZmlndXJlZCBpbiBDb25maWdQcm92aWRlclxuICAgIHB1YmxpYyBzZWxlY3RlZEVudjogbnVtYmVyID0gMDsgICAgICAgICAgICAgICAvLyBlbnZpcm9ubWVudCBmcm9tIGxhc3Qgc3VjY2Vzc2Z1bCBsb2dpblxuICAgIHB1YmxpYyByYWREYXRhRm9ybTogUmFkRGF0YUZvcm07XG5cbiAgICBAVmlld0NoaWxkKFwiZm9ybVwiKSBmb3JtOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTpQYWdlKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIixcbiAgICAgICAgICAgIFwiZW52aXJvbm1lbnRcIjogXCJcIixcbiAgICAgICAgICAgIFwic29tZVByb3BcIjogXCJcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmFkRGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZm9ybVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbk5nSW5pdCB0aGlzLnJhZERhdGFGb3JtOiBcIiArIHRoaXMucmFkRGF0YUZvcm0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkJ1dHRvbkxvYWRlZChhcmdzKSB7XG4gICAgICAgIHZhciBidG4gPSA8QnV0dG9uPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uTG9hZGVkIGFyZ3Mub2JqZWN0OiBcIiArIGJ0bik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRm9ybUxvYWRlZChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25Gb3JtTG9hZGVkIGFyZ3Mub2JqZWN0OiBcIiArIHRoaXMucmFkRGF0YUZvcm0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvdXJjZSBCRUZPUkU6IFwiICsgcmFkRGF0YUZvcm0uc291cmNlKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYWREYXRhRm9ybS5wcm9wZXJ0aWVzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYWREYXRhRm9ybS5wcm9wZXJ0aWVzWzNdLm5hbWUpOyAvLyBzb21lUHJvcFxuICAgICAgICAvLyByYWREYXRhRm9ybS5wcm9wZXJ0aWVzLnBvcCgpOyAvLyByZW1vdmUgdGhlIGxhc3QgcHJvcCBidXQgd2UgYWxzbyBoYXZlIHNwbGljZSwgc2xpY2UsIGV0Yy5cblxuICAgICAgICAvLyByYWREYXRhRm9ybS5zb3VyY2UgPSB7XG4gICAgICAgIC8vICAgICBcInVzZXJuYW1lXCI6IFwiXCIsXG4gICAgICAgIC8vICAgICBcInBhc3N3b3JkXCI6IFwiXCIsXG4gICAgICAgIC8vICAgICBcImVudmlyb25tZW50XCI6IFwiXCJcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvdXJjZSBBRlRFUjogXCIgKyByYWREYXRhRm9ybS5zb3VyY2UpXG5cbiAgICAgICAgLy8gcmFkRGF0YUZvcm0ucmVsb2FkKCk7XG5cbiAgICB9XG59XG4iXX0=