import { Component, Input } from "@angular/core";
import { CartService } from "src/app/common/services/cart.service";
import { HelperService } from "src/app/common/services/helper.service";

@Component({
    selector: "cart-summary-component",
    templateUrl: "cart-summary.component.html",
    styleUrls: ["cart-summary.component.scss"]
})

export class CartSummaryComponent {
    cartSummary: any = {};
    @Input()
    showCheckoutButton: boolean = true;

    constructor(private cartService: CartService, private helperService: HelperService){}

    ngOnInit(){
        this.listenToCartEvents();
        this.loadDependencyData();
    }

    loadDependencyData(){
        this.cartSummary = this.cartService.getCartSummary();
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