import { Injectable } from "@angular/core";
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { HelperService } from "../services/helper.service";
import { CartService } from "../services/cart.service";

@Injectable({
    providedIn: "root"
})

export class CartRouteGuard implements CanActivate {
    constructor(private cartService: CartService,
        private router: Router,
        private helperService: HelperService){}
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.cartService.getCart().length > 0){
            return true;
        } else {
            this.helperService.errorMsg("Your cart is empty. please add some products and continue.");
            this.router.navigate(['/products']);
            return false;
        }
    }
}