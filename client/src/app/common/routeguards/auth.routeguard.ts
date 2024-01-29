import { Injectable } from "@angular/core";
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, UrlTree, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { HelperService } from "../services/helper.service";

@Injectable({
    providedIn: "root"
})

export class AuthRouteGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router,
        private helperService: HelperService){}
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isUserLoggedIn()){
            return true;
        } else {
            this.helperService.errorMsg("You are not logged in please login to continue.");
            this.router.navigate(['checkout/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}