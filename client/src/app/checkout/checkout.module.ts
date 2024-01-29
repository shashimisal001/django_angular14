import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { CartModule } from "../cart/cart.module";
import { LoginComponent } from "./login/login.component";
import { ReviewComponent } from "./review/review.component";

@NgModule({
    declarations: [CheckoutComponent, LoginComponent, ReviewComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule, CheckoutRoutingModule, CartModule],
    providers: [],
    bootstrap: [CheckoutComponent]
})

export class CheckoutModule {

}