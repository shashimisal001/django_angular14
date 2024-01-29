import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core"; 
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CartSummaryComponent } from "./summary/cart-summary.component";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";

@NgModule({
    declarations: [CartComponent, CartSummaryComponent],
    imports: [CommonModule, RouterModule, FormsModule, CartRoutingModule],
    exports: [CartSummaryComponent]
})

export class CartModule {

}