import { Injectable } from "@angular/core";
import { GlobalService } from "../../shared/services/global.service";
import { Observable } from "rxjs/Observable";

import { CreateUser, VerifyUser } from "./registration.model";


@Injectable()
export class RegistrationService {
public registration_type: string;
public user_name: string;
    constructor(private _globalService: GlobalService) {
    }

    createUser(params): Observable<CreateUser> {
        return this._globalService.globalPost("register_stub", params);
    }
    verifyUser(params): Observable<VerifyUser> {
        return this._globalService.globalPost("verify_stub", params);
    }
    getAuthInfo(){
     return   [
      {
	    "userState":"RNV",
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