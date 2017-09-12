import { Injectable } from "@angular/core";
import { GlobalService } from "../../shared/services/global.service";
import { Observable } from "rxjs/Observable";

import { HomeModel, HealthyLiving } from "./home.model";


@Injectable()
export class HomeService {

    constructor(private _globalService: GlobalService) {
    }

    getOnloadData(): Observable<HomeModel> {
        return this._globalService.globalGet("homepagememberprofile_stub");
    }

    getHealthyLiving(): Observable<HealthyLiving> {
        return this._globalService.globalGet("home/living");
    }
    getAuthInfo(){
     return   [
      {
	    "userState":"RV",
       "firstName": "Steve",
        "lastName": "Applessed",
		"mobileNo":"1234567890",
        "email":"ramya.bojanala@gmail.com",
		"dob":"12/12/1990",		
        "memberId": "",
        "ssn": "",         
      }
      ];
    }
     getNewUserAuthInfo(){
     return   [
      {
	    "userState":"",
       "firstName": "",
        "lastName": "",
		"mobileNo":"",
        "email":"",
		"dob":"",		
        "memberId": "",
        "ssn": "",         
      }
      ];
    }
}