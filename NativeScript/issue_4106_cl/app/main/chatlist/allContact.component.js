"use strict";
var core_1 = require("@angular/core");
var utils = require("utils/utils");
var shared_1 = require("../../shared");
var page_1 = require("ui/page");
var listview_util_1 = require("../../shared/listview-util");
var observable_array_1 = require("data/observable-array");
var router_1 = require("@angular/router");
var connectivity_1 = require("connectivity");
var application_settings_1 = require("application-settings");
var Contact = (function () {
    function Contact(name, userid) {
        this.name = name;
        this.userid = userid;
    }
    return Contact;
}());
var AllContactsListComponent = AllContactsListComponent_1 = (function () {
    function AllContactsListComponent(page, hieberService, router) {
        this.page = page;
        this.hieberService = hieberService;
        this.router = router;
        this.isVisible = true;
        this.chatList = [];
        this.contactListLengthCheck = 0;
        //Activity indicatior
        this.isAuthenticating = false;
        this.contacts = [];
        this.userIDsContacts = [];
    }
    AllContactsListComponent.prototype.ngOnInit = function () {
        this.getContact();
    };
    AllContactsListComponent.prototype.ngAfterViewInit = function () {
        // set the Timer to get updates while on this component
        //  this.timerForUpdateContactList = setInterval(()=> this.getUpdateContactList(), 50000);
        var listView = this.page.getViewById("lvChatAll");
        if (listView.ios) {
            listView.ios.dataSource = listview_util_1.ListViewUtil.initWithOwner(new WeakRef(listView));
        }
    };
    AllContactsListComponent.prototype.ngOnDestroy = function () {
        // clearInterval when component is destroy
        // clearInterval(this.timerForUpdateContactList);   
    };
    AllContactsListComponent.prototype.getUpdateContactList = function () {
        this.getContact();
    };
    // Web service call to getContact 
    AllContactsListComponent.prototype.getContact = function () {
        var _this = this;
        this.isAuthenticating = true;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            this.isAuthenticating = false;
            return;
        }
        this.hieberService.getContact()
            .subscribe(function (data) {
            var resultData = JSON.parse(JSON.stringify(data));
            _this.contactLengthSave = resultData.length;
            if (_this.contactListLengthCheck == _this.contactLengthSave) {
                console.log(AllContactsListComponent_1.CLASS_NAME + "length matched");
                return;
            }
            _this.chatList = [];
            _this.chat = new observable_array_1.ObservableArray(_this.chatList);
            _this.contactListLengthCheck = _this.contactLengthSave;
            for (var i = 0; i < JSON.parse(JSON.stringify(data)).length; i++) {
                var resultChat = JSON.parse(JSON.stringify(data));
                var chatData = { "name": resultChat[i].Name, "userid": resultChat[i].UserID };
                _this.chatList.push(chatData);
            }
            // this.compare(this.chatList);
            _this.chat = new observable_array_1.ObservableArray(_this.chatList);
            _this.chat.sort(function (left, right) { return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1); });
        }, function (error) {
            _this.isAuthenticating = false;
            // alert("Unfortunately we could not get contacts.");
        }, function () {
            _this.isAuthenticating = false;
            console.log(AllContactsListComponent_1.CLASS_NAME + " Get all Contacts working fine.");
        });
    };
    //  public compare(data:any){
    //      var test
    //      for(var i =0; i< data.length; i++){
    //          console.log(data[i].name);
    //        this.contacts.push(data[i].name);
    //        this.userIDsContacts.push(data[i].userid); 
    //      }  
    //      console.log(this.contacts.sort())+ "Sorted Array";
    //     //  this.chat = new ObservableArray(this.contacts);    
    //  }
    // on Chat item selected 
    AllContactsListComponent.prototype.chatItemSelected = function (args) {
        var data = args.view.bindingContext;
        this.senderID = application_settings_1.getNumber("userID");
        var navigationExtras = {
            queryParams: {
                "OtherName": data.name,
                "chatUserId": data.userid,
                "senderID": this.senderID
            }
        };
        this.router.navigate(["/tc-chat"], navigationExtras);
    };
    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    AllContactsListComponent.prototype.makeBackgroundTransparent = function (args) {
        var cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    };
    return AllContactsListComponent;
}());
AllContactsListComponent.CLASS_NAME = "AllContactsListComponent = ";
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AllContactsListComponent.prototype, "row", void 0);
AllContactsListComponent = AllContactsListComponent_1 = __decorate([
    core_1.Component({
        selector: "gr-all-contacts-list",
        templateUrl: "main/chatlist/chat-all-contacts.component.html",
        styleUrls: ["main/main-common.css"],
        providers: [shared_1.HieberService]
    }),
    __metadata("design:paramtypes", [page_1.Page, shared_1.HieberService, router_1.Router])
], AllContactsListComponent);
exports.AllContactsListComponent = AllContactsListComponent;
var AllContactsListComponent_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsQ29udGFjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGxDb250YWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlJO0FBQ3pJLG1DQUFxQztBQUNyQyx1Q0FBMkM7QUFDM0MsZ0NBQTZCO0FBRTdCLDREQUF3RDtBQUV4RCwwREFBc0Q7QUFFdEQsMENBQTBEO0FBQzFELDZDQUFpRTtBQUNqRSw2REFBZ0Q7QUFHaEQ7SUFJSyxpQkFBWSxJQUFZLEVBQUcsTUFBYTtRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ04sY0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBT0QsSUFBYSx3QkFBd0I7SUF1QmpDLGtDQUFvQixJQUFXLEVBQVUsYUFBNkIsRUFBUyxNQUFjO1FBQXpFLFNBQUksR0FBSixJQUFJLENBQU87UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBakJ0RixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFLdEIsMkJBQXNCLEdBQUcsQ0FBQyxDQUFDO1FBSTNCLHFCQUFxQjtRQUNyQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFbEIsYUFBUSxHQUFrQixFQUFFLENBQUM7UUFDN0Isb0JBQWUsR0FBa0IsRUFBRSxDQUFDO0lBSTNDLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQ0ssdURBQXVEO1FBQ3hELDBGQUEwRjtRQUMxRixJQUFJLFFBQVEsR0FBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENB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QTFIbUIsbUNBQVUsR0FBRyw2QkFBNkIsQ0FBQztBQUVsRDtJQUFSLFlBQUssRUFBRTs7cURBQUs7QUFKSix3QkFBd0I7SUFOcEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuQyxTQUFTLEVBQUUsQ0FBQyxzQkFBYSxDQUFDO0tBQzNCLENBQUM7cUNBd0I2QixXQUFJLEVBQTBCLHNCQUFhLEVBQWlCLGVBQU07R0F2QnBGLHdCQUF3QixDQTRIcEM7QUE1SFksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0ICxPbkNoYW5nZXMsT25Jbml0LEFmdGVyVmlld0luaXQsT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5pbXBvcnQge0hpZWJlclNlcnZpY2V9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjsgICBcbmltcG9ydCB7TGlzdFZpZXd9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7TGlzdFZpZXdVdGlsfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2xpc3R2aWV3LXV0aWxcIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmRlY2xhcmUgdmFyIFVJQ29sb3I6IGFueTtcbmltcG9ydCB7IFJvdXRlciAsTmF2aWdhdGlvbkV4dHJhc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IGdldE51bWJlcn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cblxuY2xhc3MgQ29udGFjdHtcbiAgICAgbmFtZTpzdHJpbmc7XG4gICAgIHVzZXJpZDogbnVtYmVyO1xuXG4gICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyAsIHVzZXJpZDpudW1iZXIpe1xuICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgIHRoaXMudXNlcmlkID0gdXNlcmlkO1xuICAgICB9XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZ3ItYWxsLWNvbnRhY3RzLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwibWFpbi9jaGF0bGlzdC9jaGF0LWFsbC1jb250YWN0cy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIm1haW4vbWFpbi1jb21tb24uY3NzXCJdLFxuICBwcm92aWRlcnM6IFtIaWViZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBBbGxDb250YWN0c0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB7XG4gXG4gICAgIHByaXZhdGUgc3RhdGljIENMQVNTX05BTUUgPSBcIkFsbENvbnRhY3RzTGlzdENvbXBvbmVudCA9IFwiO1xuXG4gICAgQElucHV0KCkgcm93O1xuICAgIHB1YmxpYyBjaGF0Ok9ic2VydmFibGVBcnJheTxDb250YWN0PjtcbiAgICBwdWJsaWMgaXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgY2hhdExpc3QgPSBbXTtcblxuICAgIC8vIExvZ2dlZEluIFVzZXIgSURcbiAgICBzZW5kZXJJRDpudW1iZXI7XG5cbiAgICBjb250YWN0TGlzdExlbmd0aENoZWNrID0gMDtcbiAgICBjb250YWN0TGVuZ3RoU2F2ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgdGltZXJGb3JVcGRhdGVDb250YWN0TGlzdDogbnVtYmVyO1xuXG4gICAgLy9BY3Rpdml0eSBpbmRpY2F0aW9yXG4gICAgaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNvbnRhY3RzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgcHVibGljIHVzZXJJRHNDb250YWN0czogQXJyYXk8bnVtYmVyPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlIDogUGFnZSwgcHJpdmF0ZSBoaWViZXJTZXJ2aWNlIDogSGllYmVyU2VydmljZSxwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmdldENvbnRhY3QoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgICAgIC8vIHNldCB0aGUgVGltZXIgdG8gZ2V0IHVwZGF0ZXMgd2hpbGUgb24gdGhpcyBjb21wb25lbnRcbiAgICAgICAgLy8gIHRoaXMudGltZXJGb3JVcGRhdGVDb250YWN0TGlzdCA9IHNldEludGVydmFsKCgpPT4gdGhpcy5nZXRVcGRhdGVDb250YWN0TGlzdCgpLCA1MDAwMCk7XG4gICAgICAgIGxldCBsaXN0VmlldyA9IDxMaXN0Vmlldz50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJsdkNoYXRBbGxcIik7XG4gICAgICAgICBpZihsaXN0Vmlldy5pb3Mpe1xuICAgICAgICAgbGlzdFZpZXcuaW9zLmRhdGFTb3VyY2UgPSBMaXN0Vmlld1V0aWwuaW5pdFdpdGhPd25lcihuZXcgV2Vha1JlZihsaXN0VmlldykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKXtcbiAgICAgICAgICAvLyBjbGVhckludGVydmFsIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3lcbiAgICAgICAgLy8gY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyRm9yVXBkYXRlQ29udGFjdExpc3QpOyAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXBkYXRlQ29udGFjdExpc3QoKXtcbiAgICAgICAgdGhpcy5nZXRDb250YWN0KCk7XG4gICAgfVxuXG4gICAgIC8vIFdlYiBzZXJ2aWNlIGNhbGwgdG8gZ2V0Q29udGFjdCBcbiAgICAgcHJpdmF0ZSBnZXRDb250YWN0KCl7XG4gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSB0cnVlO1xuICAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICB0aGlzLmhpZWJlclNlcnZpY2UuZ2V0Q29udGFjdCgpXG4gICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgIHZhciByZXN1bHREYXRhPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdExlbmd0aFNhdmUgPSByZXN1bHREYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29udGFjdExpc3RMZW5ndGhDaGVjayA9PSB0aGlzLmNvbnRhY3RMZW5ndGhTYXZlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coQWxsQ29udGFjdHNMaXN0Q29tcG9uZW50LkNMQVNTX05BTUUgKyBcImxlbmd0aCBtYXRjaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXRMaXN0ID1bXTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jaGF0TGlzdCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RMaXN0TGVuZ3RoQ2hlY2sgPSB0aGlzLmNvbnRhY3RMZW5ndGhTYXZlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7aTxKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKS5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q2hhdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hhdERhdGEgPSB7XCJuYW1lXCI6IHJlc3VsdENoYXRbaV0uTmFtZSwgXCJ1c2VyaWRcIjogcmVzdWx0Q2hhdFtpXS5Vc2VySUR9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0TGlzdC5wdXNoKGNoYXREYXRhKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jb21wYXJlKHRoaXMuY2hhdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhdExpc3QpOyAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXQuc29ydChmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQubmFtZSA9PSByaWdodC5uYW1lID8gMCA6IChsZWZ0Lm5hbWUgPCByaWdodC5uYW1lID8gLTEgOiAxKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAoZXJyb3IpPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcIlVuZm9ydHVuYXRlbHkgd2UgY291bGQgbm90IGdldCBjb250YWN0cy5cIik7XG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEFsbENvbnRhY3RzTGlzdENvbXBvbmVudC5DTEFTU19OQU1FICsgXCIgR2V0IGFsbCBDb250YWN0cyB3b3JraW5nIGZpbmUuXCIpO1xuICAgICAgICAgICAgIH0sXG4gICAgICAgICApO1xuICAgICB9XG5cbiAgICAvLyAgcHVibGljIGNvbXBhcmUoZGF0YTphbnkpe1xuICAgIC8vICAgICAgdmFyIHRlc3RcbiAgICAvLyAgICAgIGZvcih2YXIgaSA9MDsgaTwgZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgLy8gICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS5uYW1lKTtcbiAgICAvLyAgICAgICAgdGhpcy5jb250YWN0cy5wdXNoKGRhdGFbaV0ubmFtZSk7XG4gICAgLy8gICAgICAgIHRoaXMudXNlcklEc0NvbnRhY3RzLnB1c2goZGF0YVtpXS51c2VyaWQpOyBcbiAgICAvLyAgICAgIH0gIFxuICAgIC8vICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWN0cy5zb3J0KCkpKyBcIlNvcnRlZCBBcnJheVwiO1xuICAgIC8vICAgICAvLyAgdGhpcy5jaGF0ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNvbnRhY3RzKTsgICAgXG4gICAgICAgICBcbiAgICAvLyAgfVxuICAgIFxuICAgIC8vIG9uIENoYXQgaXRlbSBzZWxlY3RlZCBcbiAgICBwdWJsaWMgY2hhdEl0ZW1TZWxlY3RlZChhcmdzKXtcbiAgICAgICAgdmFyIGRhdGEgPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIHRoaXMuc2VuZGVySUQgPSBnZXROdW1iZXIoXCJ1c2VySURcIik7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzIDogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOntcbiAgICAgICAgICAgICAgICBcIk90aGVyTmFtZVwiOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgXCJjaGF0VXNlcklkXCI6ZGF0YS51c2VyaWQsXG4gICAgICAgICAgICAgICAgXCJzZW5kZXJJRFwiOnRoaXMuc2VuZGVySURcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGMtY2hhdFwiXSxuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgLy8gVGhlIGZvbGxvd2luZyB0cmljayBtYWtlcyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBlYWNoIGNlbGxcbiAgLy8gaW4gdGhlIFVJVGFibGVWaWV3IHRyYW5zcGFyZW50IGFzIGl04oCZcyBjcmVhdGVkLlxuICBtYWtlQmFja2dyb3VuZFRyYW5zcGFyZW50KGFyZ3MpIHtcbiAgICBsZXQgY2VsbCA9IGFyZ3MuaW9zO1xuICAgIGlmIChjZWxsKSB7XG4gICAgICAvLyBzdXBwb3J0IFhDb2RlIDhcbiAgICAgIGNlbGwuYmFja2dyb3VuZENvbG9yID0gdXRpbHMuaW9zLmdldHRlcihVSUNvbG9yLCBVSUNvbG9yLmNsZWFyQ29sb3IpO1xuICAgIH1cbiAgfVxuXG59XG5cbiJdfQ==