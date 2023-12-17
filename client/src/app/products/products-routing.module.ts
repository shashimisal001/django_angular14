import { RouterModule, Routes } from "@angular/router";
import { SingleProductDetailComponent } from "./single-product-detail/single-product-detail.component";
import { ProductsComponent } from "./products.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    { 
        path: "", 
        component: ProductsComponent, 
        data: {
            title: "Products",
            subtitle: "Sneak into our products"
        } 
    },
    {
        path: "single-product-detail",
        component: SingleProductDetailComponent,
        data: {
            title: "Product Detail",
            subtitle: "Checkout all about the product"
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class ProductsRoutingModule {
    
}