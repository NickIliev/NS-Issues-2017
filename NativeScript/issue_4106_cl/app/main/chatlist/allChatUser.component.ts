import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, AfterContentInit, OnDestroy } from "@angular/core";
import * as utils from "utils/utils";
import { HieberService, LoginService } from "../../shared";
import { alert } from "../../shared";
import { Page } from "ui/page";
import { ListView } from "ui/list-view";
import { ObservableArray } from "data/observable-array";
import { getString, setString, getNumber, setNumber } from "application-settings";
declare var UIColor: any;
import { connectionType, getConnectionType } from "connectivity";
import { Router, NavigationExtras } from '@angular/router';
import * as app from 'application';
import * as ImageSourceModule from "image-source";
import { Image } from "ui/image";
import { fromFile, ImageSource } from "image-source";
import { TranslateService } from '@ngx-translate/core';

class ChatPrivateList {

    Date: string;
    messageText: string;
    groupName: string;
    groupId: number
    userName: string;
    userId: number;
    msgUnreadCount: number;

    constructor(Date: string, messageText: string, groupName: string, groupId: number, userName: string, userId: number, msgUnreadCount: number) {
        this.Date = Date;
        this.messageText = messageText;
        this.groupName = groupName;
        this.groupId = groupId;
        this.userName = userName;
        this.userId = userId;
        this.msgUnreadCount = msgUnreadCount;

    }
}

@Component({
    selector: "gr-all-chat-list",
    templateUrl: "main/chatlist/allChatUser.component.html",
    styleUrls: ["main/main-common.css"],
    providers: [HieberService]
})
export class AllChatUser implements AfterContentInit, OnInit {

    private static CLASS_NAME = "AllChatUser = ";
    // Device platform
    isAndroid;
    isIOS;

    @Input() row;
    public chat: ObservableArray<ChatPrivateList>;
    public isVisible: boolean = true;

    private chatList = [];

    // LoggedIn User ID
    senderID: number;
    deviceID: string;

    private timerForUpdateChatList: number;

    //Activity indicatior
    isAuthenticating = false;
    defaultImage: ImageSource;

    // translate Application
    internet_connection_dialog:string;



    constructor(private page: Page, private loginService: LoginService, private hieberService: HieberService, private router: Router, translate: TranslateService) {
        this.load();
        this.dismissKeyBoard();
        this.defaultImage = new ImageSource();
        this.defaultImage = ImageSourceModule.fromResource("login_icon");
         translate.get('HOME.internet_connection', { value: '' }).subscribe((res: string) => {
      this.internet_connection_dialog = res;
    });
    }

    // Hide Keypad.
    private dismissKeyBoard(): void {
        if (this.isAndroid) {
            try {
                let activity = app.android.foregroundActivity;
                let Context = app.android.currentContext;
                let inputManager = app.android.context.getSystemService(Context.INPUT_METHOD_SERVICE);
                inputManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), Context.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
            } catch (err) {
                console.log(AllChatUser.CLASS_NAME + err);
            }
        }
    }
    ngAfterContentInit() {
        // set the Timer to get updates while on this component
        this.timerForUpdateChatList = setInterval(() => this.load(), 3300);
    }

    private getUpdateChatList() {
        this.load();
    }

    ngOnInit() {
      
        this.load();
    }

    ngOnDestroy() {
        // clearInterval when component is destroy
        clearInterval(this.timerForUpdateChatList);
    }

    load() {
        this.isAuthenticating = true;
        if (getConnectionType() === connectionType.none) {
            clearInterval(this.timerForUpdateChatList);
            alert(this.internet_connection_dialog);
            this.isAuthenticating = false;
            return;
        }
        this.hieberService.getChatConversationAll()
            .subscribe(
            (data) => {
                var resultData = JSON.parse(JSON.stringify(data));
                this.chatList = [];
                this.chat = new ObservableArray(this.chatList);
                for (var i = 0; i < resultData.length; i++) {
                    var getData;

                    if (resultData[i].IsGroup === true) {

                        getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": resultData[i].Group.Name, "userItem": "collapsed", "grpItem": "visible", "groupId": resultData[i].Group.Id, "msgUnread": resultData[i].UnreadMessageCount, "userName": "", "userId": "", "grpNumber": true, "profileimage": this.defaultImage };
                        if (getData.msgUnread == 0) {
                            getData.msgUnread = "";
                            getData.grpNumber = false;
                        }
                    }
                    else {
                        if (resultData[i].User.Picture != null) {
                            var src = new ImageSource();
                            src.loadFromBase64(resultData[i].User.Picture.File);
                            getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": "", "userItem": "visible", "grpItem": "collapsed", "groupId": "", "msgUnread": resultData[i].UnreadMessageCount, "userName": resultData[i].User.Name, "userId": resultData[i].User.UserID, "grpNumber": true, "profileimage": src };
                        }
                        else {
                            getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": "", "userItem": "visible", "grpItem": "collapsed", "groupId": "", "msgUnread": resultData[i].UnreadMessageCount, "userName": resultData[i].User.Name, "userId": resultData[i].User.UserID, "grpNumber": true, "profileimage": this.defaultImage };
                        }

                        if (getData.msgUnread == 0) {
                            getData.msgUnread = "0";
                            getData.grpNumber = false;
                        }
                    }
                    this.chatList.push(getData);

                }
                this.chat = new ObservableArray(this.chatList);
                this.chat.sort(function (left, right) { return left.Date == right.Date ? 0 : (left.Date > right.Date ? -1 : 1) });
            },
            (error) => {
                this.isAuthenticating = false;
                //  alert("Unfortunately we could not get chat..");
            },
            () => {
                this.isAuthenticating = false;
                // console.log(AllChatUser.CLASS_NAME + "get chat user works fine.");
            }
            );
    }

    // on Chat item selected 
    public chatItemSelected(args) {
        this.senderID = getNumber("userID");
        var data = args.view.bindingContext;
        data.msgUnread = "0";
        if (data.userId == 0) {
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

}

