import { Component } from "@angular/core";
import { CheckoutApiService } from "../http/checkout-api.service";
import { AuthService } from "src/app/common/services/auth.service";
import { CartService } from "src/app/common/services/cart.service";
import { HelperService } from "src/app/common/services/helper.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./review.component.html",
    styleUrls: ["./review.component.scss"]
})

export class ReviewComponent {
    showCheckoutButton: boolean = false;

    constructor(private checkoutApiService: CheckoutApiService,
        private cartService: CartService,
        private helperService: HelperService,
        private router: Router){}

    placeOrder(){
        let cart = this.cartService.getCart();
        let cartSummary = this.cartService.getCartSummary();
        let data = { cartSummary: cartSummary, cart: cart }
        this.checkoutApiService.placeOrder(data).subscribe({
            next: (response: any)=>{
                this.helperService.successMsg(response["msg"]);
                this.cartService.clearCart();
                this.router.navigate(["products"]);
            }
        });
    }
}