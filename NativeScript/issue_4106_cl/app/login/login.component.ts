import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Location } from '@angular/common';
import { alert, setHintColor, LoginService, HieberService, User } from "../shared";
import { RouterExtensions } from 'nativescript-angular/router';
import { getString, getNumber, setNumber, setString } from 'application-settings';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: "gr-login",
  templateUrl: "login/login.component.html",
  styleUrls: ["login/login-common.css", "login/login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;

  @ViewChild("initialContainer") initialContainer: ElementRef;
  @ViewChild("mainContainer") mainContainer: ElementRef;
  @ViewChild("formControls") formControls: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  forgot_password_dialog: string;
  login_error_dialog: string
  constructor(private router: Router,
    private userService: LoginService, private hieberService: HieberService, private routerExtensions: RouterExtensions, private translate: TranslateService,
    private page: Page, private location: Location) {
    this.user = new User();

    translate.get('HOME.login_error_dialog', { value: '' }).subscribe((res: string) => {
      this.login_error_dialog = res;
      //=> 'hello world'
    });
  }

  public goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;

    this.page.getViewById("email").ios.inputAccessoryView = UIView.alloc().init();
    this.page.getViewById("pwd").ios.inputAccessoryView = UIView.alloc().init();
  }

  // focusPassword() {
  //   this.password.nativeElement.focus();
  // }

  submit() {
    this.isAuthenticating = true;
    this.login();
  }


  /** Login Web API call and response Handaling  */
  login() {
    if (getConnectionType() === connectionType.none) {
      this.isAuthenticating = false;
      return;
    }
    this.userService.login(this.user)
      .subscribe(
      () => {
        this.getCurrentUser();
      },
      (error) => {
        this.user.password = "";
        this.isAuthenticating = false;
      }
      );
  }

  private openForgotPasswordDialog() {
    this.translate.get('HOME.forgot_password_dialog', { value: '' }).subscribe((res: string) => {
      alert(res);
      //=> 'hello world'
    });

  }

  private getCurrentUser() {
    this.isAuthenticating = true;
    if (getConnectionType() === connectionType.none) {
      this.isAuthenticating = false;
      return;
    }
    this.hieberService.currentUserDetail().subscribe(
      (data => {
        this.isAuthenticating = false;
        setNumber("userID", data.UserID);
        setString("userName", data.Name);
        setString("userProfilePicture", data.Picture.File);
        //  setString("userDetails",data.json());
        this.routerExtensions.navigate(["/main-menu"],
          {
            clearHistory: true,
            transition: {
              name: "slideLeft",
              duration: 200,
              curve: "linear"
            }
          });
      }),
      (error) => {
        this.isAuthenticating = false;
        this.user.password = "";

        this.translate.get('HOME.login_error_dialog', { value: '' }).subscribe((res: string) => {
          alert(res)
          //=> 'hello world'
        });
      },
    );
  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000
    });
  }

  showMainContent() {
    let initialContainer = <View>this.initialContainer.nativeElement;
    let mainContainer = <View>this.mainContainer.nativeElement;
    let formControls = <View>this.formControls.nativeElement;
    let animations = [];
    // Fade out the initial content over one half second
    initialContainer.animate({
      opacity: 0,
      duration: 500
    }).then(function () {
      // After the animation completes, hide the initial container and
      // show the main container and logo. The main container and logo will
      // not immediately appear because their opacity is set to 0 in CSS.
      initialContainer.style.visibility = "collapse";
      mainContainer.style.visibility = "visible";

      // Fade in the main container and logo over one half second.
      animations.push({ target: mainContainer, opacity: 1, duration: 500 });

      // Slide up the form controls and sign up container.
      animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    });
  }

  setTextFieldColors() {
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }
}
