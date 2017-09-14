"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var MyPlanHelpInfoComponent = (function () {
    function MyPlanHelpInfoComponent(params, modalParams, vcRef, page) {
        this.params = params;
        this.modalParams = modalParams;
        this.vcRef = vcRef;
        this.page = page;
        this.myplanInfoHtml = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\"/></head><body><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Overall Deductible</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">The dollar amount that a member must pay for health care services before a health plan will cover eligible services.<br></br>For example, if a member's deductible is $500, the member will pay that amount, out-of-pocket, before the health plan will cover any eligible services.</p></br><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Co-pay</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliguam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exerci tation ullamcorpor suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.</br> </p></br><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Out of Pocket Maximum</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliguam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exerci tation ullamcorpor suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.</br></p></br></body></html>";
    }
    MyPlanHelpInfoComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; } ";
        }
        if (app.android) {
            this.page.css = "Page {background-image : none; margin: 0 15 15 15} ";
        }
    };
    MyPlanHelpInfoComponent.prototype.closeHelpInfo = function () {
        this.params.closeCallback();
    };
    return MyPlanHelpInfoComponent;
}());
MyPlanHelpInfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "myplanhelpinfo.component.html",
        styleUrls: ["../myPlan.css"]
    }),
    __metadata("design:paramtypes", [dialogs_2.ModalDialogParams, dialogs_1.ModalDialogService,
        core_1.ViewContainerRef, page_1.Page])
], MyPlanHelpInfoComponent);
exports.MyPlanHelpInfoComponent = MyPlanHelpInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlwbGFuaGVscGluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXlwbGFuaGVscGluZm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLG1FQUE2RTtBQUM3RSxtRUFBNEU7QUFDNUUsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQVNwRCxJQUFhLHVCQUF1QjtJQUVoQyxpQ0FBMkIsTUFBeUIsRUFBVSxXQUErQixFQUNqRixLQUF1QixFQUFVLElBQVU7UUFENUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDakYsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRmhELG1CQUFjLEdBQVcsb2tEQUFva0QsQ0FBQztJQUlybUQsQ0FBQztJQUNELDBDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLG1DQUFtQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLHFEQUFxRCxDQUFDO1FBQzNFLENBQUM7SUFDTCxDQUFDO0lBQ00sK0NBQWEsR0FBcEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksdUJBQXVCO0lBUG5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7S0FFL0IsQ0FBQztxQ0FJcUMsMkJBQWlCLEVBQXVCLDRCQUFrQjtRQUMxRSx1QkFBZ0IsRUFBZ0IsV0FBSTtHQUg5Qyx1QkFBdUIsQ0FpQm5DO0FBakJZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJteXBsYW5oZWxwaW5mby5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi4vbXlQbGFuLmNzc1wiXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgTXlQbGFuSGVscEluZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgIHtcbiAgICBwdWJsaWMgbXlwbGFuSW5mb0h0bWw6IHN0cmluZyA9IFwiPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PHRpdGxlPk15VGl0bGU8L3RpdGxlPjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIi8+PC9oZWFkPjxib2R5PjxzcGFuIHN0eWxlPVxcXCJmb250LXNpemU6MjA7Y29sb3I6IzVjOTFiYjtmb250LXdlaWdodDpib2xkO1xcXCI+T3ZlcmFsbCBEZWR1Y3RpYmxlPC9zcGFuPjxwIHN0eWxlPVxcXCJib3JkZXItYm90dG9tOiAxcHggc29saWQgIzc5Nzk3OTtcXFwiPjwvcD48cCBzdHlsZT1cXFwiZm9udC1zaXplOjE4O2NvbG9yOiM3OTc5Nzk7XFxcIj5UaGUgZG9sbGFyIGFtb3VudCB0aGF0IGEgbWVtYmVyIG11c3QgcGF5IGZvciBoZWFsdGggY2FyZSBzZXJ2aWNlcyBiZWZvcmUgYSBoZWFsdGggcGxhbiB3aWxsIGNvdmVyIGVsaWdpYmxlIHNlcnZpY2VzLjxicj48L2JyPkZvciBleGFtcGxlLCBpZiBhIG1lbWJlcidzIGRlZHVjdGlibGUgaXMgJDUwMCwgdGhlIG1lbWJlciB3aWxsIHBheSB0aGF0IGFtb3VudCwgb3V0LW9mLXBvY2tldCwgYmVmb3JlIHRoZSBoZWFsdGggcGxhbiB3aWxsIGNvdmVyIGFueSBlbGlnaWJsZSBzZXJ2aWNlcy48L3A+PC9icj48c3BhbiBzdHlsZT1cXFwiZm9udC1zaXplOjIwO2NvbG9yOiM1YzkxYmI7Zm9udC13ZWlnaHQ6Ym9sZDtcXFwiPkNvLXBheTwvc3Bhbj48cCBzdHlsZT1cXFwiYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM3OTc5Nzk7XFxcIj48L3A+PHAgc3R5bGU9XFxcImZvbnQtc2l6ZToxODtjb2xvcjojNzk3OTc5O1xcXCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVlciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkaWFtIG5vbnVtbXkgbmliaCBldWlzbW9kIHRpbmNpZHVudCB1dCBsYW9yZWV0IGRvbG9yZSBtYWduYSBhbGlndWFtIGVyYXQgdm9sdXRwYXQuIFV0IHdpc2kgZW5pbSBhZCBtaW5pbSB2ZW5haW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2kgdGF0aW9uIHVsbGFtY29ycG9yIHN1c2NpcGl0IGxvYm9ydGlzIG5pc2wgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlbSB2ZWwgZXVtIGlyaXVyZSBkb2xvciBpbiBoZW5kcmVyaXQgaW4gdnVscHV0YXRlLjwvYnI+IDwvcD48L2JyPjxzcGFuIHN0eWxlPVxcXCJmb250LXNpemU6MjA7Y29sb3I6IzVjOTFiYjtmb250LXdlaWdodDpib2xkO1xcXCI+T3V0IG9mIFBvY2tldCBNYXhpbXVtPC9zcGFuPjxwIHN0eWxlPVxcXCJib3JkZXItYm90dG9tOiAxcHggc29saWQgIzc5Nzk3OTtcXFwiPjwvcD48cCBzdHlsZT1cXFwiZm9udC1zaXplOjE4O2NvbG9yOiM3OTc5Nzk7XFxcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dWVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRpYW0gbm9udW1teSBuaWJoIGV1aXNtb2QgdGluY2lkdW50IHV0IGxhb3JlZXQgZG9sb3JlIG1hZ25hIGFsaWd1YW0gZXJhdCB2b2x1dHBhdC4gVXQgd2lzaSBlbmltIGFkIG1pbmltIHZlbmFpbSwgcXVpcyBub3N0cnVkIGV4ZXJjaSB0YXRpb24gdWxsYW1jb3Jwb3Igc3VzY2lwaXQgbG9ib3J0aXMgbmlzbCB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGVtIHZlbCBldW0gaXJpdXJlIGRvbG9yIGluIGhlbmRyZXJpdCBpbiB2dWxwdXRhdGUuPC9icj48L3A+PC9icj48L2JvZHk+PC9odG1sPlwiO1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsIHByaXZhdGUgbW9kYWxQYXJhbXM6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG5cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgfSBcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luOiAwIDE1IDE1IDE1fSBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xvc2VIZWxwSW5mbygpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgIH1cbn1cblxuIl19