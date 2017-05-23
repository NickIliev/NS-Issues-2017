import { Injectable } from "@angular/core";
import { getString, setString, getBoolean, setBoolean, setNumber } from "application-settings";
import { Http, Headers, Response } from "@angular/http";
import { User } from "./user.model";
import { RouterExtensions } from 'nativescript-angular/router';
import { TokenService } from "./token.service";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
var dialogsModule = require("ui/dialogs");

const refreshToken = "refreshToken";

const tokenKey = "token";
const isLogged = "isLogged";

const refreshKey = "refreshToken";
const deviceToken = "deviceToken";



@Injectable()
export class LoginService {

  isAuthenticate = true;
  registerDeviceToken: string;
  refreshTokenCounter: number;


  // OLD Base URL for requesting Token from Identity server and 
  // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';
  private baseApiUrl = 'https://Host.begis.de/Hieber/Test/MessageApi/api';

  // NEW Base URL for requesting Token from Identity server 
  // private tokenUrl= 'https://host.begis.de/Test/IdSrv/connect';
  // private baseApiUrl = 'https://host.begis.de/Test/MessageApi/api';

  // New end Points
  private tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
  //  private baseApiUrl = 'http://192.168.103.120/CmsIdSrv/identity';*/

  get isLoggedIn(): boolean {
    return !!getString(tokenKey);
  }

  private get isLogged(): boolean {
    return getBoolean(isLogged);
  }

  private set isLogged(theLogin: boolean) {
    setBoolean(isLogged, false);
  }

  private get deviceToken(): string {
    return getString(deviceToken);
  }
  private set deviceToken(refresh: string) {
    setString(deviceToken, refresh);
  }

  getdeviceToken() {
    return this.deviceToken;
  }

  private get token(): string {
    return getString(tokenKey);
  }
  private set token(theToken: string) {
    setString(tokenKey, theToken);
  }

  getToken() {
    return this.token;
  }

  private get refreshToken(): string {
    return getString(refreshToken);
  }
  private set refreshToken(refresh: string) {
    setString(refreshToken, refresh);
  }

  getrefreshToken() {
    return this.refreshToken;
  }

  getIsLogged() {
    return this.isLogged;
  }

  constructor(
    private routerExtensions: RouterExtensions,
    private http: Http, private tokenService: TokenService) {
    if (this.token) {
      // this.backend.el.authentication.setAuthorization(this.token,this.refreshToken, "bearer");

    }
  }

  /** Login Web API Call and error Handaling */
  login(user: User) {
    // this.initFirebase();
    var content = "username=" + user.email + "&password=" + user.password + "&grant_type=password" + "&scope=offline_access read openid";
    return this.http.post(
      this.tokenUrl + '/token',
      content,
      { headers: this.getHeaders() }
    ).map(res => res.json())
      .do(res => {
        this.token = res.access_token;
        this.tokenService.expires_in = res.expires_in;
        this.refreshToken = res.refresh_token;
        this.isLogged = true;
        setString("refreshToken", res.refresh_token);
        setString("accessToken", res.access_token);
        console.log("access_token: login_check: " + this.token + this.refreshToken);
        this.refreshTokenCounter = setInterval(() => this.refreshTokenTimer(), 3, 6e+6);
      })
      .catch(this.handleErrors);
  }

  // Register device for Push Notification
  registerDevice(deviceId: string, token: string) {
    let headers = this.getDeviceRegsiterHeader(token);

    this.registerDeviceToken = getString("deviceID", deviceId);
    // console.log("Calling API:"+ this.registerDeviceToken);
    return this.http.post(
      this.baseApiUrl + '/PushNotification?deviceid=' + this.registerDeviceToken,
      { headers: this.getDeviceRegsiterHeader(token) }
    ).map(res => res.json())
      .catch(this.handleErrors);
  }


  refreshTokenTimer() {
    var content = "grant_type=refresh_token" + "&scope=offline_access read openid" + "&refresh_token=" + getString("refreshToken");
    return this.http.post(
      this.tokenUrl + "/token", content,
      { headers: this.getHeaders() }
    ).map(res => res.json())
      .do(res => {
        this.token = res.access_token;
        setString("accessToken", res.access_token);
        setString("refreshToken", res.refresh_token);
        // console.log("access_token: login_check: "+ this.token + this.refreshToken );
        this.refreshToken = res.refresh_token;
        this.tokenService.initialize(this.token);
        this.isLogged = true;
      })
      .catch(this.handleError);
    // var that = this;
    // return http.request({
    //   url:this.tokenUrl + "/token",
    //   method:"POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + "cm8uY2xpZW50OnNlY3JldA==" },
    //   content: "grant_type=refresh_token"+"&refresh_token="+"7721ad6af779208ca7cf2cb6b3b07252"
    // }).then(function (response){
    //   var content = JSON.parse(response.content);
    //   console.log(content.refresh_token+"");
    // });
  }
  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    console.log(body);
    return body.data || {};
  }

  // Handle errMsg
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

  tokentake(token: string) {
    console.log(token + "take this token");
  }

  // Logout from the Application and remove Application settings
  logoff() {
    // this.backend.el.authentication.clearAuthorization();
    this.isLogged == false;
    this.token = "";
    setNumber("userID", 0);
    setNumber("userID1", 0);
    setString("userName", "");
  }

  // Header Details for Register Device Token
  private getDeviceRegsiterHeader(token) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);
    // console.log("Token1: "+ token);
    return headers;
  }

  // set Header for API call
  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + "cm8uY2xpZW50OnNlY3JldA==");
    return headers;
  }

  // Handle Error
  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}