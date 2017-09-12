import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, Input, Renderer, Inject } from "@angular/core";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from "application-settings";
import { Globals } from "../../shared/global";
import { LoginService } from "./login.service";
import { LoginUser } from "./login.model";
import { StackLayout } from "ui/layouts/stack-layout";
import { Observable } from "data/observable";
import { FingerprintAuth } from "nativescript-fingerprint-auth";
import { SecureStorage } from "nativescript-secure-storage";
import { FormValidationService } from "../../shared/services/formValidation.service";
import * as app from "tns-core-modules/application";
import * as dialogs from "ui/dialogs";
import { getBoolean, setBoolean, getNumber, setNumber, getString, setString, hasKey, remove, clear } from "application-settings";
import { TextField } from "ui/text-field";
import * as connectivity from "connectivity";
import { Switch } from "ui/switch";
import { Page } from "ui/page";
import { TouchGestureEventData } from "ui/gestures";

@Component({
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["login.css"]

})

export class LoginComponent extends Observable implements OnInit, AfterViewInit {
  @ViewChild("rememberSwitch") rememberSwitch: ElementRef;
  @ViewChild("enableTouchIDSwitch") enableTouchIDSwitch: ElementRef;
  @ViewChild("touchIDStack") touchIDStack: ElementRef;
  @ViewChild("userNametxt") userNametxt: ElementRef;
  @ViewChild("passwordtxt") passwordtxt: ElementRef;
  @ViewChild("showText") showText: ElementRef;

  public userName: string;
  public password: string;
  public title: string;
  public isremember: boolean = true;
  public isEnable: boolean = false;
  public secureStorage = new SecureStorage();
  public touchIDInteraction: boolean = true;
  loginUser = new LoginUser();
  public isUserNameFilled: Boolean = true;
  public isPasswordFilled: Boolean = true;
  public lblPasswordReq: boolean = true;
  public lblUserNameReq: boolean = true;
  private fingerprintAuth: FingerprintAuth;
  public touchID: boolean = false;
  public isnotify: boolean = false;
  public isEnablenotify: boolean;
  public isuserChange: boolean = false;
  public isTouchIDdisableNotification: boolean;
  public touchID_src: string = "~/images/icon/touchID@2x.png";
  public showFlag = 0;
  public hideFlag = 0;
  public passwordStr: string;
  touchIDGrid = "touchIDGrid";
  isTouchIDdisableNotificationclose: boolean = true;
  lblPassword: string = "*Required Field";
  isLoginApi: boolean = false;
  signInInteraction: boolean = true;
  pageStartTime: number = 0;
  pageEndTime: number = 0;
  pageTimeDifference: number = 0;

  constructor(private _routerExtensions: RouterExtensions,
    private _globals: Globals,
    private renderer: Renderer,
    public _loginService: LoginService,
    private _formValidationService: FormValidationService,
    public page: Page) {
    super();
    this.pageStartTime = new Date().getTime();
    this.fingerprintAuth = new FingerprintAuth();
    this.isUserNameFilled = true;
    this.isPasswordFilled = true;
  }

  ngOnInit() {
    if (app.ios) {
      this.page.css = "Page {background-image : none; margin-top: 0} ";
    }
    this.title = "Sign In";
    this.isUserNameFilled = true;
    this.isPasswordFilled = true;
    this.isTouchIDdisableNotification = getBoolean("isTouchIDdisableNotification", false);
    this.isnotify = this._loginService.isnotify;
    this.isEnablenotify = this._loginService.isEnablenotify;
    this.isuserChange = this._loginService.isuserChange;
    this.userName = "user01";
    this.password = "password01";
    if (this.isnotify) {
      // this.isremember = false;
      this.rememberSwitch.nativeElement.checked = !this.isnotify;
    }
    this.enableTouchIDSwitch.nativeElement.checked = appSettings.getBoolean("isEnableTouchID", this.enableTouchIDSwitch.nativeElement.checked);
    if (this.enableTouchIDSwitch.nativeElement.checked) {
      this.touchID = true;
      if (this.isTouchIDdisableNotification) {
        this.touchIDGrid = "touchIDDisable";
        this.touchID_src = "~/images/icon/touch_disabled.png";
        this.touchIDInteraction = false;
        this._globals.isShowTouchID = false;
      }
      if (this._globals.isShowTouchID) {
        this.doVerifyFingerprintWithCustomFallback();
      }
      else {
        this._globals.isShowTouchID = true;
      }
    }
    else if (!this.enableTouchIDSwitch.nativeElement.checked) {
      if (this.touchIDStack) {
        this.touchIDGrid = "touchIDDisable";
        this.touchID_src = "~/images/icon/touch_disabled.png";
        this.touchIDInteraction = false;
      }
    }

    this.rememberSwitch.nativeElement.checked = appSettings.getBoolean("isRememberMe", this.rememberSwitch.nativeElement.checked);

    if (this.rememberSwitch.nativeElement.checked) {
      this._loginService.isEnable = this.enableTouchIDSwitch.nativeElement.checked;
    }

    // User Name from storage
    if (appSettings.getBoolean("isFirstInstall")) {
      appSettings.setBoolean("isFirstInstall", false);
      this.secureStorage.remove({
        key: "UserName",
      });
    }
    else {
      this.secureStorage.get({
        key: "UserName"
      }).then(value => {
        if (value) {
          this.userName = value;
          this.isuserChange = true;
        }
        else {
          this.userName = "";
          this.password = "";
        }
      });
    }

    if (appSettings.getString("userName") !== undefined) {
      this.userName = appSettings.getString("userName");
      this.isUserNameFilled = true;
    }
    if (appSettings.getString("password") !== undefined) {
      // this.password = appSettings .getString("password");
      this.isPasswordFilled = true;
    }
  }

  ngAfterViewInit() {
    // console.log(this.touchIDStack)
    this.pageEndTime = new Date().getTime();
    this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
  }


  public Login(userName, password) {
    let connectionType = connectivity.getConnectionType();
    switch (connectionType) {
      case connectivity.connectionType.none:
        this._globals.showToastMessage("No internet available, please connect!!", "longer");
        return;
      default:
        break;
    }
    if (this.rememberSwitch.nativeElement.checked) {
      if (this.userName !== undefined) {
        appSettings.setString("userName", this.userName);
        this.isUserNameFilled = true;

      }
      if (this.password !== undefined) {
        //  appSettings .setString("password", this.password);
        this.isPasswordFilled = true;
      }
    }

    else {
      if (this.userName !== undefined) {
        appSettings.remove("userName");
      }
      if (this.password !== undefined) {
        appSettings.remove("password");
      }
    }

    if (this.userName === undefined || this.userName === "") {
      this.isUserNameFilled = false;
      let userNametxt = <TextField>this.userNametxt.nativeElement;
      userNametxt.focus();
    }
    else {
      this.isUserNameFilled = true;
    }
    if (this.password === undefined || this.password === "") {
      this.isPasswordFilled = false;
      if (this.isUserNameFilled) {
        this.lblPassword = "*Required Field";
        let passwordtxt = <TextField>this.passwordtxt.nativeElement;
        passwordtxt.focus();
      }
    }
    // else if (!this._formValidationService.passwordPatternValidator(this.password)) {
    //   this.isPasswordFilled = false;
    //   this.lblPassword = "Password did not match the minimum criteria "
    // }
    else {
      this.isPasswordFilled = true;
      this.lblPassword = "*Required Field";
    }

    if (this.isPasswordFilled && this.isUserNameFilled) {
      // this.signInInteraction = false;
      // var params = "{"username":"user01" , "password":"password01"}"
      this.loginUser.username = this.userName;
      this.loginUser.password = this.password;
      let params: any = this.loginUser;
      this._loginService.loginUser(JSON.stringify(this.loginUser))
        .subscribe((data) => {
          //    this.signInInteraction = true;
          this.navHome();
        },
        error => {
          //   this.signInInteraction = true;
          this.isLoginApi = true;
        });
      // this.navHome();
    }
    if (this.isPasswordFilled) {
      this.lblPasswordReq = true;
    }
    if (this.isUserNameFilled) {
      this.lblUserNameReq = true;
    }
  }

  public Delete() {
    appSettings.remove("userName");
    appSettings.remove("password");
  }

  public ForgotPassword() {
    this.dismissKeyBoard();
    this._routerExtensions.navigate(["/happy"], {
      animated: false
    });
    this._loginService.isnotify = false;
    this._loginService.isuserChange = false;
  }

  public goBack() {
    this.dismissKeyBoard();
    if (this._globals.isLoggedIn) {
      this._routerExtensions.back();
    } else {
      this._routerExtensions.navigate(["/home/anonymousHome"], {
        animated: false
      });
    }

    this._loginService.isnotify = false;
    this._loginService.isuserChange = false;
  }

  public contactMemberNav() {
    this.dismissKeyBoard();
    this._routerExtensions.navigate(["/contactUs"], {
      animated: false
    });
  }

  public toggleisremember(args) {
    let rememberSwitch = <Switch>args.object;
    if (this.enableTouchIDSwitch.nativeElement.checked) {
      this.enableTouchIDSwitch.nativeElement.checked = rememberSwitch.checked;
    } else {
      //  this.rememberSwitch.nativeElement.checked = !this.rememberSwitch.nativeElement.checked;
    }
  }

  public toggleisEnable(args) {
    let enableSwitch = <Switch>args.object;
    if (enableSwitch.checked) {
      this.fingerprintAuth.available().then(
        (avail: boolean) => {
          if (avail) {
            if (!this.touchID) { // checks touchIDStack enabled
              dialogs.alert({
                message: ("Touch ID will be enabled on your next sign in"),
                okButtonText: "Ok"
              });
            }
            this.rememberSwitch.nativeElement.checked = enableSwitch.checked;
          }
          else {
            dialogs.alert({
              title: "Enable Touch ID Login",
              message: (`The Touch ID login option is only available for devices with Touch ID enabled. Enabling this option allows for a quick login to My Blue using Touch ID authentication.`),
              okButtonText: "Ok"
            });
            enableSwitch.checked = false;
            appSettings.setBoolean("isEnableTouchID", false);
          }
        },
        (error) => {
          dialogs.alert({
            title: "Enable Touch ID Login",
            message: (`The Touch ID login option is only available for devices with Touch ID enabled. Enabling this option allows for a quick login to My Blue using Touch ID authentication.`),
            okButtonText: "Ok"
          });
          enableSwitch.checked = false;
          appSettings.setBoolean("isEnableTouchID", false);
        }
      );

    }
    this._loginService.isEnable = enableSwitch.checked;
  }

  public doCheckAvailable(): void {
    this.fingerprintAuth.available().then(
      (avail: boolean) => {
        dialogs.alert({
          title: "Fingerprint scanner available?",
          message: avail ? "YES" : "NO",
          okButtonText: "OK"
        });
      }
    );
  }

  public doCheckFingerprintsChanged(): void {
    this.fingerprintAuth.didFingerprintDatabaseChange().then(
      (changed: boolean) => {
        dialogs.alert({
          title: "Fingerprint DB changed?",
          message: changed ? "YES" : "NO",
          okButtonText: "OK"
        });
      }
    );
  }

  public doVerifyFingerprintWithCustomFallback(): void {
    this.fingerprintAuth.verifyFingerprintWithCustomFallback({
      message: "Sign in with the online ID " + this.userName.substring(0, 3) + this.userName.substring(3).replace(/./g, "*"), // optional
      fallbackMessage: "Password" // optional
    }).then(
      () => {
        this.navHome();
      },
      (error) => {
        if (app.android) {
          // do nothing
        }
        else if (app.ios) {
          if (error.code === -1) {
            dialogs.alert({
              title: "For security, Touch ID has been temporarily disabled",
              message: ("Please sign in with your username and password. Touch ID will be re-enabled on your next sign in"),
              okButtonText: "Ok"
            }).then(() => {
              this.isTouchIDdisableNotification = true;
              appSettings.setBoolean("isTouchIDdisableNotification", true);
            });
            this.touchIDGrid = "touchIDDisable";
            this.touchIDInteraction = false;
            this.touchID_src = "~/images/icon/touch_disabled.png";
          }
          if (error.code === -8 || typeof (error.code) === "undefined") {
            setTimeout(() => {    // <<<---    using ()=> syntax
              dialogs.alert({
                title: "Touch ID is locked out",
                message: ("please lock the device and unlock the device"),
                okButtonText: "Ok"
              }).then(() => {
                // do nothing
              });
              this.touchIDGrid = "touchIDDisable";
              this.touchIDInteraction = false;
              this.touchID_src = "~/images/icon/touch_disabled.png";
            }, 500);

          }
        }
      });
  }

  public navHome() {
    let currentState = appSettings.getString("verify-unauthenticate");
    this.dismissKeyBoard();
    if (this.enableTouchIDSwitch.nativeElement.checked || this.rememberSwitch.nativeElement.checked) {
      this.secureStorage.set({
        key: "UserName",
        value: this.userName
      });
    }
    else {
      this.secureStorage.remove({
        key: "UserName",
      });
    }
    appSettings.setBoolean("isRememberMe", this.rememberSwitch.nativeElement.checked);
    appSettings.setBoolean("isEnableTouchID", this.enableTouchIDSwitch.nativeElement.checked);

    this._globals.changeLogin();
    this._loginService.isnotify = false;
    this._loginService.isuserChange = false;
    this.isTouchIDdisableNotification = false;
    this._globals.isanonymous = false;
    appSettings.setBoolean("isTouchIDdisableNotification", false);

    if (currentState == "un-auth") {
      //ramya
      this._globals.isLoggedIn = false;
      this._globals.isUnauthenticated = true;      
       this._globals.isAuthCancelled=true;
      this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
        animated: false
      });
      // this._routerExtensions.navigate(["/home/signedHome"], {
      //   animated: false
      // });
    }
    else if (currentState == "auth-success") {
      this._routerExtensions.navigate(["/personal_info/authentication_success"], {
        animated: false
      });
    }
    else if (currentState == "cancel-auth") {
      this._globals.is_auth_cancelled = true;
      this._routerExtensions.navigate(["/home/signedHome"], {
        animated: false
      });
      // this._globals.isAuthCancelled=true;
      // this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
      //   animated: false
      // });
    }
    else if (currentState == "registered-un-auth" && this._globals.user_state == "RNV") {
      // Raghu    
      this._globals.isLoggedIn = false;
      this._globals.isUnauthenticated = true;      
      this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
        animated: false
      });
    }
    else if (currentState == "goto-auth") {
      this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
        animated: false
      });
    }

    else {
      //Jai
      this._globals.isLoggedIn = true;
      this._globals.isUnauthenticated = false;
      this._routerExtensions.navigate(["/home/signedHome"], {
        animated: false
      });
      // this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
      //   animated: false
      // });
    }

  }

  public changeUser() {
    this.dismissKeyBoard();
    this._routerExtensions.navigate(["/login/changeUser"], {
      animated: false
    });
    this._loginService.isuserChange = false;
  }

  public nofiyClose() {
    this.isnotify = false;
    this.isTouchIDdisableNotificationclose = false;
    this.isLoginApi = false;
  }

  public dismissKeyBoard() {
    let passwordtxt = <TextField>this.passwordtxt.nativeElement;
    passwordtxt.dismissSoftInput();
    let userNametxt = <TextField>this.userNametxt.nativeElement;
    userNametxt.dismissSoftInput();
  }

  public showPassword() {
    if (this.showFlag == 0) {
      this.passwordtxt.nativeElement.secure = false;
      this.showText.nativeElement.text = "Hide";
      this.showFlag = 1;
    } else if(this.showFlag == 1) {
      this.passwordtxt.nativeElement.secure = true;
      this.passwordStr = this.passwordtxt.nativeElement.text;
      this.showText.nativeElement.text = "Show";
      this.showFlag = 0;
      this.hideFlag = 1;
    }
    if (app.android) {
      this.setCursorToEnd();
    }
  }
  public setCursorToEnd() {
    setTimeout(() => {
      android.text.Selection.setSelection(
        this.passwordtxt.nativeElement.android.getText(),
        this.passwordtxt.nativeElement.android.length()
      );
    }, 0);
  }
  public savingText(password) {
    this.passwordStr = password;
    if (this.hideFlag == 1) {
      this.passwordtxt.nativeElement.text = this.passwordStr + password;
      this.hideFlag = 0;
    }
  }
  public registerNow() {
    this._routerExtensions.navigate(["/create"], {
      animated: false
    });
  }
  goToPasswordField() {
    this.passwordtxt.nativeElement.focus();
  }
}
