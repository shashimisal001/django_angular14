import { Component } from "@angular/core";
import { CartService } from "../common/services/cart.service";
import { HelperService } from "../common/services/helper.service";
import { Router } from "@angular/router";

@Component({
    selector: "cart",
    templateUrl: "cart.component.html",
    styleUrls: ["cart.component.scss"]
})

export class CartComponent {
    cart: any = [];
    cartSummary: any = {};
    constructor(public cartService: CartService, 
        private helperService: HelperService,
        private router: Router){}

    ngOnInit(){
        this.loadDependencyData();
        this.listenToCartEvents();
    }

    loadDependencyData(){
        this.cart = this.cartService.getCart();
        if(this.cart.length <= 0){
            this.router.navigate(['/cart']);
        }
    }
    
    listenToCartEvents(){
        this.helperService.dataShareEvents.subscribe({
            next: (data: any)=>{
                if(data && (data['cartCleared'] || data['itemRemoved'] || data['itemAdded'])){
                    this.loadDependencyData();
                }
            }
        });
    }
}