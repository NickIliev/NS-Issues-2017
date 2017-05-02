"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-telerik-ui-pro/dataform/angular");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.environments = []; // environments configured in ConfigProvider
        this.selectedEnv = 0; // environment from last successful login
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.credentials = {
            "username": "",
            "password": "",
            "environment": "",
            "someProp": "" // new property introduced for which we do not want editor to be created
        };
    };
    ItemsComponent.prototype.onFormLoaded = function (args) {
        var radDataForm = args.object;
        console.log(radDataForm); // RadDataForm 
        console.log(radDataForm.properties[3].name); // someProp
        radDataForm.properties.pop(); // remove the last prop but we also have splice, slice, etc.
        console.log(radDataForm.properties); // now the properties are 3 but we still need to edit the source object before reloading the whole form
        // normilizing the source object
        radDataForm.source = {
            "username": "",
            "password": "",
            "environment": ""
        };
        radDataForm.reload();
    };
    return ItemsComponent;
}());
__decorate([
    core_1.ViewChild("form"),
    __metadata("design:type", angular_1.RadDataFormComponent)
], ItemsComponent.prototype, "form", void 0);
ItemsComponent = __decorate([
    core_1.Component({
        template: "\n    <GridLayout rows=\"*, auto\">\n      <RadDataForm row=\"0\" [source]=\"credentials\" (loaded)=\"onFormLoaded($event)\">\n            <TKEntityProperty tkDataFormProperty name=\"username\" displayName=\"E-Mail\" index=\"0\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Email\"></TKPropertyEditor>\n            </TKEntityProperty>\n            <TKEntityProperty tkDataFormProperty name=\"password\" displayName=\"Password\" index=\"1\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Password\"></TKPropertyEditor>\n            </TKEntityProperty>\n            <TKEntityProperty tkDataFormProperty name=\"environment\" [valuesProvider]=\"environments\" displayName=\"Environment\" index=\"2\">\n                <TKPropertyEditor tkEntityPropertyEditor type=\"Picker\"></TKPropertyEditor>\n            </TKEntityProperty>\n      </RadDataForm>\n      <Button row=\"1\" text=\"Sign in\" (tap)=\"doLogin()\" class=\"btn\"></Button>\n    </GridLayout>\n  ",
        styles: ["\n    #container { background-color:#efefef; }\n  "]
    }),
    __metadata("design:paramtypes", [])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBRXhGLHdFQUFvRjtBQXVCcEYsSUFBYSxjQUFjO0lBU3ZCO1FBUE8saUJBQVksR0FBa0IsRUFBRSxDQUFDLENBQU0sNENBQTRDO1FBQ25GLGdCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQWUseUNBQXlDO0lBT3ZGLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxhQUFhLEVBQUUsRUFBRTtZQUNqQixVQUFVLEVBQUUsRUFBRSxDQUFDLHdFQUF3RTtTQUMxRixDQUFDO0lBRU4sQ0FBQztJQUVNLHFDQUFZLEdBQW5CLFVBQW9CLElBQUk7UUFDcEIsSUFBSSxXQUFXLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDLGVBQWU7UUFFeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVztRQUN4RCxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsNERBQTREO1FBRTFGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUMsdUdBQXVHO1FBRTNJLGdDQUFnQztRQUNoQyxXQUFXLENBQUMsTUFBTSxHQUFHO1lBQ2pCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxhQUFhLEVBQUUsRUFBRTtTQUNwQixDQUFDO1FBRUYsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUFsQ3NCO0lBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDOzhCQUFPLDhCQUFvQjs0Q0FBQztBQVByQyxjQUFjO0lBckIxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG8rQkFlWDtRQUNDLE1BQU0sRUFBRSxDQUFDLG9EQUVWLENBQUM7S0FDSCxDQUFDOztHQUNXLGNBQWMsQ0F5QzFCO0FBekNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2RhdGFmb3JtXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybUNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vZGF0YWZvcm0vYW5ndWxhclwiOyBcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICA8R3JpZExheW91dCByb3dzPVwiKiwgYXV0b1wiPlxuICAgICAgPFJhZERhdGFGb3JtIHJvdz1cIjBcIiBbc291cmNlXT1cImNyZWRlbnRpYWxzXCIgKGxvYWRlZCk9XCJvbkZvcm1Mb2FkZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPFRLRW50aXR5UHJvcGVydHkgdGtEYXRhRm9ybVByb3BlcnR5IG5hbWU9XCJ1c2VybmFtZVwiIGRpc3BsYXlOYW1lPVwiRS1NYWlsXCIgaW5kZXg9XCIwXCI+XG4gICAgICAgICAgICAgICAgPFRLUHJvcGVydHlFZGl0b3IgdGtFbnRpdHlQcm9wZXJ0eUVkaXRvciB0eXBlPVwiRW1haWxcIj48L1RLUHJvcGVydHlFZGl0b3I+XG4gICAgICAgICAgICA8L1RLRW50aXR5UHJvcGVydHk+XG4gICAgICAgICAgICA8VEtFbnRpdHlQcm9wZXJ0eSB0a0RhdGFGb3JtUHJvcGVydHkgbmFtZT1cInBhc3N3b3JkXCIgZGlzcGxheU5hbWU9XCJQYXNzd29yZFwiIGluZGV4PVwiMVwiPlxuICAgICAgICAgICAgICAgIDxUS1Byb3BlcnR5RWRpdG9yIHRrRW50aXR5UHJvcGVydHlFZGl0b3IgdHlwZT1cIlBhc3N3b3JkXCI+PC9US1Byb3BlcnR5RWRpdG9yPlxuICAgICAgICAgICAgPC9US0VudGl0eVByb3BlcnR5PlxuICAgICAgICAgICAgPFRLRW50aXR5UHJvcGVydHkgdGtEYXRhRm9ybVByb3BlcnR5IG5hbWU9XCJlbnZpcm9ubWVudFwiIFt2YWx1ZXNQcm92aWRlcl09XCJlbnZpcm9ubWVudHNcIiBkaXNwbGF5TmFtZT1cIkVudmlyb25tZW50XCIgaW5kZXg9XCIyXCI+XG4gICAgICAgICAgICAgICAgPFRLUHJvcGVydHlFZGl0b3IgdGtFbnRpdHlQcm9wZXJ0eUVkaXRvciB0eXBlPVwiUGlja2VyXCI+PC9US1Byb3BlcnR5RWRpdG9yPlxuICAgICAgICAgICAgPC9US0VudGl0eVByb3BlcnR5PlxuICAgICAgPC9SYWREYXRhRm9ybT5cbiAgICAgIDxCdXR0b24gcm93PVwiMVwiIHRleHQ9XCJTaWduIGluXCIgKHRhcCk9XCJkb0xvZ2luKClcIiBjbGFzcz1cImJ0blwiPjwvQnV0dG9uPlxuICAgIDwvR3JpZExheW91dD5cbiAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgI2NvbnRhaW5lciB7IGJhY2tncm91bmQtY29sb3I6I2VmZWZlZjsgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGNyZWRlbnRpYWxzOiBhbnk7ICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWRlbnRpYWxzIHRvIHBhc3MgdG8gYmFja2VuZFxuICAgIHB1YmxpYyBlbnZpcm9ubWVudHM6IEFycmF5PHN0cmluZz4gPSBbXTsgICAgICAvLyBlbnZpcm9ubWVudHMgY29uZmlndXJlZCBpbiBDb25maWdQcm92aWRlclxuICAgIHB1YmxpYyBzZWxlY3RlZEVudjogbnVtYmVyID0gMDsgICAgICAgICAgICAgICAvLyBlbnZpcm9ubWVudCBmcm9tIGxhc3Qgc3VjY2Vzc2Z1bCBsb2dpblxuXG4gICAgcHVibGljIHJhZERhdGFGb3JtOiBSYWREYXRhRm9ybTtcblxuICAgIEBWaWV3Q2hpbGQoXCJmb3JtXCIpIGZvcm06IFJhZERhdGFGb3JtQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuIFxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIixcbiAgICAgICAgICAgIFwiZW52aXJvbm1lbnRcIjogXCJcIixcbiAgICAgICAgICAgIFwic29tZVByb3BcIjogXCJcIiAvLyBuZXcgcHJvcGVydHkgaW50cm9kdWNlZCBmb3Igd2hpY2ggd2UgZG8gbm90IHdhbnQgZWRpdG9yIHRvIGJlIGNyZWF0ZWRcbiAgICAgICAgfTtcblxuICAgIH1cbiBcbiAgICBwdWJsaWMgb25Gb3JtTG9hZGVkKGFyZ3MpIHtcbiAgICAgICAgdmFyIHJhZERhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHJhZERhdGFGb3JtKSAvLyBSYWREYXRhRm9ybSBcbiBcbiAgICAgICAgY29uc29sZS5sb2cocmFkRGF0YUZvcm0ucHJvcGVydGllc1szXS5uYW1lKTsgLy8gc29tZVByb3BcbiAgICAgICAgcmFkRGF0YUZvcm0ucHJvcGVydGllcy5wb3AoKTsgLy8gcmVtb3ZlIHRoZSBsYXN0IHByb3AgYnV0IHdlIGFsc28gaGF2ZSBzcGxpY2UsIHNsaWNlLCBldGMuXG4gXG4gICAgICAgIGNvbnNvbGUubG9nKHJhZERhdGFGb3JtLnByb3BlcnRpZXMpIC8vIG5vdyB0aGUgcHJvcGVydGllcyBhcmUgMyBidXQgd2Ugc3RpbGwgbmVlZCB0byBlZGl0IHRoZSBzb3VyY2Ugb2JqZWN0IGJlZm9yZSByZWxvYWRpbmcgdGhlIHdob2xlIGZvcm1cbiBcbiAgICAgICAgLy8gbm9ybWlsaXppbmcgdGhlIHNvdXJjZSBvYmplY3RcbiAgICAgICAgcmFkRGF0YUZvcm0uc291cmNlID0ge1xuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJlbnZpcm9ubWVudFwiOiBcIlwiXG4gICAgICAgIH07XG4gXG4gICAgICAgIHJhZERhdGFGb3JtLnJlbG9hZCgpO1xuICAgIH1cbn1cbiJdfQ==