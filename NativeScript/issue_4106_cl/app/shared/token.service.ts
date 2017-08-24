import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { Http } from "@angular/http";
import { BehaviorSubject, Observable, Subscription } from "rxjs/Rx";
import { getNumber, setNumber } from "application-settings";


@Injectable()
export class TokenService {

  // old url for request token
  // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';

  // New URL for request token
  // private tokenUrl= 'https://host.begis.de/Test/IdSrv/connect';

  // New end Points
  private tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
  /* private baseApiUrl = 'http://192.168.103.120/CmsIdSrv/identity';*/

  public expires_in: number;

  public expirationTime: number;


  constructor(private http: Http) {
    this.expirationTime = 0; //defaultValue
  }

  /** Saves Expiration Time in a Variable  */
  public initialize(token: string) {
    this.getAccessTokenValidation(token)
      .subscribe(
      (res) => {
        this.expirationTime = res.exp;
      },
      (error) => {
        console.log("Error while getting Token.");
      }
      )
  }

  /** Get Access-Token as JSON*/ // donot get it
  private getAccessTokenValidation(token: string) {
    let headers = this.getHeaders();
    return this.http.get(this.tokenUrl + '/accesstokenvalidation?token=' + token)
      .map((res) => res.json())
      .catch(this.handleErrors);
  }

  /** is Token Expired */
  public isTokenExpired(token: string): boolean {
    let currentTime = Math.floor(Date.now() / 1000);
    console.log("Current Time: " + currentTime + " Expiration Time " + this.expirationTime);
    //AccessToken expires in 60 seconds or less
    if ((this.expirationTime - 60) <= currentTime) {
      return true;
    } else {
      return false;
    }
  }

  // handle error occured
  handleErrors(error: Response) {
    // alert(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }
}