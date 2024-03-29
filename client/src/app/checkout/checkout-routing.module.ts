import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { LoginComponent } from "./login/login.component";
import { ReviewComponent } from "./review/review.component";
import { AuthRouteGuard } from "../common/routeguards/auth.routeguard";
import { CartRouteGuard } from "../common/routeguards/cart.routeguard";

export const routes = [
    { 
        path: "", 
        component: CheckoutComponent,
        data: {
            title: "Checkout",
            subtitle: "Please do checkout"
        },
        canActivate: [CartRouteGuard]
    },
    {
        path: "login",
        component: LoginComponent,
        data: {
            title: "Login",
            subtitle: "Please login"
        }
    },
    {
        path: "review",
        component: ReviewComponent,
        data: {
            title: "Review & Order",
            subtitle: "Please review & place the order"
        },
        canActivate: [AuthRouteGuard, CartRouteGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class CheckoutRoutingModule {

}