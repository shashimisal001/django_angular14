import { NgModule } from "@angular/core"; 
import { CommonModule } from "@angular/common";
import { IndexComponet } from "./index.component";
import { ProductsApiService } from "../products/http/products-api.service";
import { IndexRoutingModule } from "./index-routing.module";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ProductsModule } from "../products/products.module";

@NgModule({
    declarations: [IndexComponet],
    imports: [RouterModule, IndexRoutingModule, ProductsModule, HttpClientModule, CommonModule],
    providers: [ProductsApiService],
    bootstrap: [IndexComponet]
})

export class IndexModule {

}