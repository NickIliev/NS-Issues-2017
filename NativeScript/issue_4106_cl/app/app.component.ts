import { Component, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { getString, getNumber, setNumber, setString } from 'application-settings';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService, TokenService } from "./shared"
import * as Platform from "platform";
@Component({
    selector: "gr-main",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit {
    
    constructor(private router: Router, translate: TranslateService,private loginService: LoginService,private tokenService: TokenService) {
        

        let language = Platform.device.language;
        translate.addLangs(["en", "de"]);
        translate.setDefaultLang('de');

        translate.use(Platform.device.language.startsWith('d') ? language : 'en');
    }
    ngOnInit() {

        var that = this;

        // Initialize the firebase
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.

            onPushTokenReceivedCallback: function (deviceID) {
                setString("deviceID", deviceID);
                console.log("Device ID : ", deviceID);
            },
            // Handle Receive Push Notification
            onMessageReceivedCallback: function (message) {

                // get User or Group Details in Push Notification  
                console.log("userName: " + message.data.username + " " + "chatUserId: " + message.data.userid + "Group Name: " + message.data.groupname + " " + "chatGroupId: " + message.data.groupid);

                // If application open navigate to Push Notification  
                if (message.foreground == false) {

                    //  Private chat Redirection
                    if (message.data.userid != -1) {
                        let navigationExtras: NavigationExtras = {
                            queryParams: {
                                "OtherName": message.data.username,
                                "chatUserId": message.data.userid
                            }
                        }
                        that.router.navigate(["/tc-chat"], navigationExtras);
                    }
                    //  Group Chat Redirection
                    else {
                        let navigationExtras: NavigationExtras = {
                            queryParams: {
                                "groupName": message.data.groupname,
                                "chatGroupId": message.data.groupid
                            }
                        }
                        that.router.navigate(["/tc-group-chat"], navigationExtras);
                    }
                }
            }
        }).then(
            (instance) => {
                console.log("firebase.init done");
            },
            (error) => {
                console.log("firebase.init error: " + error);
            }
            );

               if (this.tokenService.isTokenExpired(getString("accessToken"))) {
                this.loginService.refreshTokenTimer()
                    .subscribe(
                    (res) => {
                        console.log("successfully .");
                        this.tokenService.initialize(this.loginService.getToken());
                    },
                    (error) => {
                        console.log("refresh error");
                    }
                    );
            }
    }
}