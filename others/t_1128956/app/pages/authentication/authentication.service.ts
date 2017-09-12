import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";



@Injectable()
export class AuthenticationService {
    public user_registration_type: string;
    public user_name: string;
    public firstName: string = "";
    public lastName: string = "";
    public dob: string = "";
    public emailField: string = "";
    public mobileField: string = "";

    constructor() {
    }
}