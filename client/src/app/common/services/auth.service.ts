import { Injectable } from "@angular/core";
import { HelperService } from "./helper.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    constructor(private helperService: HelperService,
        private router: Router){}

    isUserLoggedIn(){
        let existingJwt = localStorage.getItem("userJwt");
        return Boolean(existingJwt);
    }

    checkAndNavigate(urlArr: Array<string>){
        if(this.isUserLoggedIn()){
            this.router.navigate(urlArr);
        }
    }

    logoutUser(){
        localStorage.removeItem("userJwt");
        this.helperService.successMsg("Logged out successfully");
        this.router.navigate(["checkout/login"]);
    }

    setUserJwt(jwt: string){
        if(!this.isUserLoggedIn()) { 
            localStorage.setItem("userJwt", jwt);
        } else {
            this.helperService.errorMsg("Already logged in");
        }
    }

    freshLogin(){
        localStorage.removeItem("userJwt");
        this.router.navigate(["checkout/login"]);
    }

    getJwt() {
        if(this.isUserLoggedIn()){
            return localStorage.getItem("userJwt");
        } else {
            this.router.navigate(['checkout/login']);
        }
        return false;
    }
}