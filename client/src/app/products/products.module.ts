import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsRoutingModule, routes } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SingleProductDetailComponent } from './single-product-detail/single-product-detail.component';

@NgModule({
  declarations: [
    ProductsComponent,
    SingleProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule
  ],
  providers: [],
  bootstrap: [ProductsComponent]
})
export class ProductsModule { }