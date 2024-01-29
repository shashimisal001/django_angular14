import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    { 
        path: "", 
        component: CartComponent,
        data: {
            title: "Your Cart",
            subtitle: "Review the items you have added"
        } 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class CartRoutingModule {

}