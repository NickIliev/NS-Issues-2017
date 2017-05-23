"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils = require("utils/utils");
var shared_1 = require("../../shared");
var page_1 = require("ui/page");
var observable_array_1 = require("data/observable-array");
var router_1 = require("@angular/router");
var connectivity_1 = require("connectivity");
var application_settings_1 = require("application-settings");
var Sqlite = require("nativescript-sqlite");
var Contact = (function () {
    function Contact(name, userid) {
        this.name = name;
        this.userid = userid;
    }
    return Contact;
}());
var AllContacts = AllContacts_1 = (function () {
    function AllContacts(page, hieberService, router) {
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
    AllContacts.prototype.insert = function () {
        var _this = this;
        this.database.execSQL("INSERT INTO contact (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then(function (id) {
            _this.fetch();
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
    };
    AllContacts.prototype.fetch = function () {
        var _this = this;
        this.database.all("SELECT * FROM contact").then(function (rows) {
            _this.contactsData = [];
            for (var row in rows) {
                _this.contactsData.push({
                    "id": rows[row][0],
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
    };
    AllContacts.prototype.ngOnInit = function () {
        // this.insert();
        this.getContact();
    };
    AllContacts.prototype.ngAfterViewInit = function () {
        // set the Timer to get updates while on this component
        //  this.timerForUpdateContactList = setInterval(()=> this.getUpdateContactList(), 50000);
    };
    AllContacts.prototype.ngOnDestroy = function () {
        // clearInterval when component is destroy
        clearInterval(this.timerForUpdateContactList);
    };
    AllContacts.prototype.getUpdateContactList = function () {
        this.getContact();
    };
    // Web service call to getContact 
    AllContacts.prototype.getContact = function () {
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
                console.log(AllContacts_1.CLASS_NAME + "length matched");
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
            // console.log(AllContacts.CLASS_NAME + " Get all Contacts working fine.");
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
    AllContacts.prototype.chatItemSelected = function (args) {
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
    AllContacts.prototype.makeBackgroundTransparent = function (args) {
        var cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    };
    return AllContacts;
}());
AllContacts.CLASS_NAME = "AllContacts = ";
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AllContacts.prototype, "row", void 0);
AllContacts = AllContacts_1 = __decorate([
    core_1.Component({
        selector: "gr-all-contacts-list",
        templateUrl: "main/chatlist/allContacts.component.html",
        styleUrls: ["main/main-common.css"],
        providers: [shared_1.HieberService]
    }),
    __metadata("design:paramtypes", [page_1.Page, shared_1.HieberService, router_1.Router])
], AllContacts);
exports.AllContacts = AllContacts;
var AllContacts_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsQ29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxsQ29udGFjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZJO0FBQzdJLG1DQUFxQztBQUNyQyx1Q0FBNkM7QUFDN0MsZ0NBQStCO0FBRy9CLDBEQUF3RDtBQUV4RCwwQ0FBMkQ7QUFDM0QsNkNBQWlFO0FBQ2pFLDZEQUFpRDtBQUNqRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU1QztJQUlJLGlCQUFZLElBQVksRUFBRSxNQUFjO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFPRCxJQUFhLFdBQVc7SUEwQnBCLHFCQUFvQixJQUFVLEVBQVUsYUFBNEIsRUFBVSxNQUFjO1FBQXhFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFqQnJGLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFekIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUt0QiwyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFJM0IscUJBQXFCO1FBQ3JCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVsQixhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFrQixFQUFFLENBQUM7SUFHM0MsQ0FBQztJQUVNLDRCQUFNLEdBQWI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHlEQUF5RCxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUN0RyxLQUFJLENBQUMsS0FBSyxFQUFFLENB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Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEhpZWJlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInVpL2xpc3Qtdmlld1wiO1xuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5kZWNsYXJlIHZhciBVSUNvbG9yOiBhbnk7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xuaW1wb3J0IHsgZ2V0TnVtYmVyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbmNsYXNzIENvbnRhY3Qge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1c2VyaWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdXNlcmlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy51c2VyaWQgPSB1c2VyaWQ7XG4gICAgfVxufVxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ3ItYWxsLWNvbnRhY3RzLWxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJtYWluL2NoYXRsaXN0L2FsbENvbnRhY3RzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJtYWluL21haW4tY29tbW9uLmNzc1wiXSxcbiAgICBwcm92aWRlcnM6IFtIaWViZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBBbGxDb250YWN0cyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBDTEFTU19OQU1FID0gXCJBbGxDb250YWN0cyA9IFwiO1xuXG5cbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgcHVibGljIGNvbnRhY3RzRGF0YTogQXJyYXk8YW55PjtcbiAgICBASW5wdXQoKSByb3c7XG4gICAgcHVibGljIGNoYXQ6IE9ic2VydmFibGVBcnJheTxDb250YWN0PjtcbiAgICBwdWJsaWMgaXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgY2hhdExpc3QgPSBbXTtcblxuICAgIC8vIExvZ2dlZEluIFVzZXIgSURcbiAgICBzZW5kZXJJRDogbnVtYmVyO1xuXG4gICAgY29udGFjdExpc3RMZW5ndGhDaGVjayA9IDA7XG4gICAgY29udGFjdExlbmd0aFNhdmU6IG51bWJlcjtcbiAgICBwcml2YXRlIHRpbWVyRm9yVXBkYXRlQ29udGFjdExpc3Q6IG51bWJlcjtcblxuICAgIC8vQWN0aXZpdHkgaW5kaWNhdGlvclxuICAgIGlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb250YWN0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHB1YmxpYyB1c2VySURzQ29udGFjdHM6IEFycmF5PG51bWJlcj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBoaWViZXJTZXJ2aWNlOiBIaWViZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGluc2VydCgpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gY29udGFjdCAoZmlyc3RuYW1lLCBsYXN0bmFtZSkgVkFMVUVTICg/LCA/KVwiLCBbXCJOaWNcIiwgXCJSYWJveVwiXSkudGhlbihpZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5TRVJUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZldGNoKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gY29udGFjdFwiKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250YWN0c0RhdGEgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWN0c0RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0bmFtZVwiOiByb3dzW3Jvd11bMV0sXG4gICAgICAgICAgICAgICAgICAgIFwibGFzdG5hbWVcIjogcm93c1tyb3ddWzJdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgLy8gdGhpcy5pbnNlcnQoKTtcbiAgICAgICAgICB0aGlzLmdldENvbnRhY3QoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vIHNldCB0aGUgVGltZXIgdG8gZ2V0IHVwZGF0ZXMgd2hpbGUgb24gdGhpcyBjb21wb25lbnRcbiAgICAgICAgLy8gIHRoaXMudGltZXJGb3JVcGRhdGVDb250YWN0TGlzdCA9IHNldEludGVydmFsKCgpPT4gdGhpcy5nZXRVcGRhdGVDb250YWN0TGlzdCgpLCA1MDAwMCk7XG4gICAgICBcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gY2xlYXJJbnRlcnZhbCB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95XG4gICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJGb3JVcGRhdGVDb250YWN0TGlzdCk7ICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRVcGRhdGVDb250YWN0TGlzdCgpIHtcbiAgICAgICAgdGhpcy5nZXRDb250YWN0KCk7XG4gICAgfVxuXG4gICAgLy8gV2ViIHNlcnZpY2UgY2FsbCB0byBnZXRDb250YWN0IFxuICAgIHByaXZhdGUgZ2V0Q29udGFjdCgpIHtcbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGllYmVyU2VydmljZS5nZXRDb250YWN0KClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHREYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWN0TGVuZ3RoU2F2ZSA9IHJlc3VsdERhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhY3RMaXN0TGVuZ3RoQ2hlY2sgPT0gdGhpcy5jb250YWN0TGVuZ3RoU2F2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhBbGxDb250YWN0cy5DTEFTU19OQU1FICsgXCJsZW5ndGggbWF0Y2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoYXRMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXRMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RMaXN0TGVuZ3RoQ2hlY2sgPSB0aGlzLmNvbnRhY3RMZW5ndGhTYXZlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdENoYXQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhdERhdGEgPSB7IFwibmFtZVwiOiByZXN1bHRDaGF0W2ldLk5hbWUsIFwidXNlcmlkXCI6IHJlc3VsdENoYXRbaV0uVXNlcklEIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdExpc3QucHVzaChjaGF0RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29tcGFyZSh0aGlzLmNoYXRMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhdExpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhdC5zb3J0KGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdC5uYW1lID09IHJpZ2h0Lm5hbWUgPyAwIDogKGxlZnQubmFtZSA8IHJpZ2h0Lm5hbWUgPyAtMSA6IDEpIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwiVW5mb3J0dW5hdGVseSB3ZSBjb3VsZCBub3QgZ2V0IGNvbnRhY3RzLlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coQWxsQ29udGFjdHMuQ0xBU1NfTkFNRSArIFwiIEdldCBhbGwgQ29udGFjdHMgd29ya2luZyBmaW5lLlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gIHB1YmxpYyBjb21wYXJlKGRhdGE6YW55KXtcbiAgICAvLyAgICAgIHZhciB0ZXN0XG4gICAgLy8gICAgICBmb3IodmFyIGkgPTA7IGk8IGRhdGEubGVuZ3RoOyBpKyspe1xuICAgIC8vICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0ubmFtZSk7XG4gICAgLy8gICAgICAgIHRoaXMuY29udGFjdHMucHVzaChkYXRhW2ldLm5hbWUpO1xuICAgIC8vICAgICAgICB0aGlzLnVzZXJJRHNDb250YWN0cy5wdXNoKGRhdGFbaV0udXNlcmlkKTsgXG4gICAgLy8gICAgICB9ICBcbiAgICAvLyAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFjdHMuc29ydCgpKSsgXCJTb3J0ZWQgQXJyYXlcIjtcbiAgICAvLyAgICAgLy8gIHRoaXMuY2hhdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jb250YWN0cyk7ICAgIFxuXG4gICAgLy8gIH1cblxuICAgIC8vIG9uIENoYXQgaXRlbSBzZWxlY3RlZCBcbiAgICBwdWJsaWMgY2hhdEl0ZW1TZWxlY3RlZChhcmdzKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xuICAgICAgICB0aGlzLnNlbmRlcklEID0gZ2V0TnVtYmVyKFwidXNlcklEXCIpO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgXCJPdGhlck5hbWVcIjogZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIFwiY2hhdFVzZXJJZFwiOiBkYXRhLnVzZXJpZCxcbiAgICAgICAgICAgICAgICBcInNlbmRlcklEXCI6IHRoaXMuc2VuZGVySURcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGMtY2hhdFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyB0cmljayBtYWtlcyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBlYWNoIGNlbGxcbiAgICAvLyBpbiB0aGUgVUlUYWJsZVZpZXcgdHJhbnNwYXJlbnQgYXMgaXTigJlzIGNyZWF0ZWQuXG4gICAgbWFrZUJhY2tncm91bmRUcmFuc3BhcmVudChhcmdzKSB7XG4gICAgICAgIGxldCBjZWxsID0gYXJncy5pb3M7XG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAvLyBzdXBwb3J0IFhDb2RlIDhcbiAgICAgICAgICAgIGNlbGwuYmFja2dyb3VuZENvbG9yID0gdXRpbHMuaW9zLmdldHRlcihVSUNvbG9yLCBVSUNvbG9yLmNsZWFyQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbiJdfQ==