import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MyAccountComponent } from "./my-account.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

export const routes: Routes = [
    {
        path: "", 
        component: MyAccountComponent,
        data: {
            title: "My account",
            subtitle: "Profile, Orders & Tracking"
        }
    },
    {
        path: "order-detail/:orderId",
        component: OrderDetailComponent,
        data: {
            title: "Order detail",
            subtitle: "Complete order details"
        }
    }
]

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forChild(routes)]
})

export class MyAccountRoutingModule {

}