import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnChanges, AfterViewInit, OnInit } from "@angular/core";
import * as utils from "utils/utils";
import { HieberService } from "../../shared";
import { Page } from "ui/page";
import { ListView } from "ui/list-view";
import { alert } from "../../shared";
import { ObservableArray } from "data/observable-array";
declare var UIColor: any;
import { Router, NavigationExtras } from '@angular/router';
import { connectionType, getConnectionType } from "connectivity";
import { getString, setNumber, getNumber } from "application-settings";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "gr-all-chatgroups-list",
    templateUrl: "main/chatlist/groupChatUser.component.html",
    styleUrls: ["main/main-common.css"],
})
export class GroupChatUser implements OnInit {

    private static CLASS_NAME = "AllChatGroupListComponent = ";
    @Input() row;
    public chatGrps: ObservableArray<any>;
    public isVisible: boolean = true;

    private chatGrpList = [];

    grpChatListLengthCheck = 0;
    grpChatListLengthSave: number;
    private timerForUpdateGrpChatList: number;

    //Activity indicatior
    isAuthenticating = false;
    userID: number;

    // translate Application
    internet_connection_dialog:string;

    constructor(private page: Page, private hieberService: HieberService, private router: Router, translate: TranslateService) {
           translate.get('HOME.internet_connection', { value: '' }).subscribe((res: string) => {
      this.internet_connection_dialog = res;
    });
    }

    ngOnInit() {
        // Web API calll Get contacts and currentUserDetails 
       
    }

    ngAfterViewInit() {
        // set the Timer to get updates while on this component
        this.timerForUpdateGrpChatList = setInterval(() => this.getUpdateGrpChatList(), 3300);
    }

    ngOnDestroy() {
        // clearInterval when component is destroyed
        clearInterval(this.timerForUpdateGrpChatList);
    }

    private getUpdateGrpChatList() {
        this.getAllGroupChats();
    }

    // Web service call to get all group chat by current user  
    private getAllGroupChats() {
        this.isAuthenticating = true;
        if (getConnectionType() === connectionType.none) {
            clearInterval(this.timerForUpdateGrpChatList);
            alert(this.internet_connection_dialog);
            this.isAuthenticating = false;
            return;
        }
        this.hieberService.getallgroupChats(getNumber("userID"))
            .subscribe(
            (data) => {
                var resultData = JSON.parse(JSON.stringify(data));
                this.grpChatListLengthSave = resultData.length;
                this.chatGrpList = [];
                this.chatGrps = new ObservableArray(this.chatGrpList);
                this.grpChatListLengthCheck = this.grpChatListLengthSave;
                // console.log("lenght group:" + JSON.parse(JSON.stringify(data)).length);
                for (var i = 0; i < JSON.parse(JSON.stringify(data)).length; i++) {
                    var resultChat = JSON.parse(JSON.stringify(data));
                    var chatData;
                    if (resultChat[i].Message != null) {
                        chatData = { "name": resultChat[i].Group.Name, "chatGroupId": resultChat[i].Group.Id, "messageText": resultChat[i].Message.Text, "Date": (new Date(resultChat[i].Message.Date).getTime() + new Date(resultChat[i].Message.Date).getTimezoneOffset() * 60 * 1000), "msgUnread": resultData[i].UnreadMessageCount, "grpNumber": true };
                        if (chatData.msgUnread == 0) {
                            chatData.msgUnread = "0";
                            chatData.grpNumber = false;
                        }
                    }
                    else {
                        chatData = { "name": resultChat[i].Group.Name, "chatGroupId": resultChat[i].Group.Id, "messageText": "", "Date": (new Date(resultChat[i].Group.Date).getTime() + new Date(resultChat[i].Group.Date).getTimezoneOffset() * 60 * 1000), "msgUnread": resultData[i].UnreadMessageCount, "grpNumber": true };
                        if (chatData.msgUnread == 0) {
                            chatData.msgUnread = "0";
                            chatData.grpNumber = false;
                        }

                    }

                    this.chatGrpList.push(chatData);

                }
                this.chatGrps = new ObservableArray(this.chatGrpList);
                this.chatGrps.sort(function (left, right) { return left.Date == right.Date ? 0 : (left.Date > right.Date ? -1 : 1) });
            },
            (error) => {
                this.isAuthenticating = false;
                // alert("Unfortunately we could not get Group.");
            },
            () => {
                this.isAuthenticating = false;
                // console.log(GroupChatUser.CLASS_NAME + " Get all Contacts working fine.");
            },
        );
    }

    // on Chat item selected 
    public groupChatItemSelected(args) {
        var data = args.view.bindingContext;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "groupName": data.name,
                "chatGroupId": data.chatGroupId
            }
        }
        this.router.navigate(["/tc-group-chat"], navigationExtras);
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

}

