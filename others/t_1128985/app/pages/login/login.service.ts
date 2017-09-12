import { Injectable } from "@angular/core";
import { GlobalService } from "../../shared/services/global.service";
import { Observable } from "rxjs/Observable";

import { LoginUser } from "./login.model";


@Injectable()
export class LoginService {

    public isnotify: boolean = false;
    public isuserChange: boolean = false;
    public isEnable: boolean;
    public isEnablenotify: boolean;
    constructor(private _globalService: GlobalService) {
    }

    loginUser(params) {
        return this._globalService.globalLoginPost("mobilelogin_stub", params);
    }


}