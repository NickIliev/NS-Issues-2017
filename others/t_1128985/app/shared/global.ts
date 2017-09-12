import { Component, Injectable, Input, Output, EventEmitter } from "@angular/core";
import * as Toast from "nativescript-toast";
import { View } from "ui/core/view";
import { LayoutBase } from "ui/layouts/layout-base";
import { LocateAddress } from "nativescript-locate-address";
import * as app from "tns-core-modules/application";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import * as appSettingsModule from "application-settings";
declare var android;

Injectable();
export class Globals {
    isLoggedIn: boolean = false;
    isUnauthenticated: boolean = false;
    isanonymous: boolean = true;
    isShowTouchID: boolean = true;
    isAuthenticationSuccess = false;
    public registration_mode: string="mobile";
    public user_identity: string;
    public user_reg_password: string;
    public user_fname: string;
    public user_lname: string;
    public user_dob: string;
    public user_useridtype: string;
    public user_useridnum: string;
    public user_ssn: string;
    public user_updatedusername: string;
    public user_updatedpassword: string;
    public isTurnOff: boolean = false;
    public user_state: string;
    public promoState: string;
    public is_auth_cancelled: boolean=false;
    public iscardslider: boolean =  false;
    public iscardSecondSlider: boolean = false;
    public isAuthCancelled:Boolean=false;

    @Output() LoggedIn: EventEmitter<any> = new EventEmitter();
    @Output() Unauthenticated: EventEmitter<any> = new EventEmitter();

    constructor() {
          
    }

    changeLogin() {
        this.LoggedIn.emit(true);
        this.Unauthenticated.emit(false);
    }

    changeRegister() {
        this.LoggedIn.emit(false);
        this.Unauthenticated.emit(true);
    }

    getloginValue() {
        return this.LoggedIn;
    }

    getUnauthenticatedValue() {
        return this.Unauthenticated;
    }

    showToastMessage(message, duration) {
        let toast = Toast.makeText(message, duration);
        toast.show();
    }
    // diable the tap layouts
    setIsUserInteractionEnabledRecursive(view: View, newValue: boolean) {
        view.isUserInteractionEnabled = newValue;
        if (view instanceof LayoutBase) {
            let layoutBase = <LayoutBase>view;
            for (let i = 0, length = layoutBase.getChildrenCount(); i < length; i++) {
                let child = layoutBase.getChildAt(i);
                this.setIsUserInteractionEnabledRecursive(child, newValue);
            }
        }
    }

    public locateAddress(address1, city, state, zipcode) {
        let _locateAddress = new LocateAddress();
        _locateAddress.locate({
            address: address1 + city + state + zipcode,
        }).then(() => {
            // console.log(`Address: ${this.address} locateAddress launched!`);
        }, (err) => {
            // alert(err);
        });
    }

    public callPhone(phoneNo){
         if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.CALL_PHONE],
                "App Needs The Following permissions")
                .then(() => {
                    // Permission Granted
                    phone.dial(phoneNo.toString(), true);
                })
                .catch(() => {
                    // Permission Denied
                });
        }
        else {
            // ios
            phone.dial(phoneNo.toString(), true);
        }
    }
}