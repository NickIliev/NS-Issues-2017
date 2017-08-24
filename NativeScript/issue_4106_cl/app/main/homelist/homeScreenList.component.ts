import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit, AfterContentInit } from "@angular/core";
import * as utils from "utils/utils";
import { HieberService, LoginService } from "../../shared";
import { alert } from "../../shared";
import { Page } from "ui/page";
import { ObservableArray } from "data/observable-array";
declare var UIColor: any;
import { ListView } from "ui/list-view";
import { Router, NavigationExtras } from '@angular/router';
import { connectionType, getConnectionType } from "connectivity";
import { setNumber, getNumber } from "application-settings";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "gr-home-list",
    templateUrl: "main/homelist/homeScreenList.component.html",
    styleUrls: ["main/main-common.css"]
})
export class HomeScreenList implements OnInit, AfterContentInit {

    @Input() row;

    homeListArray = [];
    private timerForUpdateHomeList: number;

    //Activity indicatior
    isAuthenticating = false;
    itemVisible: string = "visible";

    public homeList: ObservableArray<any>;

    // translate Application
    internet_connection_dialog:string;

    constructor(private page: Page, private loginService: LoginService, private hieberService: HieberService, private router: Router,translate:TranslateService) {
     translate.get('HOME.internet_connection', { value: '' }).subscribe((res: string) => {
      this.internet_connection_dialog = res;
    });
    }

    ngOnInit() {
      
        this.load();
        //   this.test();
    }

    ngAfterContentInit() {
        this.timerForUpdateHomeList = setInterval(() => this.load(), 2800);
    }

    ngOnDestroy() {
        // clearInterval when component is destroyed
        clearInterval(this.timerForUpdateHomeList);
    }
    load() {
        this.isAuthenticating = true;
        if (getConnectionType() === connectionType.none) {
            clearInterval(this.timerForUpdateHomeList);
            this.isAuthenticating = false;
            alert(this.internet_connection_dialog);
            return;
        }
        this.hieberService.getChatConversationAll()
            .subscribe(
            (data) => {
                var resultData = JSON.parse(JSON.stringify(data));
                this.homeListArray = [];
                this.homeList = new ObservableArray(this.homeListArray);
                for (var i = 0; i < resultData.length; i++) {
                    var getData;
                    var month = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
                    if (resultData[i].UnreadMessageCount != 0) {
                        if (resultData[i].IsGroup === true) {
                            getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": resultData[i].Group.Name, "userItem": "collapsed", "grpItem": "visible", "groupId": resultData[i].Group.Id, "msgUnread": resultData[i].UnreadMessageCount, "userName": "", "userId": "", "grpNumber": true };
                            if (getData.msgUnread == 0) {
                                getData.msgUnread = "";
                                getData.grpNumber = false;
                            }
                        }
                        else {
                            getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": "", "userItem": "visible", "grpItem": "collapsed", "groupId": "", "msgUnread": resultData[i].UnreadMessageCount, "userName": resultData[i].User.Name, "userId": resultData[i].User.UserID, "grpNumber": true };
                            if (getData.msgUnread == 0) {
                                getData.msgUnread = "0";
                                getData.grpNumber = false;
                            }
                        }
                        this.homeListArray.push(getData);
                    }
                }
                if (this.homeListArray.length != 0) {
                    this.homeList = new ObservableArray(this.homeListArray);
                    this.homeList.sort(function (left, right) { return left.Date == right.Date ? 0 : (left.Date > right.Date ? -1 : 1) });
                }
                else {
                    this.itemVisible = "collapsed";
                }
            },
            (error) => {
                this.isAuthenticating = false;

            },
            () => {
                this.isAuthenticating = false;
            }
            );
    }

    public homeNotificationListItemSelected(args) {
        var senderID = getNumber("userID");
        var data = args.view.bindingContext;
        console.log("homeNotificationListItemSelected: " + "userid: " + data.userId + " " + "Name" + data.userName + " GrpName: " + data.GrpName + " " + "grpId: " + data.groupId);
        if (data.userId == "") {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "groupName": data.groupName,
                    "chatGroupId": data.groupId
                }
            }
            this.router.navigate(["/tc-group-chat"], navigationExtras);
        }
        else {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "OtherName": data.userName,
                    "chatUserId": data.userId,

                }
            }
            this.router.navigate(["/tc-chat"], navigationExtras);
        }
    }

    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    makeBackgroundTransparent(args) {
        let cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    }

    // Document tab list on Tap Listener
    public onItemTapHomeList(args) {
        console.log("Home list on click item: " + args.index);
    }

    // Delete item from the list for Android 
    public remove(args) {
        console.log("index check: " + args.index);
        var btn = args.object;
        var tappedItemData = btn.bindingContext;
        this.homeList.splice(tappedItemData.id, 1);
        console.log("deleted");
    }


}

