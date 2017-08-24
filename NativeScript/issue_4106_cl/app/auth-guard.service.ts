import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "./shared/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private login:LoginService) { }

  canActivate() {
    if (this.login.getIsLogged()) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

