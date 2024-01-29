import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MyAccountComponent } from "./my-account.component";
import { MyAccountRoutingModule } from "./my-account-routing.module";
import { RouterModule } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

@NgModule({
    declarations: [MyAccountComponent, OrderDetailComponent],
    imports: [CommonModule, FormsModule, RouterModule, MyAccountRoutingModule],
})

export class MyAccountModule {
    
}