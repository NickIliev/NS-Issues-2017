import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, AfterContentInit, OnDestroy } from "@angular/core";
import * as utils from "utils/utils";
import { HieberService, LoginService } from "../../shared";
import { alert } from "../../shared";
import { Page } from "ui/page";
import { ListView } from "ui/list-view";

import { ObservableArray } from "data/observable-array";
import { getString, setString, getNumber, setNumber } from "application-settings";
declare var UIColor: any;
import { Router, NavigationExtras } from '@angular/router';
import { connectionType, getConnectionType } from "connectivity";
import * as app from 'application';
import { TranslateService } from '@ngx-translate/core';

class ChatPrivateList {
    name: string;
    userid: number;
    messageText: string;
    Date: string;

    constructor(name: string, userid: number, messageText: string, Date: string) {
        this.name = name;
        this.userid = userid;
        this.messageText = messageText;
        this.Date = Date;
    }
}

@Component({
    selector: "gr-chat-list",
    templateUrl: "main/chatlist/privateChatUser.component.html",
    styleUrls: ["main/main-common.css"],
    providers: [HieberService]
})
export class PrivateChatUser implements AfterContentInit, OnInit {

    private static CLASS_NAME = "PrivateChatUser = ";
    // Device platform
    isAndroid;
    isIOS;

    @Input() row;
    public chat: ObservableArray<ChatPrivateList>;
    public isVisible: boolean = true;

    private chatList = [];

    chatListLengthCheck = 0;
    lengthNumberSave: number;

    // LoggedIn User ID
    senderID: number;
    deviceID: string;

    private timerForUpdateChatList: number;

    //Activity indicatior
    isAuthenticating = false;

    // translate Application
    internet_connection_dialog:string;

    constructor(private page: Page, private loginService: LoginService, private hieberService: HieberService, private router: Router,translate:TranslateService) {
        this.load();
        this.dismissKeyBoard();
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
                console.log(PrivateChatUser.CLASS_NAME + err);
            }
        }
    }
    ngAfterContentInit() {
        // set the Timer to get updates while on this component
        this.timerForUpdateChatList = setInterval(() => this.load(), 3300);
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
        this.hieberService.getChatUser()
            .subscribe(
            (data) => {
                var resultData = JSON.parse(JSON.stringify(data));
              
                this.lengthNumberSave = resultData.length;
                //   if(this.chatListLengthCheck == this.lengthNumberSave){
                //     console.log(PrivateChatUser.CLASS_NAME + "length matched");
                //     return;
                //   }
                this.chatList = [];
                this.chat = new ObservableArray(this.chatList);
                this.chatListLengthCheck = this.lengthNumberSave;
                for (var i = 0; i < JSON.parse(JSON.stringify(data)).length; i++) {
                    var resultChat = JSON.parse(JSON.stringify(data));
                    var chatData = { "name": resultChat[i].User.Name, "userid": resultChat[i].User.UserID, "messageText": resultChat[i].Message.Text, "Date": (new Date(resultChat[i].Message.Date).getTime() + new Date(resultChat[i].Message.Date).getTimezoneOffset() * 60 * 1000), "msgUnread": resultData[i].UnreadMessageCount, "msgNumber": true };
                    if (chatData.msgUnread == 0) {
                        chatData.msgUnread = "0";
                        chatData.msgNumber = false;
                    }

                    this.chatList.push(chatData);
                }
                this.chat = new ObservableArray(this.chatList);
                for (var i = 0; i < JSON.parse(JSON.stringify(data)).length; i++) {
                    this.chat.sort(function (left, right) { return left.Date == right.Date ? 0 : (left.Date > right.Date ? -1 : 1) });
                }
            },
            (error) => {
                this.isAuthenticating = false;
                //   alert("Unfortunately we could not get chat..");
            },
            () => {
                this.isAuthenticating = false;
                // console.log(PrivateChatUser.CLASS_NAME + "get chat user works fine.");
            }
            );
    }

    // on Chat item selected detail screen open
    public chatItemSelected(args) {
        this.senderID = getNumber("userID", this.senderID);
        var data = args.view.bindingContext;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "OtherName": data.name,
                "chatUserId": data.userid,
            }
        }
        this.router.navigate(["/tc-chat"], navigationExtras);
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

